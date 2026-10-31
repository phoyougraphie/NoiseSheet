const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/main.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Petit double de test : pas de rendu, de propagation DOM ni d'API TV réelle.
function boot() {
  const listeners = new Map();
  const timers = new Map();
  const elements = new Map();
  let nextTimer = 0;
  let exits = 0;
  const document = {
    hidden: false,
    activeElement: { id: '' },
    getElementById(id) {
      assert.ok(elements.has(id), `Élément HTML manquant : ${id}`);
      return elements.get(id);
    },
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(callback);
    },
  };
  for (const [, id] of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) {
    const element = {
      id,
      innerHTML: '',
      focus() { document.activeElement = element; },
      blur() { document.activeElement = { id: '' }; },
    };
    elements.set(id, element);
  }
  class FixedDate {
    getHours() { return 12; }
    getMinutes() { return 3; }
    getSeconds() { return 4; }
  }
  const context = vm.createContext({
    document,
    window: {},
    console: { log() {} },
    Date: FixedDate,
    setTimeout(callback, delay) {
      const id = ++nextTimer;
      timers.set(id, { callback, delay });
      return id;
    },
    clearTimeout(id) { timers.delete(id); },
    tizen: { application: { getCurrentApplication: () => ({ exit() { exits++; } }) } },
  });
  vm.runInContext(source, context, { filename: 'js/main.js', timeout: 1000 });
  context.window.onload();
  return {
    document,
    timers,
    get exits() { return exits; },
    key(keyCode) {
      for (const callback of listeners.get('keydown') || []) callback({ keyCode });
    },
    tick() {
      // Un tick n'exécute que les timers déjà planifiés, comme une file d'événements.
      const pending = [...timers];
      for (const [id, timer] of pending) {
        if (timers.delete(id)) timer.callback();
      }
    },
    text(id) { return document.getElementById(id).innerHTML; },
    get focus() { return document.activeElement.id; },
  };
}

test('les ressources HTML et du manifeste existent dans le dépôt', () => {
  const manifest = fs.readFileSync(path.join(root, 'config.xml'), 'utf8');
  const references = [
    ...[...html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/g)].map(match => match[1]),
    ...[...manifest.matchAll(/<(?:content|icon)\s+src=["']([^"']+)["']/g)].map(match => match[1]),
  ].filter(ref => !ref.startsWith('#') && !/^[a-z]+:/i.test(ref));
  assert.ok(references.includes('index.html'), 'Entrée Tizen référencée');
  assert.ok(references.includes('icon.png'), 'Icône référencée');
  for (const ref of references) {
    assert.ok(fs.statSync(path.join(root, ref)).isFile(), `Ressource manquante : ${ref}`);
  }
});

test('au lancement, le bouton reçoit le focus sans lancer de temporisateur', () => {
  const app = boot();
  assert.equal(app.focus, 'mybutton');
  assert.equal(app.timers.size, 0);
});

test('Haut et Bas permettent de passer du bouton au menu et de revenir', () => {
  for (const key of [38, 40]) {
    const app = boot();
    app.key(key);
    assert.equal(app.focus, 'home');
    app.key(key);
    assert.equal(app.focus, 'mybutton');
  }
});

test('Droite et Gauche parcourent le menu dans les deux sens avec bouclage', () => {
  const app = boot();
  app.key(38);
  for (const expected of ['about_us', 'contact_us', 'home']) {
    app.key(39);
    assert.equal(app.focus, expected);
  }
  for (const expected of ['contact_us', 'about_us', 'home']) {
    app.key(37);
    assert.equal(app.focus, expected);
  }
});

test('Entrée sur un lien affiche le texte du modèle, effacé en naviguant', () => {
  const app = boot();
  app.key(38);
  app.key(13);
  assert.equal(app.text('divbutton0'), 'Please develop the page');
  app.key(39);
  assert.equal(app.text('divbutton0'), '');
  assert.equal(app.timers.size, 0);
});

test('Entrée démarre puis arrête l’horloge ; le tick en attente termine l’arrêt', () => {
  const app = boot();
  app.key(13);
  assert.equal(app.text('mybutton'), 'Stop Clock');
  assert.equal(app.text('divbutton2'), 'Current time: 12:03:04');
  assert.equal(app.timers.size, 1);
  assert.equal([...app.timers.values()][0].delay, 1000);
  app.tick();
  assert.equal(app.timers.size, 1);
  app.key(13);
  assert.equal(app.text('mybutton'), 'Start Clock');
  app.tick();
  assert.equal(app.timers.size, 0);
  assert.equal(app.text('divbutton2').trim(), '');
});

test('Retour et Exit demandent la sortie via l’API Tizen simulée', () => {
  for (const key of [10009, 10182]) {
    const app = boot();
    app.key(key);
    assert.equal(app.exits, 1);
  }
});

test('une touche inconnue ne déplace pas le focus et ne quitte pas', () => {
  const app = boot();
  app.key(9999);
  assert.equal(app.focus, 'mybutton');
  assert.equal(app.exits, 0);
  assert.equal(app.timers.size, 0);
});
