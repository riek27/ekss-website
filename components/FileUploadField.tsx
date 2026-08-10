'use client';

import { useRef, useState } from 'react';
import { uploadFile } from '@/app/actions';

export default function FileUploadField({
  currentValue,
  onChange,
  accept = '*',
}: {
  currentValue: string;
  onChange: (url: string) => void;
  accept?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const result = await uploadFile(formData);
    if (result.success && result.url) {
      onChange(result.url);
    } else {
      alert('Upload failed: ' + (result.error || 'Unknown error'));
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={currentValue}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
        placeholder="File path or URL"
      />
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        disabled={uploading}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="px-4 py-2 bg-emerald-green text-white rounded-lg text-sm font-semibold hover:bg-deep-forest transition-colors disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}