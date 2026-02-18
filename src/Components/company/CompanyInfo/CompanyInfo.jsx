import React, { Fragment,useState,useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import { tableColumns, dummytabledata } from "../../../Data/Table/Defaultdata";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import CompanyInfoForm from "./CompanyInfoForm";
import { company_info, company } from "../../../api";
import axios from "axios";
import { useForm } from "react-hook-form";
import $ from "jquery";
import { toast } from "react-toastify";
import Loader from "../../../Layout/Loader";
const CompanyInfo = () => {
    const {
      register,
      control,
      setValue,
      handleSubmit,
      formState: { errors, isSubmitted, isValid },
    } = useForm({
      defaultValues: {
        company: null,
      },
    });
   const [loading, setLoading] = useState(false);
 
 useEffect(() => {
  $(document).off("click", ".update-btn");   
  $(document).on("click", ".update-btn", function () {
      const id = $(this).data("id");
      const updateData = {}; 
      const remarks = document.getElementById(`c${id}`).value;

      updateData.remarks=remarks;
    axios
      .put(`${company}/${id}`, updateData)
      .then(() => {
        toast.success("Data updated");
      })
      .catch(() => {
        toast.error("Error In Data update");
      });
  }); 
  return () => {   $(document).off("click", ".update-btn"); }; 
  }, []);
    function GetDataTAble(company_id, company_status) {
    const columns = [
      { data: "company_name", title: "Company Name" },
      { data: "qty7US", title: "Volume US(7days)" },
      { data: "qty7Canada", title: "Volume CA(7days)" },
      { data: "qty28US", title: "Volume US(28days)" },
      { data: "qty28Canada", title: "Volume CA(28days)" },
      { data: "company_status", title: "Status" },
      { data: "remarks", title: "Remarks" },
      { data: "action", title: "Action", orderable: false },
    ];

    $("#example").DataTable({
      serverSide: true,
      destroy: true,
      processing: true,
      responsive: true,
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 25,
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

      ajax: function (data, callback) {
        const params = new URLSearchParams();
        params.append("start", data.start);
        params.append("length", data.length);
        params.append("search", data.search.value || "");
        params.append("orderColumn", data.columns[data.order[0].column].data);
        params.append("orderDir", data.order[0].dir);
        params.append("company_id", company_id ? company_id : "");
        params.append("company_status", company_status ? company_status : "");
      
        fetch(`${company_info}?${params.toString()}`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json.data[0])
            const url = `${company_info}?${params.toString()}`;
            console.log("🔗 API URL:", url);
           const tableData = json.data.map((row) => ({    
  company_name: row.company_name,
  qty7US: row.qty7US,
  qty7Canada: row.qty7Canada,
  qty28US: row.qty28US,
  qty28Canada: row.qty28Canada,
  company_status: row.company_status,
  remarks: row.remarks,
  action: row.action,
}));

            console.log(tableData);

            callback({
              draw: data.draw,
              recordsTotal: json.recordsTotal,
              recordsFiltered: json.recordsFiltered,
              data: tableData,
            });
          })
          .catch((err) => {
            console.error("Error fetching table data:", err);
            callback({
              draw: data.draw,
              recordsTotal: 0,
              recordsFiltered: 0,
              data: [],
            });
          });
      },
    });
  }

  useEffect(() => {
 
      GetDataTAble();
   
  }, []);
    const onSubmit = (data) => {
      console.log(data)
    setLoading(true);
    const company_id = data.company_id? data.company_id:"";
    const company_status = data.company_status.value? data.company_status.value: "";
    console.log("Submitting:", {
      company_id,
      company_status,
    });

    if ($.fn.DataTable.isDataTable("#example")) {
      $("#example").DataTable().destroy();
    } 
    GetDataTAble(company_id,company_status);
    setLoading(false);
  };
  return (
    <Fragment>
      <Breadcrumbs parent="Company" title="Company Info" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                <CompanyInfoForm btnTtitle="Search Data" btnTtitle1="Reset"  onSearch={onSubmit}/>
              </CardBody>
            </Card>
          </Col>
        </Row> 
          <Card>
                <CardBody>
                  <HeaderCard
                    title="Rack Cent List"
                    download={true}
                    downloadHeading="Download"
                  />
                    <Row>
                      <Col sm="12">
                        {/* <div className="text-end my-3">
                          <button className="btn btn-primary">Delete Rack Cent</button>
                        </div> */}
                        {<Loader loading={loading} />}
                        <div className="table-responsive">
                          <table
                            id="example"
                            className="display table table-striped table-bordered nowrap"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>Company Name</th>
                                <th>Volume US(7days)</th>
                                <th>Volume CA(7days) </th>
                                <th>Volume US(28days) </th>
                                <th>Volume CA(28days) </th>
                                <th>Status </th> 
                                <th>Remarks </th> 
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </Col>
                    </Row>
                </CardBody>
              </Card>
      </Container>
    </Fragment>
  );
};

export default CompanyInfo;
