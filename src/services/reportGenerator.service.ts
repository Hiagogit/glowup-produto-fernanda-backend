/**
 * Gerador de Relatório Completo - 19 Seções
 * Gera HTML estrutural completo com textos personalizados
 */

import {
  CalculosCompletos,
  ARCANO_NOMES,
  MESES_NOMES,
  ARCANO_KEYWORDS
} from './calculations.service';

/**
 * Gera o relatório HTML COMPLETO com todas as 19 seções
 */
export function gerarRelatorioCompleto(calc: CalculosCompletos): string {
  const sections: string[] = [];

  // 1. CAPA
  sections.push(gerarCapa(calc));

  // 2. SUMÁRIO
  sections.push(gerarSumario());

  // 3. ESSÊNCIA ASTROLÓGICA
  sections.push(gerarEssenciaAstrologica(calc));

  // 4. NUMEROLOGIA E ANO PESSOAL
  sections.push(gerarNumerologia(calc));

  // 5. ARCANO DE VIDA
  sections.push(gerarArcanoPessoal(calc));

  // 6. ARCANO REGENTE 2026
  sections.push(gerarArcano2026(calc));

  // 7. MATRIZ DO DESTINO
  sections.push(gerarMatrizDestino(calc));

  // 8. ENERGIA DOS 7 CHAKRAS
  sections.push(gerarChakras(calc));

  // 9. REVOLUÇÃO SOLAR
  sections.push(gerarRevolucaoSolar(calc));

  // 10. ASTROLOGIA VÉDICA
  sections.push(gerarVedico(calc));

  // 11. OS 3 PORTAIS ENERGÉTICOS
  sections.push(gerarPortais(calc));

  // 12. JORNADA MÊS A MÊS
  sections.push(gerarMeses(calc));

  // 13. AMOR & RELACIONAMENTOS
  sections.push(gerarAmor(calc));

  // 14. CARREIRA & PROPÓSITO
  sections.push(gerarCarreira(calc));

  // 15. DINHEIRO & PROSPERIDADE
  sections.push(gerarDinheiro(calc));

  // 16. SAÚDE & BEM-ESTAR
  sections.push(gerarSaude(calc));

  // 17. RITUAIS DE PODER
  sections.push(gerarRituais(calc));

  // 18. SCRIPTS MÁGICOS
  sections.push(gerarScripts(calc));

  // 19. CHECKLISTS DO GLOW UP
  sections.push(gerarChecklists(calc));

  // 20. MENSAGEM FINAL
  sections.push(gerarMensagemFinal(calc));

  return `<div class="jm-report">\n${sections.join('\n\n<div class="jm-divider"><span>✨</span></div>\n\n')}\n</div>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 1: CAPA
// ═══════════════════════════════════════════════════════════════
function gerarCapa(calc: CalculosCompletos): string {
  return `
<section class="jm-cover">
  <span class="star">✨</span><span class="star">⭐</span><span class="star">💫</span><span class="star">✨</span>
  <span class="star">🌟</span><span class="star">⭐</span><span class="star">💫</span><span class="star">✨</span>
  <span class="star">✦</span><span class="star">☆</span>
  <h1>✨ ${calc.nome} ✨</h1>
  <p class="subtitle">O Mapa Completo do Seu Glow Up em 2026</p>
  <div class="badge">☀️ ${calc.signo} • Ano ${calc.anoPessoal} • ${calc.arcanoPessoal}</div>
  <p class="tagline">"2026 é seu ano de ${calc.anoPessoalInfo.tema.toLowerCase()}. Prepare-se para brilhar como nunca!"</p>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 2: SUMÁRIO
// ═══════════════════════════════════════════════════════════════
function gerarSumario(): string {
  return `
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
</nav>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 3: ESSÊNCIA ASTROLÓGICA
// ═══════════════════════════════════════════════════════════════
function gerarEssenciaAstrologica(calc: CalculosCompletos): string {
  const textos = gerarTextosSigno(calc);
  return `
<section class="jm-section accent-lilas" id="essencia">
  <h2>🌟 Sua Essência Astrológica: ${calc.signo}</h2>

  <div class="jm-area-grid">
    <div class="jm-area-card">
      <div class="jm-area-icon">🔥</div>
      <h4>Elemento</h4>
      <p>${calc.signoInfo.elemento}</p>
    </div>
    <div class="jm-area-card">
      <div class="jm-area-icon">⭐</div>
      <h4>Qualidade</h4>
      <p>${calc.signoInfo.qualidade}</p>
    </div>
    <div class="jm-area-card">
      <div class="jm-area-icon">🪐</div>
      <h4>Regente</h4>
      <p>${calc.signoInfo.regente}</p>
    </div>
    <div class="jm-area-card">
      <div class="jm-area-icon">🏠</div>
      <h4>Casa Natural</h4>
      <p>Casa ${calc.signoInfo.casa}</p>
    </div>
  </div>

  ${textos.map(t => `<p>${t}</p>`).join('\n  ')}

  <div class="jm-callout">
    <strong>💡 Insight Cósmico para ${calc.nome}:</strong>
    <p>Com ${calc.signoInfo.regente} como seu regente, 2026 traz oportunidades únicas de ${calc.anoPessoalInfo.tema.toLowerCase()}. Seu elemento ${calc.signoInfo.elemento} amplifica sua capacidade de ${calc.signoInfo.qualidade === 'Cardinal' ? 'iniciar novos ciclos' : calc.signoInfo.qualidade === 'Fixo' ? 'manter o foco e a determinação' : 'se adaptar às mudanças'}.</p>
  </div>
</section>`;
}

function gerarTextosSigno(calc: CalculosCompletos): string[] {
  return [
    `<strong>${calc.nome}</strong>, ser de ${calc.signo} é carregar uma energia única e poderosa. ${calc.signoInfo.descricao}. Essa combinação de características faz de você alguém verdadeiramente especial, capaz de impactar o mundo ao seu redor de maneiras que talvez nem perceba.`,

    `O elemento ${calc.signoInfo.elemento} que rege seu signo traz qualidades específicas para sua personalidade. ${calc.signoInfo.elemento === 'Fogo' ? 'Você possui uma chama interior que inspira e motiva os outros, uma paixão que te impulsiona a realizar seus sonhos mais ousados.' : calc.signoInfo.elemento === 'Terra' ? 'Você tem os pés firmemente plantados no chão, uma praticidade que te permite construir bases sólidas para seus sonhos.' : calc.signoInfo.elemento === 'Ar' ? 'Sua mente é como o vento - livre, curiosa e sempre buscando novas conexões e ideias.' : 'Suas emoções são profundas como o oceano, e sua intuição é um guia poderoso em todas as decisões.'}`,

    `Com ${calc.signoInfo.regente} como planeta regente, você recebe influências celestiais que moldam sua forma de agir no mundo. Este planeta amplifica suas qualidades naturais e oferece proteção especial em momentos de desafio. Em 2026, a energia de ${calc.signoInfo.regente} estará especialmente favorável para você.`,

    `A qualidade ${calc.signoInfo.qualidade} do seu signo determina como você lida com as energias ao seu redor. ${calc.signoInfo.qualidade === 'Cardinal' ? 'Você é uma iniciadora natural, sempre pronta para começar novos projetos e liderar mudanças.' : calc.signoInfo.qualidade === 'Fixo' ? 'Sua força está na persistência e na capacidade de manter o foco mesmo diante de obstáculos.' : 'Sua flexibilidade é seu superpoder - você se adapta às circunstâncias com graça e sabedoria.'}`,

    `Em 2026, a combinação da sua essência de ${calc.signo} com o Ano Pessoal ${calc.anoPessoal} cria uma sinergia poderosa. Este é um momento para abraçar completamente quem você é, honrar suas características únicas e usar seus dons naturais para criar a vida que você deseja.`,

    `<strong>${calc.nome}</strong>, lembre-se: cada signo tem luz e sombra. Seu desafio em 2026 será usar conscientemente os aspectos mais elevados de ${calc.signo}, transformando potenciais fraquezas em forças. A astrologia não determina seu destino - ela ilumina o caminho para que você faça escolhas mais conscientes.`
  ];
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 4: NUMEROLOGIA E ANO PESSOAL
// ═══════════════════════════════════════════════════════════════
function gerarNumerologia(calc: CalculosCompletos): string {
  const textos = gerarTextosAnoPessoal(calc);
  return `
<section class="jm-section accent-gold" id="numerologia">
  <h2>🔢 Ano Pessoal ${calc.anoPessoal}: ${calc.anoPessoalInfo.tema}</h2>

  ${textos.map(t => `<p>${t}</p>`).join('\n  ')}

  <div class="jm-area-grid">
    <div class="jm-area-card">
      <div class="jm-area-icon">🎯</div>
      <h4>Foco Principal</h4>
      <p>${calc.anoPessoalInfo.foco}</p>
    </div>
    <div class="jm-area-card">
      <div class="jm-area-icon">⚠️</div>
      <h4>Desafio a Superar</h4>
      <p>${calc.anoPessoalInfo.desafio}</p>
    </div>
    <div class="jm-area-card">
      <div class="jm-area-icon">🚀</div>
      <h4>Ação Recomendada</h4>
      <p>${calc.anoPessoalInfo.acao}</p>
    </div>
  </div>

  <div class="jm-callout gold">
    <strong>✨ Vibração do Número ${calc.anoPessoal}:</strong>
    <p>O número ${calc.anoPessoal} carrega a energia de ${calc.anoPessoalInfo.tema.toLowerCase()}. Este ciclo numerológico te convida a ${calc.anoPessoalInfo.acao.toLowerCase()}. Aproveite cada momento deste ano poderoso!</p>
  </div>
</section>`;
}

function gerarTextosAnoPessoal(calc: CalculosCompletos): string[] {
  const temas: Record<number, string[]> = {
    1: [
      `<strong>${calc.nome}</strong>, 2026 é um Ano Pessoal 1 para você - o início de um novo ciclo de 9 anos! Este é o momento de plantar as sementes que colherá nos próximos anos. Tudo que você iniciar agora terá o potencial de crescer e florescer.`,
      `A energia do número 1 traz independência, coragem e pioneirismo. É hora de tomar iniciativas, fazer escolhas ousadas e confiar na sua capacidade de liderar sua própria vida. Não espere que outros abram portas - você tem a chave.`,
      `Este ano favorece novos começos em todas as áreas: relacionamentos, carreira, projetos pessoais. Se há algo que você sempre quis fazer, 2026 é o momento. O universo está conspirando a seu favor para que você dê o primeiro passo.`,
      `O desafio do Ano 1 é superar o medo do desconhecido e a tendência a se apoiar demais nos outros. Este é SEU ano para brilhar individualmente. Aprenda a confiar em si mesma e em suas decisões.`
    ],
    2: [
      `<strong>${calc.nome}</strong>, 2026 é um Ano Pessoal 2 - o ano das parcerias, da diplomacia e da cooperação. Depois de um ano de iniciativas (ciclo 1), agora é hora de cultivar relacionamentos e trabalhar em equipe.`,
      `A energia do número 2 traz sensibilidade, intuição e capacidade de mediação. Este ano, você será chamada a equilibrar diferentes perspectivas, a ouvir mais do que falar, e a encontrar harmonia em meio às diferenças.`,
      `Relacionamentos de todos os tipos ganham destaque em 2026. Parcerias amorosas, amizades profundas e colaborações profissionais podem florescer. É um ano para nutrir conexões significativas e resolver conflitos pendentes.`,
      `O desafio do Ano 2 é não perder sua identidade ao priorizar os outros. Cooperação sim, mas sem anular suas próprias necessidades. Encontre o equilíbrio entre dar e receber.`
    ],
    3: [
      `<strong>${calc.nome}</strong>, 2026 é um Ano Pessoal 3 - o ano da expressão criativa, da comunicação e da alegria! Este é um ciclo para deixar sua voz ser ouvida e compartilhar seus talentos com o mundo.`,
      `A energia do número 3 traz otimismo, criatividade e sociabilidade. É hora de se expressar através da arte, da escrita, da fala - qualquer forma que ressoe com você. Sua criatividade está em alta!`,
      `Este ano favorece atividades sociais, networking e expansão do seu círculo. Festas, eventos, viagens e novas amizades estão no horizonte. Permita-se curtir a vida e espalhar alegria por onde passar.`,
      `O desafio do Ano 3 é não dispersar sua energia em muitas direções. Foque sua criatividade em projetos concretos. E cuidado com a tendência à superficialidade - profundidade traz mais satisfação do que quantidade.`
    ],
    4: [
      `<strong>${calc.nome}</strong>, 2026 é um Ano Pessoal 4 - o ano de construir bases sólidas, organizar sua vida e trabalhar com disciplina. É hora de transformar sonhos em estruturas concretas.`,
      `A energia do número 4 traz praticidade, determinação e foco. Este ano pede que você arregace as mangas e faça o trabalho necessário para alcançar seus objetivos. Não há atalhos - mas os resultados serão duradouros.`,
      `Este ano favorece a organização da casa, das finanças, da carreira. É momento de criar rotinas saudáveis, planejar o futuro e estabelecer limites claros. Tudo que você construir agora terá fundações fortes.`,
      `O desafio do Ano 4 é não se tornar rígida demais ou workaholic. Trabalho é importante, mas não esqueça de viver. Encontre momentos de leveza em meio à seriedade das responsabilidades.`
    ],
    5: [
      `<strong>${calc.nome}</strong>, 2026 é um Ano Pessoal 5 - o ano das mudanças, da liberdade e das novas experiências! Depois de um ano de estruturação (ciclo 4), agora é hora de sacudir a poeira e explorar novos horizontes.`,
      `A energia do número 5 traz dinamismo, aventura e versatilidade. Este ano, espere o inesperado! Mudanças podem chegar de forma surpreendente, trazendo oportunidades que você nem imaginava.`,
      `Este ano favorece viagens, mudanças de carreira, novos relacionamentos e tudo que tire você da zona de conforto. É momento de dizer "sim" para experiências que expandam sua visão de mundo.`,
      `O desafio do Ano 5 é não se perder em meio a tantas possibilidades. Mudança é boa, mas algumas constâncias são necessárias. Evite impulsividade extrema - nem toda novidade merece sua energia.`
    ],
    6: [
      `<strong>${calc.nome}</strong>, 2026 é um Ano Pessoal 6 - o ano do amor, da família e das responsabilidades do coração. Este ciclo traz foco para relacionamentos íntimos e questões domésticas.`,
      `A energia do número 6 traz harmonia, cuidado e senso de responsabilidade. É hora de nutrir seus relacionamentos mais próximos, cuidar da família e criar um ambiente de paz ao seu redor.`,
      `Este ano favorece casamento, gravidez, compra de casa, reconciliações familiares e tudo relacionado ao lar e ao coração. Questões de amor ganham destaque e pedem sua atenção.`,
      `O desafio do Ano 6 é não se sobrecarregar cuidando dos outros enquanto negligencia a si mesma. Amor próprio vem primeiro. E cuidado com a tendência a querer controlar ou "consertar" os outros.`
    ],
    7: [
      `<strong>${calc.nome}</strong>, 2026 é um Ano Pessoal 7 - o ano da espiritualidade, do autoconhecimento e da introspecção. Este é um ciclo mais interno, de mergulhar nas profundezas da sua alma.`,
      `A energia do número 7 traz sabedoria, intuição e busca por significado. É hora de fazer perguntas profundas, estudar, meditar e conectar-se com sua essência espiritual.`,
      `Este ano favorece retiros, terapias, estudos esotéricos, práticas meditativas e tempo de qualidade consigo mesma. Menos ação externa, mais contemplação interna.`,
      `O desafio do Ano 7 é não se isolar demais do mundo. Introspecção é importante, mas não se esconda da vida. E cuidado com a tendência a analisar demais - às vezes é preciso simplesmente sentir.`
    ],
    8: [
      `<strong>${calc.nome}</strong>, 2026 é um Ano Pessoal 8 - o ano do poder, da abundância e da manifestação material! Este é um ciclo de colher frutos e alcançar conquistas concretas.`,
      `A energia do número 8 traz autoridade, ambição e capacidade de realização. É hora de ir atrás dos seus objetivos com determinação. O universo está pronto para recompensar seus esforços.`,
      `Este ano favorece promoções, aumento de renda, investimentos, reconhecimento profissional e tudo relacionado a poder e status. Sua capacidade de manifestar está em alta.`,
      `O desafio do Ano 8 é não deixar a busca por sucesso material dominar sua vida. Dinheiro é ferramenta, não fim. E cuidado com jogos de poder - use sua autoridade com integridade.`
    ],
    9: [
      `<strong>${calc.nome}</strong>, 2026 é um Ano Pessoal 9 - o ano das finalizações, do perdão e da preparação para um novo ciclo. Este é um momento de fechamentos e libertações.`,
      `A energia do número 9 traz compaixão, sabedoria e desapego. É hora de encerrar ciclos, perdoar (inclusive a si mesma), e liberar tudo que não serve mais ao seu crescimento.`,
      `Este ano favorece términos conscientes, doações, voluntariado, perdão de dívidas emocionais e limpeza geral da vida. Quanto mais você soltar, mais espaço cria para o novo.`,
      `O desafio do Ano 9 é não resistir às finalizações necessárias. Alguns capítulos precisam terminar para que novos comecem. Confie no processo de transformação e não se agarre ao passado.`
    ]
  };

  return temas[calc.anoPessoal] || temas[1];
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 5: ARCANO PESSOAL
// ═══════════════════════════════════════════════════════════════
function gerarArcanoPessoal(calc: CalculosCompletos): string {
  return `
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

  <p><strong>${calc.nome}</strong>, seu Arcano de Vida é <strong>${calc.arcanoPessoal}</strong> - a carta que representa sua essência mais profunda, sua missão de alma e os talentos que você veio desenvolver nesta existência.</p>

  <p>Este arcano revela que você carrega a energia de <strong>${calc.arcanoPessoalKeywords.energia}</strong>. As qualidades de luz associadas a esta carta são: ${calc.arcanoPessoalKeywords.luz.join(', ')}. Estes são seus superpoderes naturais, os dons que você pode acessar sempre que precisar.</p>

  <p>Como toda energia, ${calc.arcanoPessoal} também tem seus aspectos de sombra: ${calc.arcanoPessoalKeywords.sombra.join(', ')}. Estes não são defeitos, mas áreas de crescimento. Ao reconhecer e integrar esses aspectos, você se torna mais completa e poderosa.</p>

  <p>Em 2026, a combinação do seu Arcano de Vida com as energias do Ano Pessoal ${calc.anoPessoal} cria uma oportunidade única de manifestar plenamente o potencial desta carta. É hora de abraçar quem você realmente é.</p>

  <p>Medite com a imagem de ${calc.arcanoPessoal} sempre que precisar de orientação. Esta carta é seu guia espiritual permanente, sempre disponível para iluminar seu caminho.</p>

  <div class="jm-callout rose">
    <strong>💖 Mantra do Seu Arcano:</strong>
    <p>"Eu sou a energia de ${calc.arcanoPessoal}. Eu manifesto ${calc.arcanoPessoalKeywords.luz[0]} em tudo que faço. Minha essência é ${calc.arcanoPessoalKeywords.energia}."</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 6: ARCANO REGENTE 2026
// ═══════════════════════════════════════════════════════════════
function gerarArcano2026(calc: CalculosCompletos): string {
  return `
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

  <p><strong>${calc.nome}</strong>, em 2026 você será regida pela energia de <strong>${calc.arcano2026}</strong>. Esta carta define o tom, os desafios e as bênçãos que você encontrará ao longo deste ano.</p>

  <p>A energia de ${calc.arcano2026Keywords.energia} permeará suas experiências. Os aspectos de luz desta carta - ${calc.arcano2026Keywords.luz.join(', ')} - são os presentes que 2026 quer te entregar. Abra-se para recebê-los.</p>

  <p>Os aspectos de sombra - ${calc.arcano2026Keywords.sombra.join(', ')} - são os desafios que você pode enfrentar. Estar consciente deles já é metade da batalha. Use este conhecimento para navegar o ano com sabedoria.</p>

  <p>A interação entre seu Arcano de Vida (${calc.arcanoPessoal}) e o Arcano de 2026 (${calc.arcano2026}) cria uma dinâmica única. Estas duas energias dançam juntas, às vezes em harmonia, às vezes em tensão criativa - mas sempre te levando em direção ao crescimento.</p>

  <div class="jm-callout gold">
    <strong>✨ Combinação Poderosa:</strong>
    <p><strong>${calc.arcanoPessoal} + ${calc.arcano2026}</strong>: Esta combinação sugere que em 2026 você unirá ${calc.arcanoPessoalKeywords.energia} com ${calc.arcano2026Keywords.energia}. É uma alquimia poderosa que potencializa sua capacidade de ${calc.anoPessoalInfo.tema.toLowerCase()}.</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 7: MATRIZ DO DESTINO
// ═══════════════════════════════════════════════════════════════
function gerarMatrizDestino(calc: CalculosCompletos): string {
  const matrix = calc.destinyMatrix;
  return `
<section class="jm-section accent-lilas" id="matriz">
  <h2>🔮 Sua Matriz do Destino Completa</h2>

  <p><strong>${calc.nome}</strong>, a Matriz do Destino revela os padrões energéticos fundamentais da sua alma - um mapa das energias que você veio trabalhar nesta vida.</p>

  <div class="jm-matrix">
    <div class="jm-matrix-diamond">
      <div class="jm-matrix-node top" title="Energia Masculina">${matrix.top}</div>
      <div class="jm-matrix-node right" title="Futuro">${matrix.right}</div>
      <div class="jm-matrix-node bottom" title="Energia Feminina">${matrix.bottom}</div>
      <div class="jm-matrix-node left" title="Passado">${matrix.left}</div>
      <div class="jm-matrix-node center" title="Energia Central">${matrix.center}</div>
      <div class="jm-matrix-node top-right">${matrix.topRight}</div>
      <div class="jm-matrix-node bottom-right">${matrix.bottomRight}</div>
      <div class="jm-matrix-node bottom-left">${matrix.bottomLeft}</div>
      <div class="jm-matrix-node top-left">${matrix.topLeft}</div>
    </div>
  </div>

  <h3>✨ Suas Linhas Especiais</h3>
  <div class="jm-special-lines">
    <div class="jm-special-line"><div class="numero">${matrix.center}</div><div class="titulo">Centro</div><div class="arcano">${ARCANO_NOMES[matrix.center]}</div></div>
    <div class="jm-special-line"><div class="numero">${matrix.purpose}</div><div class="titulo">Propósito</div><div class="arcano">${ARCANO_NOMES[matrix.purpose]}</div></div>
    <div class="jm-special-line"><div class="numero">${matrix.talent}</div><div class="titulo">Talento</div><div class="arcano">${ARCANO_NOMES[matrix.talent]}</div></div>
    <div class="jm-special-line"><div class="numero">${matrix.karma}</div><div class="titulo">Karma</div><div class="arcano">${ARCANO_NOMES[matrix.karma]}</div></div>
    <div class="jm-special-line"><div class="numero">${matrix.love}</div><div class="titulo">Amor</div><div class="arcano">${ARCANO_NOMES[matrix.love]}</div></div>
    <div class="jm-special-line"><div class="numero">${matrix.money}</div><div class="titulo">Dinheiro</div><div class="arcano">${ARCANO_NOMES[matrix.money]}</div></div>
  </div>

  <h3>🎯 Energia Central: ${ARCANO_NOMES[matrix.center]}</h3>
  <p>O centro da sua matriz é <strong>${ARCANO_NOMES[matrix.center]}</strong> (${matrix.center}). Esta é a energia que permeia toda a sua existência, o núcleo do seu ser. ${gerarInterpretacaoArcano(matrix.center)}</p>

  <h3>👤 Energia Masculina (Topo): ${ARCANO_NOMES[matrix.top]}</h3>
  <p>A energia masculina/yang da sua matriz é <strong>${ARCANO_NOMES[matrix.top]}</strong>. Esta representa como você age no mundo, sua força de vontade e capacidade de realização. ${gerarInterpretacaoArcano(matrix.top)}</p>

  <h3>👤 Energia Feminina (Base): ${ARCANO_NOMES[matrix.bottom]}</h3>
  <p>A energia feminina/yin é <strong>${ARCANO_NOMES[matrix.bottom]}</strong>. Representa sua receptividade, intuição e capacidade de nutrir. ${gerarInterpretacaoArcano(matrix.bottom)}</p>

  <h3>⬅️ Passado (Esquerda): ${ARCANO_NOMES[matrix.left]}</h3>
  <p>A energia do passado é <strong>${ARCANO_NOMES[matrix.left]}</strong>. Mostra de onde você veio, as lições já aprendidas e padrões ancestrais. ${gerarInterpretacaoArcano(matrix.left)}</p>

  <h3>➡️ Futuro (Direita): ${ARCANO_NOMES[matrix.right]}</h3>
  <p>A energia do futuro é <strong>${ARCANO_NOMES[matrix.right]}</strong>. Indica para onde você está indo, o potencial a ser desenvolvido. ${gerarInterpretacaoArcano(matrix.right)}</p>

  <div class="jm-callout mint">
    <strong>💖 Linha do Amor (${matrix.love} - ${ARCANO_NOMES[matrix.love]}):</strong>
    <p>Sua linha do amor revela como você ama e é amada. ${gerarInterpretacaoArcano(matrix.love)} Em relacionamentos, busque parceiros que ressoem com esta energia.</p>
  </div>

  <div class="jm-callout gold">
    <strong>💰 Linha do Dinheiro (${matrix.money} - ${ARCANO_NOMES[matrix.money]}):</strong>
    <p>Sua linha financeira mostra seu relacionamento com abundância. ${gerarInterpretacaoArcano(matrix.money)} Use esta energia para atrair prosperidade.</p>
  </div>
</section>`;
}

function gerarInterpretacaoArcano(num: number): string {
  const keywords = ARCANO_KEYWORDS[num] || ARCANO_KEYWORDS[1];
  return `Esta energia traz ${keywords.luz.join(', ')}. O desafio é transcender ${keywords.sombra.join(' e ')}.`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 8: CHAKRAS
// ═══════════════════════════════════════════════════════════════
function gerarChakras(calc: CalculosCompletos): string {
  return `
<section class="jm-section accent-coral" id="chakras">
  <h2>🌈 Energia dos 7 Chakras</h2>

  <p><strong>${calc.nome}</strong>, seus chakras revelam padrões energéticos que influenciam sua saúde física, emocional e espiritual. Cada centro de energia carrega informações importantes sobre seu equilíbrio atual.</p>

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

  <h3>📊 Análise dos Seus Chakras</h3>

  ${calc.chakras.map(c => `
  <p><strong>${c.icone} ${c.nome}</strong>: Com valores de Físico ${c.fisico}, Energético ${c.energetico} e Emocional ${c.emocional}, este chakra ${c.fisico + c.energetico + c.emocional > 15 ? 'está bem equilibrado' : 'precisa de atenção'}. O tema principal aqui é ${c.tema.toLowerCase()}. Em 2026, dedique tempo para ${c.nome === 'Raiz' ? 'fortalecer suas bases e segurança' : c.nome === 'Sacral' ? 'explorar sua criatividade e prazer' : c.nome === 'Plexo Solar' ? 'desenvolver sua autoconfiança' : c.nome === 'Cardíaco' ? 'abrir seu coração ao amor' : c.nome === 'Laríngeo' ? 'expressar sua verdade' : c.nome === 'Terceiro Olho' ? 'confiar em sua intuição' : 'conectar-se com o divino'}.</p>`).join('')}

  <div class="jm-callout">
    <strong>💡 Dica de Equilíbrio:</strong>
    <p>Para harmonizar seus chakras em 2026, pratique meditação diária focando em cada centro de energia. Use cristais, cores e sons correspondentes a cada chakra para potencializar o equilíbrio.</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 9: REVOLUÇÃO SOLAR
// ═══════════════════════════════════════════════════════════════
function gerarRevolucaoSolar(calc: CalculosCompletos): string {
  return `
<section class="jm-section accent-blue" id="revolucao">
  <h2>☀️ Sua Revolução Solar 2026/2027</h2>

  <p><strong>${calc.nome}</strong>, a Revolução Solar é o mapa do seu aniversário - um retrato das energias que governarão seu ano pessoal. Como ${calc.signo}, seu ciclo solar traz características únicas.</p>

  <div class="jm-revolucao">
    <h3>🏠 As 12 Casas Astrológicas em 2026</h3>
    <div class="jm-casa-grid">
      <div class="jm-casa-item"><div class="jm-casa-numero">1</div><div class="jm-casa-nome">Identidade</div><p>Nova fase de autoconhecimento</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">2</div><div class="jm-casa-nome">Recursos</div><p>Foco em finanças e valores</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">3</div><div class="jm-casa-nome">Comunicação</div><p>Aprendizado e conexões</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">4</div><div class="jm-casa-nome">Lar/Família</div><p>Raízes e segurança emocional</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">5</div><div class="jm-casa-nome">Criatividade</div><p>Expressão e romance</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">6</div><div class="jm-casa-nome">Rotina/Saúde</div><p>Hábitos e bem-estar</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">7</div><div class="jm-casa-nome">Parcerias</div><p>Relacionamentos importantes</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">8</div><div class="jm-casa-nome">Transformação</div><p>Renascimento e poder</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">9</div><div class="jm-casa-nome">Expansão</div><p>Viagens e filosofia</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">10</div><div class="jm-casa-nome">Carreira</div><p>Realizações públicas</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">11</div><div class="jm-casa-nome">Comunidade</div><p>Amizades e causas</p></div>
      <div class="jm-casa-item"><div class="jm-casa-numero">12</div><div class="jm-casa-nome">Espiritualidade</div><p>Transcendência e cura</p></div>
    </div>
  </div>

  <p>Com o Sol transitando pelo seu signo de ${calc.signo}, 2026 traz uma renovação da sua identidade. O elemento ${calc.signoInfo.elemento} será especialmente ativado, trazendo ${calc.signoInfo.elemento === 'Fogo' ? 'entusiasmo e iniciativa' : calc.signoInfo.elemento === 'Terra' ? 'praticidade e estabilidade' : calc.signoInfo.elemento === 'Ar' ? 'novas ideias e conexões' : 'profundidade emocional e intuição'}.</p>

  <p>Seu regente ${calc.signoInfo.regente} estará em posição favorável durante boa parte do ano, potencializando suas qualidades naturais e abrindo portas para oportunidades alinhadas com sua essência.</p>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 10: ASTROLOGIA VÉDICA
// ═══════════════════════════════════════════════════════════════
function gerarVedico(calc: CalculosCompletos): string {
  return `
<section class="jm-section accent-gold" id="vedico">
  <h2>🕉️ Astrologia Védica: Sua Nakshatra</h2>

  <div class="jm-vedic-card">
    <div class="jm-vedic-simbolo">${calc.nakshatra.simbolo}</div>
    <div class="jm-vedic-nome">${calc.nakshatra.nome}</div>
    <div class="jm-vedic-regente">Regente Védico: ${calc.nakshatra.regente}</div>
    <p><strong>Tema Principal:</strong> ${calc.nakshatra.tema}</p>
  </div>

  <p><strong>${calc.nome}</strong>, na tradição védica indiana, sua Nakshatra (mansão lunar) é <strong>${calc.nakshatra.nome}</strong>. Esta é uma das 27 divisões do zodíaco lunar, oferecendo insights profundos sobre sua natureza interior.</p>

  <p>O símbolo ${calc.nakshatra.simbolo} representa a essência desta nakshatra. Com ${calc.nakshatra.regente} como regente, você recebe influências sutis que moldam sua personalidade de formas únicas.</p>

  <p>O tema central de ${calc.nakshatra.nome} é <strong>${calc.nakshatra.tema}</strong>. Esta energia está presente em todas as áreas da sua vida, colorindo suas experiências e guiando suas escolhas de forma muitas vezes inconsciente.</p>

  <p>Em 2026, a combinação da sua Nakshatra com as energias do Ano Pessoal ${calc.anoPessoal} cria um padrão único. Este é um ano para explorar mais profundamente as qualidades védicas da sua carta natal.</p>

  <div class="jm-callout gold">
    <strong>🕉️ Prática Védica Recomendada:</strong>
    <p>Medite nos dias de Lua que passam pela sua Nakshatra ${calc.nakshatra.nome}. Estes são momentos de poder especial para você, ideais para rituais e intenções importantes.</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 11: PORTAIS ENERGÉTICOS
// ═══════════════════════════════════════════════════════════════
function gerarPortais(calc: CalculosCompletos): string {
  const portais = calc.portalMonths.map((mesNum, i) => {
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
      <p><strong>${MESES_NOMES[mesNum]}</strong> será um mês de intensificação energética para você. A carta ${card.arcano} indica que este portal traz a energia de ${card.energia}.</p>
      <p>Durante este período, você terá acesso facilitado às qualidades de ${card.luz.join(', ')}. Use este mês para iniciativas importantes, rituais de manifestação e decisões significativas.</p>
      <p>Cuidado com as sombras de ${card.sombra.join(' e ')}. Mantenha-se consciente e use a energia do portal para transcender padrões limitantes.</p>
      <p><strong>Ritual do Portal:</strong> No primeiro dia de ${MESES_NOMES[mesNum]}, acenda uma vela, medite com a imagem de ${card.arcano} e escreva suas intenções para o mês.</p>
    </div>`;
  });

  return `
<section class="jm-section accent-mint" id="portais">
  <h2>🌟 Seus 3 Portais Energéticos de 2026</h2>

  <p><strong>${calc.nome}</strong>, existem 3 meses em 2026 que funcionam como "portais" energéticos especiais para você. Nestes períodos, a energia cósmica está especialmente alinhada com sua vibração pessoal, criando oportunidades únicas de transformação e manifestação.</p>

  <p>Seus portais de 2026 são: <strong>${calc.portalMonths.map(m => MESES_NOMES[m]).join(', ')}</strong>. Marque estas datas no calendário - são seus momentos de poder!</p>

  ${portais.join('\n')}

  <div class="jm-callout mint">
    <strong>💡 Como Usar os Portais:</strong>
    <p>Nos dias de portal, suas manifestações são amplificadas. Use estes períodos para lançar projetos, fazer pedidos ao universo, iniciar relacionamentos importantes ou tomar decisões de vida. A energia está a seu favor!</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 12: JORNADA MÊS A MÊS
// ═══════════════════════════════════════════════════════════════
function gerarMeses(calc: CalculosCompletos): string {
  const mesesHtml = calc.cartasMensais.map(card => {
    const isPortal = calc.portalMonths.includes(card.mes);
    return `
    <div class="jm-month-card${isPortal ? ' is-portal' : ''}">
      <div class="jm-month-header">
        <h3>${card.mesNome} 2026${isPortal ? ' ⭐ PORTAL' : ''}</h3>
        <span class="jm-month-badge">${card.arcano}</span>
      </div>
      <div class="jm-tarot-grid" style="margin: 1rem 0;">
        <div class="jm-tarot-card" style="max-width: 140px;">
          <img src="${card.imagem}" alt="${card.arcano}" style="width: 70px;" />
          <h4>${card.arcano}</h4>
          <div class="energia">${card.energia}</div>
        </div>
      </div>
      <p><strong>Energia do Mês:</strong> ${card.energia}. ${card.arcano} rege ${card.mesNome}, trazendo foco em ${card.luz.slice(0, 2).join(' e ')}.</p>
      <p><strong>Oportunidades:</strong> Este mês favorece atividades relacionadas a ${card.luz.join(', ')}. Aproveite para ${card.energia === 'ação' ? 'iniciar projetos' : card.energia === 'receptividade' ? 'refletir e receber' : 'equilibrar dar e receber'}.</p>
      <p><strong>Atenção:</strong> Cuidado com tendências a ${card.sombra.join(' ou ')}. Mantenha-se consciente desses padrões para transformá-los.</p>
    </div>`;
  });

  return `
<section class="jm-section" id="meses">
  <h2>📅 Sua Jornada Mês a Mês em 2026</h2>

  <p><strong>${calc.nome}</strong>, aqui está seu guia completo para cada mês de 2026. Cada período traz uma carta do Tarot específica que define o tom energético daquele momento.</p>

  <p>Os meses marcados com ⭐ são seus <strong>Portais Energéticos</strong> - períodos de poder especial onde suas manifestações são amplificadas.</p>

  ${mesesHtml.join('\n')}
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 13: AMOR & RELACIONAMENTOS
// ═══════════════════════════════════════════════════════════════
function gerarAmor(calc: CalculosCompletos): string {
  const linhaAmor = calc.destinyMatrix.love;
  const arcanoAmor = ARCANO_NOMES[linhaAmor];
  const keywordsAmor = ARCANO_KEYWORDS[linhaAmor] || ARCANO_KEYWORDS[1];

  return `
<section class="jm-section accent-rose" id="amor">
  <h2>💖 Amor & Relacionamentos em 2026</h2>

  <p><strong>${calc.nome}</strong>, sua Linha do Amor na Matriz do Destino é regida por <strong>${arcanoAmor}</strong> (${linhaAmor}). Isso revela padrões profundos sobre como você ama e é amada.</p>

  <p>A energia de ${keywordsAmor.energia} permeia seus relacionamentos. Você busca parceiros que ressoem com ${keywordsAmor.luz.join(', ')}. Em 2026, estas qualidades serão especialmente importantes nas suas conexões.</p>

  <p>O desafio em amor para você é transcender ${keywordsAmor.sombra.join(' e ')}. Quando esses padrões aparecerem, reconheça-os como oportunidades de crescimento, não como defeitos.</p>

  <p>Com o Ano Pessoal ${calc.anoPessoal} focado em ${calc.anoPessoalInfo.tema.toLowerCase()}, seus relacionamentos passarão por ${calc.anoPessoal <= 3 ? 'renovação e novas possibilidades' : calc.anoPessoal <= 6 ? 'aprofundamento e compromisso' : 'transformação e cura'}.</p>

  <p>A combinação de ${calc.signo} com ${arcanoAmor} sugere que você precisa de ${calc.signoInfo.elemento === 'Fogo' ? 'paixão e aventura' : calc.signoInfo.elemento === 'Terra' ? 'estabilidade e sensualidade' : calc.signoInfo.elemento === 'Ar' ? 'comunicação e liberdade' : 'profundidade emocional e intimidade'} nos relacionamentos.</p>

  <h3>💕 Checklist do Amor 2026</h3>
  <ul class="jm-checklist">
    <li>Praticar comunicação honesta e vulnerável</li>
    <li>Estabelecer limites saudáveis com amor</li>
    <li>Cultivar amor próprio antes de buscar amor externo</li>
    <li>Perdoar feridas passadas que bloqueiam novas conexões</li>
    <li>Estar aberta a formas inesperadas de amor</li>
  </ul>

  <div class="jm-callout rose">
    <strong>💖 Afirmação para o Amor:</strong>
    <p>"Eu sou digna de amor profundo e verdadeiro. Eu atraio relacionamentos que honram minha essência de ${calc.signo}. O amor flui para mim com facilidade e graça."</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 14: CARREIRA & PROPÓSITO
// ═══════════════════════════════════════════════════════════════
function gerarCarreira(calc: CalculosCompletos): string {
  const proposito = calc.destinyMatrix.purpose;
  const talento = calc.destinyMatrix.talent;

  return `
<section class="jm-section accent-blue" id="carreira">
  <h2>💼 Carreira & Propósito em 2026</h2>

  <p><strong>${calc.nome}</strong>, sua Matriz do Destino revela que seu Propósito de Vida é <strong>${ARCANO_NOMES[proposito]}</strong> e seu Talento Principal é <strong>${ARCANO_NOMES[talento]}</strong>.</p>

  <p>Isso significa que você veio ao mundo para ${gerarInterpretacaoArcano(proposito)} Seu talento natural de ${(ARCANO_KEYWORDS[talento] || ARCANO_KEYWORDS[1]).energia} é sua ferramenta para cumprir essa missão.</p>

  <p>Em 2026, com o Ano Pessoal ${calc.anoPessoal} focado em ${calc.anoPessoalInfo.tema.toLowerCase()}, sua carreira passará por ${calc.anoPessoalInfo.foco.toLowerCase()}. Este é um momento para ${calc.anoPessoalInfo.acao.toLowerCase()}.</p>

  <p>Como ${calc.signo}, você traz para o trabalho qualidades de ${calc.signoInfo.descricao.toLowerCase()}. Use essas características para se destacar no que faz.</p>

  <p>O arcano ${calc.arcano2026} regendo 2026 sugere que oportunidades profissionais virão através de ${(calc.arcano2026Keywords).luz.join(' e ')}. Fique atenta a portas que se abrem nestas áreas.</p>

  <h3>🎯 Checklist da Carreira 2026</h3>
  <ul class="jm-checklist">
    <li>Alinhar trabalho com propósito de vida</li>
    <li>Desenvolver seu talento principal de ${ARCANO_NOMES[talento]}</li>
    <li>Networking estratégico durante os meses portal</li>
    <li>Atualizar habilidades e conhecimentos</li>
    <li>Celebrar conquistas, por menores que sejam</li>
  </ul>

  <div class="jm-callout blue">
    <strong>💼 Afirmação para Carreira:</strong>
    <p>"Eu sou capaz de alcançar sucesso profissional alinhado com meu propósito. Meu talento de ${(ARCANO_KEYWORDS[talento] || ARCANO_KEYWORDS[1]).energia} abre portas para oportunidades abundantes."</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 15: DINHEIRO & PROSPERIDADE
// ═══════════════════════════════════════════════════════════════
function gerarDinheiro(calc: CalculosCompletos): string {
  const linhaDinheiro = calc.destinyMatrix.money;
  const keywordsDinheiro = ARCANO_KEYWORDS[linhaDinheiro] || ARCANO_KEYWORDS[1];

  return `
<section class="jm-section accent-gold" id="dinheiro">
  <h2>💰 Dinheiro & Prosperidade em 2026</h2>

  <p><strong>${calc.nome}</strong>, sua Linha do Dinheiro na Matriz é <strong>${ARCANO_NOMES[linhaDinheiro]}</strong> (${linhaDinheiro}). Isso revela seu relacionamento energético com abundância e prosperidade.</p>

  <p>A energia de ${keywordsDinheiro.energia} influencia como você atrai, gasta e multiplica recursos. Seus pontos fortes financeiros são ${keywordsDinheiro.luz.join(' e ')}.</p>

  <p>O desafio financeiro é superar padrões de ${keywordsDinheiro.sombra.join(' e ')}. Quando essas tendências aparecerem, respire fundo e faça escolhas conscientes.</p>

  <p>Em 2026, com o Ano Pessoal ${calc.anoPessoal}, suas finanças tendem a ${calc.anoPessoal === 8 ? 'expandir significativamente - é seu ano de colher!' : calc.anoPessoal === 4 ? 'se estabilizar - foco em construir bases sólidas' : calc.anoPessoal === 5 ? 'ter movimentações inesperadas - flexibilidade é chave' : 'refletir seus esforços internos - o externo espelha o interno'}.</p>

  <p>Como ${calc.signo} (elemento ${calc.signoInfo.elemento}), sua relação com dinheiro é ${calc.signoInfo.elemento === 'Fogo' ? 'impulsiva mas generosa - aprenda a poupar' : calc.signoInfo.elemento === 'Terra' ? 'prática e construtora - você sabe acumular' : calc.signoInfo.elemento === 'Ar' ? 'fluida e social - networking traz oportunidades' : 'intuitiva e criativa - confie nos seus insights financeiros'}.</p>

  <h3>💵 Checklist Financeiro 2026</h3>
  <ul class="jm-checklist">
    <li>Criar ou revisar orçamento mensal</li>
    <li>Estabelecer fundo de emergência</li>
    <li>Investir em educação financeira</li>
    <li>Diversificar fontes de renda</li>
    <li>Praticar gratidão pela abundância atual</li>
  </ul>

  <div class="jm-callout gold">
    <strong>💰 Afirmação para Prosperidade:</strong>
    <p>"Eu sou um ímã para abundância. O dinheiro flui para mim de fontes esperadas e inesperadas. Eu uso a energia de ${keywordsDinheiro.energia} para multiplicar meus recursos."</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 16: SAÚDE & BEM-ESTAR
// ═══════════════════════════════════════════════════════════════
function gerarSaude(calc: CalculosCompletos): string {
  const chakraMaisBaixo = [...calc.chakras].sort((a, b) =>
    (a.fisico + a.energetico + a.emocional) - (b.fisico + b.energetico + b.emocional)
  )[0];

  return `
<section class="jm-section accent-mint" id="saude">
  <h2>🌿 Saúde & Bem-Estar em 2026</h2>

  <p><strong>${calc.nome}</strong>, sua saúde holística está conectada ao equilíbrio dos seus chakras e à energia do seu signo ${calc.signo}.</p>

  <p>O chakra que mais precisa de atenção é o <strong>${chakraMaisBaixo.nome}</strong> (${chakraMaisBaixo.icone}), relacionado a ${chakraMaisBaixo.tema}. Dedique tempo especial para equilibrar este centro de energia em 2026.</p>

  <p>Como signo de ${calc.signoInfo.elemento}, você deve prestar atenção a ${calc.signoInfo.elemento === 'Fogo' ? 'febre, inflamações e excesso de energia - pratique atividades que canalizem sua energia' : calc.signoInfo.elemento === 'Terra' ? 'rigidez, peso e estagnação - mantenha-se em movimento' : calc.signoInfo.elemento === 'Ar' ? 'sistema nervoso e respiratório - pratique respiração consciente' : 'retenção de líquidos e emoções - permita-se fluir'}.</p>

  <p>O Ano Pessoal ${calc.anoPessoal} pede que você ${calc.anoPessoal <= 3 ? 'inicie novos hábitos de saúde' : calc.anoPessoal <= 6 ? 'mantenha consistência nas práticas de bem-estar' : 'faça uma revisão profunda do seu estilo de vida'}.</p>

  <p>Seu arcano regente ${calc.arcano2026} sugere práticas de ${calc.arcano2026Keywords.energia}. Isso pode incluir ${calc.arcano2026Keywords.luz[0] === 'intuição' ? 'meditação e práticas contemplativas' : calc.arcano2026Keywords.luz[0] === 'ação' ? 'exercícios físicos intensos' : 'yoga e práticas de equilíbrio'}.</p>

  <h3>🌱 Checklist de Bem-Estar 2026</h3>
  <ul class="jm-checklist">
    <li>Estabelecer rotina de sono regular</li>
    <li>Praticar exercício físico pelo menos 3x por semana</li>
    <li>Meditar ou praticar mindfulness diariamente</li>
    <li>Alimentação consciente e nutritiva</li>
    <li>Check-ups médicos regulares</li>
    <li>Equilibrar o chakra ${chakraMaisBaixo.nome} semanalmente</li>
  </ul>

  <div class="jm-callout mint">
    <strong>🌿 Afirmação para Saúde:</strong>
    <p>"Meu corpo é meu templo sagrado. Eu honro minha saúde com escolhas conscientes todos os dias. Energia vital flui através de todos os meus chakras em perfeito equilíbrio."</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 17: RITUAIS DE PODER
// ═══════════════════════════════════════════════════════════════
function gerarRituais(calc: CalculosCompletos): string {
  return `
<section class="jm-section accent-coral" id="rituais">
  <h2>🔥 Rituais de Poder para 2026</h2>

  <p><strong>${calc.nome}</strong>, estes rituais foram criados especialmente para você, considerando sua energia de ${calc.signo}, seu Ano Pessoal ${calc.anoPessoal} e seu arcano regente ${calc.arcano2026}.</p>

  <div class="jm-ritual">
    <h4>🌙 Ritual do Novo Ciclo (Lua Nova)</h4>
    <p>Realize este ritual a cada Lua Nova para plantar sementes de intenção.</p>
    <ol class="jm-ritual-steps">
      <li>Acenda uma vela ${calc.signoInfo.elemento === 'Fogo' ? 'vermelha' : calc.signoInfo.elemento === 'Terra' ? 'verde' : calc.signoInfo.elemento === 'Ar' ? 'amarela' : 'azul'} representando seu elemento</li>
      <li>Escreva 3 intenções para o ciclo lunar em um papel</li>
      <li>Medite com a imagem de ${calc.arcano2026} por 5 minutos</li>
      <li>Leia suas intenções em voz alta, começando com "Eu sou ${calc.nome} e eu manifesto..."</li>
      <li>Guarde o papel em um local especial até a Lua Cheia</li>
    </ol>
  </div>

  <div class="jm-ritual">
    <h4>✨ Ritual de Manifestação dos Portais</h4>
    <p>Use nos seus meses portal (${calc.portalMonths.map(m => MESES_NOMES[m]).join(', ')}) para amplificar manifestações.</p>
    <ol class="jm-ritual-steps">
      <li>Crie um altar com objetos que representem seus desejos</li>
      <li>Coloque a carta ${calc.arcanoPessoal} no centro do altar</li>
      <li>Acenda incenso de ${calc.signoInfo.elemento === 'Fogo' ? 'canela ou cravo' : calc.signoInfo.elemento === 'Terra' ? 'mirra ou sândalo' : calc.signoInfo.elemento === 'Ar' ? 'lavanda ou alecrim' : 'jasmim ou rosa'}</li>
      <li>Repita seu mantra pessoal 22 vezes (número dos arcanos maiores)</li>
      <li>Visualize seus desejos já realizados por 10 minutos</li>
    </ol>
  </div>

  <div class="jm-ritual">
    <h4>💜 Ritual de Proteção Energética (Semanal)</h4>
    <p>Faça semanalmente para manter sua energia limpa e protegida.</p>
    <ol class="jm-ritual-steps">
      <li>Tome um banho com sal grosso e ervas do seu elemento</li>
      <li>Visualize uma bolha de luz ${calc.signoInfo.elemento === 'Fogo' ? 'dourada' : calc.signoInfo.elemento === 'Terra' ? 'verde-esmeralda' : calc.signoInfo.elemento === 'Ar' ? 'branca-prateada' : 'azul-violeta'} ao seu redor</li>
      <li>Diga: "Eu sou protegida por ${calc.signoInfo.regente}, meu regente celestial"</li>
      <li>Passe as mãos pelos 7 chakras, de baixo para cima, selando cada um</li>
      <li>Finalize agradecendo às energias que te guiam</li>
    </ol>
  </div>

  <div class="jm-ritual">
    <h4>🌅 Ritual Matinal de Ativação (Diário)</h4>
    <p>Comece cada dia alinhada com sua energia mais elevada.</p>
    <ol class="jm-ritual-steps">
      <li>Ao acordar, ainda na cama, agradeça por mais um dia</li>
      <li>Coloque as mãos no coração e sinta sua batida</li>
      <li>Declare: "Hoje eu sou ${calc.arcanoPessoalKeywords.energia}. Eu manifesto ${calc.anoPessoalInfo.tema}"</li>
      <li>Visualize seu dia fluindo perfeitamente</li>
      <li>Sorria e levante-se com energia positiva</li>
    </ol>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 18: SCRIPTS MÁGICOS
// ═══════════════════════════════════════════════════════════════
function gerarScripts(calc: CalculosCompletos): string {
  return `
<section class="jm-section accent-lilas" id="scripts">
  <h2>📜 15+ Scripts Mágicos para 2026</h2>

  <p><strong>${calc.nome}</strong>, use estes scripts diariamente para reprogramar sua mente e alinhar sua energia com seus desejos. Repita cada um pelo menos 3 vezes, de preferência em voz alta.</p>

  <div class="jm-script-box">
    <strong>1. Manifesto de Intenção 2026</strong>
    <p>"Eu, ${calc.nome}, declaro que 2026 é meu ano de ${calc.anoPessoalInfo.tema.toLowerCase()}. Como ${calc.signo} em Ano Pessoal ${calc.anoPessoal}, eu abraço todas as oportunidades de crescimento. Guiada por ${calc.arcanoPessoal}, eu manifesto minha realidade mais elevada."</p>
  </div>

  <div class="jm-script-box">
    <strong>2. Ativação de Abundância</strong>
    <p>"O universo é infinitamente abundante e eu faço parte dessa abundância. O dinheiro flui para mim com facilidade. Eu sou digna de prosperidade em todas as formas. A energia de ${ARCANO_NOMES[calc.destinyMatrix.money]} atrai riqueza para minha vida."</p>
  </div>

  <div class="jm-script-box">
    <strong>3. Magnetismo do Amor</strong>
    <p>"Eu sou amor e atraio amor. Meu coração está aberto para dar e receber. Relacionamentos saudáveis e amorosos chegam até mim naturalmente. A energia de ${ARCANO_NOMES[calc.destinyMatrix.love]} guia minha vida amorosa."</p>
  </div>

  <div class="jm-script-box">
    <strong>4. Confiança e Poder Pessoal</strong>
    <p>"Eu confio em mim mesma e em minhas decisões. Meu poder pessoal cresce a cada dia. Como ${calc.signo}, eu tenho força e sabedoria. Eu sou capaz de realizar tudo que me proponho."</p>
  </div>

  <div class="jm-script-box">
    <strong>5. Cura e Saúde</strong>
    <p>"Meu corpo é saudável, forte e cheio de vitalidade. Cada célula do meu ser vibra em perfeita harmonia. Meus chakras estão equilibrados e minha energia flui livremente. Eu honro e cuido do meu templo sagrado."</p>
  </div>

  <div class="jm-script-box">
    <strong>6. Propósito e Missão</strong>
    <p>"Eu estou alinhada com meu propósito de vida. ${ARCANO_NOMES[calc.destinyMatrix.purpose]} guia meus passos em direção à minha missão. Meu talento de ${ARCANO_NOMES[calc.destinyMatrix.talent]} serve ao mundo. Eu faço a diferença."</p>
  </div>

  <div class="jm-script-box">
    <strong>7. Liberação de Karma</strong>
    <p>"Eu libero padrões que não me servem mais. A energia de ${ARCANO_NOMES[calc.destinyMatrix.karma]} me ensina e me transforma. Eu perdoo a mim mesma e aos outros. Eu estou livre para criar meu novo destino."</p>
  </div>

  <div class="jm-script-box">
    <strong>8. Proteção Energética</strong>
    <p>"Eu estou protegida por luz divina. Nenhuma energia negativa pode me alcançar. Meu campo áurico é forte e impenetrável. ${calc.signoInfo.regente} me guarda e protege em todos os momentos."</p>
  </div>

  <div class="jm-script-box">
    <strong>9. Sucesso Profissional</strong>
    <p>"Eu sou bem-sucedida em minha carreira. Oportunidades profissionais chegam até mim. Meu trabalho é valorizado e bem remunerado. Eu contribuo com meus dons únicos para o mundo."</p>
  </div>

  <div class="jm-script-box">
    <strong>10. Paz Interior</strong>
    <p>"Eu escolho a paz em todas as situações. Minha mente é calma, meu coração é sereno. Eu respiro tranquilidade e exalo harmonia. A paz interior é meu estado natural."</p>
  </div>

  <div class="jm-script-box">
    <strong>11. Gratidão Infinita</strong>
    <p>"Eu sou profundamente grata por tudo em minha vida. A gratidão multiplica minhas bênçãos. Cada dia traz novas razões para agradecer. Meu coração transborda de gratidão."</p>
  </div>

  <div class="jm-script-box">
    <strong>12. Coragem e Determinação</strong>
    <p>"Eu tenho coragem para enfrentar qualquer desafio. Minha determinação é inabalável. Como ${calc.signo}, eu sou ${calc.signoInfo.qualidade.toLowerCase()} e persistente. Nada pode me impedir de alcançar meus objetivos."</p>
  </div>

  <div class="jm-script-box">
    <strong>13. Intuição Aguçada</strong>
    <p>"Minha intuição é forte e confiável. Eu ouço a voz da minha alma. O terceiro olho me guia com clareza. Eu confio nos sinais que o universo me envia."</p>
  </div>

  <div class="jm-script-box">
    <strong>14. Criatividade Fluindo</strong>
    <p>"A criatividade flui através de mim sem esforço. Eu sou um canal para ideias inspiradas. Minha expressão criativa toca e transforma. Eu crio beleza no mundo."</p>
  </div>

  <div class="jm-script-box">
    <strong>15. Merecimento Total</strong>
    <p>"Eu mereço todas as coisas boas da vida. Eu sou digna de amor, abundância e felicidade. Eu me permito receber com alegria. O universo conspira a meu favor."</p>
  </div>

  <div class="jm-script-box">
    <strong>16. Script do Arcano ${calc.arcanoPessoal}</strong>
    <p>"Eu sou a energia viva de ${calc.arcanoPessoal}. As qualidades de ${calc.arcanoPessoalKeywords.luz.join(', ')} são minhas. Eu transcendo ${calc.arcanoPessoalKeywords.sombra.join(' e ')}. Minha essência é ${calc.arcanoPessoalKeywords.energia}."</p>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 19: CHECKLISTS DO GLOW UP
// ═══════════════════════════════════════════════════════════════
function gerarChecklists(calc: CalculosCompletos): string {
  return `
<section class="jm-section accent-mint" id="checklists">
  <h2>✅ Checklists do Glow Up 2026</h2>

  <p><strong>${calc.nome}</strong>, use estes checklists práticos para garantir que você está no caminho do seu melhor ano. Revise-os regularmente e celebre cada item completado!</p>

  <h3>🌅 Checklist Diário</h3>
  <ul class="jm-checklist">
    <li>Acordar com gratidão e intenção positiva</li>
    <li>Recitar pelo menos um script mágico</li>
    <li>Beber 2 litros de água</li>
    <li>Movimentar o corpo por pelo menos 20 minutos</li>
    <li>Meditar ou praticar mindfulness por 10 minutos</li>
    <li>Fazer uma coisa que me aproxime dos meus objetivos</li>
    <li>Antes de dormir, listar 3 gratidões do dia</li>
  </ul>

  <h3>🌙 Checklist Semanal</h3>
  <ul class="jm-checklist">
    <li>Revisar meus objetivos e intenções</li>
    <li>Fazer ritual de proteção energética</li>
    <li>Conectar-se com pessoas que me elevam</li>
    <li>Auto-cuidado profundo (banho relaxante, skincare, etc)</li>
    <li>Organizar ambiente e energia do lar</li>
  </ul>

  <h3>🌟 Checklist Mensal</h3>
  <ul class="jm-checklist">
    <li>Revisar a carta do Tarot do mês</li>
    <li>Fazer ritual de Lua Nova para novas intenções</li>
    <li>Fazer ritual de Lua Cheia para liberação</li>
    <li>Avaliar progresso nos objetivos do ano</li>
    <li>Ajustar o que não está funcionando</li>
  </ul>

  <h3>📅 Checklist dos Portais (${calc.portalMonths.map(m => MESES_NOMES[m]).join(', ')})</h3>
  <ul class="jm-checklist">
    <li>Preparar-se energeticamente uma semana antes</li>
    <li>Fazer ritual especial de manifestação</li>
    <li>Tomar decisões importantes que estavam pendentes</li>
    <li>Iniciar projetos significativos</li>
    <li>Documentar insights e sincronicidades</li>
  </ul>

  <h3>🎯 Checklist do Ano Pessoal ${calc.anoPessoal}</h3>
  <ul class="jm-checklist">
    <li>Foco principal: ${calc.anoPessoalInfo.foco}</li>
    <li>Superar o desafio: ${calc.anoPessoalInfo.desafio}</li>
    <li>Ação recomendada: ${calc.anoPessoalInfo.acao}</li>
    <li>Integrar a energia de ${calc.arcano2026}</li>
    <li>Honrar minha essência de ${calc.signo}</li>
  </ul>
</section>`;
}

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 20: MENSAGEM FINAL
// ═══════════════════════════════════════════════════════════════
function gerarMensagemFinal(calc: CalculosCompletos): string {
  return `
<section class="jm-section accent-rose" id="final">
  <h2>🌙 Mensagem Final para ${calc.nome}</h2>

  <p>Querida <strong>${calc.nome}</strong>,</p>

  <p>Se você chegou até aqui, significa que está verdadeiramente comprometida com seu crescimento e transformação em 2026. Este mapa foi criado com muito carinho, combinando astrologia, numerologia, tarot e sabedoria ancestral para iluminar seu caminho.</p>

  <p>Lembre-se: as estrelas inclinam, mas não obrigam. Você tem o livre-arbítrio para fazer escolhas que moldam seu destino. Este relatório é um guia, não uma sentença. Use as informações como ferramentas de autoconhecimento e empoderamento.</p>

  <p>Como ${calc.signo} em Ano Pessoal ${calc.anoPessoal}, sob a regência de ${calc.arcano2026}, você tem tudo o que precisa para fazer de 2026 um ano extraordinário. Os portais de ${calc.portalMonths.map(m => MESES_NOMES[m]).join(', ')} são seus momentos de poder. Não os desperdice.</p>

  <p>Você é ${calc.arcanoPessoal}. Você carrega a energia de ${calc.arcanoPessoalKeywords.energia}. Você veio ao mundo com um propósito único que só você pode cumprir. Nunca se esqueça de quão especial e poderosa você é.</p>

  <div class="jm-script-box">
    <strong>🌟 Bênção Final para ${calc.nome}:</strong>
    <p>Que as estrelas iluminem seu caminho.<br>
    Que ${calc.signoInfo.regente} te proteja e guie.<br>
    Que a energia de ${calc.arcanoPessoal} te fortaleça.<br>
    Que 2026 seja seu ano de ${calc.anoPessoalInfo.tema.toLowerCase()}.<br>
    Que cada dia te aproxime da sua melhor versão.<br>
    Que o amor, a abundância e a alegria te acompanhem sempre.<br><br>
    <em>Com amor e luz,<br>
    Jovem Mística ✨</em></p>
  </div>

  <p style="text-align: center; margin-top: 2rem;">
    <strong>✨ ${calc.nome}, seu Glow Up começa AGORA! ✨</strong>
  </p>
</section>`;
}
