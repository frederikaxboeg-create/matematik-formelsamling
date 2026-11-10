// Differentialregning.
const r = String.raw;

export default {
  id: 'differential',
  title: 'Differentialregning',
  formula: r`(f\cdot g)'=f'\cdot g+f\cdot g'`,
  desc: 'Grænseværdi, differentialkvotient, afledede funktioner, regneregler, tangentligning, monotoniforhold, optimering og Newtons metode.',
  practice: 'differential',
  sections: [
    {
      title: 'Grænseværdi og differentialkvotient',
      items: [
        {
          id: 'graensevaerdi',
          name: 'Grænseværdi og kontinuitet',
          tex: r`\lim_{x\to x_0}f(x)=f(x_0)`,
          note: r`$\lim_{x\to x_0}f(x)$ er det tal, $f(x)$ nærmer sig, når $x$ nærmer sig $x_0$. Funktionen er <b>kontinuert</b> i $x_0$, når grænseværdien er lig med funktionsværdien – grafen hænger sammen. En differentiabel funktion er altid kontinuert.`,
          maple: 'limit((x^2 - 4)/(x - 2), x = 2)',
          kw: 'limes grænseværdi kontinuert kontinuitet',
        },
        {
          id: 'differenskvotient',
          name: 'Differenskvotient (sekantens hældning)',
          tex: r`a_s=\frac{\Delta y}{\Delta x}=\frac{f(x_0+h)-f(x_0)}{h}`,
          note: r`Hældningen af sekanten gennem $\big(x_0,f(x_0)\big)$ og $\big(x_0+h,f(x_0+h)\big)$ – den gennemsnitlige væksthastighed i intervallet.`,
          kw: 'sekant sekanthældning gennemsnitlig væksthastighed',
        },
        {
          id: 'differentialkvotient',
          name: 'Differentialkvotient',
          tex: r`f'(x_0)=\lim_{h\to 0}\frac{f(x_0+h)-f(x_0)}{h}`,
          note: r`$f'(x_0)$ er tangentens hældning i punktet $\big(x_0,f(x_0)\big)$ og funktionens væksthastighed i $x_0$. Skrives også $\frac{dy}{dx}$ eller $\frac{d}{dx}f(x)$.`,
          kw: 'tangenthældning væksthastighed afledet definition',
        },
        {
          id: 'tretrinsreglen',
          name: 'Tretrinsreglen',
          rows: [
            ['1. Funktionstilvæksten', r`\Delta y=f(x_0+h)-f(x_0)`],
            ['2. Differenskvotienten', r`\frac{\Delta y}{h}=\frac{f(x_0+h)-f(x_0)}{h}`],
            ['3. Grænseværdien', r`\frac{\Delta y}{h}\to f'(x_0)\;\text{ for }\;h\to 0`],
          ],
          ex: r`$f(x)=x^2$: $\;\Delta y=(x_0+h)^2-x_0^2=2x_0h+h^2$, så $\frac{\Delta y}{h}=2x_0+h\to 2x_0$ for $h\to 0$. Altså er $\left(x^2\right)'=2x$.`,
          kw: 'bevis udledning tre trin',
        },
      ],
    },
    {
      title: 'Afledede funktioner',
      items: [
        {
          id: 'tabel',
          name: 'Afledede af de elementære funktioner',
          wide: true,
          table: {
            head: [r`$f(x)$`, r`$f'(x)$`, r`$f(x)$`, r`$f'(x)$`],
            rows: [
              [r`$k$ (konstant)`, r`$0$`, r`$e^x$`, r`$e^x$`],
              [r`$x$`, r`$1$`, r`$e^{kx}$`, r`$k\cdot e^{kx}$`],
              [r`$ax+b$`, r`$a$`, r`$a^x$`, r`$a^x\cdot\ln(a)$`],
              [r`$x^2$`, r`$2x$`, r`$\ln(x)$`, r`$\dfrac{1}{x}$`],
              [r`$x^n$`, r`$n\cdot x^{n-1}$`, r`$\log(x)$`, r`$\dfrac{1}{x\cdot\ln(10)}$`],
              [r`$\dfrac{1}{x}$`, r`$-\dfrac{1}{x^2}$`, r`$\sin(x)$`, r`$\cos(x)$`],
              [r`$\sqrt{x}$`, r`$\dfrac{1}{2\sqrt{x}}$`, r`$\cos(x)$`, r`$-\sin(x)$`],
              [r`$\dfrac{1}{x^n}$`, r`$-\dfrac{n}{x^{n+1}}$`, r`$\tan(x)$`, r`$1+\tan^2(x)$`],
            ],
          },
          note: r`$\frac{1}{x}=x^{-1}$ og $\sqrt{x}=x^{\frac{1}{2}}$ kan også differentieres med reglen for $x^n$.`,
          maple: 'diff(x^3 - 2*x, x)',
          kw: 'differentiere afledt tabel differentialkvotienter potensreglen',
        },
      ],
    },
    {
      title: 'Regneregler',
      items: [
        {
          id: 'sum',
          name: 'Sum, differens og konstant faktor',
          rows: [
            ['Sum', r`\big(f(x)+g(x)\big)'=f'(x)+g'(x)`],
            ['Differens', r`\big(f(x)-g(x)\big)'=f'(x)-g'(x)`],
            ['Konstant gange funktion', r`\big(k\cdot f(x)\big)'=k\cdot f'(x)`],
          ],
          note: 'Man differentierer led for led, og konstante faktorer bliver stående.',
          ex: r`$f(x)=3x^4-5x^2+7x-2$ giver $f'(x)=12x^3-10x+7$.`,
          kw: 'sumreglen ledvis differentiation',
        },
        {
          id: 'produkt',
          name: 'Produktreglen',
          tex: r`\big(f(x)\cdot g(x)\big)'=f'(x)\cdot g(x)+f(x)\cdot g'(x)`,
          note: 'Den første differentieret gange den anden, plus den første gange den anden differentieret.',
          ex: r`$h(x)=x^2\cdot e^x$ giver $h'(x)=2x\cdot e^x+x^2\cdot e^x$.`,
          kw: 'produktregel produktregnereglen gange',
        },
        {
          id: 'kaede',
          name: 'Kædereglen (sammensat funktion)',
          tex: r`\Big(f\big(g(x)\big)\Big)'=f'\big(g(x)\big)\cdot g'(x)`,
          note: 'Den ydre funktion differentieret (med den indre uændret indeni) gange den indre funktion differentieret.',
          ex: r`$h(x)=(3x+1)^4$ giver $h'(x)=4(3x+1)^3\cdot 3=12(3x+1)^3$. $\;\;k(x)=e^{x^2}$ giver $k'(x)=e^{x^2}\cdot 2x$.`,
          kw: 'kæderegel sammensat funktion indre ydre',
        },
        {
          id: 'kaede-lineaer',
          name: 'Kædereglen med lineær indre funktion',
          tex: r`\big(f(ax+b)\big)'=a\cdot f'(ax+b)`,
          ex: r`$\big(\sin(2x)\big)'=2\cos(2x)$ og $\;\big(e^{-0{,}5x}\big)'=-0{,}5\cdot e^{-0{,}5x}$`,
        },
        {
          id: 'kvotient',
          name: 'Kvotientreglen',
          extra: true,
          tex: r`\left(\frac{f(x)}{g(x)}\right)'=\frac{f'(x)\cdot g(x)-f(x)\cdot g'(x)}{g(x)^2}`,
          note: 'Kan også klares med produkt- og kædereglen.',
          kw: 'brøkreglen division',
        },
      ],
    },
    {
      title: 'Tangent',
      items: [
        {
          id: 'tangent',
          name: 'Tangentens ligning',
          tex: r`y=f'(x_0)\cdot(x-x_0)+f(x_0)`,
          note: r`Tangenten rører grafen i punktet $\big(x_0,f(x_0)\big)$ og har hældningen $f'(x_0)$.`,
          ex: r`$f(x)=x^2$ i $x_0=3$: $\;f(3)=9$ og $f'(3)=6$, så $y=6(x-3)+9=6x-9$.`,
          maple: ['f := x -> x^2:', "y = D(f)(3)*(x - 3) + f(3)"],
          kw: 'tangentligning røringspunkt',
        },
        {
          id: 'tangent-haeldning',
          name: 'Tangent med en bestemt hældning',
          tex: r`f'(x_0)=a`,
          note: r`Løs ligningen for at finde røringspunktets $x_0$, når tangentens hældning $a$ er kendt. Vandret tangent: $f'(x_0)=0$.`,
          kw: 'vandret tangent parallel',
        },
        {
          id: 'lineaer-approx',
          name: 'Tilnærmelse med tangenten',
          extra: true,
          tex: r`f(x_0+h)\approx f(x_0)+f'(x_0)\cdot h`,
          note: r`Gælder for små $h$.`,
          kw: 'lineær approksimation',
        },
      ],
    },
    {
      title: 'Monotoniforhold og ekstrema',
      items: [
        {
          id: 'monotoni',
          name: 'Monotonisætningen',
          rows: [
            ['f er voksende i intervallet', r`f'(x)>0`],
            ['f er aftagende i intervallet', r`f'(x)<0`],
            ['f er konstant i intervallet', r`f'(x)=0`],
          ],
          kw: 'voksende aftagende fortegn monotoniforhold',
        },
        {
          id: 'ekstrema',
          name: 'Ekstrema',
          rows: [
            ['Mulige ekstremumssteder', r`f'(x_0)=0`],
            ['Lokalt maksimum', r`f'\text{ skifter fortegn: }+\;0\;-`],
            ['Lokalt minimum', r`f'\text{ skifter fortegn: }-\;0\;+`],
            ['Vandret vendetangent', r`f'\text{ skifter ikke fortegn}`],
          ],
          note: r`Fremgangsmåde: 1) find $f'(x)$, 2) løs $f'(x)=0$, 3) bestem fortegnet for $f'$ mellem nulpunkterne (fortegnslinje), 4) konkludér om monotoniforhold og ekstrema.`,
          ex: r`$f(x)=x^3-3x$: $\;f'(x)=3x^2-3=0\;\Leftrightarrow\;x=\pm 1$. Fortegn for $f'$: $+\;0\;-\;0\;+$. Lokalt maksimum $f(-1)=2$ og lokalt minimum $f(1)=-2$.`,
          maple: ['f := x -> x^3 - 3*x:', "solve(D(f)(x) = 0, x)"],
          kw: 'ekstremum maksimum minimum fortegnslinje monotonilinje',
        },
        {
          id: 'anden-afledede',
          name: 'Den anden afledede',
          extra: true,
          rows: [
            ['Lokalt minimum', r`f'(x_0)=0\;\text{ og }\;f''(x_0)>0`],
            ['Lokalt maksimum', r`f'(x_0)=0\;\text{ og }\;f''(x_0)<0`],
            ['Grafen krummer opad (konveks)', r`f''(x)>0`],
            ['Grafen krummer nedad (konkav)', r`f''(x)<0`],
          ],
          note: r`$f''$ er den afledede af $f'$. Et vendepunkt er et sted, hvor $f''$ skifter fortegn.`,
          maple: 'diff(f(x), x, x)',
          kw: 'krumning vendepunkt vendetangent dobbeltafledet',
        },
        {
          id: 'optimering',
          name: 'Optimering',
          note: r`<b>1)</b> Opstil en funktion $f(x)$ for den størrelse, der skal være størst eller mindst, og angiv definitionsmængden. Brug en bibetingelse til at fjerne en ekstra variabel. <b>2)</b> Løs $f'(x)=0$. <b>3)</b> Vis med fortegnet for $f'$ (eller med $f''$), at det er et maksimum eller minimum, og tjek intervallets endepunkter. <b>4)</b> Beregn den optimale værdi, og svar på spørgsmålet.`,
          ex: r`Et rektangel med omkredsen $20$: $\;A(x)=x\cdot(10-x)=10x-x^2$ og $A'(x)=10-2x=0\;\Leftrightarrow\;x=5$. Det største areal er $A(5)=25$.`,
          kw: 'optimering størst mindst maksimere minimere bibetingelse',
        },
      ],
    },
    {
      title: 'Væksthastighed og Newtons metode',
      items: [
        {
          id: 'vaeksthastighed',
          name: 'Væksthastighed',
          tex: r`f'(x_0)=\text{væksthastigheden i } x_0`,
          note: r`Enheden er $y$-enhed pr. $x$-enhed. Hvis $s(t)$ er en strækning som funktion af tiden, er $s'(t)$ hastigheden og $s''(t)$ accelerationen.`,
          ex: r`$N(t)=200\cdot 1{,}05^t$ giver $N'(t)=200\cdot 1{,}05^t\cdot\ln(1{,}05)$, så $N'(10)\approx 15{,}9$ pr. tidsenhed.`,
          kw: 'hastighed acceleration fortolkning',
        },
        {
          id: 'newton',
          name: 'Newtons metode',
          tex: r`x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}`,
          note: r`Numerisk bestemmelse af et nulpunkt for $f$. Start med et gæt $x_0$ tæt på nulpunktet, og gentag, indtil decimalerne ikke ændrer sig. Hvert trin følger tangenten ned til $x$-aksen.`,
          ex: r`$f(x)=x^2-2$ med $x_0=1$: $\;x_1=1-\frac{-1}{2}=1{,}5$, $\;x_2=1{,}5-\frac{0{,}25}{3}\approx 1{,}4167$, $\;x_3\approx 1{,}4142$.`,
          maple: 'fsolve(x^2 - 2 = 0, x = 1 .. 2)',
          kw: 'newton raphson numerisk nulpunkt iteration',
        },
      ],
    },
  ],
};
