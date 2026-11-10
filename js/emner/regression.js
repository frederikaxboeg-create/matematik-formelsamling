// Vækstmodeller og regression (inkl. Maple-kommandoerne fra studieplanen).
const r = String.raw;

export default {
  id: 'regression',
  title: 'Vækstmodeller og regression',
  formula: r`r_i=y_i-f(x_i)`,
  desc: 'Sammenligning af lineær, eksponentiel og potensvækst, regression, residualer, forklaringsgrad og regression i Maple.',
  practice: 'regression',
  sections: [
    {
      title: 'De tre vækstmodeller',
      items: [
        {
          id: 'sammenligning',
          name: 'Lineær, eksponentiel og potensvækst',
          wide: true,
          table: {
            head: ['', 'Lineær', 'Eksponentiel', 'Potens'],
            rows: [
              ['Forskrift', r`$y=ax+b$`, r`$y=b\cdot a^x$`, r`$y=b\cdot x^a$`],
              ['Vækst', r`$x$ vokser med 1 $\Rightarrow$ $y$ vokser med $a$`, r`$x$ vokser med 1 $\Rightarrow$ $y$ ganges med $a$`, r`$x$ ganges med $k$ $\Rightarrow$ $y$ ganges med $k^a$`],
              ['Type', 'absolut → absolut', 'absolut → procentvis', 'procentvis → procentvis'],
              ['Topunktsformel', r`$a=\frac{y_2-y_1}{x_2-x_1}$`, r`$a=\sqrt[x_2-x_1]{\frac{y_2}{y_1}}$`, r`$a=\frac{\log(y_2/y_1)}{\log(x_2/x_1)}$`],
              ['Begyndelsesværdi', r`$b=y_1-a\cdot x_1$`, r`$b=\frac{y_1}{a^{x_1}}$`, r`$b=\frac{y_1}{x_1^{\,a}}$`],
              ['Ret linje i', 'almindeligt koordinatsystem', 'enkeltlogaritmisk koordinatsystem', 'dobbeltlogaritmisk koordinatsystem'],
              ['Regression i Maple', '<code>LinReg(X, Y)</code>', '<code>ExpReg(X, Y)</code>', '<code>PowReg(X, Y)</code>'],
            ],
          },
          kw: 'vækstmodeller sammenligning lineær eksponentiel potens',
        },
      ],
    },
    {
      title: 'Regression',
      items: [
        {
          id: 'mindste-kvadrater',
          name: 'Mindste kvadraters metode',
          tex: r`\sum_{i=1}^{n}\big(y_i-f(x_i)\big)^2\;\text{ skal være mindst mulig}`,
          note: 'Regression finder den model af en bestemt type, der passer bedst til datapunkterne: den, der gør summen af de kvadrerede residualer mindst.',
          kw: 'bedste rette linje tendenslinje',
        },
        {
          id: 'residual',
          name: 'Residual',
          tex: r`r_i=y_i-f(x_i)`,
          note: r`Residualet er den observerede værdi minus modellens værdi. I et <b>residualplot</b> afsættes punkterne $(x_i,r_i)$. Ligger de tilfældigt spredt omkring $x$-aksen, beskriver modellen data godt. Viser de et mønster (fx en bue), er modeltypen forkert.`,
          ex: r`Modellen $f(x)=2x+1$ og datapunktet $(3;7{,}4)$: $\;r=7{,}4-f(3)=7{,}4-7=0{,}4$`,
          kw: 'residualer residualplot afvigelse',
        },
        {
          id: 'forklaringsgrad',
          name: 'Forklaringsgrad',
          tex: r`r^2=1-\frac{\sum\big(y_i-f(x_i)\big)^2}{\sum\big(y_i-\bar{y}\big)^2}`,
          note: r`$0\leq r^2\leq 1$. Jo tættere $r^2$ er på 1, jo bedre følger punkterne modellen. Forklaringsgraden kan ikke stå alene – se også på residualplottet.`,
          kw: 'r2 determinationskoefficient korrelation',
        },
        {
          id: 'linreg-formler',
          name: 'Koefficienterne i lineær regression',
          extra: true,
          tex: r`a=\frac{\sum(x_i-\bar{x})\cdot(y_i-\bar{y})}{\sum(x_i-\bar{x})^2}\qquad b=\bar{y}-a\cdot\bar{x}`,
          note: r`Den bedste rette linje går altid gennem punktet $(\bar{x},\bar{y})$.`,
        },
        {
          id: 'modellering',
          name: 'Brug af modellen',
          note: r`<b>Interpolation</b> er at bruge modellen inden for dataområdet, og <b>ekstrapolation</b> er at bruge den uden for – det er mere usikkert. Husk at fortolke $a$ og $b$ i sammenhængen og at angive modellens gyldighedsområde.`,
          kw: 'interpolation ekstrapolation gyldighedsområde fortolkning',
        },
      ],
    },
    {
      title: 'Regression i Maple',
      items: [
        {
          id: 'maple-data',
          name: 'Indtast data',
          wide: true,
          maple: ['with(Gym):', 'X := [1, 2, 3, 4, 5]:', 'Y := [2.1, 3.9, 6.2, 7.8, 10.1]:'],
          note: 'Skriv de to dataserier som lister med kantede parenteser, og husk punktum som decimaltegn i Maple.',
          kw: 'gym pakke lister',
        },
        {
          id: 'maple-regression',
          name: 'Regressionskommandoer',
          wide: true,
          table: {
            head: ['Kommando', 'Model'],
            rows: [
              ['<code>LinReg(X, Y)</code>', r`Lineær: $y=ax+b$`],
              ['<code>ExpReg(X, Y)</code>', r`Eksponentiel: $y=b\cdot a^x$`],
              ['<code>PowReg(X, Y)</code>', r`Potens: $y=b\cdot x^a$`],
              ['<code>KvadReg(X, Y)</code>', r`Andengradspolynomium: $y=ax^2+bx+c$`],
              ['<code>PolyReg(X, Y, 3)</code>', 'Polynomium af grad 3 (det sidste tal er graden)'],
              ['<code>PropReg(X, Y)</code>', r`Proportionalitet: $y=a\cdot x$`],
              ['<code>reg_koeff</code>', 'Koefficienterne fra den seneste regression'],
              ['<code>residualer(X, Y, LinReg)</code>', 'Residualerne for den valgte model'],
            ],
          },
          note: 'Kommandoerne er dem, der står i studieplanen, og de kræver Gym-pakken.',
          kw: 'linreg expreg powreg kvadreg polyreg propreg residualer',
        },
      ],
    },
  ],
};
