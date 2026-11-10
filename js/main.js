// Routing og sider: forside, emner, søgning, studieplan, favoritter og udskrift.
import { AREAS, FORLOEB, topics, topicById, statusOf, later, countItems } from './emner/index.js';
import { el, icon } from './ui.js';
import { tex } from './tex.js';
import { formulaCard, cardId, keyOf } from './kort.js';
import { search, searchTopics } from './soeg.js';
import * as favs from './favoritter.js';
import { setupPwa } from './pwa.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const q = document.getElementById('q');

const SITE = 'Formelsamling';
const PRACTICE_URL = 'https://frederikaxboeg-create.github.io/interaktiv-matematik/';

const NAV = [
  { id: '', label: 'Emner', href: '#/' },
  { id: 'studieplan', label: 'Studieplan', href: '#/studieplan' },
  { id: 'maple', label: 'Maple', href: '#/maple' },
  { id: 'favoritter', label: 'Favoritter', href: '#/favoritter' },
  { id: 'alle', label: 'Udskriv', href: '#/alle' },
];

const STATUS = {
  done: ['Gennemgået', 's-done'],
  now: ['I gang nu', 's-now'],
  next: ['Næste forløb', 's-next'],
};

// Genveje på forsiden: [tekst, emne/formel]
const QUICK = [
  ['Andengradsligningen', 'andengrad/roedder'],
  ['Topunktsformler', 'regression/sammenligning'],
  ['Potensregneregler', 'regneregler/potensregler'],
  ['Cosinusrelationerne', 'trigonometri/cosinusrelationerne'],
  ['Afledede funktioner', 'differential/tabel'],
  ['Produkt- og kædereglen', 'differential/produkt'],
  ['Stamfunktioner', 'integral/tabel'],
  ['Binomialfordelingen', 'binomial/punktsandsynlighed'],
];

const total = topics.reduce((n, t) => n + countItems(t), 0);
const kernestof = AREAS.flatMap((a) => a.topics);

/* ---------- fælles dele ---------- */

function buildNav() {
  nav.replaceChildren(...NAV.map((n) => {
    const a = el('a', { href: n.href }, n.label);
    a.dataset.id = n.id;
    if (n.id === 'favoritter') a.append(el('span', { class: 'count', id: 'fav-count' }));
    return a;
  }));
  updateFavCount();
}

function updateFavCount() {
  const badge = document.getElementById('fav-count');
  if (!badge) return;
  badge.textContent = favs.count() || '';
  badge.hidden = !favs.count();
}

const statusChip = (status) => {
  const st = STATUS[status];
  return st ? el('span', { class: `status ${st[1]}` }, st[0]) : null;
};

function topicCard(t) {
  return el('a', { class: 'topic-card', href: `#/${t.id}` },
    el('div', { class: 'topic-formula', html: tex(String.raw`\displaystyle ${t.formula}`) }),
    el('h3', {}, t.title, statusChip(statusOf(t.id))),
    el('p', {}, t.desc),
    el('div', { class: 'topic-meta' }, `${countItems(t)} formler og regler`));
}

/** Skalerer formlerne på emnekortene ned, hvis de er bredere end kortet. */
function fitFormulas() {
  requestAnimationFrame(() => {
    for (const box of app.querySelectorAll('.topic-formula')) {
      const inner = box.firstElementChild;
      if (!inner) continue;
      box.style.fontSize = '';
      const style = getComputedStyle(box);
      const room = box.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const width = inner.getBoundingClientRect().width;
      if (width > room && room > 0) box.style.fontSize = `${Math.max(10, (parseFloat(style.fontSize) * room) / width - 0.2)}px`;
    }
  });
}

function printButton(label) {
  const btn = el('button', { type: 'button', class: 'btn', html: `${icon('print', 17)}<span>${label}</span>` });
  btn.addEventListener('click', () => window.print());
  return btn;
}

function pageHead(title, lead, ...extra) {
  return el('section', { class: 'topic-head' },
    el('div', { class: 'topic-title' }, el('h1', {}, title)),
    lead ? el('p', { class: 'lead' }, lead) : null,
    ...extra);
}

/** Sæt søgefeltet til en tekst, og vis resultaterne. */
function runSearch(text) {
  q.value = text;
  q.dispatchEvent(new Event('input'));
}

/* ---------- forside ---------- */

function renderHome() {
  document.title = `${SITE} – Matematik A`;
  const now = kernestof.filter((t) => ['now', 'next'].includes(statusOf(t.id)));

  app.append(
    el('section', { class: 'hero' },
      el('p', { class: 'eyebrow' }, 'Matematik A · stx'),
      el('h1', {}, 'Formelsamling'),
      el('p', { class: 'lead' }, `Alle formlerne fra studieplanen: ${total} formler og regler i ${kernestof.length} emner. Søg i dem, gem dine favoritter, og regn direkte med formlerne.`),
      el('div', { class: 'quick' },
        el('span', { class: 'quick-label' }, 'Ofte brugt'),
        QUICK.map(([label, target]) => el('a', { class: 'chip', href: `#/${target}` }, label)))),

    now.length ? el('section', { class: 'area' },
      el('div', { class: 'area-head' }, el('h2', {}, 'Lige nu i undervisningen')),
      el('div', { class: 'topic-grid' }, now.map(topicCard))) : null,

    ...AREAS.map((a) => el('section', { class: 'area', id: `omraade-${a.id}` },
      el('div', { class: 'area-head' }, el('h2', {}, a.title), el('p', {}, a.desc)),
      el('div', { class: 'topic-grid' }, a.topics.map(topicCard)))),

    el('section', { class: 'area' },
      el('div', { class: 'area-head' }, el('h2', {}, 'Mere')),
      el('div', { class: 'topic-grid' },
        el('a', { class: 'topic-card tool', href: '#/studieplan' },
          el('div', { class: 'topic-formula', html: tex(String.raw`1.\text{g}\;\to\;2.\text{g}\;\to\;3.\text{g}`) }),
          el('h3', {}, 'Studieplan'),
          el('p', {}, 'Forløbene i den rækkefølge, I har haft dem – med link til formlerne for hvert forløb.')),
        el('a', { class: 'topic-card tool', href: '#/maple' },
          el('div', { class: 'topic-formula', html: tex(String.raw`\texttt{diff(f(x), x)}`) }),
          el('h3', {}, 'Maple-kommandoer'),
          el('p', {}, 'De vigtigste kommandoer til ligninger, differential- og integralregning, regression og sandsynlighed.')),
        el('a', { class: 'topic-card tool', href: '#/favoritter' },
          el('div', { class: 'topic-formula', html: tex(String.raw`\bigstar`) }),
          el('h3', {}, 'Favoritter'),
          el('p', {}, 'Tryk på stjernen på en formel, så ligger den klar her.')),
        el('a', { class: 'topic-card tool', href: '#/alle' },
          el('div', { class: 'topic-formula', html: tex(String.raw`\text{A4}\;/\;\text{PDF}`) }),
          el('h3', {}, 'Udskriv hele samlingen'),
          el('p', {}, 'Alle emner på én side, klar til udskrift eller til at gemme som PDF.')))),

    el('p', { class: 'footnote' }, 'Favoritterne gemmes kun i denne browser.'),
  );
}

/* ---------- emneside ---------- */

function focusItem(t, itemId) {
  const item = t.sections.flatMap((s) => s.items).find((it) => it.id === itemId);
  const node = item && document.getElementById(cardId(t, item));
  if (!node) return;
  requestAnimationFrame(() => {
    node.scrollIntoView({ block: 'center' });
    node.classList.add('target');
    setTimeout(() => node.classList.remove('target'), 2400);
  });
}

function renderTopic(t, itemId) {
  document.title = `${t.title} · ${SITE}`;
  const i = topics.indexOf(t);
  const prev = topics[i - 1];
  const next = topics[i + 1];

  const secnav = t.sections.length > 1 ? el('div', { class: 'chips secnav' }, t.sections.map((s, n) => {
    const b = el('button', { type: 'button', class: 'chip' }, s.title);
    b.addEventListener('click', () => document.getElementById(`afsnit-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    return b;
  })) : null;

  app.append(
    el('section', { class: 'topic-head' },
      el('a', { class: 'back', href: '#/' }, '← Alle emner'),
      el('div', { class: 'topic-title' }, el('h1', {}, t.title), statusChip(statusOf(t.id))),
      el('p', { class: 'lead' }, t.desc),
      el('div', { class: 'topic-actions' },
        t.practice ? el('a', {
          class: 'btn primary', href: `${PRACTICE_URL}#/${t.practice}`, target: '_blank', rel: 'noopener',
          html: `<span>${t.practiceLabel ?? 'Øv emnet i Interaktiv Matematik'}</span>${icon('arrow', 16)}`,
        }) : null,
        printButton('Udskriv emnet')),
      secnav),

    ...t.sections.map((s, n) => el('section', { class: 'fsec', id: `afsnit-${n}` },
      el('h2', {}, s.title),
      el('div', { class: 'fgrid' }, s.items.map((it) => formulaCard(t, s, it))))),

    el('nav', { class: 'pager', 'aria-label': 'Forrige og næste emne' },
      prev ? el('a', { class: 'pager-link', href: `#/${prev.id}` }, el('span', {}, '← Forrige'), el('b', {}, prev.title)) : el('span'),
      next ? el('a', { class: 'pager-link next', href: `#/${next.id}` }, el('span', {}, 'Næste →'), el('b', {}, next.title)) : el('span')),
  );
  if (itemId) focusItem(t, itemId);
}

/* ---------- søgning ---------- */

function renderSearch(query) {
  document.title = `Søgning: ${query} · ${SITE}`;
  const hits = search(query);
  const found = searchTopics(query);

  app.append(pageHead(
    hits.length ? `${hits.length === 60 ? 'Over 60' : hits.length} ${hits.length === 1 ? 'resultat' : 'resultater'} for «${query}»` : `Ingen formler matcher «${query}»`,
    hits.length ? null : 'Prøv et andet ord – eller et af disse:',
    hits.length ? null : el('div', { class: 'chips' }, ['toppunkt', 'areal', 'kædereglen', 'vinkel', 'vækstrate', 'stamfunktion'].map((w) => {
      const b = el('button', { type: 'button', class: 'chip' }, w);
      b.addEventListener('click', () => runSearch(w));
      return b;
    })),
    found.length ? el('div', { class: 'chips found' },
      el('span', { class: 'quick-label' }, 'Emner'),
      found.map((t) => el('a', { class: 'chip', href: `#/${t.id}` }, t.title))) : null,
  ));
  if (hits.length) app.append(el('div', { class: 'fgrid' }, hits.map((h) => formulaCard(h.topic, h.section, h.item, { crumb: true }))));
}

/* ---------- favoritter ---------- */

function renderFavs() {
  document.title = `Favoritter · ${SITE}`;
  const cards = [];
  for (const t of topics) {
    for (const s of t.sections) {
      for (const it of s.items) {
        if (favs.has(keyOf(t, it))) cards.push(formulaCard(t, s, it, { crumb: true }));
      }
    }
  }
  app.append(pageHead('Favoritter', cards.length
    ? `${cards.length} ${cards.length === 1 ? 'gemt formel' : 'gemte formler'}. De gemmes kun i denne browser.`
    : null,
  cards.length ? el('div', { class: 'topic-actions' }, printButton('Udskriv favoritterne')) : null));
  if (cards.length) {
    app.append(el('div', { class: 'fgrid' }, cards));
  } else {
    app.append(el('div', { class: 'empty' },
      el('div', { class: 'empty-icon', html: icon('star', 30) }),
      el('h2', {}, 'Ingen favoritter endnu'),
      el('p', {}, 'Tryk på stjernen i hjørnet af en formel, så ligger den klar her – fx de formler, du skal bruge til næste prøve.'),
      el('a', { class: 'btn primary', href: '#/' }, 'Find formler')));
  }
}

/* ---------- studieplan ---------- */

function renderPlan() {
  document.title = `Studieplan · ${SITE}`;
  app.append(
    pageHead('Studieplan', 'Forløbene i den rækkefølge, I har haft dem. Vælg et emne for at se formlerne til forløbet.'),
    el('ol', { class: 'plan' }, FORLOEB.map((f) => el('li', { class: `forloeb ${f.status}` },
      el('div', { class: 'forloeb-nr', 'aria-hidden': 'true' }, f.nr),
      el('div', { class: 'forloeb-body' },
        el('h2', {}, f.title, statusChip(f.status), el('span', { class: 'aar' }, f.aar)),
        el('p', {}, f.desc),
        el('div', { class: 'chips' }, f.topics.map((id) => {
          const t = topicById(id);
          return t ? el('a', { class: 'chip', href: `#/${t.id}` }, t.title) : null;
        })))))),
  );
  if (later.length) {
    app.append(el('section', { class: 'area' },
      el('div', { class: 'area-head' },
        el('h2', {}, 'Resten af kernestoffet'),
        el('p', {}, 'Emner fra kernestoffet i Matematik A, som ikke har været et selvstændigt forløb endnu. Formlerne er med allerede.')),
      el('div', { class: 'topic-grid' }, later.map(topicCard))));
  }
}

/* ---------- hele samlingen (udskrift) ---------- */

function renderAll() {
  document.title = `Hele formelsamlingen · ${SITE}`;
  const body = el('div', { class: 'all' });

  const option = (label, cls, checked) => {
    const input = el('input', { type: 'checkbox' });
    input.checked = checked;
    const apply = () => body.classList.toggle(cls, !input.checked);
    input.addEventListener('change', apply);
    apply();
    return el('label', { class: 'check' }, input, el('span', {}, label));
  };

  app.append(pageHead('Hele formelsamlingen',
    `Alle ${total} formler og regler på én side. Udskriv den, eller gem den som PDF i udskriftsvinduet.`,
    el('div', { class: 'topic-actions' },
      printButton('Udskriv eller gem som PDF'),
      option('Eksempler', 'hide-ex', true),
      option('Maple-kommandoer', 'hide-maple', true),
      option('Supplerende stof', 'hide-extra', true))), body);

  for (const t of topics) {
    body.append(el('section', { class: 'all-topic' },
      el('h2', { class: 'all-title' }, t.title),
      ...t.sections.map((s) => el('section', { class: 'fsec' },
        el('h3', { class: 'all-sec' }, s.title),
        el('div', { class: 'fgrid' }, s.items.map((it) => formulaCard(t, s, it, { compact: true })))))));
  }
}

/* ---------- routing ---------- */

const decode = (s) => { try { return decodeURIComponent(s); } catch { return s; } };

let current = null;
function route() {
  const [id = '', ...rest] = location.hash.replace(/^#\/?/, '').split('/');
  const topic = topicById(id);
  app.replaceChildren();

  const navId = NAV.some((n) => n.id === id) ? id : topic ? '' : null;
  for (const a of nav.children) a.classList.toggle('active', a.dataset.id === navId);

  // Søgefeltet følger adressen – undtagen mens man skriver i det.
  const query = id === 'soeg' ? decode(rest.join('/')) : '';
  if (id !== 'soeg' || document.activeElement !== q) q.value = query;

  const page = topic || ['soeg', 'favoritter', 'studieplan', 'alle'].includes(id) ? id : '';
  if (page !== current) window.scrollTo(0, 0);
  current = page;

  if (topic) renderTopic(topic, rest[0]);
  else if (id === 'soeg' && query.trim()) renderSearch(query.trim());
  else if (id === 'favoritter') renderFavs();
  else if (id === 'studieplan') renderPlan();
  else if (id === 'alle') renderAll();
  else renderHome();
  fitFormulas();
}

/* ---------- søgefelt ---------- */

let beforeSearch = '#/';
q.addEventListener('input', () => {
  const text = q.value.trim();
  const inSearch = location.hash.startsWith('#/soeg');
  if (!inSearch) beforeSearch = location.hash || '#/';
  if (text) {
    const target = `#/soeg/${encodeURIComponent(text)}`;
    if (inSearch) history.replaceState(null, '', target);
    else history.pushState(null, '', target);
  } else if (inSearch) {
    history.replaceState(null, '', beforeSearch);
  }
  route();
});

q.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { runSearch(''); q.blur(); }
});

document.addEventListener('keydown', (e) => {
  const tag = document.activeElement?.tagName ?? '';
  if (e.key === '/' && !e.metaKey && !e.ctrlKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) {
    e.preventDefault();
    q.focus();
    q.select();
  }
});

let resizeTimer = 0;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(fitFormulas, 150);
});

setupPwa();
buildNav();
favs.subscribe(updateFavCount);
window.addEventListener('hashchange', route);
route();
