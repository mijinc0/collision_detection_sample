export class MathUtil {
  static mod(a, n) {
    return (a + n) % n;
  }

  static random(max) {
    return Math.floor(Math.random() * max);
  }
}