// Analytisk plangeometri: punkter, linjer og cirkler i koordinatsystemet.
const r = String.raw;

export default {
  id: 'plangeometri',
  title: 'Analytisk plangeometri',
  formula: r`(x-a)^2+(y-b)^2=r^2`,
  desc: 'Afstande og midtpunkter, linjens ligning, hældningsvinkel, ortogonale linjer, afstand fra punkt til linje samt cirklens ligning og tangenter.',
  practice: 'cirklen',
  sections: [
    {
      title: 'Punkter',
      items: [
        {
          id: 'afstand-punkter',
          name: 'Afstand mellem to punkter',
          tex: r`|AB|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}`,
          note: r`For punkterne $A(x_1,y_1)$ og $B(x_2,y_2)$.`,
          ex: r`$A(1;2)$ og $B(4;6)$: $\;|AB|=\sqrt{3^2+4^2}=5$`,
          calc: 'afstand-punkter',
          kw: 'afstandsformlen længde linjestykke',
        },
        {
          id: 'midtpunkt',
          name: 'Midtpunkt af et linjestykke',
          tex: r`M=\left(\frac{x_1+x_2}{2},\;\frac{y_1+y_2}{2}\right)`,
          ex: r`$A(1;2)$ og $B(4;6)$: $\;M=(2{,}5\,;4)$`,
        },
      ],
    },
    {
      title: 'Linjer',
      items: [
        {
          id: 'linjens-ligning',
          name: 'Linjens ligning',
          rows: [
            ['Med hældning og skæring', r`y=a x+b`],
            ['Gennem et punkt med kendt hældning', r`y=a\cdot(x-x_1)+y_1`],
            ['Med normalvektor', r`a x+b y+c=0`],
            ['Lodret linje', r`x=k`],
          ],
          note: r`I $y=ax+b$ er $a$ hældningskoefficienten, og $b$ er skæringen med $y$-aksen. I $ax+by+c=0$ er $\vec{n}=\svek{a}{b}$ en normalvektor til linjen, og hældningen er $-\frac{a}{b}$, når $b\neq 0$.`,
          kw: 'ret linje hældningskoefficient normalvektor',
        },
        {
          id: 'haeldning',
          name: 'Hældningskoefficient ud fra to punkter',
          tex: r`a=\frac{y_2-y_1}{x_2-x_1}`,
          ex: r`$(2;3)$ og $(6;11)$: $\;a=\frac{11-3}{6-2}=2$`,
          calc: 'topunkt-lin',
          kw: 'hældningstal stigningstal',
        },
        {
          id: 'haeldningsvinkel',
          name: 'Hældningsvinkel',
          tex: r`\tan(v)=a\quad\Leftrightarrow\quad v=\tan^{-1}(a)`,
          note: r`$v$ er vinklen fra $x$-aksen til linjen, regnet med fortegn ($-90^\circ<v<90^\circ$).`,
          ex: r`$a=2$: $\;v=\tan^{-1}(2)\approx 63{,}43^\circ$`,
        },
        {
          id: 'parallelle-ortogonale',
          name: 'Parallelle og ortogonale linjer',
          rows: [
            ['Parallelle linjer', r`a_1=a_2`],
            ['Ortogonale (vinkelrette) linjer', r`a_1\cdot a_2=-1`],
          ],
          ex: r`Linjen vinkelret på $y=2x+1$ har hældningen $-\frac{1}{2}$.`,
          kw: 'vinkelret ortogonal parallel',
        },
        {
          id: 'skaering-linjer',
          name: 'Skæringspunkt mellem to linjer',
          tex: r`a_1x+b_1=a_2x+b_2\quad\Rightarrow\quad x=\frac{b_2-b_1}{a_1-a_2}`,
          note: r`Indsæt $x$ i en af ligningerne for at finde $y$. Er $a_1=a_2$, er linjerne parallelle.`,
          ex: r`$y=2x+1$ og $y=-x+7$: $\;x=\frac{7-1}{2-(-1)}=2$ og $y=5$.`,
        },
        {
          id: 'vinkel-linjer',
          name: 'Vinkel mellem to linjer',
          tex: r`v=|v_1-v_2|`,
          note: r`$v_1$ og $v_2$ er linjernes hældningsvinkler. Er resultatet over $90^\circ$, er den spidse vinkel $180^\circ-v$.`,
        },
        {
          id: 'dist-punkt-linje',
          name: 'Afstand fra punkt til linje',
          tex: [
            r`\dist(P,l)=\frac{|a x_1+b y_1+c|}{\sqrt{a^2+b^2}}\qquad l:\;a x+b y+c=0`,
            r`\dist(P,l)=\frac{|a x_1+b-y_1|}{\sqrt{a^2+1}}\qquad l:\;y=a x+b`,
          ],
          note: r`For punktet $P(x_1,y_1)$. Afstanden måles vinkelret på linjen.`,
          ex: r`$P(3;4)$ og $l:\;3x+4y-5=0$: $\;\dist(P,l)=\frac{|9+16-5|}{\sqrt{9+16}}=\frac{20}{5}=4$`,
          calc: 'dist-linje',
          kw: 'distanceformlen dist punkt linje',
        },
      ],
    },
    {
      title: 'Cirklen',
      items: [
        {
          id: 'cirklens-ligning',
          name: 'Cirklens ligning',
          tex: r`(x-a)^2+(y-b)^2=r^2`,
          note: r`Centrum er $C(a,b)$, og radius er $r$.`,
          ex: r`$(x-2)^2+(y+1)^2=9$ har centrum $(2;-1)$ og radius $3$.`,
          kw: 'cirkel centrum radius',
        },
        {
          id: 'kvadratkomplettering',
          name: 'Centrum og radius ved kvadratkomplettering',
          tex: [
            r`x^2+p x=\left(x+\frac{p}{2}\right)^2-\left(\frac{p}{2}\right)^2`,
            r`x^2+y^2+d x+e y+f=0\quad\Rightarrow\quad C\!\left(-\frac{d}{2},\,-\frac{e}{2}\right),\quad r=\sqrt{\frac{d^2}{4}+\frac{e^2}{4}-f}`,
          ],
          note: 'Hvis tallet under kvadratroden er negativt, er der ingen cirkel.',
          ex: r`$x^2+y^2-4x+6y-12=0$: $\;(x-2)^2+(y+3)^2=25$, så $C(2;-3)$ og $r=5$.`,
          calc: 'cirkel',
          kw: 'kvadratkomplettering omskrivning cirkel',
        },
        {
          id: 'punkt-cirkel',
          name: 'Punktets placering i forhold til cirklen',
          rows: [
            ['Punktet ligger på cirklen', r`|CP|=r`],
            ['Punktet ligger inden for cirklen', r`|CP|<r`],
            ['Punktet ligger uden for cirklen', r`|CP|>r`],
          ],
        },
        {
          id: 'linje-cirkel',
          name: 'Skæring mellem linje og cirkel',
          rows: [
            ['To skæringspunkter', r`\dist(C,l)<r`],
            ['Linjen er tangent (ét punkt)', r`\dist(C,l)=r`],
            ['Ingen skæringspunkter', r`\dist(C,l)>r`],
          ],
          note: r`Skæringspunkterne findes ved at indsætte linjens $y=ax+b$ i cirklens ligning og løse andengradsligningen i $x$. Diskriminanten afgør antallet af punkter.`,
          kw: 'skæringspunkter tangent sekant',
        },
        {
          id: 'tangent-cirkel',
          name: 'Tangent til cirklen i et punkt',
          tex: r`(x_0-a)\cdot(x-x_0)+(y_0-b)\cdot(y-y_0)=0`,
          note: r`Tangenten i røringspunktet $P(x_0,y_0)$ står vinkelret på radius, så $\overrightarrow{CP}=\svek{x_0-a}{y_0-b}$ er normalvektor til tangenten.`,
          ex: r`Cirklen $x^2+y^2=25$ i $P(3;4)$: $\;3(x-3)+4(y-4)=0\;\Leftrightarrow\;3x+4y-25=0$`,
          kw: 'tangentens ligning røringspunkt',
        },
        {
          id: 'cirkel-parameter',
          name: 'Parameterfremstilling for en cirkel',
          tex: r`\vek{x}{y}=\vek{a}{b}+r\cdot\vek{\cos(t)}{\sin(t)},\quad t\in[0;2\pi[`,
          kw: 'parameterfremstilling cirkel',
        },
      ],
    },
  ],
};
