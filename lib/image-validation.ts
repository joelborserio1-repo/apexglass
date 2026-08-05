const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 15 * 1024 * 1024;
const MAX_DIMENSION = 12000;

function dimensions(bytes: Uint8Array, type: string) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (type === "image/png" && bytes.length >= 24) return { width: view.getUint32(16), height: view.getUint32(20) };
  if (type === "image/webp" && bytes.length >= 30 && String.fromCharCode(...bytes.slice(12, 16)) === "VP8X") {
    const read24 = (at: number) => bytes[at] | (bytes[at + 1] << 8) | (bytes[at + 2] << 16);
    return { width: read24(24) + 1, height: read24(27) + 1 };
  }
  if (type === "image/jpeg") {
    let i = 2;
    while (i + 8 < bytes.length) {
      if (bytes[i] !== 0xff) { i++; continue; }
      const marker = bytes[i + 1];
      const length = view.getUint16(i + 2);
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
        return { height: view.getUint16(i + 5), width: view.getUint16(i + 7) };
      }
      if (length < 2) break;
      i += length + 2;
    }
  }
  throw new Error("Unable to read image dimensions");
}

export async function validateImage(file: File) {
  if (!TYPES.has(file.type)) throw new Error("Use a JPEG, PNG or WebP image");
  if (!file.size || file.size > MAX_BYTES) throw new Error("Images must be under 15 MB");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const size = dimensions(bytes, file.type);
  if (size.width < 600 || size.height < 400) throw new Error("Images must be at least 600 × 400 pixels");
  if (size.width > MAX_DIMENSION || size.height > MAX_DIMENSION) throw new Error("Image dimensions are too large");
  const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  return { bytes, extension, ...size };
}
