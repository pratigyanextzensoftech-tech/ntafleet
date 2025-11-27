
import ManageMacroForm from '../../Components/manageMacro/ManageMacroForm';
export const ManageMacroTab = [
  {
    id: '1',
    label: ' Upload US Transaction',
    component: <ManageMacroForm title="Upload US Transaction" btnTtitle="Upload US Transaction"/>,
  },
  {
    id: '2',
    label: 'Upload Canada Transaction',
    component: <ManageMacroForm title="Upload Canada Transaction" btnTtitle="Upload Canada Transaction"/>,
  },
 {
    id: '3',
    label: 'Upload ESSP FTP Transaction',
    component: <ManageMacroForm title="Upload ESSO FTP Transaction" btnTtitle="Upload ESSO FTP Transaction"/>,
  }
  
];