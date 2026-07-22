import { useState, useCallback } from 'react';
import { scanQRCodeFromImage, loadImageToImageData } from '../services/qrService';
import { parseQRContent } from '../utils/qrUtils';

export interface ScanResult {
  text: string;
  type: string;
  data?: Record<string, string>;
}

export function useQRScan() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setFile = useCallback((file: File | null) => {
    setImageFile(file);
    setResult(null);
    setError(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  }, [imagePreview]);

  const scan = useCallback(async () => {
    if (!imageFile) {
      setError('Please select an image first');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const imageData = await loadImageToImageData(imageFile);
      const decoded = await scanQRCodeFromImage(imageData);
      if (decoded) {
        const parsed = parseQRContent(decoded);
        setResult({ text: decoded, ...parsed });
      } else {
        setError('No QR code found in the image');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to scan QR code';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [imageFile]);

  const reset = useCallback(() => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  }, [imagePreview]);

  return {
    imageFile,
    imagePreview,
    setFile,
    result,
    loading,
    error,
    scan,
    reset,
  };
}
