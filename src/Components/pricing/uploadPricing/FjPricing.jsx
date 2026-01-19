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
import {pricing, supplierById} from '../../../api/index'
import axios from "axios";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
const FjPricing = ({ title, btnTtitle }) => {
  const [excelData, setExcelData] = useState([]);
  const [Title,setTitle]=useState("")
    const [file, setFile] = useState(null);
      const [supplierData,setSupplierData]=useState([])
    const [pricingDate, setPricingDate] = useState(new Date());
    const {data: suppliers, loading } = useSupplier();
  const [fileKey, setFileKey] = useState(Date.now());

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
    
     axios
    .get(`${supplierById}/1`)
    .then((res) => {
      const formatted = res.data.map((s) => ({
        value: s.id,
        label: s.supplier_name,
      }));

      setSupplierData(formatted);
      setValue("supplier", supplierData);

      // ⭐ Automatically set default supplier based on type
      
    })
    .catch((err) => console.log(err));
   
  }, [supplierData, setValue]);

 const formatDate = (value) => {
    if (!value) return "-";
    return dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "-";
  };
 const PilotkeyMap = {
  0: "site",               // Site
  1: "city",               // City
  2: "st",                 // ST
  3: "product_id",         // Prod ID
  4: "rack_city",          // Rack City
  5: "rack_state",         // ST (Rack)
  6: "cost",               // Cost
  7: "taxes",              // Taxes
  8: "fees_1",             // Fees
  9: "fees_2",             // Fees
  10: "fund_fees",         // Fund/Fees
  11: "freight",           // Freight
  12: "fee",               // Fee
  13: "other",             // Other
  14: "total_cost",        // Total Cost
  15: "retail_price",      // Retail Price
  16: "retail",            // Retail
  17: "price",             // Price
  18: "savings_total"      // Savings Total
};
const ShellkeyMap = {
  0: "Site",
  1: "City",
  2: "V",
  3: "Prod",
  4: "k ID",
  5: "Rack City",
  6: "Prov",
  7: "Cost",
  8: "Fee",
  9: "Fee",
  10: "Fee",
  11: "Price",
  12: "Fees",
  13: "Fees",
  14: "Fees",
  15: "Price",
  16: "G/HST",
  17: "Price",
  18: "QST",
  19: "Cost",
  20: "Price",
  21: "Retail",
  22: "Price",
  23: "s Total"
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
          // console.log(row,"row")  
          //  console.log(index,"index")
           if (index < 2 || row.length === 0) return null;
           const obj = {};
           row.forEach((cell, colIndex) => {
             const value = typeof cell === "string" ? cell.trim() : cell;
             obj[`${colIndex + 1}`] = value;
            //  if(colIndex==3){
            //    const [date, title] = value.trim().split(',').map(s => s.trim());
            //    obj[`date`] = row.additive_car_fee; 
            //    obj[`title`] = row.product_dispensed; 
               
            //  }
            //  console.log(obj[`date`],"date")
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



  const onSubmit = (data) => {
       if (!file) {
           toast.error("Please upload an Excel file first.");
           return;
         }
     
         if (excelData.length === 0) {
           toast.error("No valid Excel data found!");
           return;
         }
      
     
          const enrichedData = excelData.map((row,index) => {
               let fileTitle="CDN Direct Bill- SFJ Shell Flying J";
            if(index==0  ){
           console.log(row)
              setTitle(fileTitle==="CDN Direct Bill- SFJ Shell Flying J"?row[11]:row[8])
              setPricingDate(Title==="CDN Direct Bill- SFJ Shell Flying J"?row[22].slice(15,25): row[18].slice(15,25))
            }
           const renamed = renameKeys(row, fileTitle==="CDN Direct Bill- SFJ Shell Flying J"? ShellkeyMap:PilotkeyMap);
           return {
             ...renamed,
             supplier: data.supplier?.label,
             pricing_date:pricingDate,
             idby: 1,
             dated: Date.now(),
           };
         });
     
         console.log("🧾 Final Data Sent:", enrichedData);
         
          try {
           const response =  axios.post(pricing, enrichedData);
           console.log("✅ Upload Success:", response.data);
             setFile(null);
       setPricingDate("");
       setFileKey(Date.now());
           toast.success(`Upload successful! ${response|| ""}`);
       
     
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
                          defaultValue={supplierData}
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
