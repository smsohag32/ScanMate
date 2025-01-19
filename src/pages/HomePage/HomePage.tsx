import BulkCodeGenerator from "@/components/BulkCodeGenerator/BulkCodeGenerator";
import CodeGenerateContainer from "./CodeGenerateContainer";
import CodeScannerContainer from "./CodeScannerContainer";

const HomePage = () => {
   return (
      <div>
         <CodeGenerateContainer />
         <CodeScannerContainer />
         <BulkCodeGenerator />
      </div>
   );
};

export default HomePage;
