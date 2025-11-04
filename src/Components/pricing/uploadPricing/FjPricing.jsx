import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { useSupplier } from "../../../Hooks/Dropdowns";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Papa from "papaparse";
import {pricing} from '../../../api/index'
import axios from "axios";
const FjPricing = ({ title, btnTtitle }) => {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
   const [File, setFile] = useState(null);
  const { data: suppliers, loading } = useSupplier();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplier: null,
    },
  });

  useEffect(() => {
    // Set default supplier automatically when data loads
    if (suppliers.length > 0) {
      setValue("supplier", suppliers[0]);
    }
  }, [suppliers, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed CSV Data:", results.data);
        setCsvData(results.data);
        setColumns(Object.keys(results.data[0] || {}));
      },
    });
  };

  const onSubmit = (data) => {
      if (!File) {
    alert("Please upload a file first");
    return;
  }
    console.log("✅ Form Data:", data);
     const formData = new FormData();
    formData.append("supplier_id", data.supplier?.value);
        formData.append("file", File);

    console.log(File);
axios.post(pricing,formData,{
  "pricing_date":""

})
.then((res)=> console.log(res))
.catch((err)=>console.log(err))
    // Example API call
    // axios.post("/api/upload", formData);
  };

  

  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form className="px-2" onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">
                {/* File Upload */}
                <Col sm="4">
                  <Row>
                    <Col className="pe-0" sm="3">
                      <InputGroupText>File</InputGroupText>
                    </Col>
                    <Col className="px-0" sm="9">
                      <Input
                        style={{ border: "1px solid #ccc" }}
                        className="form-control"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Row>
                </Col>

                {/* Supplier Dropdown */}
                <Col sm="4">
                  <FormGroup>
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        control={control}
                          defaultValue={suppliers[0] || null}
                        rules={{ required: "Supplier is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            placeholder={
                              loading ? "Loading suppliers..." : "Select supplier"
                            }
                            // options={suppliers}
                            isLoading={loading}
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                            value={field.value}
                          />
                        )}
                      />
                    </InputGroup>
                    {errors.supplier && (
                      <span className="text-danger">
                        {errors.supplier?.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>

                {/* Submit Button */}
                <Col sm="4">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "m-r-15",
                        type: "submit",
                      }}
                    >
                      {btnTtitle}
                    </Btn>
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default FjPricing;
