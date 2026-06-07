import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';

export type ImagePreset = 'hero' | 'gallery' | 'thumbnail' | 'avatar';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  defaultUrl?: string;
  label?: string;
  className?: string;
  imageType?: ImagePreset;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  defaultUrl = '',
  label = 'Upload Image Asset',
  className = '',
  imageType = 'thumbnail',
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>(defaultUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadState('error');
      setErrorMessage('Please select an image file (PNG, JPG, WEBP, etc.)');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadState('error');
      setErrorMessage('Image size exceeds limit. Max allowed is 8MB.');
      return;
    }

    setUploadState('uploading');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/upload?type=${imageType}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUploadState('success');
        setPreviewUrl(data.url);
        onUploadSuccess(data.url);
      } else {
        setUploadState('error');
        setErrorMessage(data.message || 'Error occurred during image upload');
      }
    } catch (err: any) {
      setUploadState('error');
      setErrorMessage('Network error during upload: ' + err.message);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <span className="text-[10px] font-bold text-amber-900 block uppercase tracking-wider">
          {label}
        </span>
      )}

      <div
        className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 flex flex-col items-center justify-center min-h-[140px] text-center ${
          dragActive
            ? 'border-amber-600 bg-amber-50/50 scale-[1.01]'
            : 'border-amber-200 hover:border-amber-400 bg-amber-50/10 hover:bg-amber-50/25'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {uploadState === 'idle' && (
          <div className="space-y-2 flex flex-col items-center">
            {previewUrl ? (
              <div className="relative group w-32 h-20 rounded-lg overflow-hidden border border-amber-200 shadow-sm bg-white">
                <img
                  src={previewUrl}
                  alt="Current asset Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onButtonClick(); }}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold tracking-wider transition-opacity duration-150"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1 animate-pulse" />
                  Change Image
                </button>
              </div>
            ) : (
              <div className="p-3 bg-amber-100/50 rounded-full text-amber-700">
                <UploadCloud className="w-5 h-5" />
              </div>
            )}
            <div className="text-xs">
              <button
                type="button"
                onClick={onButtonClick}
                className="font-bold text-amber-800 hover:text-amber-950 underline decoration-dotted underline-offset-2"
              >
                Click to browse files
              </button>
              <span className="text-amber-600/70"> or drag and drop image</span>
            </div>
            <p className="text-[9px] text-amber-700/60 font-mono">PNG, JPG, WEBP up to 8MB → compressed WebP via CDN</p>
          </div>
        )}

        {uploadState === 'uploading' && (
          <div className="space-y-2 flex flex-col items-center py-4">
            <Loader2 className="w-6 h-6 text-amber-700 animate-spin" />
            <p className="text-xs font-semibold text-amber-900 animate-pulse">Compressing & Uploading...</p>
            <p className="text-[10px] text-amber-700/60 font-mono">Converting to WebP · Storing to CDN</p>
          </div>
        )}

        {uploadState === 'success' && (
          <div className="space-y-2 flex flex-col items-center py-2">
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Upload Complete
            </div>
            <div className="w-24 h-16 rounded-md overflow-hidden border border-emerald-200 shadow-sm bg-white">
              <img
                src={previewUrl}
                alt="Uploaded Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button
              type="button"
              onClick={onButtonClick}
              className="text-[10px] text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3 h-3" />
              Upload Different Image
            </button>
          </div>
        )}

        {uploadState === 'error' && (
          <div className="space-y-2 flex flex-col items-center py-4">
            <div className="p-3 bg-rose-50 rounded-full text-rose-600 border border-rose-200">
              <AlertCircle className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-rose-900">Upload Failed</p>
            <p className="text-[10px] text-rose-700 max-w-[200px] leading-relaxed">{errorMessage}</p>
            <button
              type="button"
              onClick={() => setUploadState('idle')}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[10px] font-bold shadow transition-all mt-1"
            >
              Retry Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
