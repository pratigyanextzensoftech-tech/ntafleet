import React, { Fragment, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  card_update as APINAME, updateHistory as api} from '../../../api/index'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';


const HistoryIndex = () => {
  useEffect(() => {
       
      GetDataTAble();
  }, []);

  function GetDataTAble( ) {
   const columns = [
  { data: "card_no", title: "CARD#" },
  { data: "content", title: "Updated" },
  { data: "susp_comp", title: "Suspicious" },
  { data: "last_login", title: "Last Login" },
  { data: "last_login_days", title: "Login Before" },
  { data: "ip_addr", title: "Updated IP" },
  { data: "dated", title: "Updated On" },
  { data: "added_by", title: "Updated By" },
  {
  data: "efs_done",
  title: "EFS Status",
  orderable: false,
  render: function (data, type, row) {
    return `
       <select class="form-select form-select-sm efs-status-change"
              data-id="${row.id}"
              data-efs="${data}">
        <option value="1" ${data == 1 ? "selected" : ""}>DONE ON EFS</option>
        <option value="0" ${data == 0 ? "selected" : ""}>PENDING ON EFS</option>
      </select>
    `;
  }
},

    ];
 

    $("#example").DataTable({
      serverSide: true,
      destroy: true,
      processing: true,
      paging: true,
      searching: true,
      ordering: true,
     scrollX: true,
         scrollCollapse: true,
          fixedColumns: { leftColumns: 1},
      pageLength: 10,
      columns: columns,
    
      columnDefs: [
        {
          targets: "_all",
          orderable: false,
        },
        {
          targets: [0, 1], // allow ordering only here
          orderable: true,
        },
      ],

    ajax: async function (data, callback) {
  const params = new URLSearchParams();
  params.append("start", data.start);
  params.append("length", data.length);
  params.append("search", data.search.value || "");
  params.append("orderColumn", data.columns[data.order[0].column].data);
  params.append("orderDir", data.order[0].dir);
   Object.keys(searchValues).forEach((key) => {
    params.append(key, searchValues[key] || "");
  });
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
     console.log(tableRes);
     
    // ✅ Map table data
    const tableData = tableRes.data.map((row) => ({
      card_no: row.card_no,
      content: row.content,
      "susp_comp":row.susp_comp,
      "last_login": row.last_login,
      "last_login_days": row.last_login_days,
      "ip_addr": row.ip_addr,
      dated: row.dated,
       "added_by":row.added_by,
        
    }));

    callback({
      draw: data.draw,
      recordsTotal: tableRes.recordsTotal,
      recordsFiltered: tableRes.recordsFiltered,
      data: tableData,
    });

  }
  
  catch (error) {
    console.error("Error:", error);
    callback({
      draw: data.draw,
      recordsTotal: 0,
      recordsFiltered: 0,
      data: [],
    });
  }
},
    });

$(document).off("focus", ".efs-status-change");

$(document).on("focus", ".efs-status-change", function () {
  $(this).data("previous", $(this).val());
});
$(document).off("change", ".efs-status-change");

$(document).on("change", ".efs-status-change", function () {

  const table = $("#example").DataTable();
  const selectElement = $(this);

  const id = selectElement.data("id");
  const newValue = selectElement.val();
  const oldValue = selectElement.data("previous");

  Swal.fire({
    title: "Are you sure?",
    text: "to change the Status?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, change it!",
  }).then(async (result) => {

    if (!result.isConfirmed) {
      selectElement.val(oldValue);
      return;
    }

    try {

      const userId = localStorage.getItem("userId");

      await axios.put(`${api}/${id}`, {
        efs_done_by: userId,
        efs_done: newValue
      });

      table.ajax.reload(null, false);

      Swal.fire("Updated!", "Status has been changed.", "success");

    } catch (error) {

      selectElement.val(oldValue);

      Swal.fire("Error", "Failed to update status", "error");
    }

  });

});

  }

let debounceTimer; // define outside the function so it persists
const searchValues = {};
const handleInputChange = (e) => {
  const key = e.target.name; // e.g., 'name', 'link', 'status'
  const value = e.target.value;
  searchValues[key] = value; // store value by name

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log("Fetching table with search values:", searchValues);

 

    GetDataTAble();
  }, 1000); // 500ms after last keystroke
};
  return (
    <Fragment>
      <Breadcrumbs parent="Fuel Cards" title="Fual Cards Update History" />
      <Container fluid={true}>
         <Row>
          <Col sm="12">
            <Card>
              
                <HeaderCard
                  title="User Login Log"
                />
             
              <CardBody>
          <div style={{"width":"100%", "overflow":"auto"}} >
                  <table
                    id="example"
                    className="display table table-striped table-bordered nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>CARD#</th>
                        <th>Updated </th>
                        <th>Suspicious </th>
                        <th> Last Login </th>
                        <th>Login Before </th>
                        <th>Updated IP </th> 
                        <th>Updated On </th> 
                        <th>Updated By</th>
                        <th>Status</th>
                      </tr>
                    
                    </thead>
                        <tr>
                    <th><input type="text" name="input1" id="1" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input2" id="2" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input3" id="3" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input4" id="4" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input5" id="5" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input6" id="6" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input7" id="7" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input8" id="8" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input9" id="9" onChange={handleInputChange} className="input-search"/></th>
                    <th></th>
                  </tr>
                    <tbody></tbody>
                  </table>
                </div>
               
                                </CardBody>
                                </Card>
                               </Col>
                               </Row>            
      </Container>
    </Fragment>
  );
};

export default HistoryIndex;