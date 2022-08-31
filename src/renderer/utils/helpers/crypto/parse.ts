import { Cipher } from 'js-cipher';

export function parseInviteKey(plain: string) {
  const port = '3000';
  const cipher = new Cipher();
  const id = plain.slice(-3);
  return {
    location:
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
      port,
    id: id,
  };
}
