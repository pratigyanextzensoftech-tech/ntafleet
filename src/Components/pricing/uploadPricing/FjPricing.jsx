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
import Select from "react-select";
import { pricing, supplierById } from "../../../api/index";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
const FjPricing = ({ title, btnTtitle }) => {
  const [excelData, setExcelData] = useState([]);
  const [file, setFile] = useState(null);
  const [supplierData, setSupplierData] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [pricing_date, Setpricing_date] = useState("");

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
        setValue("supplier", formatted[0]);

        // ⭐ Automatically set default supplier based on type
      })
      .catch((err) => console.log(err));
  }, [ setValue]);

  const AllColmn = [
  "site","city","prov","prod","rack_id","rack_city","rack_prov",
  "cost","federal_tax","state_tax","sales_tax","super_fund",
  "freight_fee","pump_fee","other_fee",
  "base_price","excise_tax_fees","prov_fuel_tax_fees","carbon_tax_fees",
  "fuel_price","g_hst","in_tax_price","qst",
  "total_cost","retail_price","disc_retail","your_price","savings_total"
];

const pilotMap = {
  site:0, city:1, prov:2, prod:3, rack_id:4, rack_city:5, rack_prov:6,
  cost:7, federal_tax:8, state_tax:9, sales_tax:10, super_fund:11,
  freight_fee:12, pump_fee:13, other_fee:15,
  total_cost:16, retail_price:17, disc_retail:18, your_price:19, savings_total:20
};

const otherMap = {
  site:0, city:1, prov:2, prod:3, rack_id:4, rack_city:5, rack_prov:6,
  freight_fee:8, pump_fee:9, other_fee:10,
  base_price:11, excise_tax_fees:12, prov_fuel_tax_fees:13,
  carbon_tax_fees:14, fuel_price:15,
  g_hst:17, in_tax_price:18, qst:19,
  total_cost:20, retail_price:21, disc_retail:22, your_price:23, savings_total:24
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
            Sup =row[7] === "US Direct Bill-Pilot Travel Centers LLC"? "Pilot Flying J": row[10]? "Shell Flying J": "";
            setSupplier(Sup);
            Setpricing_date(p_date);
          }
          if (index < 6) return null;
          const obj = {};
          if (index >= 6) {
  const map = Sup === "Pilot Flying J" ? pilotMap : otherMap;
const idby= Number(localStorage.getItem("userId"));
  AllColmn.forEach((col) => {
    const colIndex = map[col];

    let value =
      colIndex !== undefined && row[colIndex] !== undefined
        ? row[colIndex]
        : 0;

    // Trim strings
    if (typeof value === "string") {
      value = value.trim();
    }

    obj[col] = value || 0; // ensure 0 if empty/null
  });

  obj.supplier = Sup;
  obj.pricing_date = p_date;
  obj.idby=idby
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

    // const enrichedData = excelData.map((row, index) => {
    //   return {
    //      ...row,
    //     idby: Number(localStorage.getItem("userId")),
    //     // dated: Date.now(),
    //   };
    // });

    console.log("🧾 Final Data Sent:", excelData);
    try {
      const response = axios.post(pricing+"/upload", excelData);
      console.log("✅ Upload Success:", response);
      setFile(null);
     
      toast.success(`CSV rows inserted successfully}`);
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
                            placeholder=
                                 "Select supplier"
                            // options={suppliers}
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
