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
import { supplierById } from "../../../api";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import HeaderCard from "../../Common/Component/HeaderCard";
import * as XLSX from "xlsx";
import axios from "axios";
import { ul_pricing_upload } from "../../../api";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Ultramar = ({ title, btnTtitle }) => {
  const [excelData, setExcelData] = useState([]);
  const [file, setFile] = useState(null);
      const [supplierData,setSupplierData]=useState([])
  const [pricingDate, setPricingDate] = useState(new Date());
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

 useEffect(() => {
    
     axios
    .get(`${supplierById}/10`)
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

  // ✅ Define key mappings (uppercase)
  const keyMap = {
    "SITE NUMBER": "site",
    "DIESEL": "diesel",
    "PROV": "prov",
    "OLD PRICE": "old_price",
    "NEW PRICE": "new_price",
    "CARBON TAX": "carbon_tax",
    "PFT": "pft",
    "FED EX": "fed_ex",
    "SUB TOTAL": "sub_total",
    "GST / HST": "gst_hst",
    "PST": "pst",
    "TOTAL": "total",
  };

  // ✅ Excel file handler
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

    // Convert entire sheet into an array of arrays
    const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // 🔍 Find the header row by looking for one that contains "SITE" or "Diesel"
    let headerRowIndex = sheetData.findIndex(
      (row) =>
        row.some((cell) =>
          typeof cell === "string" &&
          (cell.toLowerCase().includes("site") ||
            cell.toLowerCase().includes("diesel"))
        )
    );

    if (headerRowIndex === -1) headerRowIndex = 1; // fallback

    const headers = sheetData[headerRowIndex];
    const rows = sheetData.slice(headerRowIndex + 1);

    // Map rows into objects
    const jsonData = rows.map((row) => {
      const obj = {};
      headers.forEach((header, i) => {
        if (header && header.trim() !== "") {
          obj[header.trim()] = row[i];
        }
      });
      return obj;
    });

    console.log("🧩 Detected Headers:", headers);
    console.log("✅ Parsed Excel Rows:", jsonData);

    setExcelData(jsonData);
  };

  reader.readAsBinaryString(file);
};


  // ✅ Normalize and rename keys
  const renameKeys = (row, keyMap) => {
    const newRow = {};
    for (const key in row) {
      const normalizedKey = key.trim().toUpperCase();
      const newKey = keyMap[normalizedKey] || key.trim();
      newRow[newKey] = row[key];
    }
    return newRow;
  };

  // ✅ Format date
  const formatDate = (value) => {
    if (!value) return "-";
    return dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "-";
  };

  // ✅ Form submission
  const onSubmit = async (data) => {
    if (!file) {
      alert("Please upload an Excel file first.");
      return;
    }

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
      const response = await axios.post(ul_pricing_upload, enrichedData);
      console.log("✅ Upload Success:", response.data);
        setFile(null);
        setFileKey(Date.now())
  setPricingDate("");
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
                {/* 🗂 File Upload */}
                <Col sm="3">
                  <Row>
                    <Col className="pe-0" sm="3">
                      <InputGroupText>File</InputGroupText>
                    </Col>
                    <Col className="px-0" sm="9">
                      <Input
                        type="file"
                         key={fileKey}
                        className="form-control"
                        style={{ border: "1px solid #ccc" }}
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
                              placeholderText="Select Pricing Date"
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

                {/* 🏢 Supplier Dropdown */}
                <Col sm="3">
                  <FormGroup>
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        control={control}
                        rules={{ required: "Supplier is required" }}
                        defaultValue={supplierData}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
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

export default Ultramar;
