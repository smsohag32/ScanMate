import qr from "@/assets/qr.webp";
export const Hero = () => {
   return (
      <div className="relative  min-h-[600px]  w-full overflow-hidden bg-gradient-to-r from-[#170D66] to-[#170D66]">
         <div className="main-container items-center py-16">
            <div className="w-full flex items-center overflow-hidden  pe-10 justify-center">
               <img
                  src={qr}
                  alt=""
                  className="max-w-sm lg:w-full"
               />
            </div>
            <div className="w-full text-center z-50 ">
               <div className="text-center lg:text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                     QR Code Generator
                  </h1>
                  <p className="mt-4 text-xl text-purple-100">
                     Create custom QR codes instantly for your business, personal use, or any
                     digital content sharing needs.
                  </p>
                  <div className="mt-8  z-50">
                     <a
                        href="#generate"
                        className="inline-flex items-center cursor-pointer rounded-lg bg-amber-400 px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm transition-colors hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                        Generate QR Code
                     </a>
                  </div>
               </div>
            </div>
         </div>
         {/* Decorative background elements */}
         <div className="absolute z-30 left-1/2 top-0  h-[600px] w-[600px] -translate-x-1/2 opacity-20 blur-3xl">
            <div className="aspect-square w-full rounded-full bg-blue-200" />
         </div>
      </div>
   );
};
