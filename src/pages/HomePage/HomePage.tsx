import BulkCodeGenerator from "@/components/BulkCodeGenerator/BulkCodeGenerator";
import CodeGenerateContainer from "./CodeGenerateContainer";
import CodeScannerContainer from "./CodeScannerContainer";
import { Hero } from "@/components/hero/Hero";

const HomePage = () => {
   return (
      <div className="bg-[#f6f6f6]">
         <Hero />
         <CodeGenerateContainer />
         <CodeScannerContainer />
         <BulkCodeGenerator />
      </div>
   );
};

export default HomePage;
