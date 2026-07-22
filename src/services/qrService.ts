import QRCode from 'qrcode';
import jsQR from 'jsqr';

export interface QRGenerationOptions {
  width: number;
  margin: number;
  color: { dark: string; light: string };
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

export async function generateQRCodePNG(
  text: string,
  options: QRGenerationOptions
): Promise<string> {
  return QRCode.toDataURL(text, {
    width: options.width,
    margin: options.margin,
    color: options.color,
    errorCorrectionLevel: options.errorCorrectionLevel,
  });
}

export async function generateQRCodeSVG(
  text: string,
  options: QRGenerationOptions
): Promise<string> {
  return QRCode.toString(text, {
    type: 'svg',
    width: options.width,
    margin: options.margin,
    color: options.color,
    errorCorrectionLevel: options.errorCorrectionLevel,
  });
}

export async function scanQRCodeFromImage(imageData: ImageData): Promise<string | null> {
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: 'dontInvert',
  });
  return code?.data ?? null;
}

export function loadImageToImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxDim = 2048;
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w > maxDim || h > maxDim) {
        const scale = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(ctx.getImageData(0, 0, w, h));
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

export function downloadDataURL(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadSVG(svgString: string, filename: string): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
