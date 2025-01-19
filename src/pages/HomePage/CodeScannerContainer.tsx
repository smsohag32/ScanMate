import ImageQrScanner from "@/components/CodeScanner/ImageQrScanner";

const CodeScannerContainer = () => {
   return (
      <div className=" bg-[#F2F2FF] pb-16">
         <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-normal text-center">
               QR Code & Barcode{" "}
               <span className="relative">
                  Scanner
                  <span className="h-8 absolute w-full top-1 rounded-[4px] shadow-sm ring-primary ring border-primary left-0 right-0 -bottom-5"></span>
               </span>
            </h2>
            <p className="text-center text-lg mt-4 max-w-4xl mx-auto mb-8">
               Easily scan QR codes and barcodes from your uploaded images. Simply upload an image
               containing a QR code or barcode, and our tool will process it to extract the
               information. You can also copy or download the result for further use.
            </p>
         </div>
         <ImageQrScanner />
      </div>
   );
};

export default CodeScannerContainer;
