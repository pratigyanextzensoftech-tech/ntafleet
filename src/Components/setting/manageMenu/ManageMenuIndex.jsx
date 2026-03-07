import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DataTableComponent from "../../../Components/Tables/DataTable/DataTableComponent";
import { pmenu as pmenuApi, smenu as smenuApi } from "../../../api/index";
import usePaginatedTable from "../../../Hooks/usePagination";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import axios from "axios";
import Swal from "sweetalert2";
import { menu } from "../../../api";
// 🔹 Action Dropdown

const ManageMenuIndex = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [Edit, setEdit] = useState(false);
  const[Row,setRow]=useState([])
  const [filters, setFilters] = useState({});

  const loadTable = (tableId, apiUrl, includePrimary = false) => {

  if ($.fn.DataTable.isDataTable(tableId)) {
    $(tableId).DataTable().destroy();
  }

  let columns = [
    { data: "id", title: "ID" },
    { data: "name", title: "Menu Name" },
  ];

  if (includePrimary) {
    columns.push({
      data: "primary_menu",
      title: "Primary Menu"
    });
  }

  columns.push(
    { data: "link", title: "Menu Link" },
    { data: "added_by", title: "Added By" },
    { data: "dated", title: "Added On" },
    { data: "ord", title: "Menu Order" },
    {
      data: null,
      title: "Action",
      render: function (data) {
        return `
        <button class="btn btn-sm btn-success editBtn" data-id="${data.id}">
          Edit
        </button>
        <button class="btn btn-sm btn-danger deleteBtn" data-id="${data.id}">
          Delete
        </button>
        `;
      }
    }
  );

  $(tableId).DataTable({
    processing: true,
    ajax: {
      url: apiUrl,
      dataSrc: ""
    },
    columns: columns
  });

};


 useEffect(() => {

    loadTable("#primaryMenuTable", pmenuApi);
    loadTable("#secondaryMenuTable", smenuApi, true);

  }, []);

  // DELETE
  useEffect(() => {

    $(document).on("click", ".deleteBtn", function () {

      const id = $(this).data("id");

      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true
      }).then((result) => {

        if (result.isConfirmed) {

          axios.delete(`${menu}/${id}`).then(() => {

            Swal.fire("Deleted!", "Record deleted.", "success");

            $("#primaryMenuTable").DataTable().ajax.reload();
            $("#secondaryMenuTable").DataTable().ajax.reload();

          });

        }
      });

    });

    // EDIT
    $(document).on("click", ".editBtn", function () {
      const id = $(this).data("id");
      console.log("Edit ID:", id);
    });

  }, []);

  const tabContent = [
    {
      id: "1",
      label: "Primary Menu",
      component: (
        <table
          id="primaryMenuTable"
          className="table table-bordered"
          style={{ width: "100%" }}
        />
      ),
    },
    {
      id: "2",
      label: "Secondary Menu",
      component: (
        <table
          id="secondaryMenuTable"
          className="table table-bordered"
          style={{ width: "100%" }}
        />
      ),
    },
  ];

  return { tabs: tabContent };

};


export default ManageMenuIndex;
