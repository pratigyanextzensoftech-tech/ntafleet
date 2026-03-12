
import PrimaryMenu from '../../Components/setting/manageMenu/PrimaryMenu'
import SecondaryMenu from '../../Components/setting/manageMenu/SecondaryMenu'

export const ManageMenuTab = (
  {reloadTable,selectedRow, Edit, setEdit,row}
  // { 
  //   selectedRow, Edit, setEdit,fetchPmenuData,fetchSmenuData,row,
  //  }
) => [
  {
    id: '1',
    label: 'Primary Menu',
    component: <PrimaryMenu  title="Add Primary Menu"
      Edit={Edit}
      setEdit={setEdit}
      row={row}
      // fetchPmenuData={fetchPmenuData}
       selectedRow={selectedRow} 
      reloadTable={reloadTable}

       btnTtitle="Upload US Transaction"/>,
  },
  {
    id: '2',
    label: 'Secondary Menu',
    component: <SecondaryMenu 
      Edit={Edit}
      row={row}
      setEdit={setEdit}
// fetchSmenuData={fetchSmenuData}
     selectedRow={selectedRow}
       title="Add Secondary Menu" 
        reloadTable={reloadTable}
      btnTtitle="Upload US Transaction" />,
  },
];