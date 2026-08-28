"use client";

import {
  getOglesbyCollection,
  getOglesbyStoragePath,
  oglesbyAuth,
  oglesbyStorage,
} from "@calcom/lib/firebase/oglesbyFirebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CheckCircle, FileText, ShieldAlert, Upload, X } from "lucide-react";
import { useState } from "react";

interface DocumentUploaderProps {
  category?: "users" | "consultations" | "intake_forms" | "documents";
  entityId?: string;
  onUploadSuccess?: (downloadUrl: string, storagePath: string) => void;
}

export function DocumentUploader({
  category = "documents",
  entityId = "general_intake",
  onUploadSuccess,
}: DocumentUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 20 * 1024 * 1024) {
        setErrorMessage("File exceeds 20MB maximum size limit.");
        return;
      }
      setErrorMessage(null);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setErrorMessage(null);
    setUploadProgress(0);

    try {
      const storagePath = getOglesbyStoragePath(category, entityId, selectedFile.name);
      const storageRef = ref(oglesbyStorage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Storage upload error:", error);
          setErrorMessage("Upload failed. Security rule or network error.");
          setUploadProgress(null);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadedUrl(downloadUrl);
          setUploadProgress(null);

          try {
            const currentUser = oglesbyAuth.currentUser;
            if (currentUser) {
              const docsRef = getOglesbyCollection("documents");
              await addDoc(docsRef, {
                userId: currentUser.uid,
                fileName: selectedFile.name,
                fileSize: selectedFile.size,
                fileType: selectedFile.type || "application/octet-stream",
                downloadUrl: downloadUrl,
                storagePath: storagePath,
                category: category,
                entityId: entityId,
                createdAt: serverTimestamp(),
              });
            }
          } catch (dbErr) {
            console.error("Error saving document metadata to Firestore:", dbErr);
          }

          if (onUploadSuccess) {
            onUploadSuccess(downloadUrl, storagePath);
          }
        }
      );
    } catch (err: any) {
      console.error("Storage init error:", err);
      setErrorMessage("Failed to initialize storage upload.");
      setUploadProgress(null);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-cyan-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
          <Upload className="w-4 h-4 text-cyan-600" />
          <span>Secure Document & HIPAA File Upload</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Isolated Cloud Storage
        </span>
      </div>

      {uploadedUrl ? (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
          <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
          <p className="text-xs font-bold text-slate-800">Document Uploaded Successfully!</p>
          <p className="text-[11px] text-slate-500 font-mono break-all max-w-sm mx-auto">
            {selectedFile?.name}
          </p>
          <button
            type="button"
            onClick={() => {
              setUploadedUrl(null);
              setSelectedFile(null);
            }}
            className="text-xs font-semibold text-cyan-700 hover:underline pt-1">
            Upload Another Document
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="border-2 border-dashed border-cyan-200/80 hover:border-cyan-400 rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer bg-cyan-50/20 hover:bg-cyan-50/50 transition-colors">
            <FileText className="w-8 h-8 text-cyan-600 mb-2" />
            <span className="text-xs font-semibold text-slate-700">
              {selectedFile ? selectedFile.name : "Click or drag medical intake document here"}
            </span>
            <span className="text-[10px] text-slate-400 mt-1">PDF, DOCX, PNG, JPG (Max 20MB)</span>
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>

          {errorMessage && (
            <div className="flex items-center space-x-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {uploadProgress !== null && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600 font-semibold">
                <span>Uploading to oglesby_healthcare/</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-600 h-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {selectedFile && uploadProgress === null && (
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleUpload}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-cyan-700 hover:bg-cyan-800 shadow-sm transition-colors">
                Upload File Securely
              </button>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
