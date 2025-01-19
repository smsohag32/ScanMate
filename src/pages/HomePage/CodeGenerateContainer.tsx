import { useState } from "react";
import { CodeType, InputType } from "@/types/index";
import { CodeGenerator } from "@/components/CodeGenerate/CodeGenerate";
import { CodeDisplay } from "@/components/CodeDisplay/CodeDisplay";
import { Globe, Notebook, Mail, Phone, Wifi } from "lucide-react";

const CodeGenerateContainer = () => {
   const [codeData, setCodeData] = useState<string>("");
   const [codeType, setCodeType] = useState<CodeType>("qrcode");
   const [inputType, setInputType] = useState<InputType>("url");

   const inputTypes: { type: InputType; icon: React.ReactNode; label: string }[] = [
      { type: "url", icon: <Globe size={16} />, label: "Website" },
      { type: "text", icon: <Notebook size={16} />, label: "Text" },
      { type: "email", icon: <Mail size={16} />, label: "Email" },
      { type: "tel", icon: <Phone size={16} />, label: "Phone" },
      { type: "wifi", icon: <Wifi size={16} />, label: "Wi-Fi" },
   ];

   return (
      <div className="min-h-screen bg-[#F2F2FF] py-10">
         <div className="container mx-auto px-4 ">
            <h1 className="text-3xl font-normal uppercase text-center">
               QR Code & Bar Code{"  "}
               <span className="relative">
                  Generator
                  <span className="h-8 absolute w-full top-1 rounded-[4px] shadow-sm ring-blue-900 ring border-blue-800 left-0 right-0 -bottom-5"></span>
               </span>
            </h1>
            <div className="mt-6 mb-3 bg-[#ffffff] px-3 py-3 flex items-center flex-wrap justify-center gap-3">
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
            <div className="grid grid-cols-1 bg-white lg:p-4 lg:grid-cols-3 rounded-[sm] w-full gap-8">
               <div className="lg:col-span-2 w-full">
                  <CodeGenerator
                     setCodeData={setCodeData}
                     setCodeType={setCodeType}
                     setInputType={setInputType}
                     inputType={inputType}
                  />
               </div>
               <CodeDisplay
                  codeData={codeData}
                  codeType={codeType}
                  inputType={inputType}
               />
            </div>
         </div>
      </div>
   );
};

export default CodeGenerateContainer;
