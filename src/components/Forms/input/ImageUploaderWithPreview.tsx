import React, { useRef, useState } from 'react';
import FileInput from './FileInput';

interface Props {
  onImageReady: (base64: string | null) => void;
}

const ImageUploaderWithPreview: React.FC<Props> = ({ onImageReady }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 512, 512);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setPreviewUrl(URL.createObjectURL(blob));

                // ✅ แปลง blob เป็น base64 string
                const blobReader = new FileReader();
                blobReader.onloadend = () => {
                  const base64String = blobReader.result as string;
                  onImageReady(base64String); // ✅ ส่ง base64 ไปยัง parent component
                };
                blobReader.readAsDataURL(blob);
              }
            },
            'image/jpeg',
            0.9,
          );
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setPreviewUrl(null);
    onImageReady(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <FileInput
        ref={fileInputRef}
        accept="image/jpeg"
        onChange={handleFileChange}
        className="w-full"
      />
      {previewUrl && (
        <>
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded-full w-32 h-32 border object-cover"
          />
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            ล้างรูป
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUploaderWithPreview;
