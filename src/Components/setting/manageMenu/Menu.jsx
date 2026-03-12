import React, { Fragment,useState,useEffect } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Card, Col, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { ManageMenuTab } from '../../../Data/tab/ManageMenuTab';
import $ from "jquery";
import "datatables.net";
import { useLocation } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { menu } from "../../../api";

import ManageMenuTable from './ManageMenuTable'; 
import useMenuTable from './useMenuTable';
import {pmenu as pmenuApi, smenu as smenuApi} from '../../../api/index'
const Menu = () => {
// const menuTabs = useMenuTable();
  const [filters, setFilters] = useState({});
   const [selectedRow, setSelectedRow] = useState(null);
    const [Edit, setEdit] = useState(false);
    const[row,setRow]=useState([])
 const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };


  const getApiByTab = (tab) => {
    switch (tab) {
      case "1":
        return pmenuApi;
      case "2":
        return smenuApi;      
    }
  };

 const getTableIdByTab = (tab) => {
  switch (tab) {
    case "1": return "#primaryMenuTable";
    case "2": return "#secondaryMenuTable";
  }
};
  const columnSets = {
  pmenu: [
    { data: "id", title: "ID#" },
    { data: "name", title: "Menu Name" },
    { data: "link", title: "Menu Link" },
    { data: "added_by", title: "Added By" },
    { data: "dated", title: "Added On" },
    { data: "ord", title: "Menu Order" }
  ],

  smenu: [
    { data: "id", title: "ID#" },
    { data: "name", title: "Menu Name" },
    { data: "primary_menu", title: "Primary Menu" },
    { data: "link", title: "Menu Link" },
    { data: "added_by", title: "Added By" },
    { data: "dated", title: "Added On" },
    { data: "ord", title: "Menu Order" }
  ]
};
const extraColumns = [
{
  data: null,
  title: "Action",
  orderable: false,
  render: function (data, type, row) {

    return `
      <div class="dropdown">
        <button class="btn btn-sm btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
          <i class="fa fa-cog me-1"></i> Action
        </button>

        <ul class="dropdown-menu">

          <li>
            <a href="#"
               class="dropdown-item edit-row"
               data-id="${row.id}">
               <i class="fa fa-edit me-2 text-primary"></i>
               Edit
            </a>
          </li>

          <li>
            <a href="#"
               class="dropdown-item delete-row"
               data-id="${row.id}">
               <i class="fa fa-trash me-2 text-danger"></i>
               Delete
            </a>
          </li>

        </ul>
      </div>
    `;
  }
}
];
const handleDelete = (row) => {

  const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);

  console.log("DELETE API:", api);
  console.log("ROW:", row);

  Swal.fire({
    title: "Are you sure?",
    text: "This record will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {

    if (result.isConfirmed) {

      axios.delete(`${menu}/${row.id}`)
        .then((res) => {

          console.log("DELETE SUCCESS", res);

          Swal.fire(
            "Deleted!",
            "Record deleted successfully.",
            "success"
          );

          reloadTable();

        })
        .catch((err) => {

          console.error("DELETE ERROR", err);

          Swal.fire("Error!", "Failed to delete.", "error");
        });
    }
  });
};
const handleEdit = async (row) => {
  setRow(row)
  console.log(row, "row");
 const tab = getActiveTabFromUrl();
  try {
    const response = await axios.put(`${menu}/${row.id}`);
console.log(response.data)
    setSelectedRow(response.data);
    setEdit(true);

  } catch (error) {
    console.error("Error fetching full row data", error);
  }
};
  const GetDataTAble = (api, tableId) => {
    console.log(api)
    
 const baseColumns = api === pmenuApi
    ? columnSets.pmenu
    : columnSets.smenu;

  const columns = [...baseColumns, ...extraColumns];
if ($.fn.DataTable.isDataTable(tableId)) {
  $(tableId).DataTable().destroy();
}

$(tableId).empty(); 

    $(tableId).DataTable({
      serverSide: true,
      processing: true,
      paging: true,
      searching: true,
      destroy:true,
      ordering: true,
       scrollX: true,
      scrollCollapse: true,
      fixedColumns: { leftColumns: 1},
      pageLength: 10,
 columns: columns, 
      ajax: async function (data, callback) {
        const params = new URLSearchParams();
        params.append("start", data.start);
        params.append("length", data.length);
        params.append("search", data.search.value || "");
        try {
          const response = await fetch(`${api}?${params.toString()}`);
          const json = await response.json();
     const tableData = json.data.map((row) => ({
      id:row.id,
      name:row.name,
      link:row.link,
      added_by:row.added_by,
      dated:row.dated,
      ord:row.ord,
      primary_menu:row.primary_menu && row.primary_menu,
    }));
    console.log(tableData)
          callback({
            draw: data.draw,
            recordsTotal: json.recordsTotal,
            recordsFiltered: json.recordsFiltered,
            data: tableData,
          });
        } catch (error) {
          console.error(error);
          callback({
            draw: data.draw,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: [],
          });
        }
      },

  
    });
$(tableId).off("click", ".delete-row").on("click", ".delete-row", function (e) {
  e.preventDefault();

  const table = $(tableId).DataTable();
  const rowData = table.row($(this).parents("tr")).data();

  if (!rowData) {
    console.error("Row not found");
    return;
  }

  console.log("Row Data:", rowData);

  handleDelete(rowData);
});

$(tableId).off("click", ".edit-row").on("click", ".edit-row", function (e) {
  e.preventDefault();

  const table = $(tableId).DataTable();
  const rowData = table.row($(this).parents("tr")).data();

  if (!rowData) {
    console.error("Row not found");
    return;
  }

  console.log("Edit Row:", rowData);

  handleEdit(rowData);
});
  };

useEffect(() => {

  const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab);

  setTimeout(() => {
    if ($(tableId).length) {
      GetDataTAble(api, tableId);
    }
  }, 200);

  return () => {
    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().destroy();
    }
    $(tableId).empty();
  };

}, [location.search]);
  const tabContent = [
    {
      id: "1",
      label: "Primary Menu",
        component: (
  <Row>
    <Col sm="12">
      <Card>
       
        <CardBody>
          <table
            id="primaryMenuTable"
            className="table table-bordered w-100"
          />
          </CardBody>
          </Card></Col>
          </Row>
    
),
    },
    {
      id: "2",
      label: "Secondary Menu",
        component: (
  <Row>
    <Col sm="12">
      <Card>
       
        <CardBody>
          <table
            id="secondaryMenuTable"
            className="table table-bordered w-100"
          />
            </CardBody>
          </Card></Col>
          </Row>
    
),
    },
  ];
const reloadTable = () => {
  const tab = getActiveTabFromUrl();
  const tableId = getTableIdByTab(tab);

  if ($.fn.DataTable.isDataTable(tableId)) {
    $(tableId).DataTable().ajax.reload();
  }
};
 // returns array of tabs
  return (
    <Fragment>
      <Breadcrumbs parent='Setting' title='Manage Menu' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Manage Menu" />
              <CardBody>
<BasicTabCard
  tabContent={ManageMenuTab({reloadTable,selectedRow,Edit,setEdit,row})}
/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Menu List" />
              <CardBody>
                <BasicTabCard tabContent={tabContent} />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Fragment>
  );
};

export default Menu;
