import qr from "@/assets/qr.webp";
export const Hero = () => {
   return (
      <div className="relative  min-h-[600px] w-full overflow-hidden bg-gradient-to-r from-[#170D66] to-[#007DC9]">
         <div className="main-container flex items-center gap-10 justify-between w-full">
            <div className="w-full ">
               <div className="text-center lg:text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                     QR Code Generator
                  </h1>
                  <p className="mt-4 text-xl text-purple-100">
                     Create custom QR codes instantly for your business, personal use, or any
                     digital content sharing needs.
                  </p>
                  <div className="mt-8">
                     <a
                        href="#generate"
                        className="inline-flex items-center rounded-lg bg-amber-400 px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm transition-colors hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                        Generate QR Code
                     </a>
                  </div>
               </div>
            </div>
            <div className="w-full flex items-center justify-center">
               <img
                  src={qr}
                  alt=""
                  className="w-3/4"
               />
            </div>
         </div>
         {/* Decorative background elements */}
         <div className="absolute z-50 left-1/2 top-0  h-[600px] w-[600px] -translate-x-1/2 opacity-20 blur-3xl">
            <div className="aspect-square w-full rounded-full bg-purple-200" />
         </div>
      </div>
   );
};
