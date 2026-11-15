const clamp = (n, low, high) => Math.min(high, Math.max(low, n));
export class LookState {
  constructor() { this.reset(); }
  reset() { this.yaw = .58; this.pitch = -.3; this.distance = 5; }
  rotate(horizontal, vertical) {
    this.yaw = ((this.yaw + horizontal + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
    this.pitch = clamp(this.pitch + vertical, -1.12, .85);
  }
  zoom(factor) { this.distance = clamp(this.distance / factor, 2.3, 11); }
  forward() { return { x: -Math.sin(this.yaw), y: 0, z: -Math.cos(this.yaw) }; }
}

// A third-person follow rig with independent gaze. Vertical gestures change the
// direction you look, rather than stopping at an isometric orbit constraint.
export function createFollowCamera(camera, canvas, root, blocked) {
  const state = new LookState(), pointers = new Map(), held = new Set();
  let pinch = 0, pinchDistance = 5;
  const separation = () => { const [a,b] = [...pointers.values()]; return Math.hypot(a.x-b.x,a.y-b.y); };
  canvas.addEventListener('contextmenu', event => event.preventDefault());
  canvas.addEventListener('pointerdown', event => {
    if (blocked() || event.button === 1) return;
    pointers.set(event.pointerId, { x:event.clientX, y:event.clientY }); canvas.setPointerCapture(event.pointerId);
    if (pointers.size === 2) { pinch = separation(); pinchDistance = state.distance; }
  });
  canvas.addEventListener('pointermove', event => {
    const old = pointers.get(event.pointerId); if (!old || blocked()) return;
    pointers.set(event.pointerId, { x:event.clientX, y:event.clientY });
    if (pointers.size > 1) {
      const current = separation(); if (pinch > 0 && current > 0) state.distance = clamp(pinchDistance * pinch / current,2.3,11);
    } else state.rotate(-(event.clientX-old.x)*.006, -(event.clientY-old.y)*.005);
  });
  const release = event => { pointers.delete(event.pointerId); if (pointers.size < 2) pinch = 0; };
  for (const name of ['pointerup','pointercancel','lostpointercapture']) canvas.addEventListener(name,release);
  canvas.addEventListener('wheel',event=>{event.preventDefault();if(!blocked())state.zoom(Math.exp(-clamp(event.deltaY,-200,200)*.002));},{passive:false});
  for (const button of document.querySelectorAll('[data-look]')) {
    const name = button.dataset.look;
    button.addEventListener('pointerdown', event=>{event.preventDefault();button.setPointerCapture(event.pointerId);held.add(name);});
    const stop=()=>held.delete(name);
    for (const event of ['pointerup','pointercancel','lostpointercapture']) button.addEventListener(event,stop);
    button.addEventListener('click',()=>turn(name,.14));
  }
  function turn(name, amount) {
    if (blocked()) return;
    state.rotate(name==='left'?amount:name==='right'?-amount:0,name==='up'?amount:name==='down'?-amount:0);
  }
  function stop() { pointers.clear();held.clear(); }
  window.addEventListener('blur',stop);window.addEventListener('resize',stop);window.addEventListener('pagehide',stop);
  return {
    state, reset:()=>state.reset(), zoom:factor=>state.zoom(factor), forward:()=>state.forward(),
    update(dt, anchor) {
      if (!anchor) return;
      for (const name of held) turn(name,dt*1.5);
      const { yaw,pitch,distance }=state,forward=state.forward();
      camera.position.set(anchor.x-forward.x*distance,(anchor.y||0)+1.3+distance*.31,anchor.z-forward.z*distance);
      camera.lookAt(camera.position.x+forward.x*Math.cos(pitch),camera.position.y+Math.sin(pitch),camera.position.z+forward.z*Math.cos(pitch));
      root.dataset.lookYaw=yaw.toFixed(3);root.dataset.lookPitch=pitch.toFixed(3);root.dataset.cameraDistance=distance.toFixed(2);
    },
  };
}
