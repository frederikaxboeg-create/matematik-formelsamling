// Alle emner, ordnet efter kernestoffet i Matematik A, samt forløbene fra studieplanen.
import regneregler from './regneregler.js';
import ligninger from './ligninger.js';
import procent from './procent.js';
import trigonometri from './trigonometri.js';
import plangeometri from './plangeometri.js';
import vektorer from './vektorer.js';
import rummet from './rummet.js';
import figurer from './figurer.js';
import funktioner from './funktioner.js';
import lineaere from './lineaere.js';
import andengrad from './andengrad.js';
import eksponentielle from './eksponentielle.js';
import potens from './potens.js';
import logaritmer from './logaritmer.js';
import trigfunktioner from './trigfunktioner.js';
import regression from './regression.js';
import differential from './differential.js';
import integral from './integral.js';
import differentialligninger from './differentialligninger.js';
import statistik from './statistik.js';
import sandsynlighed from './sandsynlighed.js';
import binomial from './binomial.js';
import normalfordeling from './normalfordeling.js';
import hypotesetest from './hypotesetest.js';
import maple from './maple.js';

export const AREAS = [
  {
    id: 'tal',
    title: 'Tal og algebra',
    desc: 'Regneregler, ligninger og procentregning.',
    topics: [regneregler, ligninger, procent],
  },
  {
    id: 'geometri',
    title: 'Geometri, trigonometri og vektorer',
    desc: 'Trekanter, koordinatgeometri og vektorer i planen og rummet.',
    topics: [trigonometri, vektorer, plangeometri, rummet, figurer],
  },
  {
    id: 'funktioner',
    title: 'Funktioner og infinitesimalregning',
    desc: 'Funktionstyperne, regression, differential- og integralregning og differentialligninger.',
    topics: [funktioner, lineaere, andengrad, eksponentielle, potens, logaritmer, trigfunktioner, regression, differential, integral, differentialligninger],
  },
  {
    id: 'statistik',
    title: 'Sandsynlighed og statistik',
    desc: 'Deskriptiv statistik, kombinatorik, binomial- og normalfordelingen og hypotesetest.',
    topics: [statistik, sandsynlighed, binomial, normalfordeling, hypotesetest],
  },
];

export { maple };

/** Alle sider med formler (emnerne + Maple-siden). */
export const topics = [...AREAS.flatMap((a) => a.topics), maple];
export const topicById = (id) => topics.find((t) => t.id === id);

/**
 * Forløbene fra studieplanen i den rækkefølge, de er gennemgået.
 * status: 'done' = gennemgået, 'now' = i gang nu, 'next' = næste forløb.
 * Ret status her, når et nyt forløb går i gang.
 */
export const FORLOEB = [
  {
    nr: 1,
    title: 'Grundforløb',
    aar: '1.g',
    status: 'done',
    desc: 'Lineære funktioner, grundlæggende algebra og ligningsløsning samt deskriptiv statistik med bl.a. kvartilsæt.',
    topics: ['lineaere', 'regneregler', 'ligninger', 'statistik'],
  },
  {
    nr: 2,
    title: 'Opfriskning af grundbegreber',
    aar: '1.g',
    status: 'done',
    desc: 'Potensregneregler, ligninger, Pythagoras og algebra.',
    topics: ['regneregler', 'ligninger', 'trigonometri'],
  },
  {
    nr: 3,
    title: 'Vektorregning',
    aar: '1.g',
    status: 'done',
    desc: 'Vektorer, længde og retning, skalarproduktet og fortolkningen af det – samt eksponentiel vækst og topunktsformlen.',
    topics: ['vektorer', 'eksponentielle'],
  },
  {
    nr: 4,
    title: 'Procent og vækstfunktioner',
    aar: '1.g',
    status: 'done',
    desc: 'Procent, eksponentielle funktioner, potensfunktioner og lineære funktioner. Kvadratsætninger, andengradspolynomiet, diskriminantformlen og toppunktet.',
    topics: ['procent', 'eksponentielle', 'potens', 'lineaere', 'andengrad'],
  },
  {
    nr: 5,
    title: 'Sandsynlighedsregning',
    aar: '1.g',
    status: 'done',
    desc: 'Stokastisk variabel, permutationer P(n, r), kombinationer K(n, r) og binomialfordelingen – med binpdf og bincdf i Maple.',
    topics: ['sandsynlighed', 'binomial'],
  },
  {
    nr: 6,
    title: 'Regressionsanalyse',
    aar: '1.g',
    status: 'done',
    desc: 'Regression i Maple med Gym-pakken: lineær, eksponentiel, potens-, andengrads- og polynomiel regression samt residualer.',
    topics: ['regression', 'maple'],
  },
  {
    nr: 7,
    title: 'Trigonometri',
    aar: '1.g',
    status: 'done',
    desc: 'Ensvinklede og retvinklede trekanter, Pythagoras, sinus, cosinus og tangens, sinus- og cosinusrelationerne og areal af vilkårlige trekanter.',
    topics: ['trigonometri'],
  },
  {
    nr: 8,
    title: 'Kernestoffet i overblik',
    aar: '2.g',
    status: 'done',
    desc: 'Overblik over hele kernestoffet i Matematik A og repetition af trigonometri og vektorregning.',
    topics: ['trigonometri', 'vektorer'],
  },
  {
    nr: 9,
    title: 'Differentialregning',
    aar: '2.g',
    status: 'now',
    desc: 'Grænseværdi, differentialkvotient og tangent, regnereglerne (også produkt- og kædereglen), monotoniforhold og optimering.',
    topics: ['differential'],
  },
  {
    nr: 10,
    title: 'Integralregning',
    aar: '2.g',
    status: 'next',
    desc: 'Stamfunktioner, ubestemte og bestemte integraler og arealer.',
    topics: ['integral'],
  },
];

const RANK = { done: 1, next: 2, now: 3 };

/** Emnets status ud fra forløbene: den «mest aktuelle» vinder. */
export function statusOf(id) {
  let best = null;
  for (const f of FORLOEB) {
    if (f.topics.includes(id) && (!best || RANK[f.status] > RANK[best])) best = f.status;
  }
  return best;
}

/** Emner fra kernestoffet, som endnu ikke er med i et forløb. */
export const later = AREAS.flatMap((a) => a.topics).filter((t) => !statusOf(t.id));

export const countItems = (t) => t.sections.reduce((n, s) => n + s.items.length, 0);
