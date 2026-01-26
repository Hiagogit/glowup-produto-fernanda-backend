import Anthropic from '@anthropic-ai/sdk';
import {
  CalculosCompletos,
  ARCANO_NOMES,
  MESES_NOMES
} from './calculations.service';

/**
 * Serviço para gerar relatórios usando Anthropic Claude
 * Versão Completa com 18 seções - Igual ao Lovable
 */
export class AnthropicService {
  private client: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.warn('⚠️  ANTHROPIC_API_KEY não configurada - relatórios IA desabilitados');
      this.client = null as any;
      return;
    }

    this.client = new Anthropic({
      apiKey: apiKey,
    });
  }

  /**
   * Gera o relatório HTML completo com todas as 18 seções
   */
  async generateCompleteReport(calculos: CalculosCompletos): Promise<string> {
    if (!this.client) {
      throw new Error('Anthropic API não configurada');
    }

    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildUserPrompt(calculos);

    try {
      console.log('🤖 Gerando relatório completo com Claude...');

      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022', // Modelo mais capaz para conteúdo longo
        max_tokens: 16000, // Máximo para relatório extenso
        temperature: 0.8,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      });

      const responseText = message.content[0].type === 'text'
        ? message.content[0].text
        : '';

      // Limpar possíveis marcadores de código
      let html = responseText
        .replace(/```html\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      // Garantir que começa com o container correto
      if (!html.startsWith('<div class="jm-report">')) {
        const startIndex = html.indexOf('<div class="jm-report">');
        if (startIndex > 0) {
          html = html.substring(startIndex);
        }
      }

      console.log(`✅ HTML gerado com ${html.length} caracteres`);
      return html;

    } catch (error) {
      console.error('❌ Erro ao gerar relatório com Claude:', error);
      throw new Error('Falha na geração do relatório');
    }
  }

  /**
   * System prompt com todas as regras e classes CSS
   */
  private buildSystemPrompt(): string {
    return `Você é a JOVEM MÍSTICA, criadora do MELHOR relatório astrológico do Brasil — 50+ páginas de conteúdo PREMIUM.

═══════════════════════════════════════════════════════════════
🚨 REGRAS ABSOLUTAS — VIOLAÇÃO = FALHA
═══════════════════════════════════════════════════════════════

1. ✅ Retorne SOMENTE HTML puro — sem markdown, sem \`\`\`html, sem JSON, sem explicações
2. ✅ Comece EXATAMENTE com: <div class="jm-report">
3. ✅ NÃO inclua <style> ou <link> — o CSS já está injetado
4. ✅ Use TODAS as classes CSS listadas abaixo
5. ✅ TODAS as imagens de arcanos devem usar as URLs exatas fornecidas
6. ✅ Cada seção deve ter NO MÍNIMO 5-7 parágrafos DENSOS (4-6 frases cada)
7. ✅ PERSONALIZE com o nome do usuário em CADA seção
8. ✅ NÃO deixe placeholders — PREENCHA ABSOLUTAMENTE TUDO

═══════════════════════════════════════════════════════════════
🎨 CLASSES CSS PRINCIPAIS
═══════════════════════════════════════════════════════════════

ESTRUTURA:
• jm-report = container principal
• jm-cover = capa animada (com .star, .badge, .subtitle, .tagline)
• jm-toc = sumário clicável
• jm-section = card de seção (+ accent-lilas/mint/gold/rose/blue/coral)
• jm-divider = separador entre seções

TAROT:
• jm-tarot-grid = grid de cartas
• jm-tarot-card = carta individual com <img>, h4, .numero, .energia
• jm-month-card = card mensal (+ is-portal para portais)
• jm-month-header, jm-month-badge

MATRIZ DO DESTINO:
• jm-matrix = container da matriz
• jm-matrix-diamond = losango visual
• jm-matrix-node = nó (+ top/bottom/left/right/center/top-right/etc)
• jm-special-lines, jm-special-line = linhas especiais

CHAKRAS:
• jm-chakra-grid, jm-chakra-card, jm-chakra-indicator, jm-chakra-valores

ASTROLOGIA:
• jm-vedic-card = card dourado védico
• jm-revolucao = container revolução solar
• jm-casa-grid, jm-casa-item

RITUAIS/SCRIPTS:
• jm-ritual, jm-ritual-steps = ritual com passos numerados
• jm-script-box = caixa escura para afirmações
• jm-callout = destaque (+ mint/gold/rose)
• jm-checklist = lista com checks

ÁREAS:
• jm-area-grid, jm-area-card, jm-area-icon

═══════════════════════════════════════════════════════════════
📝 TOM E ESTILO
═══════════════════════════════════════════════════════════════

• Empoderador e acolhedor, não esotérico demais
• Vocabulário: glow up, vibe, manifestar, energia, main character
• Use o NOME do usuário frequentemente
• Intercale texto com elementos visuais

EMOJIS PARA TÍTULOS:
🌟 Signo | 🔢 Numerologia | 🃏 Arcanos | 🔮 Matriz
🌈 Chakras | ☀️ Revolução Solar | 🕉️ Védico | 📅 Meses
💖 Amor | 💼 Carreira | 💰 Dinheiro | 🌿 Saúde
🔥 Rituais | 📜 Scripts | ✅ Checklists | 🌙 Final`;
  }

  /**
   * User prompt com todos os dados calculados
   */
  private buildUserPrompt(calc: CalculosCompletos): string {
    const mesesData = calc.cartasMensais.map(card => {
      const isPortal = calc.portalMonths.includes(card.mes);
      return { ...card, isPortal };
    });

    return `═══════════════════════════════════════════════════════════════
DADOS PERSONALIZADOS DO USUÁRIO
═══════════════════════════════════════════════════════════════

NOME: ${calc.nome}
IDADE: ${calc.idade} anos
SIGNO: ${calc.signo}
ELEMENTO: ${calc.signoInfo.elemento}
QUALIDADE: ${calc.signoInfo.qualidade}
REGENTE: ${calc.signoInfo.regente}
DESCRIÇÃO SIGNO: ${calc.signoInfo.descricao}

ANO PESSOAL: ${calc.anoPessoal}
TEMA DO ANO: ${calc.anoPessoalInfo.tema}
FOCO DO ANO: ${calc.anoPessoalInfo.foco}
DESAFIO DO ANO: ${calc.anoPessoalInfo.desafio}
AÇÃO DO ANO: ${calc.anoPessoalInfo.acao}

ARCANO PESSOAL: ${calc.arcanoPessoal} (Arcano ${calc.arcanoPessoalNum})
IMAGEM ARCANO PESSOAL: ${calc.arcanoPessoalImagem}
LUZ: ${calc.arcanoPessoalKeywords.luz.join(', ')}
SOMBRA: ${calc.arcanoPessoalKeywords.sombra.join(', ')}
ENERGIA: ${calc.arcanoPessoalKeywords.energia}

ARCANO 2026: ${calc.arcano2026} (Arcano ${calc.arcano2026Num})
IMAGEM ARCANO 2026: ${calc.arcano2026Imagem}
LUZ: ${calc.arcano2026Keywords.luz.join(', ')}
SOMBRA: ${calc.arcano2026Keywords.sombra.join(', ')}
ENERGIA: ${calc.arcano2026Keywords.energia}

MATRIZ DO DESTINO:
• Centro (Energia Central): ${calc.destinyMatrix.center} - ${ARCANO_NOMES[calc.destinyMatrix.center]}
• Topo (Masculino): ${calc.destinyMatrix.top} - ${ARCANO_NOMES[calc.destinyMatrix.top]}
• Base (Feminino): ${calc.destinyMatrix.bottom} - ${ARCANO_NOMES[calc.destinyMatrix.bottom]}
• Esquerda (Passado): ${calc.destinyMatrix.left} - ${ARCANO_NOMES[calc.destinyMatrix.left]}
• Direita (Futuro): ${calc.destinyMatrix.right} - ${ARCANO_NOMES[calc.destinyMatrix.right]}
• Propósito de Vida: ${calc.destinyMatrix.purpose} - ${ARCANO_NOMES[calc.destinyMatrix.purpose]}
• Talento Principal: ${calc.destinyMatrix.talent} - ${ARCANO_NOMES[calc.destinyMatrix.talent]}
• Karma a Transmutar: ${calc.destinyMatrix.karma} - ${ARCANO_NOMES[calc.destinyMatrix.karma]}
• Linha do Amor: ${calc.destinyMatrix.love} - ${ARCANO_NOMES[calc.destinyMatrix.love]}
• Linha do Dinheiro: ${calc.destinyMatrix.money} - ${ARCANO_NOMES[calc.destinyMatrix.money]}

CHAKRAS COM VALORES:
${calc.chakras.map(c =>
  `• ${c.icone} ${c.nome}: Físico ${c.fisico}, Energético ${c.energetico}, Emocional ${c.emocional} (${c.tema})`
).join('\n')}

ASTROLOGIA VÉDICA:
• Nakshatra: ${calc.nakshatra.nome}
• Símbolo: ${calc.nakshatra.simbolo}
• Regente Védico: ${calc.nakshatra.regente}
• Tema Nakshatra: ${calc.nakshatra.tema}

PORTAIS ENERGÉTICOS: ${calc.portalMonths.map(m => MESES_NOMES[m]).join(', ')}

CARTAS MENSAIS (12 MESES):
${mesesData.map(card =>
  `• ${card.mesNome}: ${card.arcano} (Arcano ${card.numero})${card.isPortal ? ' ★ PORTAL' : ''} - Energia: ${card.energia} | Luz: ${card.luz.join(', ')} | Sombra: ${card.sombra.join(', ')} | IMAGEM: ${card.imagem}`
).join('\n')}

═══════════════════════════════════════════════════════════════
ESTRUTURA COMPLETA DO RELATÓRIO — GERE TUDO ABAIXO
═══════════════════════════════════════════════════════════════

Gere o relatório completo em HTML seguindo EXATAMENTE esta estrutura. CADA SEÇÃO deve ter conteúdo EXTENSO (5-7 parágrafos). NÃO use comentários como "escreva aqui" — PREENCHA com conteúdo REAL.

<div class="jm-report">

<!-- 1. CAPA -->
<section class="jm-cover">
  <span class="star">✨</span><span class="star">⭐</span><span class="star">💫</span><span class="star">✨</span>
  <span class="star">🌟</span><span class="star">⭐</span><span class="star">💫</span><span class="star">✨</span>
  <span class="star">✦</span><span class="star">☆</span>
  <h1>✨ ${calc.nome} ✨</h1>
  <p class="subtitle">O Mapa Completo do Seu Glow Up em 2026</p>
  <div class="badge">☀️ ${calc.signo} • Ano ${calc.anoPessoal} • ${calc.arcanoPessoal}</div>
  <p class="tagline">"2026 é seu ano de ${calc.anoPessoalInfo.tema.toLowerCase()}. Prepare-se para brilhar como nunca!"</p>
</section>

<div class="jm-divider"><span>✨</span></div>

<!-- 2. SUMÁRIO -->
<nav class="jm-toc" id="sumario">
  <h2>📚 O Que Você Vai Descobrir</h2>
  <ol>
    <li><a href="#essencia">🌟 Sua Essência Astrológica</a></li>
    <li><a href="#numerologia">🔢 Numerologia e Ano Pessoal</a></li>
    <li><a href="#arcano-pessoal">🃏 Seu Arcano de Vida</a></li>
    <li><a href="#arcano-2026">✨ Arcano Regente de 2026</a></li>
    <li><a href="#matriz">🔮 Matriz do Destino Completa</a></li>
    <li><a href="#chakras">🌈 Energia dos 7 Chakras</a></li>
    <li><a href="#revolucao">☀️ Revolução Solar 2026/2027</a></li>
    <li><a href="#vedico">🕉️ Astrologia Védica</a></li>
    <li><a href="#portais">🌟 Os 3 Portais Energéticos</a></li>
    <li><a href="#meses">📅 Jornada Mês a Mês com Tarot</a></li>
    <li><a href="#amor">💖 Amor & Relacionamentos</a></li>
    <li><a href="#carreira">💼 Carreira & Propósito</a></li>
    <li><a href="#dinheiro">💰 Dinheiro & Prosperidade</a></li>
    <li><a href="#saude">🌿 Saúde & Bem-Estar</a></li>
    <li><a href="#rituais">🔥 Rituais de Poder</a></li>
    <li><a href="#scripts">📜 15+ Scripts Mágicos</a></li>
    <li><a href="#checklists">✅ Checklists do Glow Up</a></li>
    <li><a href="#final">🌙 Mensagem Final</a></li>
  </ol>
</nav>

<div class="jm-divider"><span>🌟</span></div>

<!-- SEÇÃO 3: ESSÊNCIA ASTROLÓGICA - ESCREVA 6 PARÁGRAFOS COMPLETOS sobre ser de ${calc.signo}, elemento ${calc.signoInfo.elemento}, regente ${calc.signoInfo.regente}, qualidade ${calc.signoInfo.qualidade}, dons naturais, desafios típicos, e como isso afeta ${calc.nome} em 2026 -->
<section class="jm-section accent-lilas" id="essencia">
  <h2>🌟 Sua Essência Astrológica: ${calc.signo}</h2>
  <!-- GERE 6 PARÁGRAFOS PROFUNDOS AQUI -->
  <div class="jm-callout">
    <strong>💡 Insight Cósmico para ${calc.nome}:</strong> <!-- Insight sobre ${calc.signoInfo.regente} em 2026 -->
  </div>
</section>

<div class="jm-divider"><span>🔢</span></div>

<!-- SEÇÃO 4: NUMEROLOGIA - ESCREVA 6 PARÁGRAFOS sobre Ano Pessoal ${calc.anoPessoal}, tema ${calc.anoPessoalInfo.tema}, foco ${calc.anoPessoalInfo.foco}, desafio ${calc.anoPessoalInfo.desafio} -->
<section class="jm-section accent-gold" id="numerologia">
  <h2>🔢 Ano Pessoal ${calc.anoPessoal}: ${calc.anoPessoalInfo.tema}</h2>
  <!-- GERE 6 PARÁGRAFOS PROFUNDOS AQUI -->
  <div class="jm-area-grid">
    <div class="jm-area-card"><div class="jm-area-icon">🎯</div><h4>Foco Principal</h4><p>${calc.anoPessoalInfo.foco}</p></div>
    <div class="jm-area-card"><div class="jm-area-icon">⚠️</div><h4>Desafio a Superar</h4><p>${calc.anoPessoalInfo.desafio}</p></div>
    <div class="jm-area-card"><div class="jm-area-icon">🚀</div><h4>Ação Recomendada</h4><p>${calc.anoPessoalInfo.acao}</p></div>
  </div>
</section>

<div class="jm-divider"><span>🃏</span></div>

<!-- SEÇÃO 5: ARCANO PESSOAL com imagem ${calc.arcanoPessoalImagem} - ESCREVA 6 PARÁGRAFOS sobre ${calc.arcanoPessoal}, luz: ${calc.arcanoPessoalKeywords.luz.join(', ')}, sombra: ${calc.arcanoPessoalKeywords.sombra.join(', ')} -->
<section class="jm-section accent-rose" id="arcano-pessoal">
  <h2>🃏 Seu Arcano de Vida: ${calc.arcanoPessoal}</h2>
  <div class="jm-tarot-grid">
    <div class="jm-tarot-card">
      <img src="${calc.arcanoPessoalImagem}" alt="${calc.arcanoPessoal}" />
      <div class="numero">Arcano ${calc.arcanoPessoalNum}</div>
      <h4>${calc.arcanoPessoal}</h4>
      <div class="energia">${calc.arcanoPessoalKeywords.energia}</div>
    </div>
  </div>
  <!-- GERE 6 PARÁGRAFOS PROFUNDOS AQUI -->
  <div class="jm-callout rose">
    <strong>💖 Mantra do Seu Arcano:</strong> <!-- Crie mantra personalizado -->
  </div>
</section>

<div class="jm-divider"><span>✨</span></div>

<!-- SEÇÃO 6: ARCANO 2026 com imagem ${calc.arcano2026Imagem} - ESCREVA 6 PARÁGRAFOS sobre ${calc.arcano2026}, como interage com ${calc.arcanoPessoal} -->
<section class="jm-section accent-blue" id="arcano-2026">
  <h2>✨ Arcano Regente de 2026: ${calc.arcano2026}</h2>
  <div class="jm-tarot-grid">
    <div class="jm-tarot-card">
      <img src="${calc.arcano2026Imagem}" alt="${calc.arcano2026}" />
      <div class="numero">Arcano ${calc.arcano2026Num}</div>
      <h4>${calc.arcano2026}</h4>
      <div class="energia">${calc.arcano2026Keywords.energia}</div>
    </div>
  </div>
  <!-- GERE 6 PARÁGRAFOS PROFUNDOS AQUI -->
  <div class="jm-callout gold">
    <strong>✨ Combinação Poderosa:</strong> <!-- Analise ${calc.arcanoPessoal} + ${calc.arcano2026} -->
  </div>
</section>

<div class="jm-divider"><span>🔮</span></div>

<!-- SEÇÃO 7: MATRIZ DO DESTINO COMPLETA - Interprete CADA posição -->
<section class="jm-section accent-lilas" id="matriz">
  <h2>🔮 Sua Matriz do Destino Completa</h2>
  <p><strong>${calc.nome}</strong>, a Matriz do Destino revela os padrões energéticos fundamentais da sua alma.</p>
  <div class="jm-matrix">
    <div class="jm-matrix-diamond">
      <div class="jm-matrix-node top" title="Energia Masculina">${calc.destinyMatrix.top}</div>
      <div class="jm-matrix-node right" title="Futuro">${calc.destinyMatrix.right}</div>
      <div class="jm-matrix-node bottom" title="Energia Feminina">${calc.destinyMatrix.bottom}</div>
      <div class="jm-matrix-node left" title="Passado">${calc.destinyMatrix.left}</div>
      <div class="jm-matrix-node center" title="Energia Central">${calc.destinyMatrix.center}</div>
      <div class="jm-matrix-node top-right">${calc.destinyMatrix.topRight}</div>
      <div class="jm-matrix-node bottom-right">${calc.destinyMatrix.bottomRight}</div>
      <div class="jm-matrix-node bottom-left">${calc.destinyMatrix.bottomLeft}</div>
      <div class="jm-matrix-node top-left">${calc.destinyMatrix.topLeft}</div>
    </div>
  </div>
  <h3>✨ Suas Linhas Especiais</h3>
  <div class="jm-special-lines">
    <div class="jm-special-line"><div class="numero">${calc.destinyMatrix.center}</div><div class="titulo">Centro</div><div class="arcano">${ARCANO_NOMES[calc.destinyMatrix.center]}</div></div>
    <div class="jm-special-line"><div class="numero">${calc.destinyMatrix.purpose}</div><div class="titulo">Propósito</div><div class="arcano">${ARCANO_NOMES[calc.destinyMatrix.purpose]}</div></div>
    <div class="jm-special-line"><div class="numero">${calc.destinyMatrix.talent}</div><div class="titulo">Talento</div><div class="arcano">${ARCANO_NOMES[calc.destinyMatrix.talent]}</div></div>
    <div class="jm-special-line"><div class="numero">${calc.destinyMatrix.karma}</div><div class="titulo">Karma</div><div class="arcano">${ARCANO_NOMES[calc.destinyMatrix.karma]}</div></div>
    <div class="jm-special-line"><div class="numero">${calc.destinyMatrix.love}</div><div class="titulo">Amor</div><div class="arcano">${ARCANO_NOMES[calc.destinyMatrix.love]}</div></div>
    <div class="jm-special-line"><div class="numero">${calc.destinyMatrix.money}</div><div class="titulo">Dinheiro</div><div class="arcano">${ARCANO_NOMES[calc.destinyMatrix.money]}</div></div>
  </div>
  <!-- GERE 8 PARÁGRAFOS interpretando cada posição da matriz -->
  <div class="jm-callout mint">
    <strong>🌿 Linha do Amor (${calc.destinyMatrix.love} - ${ARCANO_NOMES[calc.destinyMatrix.love]}):</strong> <!-- Interpretação -->
  </div>
  <div class="jm-callout gold">
    <strong>💰 Linha do Dinheiro (${calc.destinyMatrix.money} - ${ARCANO_NOMES[calc.destinyMatrix.money]}):</strong> <!-- Interpretação -->
  </div>
</section>

<div class="jm-divider"><span>🌈</span></div>

<!-- SEÇÃO 8: CHAKRAS - Interprete todos os 7 chakras com físico, energético, emocional -->
<section class="jm-section accent-coral" id="chakras">
  <h2>🌈 Energia dos 7 Chakras</h2>
  <p><strong>${calc.nome}</strong>, os chakras revelam padrões emocionais, físicos e espirituais da sua matriz.</p>
  <div class="jm-chakra-grid">
    ${calc.chakras.map(c => `
    <div class="jm-chakra-card" style="--chakra-color: ${c.cor};">
      <h4><span class="jm-chakra-indicator" style="background: ${c.cor};"></span>${c.icone} ${c.nome}</h4>
      <p>${c.tema}</p>
      <div class="jm-chakra-valores">
        <span class="jm-chakra-valor">Físico: ${c.fisico}</span>
        <span class="jm-chakra-valor">Energético: ${c.energetico}</span>
        <span class="jm-chakra-valor">Emocional: ${c.emocional}</span>
      </div>
    </div>`).join('')}
  </div>
  <!-- GERE interpretação para cada chakra -->
</section>

<div class="jm-divider"><span>☀️</span></div>

<!-- SEÇÃO 9: REVOLUÇÃO SOLAR - As 12 casas e trânsitos -->
<section class="jm-section accent-blue" id="revolucao">
  <h2>☀️ Sua Revolução Solar 2026/2027</h2>
  <div class="jm-revolucao">
    <h3>🏠 As 12 Casas Astrológicas em 2026</h3>
    <div class="jm-casa-grid">
      <div class="jm-casa-item"><div class="jm-casa-numero">1</div><div class="jm-casa-nome">Identidade</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">2</div><div class="jm-casa-nome">Recursos</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">3</div><div class="jm-casa-nome">Comunicação</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">4</div><div class="jm-casa-nome">Lar/Família</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">5</div><div class="jm-casa-nome">Criatividade</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">6</div><div class="jm-casa-nome">Rotina/Saúde</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">7</div><div class="jm-casa-nome">Parcerias</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">8</div><div class="jm-casa-nome">Transformação</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">9</div><div class="jm-casa-nome">Expansão</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">10</div><div class="jm-casa-nome">Carreira</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">11</div><div class="jm-casa-nome">Comunidade</div></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">12</div><div class="jm-casa-nome">Espiritualidade</div></div>
    </div>
    <!-- GERE 6 parágrafos sobre revolução solar para ${calc.signo} -->
  </div>
</section>

<div class="jm-divider"><span>🕉️</span></div>

<!-- SEÇÃO 10: ASTROLOGIA VÉDICA -->
<section class="jm-section accent-gold" id="vedico">
  <h2>🕉️ Astrologia Védica: Sua Nakshatra</h2>
  <div class="jm-vedic-card">
    <div class="jm-vedic-simbolo">${calc.nakshatra.simbolo}</div>
    <div class="jm-vedic-nome">${calc.nakshatra.nome}</div>
    <div class="jm-vedic-regente">Regente Védico: ${calc.nakshatra.regente}</div>
    <p><strong>Tema Principal:</strong> ${calc.nakshatra.tema}</p>
  </div>
  <!-- GERE 6 parágrafos sobre nakshatra ${calc.nakshatra.nome} -->
</section>

<div class="jm-divider"><span>🌟</span></div>

<!-- SEÇÃO 11: OS 3 PORTAIS ENERGÉTICOS - Meses: ${calc.portalMonths.map(m => MESES_NOMES[m]).join(', ')} -->
<section class="jm-section accent-mint" id="portais">
  <h2>🌟 Seus 3 Portais Energéticos de 2026</h2>
  <p><strong>${calc.nome}</strong>, existem 3 meses em 2026 que funcionam como "portais" energéticos.</p>
  ${calc.portalMonths.map((mesNum, i) => {
    const card = calc.cartasMensais.find(c => c.mes === mesNum) || calc.cartasMensais[0];
    return `
  <div class="jm-month-card is-portal">
    <div class="jm-month-header">
      <h3>${i + 1}º Portal: ${MESES_NOMES[mesNum]} 2026</h3>
      <span class="jm-month-badge">${card.arcano}</span>
    </div>
    <div class="jm-tarot-grid" style="margin: 1rem 0;">
      <div class="jm-tarot-card" style="max-width: 160px;">
        <img src="${card.imagem}" alt="${card.arcano}" style="width: 80px;" />
        <h4>${card.arcano}</h4>
        <div class="energia">${card.energia}</div>
      </div>
    </div>
    <!-- GERE 4 parágrafos sobre este portal -->
  </div>`;
  }).join('')}
</section>

<div class="jm-divider"><span>📅</span></div>

<!-- SEÇÃO 12: JORNADA MÊS A MÊS - TODOS os 12 meses com cartas -->
<section class="jm-section" id="meses">
  <h2>📅 Sua Jornada Mês a Mês em 2026</h2>
  <p><strong>${calc.nome}</strong>, aqui está seu guia completo para cada mês de 2026.</p>
  ${calc.cartasMensais.map(card => {
    const isPortal = calc.portalMonths.includes(card.mes);
    return `
  <div class="jm-month-card${isPortal ? ' is-portal' : ''}">
    <div class="jm-month-header">
      <h3>${card.mesNome} 2026</h3>
      <span class="jm-month-badge">${card.arcano}</span>
    </div>
    <div class="jm-tarot-grid" style="margin: 1rem 0;">
      <div class="jm-tarot-card" style="max-width: 140px;">
        <img src="${card.imagem}" alt="${card.arcano}" style="width: 70px;" />
        <h4>${card.arcano}</h4>
        <div class="energia">${card.energia}</div>
      </div>
    </div>
    <!-- GERE 3 parágrafos sobre ${card.mesNome} com ${card.arcano}, luz: ${card.luz.join(', ')}, sombra: ${card.sombra.join(', ')} -->
  </div>`;
  }).join('')}
</section>

<div class="jm-divider"><span>💖</span></div>

<!-- SEÇÃO 13: AMOR & RELACIONAMENTOS - ESCREVA 6 PARÁGRAFOS baseados na Linha do Amor ${calc.destinyMatrix.love} -->
<section class="jm-section accent-rose" id="amor">
  <h2>💖 Amor & Relacionamentos em 2026</h2>
  <!-- GERE 6 parágrafos profundos sobre amor para ${calc.nome} -->
  <ul class="jm-checklist">
    <!-- GERE 5 itens de checklist para amor -->
  </ul>
</section>

<div class="jm-divider"><span>💼</span></div>

<!-- SEÇÃO 14: CARREIRA & PROPÓSITO - Baseado no Propósito ${calc.destinyMatrix.purpose} e Talento ${calc.destinyMatrix.talent} -->
<section class="jm-section accent-blue" id="carreira">
  <h2>💼 Carreira & Propósito em 2026</h2>
  <!-- GERE 6 parágrafos sobre carreira para ${calc.nome} -->
  <ul class="jm-checklist">
    <!-- GERE 5 itens de checklist para carreira -->
  </ul>
</section>

<div class="jm-divider"><span>💰</span></div>

<!-- SEÇÃO 15: DINHEIRO & PROSPERIDADE - Baseado na Linha do Dinheiro ${calc.destinyMatrix.money} -->
<section class="jm-section accent-gold" id="dinheiro">
  <h2>💰 Dinheiro & Prosperidade em 2026</h2>
  <!-- GERE 6 parágrafos sobre finanças para ${calc.nome} -->
  <ul class="jm-checklist">
    <!-- GERE 5 itens de checklist para dinheiro -->
  </ul>
</section>

<div class="jm-divider"><span>🌿</span></div>

<!-- SEÇÃO 16: SAÚDE & BEM-ESTAR - Baseado nos Chakras -->
<section class="jm-section accent-mint" id="saude">
  <h2>🌿 Saúde & Bem-Estar em 2026</h2>
  <!-- GERE 6 parágrafos sobre saúde para ${calc.nome} baseado nos chakras -->
  <ul class="jm-checklist">
    <!-- GERE 5 itens de checklist para saúde -->
  </ul>
</section>

<div class="jm-divider"><span>🔥</span></div>

<!-- SEÇÃO 17: RITUAIS DE PODER -->
<section class="jm-section accent-coral" id="rituais">
  <h2>🔥 Rituais de Poder para 2026</h2>
  <p><strong>${calc.nome}</strong>, estes rituais foram criados especialmente para você.</p>
  <!-- GERE 3 rituais completos com jm-ritual e jm-ritual-steps -->
  <div class="jm-ritual">
    <h4>🌙 Ritual do Novo Ciclo</h4>
    <ol class="jm-ritual-steps">
      <!-- GERE 5 passos -->
    </ol>
  </div>
  <div class="jm-ritual">
    <h4>✨ Ritual de Manifestação</h4>
    <ol class="jm-ritual-steps">
      <!-- GERE 5 passos -->
    </ol>
  </div>
  <div class="jm-ritual">
    <h4>💜 Ritual de Proteção Energética</h4>
    <ol class="jm-ritual-steps">
      <!-- GERE 5 passos -->
    </ol>
  </div>
</section>

<div class="jm-divider"><span>📜</span></div>

<!-- SEÇÃO 18: 15+ SCRIPTS MÁGICOS -->
<section class="jm-section accent-lilas" id="scripts">
  <h2>📜 15+ Scripts Mágicos para 2026</h2>
  <p><strong>${calc.nome}</strong>, use estes scripts diariamente.</p>
  <!-- GERE 15 scripts com jm-script-box, cada um com título e texto personalizado -->
  <div class="jm-script-box">
    <strong>1. Manifesto de Intenção 2026</strong>
    <p><!-- Script personalizado --></p>
  </div>
  <!-- Continue com scripts 2-15 -->
</section>

<div class="jm-divider"><span>✅</span></div>

<!-- SEÇÃO 19: CHECKLISTS DO GLOW UP -->
<section class="jm-section accent-mint" id="checklists">
  <h2>✅ Checklists do Glow Up 2026</h2>
  <h3>🌅 Checklist Diário</h3>
  <ul class="jm-checklist">
    <!-- GERE 7 itens para rotina diária -->
  </ul>
  <h3>🌙 Checklist Semanal</h3>
  <ul class="jm-checklist">
    <!-- GERE 5 itens para rotina semanal -->
  </ul>
  <h3>🌟 Checklist Mensal</h3>
  <ul class="jm-checklist">
    <!-- GERE 5 itens para rotina mensal -->
  </ul>
</section>

<div class="jm-divider"><span>🌙</span></div>

<!-- SEÇÃO 20: MENSAGEM FINAL -->
<section class="jm-section accent-rose" id="final">
  <h2>🌙 Mensagem Final para ${calc.nome}</h2>
  <!-- GERE 4 parágrafos de encerramento inspiradores e personalizados -->
  <div class="jm-script-box">
    <!-- GERE uma bênção/oração final personalizada -->
  </div>
</section>

</div><!-- fim jm-report -->

IMPORTANTE: Gere TODO o conteúdo REAL. NÃO deixe comentários ou placeholders. CADA seção deve ter parágrafos completos e profundos.`;
  }

  /**
   * Método legado para compatibilidade - gera JSON simples
   */
  async generatePersonalizedContent(userData: any, calculatedData: any): Promise<any> {
    if (!this.client) {
      throw new Error('Anthropic API não configurada');
    }

    const prompt = this.buildLegacyPrompt(userData, calculatedData);

    try {
      const message = await this.client.messages.create({
        model: 'claude-3-haiku-20240307',
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

      const cleanText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      try {
        return JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Erro ao parsear JSON da IA:', parseError);
        return null;
      }
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
      return null;
    }
  }

  private buildLegacyPrompt(userData: any, calculatedData: any): string {
    const nome = userData.primeiroNome;

    return `Você é a JOVEM MÍSTICA. Gere textos personalizados em JSON para ${nome}.

DADOS:
- Signo: ${calculatedData.signoSolar}
- Ano Pessoal: ${calculatedData.numerologia?.anoPessoal || 1}
- Arcano Pessoal: ${calculatedData.tarot?.arcanoPessoal?.nome || 'O Mago'}
- Arcano 2026: ${calculatedData.tarot?.arcano2026?.nome || 'A Estrela'}

RETORNE JSON:
{
  "anoPessoal": { "textos": ["parágrafo 1", "parágrafo 2"], "destaque": "frase" },
  "arcanoPessoal": { "textos": ["parágrafo 1"], "afirmacao": "mantra" },
  "arcano2026": { "textos": ["parágrafo 1"] },
  "mesPortal": { "textos": ["parágrafo 1"] },
  "areas": {
    "amor": { "textos": ["parágrafo"], "insights": ["insight 1", "insight 2"] },
    "dinheiro": { "textos": ["parágrafo"], "insights": ["insight 1"] },
    "carreira": { "textos": ["parágrafo"], "insights": ["insight 1"] },
    "bemestar": { "textos": ["parágrafo"], "insights": ["insight 1"] }
  },
  "scripts": [{ "titulo": "Script 1", "texto": "conteúdo" }]
}

RETORNE APENAS JSON.`;
  }
}

export const anthropicService = new AnthropicService();
