import React from 'react';
import { LoginDropdown, StatusDropdown, ActionDropdown } from '../../Components/Tables/DataTable/DropDownCOmponent';
export const dummytabledata = [
  {
    id: 1,
    Company: 'NextZen SoftTech',
    From: '2025-05-12',
    To: '2025-06-01',
    Trans_count: '2000',
    Country: 'USA',
    Supplier: 'TechSource Inc.',
    Invoices_status: 'Paid',
  },
  {
    id: 2,
    Company: 'Apple Inc.',
    From: '2025-04-10',
    To: '2025-05-05',
    Trans_count: '1500',
    Country: 'India',
    Supplier: 'Global Parts Ltd.',
    Invoices_status: 'Pending',
  },
  {
    id: 3,
    Company: 'Microsoft',
    From: '2025-03-15',
    To: '2025-04-01',
    Trans_count: '3200',
    Country: 'UK',
    Supplier: 'Digital Supply Co.',
    Invoices_status: 'Overdue',
  },
  {
    id: 4,
    Company: 'Infosys Ltd.',
    From: '2025-07-01',
    To: '2025-07-20',
    Trans_count: '500',
    Country: 'Germany',
    Supplier: 'Global Partners GmbH',
    Invoices_status: 'Paid',
  },
  {
    id: 5,
    Company: 'Wipro Ltd.',
    From: '2025-02-05',
    To: '2025-02-28',
    Trans_count: '2100',
    Country: 'Canada',
    Supplier: 'North Supply',
    Invoices_status: 'Draft',
  },
];



export const tableColumns = [
    { name: 'Id', selector: row => row.id, sortable: true, center: true },
    { name: 'Company', selector: row => row.Company, sortable: true, center: true },
    { name: 'From', selector: row => row.From, sortable: true, center: true },
    { name: 'To.', selector: row => row.To, sortable: true, center: true },
    { name: 'Trans_count', selector: row => row.Trans_count, sortable: true, center: true },
    { name: 'Country', selector: row => row.Country, sortable: true, center: true },
        { name: 'Supplier', selector: row => row.Supplier, sortable: true, center: true },
        { name: 'Invoices_status', selector: row => row.Invoices_status, sortable: true, center: true },

    // {
    //     name: 'Company Login',
    //     cell: row => <LoginDropdown current={row.company_login} />,
    //     sortable: true,
    //     center: true,
    // },
    // {
    //     name: 'Status',
    //     cell: row => <StatusDropdown current={row.status} />,
    //     sortable: true,
    //     center: true,
    // },
    // {
    //     name: 'Action',
    //     cell: () => <ActionDropdown />,
    //     sortable: false,
    //     center: true,
    // }
];
