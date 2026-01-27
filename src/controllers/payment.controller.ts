import { Request, Response } from 'express';
import { klivoService } from '../services/klivo.service';
import { supabaseAdmin } from '../config/supabase';
import { emailService } from '../services/email.service';

export class PaymentController {
  /**
   * Cria uma nova transação de pagamento PIX
   */
  async createPayment(req: Request, res: Response) {
    try {
      const { amount, name, email, cpf, reportData, tracking } = req.body;

      // Validações
      if (!amount || !name || !email) {
        return res.status(400).json({
          success: false,
          error: 'Campos obrigatórios: amount, name, email',
        });
      }

      if (!reportData || !reportData.birthDate) {
        return res.status(400).json({
          success: false,
          error: 'Dados do relatório são obrigatórios',
        });
      }

      console.log('📊 Tracking recebido do frontend:', JSON.stringify(tracking, null, 2));

      // Criar transação na Klivo
      const transaction = await klivoService.createTransaction({
        amount: amount,
        description: 'Mapa do Glow Up 2026 - Relatório Completo',
        customer: {
          name,
          email,
          cpf,
        },
        metadata: {
          product: 'mapa-glow-up',
          reportData: reportData,
        },
        tracking: tracking,
      });

      // Salvar transação no banco de dados  
      const { data: paymentRecord, error: dbError} = await supabaseAdmin
        .from('payments')
        .insert({
          transaction_id: transaction.hash || transaction.id, // Usar hash
          transaction_token: transaction.token,
          amount: transaction.amount,
          status: transaction.payment_status || transaction.status,
          method: transaction.method || transaction.payment_method,
          customer_name: name,
          customer_email: email,
          customer_cpf: cpf,
          report_data: reportData,
          pix_code: transaction.pix?.pix_qr_code,
          pix_url: transaction.pix?.pix_url,
          pix_expires_at: transaction.pix?.expires_at,
          created_at: transaction.created_at,
          transaction_url: transaction.url,
          utm_source: tracking?.utm_source || null,
          utm_medium: tracking?.utm_medium || null,
          utm_campaign: tracking?.utm_campaign || null,
          utm_content: tracking?.utm_content || null,
          utm_term: tracking?.utm_term || null,
          referrer: tracking?.src || null,
          tracking_data: tracking || null,
        })
        .select()
        .single();

      if (dbError) {
        console.error('❌ Erro ao salvar pagamento no banco:', dbError);
        // Não retornar erro ao cliente, apenas log
      }

      // Enviar email com QR Code PIX (não bloquear resposta se falhar)
      if (transaction.pix?.pix_qr_code && transaction.pix?.pix_url) {
        emailService.sendPixPaymentEmail({
          to: email,
          name,
          amount: transaction.amount,
          pixCode: transaction.pix.pix_qr_code,
          pixUrl: transaction.pix.pix_url,
          expiresAt: (transaction.pix as any).expires_at || null,
        }).catch((error) => {
          console.error('⚠️ Erro ao enviar email PIX (não bloqueante):', error.message);
        });
      }

      // Retornar dados do PIX para o frontend
      return res.status(200).json({
        success: true,
        data: {
          transactionId: transaction.hash || transaction.id, // Retornar hash
          transactionHash: transaction.hash,
          transactionToken: transaction.token,
          amount: transaction.amount,
          status: transaction.payment_status || transaction.status,
          method: transaction.payment_method || transaction.method,
          pix: transaction.pix ? {
            qrCode: transaction.pix.pix_qr_code,
            qrCodeUrl: transaction.pix.pix_url,
            copyPaste: transaction.pix.pix_qr_code,
            expiresAt: transaction.pix.expires_at,
          } : undefined,
          transactionUrl: transaction.url,
          paymentId: paymentRecord?.id,
        },
      });
    } catch (error: any) {
      console.error('❌ Erro ao criar pagamento:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Erro ao processar pagamento',
      });
    }
  }

  /**
   * Consulta o status de um pagamento
   */
  async getPaymentStatus(req: Request, res: Response) {
    try {
      const { transactionId } = req.params;

      if (!transactionId) {
        return res.status(400).json({
          success: false,
          error: 'ID da transação é obrigatório',
        });
      }

      // Consultar status no banco (já atualizado pelo webhook)
      const { data: payment, error: dbError } = await supabaseAdmin
        .from('payments')
        .select('transaction_id, status, amount')
        .eq('transaction_id', transactionId)
        .single();

      if (dbError || !payment) {
        console.error('❌ Erro ao buscar pagamento:', dbError);
        return res.status(404).json({
          success: false,
          error: 'Pagamento não encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          transactionId: payment.transaction_id,
          status: payment.status,
          amount: payment.amount,
        },
      });
    } catch (error: any) {
      console.error('❌ Erro ao consultar status do pagamento:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Erro ao consultar pagamento',
      });
    }
  }

  /**
   * Webhook para receber confirmação de pagamento da Klivo
   * Formato conforme documentação: https://docs.klivopay.com.br/webhooks
   */
  async webhook(req: Request, res: Response) {
    try {
      console.log('🔔 Webhook recebido da Klivo:', JSON.stringify(req.body, null, 2));

      const {
        token,
        event,
        status,
        method,
        created_at,
        paid_at,
        refund_at,
        platform,
        customer,
        transaction,
        offer,
        items,
        tracking
      } = req.body;

      // Validar campos obrigatórios
      if (!transaction || !transaction.id) {
        console.error('❌ Webhook sem transaction.id');
        return res.status(400).json({ error: 'transaction.id é obrigatório' });
      }

      const transactionId = transaction.id;

      console.log(`📝 Processando webhook - Transação: ${transactionId}, Status: ${status}, Evento: ${event}`);

      // Atualizar status no banco
      const { data: payment, error: updateError } = await supabaseAdmin
        .from('payments')
        .update({ 
          status: status,
          paid_at: paid_at || (status === 'paid' ? new Date().toISOString() : null),
          refunded_at: refund_at,
          webhook_received: true,
          webhook_data: req.body, // Salvar dados completos do webhook
        })
        .eq('transaction_id', transactionId)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Erro ao atualizar pagamento:', updateError);
        // Continuar mesmo com erro no banco, para não bloquear webhook
      }

      // Se pagamento foi confirmado, processar relatório
      if (status === 'paid' && payment) {
        console.log('✅ Pagamento confirmado! Processando relatório...');
        console.log('💰 Valor:', transaction.amount / 100, 'R$');
        console.log('👤 Cliente:', customer?.name, '-', customer?.email);
        
        // Usar transaction_id como slug do relatório
        const reportSlug = payment.transaction_id;
        
        // Enviar email com acesso ao relatório (não bloqueante)
        emailService.sendReportAccessEmail({
          to: payment.customer_email,
          name: payment.customer_name,
          reportSlug: reportSlug,
        }).catch((error) => {
          console.error('⚠️ Erro ao enviar email de acesso (não bloqueante):', error.message);
        });
        
        console.log('📊 Relatório liberado para:', payment.customer_email);
        console.log('🔗 Link do relatório:', `/relatorio/${reportSlug}`);
      } else if (status === 'refused' || status === 'antifraud' || status === 'chargedback') {
        console.log('❌ Pagamento não aprovado:', status);
      } else if (status === 'refunded') {
        console.log('💸 Pagamento reembolsado');
      }

      // Sempre retornar 200 para confirmar recebimento
      return res.status(200).json({ 
        success: true,
        message: 'Webhook processado com sucesso',
        transaction_id: transactionId,
        status: status,
      });
    } catch (error: any) {
      console.error('❌ Erro ao processar webhook:', error);
      // Mesmo com erro, retornar 200 para não reenviar webhook
      return res.status(200).json({
        success: false,
        error: error.message || 'Erro ao processar webhook',
      });
    }
  }

  /**
   * Lista pagamentos (admin)
   */
  async listPayments(req: Request, res: Response) {
    try {
      const { data: payments, error } = await supabaseAdmin
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      return res.status(200).json({
        success: true,
        data: payments,
      });
    } catch (error: any) {
      console.error('❌ Erro ao listar pagamentos:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Erro ao listar pagamentos',
      });
    }
  }
}

export const paymentController = new PaymentController();
