// Normalfordelingen.
const r = String.raw;

export default {
  id: 'normalfordeling',
  title: 'Normalfordelingen',
  formula: r`Z=\frac{X-\mu}{\sigma}`,
  desc: 'Tæthedsfunktion, sandsynligheder som arealer, standardisering, 68–95–99,7-reglen og normale og exceptionelle udfald.',
  practice: 'normalfordeling',
  sections: [
    {
      title: 'Normalfordelt stokastisk variabel',
      items: [
        {
          id: 'fordeling',
          name: 'Normalfordelingen',
          tex: r`X\sim N(\mu,\sigma)`,
          note: r`$X$ er normalfordelt med middelværdien $\mu$ og spredningen $\sigma$. Fordelingen er symmetrisk omkring $\mu$, så middelværdi og median er ens.`,
          kw: 'normalfordelt middelværdi spredning klokkeformet',
        },
        {
          id: 'taethed',
          name: 'Tæthedsfunktion',
          tex: r`f(x)=\frac{1}{\sqrt{2\pi}\cdot\sigma}\cdot e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}`,
          note: r`Grafen er klokkeformet med toppunkt i $x=\mu$ og vendepunkter i $x=\mu\pm\sigma$. Det samlede areal under grafen er 1. Større $\sigma$ giver en bredere og lavere klokke.`,
          kw: 'tæthedsfunktion frekvensfunktion klokkekurve',
        },
        {
          id: 'sandsynlighed',
          name: 'Sandsynlighed som areal',
          tex: r`P(a\leq X\leq b)=\int_a^b f(x)\,dx`,
          note: r`Sandsynligheden er arealet under tæthedsfunktionen mellem $a$ og $b$. Sandsynligheden for én bestemt værdi er 0, så $P(X\leq a)=P(X<a)$.`,
          calc: 'normal',
          kw: 'areal under graf interval',
        },
        {
          id: 'fordelingsfunktion',
          name: 'Fordelingsfunktion',
          tex: r`F(x)=P(X\leq x)\qquad P(a\leq X\leq b)=F(b)-F(a)\qquad P(X>x)=1-F(x)`,
          note: r`Fordelingsfunktionen er arealet under tæthedsfunktionen til venstre for $x$. $F(\mu)=0{,}5$.`,
          ex: r`$X\sim N(100,15)$: $\;P(85\leq X\leq 115)\approx 0{,}683$ og $P(X\leq 130)\approx 0{,}977$`,
          calc: 'normal',
          maple: ['with(Statistics):', 'X := RandomVariable(Normal(100, 15)):', 'CDF(X, 130.0)', 'CDF(X, 115.0) - CDF(X, 85.0)'],
          kw: 'kumuleret fordelingsfunktion',
        },
      ],
    },
    {
      title: 'Standardnormalfordelingen',
      items: [
        {
          id: 'standard',
          name: 'Standardnormalfordelingen',
          tex: r`Z\sim N(0,1)\qquad\varphi(x)=\frac{1}{\sqrt{2\pi}}\cdot e^{-\frac{1}{2}x^2}`,
          note: r`Normalfordelingen med $\mu=0$ og $\sigma=1$. Dens fordelingsfunktion kaldes $\Phi$, og $\Phi(-z)=1-\Phi(z)$.`,
          kw: 'standardnormalfordeling phi',
        },
        {
          id: 'standardisering',
          name: 'Standardisering',
          tex: r`Z=\frac{X-\mu}{\sigma}\qquad P(X\leq x)=\Phi\!\left(\frac{x-\mu}{\sigma}\right)`,
          note: r`$z$-værdien fortæller, hvor mange spredninger $x$ ligger fra middelværdien.`,
          ex: r`$X\sim N(100,15)$ og $x=130$: $\;z=\frac{130-100}{15}=2$, så $P(X\leq 130)=\Phi(2)\approx 0{,}977$.`,
          calc: 'normal',
          kw: 'z-værdi z-score standardiseret',
        },
      ],
    },
    {
      title: 'Typiske sandsynligheder',
      items: [
        {
          id: 'regel',
          name: '68–95–99,7-reglen',
          rows: [
            ['Inden for én spredning', r`P(\mu-\sigma\leq X\leq\mu+\sigma)\approx 68{,}3\,\%`],
            ['Inden for to spredninger', r`P(\mu-2\sigma\leq X\leq\mu+2\sigma)\approx 95{,}4\,\%`],
            ['Inden for tre spredninger', r`P(\mu-3\sigma\leq X\leq\mu+3\sigma)\approx 99{,}7\,\%`],
          ],
          kw: 'empirisk regel 68 95 99',
        },
        {
          id: 'normale',
          name: 'Normale og exceptionelle udfald',
          rows: [
            ['Normale udfald', r`\mu-2\sigma\leq x\leq\mu+2\sigma`],
            ['Exceptionelle udfald', r`x<\mu-3\sigma\quad\lor\quad x>\mu+3\sigma`],
          ],
          note: r`Ca. $95\,\%$ af sandsynligheden ligger på de normale udfald, og kun ca. $0{,}3\,\%$ på de exceptionelle.`,
          kw: 'normale udfald exceptionelle udfald',
        },
        {
          id: 'fraktiler',
          name: 'Vigtige fraktiler',
          rows: [
            ['De midterste 95 %', r`\mu-1{,}96\cdot\sigma\leq x\leq\mu+1{,}96\cdot\sigma`],
            ['De midterste 90 %', r`\mu-1{,}645\cdot\sigma\leq x\leq\mu+1{,}645\cdot\sigma`],
            ['De midterste 50 % (kvartilerne)', r`\mu-0{,}674\cdot\sigma\leq x\leq\mu+0{,}674\cdot\sigma`],
          ],
          maple: ['with(Statistics):', 'X := RandomVariable(Normal(100, 15)):', 'Quantile(X, 0.975)'],
          kw: 'fraktil 1,96 percentil',
        },
        {
          id: 'binomial-approx',
          name: 'Normalfordelingen som tilnærmelse til binomialfordelingen',
          extra: true,
          tex: r`\operatorname{Bin}(n,p)\approx N\!\left(n\cdot p,\;\sqrt{n\cdot p\cdot(1-p)}\right)`,
          note: r`Tilnærmelsen er god, når $n$ er stor, og $p$ ikke ligger for tæt på 0 eller 1.`,
          kw: 'approksimation',
        },
      ],
    },
  ],
};
