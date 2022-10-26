import { Cipher } from 'js-cipher';

export function parseInviteKey(plain: string) {
  if (plain.length !== 13) throw new Error('Invalid invite key');
  const port = '3000';
  const cipher = new Cipher();
  const id = plain.slice(-3);
  const location =
    Number.parseInt(
      cipher.decrypt(
        plain.slice(0, -id.length),
        (((id.charCodeAt(id.length - 2) % 26) +
          (id.charCodeAt(id.length - 1) % 26) +
          (id.charCodeAt(id.length - 3) % 26)) %
          25) +
          1,
      ),
      16,
    )
      .toString()
      .split('')
      .map((v, i) => (!(i % 3) && i != 0 ? '.' + v : v))
      .join('')
      .split('.')
      .map((v) => +v)
      .join('.') +
    ':' +
    port;
  if (location.length < 8 + port.length || location.length > 16 + port.length)
    throw new Error('Invalid invite key');
  return { location, id };
}
