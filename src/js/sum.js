export default function sun(...agrs) {
  return agrs.reduce((p, c) => p + c, 0);
}
