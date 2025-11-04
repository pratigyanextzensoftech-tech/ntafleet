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
import HeaderCard from "../../Common/Component/HeaderCard";
import * as XLSX from "xlsx";
import axios from "axios";
import { ta_pricing, ta_pricing_actual } from "../../../api";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const TaPetro = ({ title, btnTtitle, type }) => {
  const [excelData, setExcelData] = useState([]);
  const [file, setFile] = useState(null);
  const [pricingDate, setPricingDate] = useState(new Date());
  const { data: suppliers, loading } = useSupplier();

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
    if (suppliers.length > 0) {
      setValue("supplier", suppliers[1]); // default supplier like TaPetro
    }
  }, [suppliers, setValue]);

  // 🧩 Key Map (same as TaPetro)
  const keyMap = {
    "Id":"id",
    "Type": "loc_type",
    "#": "loc_id",
    "Travel Center": "travel_center",
    "ST": "st",
    "Merchant ID": "merchant_id",
    "(City/State)": "city_state",
    "(City/State)":"city",
    "Rack ID": "rack_id",
    "Dispensed": "product_dispensed",
    "Date":"deal_eff_date",
    "Index": "index",
    "Freight": "freight",
    "Tax":"fed_tax",
    "Tax":"state_tax",
    "Tax":"sales_tax",
    "":"state_ust",
    "":"other_tax",
    "Adjustment": "Adjustment",
    "Fuel Price": "fuel_price",
    "Savings": "saving_total",
    "Price": "bulk_def_price",
  };

  // 🧹 Remove whitespace and rename keys
  const renameKeys = (row, keyMap) => {
    const newRow = {};
    for (const key in row) {
      const trimmedKey = key.trim();
      const newKey = keyMap[trimmedKey] || trimmedKey;
      newRow[newKey] = row[key];
    }
    return newRow;
  };

  // 📅 Format date
  const formatDate = (value) => {
    if (!value) return "-";
    return dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "-";
  };

  // 📘 Handle Excel upload
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
      console.log("📄 Raw Excel Data:", sheetData.slice(0, 10));

      // 🔍 Find header row
      const headerIndex = sheetData.findIndex(
        (row) =>
          row.includes("Type") || row.includes("#")
      );

      if (headerIndex === -1) {
        toast.error("Could not find valid header row in Excel file!");
        return;
      }

      const headers = sheetData[headerIndex];
      const rows = sheetData.slice(headerIndex + 1);

      const jsonData = rows.map((row) => {
        const obj = {};
        headers.forEach((header, i) => {
          if (header && header.trim() !== "") {
            obj[header.trim()] = row[i];
          }
        });
        return obj;
      });

      console.log("✅ Processed Excel Data:", jsonData.slice(0, 3));
      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  // 🚀 Submit handler
  const onSubmit = async (data) => {
    if (!file) {
      toast.error("Please upload an Excel file first.");
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
      const apiUrl = type === "taPetroAtual" ? ta_pricing_actual : ta_pricing;
      const response = await axios.post(apiUrl, enrichedData);
      console.log("✅ Upload Success:", response.data);
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
                        rules={{ required: "Supplier is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                            options={suppliers}
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
