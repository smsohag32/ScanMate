import ImageQrScanner from "@/components/CodeScanner/ImageQrScanner";

const CodeScannerContainer = () => {
   return (
      <div className=" bg-[#F2F2FF] pb-16">
         <div className="main-container">
            <div className="mb-6">
               <h2 className="text-2xl lg:text-3xl font-normal text-center">
                  QR Code & Barcode <span className="relative font-bold text-primary">Scanner</span>
               </h2>
               <p className="text-center text-lg mt-4 max-w-4xl mx-auto mb-8">
                  Easily scan QR codes and barcodes from your uploaded images. Simply upload an
                  image containing a QR code or barcode, and our tool will process it to extract the
                  information. You can also copy or download the result for further use.
               </p>
            </div>
            <ImageQrScanner />
         </div>
      </div>
   );
};

export default CodeScannerContainer;
