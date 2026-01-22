import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@jovemistica.com.br';
const APP_URL = process.env.APP_URL || 'https://app.jovemistica.com.br';

export class EmailService {
  /**
   * Envia email com QR Code PIX
   */
  async sendPixPaymentEmail(data: {
    to: string;
    name: string;
    amount: number;
    pixCode: string;
    pixUrl: string;
    expiresAt: string | null;
  }) {
    try {
      console.log(`📧 Enviando email PIX para ${data.to}...`);

      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: data.to,
        subject: '🔒 Finalize seu Pagamento - Mapa do Glow Up 2026',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">✨ Seu Mapa Está Quase Pronto!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Olá, <strong>${data.name}</strong>! 👋</p>
    
    <p>Falta apenas um passo para acessar seu <strong>Mapa do Glow Up 2026</strong> completo!</p>
    
    <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h2 style="color: #667eea; margin-top: 0;">💳 Pagamento PIX</h2>
      <p><strong>Valor:</strong> R$ ${(data.amount / 100).toFixed(2)}</p>
      ${data.expiresAt ? `<p><strong>⏰ Expira em:</strong> ${new Date(data.expiresAt).toLocaleString('pt-BR')}</p>` : ''}
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <h3 style="color: #667eea;">Escaneie o QR Code:</h3>
      <img src="${data.pixUrl}" alt="QR Code PIX" style="max-width: 250px; border: 2px solid #667eea; border-radius: 10px; padding: 10px; background: white;">
    </div>
    
    <div style="background: white; padding: 15px; border-radius: 10px; margin: 20px 0;">
      <p style="margin: 0; font-size: 14px; color: #666;"><strong>Ou copie o código Pix:</strong></p>
      <p style="word-break: break-all; font-family: monospace; font-size: 12px; background: #f5f5f5; padding: 10px; border-radius: 5px; margin: 10px 0;">${data.pixCode}</p>
    </div>
    
    <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 20px 0;">
      <h3 style="color: #1976d2; margin-top: 0;">📱 Como pagar:</h3>
      <ol style="margin: 10px 0; padding-left: 20px;">
        <li>Abra o app do seu banco</li>
        <li>Escolha pagar com Pix QR Code ou Pix Copia e Cola</li>
        <li>Escaneie o QR Code ou cole o código acima</li>
        <li>Confirme o pagamento</li>
      </ol>
      <p style="color: #1976d2; margin: 10px 0;"><strong>⚡ Confirmação automática em segundos!</strong></p>
    </div>
    
    <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
      <p style="margin: 0; color: #856404;">
        <strong>🎁 O que você vai receber:</strong><br>
        ✨ Mapa Astral Completo + Revolução Solar<br>
        🔢 Numerologia do Ano Pessoal<br>
        🔮 Tarot Mês a Mês (12 cartas)<br>
        💫 Matriz do Destino Completa<br>
        🌟 Astrologia Védica<br>
        💖 Análise dos 7 Chakras<br>
        📅 Portais Energéticos<br>
        📝 15+ Scripts Personalizados<br>
        E muito mais!
      </p>
    </div>
    
    <p style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
      Dúvidas? Entre em contato: <a href="mailto:contato@jovemistica.com" style="color: #667eea;">contato@jovemistica.com</a>
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>Jovem Mística © 2026 - Mapa do Glow Up</p>
    <p>Este é um email automático, não responda.</p>
  </div>
</body>
</html>
        `,
      });

      console.log('✅ Email PIX enviado com sucesso:', result.data?.id);
      return result;
    } catch (error) {
      console.error('❌ Erro ao enviar email PIX:', error);
      throw error;
    }
  }

  /**
   * Envia email com acesso ao relatório após pagamento aprovado
   */
  async sendReportAccessEmail(data: {
    to: string;
    name: string;
    reportSlug: string;
  }) {
    try {
      console.log(`📧 Enviando email de acesso ao relatório para ${data.to}...`);

      const reportUrl = `${APP_URL}/relatorio/${data.reportSlug}`;

      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: data.to,
        subject: '🎉 Seu Mapa do Glow Up 2026 está pronto!',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Parabéns, ${data.name}!</h1>
    <p style="color: white; font-size: 18px; margin: 10px 0 0 0;">Seu Mapa está pronto!</p>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Olá, <strong>${data.name}</strong>! ✨</p>
    
    <p>Seu <strong>Mapa do Glow Up 2026</strong> foi gerado com sucesso e já está disponível para acesso!</p>
    
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin: 30px 0; text-align: center;">
      <p style="color: white; margin: 0 0 15px 0;">Clique no botão abaixo para acessar:</p>
      <a href="${reportUrl}" style="display: inline-block; background: white; color: #667eea; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
        ✨ Acessar Meu Relatório
      </a>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="color: #667eea; margin-top: 0;">🔗 Link Direto:</h3>
      <p style="word-break: break-all; font-size: 14px; background: #f5f5f5; padding: 10px; border-radius: 5px; margin: 10px 0;">
        <a href="${reportUrl}" style="color: #667eea;">${reportUrl}</a>
      </p>
      <p style="font-size: 12px; color: #666; margin: 10px 0 0 0;">
        💡 <strong>Dica:</strong> Salve este email ou adicione o link aos favoritos do seu navegador!
      </p>
    </div>
    
    <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #4caf50;">
      <h3 style="color: #2e7d32; margin-top: 0;">🎁 O que você vai encontrar:</h3>
      <ul style="margin: 10px 0; padding-left: 20px; color: #2e7d32;">
        <li>Mapa Astral Completo + Revolução Solar 2026</li>
        <li>Numerologia do Ano Pessoal</li>
        <li>Tarot Mês a Mês (12 cartas personalizadas)</li>
        <li>Matriz do Destino Completa</li>
        <li>Astrologia Védica (Nakshatra + Dasha)</li>
        <li>Energia dos 7 Chakras</li>
        <li>Calendário dos Portais Energéticos</li>
        <li>15+ Scripts Personalizados para cada área</li>
        <li>Rituais de Poder</li>
        <li>Checklists 7/14/30 dias</li>
      </ul>
    </div>
    
    <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0;">
      <p style="margin: 0; color: #856404;">
        <strong>💫 Aproveite ao máximo:</strong><br>
        • Leia com calma, absorva cada informação<br>
        • Use os scripts diariamente<br>
        • Acompanhe os portais energéticos<br>
        • Pratique os rituais sugeridos<br>
        • Revisit seu mapa sempre que precisar!
      </p>
    </div>
    
    <p style="text-align: center; margin-top: 30px;">
      <strong>Seu Glow Up começa agora! ✨</strong>
    </p>
    
    <p style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
      Dúvidas ou precisa de ajuda?<br>
      <a href="mailto:contato@jovemistica.com" style="color: #667eea;">contato@jovemistica.com</a>
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>Jovem Mística © 2026 - Mapa do Glow Up</p>
    <p>Este é um email automático, não responda.</p>
  </div>
</body>
</html>
        `,
      });

      console.log('✅ Email de acesso enviado com sucesso:', result.data?.id);
      return result;
    } catch (error) {
      console.error('❌ Erro ao enviar email de acesso:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
