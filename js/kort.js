// Formelkort: viser én formel med navn, forklaring, eksempel, Maple-kommando og beregner.
import { el, icon, copyText } from './ui.js';
import { tex, math } from './tex.js';
import * as favs from './favoritter.js';
import { CALCS, mountCalc } from './beregnere.js';

export const keyOf = (topic, item) => `${topic.id}/${item.id}`;
export const cardId = (topic, item) => `f-${topic.id}-${item.id}`;

function flash(btn, html) {
  const old = btn.innerHTML;
  btn.innerHTML = html;
  btn.classList.add('done');
  setTimeout(() => { btn.innerHTML = old; btn.classList.remove('done'); }, 1400);
}

function favButton(key, name) {
  const btn = el('button', { type: 'button', class: 'tool fav' });
  const render = () => {
    const on = favs.has(key);
    btn.innerHTML = icon('star');
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', String(on));
    btn.title = on ? 'Fjern fra favoritter' : 'Gem som favorit';
    btn.setAttribute('aria-label', `${btn.title}: ${name}`);
  };
  btn.addEventListener('click', () => { favs.toggle(key); render(); });
  render();
  return btn;
}

function linkButton(topic, item) {
  const btn = el('button', { type: 'button', class: 'tool', title: 'Kopiér link til formlen', 'aria-label': `Kopiér link til ${item.name}`, html: icon('link') });
  btn.addEventListener('click', async () => {
    const url = `${location.origin}${location.pathname}#/${topic.id}/${item.id}`;
    if (await copyText(url)) flash(btn, icon('check'));
  });
  return btn;
}

function table(t) {
  const build = (head, rows) => el('table', { class: 'ftable' },
    el('thead', {}, el('tr', {}, head.map((h) => el('th', { html: math(h) })))),
    el('tbody', {}, rows.map((row) => el('tr', {}, row.map((c) => el('td', { html: math(c) }))))));
  // Tabeller med fire kolonner (f, f', f, f') deles i to, så de kan stå under hinanden på smalle skærme.
  if (t.head.length === 4 && t.head[0] === t.head[2] && t.head[1] === t.head[3]) {
    return el('div', { class: 'ftable-pair' },
      build(t.head.slice(0, 2), t.rows.map((row) => row.slice(0, 2))),
      build(t.head.slice(2), t.rows.map((row) => row.slice(2))));
  }
  return el('div', { class: 'ftable-wrap' }, build(t.head, t.rows));
}

function mapleBlock(lines) {
  const code = [].concat(lines).join('\n');
  const btn = el('button', { type: 'button', class: 'copy', title: 'Kopiér kommandoen', html: `${icon('copy', 15)}<span>Kopiér</span>` });
  btn.addEventListener('click', async () => {
    if (await copyText(code)) flash(btn, `${icon('check', 15)}<span>Kopieret</span>`);
  });
  return el('div', { class: 'fmaple' },
    el('div', { class: 'fmaple-head' }, el('span', { class: 'label' }, 'Maple'), btn),
    el('pre', {}, el('code', {}, code)));
}

function calcBlock(id) {
  const body = el('div', { class: 'fcalc-body' });
  const details = el('details', { class: 'fcalc' },
    el('summary', { html: `${icon('calc', 17)}<span>Regn med formlen</span>` }), body);
  details.addEventListener('toggle', () => {
    if (details.open && !body.childElementCount) mountCalc(body, id);
  });
  return details;
}

/**
 * Bygger kortet for én formel.
 * opts.crumb: vis «Emne › Afsnit» øverst (søgeresultater og favoritter).
 * opts.compact: uden værktøjer og beregner (udskriftsvisningen).
 */
export function formulaCard(topic, section, item, opts = {}) {
  const key = keyOf(topic, item);
  const lines = item.tex ? [].concat(item.tex) : [];
  const card = el('article', {
    class: `fcard${item.wide ? ' wide' : ''}${item.extra ? ' extra' : ''}`,
    id: opts.crumb ? null : cardId(topic, item),
  });

  if (opts.crumb) {
    card.append(el('a', { class: 'crumb', href: `#/${topic.id}/${item.id}` },
      el('span', {}, topic.title), el('span', { class: 'sep', 'aria-hidden': 'true' }, '›'), el('span', {}, section.title)));
  }

  card.append(el('header', { class: 'fcard-head' },
    el('h3', {}, item.name),
    item.extra ? el('span', { class: 'tag', title: 'Ikke en del af kernestoffet' }, 'Supplerende') : null,
    opts.compact ? null : el('div', { class: 'fcard-tools' }, favButton(key, item.name), linkButton(topic, item))));

  if (lines.length) card.append(el('div', { class: 'fbox', html: lines.map((l) => tex(l, true)).join('') }));

  if (item.rows) {
    card.append(el('div', { class: 'frows' }, item.rows.map(([label, formula]) =>
      el('div', { class: 'frow' },
        el('span', { class: 'frow-label', html: math(label) }),
        el('span', { class: 'frow-tex', html: tex(formula, true) })))));
  }

  if (item.table) card.append(table(item.table));
  if (item.note) card.append(el('p', { class: 'fnote', html: math(item.note) }));
  if (item.ex) card.append(el('div', { class: 'fex' }, el('span', { class: 'label' }, 'Eksempel'), el('div', { html: math(item.ex) })));
  if (item.maple) card.append(mapleBlock(item.maple));
  if (item.calc && CALCS[item.calc] && !opts.compact) card.append(calcBlock(item.calc));
  return card;
}
