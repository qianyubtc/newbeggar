export function setupMusic(root) {
  const audio = document.getElementById('world-bgm');
  const button = document.getElementById('world-music');
  if (!audio || !button) return;
  let enabled = true, unlocked = false, playing = false;
  try { enabled = localStorage.getItem('sfx') !== '0'; } catch {}
  audio.volume = .4;
  function paint() {
    const label = !enabled ? '开启背景音乐' : playing ? '关闭背景音乐' : '播放背景音乐';
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(enabled));
    button.title = label;
    button.classList.toggle('muted', !enabled);
    button.querySelector('span').textContent = !enabled ? '♪ 静音' : playing ? '♫ 音乐' : '♫ 播放';
    root.dataset.music = !enabled ? 'muted' : playing ? 'playing' : 'ready';
  }
  function pause() { audio.pause(); playing = false; paint(); }
  function play() {
    if (!enabled || !unlocked || document.hidden) return;
    audio.play().then(() => {
      if (!enabled || document.hidden) { pause(); return; }
      playing = true; paint();
    }).catch(() => { playing = false; paint(); });
  }
  // Start only from an intentional gesture. No background download or sound on entry.
  function gesture(event) {
    if (event.target.closest?.('#world-music')) return;
    unlocked = true; play();
  }
  document.addEventListener('pointerdown', gesture, { capture: true, passive: true });
  document.addEventListener('keydown', gesture, { capture: true });
  button.addEventListener('click', () => {
    unlocked = true;
    if (enabled && playing) enabled = false;
    else enabled = true;
    try { localStorage.setItem('sfx', enabled ? '1' : '0'); } catch {}
    if (enabled) play(); else pause();
    paint();
  });
  audio.addEventListener('playing', () => { playing = true; paint(); });
  audio.addEventListener('pause', () => { playing = false; paint(); });
  audio.addEventListener('error', () => { playing = false; paint(); });
  document.addEventListener('visibilitychange', () => document.hidden ? pause() : play());
  window.addEventListener('pagehide', pause);
  window.addEventListener('pageshow', () => { if (unlocked) play(); });
  window.addEventListener('storage', event => {
    if (event.key !== 'sfx') return;
    enabled = event.newValue !== '0';
    if (enabled) play(); else pause();
    paint();
  });
  paint();
}
