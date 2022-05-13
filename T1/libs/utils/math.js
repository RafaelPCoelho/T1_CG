const lerp = (from, to, step) => from + (to - from) * step;
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
const slerp = (from, to, step) => lerp(from, to, clamp(step, 0, 1));

export { lerp, clamp, slerp };
