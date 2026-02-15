import React, { Fragment, useState } from "react";
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
import Select from "react-select";
import { supplier } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";
import Papa from "papaparse";
import axios from "axios";
import dayjs from "dayjs";
import { formatDate } from "../../../Hooks/Dropdowns";
import { Esso_csv_upload } from "../../../api";
import {toast} from "react-toastify";
const UploadEssoGroupRackForm = ({ title, btnTitle }) => {
  const [fileKey, setFileKey] = useState(Date.now());
   const [csvData, setCsvData] = useState([]);
    const [file, setFile] = useState(null);
    const [pricingDate, setPricingDate] = useState(new Date());
  
  const {
    register,
    control,
    
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();

    const keyMap = {
    "1": "SITE_NUMBER",
    "2": "LOCATION",
    "PRICE_LTR": "PROV",
    PRODUCT: "PRODUCT",
    "PROV.": "PROV",
    "NET PRICE": "NET_PRICE",
    FET: "FET",
    PFT: "PFT",
    PCT: "PCT",
    LOCAL: "LOCAL",
    "PRICE/LTR.": "PRICE_LTR",
    "GST/HST/FNT": "GST_HST_FNT",
    "PST/QST": "PST_QST",
    "TOTAL PRICE": "TOTAL_PRICE",
  };
 

  const renameKeys = (row) => {
  const newRow = {};
  for (const key in row) {
    if (!Object.prototype.hasOwnProperty.call(row, key)) continue;

    const trimmedKey = typeof key === "string" ? key.trim() : key;
    newRow[key] = row[key];
    console.log(newRow)
  }

  return newRow; // ✅ return object, NOT trim
};
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setFile(file);
  
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("Parsed CSV Data:", results.data);
          setCsvData(results.data);
        },
      });
    };
  const onSubmit = async (data) => {
    if (!file) {
      alert("Please upload a CSV file first.");
      return;
    }

    // ✅ Transform the CSV data
    const enrichedData = csvData.map((row) => {
      const renamed = renameKeys(row);
      return {
        ...renamed,
        pricing_date: String(formatDate(pricingDate) || "").trim(),
        idby: Number(localStorage.getItem("userId")),
        dated: Date.now(),
      };
    });
    
    console.log("🧾 Final Data Sent:", enrichedData);
    try {
      const response = await axios.post(Esso_csv_upload, enrichedData);
      console.log("✅ Upload Success:", response.data);
      
      toast.success(`Upload successful! ${response.data.count || ""}`)
       setFile(null);
    setFileKey(Date.now()); 
    setPricingDate("");
      // alert(`Upload successful! ${response.data.count || ""}`);
    } catch (error) {
      console.error("❌ Upload Error:", error);
            toast.error(`Upload failed: ${error.response?.data?.error || error.message}`)

      // alert(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
  };
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
              <Row className="mt-3 ">
                <Col xl="4"  md="6" sm="12">
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
                            rules={{ required: " Required" }}
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

                      {errors.pricingDate && (
                        <span className="text-danger">
                          {errors.pricingDate.message}
                        </span>
                      )}
                    </FormGroup>
                 </Row>
                </Col>
                  <Col  xl="4"  md="6" sm="12">
                                    <Row className="mb-3">
                                                      <InputGroup>
                                                      <Col  xs="3">
                                                        <InputGroupText>File</InputGroupText>
                                                      </Col>
                                                      <Col  xs="9">
                                                        <Input
                                                          type="file"
                                                          className="form-control"
                                                          style={{ border: "1px solid #ccc" }}
                                                          accept=".csv"
                                                          key={fileKey}
                                                          onChange={handleFileChange}
                                                        />
                                                      </Col>
                                                      </InputGroup>
                                                    </Row>

                                  </Col>
                                 
                <Col className="ms-auto"  xl="4"  md="6" sm="12">
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
    </Fragment>
  );
};

export default UploadEssoGroupRackForm;
