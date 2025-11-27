import CreateLoveBulk from '../../Components/pricing/loveBulk/CreateLoveBulk';
import MailLoveBulk from '../../Components/pricing/loveBulk/MailLoveBulk';

export const LovePricingTab = [
  {
    id: '1',
    label:"Create LOVE Bulk Pricing PDF"  , 
    component: <CreateLoveBulk title="Create Bulk Pricing PDF" btnTtitle="Create  Pricing PDF"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Mail Love Bulk Pricing PDF - <strong> [Capped]</strong>
      </>
    ), 
    component: <MailLoveBulk title="Mail Bulk Pricing PDF" btnTtitle="Search pricing Pdf"/>,
  },
  {
    id: '3',
    label: 
     (
      <>
       Mail Love Bulk Pricing - <strong> [Actual]</strong>
      </>
    )
   ,
    component: <MailLoveBulk title="Mail Bulk Pricing PDF" btnTtitle="Search pricing Pdf"/>,
  }
 
  
];