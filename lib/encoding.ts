// Fixed shuffled character set
const characters = "QWERTYUIOPASDFGHJKLZXCVBNM0987654321";
const base = characters.length;

export function encode(id: number): string {
  let encoded = "";

  // Convert the ID to a base-N string using the fixed character set
  while (id > 0) {
    const remainder = id % base;
    encoded = characters[remainder] + encoded;
    id = Math.floor(id / base);
  }

  // Ensure the encoded string is exactly 3 characters long
  return encoded.padStart(3, characters[0]);
}

export function decode(encoded: string): number {
  let decoded = 0;

  // Convert the base-N string back to a number using the fixed character set
  for (let i = 0; i < encoded.length; i++) {
    const index = characters.indexOf(encoded[i]);
    decoded = decoded * base + index;
  }

  return decoded;
}
