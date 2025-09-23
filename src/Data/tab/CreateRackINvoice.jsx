import SingleRetailMulti from '../../Components/createInvoice/SingleRetailMulti';

export const CreateRackInvoiceTab = [
  {
    id: '1',
    label:
    (
      <>
        Single Rack- <strong> [Capped]</strong>
      </>
    ), 
    component: <SingleRetailMulti title="Create Single Rack Invoice (Capped)" btnTtitle="Create Rack Invoice"/>,
  },
  {
    id: '2',
    label:
       (
      <>
       Bulk Rack - <strong> [Capped]</strong>
      </>
    ), 
    component: <SingleRetailMulti title="Create Bulk Rack Invoice (Capped)" btnTtitle="Create Bulk Rack Invoice"/>,
  },
  {
    id: '3',
    label: 
     (
      <>
       Single Rack - <strong> [Actual]</strong>
      </>
    )
   ,
    component: <SingleRetailMulti type="single_rack_actual" title="Create Single Rack Invoice (Actual)" btnTtitle="Create  Rack Invoice"/>,
  },
 {
    id: '4',
    label:
     (
      <>
       Bulk Rack - <strong> [Actual]</strong>
      </>
    ), 
    component: <SingleRetailMulti type="bulk_rack_actual" title="Create Bulk Rack Invoice (Actual)" btnTtitle="Create Bulk Rack Invoice"/>,
  },
   {
    id: '5',
    label:  (
      <>
       Single Rack - <strong> [Capped Multi]</strong>
      </>
    )
   ,
    component: <SingleRetailMulti title="Create Single Rack Invoice (Capped-MULTI)" btnTtitle="Create Rack Invoice"/>,
  },
   {
    id: '6',
    label: 
     (
      <>
       Bulk Rack - <strong> [Capped Multi]</strong>
      </>
    ), 
    component: <SingleRetailMulti title="Create Bulk Rack Invoice (Capped-MULTI)" btnTtitle="Create Bulk Rack Invoice"/>,
  },
   {
    id: '7',
    label:  (
      <>
       Single Rack - <strong> [Actual Multi]</strong>
      </>
    ),
    
    component: <SingleRetailMulti title="Create Single Rack Invoice (Actual-MULTI)" btnTtitle="Create  Rack Invoice"/>,
  },
   {
    id: '8',
    label: (
      <>
       Bulk Rack - <strong> [Actual Multi]</strong>
      </>
    ), 
        component: <SingleRetailMulti title="Create Bulk Rack Invoice (Actual-MULTI)" btnTtitle="Create Bulk Rack Invoice"/>,
  },
  
];