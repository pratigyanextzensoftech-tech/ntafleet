
import UploadForm from '../../Components/transaction/upload/Upload';
import EfsTransaction from '../../Components/transaction/upload/EfsTransaction';
export const upload_transaction_tab = [
  {
    id: '1',
    label:"Upload Petro Canada",
    component: <UploadForm btnTitle="Upload Petro Canada Transactions" title="Upload Petro Canada Transactions "/>,
  },
  {
    id: '2',
    label:"Upload Esso",
    component: <UploadForm type="esso" btnTitle="Upload ESSO Transactions"   title="Upload ESSO Transactions"/>,
  },
  
  {
    id: '3',
    label: "Upload Esso FTP",
    component:<UploadForm type="esso" btnTitle="Upload ESSO FTP Transactions"   title="Upload ESSO FTP Transactions"/>,
  },
   {
    id: '4',
    label:"Upload Flying j/Ta-petro",
    component:   <UploadForm type="ta-petro" btnTitle="Upload Flying j/Ta-petro"   title="Upload Flying j/Ta-petro"/>,
  },
   {
    id: '5',
    label:"Upload ESSO MOBIL ",
    component: <UploadForm type="esso-mobil" btnTitle="Upload ESSO MOBIL Transactions" title="Upload ESSO MOBIL Transactions"/>,
  },
   {
    id: '6',
    label:"Upload Irving ",
    component: <UploadForm type="irving"  btnTitle="Upload Irving Transactions" title="Upload Irving Transactions"/>,
  },
  {
    id: '7',
    label:"Upload Ultramar ",
    component: <UploadForm type="ultramar" btnTitle="Upload Ultramar Transactions" title="Upload Ultramar Transactions"/>,
  },
  {
    id: '8',
    label:"Ultramar Daily ",
    component: <UploadForm type="ultramar" btnTitle="Upload Ultramar Daily Transactions" title="Upload Ultramar Daily Transactions"/>,
  },
  {
    id: '9',
    label:"EFS Transaction ",
    component: <EfsTransaction btnTitle="Upload EFS Transactions" title="Upload EFS Transactions"/>,
  },
  
];
