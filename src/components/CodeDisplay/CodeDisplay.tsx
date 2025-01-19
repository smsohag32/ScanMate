import { useRef } from "react";
import Barcode from "react-barcode";
import { QRCodeCanvas } from "qrcode.react";
import { CodeType } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface CodeDisplayProps {
   codeData: string;
   codeType: CodeType;
   inputType: string;
}

export function CodeDisplay({ codeData, codeType, inputType }: CodeDisplayProps) {
   const codeRef = useRef<HTMLDivElement>(null);

   const downloadCode = () => {
      if (codeRef.current) {
         const canvas = codeRef.current.querySelector("canvas");
         if (canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `${codeType}-${Date.now()}.png`;
            link.href = url;
            link.click();
         }
      }
   };

   return (
      <div className="space-y-4">
         {!codeData ? (
            <div className="flex justify-center bg-white p-4 opacity-50  rounded-lg shadow">
               {codeType === "barcode" ? (
                  <Barcode value={"Preview"} />
               ) : (
                  <QRCodeCanvas
                     value={"Preview"}
                     size={256}
                  />
               )}
            </div>
         ) : (
            <div
               ref={codeRef}
               className="flex justify-center p-4 bg-white rounded-lg shadow">
               {codeType === "barcode" ? (
                  <Barcode value={codeData} />
               ) : (
                  <QRCodeCanvas
                     value={codeData}
                     size={256}
                  />
               )}
            </div>
         )}

         <Button
            onClick={downloadCode}
            disabled={!codeData}
            className="w-full max-w-[280px] flex items-center  disabled:!cursor-not-allowed justify-center mx-auto">
            <Download className="mr-2 h-4 w-4" /> <span>Download</span>
         </Button>
      </div>
   );
}
