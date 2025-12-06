
import CreateReport from '../../Components/reports/createReport/CreateReport';
import CreateReportOwner from '../../Components/reports/createReport/CreateOwnerOperatorReport';
import { report_new , owner_report} from "../../api";
export const CreateReportTab = [
  {
    id: '1',
    label: "Create Report",
    component: <CreateReport type="Normal" supplier_ids='' discount='Yes' company_type=""  title="Create Report" api_name={report_new}/>,
  },
  {
    id: '2',
    label: "Create Owner Operator Report",
    component: <CreateReport type="Owner" supplier_ids='6,10' discount='No' company_type="" title="Create Owner Operator Report"  api_name={owner_report}/>,
  },



];

