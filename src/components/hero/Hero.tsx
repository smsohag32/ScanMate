import qr from "@/assets/qr.webp";
export const Hero = () => {
   return (
      <div className="relative  min-h-[500px]  w-full overflow-hidden bg-gradient-to-r from-[#170D66] to-[#170D66]">
         <div className="main-container items-center lg:pb-16 pt-5 py-16">
            <div className="w-full flex items-center overflow-hidden  pe-10 justify-center">
               <img
                  src={qr}
                  alt=""
                  className="max-w-sm lg:w-full"
               />
            </div>
            <div className="w-full text-center z-40 ">
               <div className="text-center lg:text-center">
                  <h1 className="text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl md:text-6xl">
                     QR Code Generator
                  </h1>
                  <p className="mt-4 text-xl max-w-sm font-medium mx-auto text-gray-200">
                     Create custom QR codes instantly for your business, personal use, or any
                     digital content sharing needs.
                  </p>
               </div>
            </div>
         </div>
         {/* Decorative background elements */}
         <div className="absolute z-30 left-1/2 top-0  h-[600px] w-[600px] -translate-x-1/2 opacity-20 blur-3xl">
            <div className="aspect-square w-full rounded-full bg-[#170D66]" />
         </div>
      </div>
   );
};
