import { useState, useCallback } from 'react';
import { type QRCodeType, formatQRData } from '../utils/qrUtils';
import { generateQRCodePNG, generateQRCodeSVG } from '../services/qrService';
import type { QRGenerationOptions } from '../services/qrService';

export const DEFAULT_QR_OPTIONS: QRGenerationOptions = {
  width: 400,
  margin: 2,
  color: { dark: '#000000', light: '#ffffff' },
  errorCorrectionLevel: 'M',
};

export function useQR() {
  const [type, setType] = useState<QRCodeType>('url');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [options, setOptions] = useState<QRGenerationOptions>(DEFAULT_QR_OPTIONS);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [svgString, setSvgString] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const qrData = formatQRData(type, formData);
      if (!qrData) {
        throw new Error('Please fill in the required fields');
      }
      const [png, svg] = await Promise.all([
        generateQRCodePNG(qrData, options),
        generateQRCodeSVG(qrData, options),
      ]);
      setDataUrl(png);
      setSvgString(svg);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate QR code';
      setError(message);
      setDataUrl(null);
      setSvgString(null);
    } finally {
      setLoading(false);
    }
  }, [type, formData, options]);

  const updateOption = useCallback(
    <K extends keyof QRGenerationOptions>(key: K, value: QRGenerationOptions[K]) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateFormField = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setType('url');
    setFormData({});
    setOptions(DEFAULT_QR_OPTIONS);
    setDataUrl(null);
    setSvgString(null);
    setError(null);
  }, []);

  return {
    type,
    setType,
    formData,
    updateFormField,
    options,
    updateOption,
    dataUrl,
    svgString,
    loading,
    error,
    generate,
    reset,
  };
}
