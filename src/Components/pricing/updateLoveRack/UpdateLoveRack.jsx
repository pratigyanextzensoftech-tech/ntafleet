import React, { Fragment,useState } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import $ from "jquery";
import {
  loc_group_Essogroup as APINAME,
  Esso_cent_Data,
  esso_cent_auto,
} from "../../../api";
const UpdateLoveRack = ({ title, btnTitle,apiName }) => {
  const[resetShow,setresetShow]=useState(false)
     const [dynamicColumns, setDynamicColumns] = useState([]);
     const [dynamicGroupIds, setGroupIds] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
   
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setresetShow(true) 
         fetch(APINAME)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setDynamicColumns(data.map((item) => item.name));
              setGroupIds(data.map((item) => item.id));
            } else {
              console.error("APINAME response is not an array:", data);
            }
          })
          .catch((err) => console.error(err));
  };


    $(document).ready(function () {
      $("#example").DataTable().clear().destroy();
      GetDataTAble();
    });
  
    function GetDataTAble() {
      const columns = [
        { data: "company_name", title: "Company Name" },
        ...dynamicColumns.map((col, idx) => ({ data: `col_${idx}`, title: col })),
      ];
  
      $("#example").DataTable({
        serverSide: true,
        processing: true,
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        pageLength: 200,
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
        
          fetch(`${Esso_cent_Data}?${params.toString()}`)
            .then((res) => res.json())
            .then((json) => {
              const url = `${Esso_cent_Data}?${params.toString()}`;
              console.log("🔗 API URL:", url);
              const tableData = json.data.map((row) => {
                const obj = {
                  company_name: row[0],
                };
                dynamicColumns.forEach((col, idx) => {
                  obj[`col_${idx}`] = row[idx + 3] || "";
                });
                return obj;
              });
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
  const handleReset=()=>{
    reset();
    setresetShow(false)
 
  }
  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form
              className="px-2"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row className="mt-3">
                <Col lg="8" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col sm="4" xs="12">
                          <InputGroupText>Pricing Date</InputGroupText>
                        </Col>
                        <Col sm="8" xs="12">
                          <Controller
                            name="pricingDate"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="yyyy-MM-dd"


                              />
                            )}
                          />
                        </Col>
                      </InputGroup>

                     
                    </FormGroup>
                  </Row>
                </Col>

                <Col  className="ms-auto" lg="4" sm="12">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        type: "submit",
                      }}
                    >
                      {resetShow?"Save Rack Pricing": btnTitle}
                    </Btn>
                    {resetShow && (
  <button className="btn btn-secondary" onClick={handleReset}
                      
                    >
                     Reset
                    </button>
                    )}
                    
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
      {resetShow &&(
        <>
<div className="table-responsive">
                  <table
                    id="example"
                    className="display table table-striped table-bordered nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        {dynamicColumns.map((col, idx) => (
                          <th key={idx}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
  <div className="text-end mt-2">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "m-r-15",
                        type: "submit",
                      }}
                    >Save Rack Pricing</Btn>
                    </div>

                </>
                
      )}
       
    </Fragment>
  );
};

export default UpdateLoveRack;
