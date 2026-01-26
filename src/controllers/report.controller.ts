import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { wrapWithFullDocument } from '../services/htmlGenerator.service';
import { calcularTudo, CalculosCompletos } from '../services/calculations.service';
import { gerarRelatorioCompleto } from '../services/reportGenerator.service';

interface GenerateReportBody {
  userData: {
    primeiroNome: string;
    sobrenome?: string;
    email: string;
    nascimentoISO: string;
    horaNascimento?: string;
    cidadeUF?: string;
  };
  calculatedData: {
    signoSolar: string;
    idade: number;
    numerologia: {
      anoPessoal: number;
    };
    tarot: {
      arcanoPessoal: {
        nome: string;
      };
      arcano2026: {
        nome: string;
      };
    };
    portal: {
      mes: number;
    };
  };
  type?: 'complete';
}

export class ReportController {
  /**
   * Gera um novo relatório astrológico COMPLETO com 18 seções
   */
  async generateReport(req: Request, res: Response): Promise<void> {
    const startTime = Date.now();

    try {
      console.log('📥 Recebendo requisição de geração de relatório...');

      const { userData, calculatedData }: GenerateReportBody = req.body;

      // Validação básica
      if (!userData || !calculatedData) {
        console.log('❌ Validação falhou: dados incompletos');
        res.status(400).json({
          error: 'Dados incompletos',
          message: 'userData e calculatedData são obrigatórios'
        });
        return;
      }

      if (!userData.primeiroNome || !userData.email || !userData.nascimentoISO) {
        console.log('❌ Validação falhou: campos obrigatórios faltando');
        res.status(400).json({
          error: 'Dados incompletos',
          message: 'primeiroNome, email e nascimentoISO são obrigatórios'
        });
        return;
      }

      console.log(`✅ Dados validados para: ${userData.primeiroNome} (${userData.email})`);

      // Parsear data de nascimento
      const nascimentoDate = new Date(userData.nascimentoISO);
      const dia = nascimentoDate.getUTCDate();
      const mes = nascimentoDate.getUTCMonth() + 1; // JavaScript months are 0-indexed
      const anoNascimento = nascimentoDate.getUTCFullYear();

      console.log(`📅 Data de nascimento: ${dia}/${mes}/${anoNascimento}`);

      // Gerar slug único
      const timestamp = Date.now();
      const slug = `${userData.primeiroNome.toLowerCase().replace(/[^a-z0-9]/g, '')}-${timestamp}`;

      console.log(`🔖 Slug gerado: ${slug}`);

      // ========================================
      // NOVO: Calcular TUDO usando o serviço completo
      // ========================================
      console.log('🔢 Calculando todos os dados astrológicos e numerológicos...');
      const calculos: CalculosCompletos = calcularTudo(
        userData.primeiroNome,
        dia,
        mes,
        anoNascimento
      );
      console.log(`✅ Cálculos completos: Ano Pessoal ${calculos.anoPessoal}, Arcano Pessoal ${calculos.arcanoPessoalNum} (${calculos.arcanoPessoal})`);

      // ========================================
      // NOVO: Gerar relatório completo com 19 seções
      // ========================================
      console.log('📝 Gerando relatório completo com 19 seções...');

      // Gerar HTML do relatório completo
      const reportContent = gerarRelatorioCompleto(calculos);
      console.log(`✅ Conteúdo gerado: ${reportContent.length} caracteres`);

      // Envolver com documento completo (CSS Premium)
      const reportHtml = wrapWithFullDocument(reportContent, userData.primeiroNome);
      console.log(`✅ HTML final com CSS: ${reportHtml.length} caracteres`);

      // Preparar dados JSON completos para o frontend
      const reportDataJson = {
        userData,
        calculatedData: {
          ...calculatedData,
          // Adicionar todos os novos cálculos
          calculosCompletos: calculos,
        },
        generatedAt: new Date().toISOString(),
      };

      console.log('💾 Salvando no banco de dados...');

      // Salvar no Supabase
      const portalMesNome = getMonthName(calculos.portalMonths[0] || 1);
      const { data: report, error: dbError } = await supabaseAdmin
        .from('reports')
        .insert({
          user_id: req.user?.id || null,
          slug,
          primeiro_nome: userData.primeiroNome,
          sobrenome: userData.sobrenome || '',
          data_nascimento: userData.nascimentoISO,
          cidade_nascimento: userData.cidadeUF || '',
          email: userData.email,
          signo: calculos.signo,
          idade: calculos.idade,
          ano_pessoal: calculos.anoPessoal,
          arcano_pessoal_nome: calculos.arcanoPessoal,
          arcano_2026_nome: calculos.arcano2026,
          portal_mes: portalMesNome,
          report_data_json: reportDataJson,
          amostra_html: null,
          relatorio_completo_html: reportHtml,
          is_paid: true,
          report_type: 'complete',
        })
        .select('id, slug')
        .single();

      if (dbError) {
        console.error('❌ Erro ao salvar no banco:', dbError);
        throw new Error(`Erro ao salvar: ${dbError.message}`);
      }

      const duration = Date.now() - startTime;
      console.log(`✅ Relatório COMPLETO salvo! ID: ${report.id} | Tempo: ${duration}ms`);

      // Resposta
      res.status(201).json({
        success: true,
        slug: report.slug,
        reportId: report.id,
        message: 'Relatório completo gerado com sucesso!'
      });

    } catch (error: any) {
      const duration = Date.now() - startTime;
      console.error(`❌ Erro ao gerar relatório (${duration}ms):`, error);

      res.status(500).json({
        error: 'Erro interno no servidor',
        message: error.message || 'Ocorreu um erro ao gerar o relatório'
      });
    }
  }

  /**
   * Busca um relatório pelo slug
   */
  async getReportBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;

      const { data: report, error } = await supabaseAdmin
        .from('reports')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !report) {
        res.status(404).json({
          error: 'Relatório não encontrado',
          message: 'Não foi possível encontrar o relatório solicitado'
        });
        return;
      }

      res.status(200).json(report);
    } catch (error) {
      console.error('Erro ao buscar relatório:', error);
      res.status(500).json({
        error: 'Erro interno no servidor',
        message: 'Ocorreu um erro ao buscar o relatório'
      });
    }
  }

  /**
   * Lista todos os relatórios do usuário autenticado
   */
  async listUserReports(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          error: 'Não autenticado',
          message: 'É necessário estar autenticado'
        });
        return;
      }

      const { data: reports, error } = await supabaseAdmin
        .from('reports')
        .select('id, slug, primeiro_nome, signo, created_at, report_type')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      res.status(200).json({
        reports: reports || []
      });
    } catch (error) {
      console.error('Erro ao listar relatórios:', error);
      res.status(500).json({
        error: 'Erro interno no servidor',
        message: 'Ocorreu um erro ao listar os relatórios'
      });
    }
  }
}

// Helper functions
function getMonthName(month: number): string {
  const months = [
    '', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  return months[month] || 'janeiro';
}

export const reportController = new ReportController();
