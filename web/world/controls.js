export function stickVector(dx, dy, radius = 42) {
  const distance = Math.hypot(dx, dy);
  if (distance < 9) return { x: 0, y: 0, px: dx, py: dy };
  const strength = Math.min(1, (distance - 9) / (radius - 9));
  return { x: dx / distance * strength, y: dy / distance * strength, px: dx / distance * Math.min(radius, distance), py: dy / distance * Math.min(radius, distance) };
}

export function bindJoystick(base, knob, onStart, onEnd) {
  const state = { active: false, x: 0, y: 0 };
  let pointer = null, center = { x: 0, y: 0 };
  function reset() {
    pointer = null; state.active = false; state.x = 0; state.y = 0;
    knob.style.transform = 'translate(0px,0px)'; base.classList.remove('held');
  }
  function move(event) {
    if (event.pointerId !== pointer) return;
    const vector = stickVector(event.clientX - center.x, event.clientY - center.y, base.clientWidth * .31);
    state.x = vector.x; state.y = vector.y;
    knob.style.transform = `translate(${vector.px}px,${vector.py}px)`;
  }
  base.addEventListener('pointerdown', event => {
    if (pointer !== null || event.button > 0) return;
    event.preventDefault(); onStart();
    pointer = event.pointerId;
    const rect = base.getBoundingClientRect(); center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    base.setPointerCapture(pointer); state.active = true; base.classList.add('held'); move(event);
  });
  base.addEventListener('pointermove', move);
  function release(event) { if (event.pointerId === pointer) { reset(); onEnd(); } }
  for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) base.addEventListener(name, release);
  return { state, reset };
}

export function setupWorldControls({ root, stage, canvas, onStop, onNotice, onZoom }) {
  const gate = document.getElementById('world-orientation');
  let portraitDismissed = false, touch = false, portrait = false;
  const joystick = bindJoystick(document.getElementById('joystick-base'), document.getElementById('joystick-knob'), () => { onStop(); canvas.focus({ preventScroll: true }); }, onStop);
  function layout() {
    const editing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
    touch = root.dataset.mobile === 'true' || matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) <= 600;
    if (!editing) portrait = innerHeight > innerWidth;
    root.classList.toggle('touch-layout', touch);
    root.classList.toggle('landscape', !portrait);
    root.classList.toggle('portrait', portrait);
    if (touch && portrait && !portraitDismissed && !editing) {
      if (!gate.open) { onStop(); gate.showModal(); }
    } else if (gate.open) gate.close();
    onStop();
  }
  async function fullscreen(landscape = false) {
    onStop();
    if (document.fullscreenElement && !landscape) {
      await document.exitFullscreen().catch(() => {}); return;
    }
    try {
      if (!document.fullscreenElement) await root.requestFullscreen({ navigationUI: 'hide' });
      if (landscape && screen.orientation?.lock) await screen.orientation.lock('landscape');
    } catch {
      if (landscape) document.getElementById('rotate-copy').textContent = '请关闭系统旋转锁定，再将手机横过来。也可以继续竖屏体验。';
      else onNotice('横屏后可获得更完整的街景；可在系统浏览器中全屏打开');
    }
  }
  document.getElementById('rotate-enter').addEventListener('click', () => fullscreen(true));
  document.getElementById('rotate-skip').addEventListener('click', () => { portraitDismissed = true; gate.close(); });
  gate.addEventListener('cancel', () => { portraitDismissed = true; });
  document.getElementById('world-fullscreen').addEventListener('click', () => fullscreen(touch && portrait));
  document.getElementById('zoom-in').addEventListener('click', () => onZoom(1.2));
  document.getElementById('zoom-out').addEventListener('click', () => onZoom(1 / 1.2));
  const panels = ['world-card','world-directory','world-night','world-night-guide','world-shops','world-social'].map(id=>document.getElementById(id));
  const updatePanels = () => { const open = panels.some(panel => !panel.hidden); root.classList.toggle('panel-open', open); if (open) onStop(); };
  const panelObserver = new MutationObserver(updatePanels);
  for (const panel of panels) panelObserver.observe(panel, { attributes: true, attributeFilter: ['hidden'] });
  window.addEventListener('resize', layout);
  window.addEventListener('orientationchange', layout);
  document.addEventListener('fullscreenchange', layout);
  document.addEventListener('visibilitychange', () => { if (document.hidden) onStop(); });
  window.addEventListener('blur', onStop);
  window.addEventListener('pagehide', onStop);
  layout();
  return { stick: joystick.state, resetJoystick: joystick.reset, get touch() { return touch; }, get blocked() { return gate.open || root.classList.contains('panel-open') || root.classList.contains('cinematic'); } };
}
