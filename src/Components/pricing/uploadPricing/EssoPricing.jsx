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
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import { useSupplier } from "../../../Hooks/Dropdowns";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Papa from "papaparse";
import axios from "axios";
import { upload_esso_pricing } from "../../../api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { supplierById } from "../../../api";
const EssoPricing = ({ title, btnTtitle }) => {
  const [csvData, setCsvData] = useState([]);
  const [file, setFile] = useState(null);
    const [supplierData,setSupplierData]=useState([])
  const [pricingDate, setPricingDate] = useState(new Date());
  const { data: suppliers, loading } = useSupplier();
const [fileKey, setFileKey] = useState(Date.now());
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplier: null,
      pricingDate: new Date(),
    },
  });

  // 🧠 Auto-select default supplier
 useEffect(() => {
     
      axios
     .get(`${supplierById}/6`)
     .then((res) => {
       const formatted = res.data.map((s) => ({
         value: s.id,
         label: s.supplier_name,
       }));
 
       setSupplierData(formatted);
       setValue("supplier", formatted[0]);
 
       // ⭐ Automatically set default supplier based on type
       
     })
     .catch((err) => console.log(err));
    
   }, [setValue]);

  // 🧩 Handle CSV file upload
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

const formatDate = (value) => {
  if (!value) return "-";
  return dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "-";
};

  // 🧰 Key rename logic
  const keyMap = {
    "SITE NUMBER": "SITE_NUMBER",
    LOCATION: "LOCATION",
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

  const renameKeys = (row, keyMap) => {
  const newRow = {};
  for (const key in row) {
    const trimmedKey = key.trim(); // 🧹 remove leading/trailing spaces
    const newKey = keyMap[trimmedKey] || trimmedKey;
    newRow[newKey] = row[key];
  }
  return newRow;
};

  // 🧾 Handle form submission
  const onSubmit = async (data) => {
    if (!file) {
      alert("Please upload a CSV file first.");
      return;
    }

    // ✅ Transform the CSV data
    const enrichedData = csvData.map((row) => {
      const renamed = renameKeys(row, keyMap);
      return {
        ...renamed,
        supplier: data.supplier?.label,
        pricing_date: formatDate(pricingDate),
        idby: 1,
        dated: Date.now(),
      };
    });
    

    console.log("🧾 Final Data Sent:", enrichedData);
 
    try {
      const response = await axios.post(upload_esso_pricing, enrichedData);
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
        <Col sm="12">
          <fieldset>
            <legend>{title}</legend>
            <Form className="px-2" onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">
                {/* 📁 File Upload */}
                <Col sm="3">
                  <Row>
                    <Col className="pe-0" sm="3">
                      <InputGroupText>File</InputGroupText>
                    </Col>
                    <Col className="px-0" sm="9">
                      <Input
                        type="file"
                        className="form-control"
                        style={{ border: "1px solid #ccc" }}
                        accept=".csv"
                          key={fileKey}
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Row>
                </Col>

                {/* 📅 Pricing Date */}
                <Col sm="3">
                  <FormGroup>
                    <InputGroup>
                      <Col sm="3">
                        <InputGroupText>Pricing Date</InputGroupText>
                      </Col>
                      <Col sm="9">
                        <Controller
                          name="pricingDate"
                          control={control}
                          rules={{ required: "Pricing Date is required" }}
                          render={({ field }) => (
                            <DatePicker
                              className="form-control"
                              selected={pricingDate}
                              onChange={(date) => {
                                setPricingDate(date);
                                field.onChange(date);
                              }}
                              dateFormat="yyyy-MM-dd"
                              placeholderText="Select Pricing Date"
                            />
                          )}
                        />
                        {errors.pricingDate && (
                          <span className="text-danger">
                            {errors.pricingDate.message}
                          </span>
                        )}
                      </Col>
                    </InputGroup>
                  </FormGroup>
                </Col>

                {/* 🏢 Supplier Dropdown */}
                <Col sm="3">
                  <FormGroup>
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        control={control}
                        defaultValue={supplierData}
                        rules={{ required: "Supplier is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            placeholder={
                              loading
                                ? "Loading suppliers..."
                                : "Select supplier"
                            }
                            isLoading={loading}
                            onChange={(option) => field.onChange(option)}
                            value={field.value}
                          />
                        )}
                      />
                    </InputGroup>
                    {errors.supplier && (
                      <span className="text-danger">
                        {errors.supplier.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>

                {/* 🚀 Submit Button */}
                <Col sm="3" className="text-end">
                  <Btn
                    attrBtn={{
                      color: "primary",
                      className: "m-r-15",
                      type: "submit",
                    }}
                  >
                    {btnTtitle}
                  </Btn>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default EssoPricing;
