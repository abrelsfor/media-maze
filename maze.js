/**
 * MAZE ENGINE
 * Handles navigation, transitions, and rendering.
 */

const Maze = (() => {
  let currentNodeId = null;
  let history = [];

  // ── DOM REFERENCES ─────────────────────────────────────────────────────────
  const screens = {
    intro: document.getElementById('screen-intro'),
    choice: document.getElementById('screen-choice'),
    deadend: document.getElementById('screen-deadend'),
  };

  const els = {
    // Intro
    introTitle: document.getElementById('intro-title'),
    introBody: document.getElementById('intro-body'),
    enterBtn: document.getElementById('btn-enter'),

    // Choice
    leftImg: document.getElementById('choice-left-img'),
    rightImg: document.getElementById('choice-right-img'),
    leftBtn: document.getElementById('choice-left-btn'),
    rightBtn: document.getElementById('choice-right-btn'),
    choiceRestart: document.getElementById('choice-restart'),

    // Dead end
    deadendText: document.getElementById('deadend-text'),
    deadendRestart: document.getElementById('deadend-restart'),
  };

  // ── HELPERS ────────────────────────────────────────────────────────────────
  function showScreen(name) {
    Object.keys(screens).forEach(k => {
      screens[k].classList.remove('active');
      screens[k].setAttribute('aria-hidden', 'true');
      screens[k].style.zIndex = '0';
    });
    screens[name].classList.add('active');
    screens[name].setAttribute('aria-hidden', 'false');
    screens[name].style.zIndex = '1';
    screens[name].scrollTop = 0;
  }

  function transition(fn) {
    document.body.classList.add('transitioning');
    setTimeout(() => {
      fn();
      document.body.classList.remove('transitioning');
    }, 350);
  }

  // ── RENDER FUNCTIONS ───────────────────────────────────────────────────────
  function renderIntro() {
    const cfg = MAZE_CONFIG.intro;
    els.introTitle.textContent = cfg.title;
    els.introBody.innerHTML = cfg.body;
    els.enterBtn.textContent = cfg.enterLabel || 'Enter';
  }

  function renderChoice(nodeId) {
    const node = MAZE_CONFIG.nodes[nodeId];
    if (!node || node.type !== 'choice') return;

    // Left image
    els.leftImg.src = node.left.image;
    els.leftImg.alt = node.left.alt || '';

    // Right image
    els.rightImg.src = node.right.image;
    els.rightImg.alt = node.right.alt || '';

    // Wire up buttons
    els.leftBtn.onclick = () => navigate(node.left.goTo);
    els.rightBtn.onclick = () => navigate(node.right.goTo);

    showScreen('choice');
  }

  function renderDeadend(nodeId) {
    const node = MAZE_CONFIG.nodes[nodeId];
    if (!node || node.type !== 'deadend') return;

    els.deadendText.innerHTML = node.text || '';
    showScreen('deadend');
  }

  // ── NAVIGATION ─────────────────────────────────────────────────────────────
  function navigate(nodeId) {
    const node = MAZE_CONFIG.nodes[nodeId];
    if (!node) {
      console.warn('Node not found:', nodeId);
      return;
    }

    history.push(currentNodeId);
    currentNodeId = nodeId;

    transition(() => {
      if (node.type === 'choice') {
        renderChoice(nodeId);
      } else if (node.type === 'deadend') {
        renderDeadend(nodeId);
      }
    });
  }

  function restart() {
    history = [];
    currentNodeId = null;
    transition(() => {
      renderIntro();
      showScreen('intro');
    });
  }

  // ── INIT ───────────────────────────────────────────────────────────────────
  function init() {
    renderIntro();
    showScreen('intro');

    els.enterBtn.addEventListener('click', () => {
      transition(() => {
        currentNodeId = MAZE_CONFIG.start;
        history = [];
        renderChoice(MAZE_CONFIG.start);
      });
    });

    els.choiceRestart.addEventListener('click', restart);
    els.deadendRestart.addEventListener('click', restart);

    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') restart();
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', Maze.init);
