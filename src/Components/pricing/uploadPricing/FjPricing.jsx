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
import { pricing, supplierById } from "../../../api/index";
import axios from "axios";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
const FjPricing = ({ title, btnTtitle }) => {
  const [excelData, setExcelData] = useState([]);
  const [Title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [supplierData, setSupplierData] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [pricing_date, Setpricing_date] = useState("");
  const [pricingDate, setPricingDate] = useState(new Date());
  const { data: suppliers, loading } = useSupplier();
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
    0: "site", // Site
    1: "city", // City
    2: "st", // ST
    3: "product_id", // Prod ID
    4: "rack_city", // Rack City
    5: "rack_state", // ST (Rack)
    6: "cost", // Cost
    7: "taxes", // Taxes
    8: "fees_1", // Fees
    9: "fees_2", // Fees
    10: "fund_fees", // Fund/Fees
    11: "freight", // Freight
    12: "fee", // Fee
    13: "other", // Other
    14: "total_cost", // Total Cost
    15: "retail_price", // Retail Price
    16: "retail", // Retail
    17: "price", // Price
    18: "savings_total", // Savings Total
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
    23: "s Total",
  };

  const AllColmn = [
    "site",
    "city",
    "prov",
    "prod",
    "rack_id",
    "rack_city",
    "rack_prov",
    "cost",
    "federal_tax",
    "state_tax",
    "sales_tax",
    "super_fund",
    "freight_fee",
    "pump_fee",
    "other_fee",
    "base_price",
    "excise_tax_fees",
    "prov_fuel_tax_fees",
    "carbon_tax_fees",
    "fuel_price",
    "g_hst",
    "in_tax_price",
    "qst",
    "total_cost",
    "retail_price",
    "disc_retail",
    "your_price",
    "savings_tota",
  ];

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
      let p_date, Sup;
      // ✅ Convert rows to objects, skip first 7 rows
      const jsonData = sheetData
        .map((row, index) => {
          if (index === 3) {
            const pricingdate = row[17] || row[21] || "";
            const match = pricingdate.match(/\d{4}-\d{2}-\d{2}/);
            p_date = match ? `${match[0]} 00:00:00` : "";

            Sup =
              row[7] === "US Direct Bill-Pilot Travel Centers LLC"
                ? "Pilot Flying J"
                : row[10]
                  ? "Shell Flying J"
                  : "";
            setSupplier(Sup);
            Setpricing_date(p_date);
          }
          if (index < 6) return null;
          const obj = {};
          if (index >= 6) {
            row.forEach((cell, colIndex) => {
              AllColmn.forEach((col) => {
 
                if (col === "site") {obj[col] = Sup === "Pilot Flying J" ? cell[0] : cell[0];}
                if (col === "city") {obj[col] = Sup === "Pilot Flying J" ? cell[1] : cell[1];}
                if (col === "prov") {obj[col] = Sup === "Pilot Flying J" ? cell[2] : cell[2];}
                if (col === "prod") {obj[col] = Sup === "Pilot Flying J" ? cell[3] : cell[3];}
                if (col === "rack_id") {obj[col] = Sup === "Pilot Flying J" ? cell[4] : cell[4];}
                if (col === "rack_city") {obj[col] = Sup === "Pilot Flying J" ? cell[5] : cell[5];}
                if (col === "rack_prov") {obj[col] = Sup === "Pilot Flying J" ? cell[6] : cell[6];}
                if (col === "cost") {obj[col] = Sup === "Pilot Flying J" ? cell[7] : cell[7];}
                if (col === "federal_tax") {obj[col] = Sup === "Pilot Flying J" ? cell[8] : 0;}
                if (col === "state_tax") {obj[col] = Sup === "Pilot Flying J" ? cell[9] : 0;}
                if (col === "sales_tax") {obj[col] = Sup === "Pilot Flying J" ? cell[10] : 0;}
                if (col === "super_fund") {obj[col] = Sup === "Pilot Flying J" ? cell[11] : 0;}
                if (col === "freight_fee") {obj[col] = Sup === "Pilot Flying J" ? cell[12] : cell[8];}
                if (col === "pump_fee") {obj[col] = Sup === "Pilot Flying J" ? cell[13] : cell[9];}
                if (col === "other_fee") {obj[col] = Sup === "Pilot Flying J" ? cell[15] : cell[10];} 
                if (col === "base_price") {obj[col] = Sup === "Pilot Flying J" ? 0 : cell[11];}
                if (col === "excise_tax_fees") {obj[col] = Sup === "Pilot Flying J" ? 0 : cell[12];}
                if (col === "prov_fuel_tax_fees") {obj[col] = Sup === "Pilot Flying J" ? 0 : cell[13];}
                if (col === "carbon_tax_fees") {obj[col] = Sup === "Pilot Flying J" ? 0 : cell[14];}
                if (col === "fuel_price") {obj[col] = Sup === "Pilot Flying J" ? 0 : cell[15];}
                if (col === "g_hst") {obj[col] = Sup === "Pilot Flying J" ? 0 : cell[17];}
                if (col === "in_tax_price") {obj[col] = Sup === "Pilot Flying J" ? 0 : cell[18];}
                if (col === "qst") {obj[col] = Sup === "Pilot Flying J" ? 0 : cell[19];} 
                if (col === "total_cost") {obj[col] = Sup === "Pilot Flying J" ? cell[16] : cell[20];}
                if (col === "retail_price") {obj[col] = Sup === "Pilot Flying J" ? cell[17] : cell[21];}
                if (col === "disc_retail") {obj[col] = Sup === "Pilot Flying J" ? cell[18] : cell[22];}
                if (col === "your_price") {obj[col] = Sup === "Pilot Flying J" ? cell[19] : cell[23];}
                if (col === "savings_total") {obj[col] = Sup === "Pilot Flying J" ? cell[20] : cell[24];}
              });

              //obj[`${colIndex + 1}`] =typeof cell === "string" ? cell.trim() : cell;
            });
            obj["supplier"] = Sup;
            obj["pricing_date"] = p_date;
          }
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

    const enrichedData = excelData.map((row, index) => {
      let fileTitle = "CDN Direct Bill- SFJ Shell Flying J";
      if (index == 0) {
        setTitle(
          fileTitle === "CDN Direct Bill- SFJ Shell Flying J"
            ? row[11]
            : row[8],
        );
        setPricingDate(
          Title === "CDN Direct Bill- SFJ Shell Flying J"
            ? row[22].slice(15, 25)
            : row[18].slice(15, 25),
        );
      }
      const renamed = renameKeys(
        row,
        fileTitle === "CDN Direct Bill- SFJ Shell Flying J"
          ? ShellkeyMap
          : PilotkeyMap,
      );
      return {
        ...renamed,
        supplier: data.supplier?.label,
        pricing_date: pricingDate,
        idby: 1,
        dated: Date.now(),
      };
    });

    console.log("🧾 Final Data Sent:", enrichedData);

    try {
      const response = axios.post(pricing, enrichedData);
      console.log("✅ Upload Success:", response.data);
      setFile(null);
      setPricingDate("");
      setFileKey(Date.now());
      toast.success(`Upload successful! ${response || ""}`);
    } catch (error) {
      console.error("❌ Upload Error:", error);
      toast.error(
        `Upload failed: ${error.response?.data?.error || error.message}`,
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
                              loading
                                ? "Loading suppliers..."
                                : "Select supplier"
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
