import { useRef, useState } from "react";
import Barcode from "react-barcode";
import { QRCodeCanvas } from "qrcode.react";
import { CodeType } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface CodeDisplayProps {
   codeData: string;
   codeType: CodeType;
   inputType: string;
   color: string;
   backgroundColor: string;
   codeWidth: number;
}

export function CodeDisplay({
   codeData,
   codeType,
   color,
   codeWidth,

   backgroundColor,
}: CodeDisplayProps) {
   const codeRef = useRef<HTMLDivElement>(null);
   const [isCopy, setIsCopy] = useState<boolean>(false);
   // download code
   const downloadCode = () => {
      if (codeRef.current) {
         if (codeType === "qrcode") {
            const canvas = codeRef.current.querySelector("canvas");
            if (canvas) {
               const url = canvas.toDataURL("image/png");
               const link = document.createElement("a");
               link.download = `${codeType}-${Date.now()}.png`;
               link.href = url;
               link.click();
            }
         } else if (codeType === "barcode") {
            const svg = codeRef.current.querySelector("svg");
            if (svg) {
               const serializer = new XMLSerializer();
               const svgString = serializer.serializeToString(svg);
               const canvas = document.createElement("canvas");
               const context = canvas.getContext("2d");

               const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
               const url = URL.createObjectURL(svgBlob);

               const img = new Image();
               img.onload = () => {
                  canvas.width = img.width;
                  canvas.height = img.height;
                  if (context) {
                     context.drawImage(img, 0, 0);
                     const pngUrl = canvas.toDataURL("image/png");
                     const link = document.createElement("a");
                     link.download = `${codeType}-${Date.now()}.png`;
                     link.href = pngUrl;
                     link.click();
                     URL.revokeObjectURL(url);
                  }
               };
               img.src = url;
            }
         }
      }
   };

   // copy code data
   const copyCodeData = async () => {
      setIsCopy(false);
      if (codeData) {
         try {
            await navigator.clipboard.writeText(codeData);
            toast.success("Copied to clipboard!");
            setIsCopy(true);
         } catch {
            toast.error("Failed to copy data. Please try again.");
            setIsCopy(false);
         }
      }
   };

   return (
      <div className=" p-4 relative bg-white rounded-[8px]">
         {!codeData ? (
            <div className="flex justify-center  bg-white p-4 opacity-50 overflow-hidden rounded-lg lg:shadow">
               {codeType === "barcode" ? (
                  <Barcode
                     lineColor={color}
                     background={backgroundColor}
                     value={"Preview"}
                  />
               ) : (
                  <QRCodeCanvas
                     fgColor={color}
                     bgColor={backgroundColor}
                     value={"Preview"}
                     size={codeWidth}
                  />
               )}
            </div>
         ) : (
            <div
               ref={codeRef}
               className="flex justify-center p-4  bg-white rounded-lg lg:shadow">
               {codeType === "barcode" ? (
                  <Barcode
                     lineColor={color}
                     background={backgroundColor}
                     value={codeData}
                  />
               ) : (
                  <QRCodeCanvas
                     value={codeData}
                     bgColor={backgroundColor}
                     fgColor={color}
                     size={codeWidth}
                  />
               )}
            </div>
         )}

         <Button
            onClick={downloadCode}
            disabled={!codeData}
            className="w-full max-w-[280px] mt-6 flex items-center disabled:!cursor-not-allowed justify-center mx-auto">
            <Download className="mr-2 h-4 w-4" /> <span>Download</span>
         </Button>

         {codeData && (
            <Button
               variant="ghost"
               onClick={copyCodeData}
               disabled={!codeData}
               size={"icon"}
               className="absolute active:bg-slate-200 top-0 right-0 lg:top-4 lg:right-4 ">
               <Copy className={isCopy ? "text-green-500" : ""} />
            </Button>
         )}
      </div>
   );
}
