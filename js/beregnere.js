// Beregnere: små regnemaskiner, der hører til de enkelte formler.
// Hver beregner har nogle felter og en run-funktion, der giver resultatet som TeX-linjer.
import { el } from './ui.js';
import { tex, math } from './tex.js';

const r = String.raw;

/* ---------- tal ind ---------- */

/** Læser et tal eller et lille regnestykke: 2,5 · 1/3 · sqrt(2) · 2^3 · pi · e. NaN ved fejl. */
export function parseNum(input) {
  const s = String(input ?? '').trim().toLowerCase()
    .replace(/,/g, '.').replace(/[−–]/g, '-').replace(/[·×]/g, '*').replace(/:/g, '/').replace(/\s+/g, '');
  if (!s) return NaN;
  let i = 0;
  const peek = () => s[i];
  const FUNCS = { sqrt: Math.sqrt, kvrod: Math.sqrt, ln: Math.log, log: Math.log10, abs: Math.abs };

  function expr() {
    let v = term();
    while (peek() === '+' || peek() === '-') {
      const op = s[i++];
      const t = term();
      v = op === '+' ? v + t : v - t;
    }
    return v;
  }
  function term() {
    let v = factor();
    while (peek() === '*' || peek() === '/') {
      const op = s[i++];
      const t = factor();
      v = op === '*' ? v * t : v / t;
    }
    return v;
  }
  function factor() {
    if (peek() === '-') { i++; return -factor(); }
    if (peek() === '+') { i++; return factor(); }
    const base = atom();
    if (peek() === '^') { i++; return base ** factor(); }
    return base;
  }
  function atom() {
    if (peek() === '(') {
      i++;
      const v = expr();
      if (peek() !== ')') throw new Error('parentes');
      i++;
      return v;
    }
    const num = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
    if (num) { i += num[0].length; return parseFloat(num[0]); }
    const word = /^[a-z]+/.exec(s.slice(i));
    if (word) {
      i += word[0].length;
      if (word[0] === 'pi') return Math.PI;
      if (word[0] === 'e') return Math.E;
      const fn = FUNCS[word[0]];
      if (fn && peek() === '(') {
        i++;
        const v = expr();
        if (peek() !== ')') throw new Error('parentes');
        i++;
        return fn(v);
      }
    }
    throw new Error('ugyldigt');
  }

  try {
    const v = expr();
    return i === s.length ? v : NaN;
  } catch {
    return NaN;
  }
}

/* ---------- tal ud ---------- */

const round = (x, d) => {
  const p = 10 ** d;
  const v = Math.round(x * p) / p;
  return Object.is(v, -0) ? 0 : v;
};

/** Antal decimaler, tallet vises med: små tal får flere, så der er mindst tre betydende cifre. */
function decimals(x, d) {
  const ax = Math.abs(x);
  return ax !== 0 && ax < 0.01 ? Math.min(10, Math.ceil(-Math.log10(ax)) + 2) : d;
}

/** Tallet som TeX med decimalkomma, og om det vises præcist (uden afrunding). */
function format(x, d = 4) {
  if (!Number.isFinite(x)) return { s: r`\text{–}`, exact: true };
  const ax = Math.abs(x);
  if (ax !== 0 && (ax >= 1e15 || ax < 1e-7)) {
    // Meget store og meget små tal vises som a · 10^n.
    const e = Math.floor(Math.log10(ax));
    const m = x / 10 ** e;
    return {
      s: r`${String(round(m, 3)).replace('.', '{,}')}\cdot 10^{${e}}`,
      exact: Math.abs(round(m, 3) - m) <= 1e-12,
    };
  }
  const dec = decimals(x, d);
  const v = round(x, dec);
  let s = v.toFixed(dec);
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  let [whole, frac] = s.split('.');
  const neg = whole.startsWith('-');
  if (neg) whole = whole.slice(1);
  if (whole.length > 4) whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, r`\,`);
  return {
    s: (neg ? '-' : '') + whole + (frac ? `{,}${frac}` : ''),
    exact: Math.abs(v - x) <= 1e-9 * Math.max(1, ax),
  };
}

/** Tal til TeX med decimalkomma. */
export const f = (x, d = 4) => format(x, d).s;

/** "= tal" hvis tallet vises præcist, ellers "≈ tal". */
function E(x, d = 4) {
  const { s, exact } = format(x, d);
  return `${exact ? '=' : r`\approx `}${s}`;
}

/** Negative tal i parentes, fx når de indsættes i en formel. */
const par = (x, d = 4) => (x < 0 ? `(${f(x, d)})` : f(x, d));
const pct = (x) => r`${f(x * 100, 2)}\,\%`;
const pt = (...c) => r`\left(${c.map((v) => f(v)).join(r`\,;\,`)}\right)`;
const vec = (...c) => r`\begin{pmatrix}${c.map((v) => f(v)).join(r`\\`)}\end{pmatrix}`;
const sq = (x) => x * x;
const rad = (g) => (g * Math.PI) / 180;
const deg = (v) => (v * 180) / Math.PI;
const isInt = (x) => Number.isInteger(x);
const clamp1 = (x) => Math.max(-1, Math.min(1, x));

class Msg extends Error {}
const fail = (text) => { throw new Msg(text); };

/** Forskrift ax + b med pæne fortegn. */
function linTex(a, b) {
  const A = round(a, 4);
  const B = round(b, 4);
  let s = A === 0 ? '' : `${A === 1 ? '' : A === -1 ? '-' : f(A)}x`;
  if (B !== 0 || A === 0) s += (B < 0 ? '-' : s ? '+' : '') + f(Math.abs(B));
  return s;
}

/* ---------- sandsynlighed ---------- */

/** P(X = r) og P(X ≤ r) for X ~ Bin(n, p), regnet med logaritmer, så store n også virker. */
function binom(n, p, k) {
  if (p === 0) return { pmf: k === 0 ? 1 : 0, cdf: 1 };
  if (p === 1) return { pmf: k === n ? 1 : 0, cdf: k >= n ? 1 : 0 };
  const lp = Math.log(p);
  const lq = Math.log(1 - p);
  let lc = 0;
  let cdf = 0;
  let pmf = 0;
  for (let j = 0; j <= k; j++) {
    if (j > 0) lc += Math.log(n - j + 1) - Math.log(j);
    pmf = Math.exp(lc + j * lp + (n - j) * lq);
    cdf += pmf;
  }
  return { pmf, cdf: Math.min(1, cdf) };
}

/** Den komplementære fejlfunktion: række for små x, kædebrøk for store. */
function erfc(x) {
  if (x < 0) return 2 - erfc(-x);
  if (x < 2.5) {
    let sum = x;
    let term = x;
    for (let n = 1; n < 90; n++) {
      term *= (-x * x) / n;
      sum += term / (2 * n + 1);
    }
    return 1 - (2 / Math.sqrt(Math.PI)) * sum;
  }
  let k = x;
  for (let j = 60; j >= 1; j--) k = x + j / 2 / k;
  return Math.exp(-x * x) / (Math.sqrt(Math.PI) * k);
}

/** Fordelingsfunktionen for standardnormalfordelingen. */
export const Phi = (z) => 0.5 * erfc(-z / Math.SQRT2);

function median(sorted) {
  const n = sorted.length;
  return n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

/* ---------- beregnerne ---------- */

export const CALCS = {
  andengrad: {
    title: 'Andengradsligning og toppunkt',
    intro: r`Løser $ax^2+bx+c=0$ og finder toppunktet for $f(x)=ax^2+bx+c$.`,
    fields: [
      { id: 'a', label: 'a', value: '2' },
      { id: 'b', label: 'b', value: '-4' },
      { id: 'c', label: 'c', value: '-6' },
    ],
    run({ a, b, c }) {
      if (a === 0) fail('$a$ må ikke være 0 i en andengradsligning.');
      const d = b * b - 4 * a * c;
      const out = [r`d=b^2-4ac=${par(b)}^2-4\cdot ${par(a)}\cdot ${par(c)}${E(d)}`];
      if (Math.abs(d) < 1e-12) {
        out.push(r`x=-\frac{b}{2a}${E(-b / (2 * a))}\quad\text{(én løsning)}`);
      } else if (d > 0) {
        const x1 = (-b - Math.sqrt(d)) / (2 * a);
        const x2 = (-b + Math.sqrt(d)) / (2 * a);
        out.push(r`x=\frac{${f(-b)}\pm\sqrt{${f(d)}}}{${f(2 * a)}}`);
        out.push(r`x_1${E(Math.min(x1, x2))}\quad\lor\quad x_2${E(Math.max(x1, x2))}`);
      } else {
        out.push(r`d<0:\quad\text{ingen løsninger}`);
      }
      out.push(r`T=\left(-\frac{b}{2a},\,-\frac{d}{4a}\right)=${pt(-b / (2 * a), -d / (4 * a))}`);
      return out;
    },
  },

  'to-ligninger': {
    title: 'To ligninger med to ubekendte',
    intro: r`Løser $a_1x+b_1y=c_1$ og $a_2x+b_2y=c_2$.`,
    fields: [
      { id: 'a1', label: 'a_1', value: '1' },
      { id: 'b1', label: 'b_1', value: '1' },
      { id: 'c1', label: 'c_1', value: '5' },
      { id: 'a2', label: 'a_2', value: '1' },
      { id: 'b2', label: 'b_2', value: '-1' },
      { id: 'c2', label: 'c_2', value: '1' },
    ],
    run({ a1, b1, c1, a2, b2, c2 }) {
      const D = a1 * b2 - a2 * b1;
      const out = [r`a_1b_2-a_2b_1${E(D)}`];
      if (Math.abs(D) < 1e-12) {
        out.push('!Der er ikke netop én løsning: de to linjer er parallelle eller ens.');
        return out;
      }
      out.push(r`x=\frac{c_1b_2-c_2b_1}{a_1b_2-a_2b_1}${E((c1 * b2 - c2 * b1) / D)}`);
      out.push(r`y=\frac{a_1c_2-a_2c_1}{a_1b_2-a_2b_1}${E((a1 * c2 - a2 * c1) / D)}`);
      return out;
    },
  },

  procent: {
    title: 'Vækstrate og fremskrivningsfaktor',
    fields: [
      { id: 'B', label: r`B\;\text{(start)}`, value: '80' },
      { id: 'S', label: r`S\;\text{(slut)}`, value: '92' },
    ],
    run({ B, S }) {
      if (B === 0) fail('Begyndelsesværdien må ikke være 0.');
      const rate = (S - B) / B;
      return [
        r`r=\frac{S-B}{B}=\frac{${f(S - B)}}{${f(B)}}${E(rate)}=${pct(rate)}`,
        r`F=\frac{S}{B}${E(S / B)}`,
      ];
    },
  },

  rente: {
    title: 'Renteformlen',
    fields: [
      { id: 'K0', label: 'K_0', value: '2500' },
      { id: 'p', label: r`r\;\text{i }\%`, value: '3' },
      { id: 'n', label: 'n', value: '5' },
    ],
    run({ K0, p, n }) {
      const F = 1 + p / 100;
      if (F <= 0) fail('Renten skal være større end −100 %.');
      const Kn = K0 * F ** n;
      return [
        r`K_n=K_0\cdot(1+r)^n=${f(K0)}\cdot ${f(F, 6)}^{${f(n)}}${E(Kn, 2)}`,
        r`\text{Samlet vækst: }${f(F, 6)}^{${f(n)}}-1${E(F ** n - 1)}=${pct(F ** n - 1)}`,
      ];
    },
  },

  'topunkt-lin': {
    title: 'Lineær funktion gennem to punkter',
    fields: [
      { id: 'x1', label: 'x_1', value: '2' },
      { id: 'y1', label: 'y_1', value: '3' },
      { id: 'x2', label: 'x_2', value: '6' },
      { id: 'y2', label: 'y_2', value: '11' },
    ],
    run({ x1, y1, x2, y2 }) {
      if (x1 === x2) fail('De to punkter skal have forskellige $x$-værdier.');
      const a = (y2 - y1) / (x2 - x1);
      const b = y1 - a * x1;
      return [
        r`a=\frac{y_2-y_1}{x_2-x_1}=\frac{${f(y2 - y1)}}{${f(x2 - x1)}}${E(a)}`,
        r`b=y_1-a\cdot x_1${E(b)}`,
        r`f(x)=${linTex(a, b)}`,
      ];
    },
  },

  'topunkt-eksp': {
    title: 'Eksponentiel funktion gennem to punkter',
    fields: [
      { id: 'x1', label: 'x_1', value: '1' },
      { id: 'y1', label: 'y_1', value: '6' },
      { id: 'x2', label: 'x_2', value: '4' },
      { id: 'y2', label: 'y_2', value: '48' },
    ],
    run({ x1, y1, x2, y2 }) {
      if (x1 === x2) fail('De to punkter skal have forskellige $x$-værdier.');
      if (y1 <= 0 || y2 <= 0) fail('Begge $y$-værdier skal være positive.');
      const a = (y2 / y1) ** (1 / (x2 - x1));
      const b = y1 / a ** x1;
      const out = [
        r`a=\sqrt[x_2-x_1]{\frac{y_2}{y_1}}=\sqrt[${f(x2 - x1)}]{${f(y2 / y1)}}${E(a)}`,
        r`b=\frac{y_1}{a^{x_1}}${E(b)}`,
        r`f(x)=${f(b)}\cdot ${f(a)}^x`,
        r`r=a-1${E(a - 1)}=${pct(a - 1)}`,
      ];
      if (a > 1) out.push(r`T_2=\frac{\ln(2)}{\ln(a)}${E(Math.LN2 / Math.log(a))}`);
      else if (a < 1) out.push(r`T_{\frac{1}{2}}=\frac{\ln(\frac{1}{2})}{\ln(a)}${E(-Math.LN2 / Math.log(a))}`);
      return out;
    },
  },

  'topunkt-potens': {
    title: 'Potensfunktion gennem to punkter',
    fields: [
      { id: 'x1', label: 'x_1', value: '2' },
      { id: 'y1', label: 'y_1', value: '12' },
      { id: 'x2', label: 'x_2', value: '4' },
      { id: 'y2', label: 'y_2', value: '48' },
    ],
    run({ x1, y1, x2, y2 }) {
      if ([x1, y1, x2, y2].some((v) => v <= 0)) fail('Alle fire tal skal være positive.');
      if (x1 === x2) fail('De to punkter skal have forskellige $x$-værdier.');
      const a = Math.log(y2 / y1) / Math.log(x2 / x1);
      const b = y1 / x1 ** a;
      return [
        r`a=\frac{\log(y_2/y_1)}{\log(x_2/x_1)}=\frac{\log(${f(y2 / y1)})}{\log(${f(x2 / x1)})}${E(a)}`,
        r`b=\frac{y_1}{x_1^{\,a}}${E(b)}`,
        r`f(x)=${f(b)}\cdot x^{${f(a)}}`,
      ];
    },
  },

  fordobling: {
    title: 'Fordoblings- eller halveringskonstant',
    fields: [{ id: 'a', label: 'a', value: '1,05' }],
    run({ a }) {
      if (a <= 0 || a === 1) fail('$a$ skal være positiv og forskellig fra 1.');
      if (a > 1) return [r`T_2=\frac{\ln(2)}{\ln(a)}=\frac{\ln(2)}{\ln(${f(a)})}${E(Math.LN2 / Math.log(a))}`, r`r=a-1=${pct(a - 1)}`];
      return [r`T_{\frac{1}{2}}=\frac{\ln(\frac{1}{2})}{\ln(a)}=\frac{\ln(0{,}5)}{\ln(${f(a)})}${E(-Math.LN2 / Math.log(a))}`, r`r=a-1=${pct(a - 1)}`];
    },
  },

  pythagoras: {
    title: 'Pythagoras',
    intro: 'Udfyld to af siderne, og lad den tredje stå tom.',
    fields: [
      { id: 'a', label: r`a\;\text{(katete)}`, value: '3', optional: true },
      { id: 'b', label: r`b\;\text{(katete)}`, value: '4', optional: true },
      { id: 'c', label: r`c\;\text{(hypotenuse)}`, value: '', optional: true },
    ],
    run({ a, b, c }) {
      const known = [a, b, c].filter(Number.isFinite);
      if (known.length < 2) fail('Udfyld to af de tre sider.');
      if (known.some((v) => v <= 0)) fail('Sidelængderne skal være positive.');
      if (known.length === 3) {
        const ok = Math.abs(a * a + b * b - c * c) < 1e-9 * c * c;
        return [r`a^2+b^2=${f(a * a + b * b)}\qquad c^2=${f(c * c)}`, `!Trekanten er ${ok ? '' : '<b>ikke</b> '}retvinklet.`];
      }
      if (!Number.isFinite(c)) return [r`c=\sqrt{a^2+b^2}=\sqrt{${f(a * a)}+${f(b * b)}}${E(Math.hypot(a, b))}`];
      const k = Number.isFinite(a) ? a : b;
      if (k >= c) fail('Hypotenusen skal være længere end kateten.');
      const name = Number.isFinite(a) ? 'b' : 'a';
      return [r`${name}=\sqrt{c^2-${name === 'b' ? 'a' : 'b'}^2}=\sqrt{${f(c * c)}-${f(k * k)}}${E(Math.sqrt(c * c - k * k))}`];
    },
  },

  'cos-side': {
    title: 'Cosinusrelationen: find en side',
    intro: 'To sider og vinklen mellem dem.',
    fields: [
      { id: 'a', label: 'a', value: '5' },
      { id: 'b', label: 'b', value: '7' },
      { id: 'C', label: r`C\;\text{i grader}`, value: '60' },
    ],
    run({ a, b, C }) {
      if (a <= 0 || b <= 0) fail('Sidelængderne skal være positive.');
      if (C <= 0 || C >= 180) fail('Vinklen skal ligge mellem 0° og 180°.');
      const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C)));
      const A = deg(Math.acos(clamp1((b * b + c * c - a * a) / (2 * b * c))));
      return [
        r`c=\sqrt{a^2+b^2-2ab\cos(C)}${E(c)}`,
        r`A${E(A, 2)}^\circ\qquad B${E(180 - A - C, 2)}^\circ`,
        r`T=\tfrac{1}{2}ab\sin(C)${E(0.5 * a * b * Math.sin(rad(C)))}`,
      ];
    },
  },

  'cos-vinkel': {
    title: 'Cosinusrelationen: find vinklerne',
    intro: 'Alle tre sider.',
    fields: [
      { id: 'a', label: 'a', value: '5' },
      { id: 'b', label: 'b', value: '6' },
      { id: 'c', label: 'c', value: '7' },
    ],
    run({ a, b, c }) {
      if (a <= 0 || b <= 0 || c <= 0) fail('Sidelængderne skal være positive.');
      if (a + b <= c || a + c <= b || b + c <= a) fail('De tre sider kan ikke danne en trekant: den længste side skal være kortere end de to andre tilsammen.');
      const A = deg(Math.acos(clamp1((b * b + c * c - a * a) / (2 * b * c))));
      const B = deg(Math.acos(clamp1((a * a + c * c - b * b) / (2 * a * c))));
      const C = 180 - A - B;
      return [
        r`A=\cos^{-1}\!\left(\frac{b^2+c^2-a^2}{2bc}\right)${E(A, 2)}^\circ`,
        r`B=\cos^{-1}\!\left(\frac{a^2+c^2-b^2}{2ac}\right)${E(B, 2)}^\circ`,
        r`C=180^\circ-A-B${E(C, 2)}^\circ`,
        r`T=\tfrac{1}{2}ab\sin(C)${E(0.5 * a * b * Math.sin(rad(C)))}`,
      ];
    },
  },

  'sin-side': {
    title: 'Sinusrelationen: find en side',
    intro: 'En vinkel, dens modstående side og en vinkel mere.',
    fields: [
      { id: 'A', label: r`A\;\text{i grader}`, value: '40' },
      { id: 'a', label: 'a', value: '6' },
      { id: 'B', label: r`B\;\text{i grader}`, value: '65' },
    ],
    run({ A, a, B }) {
      if (a <= 0) fail('Sidelængden skal være positiv.');
      if (A <= 0 || B <= 0 || A + B >= 180) fail('Vinklerne skal være positive, og summen skal være under 180°.');
      const C = 180 - A - B;
      return [
        r`b=\frac{a\cdot\sin(B)}{\sin(A)}${E((a * Math.sin(rad(B))) / Math.sin(rad(A)))}`,
        r`C=180^\circ-A-B${E(C, 2)}^\circ`,
        r`c=\frac{a\cdot\sin(C)}{\sin(A)}${E((a * Math.sin(rad(C))) / Math.sin(rad(A)))}`,
      ];
    },
  },

  'sin-vinkel': {
    title: 'Sinusrelationen: find en vinkel',
    intro: 'En vinkel, dens modstående side og en side mere.',
    fields: [
      { id: 'A', label: r`A\;\text{i grader}`, value: '40' },
      { id: 'a', label: 'a', value: '6' },
      { id: 'b', label: 'b', value: '8' },
    ],
    run({ A, a, b }) {
      if (a <= 0 || b <= 0) fail('Sidelængderne skal være positive.');
      if (A <= 0 || A >= 180) fail('Vinklen skal ligge mellem 0° og 180°.');
      const s = (b * Math.sin(rad(A))) / a;
      const out = [r`\sin(B)=\frac{b\cdot\sin(A)}{a}${E(s)}`];
      if (s > 1 + 1e-12) {
        out.push('!Der findes ingen trekant med de mål, fordi $\\sin(B)$ ikke kan være større end 1.');
        return out;
      }
      const B1 = deg(Math.asin(Math.min(1, s)));
      const sols = [B1, 180 - B1].filter((B, idx) => A + B < 180 - 1e-9 && (idx === 0 || Math.abs(B - B1) > 1e-9));
      if (!sols.length) {
        out.push('!Der findes ingen trekant med de mål.');
        return out;
      }
      sols.forEach((B, idx) => {
        const C = 180 - A - B;
        const c = (a * Math.sin(rad(C))) / Math.sin(rad(A));
        const tag = sols.length > 1 ? r`\text{Løsning ${idx + 1}: }` : '';
        out.push(r`${tag}B${E(B, 2)}^\circ\qquad C${E(C, 2)}^\circ\qquad c${E(c)}`);
      });
      out.push(sols.length > 1 ? '!Der er to trekanter, der passer.' : '!Der er netop én trekant, der passer.');
      return out;
    },
  },

  trekantareal: {
    title: 'Areal af en trekant',
    intro: 'To sider og vinklen mellem dem.',
    fields: [
      { id: 'a', label: 'a', value: '5' },
      { id: 'b', label: 'b', value: '7' },
      { id: 'C', label: r`C\;\text{i grader}`, value: '60' },
    ],
    run({ a, b, C }) {
      if (a <= 0 || b <= 0) fail('Sidelængderne skal være positive.');
      if (C <= 0 || C >= 180) fail('Vinklen skal ligge mellem 0° og 180°.');
      return [r`T=\tfrac{1}{2}\cdot ${f(a)}\cdot ${f(b)}\cdot\sin(${f(C)}^\circ)${E(0.5 * a * b * Math.sin(rad(C)))}`];
    },
  },

  radian: {
    title: 'Grader og radianer',
    intro: 'Udfyld det ene felt, og lad det andet stå tomt.',
    fields: [
      { id: 'g', label: r`\text{grader}`, value: '60', optional: true },
      { id: 'v', label: r`\text{radianer}`, value: '', optional: true },
    ],
    run({ g, v }) {
      if (Number.isFinite(g)) return [r`${f(g)}^\circ\cdot\frac{\pi}{180^\circ}${E(g / 180)}\cdot\pi${E(rad(g))}`];
      if (Number.isFinite(v)) return [r`${f(v)}\cdot\frac{180^\circ}{\pi}${E(deg(v), 2)}^\circ`];
      return fail('Udfyld ét af felterne.');
    },
  },

  'afstand-punkter': {
    title: 'Afstand og midtpunkt',
    fields: [
      { id: 'x1', label: 'x_1', value: '1' },
      { id: 'y1', label: 'y_1', value: '2' },
      { id: 'x2', label: 'x_2', value: '4' },
      { id: 'y2', label: 'y_2', value: '6' },
    ],
    run({ x1, y1, x2, y2 }) {
      return [
        r`|AB|=\sqrt{${par(x2 - x1)}^2+${par(y2 - y1)}^2}${E(Math.hypot(x2 - x1, y2 - y1))}`,
        r`M=${pt((x1 + x2) / 2, (y1 + y2) / 2)}`,
      ];
    },
  },

  'dist-linje': {
    title: 'Afstand fra punkt til linje',
    intro: r`Linjen $ax+by+c=0$ og punktet $P(x_1,y_1)$. Har du $y=ax+b$, så skriv den som $ax-y+b=0$.`,
    fields: [
      { id: 'a', label: 'a', value: '3' },
      { id: 'b', label: 'b', value: '4' },
      { id: 'c', label: 'c', value: '-5' },
      { id: 'x1', label: 'x_1', value: '3' },
      { id: 'y1', label: 'y_1', value: '4' },
    ],
    run({ a, b, c, x1, y1 }) {
      if (a === 0 && b === 0) fail('$a$ og $b$ må ikke begge være 0.');
      const top = Math.abs(a * x1 + b * y1 + c);
      return [r`\operatorname{dist}(P,l)=\frac{|${f(a)}\cdot ${par(x1)}+${par(b)}\cdot ${par(y1)}+${par(c)}|}{\sqrt{${par(a)}^2+${par(b)}^2}}=\frac{${f(top)}}{${f(Math.hypot(a, b))}}${E(top / Math.hypot(a, b))}`];
    },
  },

  cirkel: {
    title: 'Centrum og radius',
    intro: r`Cirklen $x^2+y^2+dx+ey+f=0$.`,
    fields: [
      { id: 'd', label: 'd', value: '-4' },
      { id: 'e', label: 'e', value: '6' },
      { id: 'f', label: 'f', value: '-12' },
    ],
    run({ d, e, f: k }) {
      const r2 = (d * d) / 4 + (e * e) / 4 - k;
      const out = [r`C=\left(-\frac{d}{2},\,-\frac{e}{2}\right)=${pt(-d / 2, -e / 2)}`, r`r^2=\frac{d^2}{4}+\frac{e^2}{4}-f${E(r2)}`];
      if (r2 < 0) out.push('!Ligningen beskriver ikke en cirkel, fordi $r^2$ er negativ.');
      else if (r2 === 0) out.push('!Ligningen beskriver kun ét punkt.');
      else out.push(r`r${E(Math.sqrt(r2))}`, r`(x${-d / 2 < 0 ? '+' : '-'}${f(Math.abs(d / 2))})^2+(y${-e / 2 < 0 ? '+' : '-'}${f(Math.abs(e / 2))})^2=${f(r2)}`);
      return out;
    },
  },

  vektor2: {
    title: 'To vektorer i planen',
    intro: r`Regner på $\vec{a}=\svek{a_1}{a_2}$ og $\vec{b}=\svek{b_1}{b_2}$.`,
    fields: [
      { id: 'a1', label: 'a_1', value: '3' },
      { id: 'a2', label: 'a_2', value: '4' },
      { id: 'b1', label: 'b_1', value: '2' },
      { id: 'b2', label: 'b_2', value: '-1' },
    ],
    run({ a1, a2, b1, b2 }) {
      const la = Math.hypot(a1, a2);
      const lb = Math.hypot(b1, b2);
      const dot = a1 * b1 + a2 * b2;
      const det = a1 * b2 - a2 * b1;
      const out = [
        r`|\vec{a}|${E(la)}\qquad|\vec{b}|${E(lb)}`,
        r`\vec{a}\cdot\vec{b}=${f(a1)}\cdot ${par(b1)}+${par(a2)}\cdot ${par(b2)}${E(dot)}`,
        r`\det(\vec{a},\vec{b})=${f(a1)}\cdot ${par(b2)}-${par(a2)}\cdot ${par(b1)}${E(det)}`,
      ];
      if (la > 0 && lb > 0) out.push(r`v=\cos^{-1}\!\left(\frac{\vec{a}\cdot\vec{b}}{|\vec{a}|\cdot|\vec{b}|}\right)${E(deg(Math.acos(clamp1(dot / (la * lb)))), 2)}^\circ`);
      out.push(r`A_{\text{parallelogram}}=|\det(\vec{a},\vec{b})|${E(Math.abs(det))}\qquad T_{\text{trekant}}${E(Math.abs(det) / 2)}`);
      if (la > 0) out.push(r`\vec{b}_{\vec{a}}=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}|^2}\cdot\vec{a}=${vec((dot / (la * la)) * a1, (dot / (la * la)) * a2)}`);
      out.push(r`\widehat{\vec{a}}=${vec(-a2, a1)}`);
      return out;
    },
  },

  vektor3: {
    title: 'To vektorer i rummet',
    fields: [
      { id: 'a1', label: 'a_1', value: '1' },
      { id: 'a2', label: 'a_2', value: '2' },
      { id: 'a3', label: 'a_3', value: '3' },
      { id: 'b1', label: 'b_1', value: '4' },
      { id: 'b2', label: 'b_2', value: '5' },
      { id: 'b3', label: 'b_3', value: '6' },
    ],
    run({ a1, a2, a3, b1, b2, b3 }) {
      const la = Math.hypot(a1, a2, a3);
      const lb = Math.hypot(b1, b2, b3);
      const dot = a1 * b1 + a2 * b2 + a3 * b3;
      const cx = a2 * b3 - a3 * b2;
      const cy = a3 * b1 - a1 * b3;
      const cz = a1 * b2 - a2 * b1;
      const out = [
        r`|\vec{a}|${E(la)}\qquad|\vec{b}|${E(lb)}`,
        r`\vec{a}\cdot\vec{b}${E(dot)}`,
        r`\vec{a}\times\vec{b}=${vec(cx, cy, cz)}`,
      ];
      if (la > 0 && lb > 0) out.push(r`v=\cos^{-1}\!\left(\frac{\vec{a}\cdot\vec{b}}{|\vec{a}|\cdot|\vec{b}|}\right)${E(deg(Math.acos(clamp1(dot / (la * lb)))), 2)}^\circ`);
      out.push(r`A_{\text{parallelogram}}=|\vec{a}\times\vec{b}|${E(Math.hypot(cx, cy, cz))}`);
      return out;
    },
  },

  'dist-plan': {
    title: 'Afstand fra punkt til plan',
    intro: r`Planen $ax+by+cz+d=0$ og punktet $P(x_1,y_1,z_1)$.`,
    fields: [
      { id: 'a', label: 'a', value: '2' },
      { id: 'b', label: 'b', value: '-2' },
      { id: 'c', label: 'c', value: '1' },
      { id: 'd', label: 'd', value: '-5' },
      { id: 'x1', label: 'x_1', value: '1' },
      { id: 'y1', label: 'y_1', value: '2' },
      { id: 'z1', label: 'z_1', value: '3' },
    ],
    run({ a, b, c, d, x1, y1, z1 }) {
      const len = Math.hypot(a, b, c);
      if (len === 0) fail('$a$, $b$ og $c$ må ikke alle være 0.');
      const top = Math.abs(a * x1 + b * y1 + c * z1 + d);
      return [r`\operatorname{dist}(P,\alpha)=\frac{|ax_1+by_1+cz_1+d|}{\sqrt{a^2+b^2+c^2}}=\frac{${f(top)}}{${f(len)}}${E(top / len)}`];
    },
  },

  kombinatorik: {
    title: 'Fakultet, permutationer og kombinationer',
    fields: [
      { id: 'n', label: 'n', value: '5' },
      { id: 'r', label: 'r', value: '2' },
    ],
    run({ n, r: k }) {
      if (!isInt(n) || !isInt(k) || n < 0 || k < 0) fail('$n$ og $r$ skal være hele tal, der ikke er negative.');
      if (k > n) fail('$r$ må ikke være større end $n$.');
      if (n > 170) fail('Vælg $n$ på højst 170 – ellers bliver tallene for store.');
      let fact = 1;
      for (let j = 2; j <= n; j++) fact *= j;
      let perm = 1;
      for (let j = 0; j < k; j++) perm *= n - j;
      let comb = 1;
      for (let j = 1; j <= Math.min(k, n - k); j++) comb = (comb * (n - Math.min(k, n - k) + j)) / j;
      comb = Math.round(comb);
      return [
        r`${f(n)}!${E(fact)}`,
        r`P(${f(n)},${f(k)})=\frac{${f(n)}!}{${f(n - k)}!}${E(perm)}`,
        r`K(${f(n)},${f(k)})=\frac{${f(n)}!}{${f(k)}!\cdot ${f(n - k)}!}${E(comb)}`,
      ];
    },
  },

  binomial: {
    title: 'Binomialfordelingen',
    intro: r`$X\sim\operatorname{Bin}(n,p)$ – sandsynligheder for $r$ succeser.`,
    fields: [
      { id: 'n', label: 'n', value: '10' },
      { id: 'p', label: 'p', value: '0,3' },
      { id: 'r', label: 'r', value: '4' },
    ],
    run({ n, p, r: k }) {
      if (!isInt(n) || n < 1) fail('$n$ skal være et positivt helt tal.');
      if (n > 100000) fail('Vælg $n$ på højst 100 000.');
      if (p < 0 || p > 1) fail('$p$ skal ligge mellem 0 og 1.');
      if (!isInt(k) || k < 0 || k > n) fail('$r$ skal være et helt tal mellem 0 og $n$.');
      const { pmf, cdf } = binom(n, p, k);
      return [
        r`P(X=${f(k)})${E(pmf)}`,
        r`P(X\leq ${f(k)})${E(cdf)}\qquad P(X<${f(k)})${E(Math.max(0, cdf - pmf))}`,
        r`P(X\geq ${f(k)})${E(Math.max(0, 1 - (cdf - pmf)))}\qquad P(X>${f(k)})${E(Math.max(0, 1 - cdf))}`,
        r`\mu=n\cdot p${E(n * p)}\qquad\sigma=\sqrt{n\cdot p\cdot(1-p)}${E(Math.sqrt(n * p * (1 - p)))}`,
      ];
    },
  },

  normal: {
    title: 'Normalfordelingen',
    intro: r`$X\sim N(\mu,\sigma)$. Lad $a$ eller $b$ stå tom for kun at regne den ene vej.`,
    fields: [
      { id: 'mu', label: r`\mu`, value: '100' },
      { id: 'sigma', label: r`\sigma`, value: '15' },
      { id: 'a', label: r`a\;\text{(nedre)}`, value: '85', optional: true },
      { id: 'b', label: r`b\;\text{(øvre)}`, value: '115', optional: true },
    ],
    run({ mu, sigma, a, b }) {
      if (!Number.isFinite(mu) || !Number.isFinite(sigma)) fail('Udfyld $\\mu$ og $\\sigma$.');
      if (sigma <= 0) fail('$\\sigma$ skal være positiv.');
      const hasA = Number.isFinite(a);
      const hasB = Number.isFinite(b);
      if (!hasA && !hasB) fail('Udfyld mindst én af grænserne $a$ og $b$.');
      const z = (x) => (x - mu) / sigma;
      const out = [];
      if (hasA && hasB) {
        if (a > b) fail('$a$ skal være mindre end $b$.');
        out.push(r`P(${f(a)}\leq X\leq ${f(b)})${E(Phi(z(b)) - Phi(z(a)))}`);
      }
      if (hasA) out.push(r`P(X\leq ${f(a)})${E(Phi(z(a)))}\qquad P(X>${f(a)})${E(Phi(-z(a)))}\qquad z${E(z(a))}`);
      if (hasB) out.push(r`P(X\leq ${f(b)})${E(Phi(z(b)))}\qquad P(X>${f(b)})${E(Phi(-z(b)))}\qquad z${E(z(b))}`);
      return out;
    },
  },

  konfidens: {
    title: '95 %-konfidensinterval',
    intro: r`$x$ ud af $n$ i stikprøven har egenskaben.`,
    fields: [
      { id: 'x', label: 'x', value: '120' },
      { id: 'n', label: 'n', value: '400' },
    ],
    run({ x, n }) {
      if (n <= 0) fail('$n$ skal være positiv.');
      if (x < 0 || x > n) fail('$x$ skal ligge mellem 0 og $n$.');
      const p = x / n;
      const m = 1.96 * Math.sqrt((p * (1 - p)) / n);
      return [
        r`\hat{p}=\frac{x}{n}${E(p)}`,
        r`1{,}96\cdot\sqrt{\frac{\hat{p}\cdot(1-\hat{p})}{n}}${E(m)}`,
        r`\left[${f(Math.max(0, p - m))}\,;\,${f(Math.min(1, p + m))}\right]=\left[${pct(Math.max(0, p - m))}\,;\,${pct(Math.min(1, p + m))}\right]`,
      ];
    },
  },

  statistik: {
    title: 'Statistiske deskriptorer',
    intro: 'Skriv observationerne adskilt af mellemrum eller semikolon. Brug komma som decimaltegn.',
    fields: [{ id: 'data', kind: 'list', text: 'Observationer', value: '2 4 4 5 7 9 10 12' }],
    run({ data }) {
      const xs = data.split(/[\s;]+/).filter(Boolean).map(parseNum);
      if (xs.some((v) => !Number.isFinite(v))) fail('Jeg kan ikke læse alle tallene. Adskil dem med mellemrum eller semikolon.');
      if (xs.length < 2) fail('Skriv mindst to observationer.');
      xs.sort((p, q) => p - q);
      const n = xs.length;
      const sum = xs.reduce((s, v) => s + v, 0);
      const mean = sum / n;
      const half = Math.floor(n / 2);
      const q1 = median(xs.slice(0, half));
      const q3 = median(xs.slice(n - half));
      const ss = xs.reduce((s, v) => s + sq(v - mean), 0);
      const iqr = q3 - q1;
      const outliers = xs.filter((v) => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);
      return [
        r`n=${f(n)}\qquad\sum x_i${E(sum)}\qquad\bar{x}${E(mean)}`,
        r`Q_1${E(q1)}\qquad m${E(median(xs))}\qquad Q_3${E(q3)}`,
        r`x_{\text{min}}=${f(xs[0])}\qquad x_{\text{maks}}=${f(xs[n - 1])}`,
        r`\text{variationsbredde}${E(xs[n - 1] - xs[0])}\qquad\text{kvartilbredde}${E(iqr)}`,
        r`s${E(Math.sqrt(ss / (n - 1)))}\;\text{(stikprøve)}\qquad\sigma${E(Math.sqrt(ss / n))}\;\text{(population)}`,
        outliers.length ? r`\text{outliers: }${outliers.map((v) => f(v)).join(r`,\;`)}` : r`\text{ingen outliers}`,
      ];
    },
  },
};

/* ---------- visning ---------- */

const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/** Bygger beregneren `id` ind i `box` og regner, hver gang et felt ændres. */
export function mountCalc(box, id) {
  const calc = CALCS[id];
  if (!calc) return;
  const out = el('div', { class: 'calc-out', 'aria-live': 'polite' });
  const inputs = {};

  const say = (text) => { out.innerHTML = `<p class="calc-msg">${math(text)}</p>`; };

  function update() {
    const v = {};
    let missing = false;
    let bad = false;
    for (const fd of calc.fields) {
      const input = inputs[fd.id];
      const raw = input.value.trim();
      input.classList.remove('bad');
      if (fd.kind === 'list') {
        v[fd.id] = raw;
        if (!raw) missing = true;
        continue;
      }
      if (!raw) {
        v[fd.id] = NaN;
        if (!fd.optional) missing = true;
        continue;
      }
      v[fd.id] = parseNum(raw);
      if (!Number.isFinite(v[fd.id])) { bad = true; input.classList.add('bad'); }
    }
    if (bad) return say('Jeg kan ikke læse tallet i det markerede felt. Skriv fx 2,5 eller 1/3.');
    if (missing) return say('Udfyld felterne for at se resultatet.');
    try {
      out.innerHTML = calc.run(v)
        .map((line) => (line.startsWith('!') ? `<p class="calc-msg">${math(line.slice(1))}</p>` : tex(line, true)))
        .join('');
    } catch (err) {
      if (!(err instanceof Msg)) throw err;
      say(err.message);
    }
    return undefined;
  }

  const fields = el('div', { class: 'calc-fields' }, calc.fields.map((fd) => {
    const input = el('input', {
      type: 'text',
      inputmode: fd.kind === 'list' || IOS ? 'text' : 'decimal',
      value: fd.value ?? '',
      autocomplete: 'off',
      autocapitalize: 'off',
      spellcheck: 'false',
    });
    input.addEventListener('input', update);
    inputs[fd.id] = input;
    return el('label', { class: `calc-field${fd.kind === 'list' ? ' list' : ''}` },
      el('span', fd.text ? {} : { html: tex(fd.label) }, fd.text ?? null),
      input);
  }));

  box.append(el('div', { class: 'calc' },
    el('div', { class: 'calc-title' }, calc.title),
    calc.intro ? el('p', { class: 'calc-intro', html: math(calc.intro) }) : null,
    fields, out));
  update();
}
