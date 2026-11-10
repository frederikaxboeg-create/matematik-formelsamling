// Formelvisning med KaTeX og små teksthjælpere.

// Egne makroer, som emnefilerne bruger.
const MACROS = {
  '\\vek': '\\begin{pmatrix}#1\\\\#2\\end{pmatrix}',
  '\\vekk': '\\begin{pmatrix}#1\\\\#2\\\\#3\\end{pmatrix}',
  '\\svek': '\\left(\\begin{smallmatrix}#1\\\\#2\\end{smallmatrix}\\right)',
  '\\tv': '\\widehat{\\vec{#1}}',
  '\\dist': '\\operatorname{dist}',
  '\\Dm': '\\operatorname{Dm}',
  '\\Vm': '\\operatorname{Vm}',
};

export const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** TeX → HTML. Kaster en fejl, hvis `strict` er sat (bruges til at validere indholdet). */
export function tex(src, display = false, strict = false) {
  if (window.katex) {
    try {
      return window.katex.renderToString(src, {
        displayMode: display,
        throwOnError: strict,
        strict: 'ignore',
        macros: { ...MACROS },
      });
    } catch (err) {
      if (strict) throw err;
    }
  }
  return `<code>${escapeHtml(src)}</code>`;
}

const MATH = /(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g;

/** Tekst/HTML, hvor $...$ og $$...$$ vises som formler. */
export function math(str, strict = false) {
  return String(str)
    .split(MATH)
    .map((part) => {
      if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) return tex(part.slice(2, -2), true, strict);
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2) return tex(part.slice(1, -1), false, strict);
      return part;
    })
    .join('');
}

/** Ren tekst til søgeindekset: uden HTML-tags og TeX-kommandoer. */
export function plain(str) {
  return String(str ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\text\{([^}]*)\}/g, ' $1 ')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[${}\\^_&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
