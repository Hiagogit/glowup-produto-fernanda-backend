import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { anthropicService } from '../services/anthropic.service';
import { geminiService } from '../services/gemini.service';

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
   * Gera um novo relatório astrológico
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

      if (!userData.primeiroNome || !userData.email) {
        console.log('❌ Validação falhou: campos obrigatórios faltando');
        res.status(400).json({
          error: 'Dados incompletos',
          message: 'primeiroNome e email são obrigatórios'
        });
        return;
      }

      console.log(`✅ Dados validados para: ${userData.primeiroNome} (${userData.email})`);

      // Gerar slug único
      const timestamp = Date.now();
      const slug = `${userData.primeiroNome.toLowerCase().replace(/[^a-z0-9]/g, '')}-${timestamp}`;

      console.log(`🔖 Slug gerado: ${slug}`);
      
      // Gerar conteúdo personalizado com Claude IA
      console.log('🤖 Gerando textos personalizados com Claude IA...');
      let aiPersonalizedText = null;
      
      try {
        aiPersonalizedText = await anthropicService.generatePersonalizedContent(userData, calculatedData);
        console.log('✅ Textos IA gerados com sucesso!');
      } catch (aiError: any) {
        console.warn('⚠️  Falha ao gerar com IA, continuando sem conteúdo personalizado:', aiError.message);
        // Continua sem IA se falhar
      }
      
      // Preparar dados JSON para o frontend renderizar com React
      const reportDataJson = {
        userData,
        calculatedData,
        generatedAt: new Date().toISOString(),
        aiContent: aiPersonalizedText, // ← Textos da IA em JSON
      };

      console.log('💾 Salvando no banco de dados...');

      // Salvar no Supabase de forma otimizada
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
          signo: calculatedData.signoSolar || 'Não informado',
          idade: calculatedData.idade || 0,
          ano_pessoal: calculatedData.numerologia?.anoPessoal || 1,
          arcano_pessoal_nome: calculatedData.tarot?.arcanoPessoal?.nome || 'Não informado',
          arcano_2026_nome: calculatedData.tarot?.arcano2026?.nome || 'Não informado',
          portal_mes: getMonthName(calculatedData.portal?.mes || 1),
          report_data_json: reportDataJson,
          amostra_html: null,
          relatorio_completo_html: null,
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
      console.log(`✅ Relatório salvo com sucesso! ID: ${report.id} | Tempo: ${duration}ms`);

      // Resposta rápida
      res.status(201).json({
        success: true,
        slug: report.slug,
        reportId: report.id,
        message: 'Relatório gerado com sucesso!'
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

function generateSampleHTML(userData: any, calculatedData: any): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mapa do Glow Up 2026 - ${userData.primeiroNome}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Playfair Display', serif; }
  </style>
</head>
<body class="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 min-h-screen">
  <div class="max-w-4xl mx-auto px-4 py-12">
    <!-- Header -->
    <header class="text-center mb-12">
      <h1 class="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
        ${userData.primeiroNome} ${userData.sobrenome || ''}
      </h1>
      <p class="text-2xl text-purple-600 mb-2">${calculatedData.signoSolar}</p>
      <p class="text-lg text-gray-600">Mapa do Glow Up 2026</p>
    </header>

    <!-- Ano Pessoal -->
    <section class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-lg">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">
        ✨ Seu Ano Pessoal: ${calculatedData.numerologia.anoPessoal}
      </h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-4">
        Em 2026, você está em um Ano Pessoal ${calculatedData.numerologia.anoPessoal}. 
        Este é um período especial de ${getAnoPessoalTheme(calculatedData.numerologia.anoPessoal)}.
      </p>
      <p class="text-gray-600">
        Este número revela o ritmo energético que vai guiar seu ano. 
        No relatório completo, você terá 6 páginas detalhando como aproveitar 
        cada fase deste ciclo.
      </p>
    </section>

    <!-- Arcanos -->
    <section class="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 mb-8 shadow-lg">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">
        🔮 Seus Arcanos de 2026
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white/60 rounded-2xl p-6">
          <h3 class="text-xl font-bold text-purple-700 mb-2">
            Arcano Pessoal
          </h3>
          <p class="text-2xl font-bold text-gray-800 mb-2">
            ${calculatedData.tarot.arcanoPessoal.nome}
          </p>
          <p class="text-gray-600">
            Este arcano revela sua essência e missão de vida.
          </p>
        </div>
        <div class="bg-white/60 rounded-2xl p-6">
          <h3 class="text-xl font-bold text-pink-700 mb-2">
            Arcano 2026
          </h3>
          <p class="text-2xl font-bold text-gray-800 mb-2">
            ${calculatedData.tarot.arcano2026.nome}
          </p>
          <p class="text-gray-600">
            O clima energético que vai reger seu ano.
          </p>
        </div>
      </div>
    </section>

    <!-- Mês Portal -->
    <section class="bg-yellow-50 border-2 border-yellow-300 rounded-3xl p-8 mb-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">
        🌟 Seu Mês Portal: ${getMonthName(calculatedData.portal.mes)}
      </h2>
      <p class="text-lg text-gray-700 mb-4">
        ${getMonthName(calculatedData.portal.mes)} será um mês especialmente poderoso para você! 
        É quando as energias se alinham perfeitamente com seus objetivos.
      </p>
      <p class="text-gray-600">
        No relatório completo, você terá um calendário detalhado com os 3 portais 
        energéticos do ano e rituais específicos para cada um.
      </p>
    </section>

    <!-- CTA -->
    <section class="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
      <h2 class="text-3xl font-bold mb-4">
        Esta é apenas uma amostra! ✨
      </h2>
      <p class="text-lg mb-6">
        O relatório completo tem 50 páginas com análise mês a mês, 
        scripts personalizados, checklists práticos e muito mais.
      </p>
      <button class="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
        Ver Relatório Completo
      </button>
    </section>

    <!-- Footer -->
    <footer class="text-center mt-12 text-gray-600">
      <p>© 2026 Jovemística • Mapa do Glow Up</p>
    </footer>
  </div>
</body>
</html>
  `;
}

function generateCompleteHTML(userData: any, calculatedData: any): string {
  // Por enquanto, retorna a amostra expandida
  // TODO: Implementar geração completa com IA
  return generateSampleHTML(userData, calculatedData) + `
    <!-- Placeholder para relatório completo - TODO: implementar com IA -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <p class="text-center text-gray-600">
        Relatório completo em desenvolvimento...
      </p>
    </div>
  `;
}

function getAnoPessoalTheme(ano: number): string {
  const themes: Record<number, string> = {
    1: 'novos começos e iniciativas',
    2: 'parcerias e relacionamentos',
    3: 'comunicação e expressão criativa',
    4: 'construção e estruturação',
    5: 'mudanças e liberdade',
    6: 'responsabilidade e família',
    7: 'espiritualidade e autoconhecimento',
    8: 'poder e manifestação',
    9: 'conclusão e transformação'
  };
  return themes[ano] || 'crescimento pessoal';
}

export const reportController = new ReportController();
