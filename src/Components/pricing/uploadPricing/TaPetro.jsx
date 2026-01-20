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
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";
import axios from "axios";
import { ta_pricing_upload, ta_pricing_actual_upload } from "../../../api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { supplierById } from "../../../api";
const TaPetro = ({ title, btnTtitle, type }) => {
  const [excelData, setExcelData] = useState([]);
  const [file, setFile] = useState(null);
    const [supplierData,setSupplierData]=useState([])
  const [pricingDate, setPricingDate] = useState(new Date());
  const {data: suppliers, loading } = useSupplier();
const [fileKey, setFileKey] = useState(Date.now());
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplier: null,
      pricingDate: new Date(),
    },
  });
useEffect(() => {
    
     axios
    .get(`${supplierById}/3`)
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
   
  }, [ setValue]);

  // 📅 Date formatting helper
  const formatDate = (value) => {
    if (!value) return "-";
    return dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "-";
  };

  const keyMap = {
  "1": "loc_type",
  "2": "loc_id",
  "3": "travel_center",
  "4": "st",
  "5": "merchant_id",
  "6": "city_state",
 // "7": "city",
  "7": "rack_id",
  "8": "product_dispensed",
  "10": "deal_eff_date",
  "11": "index",
  "12": "freight",
  "13": "fed_tax",
  "14": "state_tax",
  "15": "sales_tax",
  "16": "state_ust",
  "17": "other_tax",
  "18": "additive_car_fee",
  "19": "ibp_adjustment",
  "20": "ibp_fuel_price",
  "21": "retail_price",
  "22": "retail_factor",
  "23": "retail_fuel_price",
  "24": "fuel_price",
  //"26": "saving_total",
  "26": "bulk_def_price"
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

  // 📘 Handle Excel file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // ✅ Convert rows to objects, skip first 7 rows
      const jsonData = sheetData
        .map((row, index) => {
          if (index < 7 || row.length === 0) return null;
          const obj = {};
          row.forEach((cell, colIndex) => {
            const value = typeof cell === "string" ? cell.trim() : cell;
            obj[`${colIndex + 1}`] = value;
            if(colIndex==5){
              const [city, state] = value.trim().split(',').map(s => s.trim());
              obj[`city`] = city; 
              obj[`saving_total`] = 0; 
              
            }
          });
          obj["rowNumber"] = index + 1;
          return obj;
        })
        .filter(Boolean); 

        console.log("🧾 Excel Data:", jsonData);

      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  // 🚀 Handle form submit
  const onSubmit = async (data) => {
    if (!file) {
      toast.error("Please upload an Excel file first.");
      return;
    }

    if (excelData.length === 0) {
      toast.error("No valid Excel data found!");
      return;
    }
 
  //   const formData = new FormData();
  //    formData.append("file", excelData);

  // // ✅ attach extra fields
  // formData.append("supplier", data.supplier?.label);
  // formData.append("pricing_date", formatDate(pricingDate));
  // formData.append("idby", 1);
  // formData.append("dated", Date.now());
     const enrichedData = excelData.map((row) => {
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
      const apiUrl = type === "taPetroAtual" ? ta_pricing_actual_upload : ta_pricing_upload;
      const response = await axios.post(apiUrl, enrichedData);
      console.log("✅ Upload Success:", response.data);
        setFile(null);
  setPricingDate("");
  setFileKey(Date.now());
      toast.success(`Upload successful! ${response.data.count || ""}`);
  

    } catch (error) {
      console.error("❌ Upload Error:", error);
      toast.error(
        `Upload failed: ${error.response?.data?.error || error.message}`
      );
    }
     
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form className="px-2" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">
                {/* 📂 File Upload */}
                <Col sm="3">
                  <Row>
                    <Col sm="3" className="pe-0">
                      <InputGroupText>File</InputGroupText>
                    </Col>
                    <Col sm="9" className="px-0">
                      <Input
                        type="file"
                         key={fileKey}
                        className="form-control"
                        accept=".xls, .xlsx"
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Row>
                </Col>

                {/* 📅 Pricing Date */}
                <Col sm="3">
                  <FormGroup>
                    <InputGroup>
                      <Col sm="4" className="pe-0">
                        <InputGroupText>Pricing Date</InputGroupText>
                      </Col>
                      <Col sm="8">
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
                </Col>

                {/* 🏭 Supplier Dropdown */}
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
                            placeholder="Select supplier"
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

                {/* 🚀 Submit */}
                <Col sm="3">
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

export default TaPetro;
