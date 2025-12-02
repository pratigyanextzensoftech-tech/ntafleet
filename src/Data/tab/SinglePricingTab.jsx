import EssoPricing from "../../Components/pricing/singlePricingPdf/EssoPdf";
import LovePricing from "../../Components/pricing/singlePricingPdf/LovesPdf";
import TaPetro from "../../Components/pricing/singlePricingPdf/TaPetro";
import Ultramar from "../../Components/pricing/singlePricingPdf/UltramarPdf";
import SinglePdfCommon from "../../Components/pricing/singlePricingPdf/SinglePdfCommon";
export const SinglepricingTab = (fetchers) => [
  {
    id: "1",
    label: "Flying J",
   component: () => (
      <SinglePdfCommon
        supplier_id= "1" 
        title="Create FJ Pricing PDF"
        btnTtitle="Create FJ Pricing PDF"
        onDataAdded={fetchers.pricingPdfData}   
      />
    ),
  },
  {
    id: "2",
    label: (
      <>
        Ta-Petro - <strong> [Capped]</strong>
      </>
    ),
   component: () => (
      <SinglePdfCommon
        supplier_id= "3" 
        invoice_type= "Capped" 
        title="Create Ta-Petro Pricing PDF (Capped)"
        btnTtitle="Create pricing Pdf"
        onDataAdded={fetchers.tapetroPdf}    
      />
    ),
  },
  {
    id: "3",
    label: (
      <>
        Ta-Petro - <strong> [Actual]</strong>
      </>
    ),
   component: () => (
      <SinglePdfCommon
        supplier_id= "3" 
        invoice_type= "Actual" 
        title="Create Ta-Petro Pricing PDF (Actual)"
        btnTtitle="Create pricing Pdf"
        onDataAdded={fetchers.tapetroPdfActual} 
      />
    ),
  },
  {
    id: "4",
    label: "Esso (Without Tax)",
   component: () => (
      <SinglePdfCommon
        supplier_id= "6"
        tax="No"  
        title="Create ESSO Pricing PDF (Without Tax)"
        btnTtitle="Create ESSO Pricing PDF (Without Tax)"
        onDataAdded={fetchers.essoPdfWithoutTax}  
      />
    ),
  },
  {
    id: "5",
    label: "Esso (With Tax)",
   component: () => (
      <SinglePdfCommon
        supplier_id= "6"
        tax="Yes"  
        title="Create ESSO Pricing PDF (With Tax)"
        btnTtitle="Create ESSO Pricing PDF (With Tax)"
        onDataAdded={fetchers.essoPdf}  
      />
    ),
  },
  {
    id: "6",
    label: (
      <>
        Love Pdf - <strong>[Capped]</strong>
      </>
    ),
    component: () => (
      <SinglePdfCommon
        supplier_id= "7" 
        invoice_type= "Capped" 
        title="Create LOVE Pricing PDF (Capped)"
        btnTtitle="Create LOVE Pricing PDF"
        onDataAdded={fetchers.lovePdf}    
      />
    ),
  },
  {
    id: "7",
    label: (
      <>
        Love Pdf - <strong>[Actual]</strong>
      </>
    ),
    
  component: () => (
      <SinglePdfCommon
        supplier_id= "7" 
        invoice_type= "Actual" 
        title="Create LOVE Pricing PDF (Actual)"
        btnTtitle="Create LOVE Pricing PDF"
        onDataAdded={fetchers.lovePdfActual}  
      />
    ),
  },
  {
    id: "8",
    label: "Ultramar Pdf",
   component: () => (
      <SinglePdfCommon
        supplier_id= "10" 
        invoice_type= "Actual" 
        title="Create ULTRAMAR Pricing PDF"
        btnTtitle="Create ULTRAMAR Pricing PDF"
        onDataAdded={fetchers.ulPdf}  
      />
    ),
  },
];

