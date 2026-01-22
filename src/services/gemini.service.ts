import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Serviço para gerar relatórios usando Google Gemini AI
 */
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não configurada no .env');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-pro', // Modelo estável e funcional
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8000,
      }
    });
  }

  /**
   * Gera relatório completo com IA
   */
  async generateCompleteReport(userData: any, calculatedData: any): Promise<string> {
    const prompt = this.buildPrompt(userData, calculatedData);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text;
    } catch (error) {
      console.error('Erro ao gerar relatório com IA:', error);
      throw new Error('Falha na geração do relatório');
    }
  }

  /**
   * Constrói o prompt ultra personalizado e detalhado
   */
  private buildPrompt(userData: any, calculatedData: any): string {
    const idade = calculatedData.idade;
    const signo = calculatedData.signoSolar;
    const anoPessoal = calculatedData.numerologia.anoPessoal;
    const arcanoPessoal = calculatedData.tarot.arcanoPessoal.nome;
    const arcano2026 = calculatedData.tarot.arcano2026.nome;
    const mesPortal = this.getMonthName(calculatedData.portal.mes);
    
    return `Você é a JOVEMÍSTICA, especialista em astrologia, numerologia e tarot. Crie um RELATÓRIO HTML COMPLETO, IMERSIVO E VISUALMENTE DESLUMBRANTE.

**DADOS DO USUÁRIO:**
- Nome: ${userData.primeiroNome}
- Signo: ${signo}
- Idade: ${idade} anos
- Ano Pessoal 2026: ${anoPessoal}
- Arcano Pessoal: ${arcanoPessoal}
- Arcano de 2026: ${arcano2026}
- Mês Portal: ${mesPortal}

**INSTRUÇÕES CRÍTICAS:**

1. **ESTRUTURA HTML COMPLETA:**
   - <!DOCTYPE html>
   - <head> com Tailwind CDN e Google Fonts (Playfair Display + Inter)
   - <body> com TODAS as seções abaixo
   - Animações CSS customizadas
   - Campo de estrelas animado no fundo (opcional mas bonito)

2. **HERO SECTION** (min-h-screen):
   - Background: gradiente from-[#FFF5C3] to-[#CFFFE5]
   - Badge com signo + idade
   - Título H1: "Olá, ${userData.primeiroNome}!"
   - Parágrafo inspirador sobre 2026
   - 3 cards side-by-side: Ano Pessoal, Arcano Pessoal, Arcano 2026
   - Badge especial para mês portal

3. **SEÇÃO TRIO MÁGICO** (accordions ou cards):
   - **Card 1: Ano Pessoal ${anoPessoal}**
     • 4-5 parágrafos profundos
     • Significado do ciclo
     • Pontos de força (lista)
     • Pontos de atenção (lista)
     • Perguntas para reflexão
     
   - **Card 2: Arcano Pessoal ${arcanoPessoal}**
     • 4-5 parágrafos sobre missão de alma
     • Virtudes luminosas (lista)
     • Armadilhas shadow (lista)
     • Ritual para honrar o arcano
     
   - **Card 3: Arcano 2026 ${arcano2026}**
     • 4-5 parágrafos sobre energia do ano
     • Clima do ano
     • Mapa de decisões
     • Mantra personalizado

4. **CALENDÁRIO MENSAL INTERATIVO:**
   - Grid de 12 cards (3x4 ou 4x3)
   - Cada mês com: nome, arcano do mês, tag de energia, intensidade
   - ${mesPortal} destaque com badge "🌟 PORTAL" e animação
   - Hover com tooltip
   - 3 top meses em destaque

5. **ÁREAS DA VIDA** (tabs ou grid 2x2):
   - 💖 Amor & Relacionamentos (2-3 parágrafos + 3 insights)
   - 🚀 Carreira & Propósito (2-3 parágrafos + 3 insights)
   - 💰 Dinheiro & Abundância (2-3 parágrafos + 3 insights)
   - 🌿 Vida & Bem-Estar (2-3 parágrafos + 3 insights)

6. **FERRAMENTAS PRÁTICAS:**
   - **Checklist 7 dias** (com checkboxes HTML funcionais)
   - **Script #1:** Manifesto de Intenção 2026 (botão copiar)
   - **Script #2:** Afirmação Diária (botão copiar)
   - **Script #3:** Ritual do Mês Portal (botão copiar)
   - Preview bloqueado de +10 scripts no relatório completo

7. **TABELA COMPARATIVA:**
   - Amostra vs Relatório Completo
   - 10+ linhas de features
   - Visual clean com ícones ✅ e 🌟

8. **PROVAS SOCIAIS:**
   - 3 depoimentos fictícios mas realistas
   - Estrelas de avaliação

9. **CTA FINAL ÉPICO:**
   - Background gradient roxo
   - Título call-to-action
   - Lista de benefícios
   - Botão grande "GERAR MEU RELATÓRIO COMPLETO"

**DESIGN SYSTEM:**
- Cores principais: #C8A2C8 (lilás), #FFF5C3 (manteiga), #CFFFE5 (mint), #7C3AED (roxo-profundo)
- Cards: rounded-3xl, shadow-candy, border-2, hover effects
- Animações: fadeIn, slideUp, scaleIn, bounceIn, float, pulse
- Typography: Playfair Display (headings), Inter (body)
- Responsive: mobile-first, max-w-6xl containers

**TOM DE VOZ:**
- Caloroso, inspirador, místico mas prático
- Use ${userData.primeiroNome} constantemente
- Conecte tudo (signo → ano pessoal → arcanos → portal)
- Sem genericidade - TUDO personalizado
- Frases memoráveis e acionáveis

**SCRIPTS JAVASCRIPT:**
- Copiar para clipboard
- Animação de progresso em checklists
- Tabs/accordions se usar
- Stars field animado (opcional)

RETORNE APENAS O HTML COMPLETO. Nenhum texto antes ou depois. Comece com <!DOCTYPE html> e termine com </html>.`;
  }

  private getMonthName(month: number): string {
    const months = [
      '', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[month] || 'Janeiro';
  }

  /**
   * Gera conteúdo personalizado em JSON para componentes React
   */
  async generatePersonalizedContent(userData: any, calculatedData: any): Promise<any> {
    const prompt = this.buildJSONPrompt(userData, calculatedData);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Remove markdown code blocks se existir
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      return JSON.parse(cleanText);
    } catch (error) {
      console.error('Erro ao gerar conteúdo personalizado:', error);
      throw new Error('Falha na geração do conteúdo');
    }
  }

  /**
   * Constrói prompt para gerar JSON estruturado
   */
  private buildJSONPrompt(userData: any, calculatedData: any): string {
    const idade = calculatedData.idade;
    const signo = calculatedData.signoSolar;
    const anoPessoal = calculatedData.numerologia.anoPessoal;
    const arcanoPessoal = calculatedData.tarot.arcanoPessoal.nome;
    const arcano2026 = calculatedData.tarot.arcano2026.nome;
    const mesPortal = this.getMonthName(calculatedData.portal.mes);
    
    return `Você é JOVEMÍSTICA, especialista em astrologia, numerologia e tarot. Crie conteúdo TOTALMENTE PERSONALIZADO em JSON.

**DADOS:**
- Nome: ${userData.primeiroNome}
- Signo: ${signo}
- Idade: ${idade} anos
- Ano Pessoal: ${anoPessoal}
- Arcano Pessoal: ${arcanoPessoal}
- Arcano 2026: ${arcano2026}
- Mês Portal: ${mesPortal}

**RETORNE JSON EXATO:**

{
  "arcanos": {
    "pessoal": {
      "descricao": "3-4 parágrafos sobre ${arcanoPessoal} como missão de vida para ${userData.primeiroNome}",
      "energia": "palavra-chave"
    },
    "ano2026": {
      "descricao": "3-4 parágrafos sobre ${arcano2026} guiando 2026 para ${userData.primeiroNome}",
      "energia": "palavra-chave"
    }
  },
  "areas": {
    "amor": {
      "insights": [
        "insight 1 personalizado",
        "insight 2 personalizado",
        "insight 3 personalizado"
      ],
      "descricao": "2-3 parágrafos sobre amor em 2026"
    },
    "dinheiro": {
      "insights": [
        "insight 1 personalizado",
        "insight 2 personalizado",
        "insight 3 personalizado"
      ],
      "descricao": "2-3 parágrafos sobre dinheiro em 2026"
    },
    "carreira": {
      "insights": [
        "insight 1 personalizado",
        "insight 2 personalizado",
        "insight 3 personalizado"
      ],
      "descricao": "2-3 parágrafos sobre carreira em 2026"
    },
    "bemestar": {
      "insights": [
        "insight 1 personalizado",
        "insight 2 personalizado",
        "insight 3 personalizado"
      ],
      "descricao": "2-3 parágrafos sobre bem-estar em 2026"
    }
  },
  "scripts": [
    {
      "categoria": "Amor",
      "titulo": "Conversa DTR",
      "contexto": "Para definir relacionamento",
      "script": "Script personalizado para ${userData.primeiroNome}"
    },
    {
      "categoria": "Dinheiro",
      "titulo": "Organização Financeira",
      "contexto": "Para controlar gastos",
      "script": "Script personalizado"
    },
    {
      "categoria": "Carreira",
      "titulo": "Pedido de Promoção",
      "contexto": "Para 1:1 com gestor",
      "script": "Script personalizado"
    }
  ],
  "calendario": {
    "janeiro": { "energia": "palavra", "destaque": "frase curta" },
    "fevereiro": { "energia": "palavra", "destaque": "frase curta" },
    "marco": { "energia": "palavra", "destaque": "frase curta" },
    "abril": { "energia": "palavra", "destaque": "frase curta" },
    "maio": { "energia": "palavra", "destaque": "frase curta" },
    "junho": { "energia": "palavra", "destaque": "frase curta" },
    "julho": { "energia": "palavra", "destaque": "frase curta" },
    "agosto": { "energia": "palavra", "destaque": "frase curta" },
    "setembro": { "energia": "palavra", "destaque": "frase curta" },
    "outubro": { "energia": "palavra", "destaque": "frase curta" },
    "novembro": { "energia": "palavra", "destaque": "frase curta" },
    "dezembro": { "energia": "palavra", "destaque": "frase curta" }
  }
}

RETORNE APENAS O JSON. Nada antes ou depois.`;
  }

  /**
   * Gera amostra gratuita (versão resumida)
   */
  async generateSampleReport(userData: any, calculatedData: any): Promise<string> {
    const prompt = `Crie uma AMOSTRA HTML atrativa (30-40% do relatório completo) baseada em:

Nome: ${userData.primeiroNome}
Signo: ${calculatedData.signoSolar}
Ano Pessoal: ${calculatedData.numerologia.anoPessoal}
Arcano Pessoal: ${calculatedData.tarot.arcanoPessoal.nome}
Arcano 2026: ${calculatedData.tarot.arcano2026.nome}
Mês Portal: ${this.getMonthName(calculatedData.portal.mes)}

**INCLUA:**
1. Hero bonito
2. 3 cards principais (ano + arcanos) - versão resumida
3. Calendário simplificado
4. Snapshot das 4 áreas (1 parágrafo cada)
5. Checklist 7 dias preview
6. 1 script copiável
7. Tabela comparativa Amostra vs Completo
8. CTA forte para upgrade

**DESIGN:** Tailwind CSS, gradientes, animações, rounded-3xl, responsive.

Retorne APENAS HTML completo.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro ao gerar amostra:', error);
      throw new Error('Falha na geração da amostra');
    }
  }
}

export const geminiService = new GeminiService();
