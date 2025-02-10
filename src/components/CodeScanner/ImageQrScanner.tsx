import React, { useState, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Copy, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { BrowserMultiFormatReader, DecodeHintType } from "@zxing/library";
import { loadImage, readFileAsDataURL } from "@/utils/helper";

const ImageQrScanner = () => {
   const [result, setResult] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [isProcessing, setIsProcessing] = useState(false);
   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleImageUpload = useCallback(async (file: File) => {
      setError(null);
      setIsProcessing(true);
      setResult(null);

      try {
         const imageUrl = await readFileAsDataURL(file);
         setPreviewUrl(imageUrl);
         const img = await loadImage(imageUrl);

         const hints = new Map();
         hints.set(DecodeHintType.TRY_HARDER, true);

         const reader = new BrowserMultiFormatReader(hints);
         try {
            const result = await reader.decodeFromImageElement(img);
            setResult(result.getText());
         } catch {
            setError("No QR code or barcode detected in the image.");
         }
      } catch {
         setError("Failed to process the image. Please try again.");
      } finally {
         setIsProcessing(false);
      }
   }, []);

   const handleFileChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const file = event.target.files?.[0];
         if (file) handleImageUpload(file);
      },
      [handleImageUpload]
   );

   const handleDrop = useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
         event.preventDefault();
         const file = event.dataTransfer.files[0];
         if (file) handleImageUpload(file);
      },
      [handleImageUpload]
   );

   const copyToClipboard = useCallback(async () => {
      if (result) {
         try {
            await navigator.clipboard.writeText(result);
            toast.success("Result copied to clipboard!");
         } catch {
            toast.error("Failed to copy to clipboard. Please try again.");
         }
      }
   }, [result]);

   const downloadResult = useCallback(() => {
      if (result) {
         const blob = new Blob([result], { type: "text/plain" });
         const url = URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.download = "scanned_result.txt";
         link.href = url;
         link.click();
         URL.revokeObjectURL(url);
      }
   }, [result]);

   const dropzoneContent = useMemo(
      () => (
         <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">
               Drop image here or click to upload
            </p>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
         </div>
      ),
      []
   );

   return (
      <div className="grid items-start gap-4  w-full grid-cols-1 lg:grid-cols-2  h-full">
         <Card className="w-full h-full lg:col-span-1">
            <CardHeader>
               <CardTitle>QR Code & Barcode Scanner</CardTitle>
            </CardHeader>
            <CardContent>
               <div
                  className="p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}>
                  {previewUrl ? (
                     <div className="relative w-full h-48">
                        <img
                           src={previewUrl || "/placeholder.svg"}
                           alt="Uploaded image"
                           className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                           <p className="text-white text-sm">Click or drop to change image</p>
                        </div>
                     </div>
                  ) : (
                     dropzoneContent
                  )}
               </div>
               <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
               />

               <div className="mt-6">
                  {error ? (
                     <div className="flex items-center text-red-500">
                        <AlertCircle className="mr-2 h-5 w-5" />
                        <p>{error}</p>
                     </div>
                  ) : (
                     <p className="text-center text-gray-500">
                        {previewUrl
                           ? "Upload Image to process the image."
                           : "No image uploaded yet."}
                     </p>
                  )}
               </div>
            </CardContent>
         </Card>

         <Card className="w-full h-full ">
            <CardHeader>
               <CardTitle>
                  {" "}
                  <h3 className="font-semibold text-lg mb-2">Scan Result</h3>
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="mt-6">
                  {isProcessing ? (
                     <div>
                        <p>Scanning image ... </p>
                     </div>
                  ) : result ? (
                     <div>
                        <p className="text-gray-700 break-words bg-gray-100 p-3 rounded">
                           {result}
                        </p>
                     </div>
                  ) : error ? (
                     <div className="flex items-center text-red-500">
                        <AlertCircle className="mr-2 h-5 w-5" />
                        <p>{error}</p>
                     </div>
                  ) : (
                     <p className="text-center text-gray-500">
                        {previewUrl
                           ? "Click 'Scan' to process the image."
                           : "No image uploaded yet."}
                     </p>
                  )}
               </div>
            </CardContent>
            <CardFooter className="justify-end mt-auto space-x-2">
               {result && (
                  <>
                     <Button
                        variant="outline"
                        onClick={copyToClipboard}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                     </Button>
                     <Button
                        variant="outline"
                        onClick={downloadResult}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                     </Button>
                  </>
               )}
            </CardFooter>
         </Card>
      </div>
   );
};

export default ImageQrScanner;
