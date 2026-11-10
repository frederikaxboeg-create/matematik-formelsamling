// Maple-kommandoer: de vigtigste kommandoer til emnerne i studieplanen.
const r = String.raw;

export default {
  id: 'maple',
  title: 'Maple-kommandoer',
  formula: r`\texttt{solve(f(x) = 0, x)}`,
  desc: 'De vigtigste Maple-kommandoer til ligninger, differential- og integralregning, regression, sandsynlighed og grafer.',
  practice: 'cas',
  practiceLabel: 'Prøv CAS-regnearket i Interaktiv Matematik',
  sections: [
    {
      title: 'Det grundlæggende',
      items: [
        {
          id: 'grundregler',
          name: 'Sådan skriver man i Maple',
          wide: true,
          table: {
            head: ['Skriv', 'Betydning'],
            rows: [
              ['<code>a := 5</code>', 'Tildel en værdi (kolon og lighedstegn)'],
              ['<code>f := x -> x^2 + 3*x</code>', r`Definér funktionen $f(x)=x^2+3x$`],
              ['<code>f(2)</code>', 'Funktionsværdi'],
              ['<code>2*x</code>', 'Gangetegn skal altid skrives'],
              ['<code>3.14</code>', 'Punktum som decimaltegn'],
              ['<code>Pi</code>, <code>exp(1)</code>', r`Konstanterne $\pi$ og $e$`],
              ['<code>sqrt(x)</code>, <code>exp(x)</code>', r`$\sqrt{x}$ og $e^x$`],
              ['<code>ln(x)</code>, <code>log10(x)</code>', r`$\ln(x)$ og titalslogaritmen $\log(x)$`],
              ['<code>evalf(%)</code>', 'Omregn det seneste resultat til decimaltal'],
              ['<code>restart</code>', 'Nulstil alle definitioner'],
              ['<code>with(Gym):</code>', 'Indlæs Gym-pakken (regression, binomialfordeling m.m.)'],
            ],
          },
          kw: 'syntaks tildeling funktion definere decimaltal gym',
        },
        {
          id: 'vinkler',
          name: 'Vinkler',
          maple: ['sin(30*Pi/180)', 'evalf(arcsin(0.5)*180/Pi)'],
          note: r`Maples indbyggede <code>sin</code>, <code>cos</code> og <code>tan</code> regner i radianer. Gang grader med $\frac{\pi}{180}$, før du tager sinus, og gang resultatet af <code>arcsin</code>, <code>arccos</code> og <code>arctan</code> med $\frac{180}{\pi}$ for at få grader.`,
          kw: 'radianer grader sinus arcsin',
        },
      ],
    },
    {
      title: 'Ligninger og algebra',
      items: [
        {
          id: 'solve',
          name: 'Løs ligninger',
          maple: ['solve(x^2 - 5*x + 6 = 0, x)', 'fsolve(exp(x) = 3*x, x = 0 .. 1)', 'solve({x + y = 5, x - y = 1}, {x, y})'],
          note: '<code>solve</code> løser eksakt, og <code>fsolve</code> løser numerisk – evt. i et interval. Det sidste eksempel er to ligninger med to ubekendte.',
          kw: 'solve fsolve ligningsløsning ligningssystem',
        },
        {
          id: 'algebra',
          name: 'Omskriv udtryk',
          maple: ['expand((a + b)^2)', 'factor(x^2 - 9)', 'simplify((x^2 - 1)/(x - 1))', 'eval(x^2 + 1, x = 3)'],
          note: '<code>expand</code> ganger parenteser ud, <code>factor</code> faktoriserer, <code>simplify</code> reducerer, og <code>eval</code> indsætter en værdi.',
          kw: 'expand factor simplify reducere faktorisere indsætte',
        },
      ],
    },
    {
      title: 'Differential- og integralregning',
      items: [
        {
          id: 'diff',
          name: 'Differentiér',
          maple: ['f := x -> x^3 - 3*x:', 'diff(f(x), x)', 'D(f)(2)', 'solve(D(f)(x) = 0, x)', 'diff(f(x), x, x)'],
          note: r`<code>diff</code> giver den afledede funktion, <code>D(f)(2)</code> giver $f'(2)$, og <code>diff(f(x), x, x)</code> giver $f''(x)$. I 2D-matematik kan man også skrive <code>f'(x)</code>.`,
          kw: 'diff differentiere afledet tangent',
        },
        {
          id: 'limit',
          name: 'Grænseværdi',
          maple: 'limit((x^2 - 4)/(x - 2), x = 2)',
          kw: 'limit grænseværdi',
        },
        {
          id: 'int',
          name: 'Integrér',
          maple: ['int(x^2, x)', 'int(x^2, x = 0 .. 3)', 'Pi*int(sqrt(x)^2, x = 0 .. 4)'],
          note: 'Uden grænser fås en stamfunktion (Maple skriver ikke konstanten), og med grænser fås det bestemte integral. Det sidste eksempel er et omdrejningslegeme.',
          kw: 'int integrere stamfunktion bestemt integral areal',
        },
        {
          id: 'dsolve',
          name: 'Løs differentialligninger',
          maple: ['dsolve(diff(y(x), x) = k*y(x), y(x))', 'dsolve({diff(y(x), x) = 6 - 2*y(x), y(0) = 1}, y(x))'],
          note: 'Den første giver den fuldstændige løsning, og den anden giver løsningen gennem et bestemt punkt.',
          kw: 'dsolve differentialligning',
        },
      ],
    },
    {
      title: 'Grafer',
      items: [
        {
          id: 'plot',
          name: 'Tegn grafer',
          maple: ['plot(x^2 - 3, x = -4 .. 4)', 'plot([sin(x), cos(x)], x = 0 .. 2*Pi)'],
          note: 'Flere funktioner tegnes i samme koordinatsystem ved at sætte dem i en liste.',
          kw: 'plot graf tegne',
        },
      ],
    },
    {
      title: 'Regression og statistik',
      items: [
        {
          id: 'regression',
          name: 'Regression (Gym-pakken)',
          maple: ['with(Gym):', 'X := [1, 2, 3, 4, 5]:', 'Y := [2.1, 3.9, 6.2, 7.8, 10.1]:', 'LinReg(X, Y)', 'ExpReg(X, Y)', 'PowReg(X, Y)', 'KvadReg(X, Y)', 'PolyReg(X, Y, 3)', 'PropReg(X, Y)', 'reg_koeff', 'residualer(X, Y, LinReg)'],
          note: 'Lineær, eksponentiel, potens-, andengrads-, polynomiel og proportional regression samt koefficienter og residualer. Se <a href="#/regression/maple-regression">Vækstmodeller og regression</a>.',
          kw: 'linreg expreg powreg kvadreg polyreg propreg residualer',
        },
        {
          id: 'binomial',
          name: 'Binomialfordelingen (Gym-pakken)',
          maple: ['binpdf(10, 0.3, 4)', 'bincdf(10, 0.3, 4)', '1 - bincdf(10, 0.3, 4)'],
          note: r`<code>binpdf(n, p, r)</code> giver $P(X=r)$, og <code>bincdf(n, p, r)</code> giver $P(X\leq r)$. Det sidste eksempel er $P(X\geq 5)$.`,
          kw: 'binpdf bincdf binomialfordeling',
        },
        {
          id: 'kombinatorik',
          name: 'Kombinatorik',
          maple: ['5!', 'binomial(5, 2)', '8!/(8 - 3)!'],
          note: r`Fakultet, kombinationer $K(5,2)$ og permutationer $P(8,3)$.`,
          kw: 'fakultet binomial kombinationer permutationer',
        },
        {
          id: 'normal',
          name: 'Normalfordelingen (Statistics-pakken)',
          maple: ['with(Statistics):', 'X := RandomVariable(Normal(100, 15)):', 'CDF(X, 130.0)', 'Quantile(X, 0.975)'],
          note: r`<code>CDF(X, x)</code> giver $P(X\leq x)$, og <code>Quantile</code> giver fraktilen. Skriv tallet med decimalpunktum for at få et decimaltal.`,
          kw: 'normalfordeling cdf quantile',
        },
        {
          id: 'vektorer',
          name: 'Vektorer',
          maple: ['with(LinearAlgebra):', 'a := <3, 4>:', 'b := <2, -1>:', 'a . b', 'Norm(a, 2)', 'CrossProduct(<1, 2, 3>, <4, 5, 6>)'],
          note: 'Skalarprodukt, længde og vektorprodukt med Maples indbyggede LinearAlgebra-pakke.',
          kw: 'vektor skalarprodukt krydsprodukt længde',
        },
      ],
    },
  ],
};
