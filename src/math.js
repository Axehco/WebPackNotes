export function sum(...agrs) {
  return agrs.reduce((p, q) => p + q, 0);
}