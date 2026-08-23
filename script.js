const shapes = document.querySelectorAll('.shape');
const states = new WeakMap();
const timers = new WeakMap();

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createRandomState() {
  return {
    x: randomBetween(-12, 78),
    y: randomBetween(-12, 68),
    r: randomBetween(-12, 12),
    s: randomBetween(0.92, 1.05)
  };
}

function nextState(state) {
  return {
    x: clamp(state.x + randomBetween(-7, 7), -18, 82),
    y: clamp(state.y + randomBetween(-6, 6), -18, 72),
    r: clamp(state.r + randomBetween(-8, 8), -24, 24),
    s: clamp(state.s + randomBetween(-0.025, 0.025), 0.88, 1.08)
  };
}

function applyState(shape, state, duration) {
  shape.style.transition =
    `transform ${duration}s cubic-bezier(0.22, 0.61, 0.36, 1)`;
  shape.style.transform =
    `translate(${state.x}vw, ${state.y}vh) rotate(${state.r}deg) scale(${state.s})`;
}

function move(shape) {
  const current = states.get(shape);
  const state = nextState(current);
  const duration = randomBetween(8, 14);

  states.set(shape, state);
  applyState(shape, state, duration);

  const timer = setTimeout(() => move(shape), duration * 1000);
  timers.set(shape, timer);
}

shapes.forEach((shape, index) => {
  const state = createRandomState();
  states.set(shape, state);
  applyState(shape, state, 0);

  setTimeout(() => move(shape), 150 + index * 350 + randomBetween(0, 500));
});
