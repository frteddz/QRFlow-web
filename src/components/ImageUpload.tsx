import { useState, useRef, type DragEvent } from 'react';

interface ImageUploadProps {
  imagePreview: string | null;
  onFileChange: (file: File | null) => void;
}

const dropzoneStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '40px 24px',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-xl)',
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
  background: 'var(--color-surface)',
  minHeight: '200px',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
};

const previewImageStyle: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '300px',
  borderRadius: 'var(--radius-md)',
  objectFit: 'contain',
};

const clearBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: '8px',
  right: '8px',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  border: 'none',
  background: 'var(--color-surface)',
  color: 'var(--color-text-secondary)',
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-md)',
};

export function ImageUpload({ imagePreview, onFileChange }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onFileChange(file);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
  };

  const handleClear = () => onFileChange(null);

  const activeDropzoneStyle: React.CSSProperties = {
    ...dropzoneStyle,
    borderColor: isDragging ? 'var(--color-primary)' : 'var(--color-border)',
    background: isDragging ? 'var(--color-primary-light)' : 'var(--color-surface)',
  };

  return (
    <div
      style={activeDropzoneStyle}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={!imagePreview ? handleClick : undefined}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
      {imagePreview ? (
        <>
          <img src={imagePreview} alt="Upload preview" style={previewImageStyle} />
          <button style={clearBtnStyle} onClick={(e) => { e.stopPropagation(); handleClear(); }}>
            ×
          </button>
        </>
      ) : (
        <>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>
              Upload an image
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
              Drag & drop or click to browse
            </p>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
            Supports PNG, JPG, WebP
          </p>
        </>
      )}
    </div>
  );
}
