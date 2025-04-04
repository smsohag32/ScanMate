"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { CodeType, InputType } from "@/types/index";
import { Barcode, QrCode, Globe, Mail, Phone, Wifi, AlertCircle, Eye, EyeOff } from "lucide-react";
import { ColorPicker } from "../ui/color-picker";

interface CodeGeneratorProps {
   setCodeData: (data: string) => void;
   setCodeType: (type: CodeType) => void;
   setInputType: (type: InputType) => void;
   inputType: InputType;
   color: string;
   setColor: (data: string) => void;
   backgroundColor: string;
   setBackgroundColor: (value: string) => void;
   codeWidth: number;
   setCodeWidth: (value: number) => void;
}

export function CodeGenerator({
   setCodeData,
   setCodeType,
   color,
   setColor,
   inputType,
   backgroundColor,
   setBackgroundColor,
   codeWidth,
   setCodeWidth,
}: CodeGeneratorProps) {
   const [input, setInput] = useState("");
   const [wifiPassword, setWifiPassword] = useState("");
   const [type, setType] = useState<CodeType>("qrcode");
   const [error, setError] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [widthInput, setWidthInput] = useState<string>(codeWidth.toString());
   const [widthErr, setWidthErr] = useState<string | null>("");
   const inputTypeConfig = {
      text: { icon: <QrCode className="h-4 w-4" />, placeholder: "Enter text for code generation" },
      url: {
         icon: <Globe className="h-4 w-4" />,
         placeholder: "Enter website URL (e.g., https://example.com)",
      },
      email: { icon: <Mail className="h-4 w-4" />, placeholder: "Enter email address" },
      tel: { icon: <Phone className="h-4 w-4" />, placeholder: "Enter phone number" },
      wifi: { icon: <Wifi className="h-4 w-4" />, placeholder: "Enter Wi-Fi network name" },
      phone: { icon: <Phone className="h-4 w-4" />, placeholder: "Enter phone number" },
   };

   useEffect(() => {
      setInput("");
      setWifiPassword("");
      setError(null);
   }, [inputType]);

   const validateInput = () => {
      switch (inputType) {
         case "url":
            return /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/.test(
               input
            )
               ? null
               : "Please enter a valid URL";

         case "email":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
               ? null
               : "Please enter a valid email address";
         case "tel":
            return /^\+?[\d\s()-]{7,}$/.test(input) ? null : "Please enter a valid phone number";
         case "wifi":
            return input.length > 0 ? null : "Please enter a Wi-Fi network name";
         default:
            return input.length > 0 ? null : "Please enter some text";
      }
   };

   const validateWidth = () => {
      if (Number(widthInput) < 10 || Number(widthInput) > 300) {
         return "Width must be between 10 and 300 pixels.";
      }
      return null;
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const validationError = validateInput();
      if (validationError) {
         setError(validationError);
         return;
      }
      const widthError = validateWidth();
      if (widthError) {
         setWidthErr(widthError);
         return;
      }
      setError(null);
      setWidthErr(null);
      setIsLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 400));
         if (inputType === "wifi") {
            setCodeData(`WIFI:S:${input};T:WPA;P:${wifiPassword};;`);
         } else {
            setCodeData(input);
         }
         setCodeType(type);
         setCodeWidth(Number(widthInput));
      } catch {
         setError("An error occurred while generating the code. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="space-y-6  bg-[#ffffff] p-4 h-full rounded-[8px] ">
         <div className="grid gap-2">
            <Label
               htmlFor="code-input"
               className="text-lg font-medium">
               {inputType.charAt(0).toUpperCase() + inputType.slice(1)}
            </Label>
            <div className="relative">
               {inputType === "text" ? (
                  <Textarea
                     id="code-input"
                     placeholder={inputTypeConfig[inputType].placeholder}
                     value={input}
                     rows={6}
                     onChange={(e) => {
                        setInput(e.target.value);
                        setError(null);
                     }}
                     className={`pl-10 py-2.5 ${error ? "border-red-500" : ""}`}
                  />
               ) : (
                  <Input
                     id="code-input"
                     type={inputType === "email" ? "email" : inputType === "tel" ? "tel" : "text"}
                     placeholder={inputTypeConfig[inputType].placeholder}
                     value={input}
                     onChange={(e) => {
                        setInput(e.target.value);
                        setError(null);
                     }}
                     className={`pl-10 py-2.5 ${error ? "border-red-500" : ""}`}
                  />
               )}
               <div className="absolute left-3 top-3 text-gray-400">
                  {inputTypeConfig[inputType].icon}
               </div>
            </div>
            {inputType === "wifi" && (
               <div className="relative mt-2">
                  <Input
                     id="wifi-password"
                     type={showPassword ? "text" : "password"}
                     placeholder="Enter Wi-Fi password"
                     value={wifiPassword}
                     onChange={(e) => setWifiPassword(e.target.value)}
                     className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                     <Wifi className="h-4 w-4" />
                  </div>
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
               </div>
            )}
            {error && (
               <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
               </p>
            )}
         </div>
         <RadioGroup
            defaultValue="qrcode"
            onValueChange={(value) => setType(value as CodeType)}
            className="flex space-x-4">
            <div className="flex items-center space-x-2">
               <RadioGroupItem
                  value="qrcode"
                  id="qrcode"
               />
               <Label
                  htmlFor="qrcode"
                  className="flex items-center space-x-2 cursor-pointer">
                  <QrCode className="h-4 w-4" />
                  <span>QR Code</span>
               </Label>
            </div>
            <div className="flex items-center space-x-2">
               <RadioGroupItem
                  value="barcode"
                  id="barcode"
               />
               <Label
                  htmlFor="barcode"
                  className="flex items-center space-x-2 cursor-pointer">
                  <Barcode className="h-4 w-4" />
                  <span>Barcode</span>
               </Label>
            </div>
         </RadioGroup>
         <div className="pt-4 max-w-sm lg:mx-0 mx-auto">
            <Button
               type="submit"
               className="w-full"
               disabled={isLoading || !input}>
               {isLoading ? "Generating..." : "Generate Code"}
            </Button>
         </div>

         <div className="mt-6  rounded-sm border-slate-200">
            <p>Customize Styles</p>
            <div className="flex items-center">
               <div className="flex  mt-4 items-center gap-4 w-full">
                  <Label htmlFor="color">Code Color</Label>
                  <ColorPicker
                     onChange={(v) => {
                        setColor(v);
                     }}
                     value={color}
                  />
               </div>
               <div className="flex  mt-4 items-center gap-4 w-full">
                  <Label htmlFor="color">Background Color</Label>
                  <ColorPicker
                     onChange={(v) => {
                        setBackgroundColor(v);
                     }}
                     value={backgroundColor}
                  />
               </div>
            </div>
            <div className="  mt-2 items-center gap-4 w-full">
               <p>Size</p>
               <div className="flex mt-1 flex-col lg:flex-row items-center gap-4">
                  <Input
                     placeholder="Width"
                     value={widthInput}
                     className="lg:max-w-sm w-full"
                     onChange={(e) => setWidthInput(e.target.value)}
                     type="number"
                     min={0}
                  />
                  {widthErr && (
                     <p className="text-red-500 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {widthErr}
                     </p>
                  )}
               </div>
            </div>
         </div>
      </form>
   );
}
