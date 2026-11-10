// Procent- og rentesregning.
const r = String.raw;

export default {
  id: 'procent',
  title: 'Procent og rente',
  formula: r`K_n=K_0\cdot(1+r)^n`,
  desc: 'Procentregning, vækstrate, fremskrivningsfaktor, gennemsnitlig vækst, renteformlen og indekstal.',
  practice: 'procent',
  sections: [
    {
      title: 'Procentregning',
      items: [
        {
          id: 'procent-decimal',
          name: 'Procent som decimaltal',
          tex: r`p\,\%=\frac{p}{100}`,
          ex: r`$25\,\%=0{,}25$ og $\;3{,}5\,\%=0{,}035$`,
          kw: 'omregne procent decimaltal',
        },
        {
          id: 'procentdel',
          name: 'Hvor mange procent udgør delen?',
          tex: r`\text{procentdel}=\frac{\text{delen}}{\text{det hele}}\cdot 100\,\%`,
          ex: r`$12$ ud af $48$: $\;\frac{12}{48}\cdot 100\,\%=25\,\%$`,
          kw: 'andel procentdel',
        },
        {
          id: 'procent-af',
          name: 'Procent af et tal',
          tex: r`p\,\%\text{ af }B=\frac{p}{100}\cdot B`,
          ex: r`$15\,\%$ af $240$: $\;0{,}15\cdot 240=36$`,
        },
        {
          id: 'vaekstrate',
          name: 'Vækstrate (procentvis ændring)',
          tex: r`r=\frac{S-B}{B}=\frac{S}{B}-1`,
          note: r`$B$ er begyndelsesværdien, og $S$ er slutværdien. $r>0$ er en stigning, og $r<0$ er et fald.`,
          ex: r`Fra $80$ til $92$: $\;r=\frac{92-80}{80}=0{,}15=15\,\%$`,
          calc: 'procent',
          kw: 'procentvis stigning fald ændring relativ vækst',
        },
        {
          id: 'fremskrivning',
          name: 'Fremskrivningsfaktor',
          tex: r`S=B\cdot(1+r)\qquad F=1+r`,
          note: r`En stigning på $12\,\%$ svarer til at gange med $1{,}12$. Et fald på $30\,\%$ svarer til at gange med $0{,}70$.`,
          ex: r`$250$ kr. plus $20\,\%$: $\;250\cdot 1{,}20=300$ kr.`,
          kw: 'fremskrivningsfaktor lægge procent til trække fra slutværdi',
        },
        {
          id: 'begyndelsesvaerdi',
          name: 'Begyndelsesværdien ud fra slutværdien',
          tex: r`B=\frac{S}{1+r}`,
          note: 'Man regner baglæns ved at dividere med fremskrivningsfaktoren – ikke ved at trække procenten fra igen.',
          ex: r`Prisen er $300$ kr. efter en stigning på $20\,\%$: $\;B=\frac{300}{1{,}20}=250$ kr.`,
          kw: 'baglæns før pris uden moms',
        },
        {
          id: 'procentpoint',
          name: 'Procent og procentpoint',
          note: r`Stiger en rente fra $2\,\%$ til $3\,\%$, er den steget med $1$ <b>procentpoint</b>, men med $\frac{3-2}{2}=50\,\%$.`,
          kw: 'procentpoint forskel',
        },
      ],
    },
    {
      title: 'Flere procentændringer',
      items: [
        {
          id: 'samlet-vaekst',
          name: 'Samlet vækstrate',
          tex: r`1+r_{\text{samlet}}=(1+r_1)\cdot(1+r_2)\cdots(1+r_n)`,
          note: 'Fremskrivningsfaktorerne ganges sammen – procenterne må ikke lægges sammen.',
          ex: r`Først $+10\,\%$ og så $-10\,\%$: $\;1{,}10\cdot 0{,}90=0{,}99$, altså et samlet fald på $1\,\%$.`,
          kw: 'flere procenter efter hinanden',
        },
        {
          id: 'gennemsnitlig-vaekst',
          name: 'Gennemsnitlig vækstrate',
          tex: r`r_{\text{gns}}=\sqrt[n]{(1+r_1)\cdot(1+r_2)\cdots(1+r_n)}-1=\sqrt[n]{\frac{S}{B}}-1`,
          note: r`$n$ er antallet af perioder (terminer).`,
          ex: r`Fra $200$ til $288$ på $2$ år: $\;r_{\text{gns}}=\sqrt{\frac{288}{200}}-1=0{,}20=20\,\%$ pr. år.`,
          kw: 'gennemsnitlig procent årlig vækst',
        },
      ],
    },
    {
      title: 'Renteformlen',
      items: [
        {
          id: 'renteformlen',
          name: 'Renteformlen (kapitalfremskrivning)',
          tex: r`K_n=K_0\cdot(1+r)^n`,
          note: r`$K_0$ er startkapitalen, $r$ er rentefoden pr. termin som decimaltal, $n$ er antal terminer, og $K_n$ er kapitalen efter $n$ terminer.`,
          ex: r`$2500$ kr. til $3\,\%$ i $5$ år: $\;K_5=2500\cdot 1{,}03^5\approx 2898{,}19$ kr.`,
          calc: 'rente',
          kw: 'rentes rente kapital opsparing',
        },
        {
          id: 'renteformlen-isoleret',
          name: 'Renteformlen løst for hver størrelse',
          rows: [
            ['Startkapitalen', r`K_0=\frac{K_n}{(1+r)^n}`],
            ['Rentefoden', r`r=\sqrt[n]{\frac{K_n}{K_0}}-1`],
            ['Antal terminer', r`n=\frac{\log\!\left(\frac{K_n}{K_0}\right)}{\log(1+r)}`],
          ],
          ex: r`Hvor længe går der, før $1000$ kr. er blevet til $2000$ kr. ved $4\,\%$? $\;n=\frac{\log(2)}{\log(1{,}04)}\approx 17{,}7$ år.`,
          kw: 'isolere rentefod terminer startkapital',
        },
      ],
    },
    {
      title: 'Indekstal',
      items: [
        {
          id: 'indekstal',
          name: 'Indekstal',
          tex: r`\text{indekstal}=\frac{\text{værdi}}{\text{værdi i basisåret}}\cdot 100`,
          note: 'Basisåret har indeks 100. Indeks 125 betyder, at værdien er 25 % højere end i basisåret.',
          ex: r`Basisår: $400$ kr. Senere: $460$ kr. Indeks: $\;\frac{460}{400}\cdot 100=115$.`,
          kw: 'indeks basisår',
        },
      ],
    },
  ],
};
