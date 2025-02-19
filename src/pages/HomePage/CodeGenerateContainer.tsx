import { useState } from "react";
import { CodeType, InputType } from "@/types/index";
import { CodeGenerator } from "@/components/CodeGenerate/CodeGenerate";
import { CodeDisplay } from "@/components/CodeDisplay/CodeDisplay";
import { Globe, Notebook, Mail, Phone, Wifi } from "lucide-react";

const CodeGenerateContainer = () => {
   const [codeData, setCodeData] = useState<string>("");
   const [codeType, setCodeType] = useState<CodeType>("qrcode");
   const [inputType, setInputType] = useState<InputType>("text");
   const [color, setColor] = useState("black");
   const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
   const [codeWidth, setCodeWidth] = useState<number>(265);
   const inputTypes: { type: InputType; icon: React.ReactNode; label: string }[] = [
      { type: "text", icon: <Notebook size={16} />, label: "Text" },
      { type: "url", icon: <Globe size={16} />, label: "Website" },
      { type: "email", icon: <Mail size={16} />, label: "Email" },
      { type: "tel", icon: <Phone size={16} />, label: "Phone" },
      { type: "wifi", icon: <Wifi size={16} />, label: "Wi-Fi" },
   ];

   return (
      <div
         id="generate"
         className=" bg-[#f6f6f6]  ">
         <div className="main-container">
            <div className="-mt-10 mb-3 z-50 bg-[#ffffff] border-slate-200 border rounded-[8px] px-3 py-3 flex items-center flex-wrap justify-center ">
               {inputTypes.map((item) => (
                  <div
                     key={item.type}
                     className={` cursor-pointer rounded-b-[1rem] px-5 py-3 flex  items-center gap-2 border-b border-[#170D66] transition-colors ${
                        inputType === item.type
                           ? "bg-[#170D66] text-gray-100  "
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
