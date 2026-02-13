import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Container,
  Card,
  CardBody,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import HeaderCard from "../../Common/Component/HeaderCard";
import InputText from "../../Forms/FormControl/formInput/InputText";
import {
  ta_group_Tagroup as APINAME,
  ta_group_TagroupInput,
  ta_cent,tacompany
} from "../../../api";
import $ from "jquery";
import axios from "axios";
import { toast } from "react-toastify";
const UlOwnerList = ({ title, btnTitle }) => {
  const [companyId, setCompnyId] = useState("");
  const [startDate, setStatrtDate] = useState("");
  const [endDate, setEndDate] = useState("");
   const [company,setCompany]=useState();
  const [loading, setLoading] = useState(false);
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dynamicGroupIds, setGroupIds] = useState([]);
  const [open, setOpen] = useState(false);
  
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
  useEffect(() => {
    fetch(APINAME)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDynamicColumns(data.map((item) => Number(item.ibp_adjustment).toFixed(4)));
          setGroupIds(data.map((item) => item.id));
        } 
        else {
          console.error("APINAME response is not an array:", data);
        }
      })
      .catch((err) => console.error(err));

       axios.get(tacompany)
      .then((res) => {
        const data = res.data;
        console.log(data)
          const options = [
  { value: '', label: 'All Companies' },
  ...data.map(company => ({
    value: company.company_id,
    label: company.company_name,
  }))
];

     setCompany(options)
      })
      .catch((err) => console.error(err));
  }, []);
useEffect(() => {
  if (company && company.length > 0) {
    setValue("company", company[0]); // set first option
  }
}, [company, setValue]);
useEffect(() => {
  if (dynamicColumns.length > 0) {
    GetDataTAble();
  }
}, [dynamicColumns]);
  // Step 2: Initialize DataTable
  useEffect(() => {
    $(document).on("click", ".update-btn", function () {
      const id = $(this).data("id");
      const updateData = {};
      dynamicGroupIds.forEach((groupid) => {
        const inputId = `#c${id}g${groupid}`;
        const value = $(inputId).val();
        updateData[`group_${groupid}`] = value;
      });

      axios.put(`${ta_cent}/${id}`, updateData)
        .then((response) => {
          toast.success("Data updated");
        })
        .catch((error) => {
          toast.error("Error In Data update");
        });
    });
  }, [dynamicColumns, companyId]);



  function GetDataTAble(company_id,from_date,upto_date,rack_ca,rack_qc,rack_us) {
    const columns = [
      { data: "company_name", title: "Company Name" },
      { data: "pricing_date", title: "Pricing Date" },
      ...dynamicColumns.map((col, idx) => ({ data: `col_${idx}`, title: col })),
      { data: "Action", title: "Action", orderable: false },
    ];

    $("#example").DataTable({
      serverSide: true,
      processing: true,
      responsive: true,
      destroy:true,
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
        params.append("company_id", company_id?company_id:"");
         params.append("rack_ca", rack_ca?rack_ca:"");
        params.append("rack_qc", rack_qc?rack_qc:"");
        params.append("rack_us", rack_us?rack_us:"");
        params.append("from_date", from_date?from_date:"");
        params.append("upto_date", upto_date?upto_date:"");
        fetch(`${ta_group_TagroupInput}?${params.toString()}`)
          .then((res) => res.json())
          .then((json) => {
            const url = `${ta_group_TagroupInput}?${params.toString()}`;
            console.log("🔗 API URL:", url);
            const tableData = json.data.map((row) => {
              const obj = {
                company_name: row[0],
                pricing_date: row[1],
                Action: row[2],
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
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onSubmit = (data) => {
    
    const company_id = data.company?.value ?? "";
  const from_date = data.from
    ? formatDate(data.to)
    : "";
  const upto_date = data.to
    ? formatDate(data.to)
    : "";
 const rack_ca = data.rack_ca? data.rack_ca: "";
     const rack_qc = data.rack_qc? data.rack_qc: "";
     const rack_us = data.rack_us? data.rack_us: "";
   
  console.log("Submitting:", {
    company_id,
    from_date,
    upto_date,
  });

  if ($.fn.DataTable.isDataTable("#example")) {
    $("#example").DataTable().destroy();
  }

  GetDataTAble(company_id, from_date, upto_date,rack_ca,rack_qc,rack_us);
    
  };
  return (
    <Fragment>
      <Card>
        <CardBody>
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
                <Col xl="3" md="6" sm="12">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Company</InputGroupText>
                      <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={company}
                            className="form-control p-0 border-0"
                            placeholder="Select a company"
                              menuPortalTarget={document.body}
                                menuPosition="fixed"
                                styles={{
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 99999,
                                  }),
                                }}
                          />
                        )}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                         <Col   xl="3"  md="6" sm="12">
 <InputText
            name="rack_ca"
            label="Rack On"
            type="text"
            register={register}
            errors={errors}
            // rules={ { required: "Required" }}
            
          />
</Col>
  <Col   xl="3"  md="6" sm="12">
 <InputText
            name="rack_qc"
            label="Rack-QC,PQ"
            type="text"
            register={register}
            errors={errors}
            
          />
</Col>
  <Col   xl="3"  md="6" sm="12">
 <InputText
            name="rack_us"
            label="Rack-Other"
            type="text"
            register={register}
            errors={errors}
            
          />
</Col>
                <Col xl="3" md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="4">
                          <InputGroupText>From</InputGroupText>
                        </Col>
                        <Col xs="8">
                          <Controller
                            name="from"
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
                <Col xl="3" md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="4">
                          <InputGroupText>Upto</InputGroupText>
                        </Col>
                        <Col xs="8">
                          <Controller
                            name="to"
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

                <Col className="ms-auto" xl="2" md="2" sm="12">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        type: "submit",
                      }}
                    >
                      {btnTitle}
                    </Btn>
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
      </CardBody>
      </Card>
      <Card>
                      <CardBody>
                               <HeaderCard title="Rack Cent List" download={true} downloadHeading="Download"/>
      <Container fluid>
        <Row>
          <Col sm="12">
          <div className="text-end my-3">
                <button className="btn btn-primary">Delete Rack Cent</button>
                </div>
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <table
                    id="example"
                    className="display table table-striped table-bordered nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Pricing Date</th>
                        {dynamicColumns.map((col, idx) => (
                          <th key={idx}>{col}</th>
                        ))}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      </CardBody></Card>
    </Fragment>
  );
};

export default UlOwnerList;
