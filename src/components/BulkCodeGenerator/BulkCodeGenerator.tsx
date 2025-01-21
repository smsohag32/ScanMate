import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { Card, CardContent } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

type CodeType = "qr" | "barcode";
type GenerationMethod = "serial" | "random";

interface GeneratedCode {
   id: number;
   code: string;
   imageUrl: string;
}

export default function BulkCodeGenerator() {
   const [codeType, setCodeType] = useState<CodeType>("qr");
   const [generationMethod, setGenerationMethod] = useState<GenerationMethod>("serial");
   const [prefix, setPrefix] = useState("");
   const [startNumber, setStartNumber] = useState(1);
   const [quantity, setQuantity] = useState(10);
   const [generatedCodes, setGeneratedCodes] = useState<GeneratedCode[]>([]);
   const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
   const [isGenerating, setIsGenerating] = useState(false);
   const [downloadLoading, setDownloadLoading] = useState(false);
   const [progress, setProgress] = useState(0);
   const abortControllerRef = useRef<AbortController | null>(null);

   const validateInputs = useCallback(() => {
      const validationErrors: { [key: string]: string | null } = {};

      if (generationMethod === "serial" && startNumber < 1) {
         validationErrors.startNumber = "Start number must be 1 or greater.";
      }

      if (quantity < 1) {
         validationErrors.quantity = "Quantity must be 1 or greater.";
      } else if (quantity > 10000) {
         validationErrors.quantity = "Maximum quantity is 10,000.";
      }

      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
   }, [generationMethod, startNumber, quantity]);

   const generateCodes = useCallback(async () => {
      if (!validateInputs()) {
         return;
      }
      setGeneratedCodes([]);
      setIsGenerating(true);
      setProgress(0);
      abortControllerRef.current = new AbortController();

      try {
         const newCodes: GeneratedCode[] = [];
         const batchSize = 100;
         const totalBatches = Math.ceil(quantity / batchSize);

         for (let batch = 0; batch < totalBatches; batch++) {
            if (abortControllerRef.current?.signal.aborted) {
               break;
            }

            const batchCodes = await generateBatch(batch * batchSize, batchSize);
            newCodes.push(...batchCodes);
            setGeneratedCodes((prevCodes) => [...prevCodes, ...batchCodes]);
            setProgress(((batch + 1) / totalBatches) * 100);
            await new Promise((resolve) => setTimeout(resolve, 0));
         }

         setGeneratedCodes(newCodes);
      } catch (error) {
         console.error("Error generating codes:", error);
      } finally {
         setIsGenerating(false);
         abortControllerRef.current = null;
      }
   }, [quantity, codeType, validateInputs]);

   const generateBatch = async (start: number, batchSize: number) => {
      const batchCodes: GeneratedCode[] = [];

      for (let i = 0; i < batchSize && start + i < quantity; i++) {
         if (abortControllerRef.current?.signal.aborted) {
            break;
         }

         let code: string;
         if (generationMethod === "serial") {
            code = `${prefix.toUpperCase()}${(startNumber + start + i)
               .toString()
               .padStart(5, "0")}`;
         } else {
            code = `${prefix.toUpperCase()}${Math.random()
               .toString(36)
               .substr(2, 5)
               .toUpperCase()}`;
         }

         let imageUrl: string;
         if (codeType === "qr") {
            imageUrl = await QRCode.toDataURL(code);
         } else {
            const canvas = document.createElement("canvas");
            JsBarcode(canvas, code, { format: "CODE128" });
            imageUrl = canvas.toDataURL("image/png");
         }

         batchCodes.push({ id: start + i + 1, code, imageUrl });
      }

      return batchCodes;
   };

   const cancelGeneration = () => {
      if (abortControllerRef.current) {
         abortControllerRef.current.abort();
      }
   };

   const downloadExcel = async () => {
      setDownloadLoading(true);
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Codes");

      worksheet.addRow(["ID", "Code", "Image"]);

      worksheet.getColumn(1).width = 15;
      worksheet.getColumn(2).width = 30;
      worksheet.getColumn(3).width = 20;

      for (const { id, code, imageUrl } of generatedCodes) {
         const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
         const imageBuffer = new Uint8Array(
            atob(base64Data)
               .split("")
               .map((char) => char.charCodeAt(0))
         );

         const imageId = workbook.addImage({
            buffer: imageBuffer,
            extension: "png",
         });
         const row = worksheet.addRow([id, code]);
         worksheet.getRow(row.number).height = 60;
         worksheet.addImage(imageId, {
            tl: { col: 3 - 1, row: row.number - 1 },
            ext: { width: 150, height: 60 },
         });
      }

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "generated_codes_with_images.xlsx");
      setDownloadLoading(false);
   };

   return (
      <div className="bg-[#F2F2FF] pb-10">
         <div className="container px-4 mx-auto">
            <div className="mb-6">
               <h1 className="text-2xl lg:text-3xl font-normal text-center">
                  <span className="relative">
                     Bulk
                     <span className="h-8 absolute w-full top-1 rounded-[4px] shadow-sm ring-primary ring border-primary left-0 right-0 -bottom-5"></span>
                  </span>
                  {"  "} QR or Bar Code Generator
               </h1>
               <p className="text-center text-gray-600 max-w-4xl mx-auto mt-2">
                  Easily create bulk QR codes or barcodes for a variety of use cases, such as
                  inventory management, product labeling, or marketing campaigns. Choose between QR
                  codes and barcodes, configure the generation method (serial or random), and
                  customize options like prefix, starting number, and quantity. Once generated,
                  download the codes in a convenient Excel file for your records or usage.
               </p>
            </div>

            <Card className="mb-4">
               <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <div>
                        <Label htmlFor="codeType">Code Type</Label>
                        <Select
                           defaultValue="qr"
                           onValueChange={(value: CodeType) => setCodeType(value)}>
                           <SelectTrigger id="codeType">
                              <SelectValue placeholder="Select code type" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="qr">QR Code</SelectItem>
                              <SelectItem value="barcode">Barcode</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     <div>
                        <Label>Generation Method</Label>
                        <RadioGroup
                           defaultValue="serial"
                           className="flex flex-col lg:flex-row gap-3 mt-2"
                           onValueChange={(value: GenerationMethod) => setGenerationMethod(value)}>
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                 value="serial"
                                 id="serial"
                              />
                              <Label htmlFor="serial">Serial</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                 value="random"
                                 id="random"
                              />
                              <Label htmlFor="random">Random Unique</Label>
                           </div>
                        </RadioGroup>
                     </div>
                     <div>
                        <Label htmlFor="prefix">Prefix</Label>
                        <Input
                           id="prefix"
                           value={prefix}
                           onChange={(e) => setPrefix(e.target.value)}
                           className={errors.prefix ? "border-red-500" : ""}
                        />
                        {errors.prefix && <p className="text-red-500 text-sm">{errors.prefix}</p>}
                     </div>
                     <div>
                        <Label htmlFor="startNumber">Start Number</Label>
                        <Input
                           id="startNumber"
                           type="number"
                           value={startNumber}
                           onChange={(e) => setStartNumber(Number(e.target.value))}
                           className={errors.startNumber ? "border-red-500" : ""}
                        />
                        {errors.startNumber && (
                           <p className="text-red-500 text-sm">{errors.startNumber}</p>
                        )}
                     </div>
                     <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                           id="quantity"
                           type="number"
                           value={quantity}
                           onChange={(e) => setQuantity(Number(e.target.value))}
                           className={errors.quantity ? "border-red-500" : ""}
                        />
                        {errors.quantity && (
                           <p className="text-red-500 text-sm">{errors.quantity}</p>
                        )}
                     </div>
                  </div>
                  <Button
                     onClick={generateCodes}
                     disabled={isGenerating}
                     className="mb-4">
                     {isGenerating ? "Generating..." : "Generate Codes"}
                  </Button>
                  {isGenerating && (
                     <Button
                        onClick={cancelGeneration}
                        variant="destructive"
                        className="ml-2 mb-4">
                        Cancel
                     </Button>
                  )}
               </CardContent>
            </Card>

            {isGenerating ? (
               <Card className="mb-4">
                  <CardContent className="p-4">
                     <div className="flex items-center justify-between mb-2">
                        <span>Generating codes...</span>
                        <span>{Math.round(progress)}%</span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                           className="bg-blue-600 h-2.5 rounded-full"
                           style={{ width: `${progress}%` }}></div>
                     </div>
                  </CardContent>
               </Card>
            ) : (
               <AnimatePresence>
                  {generatedCodes.length > 0 && (
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}>
                        <Card>
                           <CardContent>
                              <div className="flex items-center pt-4 pb-4 justify-between flex-col lg:flex-row gap-4">
                                 <p>
                                    Total generated codes: <span>{generatedCodes.length}</span>
                                 </p>
                                 <Button
                                    disabled={downloadLoading}
                                    onClick={downloadExcel}>
                                    {downloadLoading ? (
                                       <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Downloading...
                                       </>
                                    ) : (
                                       "Download All"
                                    )}
                                 </Button>
                              </div>
                              <div className="max-h-[600px] overflow-y-auto">
                                 <Table>
                                    <TableHeader>
                                       <TableRow>
                                          <TableHead>ID</TableHead>
                                          <TableHead>Code</TableHead>
                                          <TableHead className="text-right">Image</TableHead>
                                       </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                       {generatedCodes.map((code) => (
                                          <motion.tr
                                             key={code.id}
                                             initial={{ opacity: 0, y: 20 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             transition={{ duration: 0.3 }}>
                                             <TableCell>{code.id}</TableCell>
                                             <TableCell>{code.code}</TableCell>
                                             <TableCell className="text-right">
                                                <img
                                                   src={code.imageUrl || "/placeholder.svg"}
                                                   alt={code.code}
                                                   className="w-24 h-24 inline-block"
                                                />
                                             </TableCell>
                                          </motion.tr>
                                       ))}
                                    </TableBody>
                                 </Table>
                              </div>
                           </CardContent>
                        </Card>
                     </motion.div>
                  )}
               </AnimatePresence>
            )}
         </div>
      </div>
   );
}
