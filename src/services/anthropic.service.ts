import Anthropic from '@anthropic-ai/sdk';

/**
 * Serviço para gerar relatórios usando Anthropic Claude
 */
export class AnthropicService {
  private client: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️  ANTHROPIC_API_KEY não configurada - relatórios IA desabilitados');
      this.client = null as any; // Permitir continuar sem IA
      return;
    }

    this.client = new Anthropic({
      apiKey: apiKey,
    });
  }

  /**
   * Gera conteúdo personalizado em JSON (não HTML)
   */
  async generatePersonalizedContent(userData: any, calculatedData: any): Promise<any> {
    if (!this.client) {
      throw new Error('Anthropic API não configurada');
    }

    const prompt = this.buildPrompt(userData, calculatedData);
    
    try {
      const message = await this.client.messages.create({
        model: 'claude-3-haiku-20240307', // Modelo disponível e rápido
        max_tokens: 4096,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const responseText = message.content[0].type === 'text' 
        ? message.content[0].text 
        : '';
      
      // Limpar e parsear JSON
      const cleanText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      try {
        return JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Erro ao parsear JSON da IA:', parseError);
        console.log('Texto recebido:', cleanText.substring(0, 500));
        throw new Error('IA retornou formato inválido');
      }
    } catch (error) {
      console.error('Erro ao gerar relatório com Claude:', error);
      throw new Error('Falha na geração do relatório');
    }
  }

  /**
   * Constrói prompt para gerar JSON com textos personalizados
   */
  private buildPrompt(userData: any, calculatedData: any): string {
    const idade = calculatedData.idade;
    const nome = userData.primeiroNome;
    
    return `Você é a JOVEM MÍSTICA, especialista em astrologia, numerologia e tarot.

Gere textos PROFUNDOS e PERSONALIZADOS em JSON para:

**DADOS:**
- Nome: ${nome}
- Signo: ${calculatedData.signoSolar}
- Idade: ${idade} anos
- Ano Pessoal: ${calculatedData.numerologia.anoPessoal}
- Arcano Pessoal: ${calculatedData.tarot.arcanoPessoal.nome}
- Arcano 2026: ${calculatedData.tarot.arcano2026.nome}
- Mês Portal: ${this.getMonthName(calculatedData.portal.mes)}

**RETORNE JSON ESTRUTURADO:**

{
  "anoPessoal": {
    "titulo": "Seu Ano Pessoal ${calculatedData.numerologia.anoPessoal}",
    "textos": [
      "Parágrafo 1 profundo sobre o ano pessoal ${calculatedData.numerologia.anoPessoal} para ${nome}",
      "Parágrafo 2 conectando com ${calculatedData.signoSolar}",
      "Parágrafo 3 com dicas práticas"
    ],
    "destaque": "Frase impactante resumindo o ano"
  },
  "arcanoPessoal": {
    "nome": "${calculatedData.tarot.arcanoPessoal.nome}",
    "textos": [
      "Parágrafo 1 sobre significado profundo",
      "Parágrafo 2 sobre talentos de ${nome}",
      "Parágrafo 3 sobre desafios",
      "Parágrafo 4 sobre como honrar em 2026"
    ],
    "afirmacao": "Afirmação poderosa baseada no arcano"
  },
  "arcano2026": {
    "nome": "${calculatedData.tarot.arcano2026.nome}",
    "textos": [
      "Parágrafo 1 sobre energia do ano",
      "Parágrafo 2 sobre o que esperar",
      "Parágrafo 3 com estratégias práticas"
    ],
    "mantra": "Mantra para 2026"
  },
  "mesPortal": {
    "mes": "${this.getMonthName(calculatedData.portal.mes)}",
    "textos": [
      "Parágrafo 1 sobre por que é especial para ${nome}",
      "Parágrafo 2 sobre oportunidades",
      "Parágrafo 3 com ritual específico"
    ]
  },
  "areas": {
    "amor": {
      "textos": [
        "Parágrafo 1 sobre amor em 2026 para ${nome}",
        "Parágrafo 2 com padrões do signo",
        "Parágrafo 3 com conselhos práticos"
      ],
      "insights": [
        "Insight 1 personalizado",
        "Insight 2 acionável",
        "Insight 3 transformador"
      ]
    },
    "dinheiro": {
      "textos": [
        "Parágrafo 1 sobre finanças em 2026",
        "Parágrafo 2 sobre bloqueios a liberar",
        "Parágrafo 3 com estratégias"
      ],
      "insights": [
        "Insight 1 sobre abundância",
        "Insight 2 prático",
        "Insight 3 sobre mindset"
      ]
    },
    "carreira": {
      "textos": [
        "Parágrafo 1 sobre propósito de ${nome}",
        "Parágrafo 2 sobre talentos",
        "Parágrafo 3 com próximos passos"
      ],
      "insights": [
        "Insight 1 profissional",
        "Insight 2 sobre crescimento",
        "Insight 3 acionável"
      ]
    },
    "bemestar": {
      "textos": [
        "Parágrafo 1 sobre autocuidado",
        "Parágrafo 2 sobre práticas",
        "Parágrafo 3 sobre equilíbrio"
      ],
      "insights": [
        "Insight 1 sobre saúde",
        "Insight 2 sobre energia",
        "Insight 3 sobre bem-estar"
      ]
    }
  },
  "scripts": [
    {
      "titulo": "Manifesto de Intenção 2026",
      "texto": "Script completo personalizado para ${nome}"
    },
    {
      "titulo": "Afirmação Diária Poderosa",
      "texto": "Afirmação baseada nos arcanos de ${nome}"
    },
    {
      "titulo": "Ritual do Mês Portal",
      "texto": "Ritual específico para ${this.getMonthName(calculatedData.portal.mes)}"
    }
  ]
}

**TOM:** Use o nome ${nome} frequentemente. Seja inspirador mas prático. Linguagem moderna.

RETORNE APENAS O JSON. Nada antes ou depois.`;
  }

  private getMonthName(month: number): string {
    const months = [
      '', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return months[month] || 'janeiro';
  }
}

export const anthropicService = new AnthropicService();
