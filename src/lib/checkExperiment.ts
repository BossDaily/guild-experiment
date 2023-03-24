export function checkExperiment(arg: string) {
  let e, t = arg, a = 0, c = 3432918353, h = 461845907, r = 0;
  for (r = 0; r < t.length - t.length % 4; r += 4) {
    e = (5 * (65535 & (e = (e ^ (a = (65535 & (a = (a = (65535 & (a = 255 & t.charCodeAt(r) | (255 & t.charCodeAt(r + 1)) << 8 | (255 & t.charCodeAt(r + 2)) << 16 | (255 & t.charCodeAt(r + 3)) << 24)) ^ c + ((a >>> 16) & 65535) << 16)) << 15 | a >>> 17)) + ((a >>> 16) & h) << 16)) << 13 | e >>> 19)) + ((5 * (e >>> 16) & 65535) << 16) + 3864292196;
  }
  switch (a = 0, t.length % 4) {
    case 3:
      a ^= (255 & t.charCodeAt(r + 2)) << 16;
    case 2:
      a ^= (255 & t.charCodeAt(r + 1)) << 8;
    case 1:
      e ^= (a = (65535 & (a = (a = (65535 & (a ^= 255 & t.charCodeAt(r))) ^ c + ((a >>> 16) & 65535) << 16)) << 15 | a >>> 17)) + ((a >>> 16) & h) << 16;
  }
  e ^= t.length, e = 2246822507 * (65535 & (e ^= e >>> 16)) + ((2246822507 * (e >>> 16) & 65535) << 16), e = 3266489909 * (65535 & (e ^= e >>> 13)) + ((3266489909 * (e >>> 16) & 65535) << 16), e ^= e >>> 16, e >>>= 0;
  const result = e % 1e4;
}