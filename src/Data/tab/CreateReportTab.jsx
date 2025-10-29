
import CreateReport from '../../Components/reports/createReport/CreateReport';
import CreateReportOwner from '../../Components/reports/createReport/CreateOwnerOperatorReport';

export const CreateReportTab = [
  {
    id: '1',
    label: "Create Report",
    component: <CreateReport title="Create Report" />,
  },
  {
    id: '2',
    label: "Create Owner Operator Report",
    component: <CreateReportOwner title="Create Owner Operator Report" />,
  },



];

