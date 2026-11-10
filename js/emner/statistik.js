// Deskriptiv statistik.
const r = String.raw;

export default {
  id: 'statistik',
  title: 'Deskriptiv statistik',
  formula: r`\bar{x}=\frac{x_1+x_2+\dots+x_n}{n}`,
  desc: 'Middeltal, median, kvartilsæt, boksplot, spredning og grupperede observationer med histogram og sumkurve.',
  practice: 'statistik',
  sections: [
    {
      title: 'Ugrupperede observationer',
      items: [
        {
          id: 'middeltal',
          name: 'Middeltal (gennemsnit)',
          tex: r`\bar{x}=\frac{x_1+x_2+\dots+x_n}{n}=\frac{1}{n}\sum_{i=1}^{n}x_i`,
          ex: r`Observationerne $2,\,4,\,4,\,5,\,7,\,9,\,10,\,12$: $\;\bar{x}=\frac{53}{8}=6{,}625$`,
          calc: 'statistik',
          kw: 'gennemsnit middelværdi',
        },
        {
          id: 'hyppighed',
          name: 'Hyppighed og frekvens',
          tex: r`f=\frac{h}{n}`,
          note: r`Hyppigheden $h$ er, hvor mange gange en observation forekommer, og frekvensen $f$ er andelen ud af alle $n$ observationer. Den <b>kumulerede frekvens</b> er summen af frekvenserne til og med observationen.`,
          kw: 'hyppighed frekvens kumuleret',
        },
        {
          id: 'middeltal-frekvens',
          name: 'Middeltal ud fra hyppigheder eller frekvenser',
          tex: r`\bar{x}=\frac{h_1x_1+h_2x_2+\dots+h_kx_k}{n}=f_1x_1+f_2x_2+\dots+f_kx_k`,
          kw: 'vægtet gennemsnit',
        },
        {
          id: 'median',
          name: 'Median',
          note: r`Den midterste observation, når observationerne er stillet i rækkefølge. Er der et lige antal, er medianen gennemsnittet af de to midterste. Mindst halvdelen af observationerne er mindre end eller lig med medianen.`,
          ex: r`$2,\,4,\,4,\,5,\,7,\,9,\,10,\,12$: medianen er $\frac{5+7}{2}=6$.`,
          calc: 'statistik',
          kw: 'midterste observation',
        },
        {
          id: 'kvartilsaet',
          name: 'Kvartilsæt',
          tex: r`(Q_1,\;m,\;Q_3)`,
          note: r`Den nedre kvartil $Q_1$ er medianen af den nedre halvdel af observationerne, $m$ er medianen, og den øvre kvartil $Q_3$ er medianen af den øvre halvdel. Ved et ulige antal observationer tages den midterste ikke med i halvdelene.`,
          ex: r`$2,\,4,\,4,\,5,\,7,\,9,\,10,\,12$: $\;Q_1=\frac{4+4}{2}=4$, $\;m=6\;$ og $\;Q_3=\frac{9+10}{2}=9{,}5$.`,
          calc: 'statistik',
          kw: 'nedre kvartil øvre kvartil kvartiler',
        },
        {
          id: 'bredder',
          name: 'Variationsbredde og kvartilbredde',
          rows: [
            ['Variationsbredde', r`x_{\text{maks}}-x_{\text{min}}`],
            ['Kvartilbredde', r`Q_3-Q_1`],
          ],
          note: 'Kvartilbredden er bredden af den midterste halvdel af observationerne og påvirkes ikke af enkelte ekstreme værdier.',
          kw: 'spredningsmål',
        },
        {
          id: 'boksplot',
          name: 'Boksplot og outliers',
          tex: r`x<Q_1-1{,}5\cdot(Q_3-Q_1)\quad\lor\quad x>Q_3+1{,}5\cdot(Q_3-Q_1)`,
          note: r`Et boksplot tegnes ud fra mindsteværdi, $Q_1$, median, $Q_3$ og størsteværdi. En observation er en <b>outlier</b>, hvis den ligger mere end halvanden kvartilbredde uden for boksen (uligheden ovenfor).`,
          kw: 'kassediagram outlier ekstrem observation',
        },
        {
          id: 'skaevhed',
          name: 'Skævhed',
          rows: [
            ['Højreskæv fordeling', r`\bar{x}>m`],
            ['Venstreskæv fordeling', r`\bar{x}<m`],
            ['Symmetrisk fordeling', r`\bar{x}\approx m`],
          ],
          note: 'I en højreskæv fordeling trækker enkelte store observationer middeltallet op.',
          kw: 'højreskæv venstreskæv symmetrisk',
        },
        {
          id: 'typetal',
          name: 'Typetal',
          note: 'Den observation, der forekommer flest gange. For grupperede observationer er typeintervallet det interval, hvor histogrammets søjle er højest.',
          kw: 'typeinterval hyppigste',
        },
      ],
    },
    {
      title: 'Varians og spredning',
      items: [
        {
          id: 'spredning-stikproeve',
          name: 'Spredning for en stikprøve',
          tex: r`s=\sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2}`,
          note: r`Bruges, når observationerne er en stikprøve fra en større population. Variansen er $s^2$.`,
          calc: 'statistik',
          kw: 'standardafvigelse varians stikprøvespredning',
        },
        {
          id: 'spredning-population',
          name: 'Spredning for en hel population',
          tex: r`\sigma=\sqrt{\frac{1}{n}\sum_{i=1}^{n}(x_i-\bar{x})^2}`,
          note: r`Spredningen måler, hvor langt observationerne typisk ligger fra middeltallet. Variansen er $\sigma^2$.`,
          calc: 'statistik',
          kw: 'standardafvigelse varians',
        },
      ],
    },
    {
      title: 'Grupperede observationer',
      items: [
        {
          id: 'grupperet-middeltal',
          name: 'Middeltal for grupperede observationer',
          tex: r`\bar{x}\approx m_1f_1+m_2f_2+\dots+m_kf_k`,
          note: r`$m_i$ er intervalmidtpunktet, og $f_i$ er intervalfrekvensen.`,
          ex: r`Intervallerne $]0;10]$, $]10;20]$ og $]20;30]$ med frekvenserne $0{,}2$, $0{,}5$ og $0{,}3$: $\;\bar{x}\approx 5\cdot 0{,}2+15\cdot 0{,}5+25\cdot 0{,}3=16$`,
          kw: 'intervalmidtpunkt intervalfrekvens',
        },
        {
          id: 'histogram',
          name: 'Histogram',
          note: 'Søjlernes <b>areal</b> svarer til intervalfrekvenserne. Er intervallerne lige brede, svarer højden til frekvensen.',
          kw: 'søjler areal intervaller',
        },
        {
          id: 'sumkurve',
          name: 'Sumkurve og fraktiler',
          note: r`Sumkurven tegnes ved at afsætte de kumulerede frekvenser over intervallernes <b>højre</b> endepunkter og forbinde punkterne med rette linjer. $p\,\%$-fraktilen er den $x$-værdi, hvor sumkurven har værdien $p\,\%$. Kvartilsættet er $25\,\%$-, $50\,\%$- og $75\,\%$-fraktilerne.`,
          kw: 'fraktil kumuleret frekvens aflæse kvartilsæt',
        },
      ],
    },
  ],
};
