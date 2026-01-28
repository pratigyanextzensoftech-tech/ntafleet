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
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";
import usePaginatedTable from "../../../Hooks/usePagination";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
const UpdateFgRack = ({ title, btnTitle,apiName }) => {
  const[resetShow,setresetShow]=useState(false)
  const [tableColumns, setTableColumns] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
     const columnsMap = {
        "Company Name": "company_name",
        "Rack-Canada": "",
        "Rack-USA": "pricing_date",   
      };
  const {
        data,
        totalRows,
        loading:essoLoading,
        handlePageChange,
        handlePerRowsChange,
        handleSearch, // ✅ Added
        setData,
      } = usePaginatedTable({ apiUrl: apiName, columnsMap });
    
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setresetShow(true) 
   const cols = Object.keys(columnsMap).map((key) => ({
          name: key,
          selector: (row) => row[key],
          sortable: true,
          wrap: true,
        }));
                setTableColumns(cols);

  };
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
              <Row className="my-3">
                <Col  lg="8" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="4">
                          <InputGroupText>Pricing Date</InputGroupText>
                        </Col>
                        <Col xs="8">
                          <Controller
                            name="pricingDate"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>

                     
                    </FormGroup>
                  </Row>
                </Col>

                <Col className="ms-auto" lg="4" sm="12">
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
 <DataTableComponent
          title="Multiple FG Rack Cent Entry "
          tableColumns={tableColumns}
          tableData={data}
          loading={essoLoading}
          table={true}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      )}
       
    </Fragment>
  );
};

export default UpdateFgRack;
