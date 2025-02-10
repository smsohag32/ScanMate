import { useState } from "react";
import { CodeType, InputType } from "@/types/index";
import { CodeGenerator } from "@/components/CodeGenerate/CodeGenerate";
import { CodeDisplay } from "@/components/CodeDisplay/CodeDisplay";
import { Globe, Notebook, Mail, Phone, Wifi } from "lucide-react";

const CodeGenerateContainer = () => {
   const [codeData, setCodeData] = useState<string>("");
   const [codeType, setCodeType] = useState<CodeType>("qrcode");
   const [inputType, setInputType] = useState<InputType>("url");
   const [color, setColor] = useState("black");
   const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
   const [codeWidth, setCodeWidth] = useState<number>(265);
   const inputTypes: { type: InputType; icon: React.ReactNode; label: string }[] = [
      { type: "url", icon: <Globe size={16} />, label: "Website" },
      { type: "text", icon: <Notebook size={16} />, label: "Text" },
      { type: "email", icon: <Mail size={16} />, label: "Email" },
      { type: "tel", icon: <Phone size={16} />, label: "Phone" },
      { type: "wifi", icon: <Wifi size={16} />, label: "Wi-Fi" },
   ];

   return (
      <div
         id="generate"
         className=" bg-[#F2F2FF] py-10">
         <div className="main-container">
            <div>
               <h1 className="text-2xl lg:text-3xl font-normal text-center">
                  QR Code & Bar Code{" "}
                  <span className="relative font-bold text-primary">Generator</span>
               </h1>

               <p className="text-center text-lg max-w-4xl mx-auto mt-4 mb-8">
                  Easily generate QR codes and barcodes for different use cases, such as websites,
                  email, phone numbers, Wi-Fi access, and URLs. Customize the design, color, and
                  size of your codes before downloading them.
               </p>
            </div>
            <div className="mt-6 mb-3 bg-[#ffffff] rounded-[8px] px-3 py-3 flex items-center flex-wrap justify-center gap-3">
               {inputTypes.map((item) => (
                  <div
                     key={item.type}
                     className={`rounded-[8px] cursor-pointer px-5 py-3 flex items-center gap-2 border border-slate-200 transition-colors ${
                        inputType === item.type
                           ? "bg-blue-50 text-primary"
                           : "bg-white hover:bg-gray-50"
                     }`}
                     onClick={() => setInputType(item.type)}>
                     <span>{item.icon}</span>
                     <p className="text-base font-medium">{item.label}</p>
                  </div>
               ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 rounded-[sm] w-full gap-4 h-full">
               <div className="lg:col-span-2 w-full h-full">
                  <CodeGenerator
                     setCodeData={setCodeData}
                     setCodeType={setCodeType}
                     setInputType={setInputType}
                     color={color}
                     setColor={setColor}
                     backgroundColor={backgroundColor}
                     setBackgroundColor={setBackgroundColor}
                     codeWidth={codeWidth}
                     setCodeWidth={setCodeWidth}
                     inputType={inputType}
                  />
               </div>
               <CodeDisplay
                  codeData={codeData}
                  color={color}
                  codeType={codeType}
                  inputType={inputType}
                  codeWidth={codeWidth}
                  backgroundColor={backgroundColor}
               />
            </div>
         </div>
      </div>
   );
};

export default CodeGenerateContainer;
