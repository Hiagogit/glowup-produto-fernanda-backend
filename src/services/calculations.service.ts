/**
 * Serviço de cálculos astrológicos e esotéricos - Versão Completa Lovable
 */

// ═══════════════════════════════════════════════════════════════
// ARCANOS DO TAROT
// ═══════════════════════════════════════════════════════════════

export const ARCANO_NOMES: Record<number, string> = {
  1: "O Mago", 2: "A Sacerdotisa", 3: "A Imperatriz", 4: "O Imperador",
  5: "O Hierofante", 6: "Os Enamorados", 7: "O Carro", 8: "A Justiça",
  9: "O Eremita", 10: "A Roda da Fortuna", 11: "A Força", 12: "O Enforcado",
  13: "A Morte", 14: "A Temperança", 15: "O Diabo", 16: "A Torre",
  17: "A Estrela", 18: "A Lua", 19: "O Sol", 20: "O Julgamento",
  21: "O Mundo", 22: "O Louco"
};

export const ARCANO_IMAGES: Record<number, string> = {
  1: "https://app.jovemistica.com.br/assets/arcano-mago.png",
  2: "https://app.jovemistica.com.br/assets/arcano-sacerdotisa.png",
  3: "https://app.jovemistica.com.br/assets/arcano-imperatriz.png",
  4: "https://app.jovemistica.com.br/assets/arcano-imperador.png",
  5: "https://app.jovemistica.com.br/assets/arcano-hierofante.png",
  6: "https://app.jovemistica.com.br/assets/arcano-enamorados.png",
  7: "https://app.jovemistica.com.br/assets/arcano-carro.png",
  8: "https://app.jovemistica.com.br/assets/arcano-justica.png",
  9: "https://app.jovemistica.com.br/assets/arcano-eremita.png",
  10: "https://app.jovemistica.com.br/assets/arcano-roda.png",
  11: "https://app.jovemistica.com.br/assets/arcano-forca.png",
  12: "https://app.jovemistica.com.br/assets/arcano-enforcado.png",
  13: "https://app.jovemistica.com.br/assets/arcano-morte.png",
  14: "https://app.jovemistica.com.br/assets/arcano-temperanca.png",
  15: "https://app.jovemistica.com.br/assets/arcano-diabo.png",
  16: "https://app.jovemistica.com.br/assets/arcano-torre.png",
  17: "https://app.jovemistica.com.br/assets/arcano-estrela.png",
  18: "https://app.jovemistica.com.br/assets/arcano-lua.png",
  19: "https://app.jovemistica.com.br/assets/arcano-sol.png",
  20: "https://app.jovemistica.com.br/assets/arcano-julgamento.png",
  21: "https://app.jovemistica.com.br/assets/arcano-mundo.png",
  22: "https://app.jovemistica.com.br/assets/arcano-louco.png"
};

export const ARCANO_KEYWORDS: Record<number, { luz: string[]; sombra: string[]; energia: string }> = {
  1: { luz: ["iniciativa", "manifestação", "poder pessoal"], sombra: ["manipulação", "dispersão"], energia: "ação" },
  2: { luz: ["intuição", "mistério", "sabedoria interior"], sombra: ["segredos", "isolamento"], energia: "receptividade" },
  3: { luz: ["abundância", "criatividade", "nutrição"], sombra: ["dependência", "sufocamento"], energia: "fertilidade" },
  4: { luz: ["estrutura", "autoridade", "proteção"], sombra: ["rigidez", "controle"], energia: "estabilidade" },
  5: { luz: ["tradição", "espiritualidade", "orientação"], sombra: ["dogmatismo", "conformismo"], energia: "conexão" },
  6: { luz: ["amor", "escolhas", "harmonia"], sombra: ["indecisão", "tentação"], energia: "união" },
  7: { luz: ["vitória", "determinação", "movimento"], sombra: ["agressividade", "impaciência"], energia: "conquista" },
  8: { luz: ["equilíbrio", "verdade", "karma"], sombra: ["julgamento", "inflexibilidade"], energia: "justiça" },
  9: { luz: ["introspecção", "sabedoria", "guia interior"], sombra: ["isolamento", "crítica"], energia: "reflexão" },
  10: { luz: ["ciclos", "destino", "oportunidade"], sombra: ["instabilidade", "passividade"], energia: "mudança" },
  11: { luz: ["coragem", "compaixão", "autocontrole"], sombra: ["dúvida", "medo"], energia: "força interior" },
  12: { luz: ["sacrifício", "perspectiva", "rendição"], sombra: ["estagnação", "vitimização"], energia: "pausa" },
  13: { luz: ["transformação", "renascimento", "liberação"], sombra: ["resistência", "apego"], energia: "transmutação" },
  14: { luz: ["equilíbrio", "paciência", "cura"], sombra: ["extremos", "impaciência"], energia: "moderação" },
  15: { luz: ["libertação", "sombra consciente", "poder"], sombra: ["vícios", "ilusões"], energia: "confronto" },
  16: { luz: ["revelação", "liberação", "despertar"], sombra: ["destruição", "caos"], energia: "ruptura" },
  17: { luz: ["esperança", "inspiração", "renovação"], sombra: ["desconexão", "pessimismo"], energia: "bênção" },
  18: { luz: ["intuição", "sonhos", "subconsciente"], sombra: ["ilusão", "medo"], energia: "profundidade" },
  19: { luz: ["alegria", "sucesso", "vitalidade"], sombra: ["orgulho", "superficialidade"], energia: "radiância" },
  20: { luz: ["renascimento", "chamado", "avaliação"], sombra: ["julgamento", "negação"], energia: "despertar" },
  21: { luz: ["realização", "integração", "completude"], sombra: ["estagnação", "incompletude"], energia: "totalidade" },
  22: { luz: ["liberdade", "espontaneidade", "novos começos"], sombra: ["imprudência", "fuga"], energia: "potencial" }
};

// ═══════════════════════════════════════════════════════════════
// MESES
// ═══════════════════════════════════════════════════════════════

export const MESES_NOMES: Record<number, string> = {
  1: "Janeiro", 2: "Fevereiro", 3: "Março", 4: "Abril",
  5: "Maio", 6: "Junho", 7: "Julho", 8: "Agosto",
  9: "Setembro", 10: "Outubro", 11: "Novembro", 12: "Dezembro"
};

// ═══════════════════════════════════════════════════════════════
// SIGNOS
// ═══════════════════════════════════════════════════════════════

export const SIGNOS_INFO: Record<string, { elemento: string; qualidade: string; regente: string; casa: number; descricao: string }> = {
  "Áries": { elemento: "Fogo", qualidade: "Cardinal", regente: "Marte", casa: 1, descricao: "Pioneiro, corajoso, impulsivo, líder nato" },
  "Touro": { elemento: "Terra", qualidade: "Fixo", regente: "Vênus", casa: 2, descricao: "Estável, sensual, determinado, valoriza segurança" },
  "Gêmeos": { elemento: "Ar", qualidade: "Mutável", regente: "Mercúrio", casa: 3, descricao: "Curioso, comunicativo, versátil, mente inquieta" },
  "Câncer": { elemento: "Água", qualidade: "Cardinal", regente: "Lua", casa: 4, descricao: "Emocional, protetor, intuitivo, ligado à família" },
  "Leão": { elemento: "Fogo", qualidade: "Fixo", regente: "Sol", casa: 5, descricao: "Criativo, generoso, dramático, quer brilhar" },
  "Virgem": { elemento: "Terra", qualidade: "Mutável", regente: "Mercúrio", casa: 6, descricao: "Analítico, perfeccionista, prestativo, detalhista" },
  "Libra": { elemento: "Ar", qualidade: "Cardinal", regente: "Vênus", casa: 7, descricao: "Diplomático, estético, busca harmonia e parcerias" },
  "Escorpião": { elemento: "Água", qualidade: "Fixo", regente: "Plutão", casa: 8, descricao: "Intenso, transformador, investigador, magnético" },
  "Sagitário": { elemento: "Fogo", qualidade: "Mutável", regente: "Júpiter", casa: 9, descricao: "Aventureiro, filosófico, otimista, busca expansão" },
  "Capricórnio": { elemento: "Terra", qualidade: "Cardinal", regente: "Saturno", casa: 10, descricao: "Ambicioso, disciplinado, prático, visa o topo" },
  "Aquário": { elemento: "Ar", qualidade: "Fixo", regente: "Urano", casa: 11, descricao: "Inovador, humanitário, original, visão de futuro" },
  "Peixes": { elemento: "Água", qualidade: "Mutável", regente: "Netuno", casa: 12, descricao: "Sensitivo, compassivo, artístico, sonhador" }
};

// ═══════════════════════════════════════════════════════════════
// ANO PESSOAL
// ═══════════════════════════════════════════════════════════════

export const ANO_PESSOAL_TEMAS: Record<number, { tema: string; foco: string; desafio: string; acao: string }> = {
  1: { tema: "Novos Começos", foco: "Iniciar projetos, liderança, independência", desafio: "Medo de arriscar", acao: "Dê o primeiro passo em algo novo" },
  2: { tema: "Parcerias", foco: "Cooperação, paciência, relacionamentos", desafio: "Dependência emocional", acao: "Cultive parcerias equilibradas" },
  3: { tema: "Expressão", foco: "Criatividade, comunicação, alegria", desafio: "Dispersão de energia", acao: "Expresse sua verdade" },
  4: { tema: "Estrutura", foco: "Trabalho, organização, fundamentos", desafio: "Rigidez excessiva", acao: "Construa bases sólidas" },
  5: { tema: "Liberdade", foco: "Mudanças, aventura, experimentação", desafio: "Instabilidade", acao: "Abrace o inesperado" },
  6: { tema: "Responsabilidade", foco: "Família, lar, compromissos", desafio: "Sacrifício excessivo", acao: "Cuide de si e dos outros" },
  7: { tema: "Reflexão", foco: "Espiritualidade, estudo, introspecção", desafio: "Isolamento", acao: "Aprofunde seu autoconhecimento" },
  8: { tema: "Poder", foco: "Finanças, autoridade, manifestação", desafio: "Obsessão material", acao: "Equilibre dar e receber" },
  9: { tema: "Conclusão", foco: "Finalização, humanitarismo, sabedoria", desafio: "Apego ao passado", acao: "Deixe ir o que não serve mais" }
};

// ═══════════════════════════════════════════════════════════════
// CHAKRAS
// ═══════════════════════════════════════════════════════════════

export const CHAKRAS = [
  { nome: "Raiz", cor: "#E53935", tema: "Segurança e sobrevivência", icone: "🔴" },
  { nome: "Sacral", cor: "#FB8C00", tema: "Criatividade e emoções", icone: "🟠" },
  { nome: "Plexo Solar", cor: "#FDD835", tema: "Poder pessoal", icone: "🟡" },
  { nome: "Cardíaco", cor: "#43A047", tema: "Amor e compaixão", icone: "💚" },
  { nome: "Laríngeo", cor: "#039BE5", tema: "Expressão e verdade", icone: "🔵" },
  { nome: "Terceiro Olho", cor: "#5E35B1", tema: "Intuição e visão", icone: "🟣" },
  { nome: "Coronário", cor: "#8E24AA", tema: "Conexão espiritual", icone: "👑" }
];

// ═══════════════════════════════════════════════════════════════
// NAKSHATRAS (Astrologia Védica)
// ═══════════════════════════════════════════════════════════════

export const NAKSHATRAS = [
  { nome: "Ashwini", regente: "Ketu", simbolo: "🐎", tema: "Cura e velocidade" },
  { nome: "Bharani", regente: "Vênus", simbolo: "🌺", tema: "Transformação e fertilidade" },
  { nome: "Krittika", regente: "Sol", simbolo: "🔥", tema: "Corte e purificação" },
  { nome: "Rohini", regente: "Lua", simbolo: "🌹", tema: "Beleza e criatividade" },
  { nome: "Mrigashira", regente: "Marte", simbolo: "🦌", tema: "Busca e curiosidade" },
  { nome: "Ardra", regente: "Rahu", simbolo: "💎", tema: "Tempestade e renovação" },
  { nome: "Punarvasu", regente: "Júpiter", simbolo: "🏠", tema: "Retorno e renovação" },
  { nome: "Pushya", regente: "Saturno", simbolo: "🌸", tema: "Nutrição e proteção" },
  { nome: "Ashlesha", regente: "Mercúrio", simbolo: "🐍", tema: "Sabedoria oculta" },
  { nome: "Magha", regente: "Ketu", simbolo: "👑", tema: "Ancestralidade e poder" },
  { nome: "Purva Phalguni", regente: "Vênus", simbolo: "💃", tema: "Prazer e criatividade" },
  { nome: "Uttara Phalguni", regente: "Sol", simbolo: "☀️", tema: "Generosidade e liderança" },
  { nome: "Hasta", regente: "Lua", simbolo: "✋", tema: "Habilidade manual" },
  { nome: "Chitra", regente: "Marte", simbolo: "💎", tema: "Arte e beleza" },
  { nome: "Swati", regente: "Rahu", simbolo: "🌬️", tema: "Independência" },
  { nome: "Vishakha", regente: "Júpiter", simbolo: "🎯", tema: "Determinação" },
  { nome: "Anuradha", regente: "Saturno", simbolo: "⭐", tema: "Amizade e devoção" },
  { nome: "Jyeshtha", regente: "Mercúrio", simbolo: "👑", tema: "Proteção e senioridade" },
  { nome: "Mula", regente: "Ketu", simbolo: "🌿", tema: "Raízes e transformação" },
  { nome: "Purva Ashadha", regente: "Vênus", simbolo: "🌊", tema: "Invencibilidade" },
  { nome: "Uttara Ashadha", regente: "Sol", simbolo: "🏆", tema: "Vitória final" },
  { nome: "Shravana", regente: "Lua", simbolo: "👂", tema: "Escuta e sabedoria" },
  { nome: "Dhanishta", regente: "Marte", simbolo: "🎵", tema: "Riqueza e música" },
  { nome: "Shatabhisha", regente: "Rahu", simbolo: "💫", tema: "Cura e mistério" },
  { nome: "Purva Bhadrapada", regente: "Júpiter", simbolo: "🔥", tema: "Transformação espiritual" },
  { nome: "Uttara Bhadrapada", regente: "Saturno", simbolo: "🌙", tema: "Profundidade" },
  { nome: "Revati", regente: "Mercúrio", simbolo: "🐟", tema: "Compaixão e conclusão" }
];

// ═══════════════════════════════════════════════════════════════
// FUNÇÕES DE CÁLCULO
// ═══════════════════════════════════════════════════════════════

/**
 * Reduz um número para 1-22 (Arcanos Maiores)
 */
function reduceToArcano(num: number): number {
  while (num > 22) {
    num = String(num).split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return num || 22;
}

/**
 * Reduz um número para 1-9 (Numerologia)
 */
function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = String(num).split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return num || 9;
}

/**
 * Calcula o Ano Pessoal
 */
export function calcularAnoPessoal(dia: number, mes: number, ano: number = 2026): number {
  const soma = dia + mes + reduceToSingleDigit(ano);
  return reduceToSingleDigit(soma);
}

/**
 * Calcula o Arcano Pessoal (baseado na data de nascimento)
 */
export function calcularArcanoPessoal(dia: number, mes: number, ano: number): number {
  const soma = dia + mes + reduceToSingleDigit(ano);
  return reduceToArcano(soma);
}

/**
 * Calcula o Arcano do Ano (Pessoal + Ano)
 */
export function calcularArcanoAno(arcanoPessoal: number, ano: number = 2026): number {
  const somaAno = reduceToSingleDigit(ano);
  return reduceToArcano(arcanoPessoal + somaAno);
}

/**
 * Calcula a Matriz do Destino completa
 */
export function calcularMatrizDestino(dia: number, mes: number, ano: number): {
  center: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
  purpose: number;
  talent: number;
  karma: number;
  love: number;
  money: number;
} {
  const d = reduceToArcano(dia);
  const m = reduceToArcano(mes);
  const y = reduceToArcano(reduceToSingleDigit(ano));

  const center = reduceToArcano(d + m + y);
  const top = d;
  const bottom = m;
  const left = y;
  const right = reduceToArcano(d + m);

  const topLeft = reduceToArcano(top + left);
  const topRight = reduceToArcano(top + right);
  const bottomLeft = reduceToArcano(bottom + left);
  const bottomRight = reduceToArcano(bottom + right);

  const purpose = reduceToArcano(center + top);
  const talent = reduceToArcano(center + right);
  const karma = reduceToArcano(center + bottom);
  const love = reduceToArcano(topLeft + bottomRight);
  const money = reduceToArcano(topRight + bottomLeft);

  return {
    center, top, bottom, left, right,
    topLeft, topRight, bottomLeft, bottomRight,
    purpose, talent, karma, love, money
  };
}

/**
 * Calcula os valores dos 7 Chakras baseado na data
 */
export function calcularChakras(dia: number, mes: number, ano: number): Array<{
  nome: string;
  cor: string;
  icone: string;
  tema: string;
  fisico: number;
  energetico: number;
  emocional: number;
}> {
  const base = reduceToArcano(dia + mes);

  return CHAKRAS.map((chakra, index) => {
    const offset = index + 1;
    return {
      ...chakra,
      fisico: reduceToArcano(base + offset),
      energetico: reduceToArcano(base + offset + dia),
      emocional: reduceToArcano(base + offset + mes)
    };
  });
}

/**
 * Calcula a Nakshatra baseado na data
 */
export function calcularNakshatra(dia: number, mes: number): typeof NAKSHATRAS[0] {
  const index = (dia + mes) % 27;
  return NAKSHATRAS[index];
}

/**
 * Calcula as cartas mensais para 2026
 */
export function calcularCartasMensais(arcanoPessoal: number): Array<{
  mes: number;
  mesNome: string;
  arcano: string;
  numero: number;
  imagem: string;
  luz: string[];
  sombra: string[];
  energia: string;
}> {
  const cartas = [];

  for (let mes = 1; mes <= 12; mes++) {
    const numero = reduceToArcano(arcanoPessoal + mes);
    const keywords = ARCANO_KEYWORDS[numero] || ARCANO_KEYWORDS[1];

    cartas.push({
      mes,
      mesNome: MESES_NOMES[mes],
      arcano: ARCANO_NOMES[numero],
      numero,
      imagem: ARCANO_IMAGES[numero],
      luz: keywords.luz,
      sombra: keywords.sombra,
      energia: keywords.energia
    });
  }

  return cartas;
}

/**
 * Calcula os 3 meses portal do ano
 */
export function calcularPortais(anoPessoal: number, arcanoPessoal: number): number[] {
  // Os portais são baseados no ano pessoal e arcano
  const portal1 = ((anoPessoal + 2) % 12) + 1; // Primeiro trimestre
  const portal2 = ((arcanoPessoal + 4) % 12) + 1; // Meio do ano
  const portal3 = ((anoPessoal + arcanoPessoal + 8) % 12) + 1; // Último trimestre

  // Garantir que são meses diferentes
  const portais = [portal1];
  if (!portais.includes(portal2)) portais.push(portal2);
  else portais.push((portal2 % 12) + 1);
  if (!portais.includes(portal3)) portais.push(portal3);
  else portais.push((portal3 % 12) + 1);

  return portais.sort((a, b) => a - b);
}

/**
 * Calcula o signo solar baseado na data
 */
export function calcularSigno(dia: number, mes: number): string {
  const signos = [
    { nome: "Capricórnio", inicio: [1, 1], fim: [1, 19] },
    { nome: "Aquário", inicio: [1, 20], fim: [2, 18] },
    { nome: "Peixes", inicio: [2, 19], fim: [3, 20] },
    { nome: "Áries", inicio: [3, 21], fim: [4, 19] },
    { nome: "Touro", inicio: [4, 20], fim: [5, 20] },
    { nome: "Gêmeos", inicio: [5, 21], fim: [6, 20] },
    { nome: "Câncer", inicio: [6, 21], fim: [7, 22] },
    { nome: "Leão", inicio: [7, 23], fim: [8, 22] },
    { nome: "Virgem", inicio: [8, 23], fim: [9, 22] },
    { nome: "Libra", inicio: [9, 23], fim: [10, 22] },
    { nome: "Escorpião", inicio: [10, 23], fim: [11, 21] },
    { nome: "Sagitário", inicio: [11, 22], fim: [12, 21] },
    { nome: "Capricórnio", inicio: [12, 22], fim: [12, 31] }
  ];

  for (const signo of signos) {
    const [mesInicio, diaInicio] = signo.inicio;
    const [mesFim, diaFim] = signo.fim;

    if (mes === mesInicio && dia >= diaInicio) return signo.nome;
    if (mes === mesFim && dia <= diaFim) return signo.nome;
    if (mes > mesInicio && mes < mesFim) return signo.nome;
  }

  return "Capricórnio";
}

/**
 * Interface do resultado completo dos cálculos
 */
export interface CalculosCompletos {
  nome: string;
  idade: number;
  signo: string;
  signoInfo: typeof SIGNOS_INFO[string];
  anoPessoal: number;
  anoPessoalInfo: typeof ANO_PESSOAL_TEMAS[number];
  arcanoPessoal: string;
  arcanoPessoalNum: number;
  arcanoPessoalImagem: string;
  arcanoPessoalKeywords: typeof ARCANO_KEYWORDS[number];
  arcano2026: string;
  arcano2026Num: number;
  arcano2026Imagem: string;
  arcano2026Keywords: typeof ARCANO_KEYWORDS[number];
  destinyMatrix: ReturnType<typeof calcularMatrizDestino>;
  chakras: ReturnType<typeof calcularChakras>;
  nakshatra: typeof NAKSHATRAS[0];
  portalMonths: number[];
  cartasMensais: ReturnType<typeof calcularCartasMensais>;
}

/**
 * Função principal que calcula TUDO
 */
export function calcularTudo(
  nome: string,
  dia: number,
  mes: number,
  anoNascimento: number
): CalculosCompletos {
  const hoje = new Date();
  const idade = hoje.getFullYear() - anoNascimento;

  const signo = calcularSigno(dia, mes);
  const signoInfo = SIGNOS_INFO[signo] || SIGNOS_INFO["Áries"];

  const anoPessoal = calcularAnoPessoal(dia, mes);
  const anoPessoalInfo = ANO_PESSOAL_TEMAS[anoPessoal] || ANO_PESSOAL_TEMAS[1];

  const arcanoPessoalNum = calcularArcanoPessoal(dia, mes, anoNascimento);
  const arcanoPessoal = ARCANO_NOMES[arcanoPessoalNum];
  const arcanoPessoalImagem = ARCANO_IMAGES[arcanoPessoalNum];
  const arcanoPessoalKeywords = ARCANO_KEYWORDS[arcanoPessoalNum] || ARCANO_KEYWORDS[1];

  const arcano2026Num = calcularArcanoAno(arcanoPessoalNum);
  const arcano2026 = ARCANO_NOMES[arcano2026Num];
  const arcano2026Imagem = ARCANO_IMAGES[arcano2026Num];
  const arcano2026Keywords = ARCANO_KEYWORDS[arcano2026Num] || ARCANO_KEYWORDS[1];

  const destinyMatrix = calcularMatrizDestino(dia, mes, anoNascimento);
  const chakras = calcularChakras(dia, mes, anoNascimento);
  const nakshatra = calcularNakshatra(dia, mes);
  const portalMonths = calcularPortais(anoPessoal, arcanoPessoalNum);
  const cartasMensais = calcularCartasMensais(arcanoPessoalNum);

  return {
    nome,
    idade,
    signo,
    signoInfo,
    anoPessoal,
    anoPessoalInfo,
    arcanoPessoal,
    arcanoPessoalNum,
    arcanoPessoalImagem,
    arcanoPessoalKeywords,
    arcano2026,
    arcano2026Num,
    arcano2026Imagem,
    arcano2026Keywords,
    destinyMatrix,
    chakras,
    nakshatra,
    portalMonths,
    cartasMensais
  };
}
