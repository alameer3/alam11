'use client';

import { useState, useRef } from 'react';
import { 
  CloudArrowUpIcon, 
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface VideoUploadProps {
  onUploadComplete?: (videoData: any) => void;
  maxFileSize?: number; // in MB
  allowedTypes?: string[];
  className?: string;
}

export default function VideoUpload({ 
  onUploadComplete, 
  maxFileSize = 500, // 500MB default
  allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'],
  className = ''
}: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [videoMetadata, setVideoMetadata] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `حجم الملف يجب أن يكون أقل من ${maxFileSize}MB`;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return 'نوع الملف غير مدعوم. الأنواع المدعومة: MP4, WebM, OGG, AVI, MOV';
    }

    return null;
  };

  const handleFileSelect = async (file: File) => {
    setError('');
    setUploadProgress(0);
    setVideoMetadata(null);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploadedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Extract video metadata
    try {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        setVideoMetadata({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          size: file.size,
          type: file.type,
        });
      };

      video.src = url;
    } catch (error) {
      console.error('خطأ في استخراج بيانات الفيديو:', error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('video', uploadedFile);
      formData.append('title', uploadedFile.name);
      formData.append('description', '');
      formData.append('category', 'general');
      formData.append('tags', '');
      formData.append('isPublic', 'true');

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setUploadProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setUploadProgress(100);
          setIsUploading(false);
          onUploadComplete?.(response);
          
          // Reset form
          setUploadedFile(null);
          setPreviewUrl('');
          setVideoMetadata(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } else {
          throw new Error('فشل في رفع الفيديو');
        }
      });

      xhr.addEventListener('error', () => {
        setError('خطأ في الاتصال بالخادم');
        setIsUploading(false);
      });

      xhr.open('POST', '/api/upload/video');
      xhr.send(formData);

    } catch (error) {
      setError('خطأ في رفع الفيديو');
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreviewUrl('');
    setVideoMetadata(null);
    setError('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        {!uploadedFile ? (
          <div className="space-y-4">
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                اسحب وأفلت الفيديو هنا
              </p>
              <p className="text-sm text-gray-500">
                أو انقر لاختيار ملف
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              اختيار ملف
            </button>
            <div className="text-xs text-gray-500">
              الحد الأقصى: {maxFileSize}MB • الأنواع المدعومة: MP4, WebM, OGG, AVI, MOV
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Video Preview */}
            {previewUrl && (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={previewUrl}
                  className="w-full max-h-64 rounded-lg"
                  controls
                />
              </div>
            )}

            {/* Video Metadata */}
            {videoMetadata && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">معلومات الفيديو</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">المدة:</span>
                    <span className="font-medium"> {formatDuration(videoMetadata.duration)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">الدقة:</span>
                    <span className="font-medium"> {videoMetadata.width}×{videoMetadata.height}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">الحجم:</span>
                    <span className="font-medium"> {formatFileSize(videoMetadata.size)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">النوع:</span>
                    <span className="font-medium"> {videoMetadata.type}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>جاري الرفع...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Upload Button */}
            {!isUploading && (
              <button
                onClick={handleUpload}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                رفع الفيديو
              </button>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Upload Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">تعليمات الرفع</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• تأكد من أن الفيديو عالي الجودة</li>
          <li>• الحد الأقصى للحجم: {maxFileSize}MB</li>
          <li>• الأنواع المدعومة: MP4, WebM, OGG, AVI, MOV</li>
          <li>• سيتم مراجعة الفيديو قبل النشر</li>
        </ul>
      </div>
    </div>
  );
}