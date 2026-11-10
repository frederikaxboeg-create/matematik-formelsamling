// Vektorer i rummet: linjer, planer og kugler.
const r = String.raw;

export default {
  id: 'rummet',
  title: 'Vektorer i rummet',
  formula: r`\vec{a}\times\vec{b}`,
  desc: 'Længde, skalarprodukt, vektorprodukt, linjer, planer, kugler samt afstande, vinkler og skæringer i rummet.',
  practice: 'rummet',
  sections: [
    {
      title: 'Grundbegreber',
      items: [
        {
          id: 'koordinater',
          name: 'Vektorer og punkter i rummet',
          tex: r`\vec{a}=\vekk{a_1}{a_2}{a_3}\qquad\overrightarrow{AB}=\vekk{b_1-a_1}{b_2-a_2}{b_3-a_3}`,
          note: 'Sum, differens og gange med tal regnes koordinat for koordinat – præcis som i planen.',
          kw: 'koordinatsæt rumvektor',
        },
        {
          id: 'laengde',
          name: 'Længde og afstand',
          rows: [
            ['Længden af en vektor', r`|\vec{a}|=\sqrt{a_1^2+a_2^2+a_3^2}`],
            ['Afstand mellem to punkter', r`|AB|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}`],
            ['Midtpunkt', r`M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2},\frac{z_1+z_2}{2}\right)`],
          ],
          ex: r`$\vec{a}=\left(\begin{smallmatrix}1\\2\\2\end{smallmatrix}\right)$: $\;|\vec{a}|=\sqrt{1+4+4}=3$`,
          calc: 'vektor3',
        },
      ],
    },
    {
      title: 'Skalarprodukt',
      items: [
        {
          id: 'skalarprodukt',
          name: 'Skalarprodukt',
          tex: r`\vec{a}\cdot\vec{b}=a_1b_1+a_2b_2+a_3b_3`,
          note: r`$\vec{a}\perp\vec{b}\;\Leftrightarrow\;\vec{a}\cdot\vec{b}=0$.`,
          calc: 'vektor3',
          kw: 'prikprodukt ortogonal',
        },
        {
          id: 'vinkel',
          name: 'Vinkel mellem to vektorer',
          tex: r`\cos(v)=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}|\cdot|\vec{b}|}`,
          calc: 'vektor3',
        },
        {
          id: 'projektion',
          name: 'Projektion',
          tex: r`\vec{b}_{\vec{a}}=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}|^2}\cdot\vec{a}\qquad|\vec{b}_{\vec{a}}|=\frac{|\vec{a}\cdot\vec{b}|}{|\vec{a}|}`,
        },
      ],
    },
    {
      title: 'Vektorprodukt',
      items: [
        {
          id: 'krydsprodukt',
          name: 'Vektorprodukt (krydsprodukt)',
          tex: r`\vec{a}\times\vec{b}=\vekk{a_2b_3-a_3b_2}{a_3b_1-a_1b_3}{a_1b_2-a_2b_1}`,
          note: r`Resultatet er en vektor, der står vinkelret på både $\vec{a}$ og $\vec{b}$.`,
          ex: r`$\left(\begin{smallmatrix}1\\2\\3\end{smallmatrix}\right)\times\left(\begin{smallmatrix}4\\5\\6\end{smallmatrix}\right)=\left(\begin{smallmatrix}2\cdot 6-3\cdot 5\\3\cdot 4-1\cdot 6\\1\cdot 5-2\cdot 4\end{smallmatrix}\right)=\left(\begin{smallmatrix}-3\\6\\-3\end{smallmatrix}\right)$`,
          calc: 'vektor3',
          kw: 'krydsprodukt vektorprodukt normalvektor',
        },
        {
          id: 'kryds-egenskaber',
          name: 'Egenskaber ved vektorproduktet',
          rows: [
            ['Længde', r`|\vec{a}\times\vec{b}|=|\vec{a}|\cdot|\vec{b}|\cdot\sin(v)`],
            ['Rækkefølgen skifter fortegn', r`\vec{a}\times\vec{b}=-\,\vec{b}\times\vec{a}`],
            ['Parallelle vektorer', r`\vec{a}\parallel\vec{b}\;\Leftrightarrow\;\vec{a}\times\vec{b}=\vec{0}`],
          ],
        },
        {
          id: 'areal',
          name: 'Areal af parallelogram og trekant',
          rows: [
            ['Parallelogram udspændt af to vektorer', r`A=|\vec{a}\times\vec{b}|`],
            ['Trekant udspændt af to vektorer', r`T=\tfrac{1}{2}\cdot|\vec{a}\times\vec{b}|`],
          ],
          kw: 'areal udspændt',
        },
      ],
    },
    {
      title: 'Linjer',
      items: [
        {
          id: 'linje',
          name: 'Parameterfremstilling for en linje',
          tex: r`\vekk{x}{y}{z}=\vekk{x_0}{y_0}{z_0}+t\cdot\vekk{r_1}{r_2}{r_3}`,
          note: r`Linjen går gennem $P_0(x_0,y_0,z_0)$ og har retningsvektoren $\vec{r}$. To linjer i rummet kan være parallelle, skære hinanden eller være vindskæve.`,
          kw: 'retningsvektor vindskæve',
        },
        {
          id: 'dist-punkt-linje',
          name: 'Afstand fra punkt til linje',
          tex: r`\dist(P,l)=\frac{|\vec{r}\times\overrightarrow{P_0P}|}{|\vec{r}|}`,
          note: r`$P_0$ er et punkt på linjen, og $\vec{r}$ er linjens retningsvektor.`,
        },
        {
          id: 'vinkel-linjer',
          name: 'Vinkel mellem to linjer',
          tex: r`\cos(v)=\frac{|\vec{r}_1\cdot\vec{r}_2|}{|\vec{r}_1|\cdot|\vec{r}_2|}`,
          note: 'Giver den spidse vinkel mellem retningsvektorerne.',
        },
        {
          id: 'vindskaeve',
          name: 'Afstand mellem to vindskæve linjer',
          extra: true,
          tex: r`\dist(l,m)=\frac{|\vec{n}\cdot\overrightarrow{P_1P_2}|}{|\vec{n}|}\qquad\vec{n}=\vec{r}_1\times\vec{r}_2`,
          note: r`$P_1$ ligger på $l$, og $P_2$ ligger på $m$.`,
        },
      ],
    },
    {
      title: 'Planer',
      items: [
        {
          id: 'planens-ligning',
          name: 'Planens ligning',
          tex: [
            r`a\cdot(x-x_0)+b\cdot(y-y_0)+c\cdot(z-z_0)=0`,
            r`a x+b y+c z+d=0`,
          ],
          note: r`Planen går gennem $P_0(x_0,y_0,z_0)$ og har normalvektoren $\vec{n}=\left(\begin{smallmatrix}a\\b\\c\end{smallmatrix}\right)$.`,
          ex: r`$P_0(1;2;3)$ og $\vec{n}=\left(\begin{smallmatrix}2\\-1\\4\end{smallmatrix}\right)$: $\;2(x-1)-(y-2)+4(z-3)=0\;\Leftrightarrow\;2x-y+4z-12=0$`,
          kw: 'plan normalvektor',
        },
        {
          id: 'normalvektor',
          name: 'Normalvektor til en plan',
          rows: [
            ['Ud fra to retningsvektorer i planen', r`\vec{n}=\vec{r}_1\times\vec{r}_2`],
            ['Ud fra tre punkter i planen', r`\vec{n}=\overrightarrow{AB}\times\overrightarrow{AC}`],
          ],
        },
        {
          id: 'plan-parameter',
          name: 'Parameterfremstilling for en plan',
          tex: r`\vekk{x}{y}{z}=\vekk{x_0}{y_0}{z_0}+s\cdot\vec{r}_1+t\cdot\vec{r}_2`,
          note: r`$\vec{r}_1$ og $\vec{r}_2$ er to ikke-parallelle retningsvektorer i planen.`,
        },
        {
          id: 'dist-punkt-plan',
          name: 'Afstand fra punkt til plan',
          tex: r`\dist(P,\alpha)=\frac{|a x_1+b y_1+c z_1+d|}{\sqrt{a^2+b^2+c^2}}`,
          note: r`For $P(x_1,y_1,z_1)$ og $\alpha:\;ax+by+cz+d=0$.`,
          ex: r`$P(1;2;3)$ og $\alpha:\;2x-2y+z-5=0$: $\;\dist(P,\alpha)=\frac{|2-4+3-5|}{\sqrt{4+4+1}}=\frac{4}{3}$`,
          calc: 'dist-plan',
        },
        {
          id: 'vinkel-planer',
          name: 'Vinkel mellem to planer',
          tex: r`\cos(v)=\frac{|\vec{n}_1\cdot\vec{n}_2|}{|\vec{n}_1|\cdot|\vec{n}_2|}`,
          note: 'Vinklen mellem planerne er den spidse vinkel mellem normalvektorerne.',
        },
        {
          id: 'vinkel-linje-plan',
          name: 'Vinkel mellem linje og plan',
          tex: r`\sin(v)=\frac{|\vec{r}\cdot\vec{n}|}{|\vec{r}|\cdot|\vec{n}|}`,
          note: r`Svarer til $v=90^\circ-w$, hvor $w$ er den spidse vinkel mellem linjens retningsvektor og planens normalvektor.`,
        },
        {
          id: 'skaeringer',
          name: 'Skæringer',
          rows: [
            ['Retningsvektor for skæringslinjen mellem to planer', r`\vec{r}=\vec{n}_1\times\vec{n}_2`],
            ['Linjen er parallel med planen (eller ligger i den)', r`\vec{r}\cdot\vec{n}=0`],
          ],
          note: r`Skæringspunktet mellem en linje og en plan findes ved at indsætte linjens $x$, $y$ og $z$ i planens ligning, løse for $t$ og indsætte $t$ i parameterfremstillingen.`,
          kw: 'skæringspunkt skæringslinje',
        },
      ],
    },
    {
      title: 'Kuglen',
      items: [
        {
          id: 'kuglens-ligning',
          name: 'Kuglens ligning',
          tex: r`(x-a)^2+(y-b)^2+(z-c)^2=r^2`,
          note: r`Centrum er $C(a,b,c)$, og radius er $r$. Centrum og radius findes ved kvadratkomplettering, ligesom for cirklen.`,
          kw: 'kugle centrum radius',
        },
        {
          id: 'tangentplan',
          name: 'Tangentplan til en kugle',
          tex: r`(x_0-a)\cdot(x-x_0)+(y_0-b)\cdot(y-y_0)+(z_0-c)\cdot(z-z_0)=0`,
          note: r`Tangentplanen i røringspunktet $P(x_0,y_0,z_0)$ har $\overrightarrow{CP}$ som normalvektor.`,
        },
        {
          id: 'plan-kugle',
          name: 'Plan og kugle',
          rows: [
            ['Planen skærer kuglen i en cirkel', r`\dist(C,\alpha)<r`],
            ['Planen er tangentplan', r`\dist(C,\alpha)=r`],
            ['Ingen skæring', r`\dist(C,\alpha)>r`],
            ['Skæringscirklens radius', r`r_s=\sqrt{r^2-\dist(C,\alpha)^2}`],
          ],
          note: r`Skæring mellem linje og kugle: indsæt linjens $x$, $y$ og $z$ i kuglens ligning, og løs andengradsligningen i $t$.`,
        },
      ],
    },
  ],
};
