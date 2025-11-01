import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import useSelectableColumns from "../../../Hooks/useSelectableColumns";
import {
  ta_pricing_actual as TA_ACTUAL_API,
  ta_pricing as TA_CAPPED_API,
  esso_pricing as esso_pricing,
  love_pricing as LOVE_CAPPED_API,
  love_pricing_actual as LOVE_ACTUAL_API,
  ul_pricing as ULTRAMAR_API,
  pricing
} from "../../../api";
import usePaginatedTable from "../../../Hooks/usePagination";

const Index = () => {
 const { createColumns } = useSelectableColumns();
  // ✅ Define individual column mappings per API
  const columnSets = {
    taActual: {
    "id":"id",
        "Date": "pricing_date",
        "Supplier": "supplier",
        "Loc Type ": "loc_type",
        "Loc #": "loc_id",
        "Travel Center": "travel_center",
        "ST": "st",
        "Merchant ID": "merchant_id",
        "City/State": "city_state",
        "Rack ID": "rack_id",
        "Dispensed": "product_dispensed",
        "Index": "index",
        "Freight": "freight",
        "IBP Price": "ibp_fuel_price",
        "Retail Price": "retail_price",
        "R.Fuel Price": "retail_fuel_price",
        "Fuel Price": "fuel_price",
        "Savings": "saving_total",
        "Bulk DEF": "bulk_def_price",
    },
    taCapped: {
    "id":"id",
        "Date": "pricing_date",
        "Supplier": "supplier",
        "Loc Type ": "loc_type",
        "Loc #": "loc_id",
        "Travel Center": "travel_center",
        "ST": "st",
        "Merchant ID": "merchant_id",
        "City/State": "city_state",
        "Rack ID": "rack_id",
        "Dispensed": "product_dispensed",
        "Index": "index",
        "Freight": "freight",
        "IBP Price": "ibp_fuel_price",
        "Retail Price": "retail_price",
        "R.Fuel Price": "retail_fuel_price",
        "Fuel Price": "fuel_price",
        "Savings": "saving_total",
        "Bulk DEF": "bulk_def_price",

    },
     esso: {
    id: "id",
    Date: "pricing_date",
    Supplier: "supplier",
    "SITE NUMBER": "SITE_NUMBER",
    LOCATION: "LOCATION",
    "PROV.": "PROV",
    PRODUCT: "PRODUCT",
    "NET PRICE": "NET_PRICE",
    FET: "FET",
    PFT: "PFT",
    PCT: "PCT",
    LOCAL: "PCT",
    "PRICE/LTR.": "PRICE_LTR",
    "GST/HST/FNT": "GST_HST_FNT",
    "PST/QST": "PST_QST",
    "TOTAL PRICE": "TOTAL_PRICE",
  },
    flyingJ: {
         id: "id",
      Date: "pricing_date",
      Supplier: "supplier",
      "site ": "site",
      "city": "city",
      "Prov": "prov",
      "Prod": "prod",
      "	Rack ID": "rack_id",
      "Rack City": "rack_city",
      "	Rack Prov": "rack_prov",
      "	Cost": "cost",
      "	Total Cost": "total_cost",
      "Retail Price":"retail_price",
      "Disc Retail":"disc_retail",
      "Your Price":"your_price",
      "Savings Total":"savings_total",
     


    },
   loveCapped: {
  id: "id",
  Date: "pricing_date",
  Supplier: "supplier",
  Store_No: "Store_No",
  City: "City",
  State: "State",
  Rack_ID: "OPIS_Rack_ID",
  Retail_Price: "Retail_Price",
  Disc: "OPIS_Discounted_Price",
  "Disc. Price": "Best_Discounted_Price",
  Pumping_Fee: "Pumping_Fee",
  Total_Taxes: "Total_Taxes_Fees",
  Federal_Taxes: "Federal_Taxes",
  State_Taxes: "State_Taxes",
  Other_Taxes: "Other_Taxes",
  Sales_Tax: "Sales_Tax",
  Freight_Fee: "Freight_Fee",
  "Retail_Price(2)": "DEF_Retail_Price" 
},

 loveActual: {
  id: "id",
  Date: "pricing_date",
  Supplier: "supplier",
  Store_No: "Store_No",
  City: "City",
  State: "State",
  Rack_ID: "OPIS_Rack_ID",
  Retail_Price: "Retail_Price",
  Disc: "OPIS_Discounted_Price",
  "Disc. Price": "Best_Discounted_Price",
  Pumping_Fee: "Pumping_Fee",
  Total_Taxes: "Total_Taxes_Fees",
  Federal_Taxes: "Federal_Taxes",
  State_Taxes: "State_Taxes",
  Other_Taxes: "Other_Taxes",
  Sales_Tax: "Sales_Tax",
  Freight_Fee: "Freight_Fee",
  "Retail Price (2)": "DEF_Retail_Price", // optional if your API provides a second retail price
},

ultramar: {
  id: "id",
  Date: "pricing_date",
  Supplier: "supplier",
  Site: "site",
  Diesel: "diesel",
  Prov: "prov",
  "Old Price": "old_price",
  "New Price": "new_price",
  "Carbon Tax": "carbon_tax",
  PFT: "pft",
  "Fed Ex": "fed_ex",
  "Sub Total": "sub_total",
  "GST / HST": "gst_hst",
  PST: "pst",
  Total: "total",
}

  }
    
  const taActual = usePaginatedTable({
    apiUrl: TA_ACTUAL_API,
    columnsMap: columnSets.taActual,
  });
  const taCapped = usePaginatedTable({
    apiUrl: TA_CAPPED_API,
    columnsMap: columnSets.taCapped,
  });
  const esso = usePaginatedTable({
    apiUrl: esso_pricing,
    columnsMap: columnSets.esso,
  });
  const flyingJ = usePaginatedTable({
    apiUrl: pricing,
    columnsMap: columnSets.flyingJ,
  });
  const loveCapped = usePaginatedTable({
    apiUrl: LOVE_CAPPED_API,
    columnsMap: columnSets.loveCapped,
  });
  const loveActual = usePaginatedTable({
    apiUrl: LOVE_ACTUAL_API,
    columnsMap: columnSets.loveActual,
  });
  const ultramar = usePaginatedTable({
    apiUrl: ULTRAMAR_API,
    columnsMap: columnSets.ultramar,
  });

 
const tabs = [
    { id: "1", label: "Flying J", data: flyingJ, map: columnSets.flyingJ },
    { id: "2", label: "TA Capped", data: taCapped, map: columnSets.taCapped },
    { id: "3", label: "TA Actual", data: taActual, map: columnSets.taActual },
    { id: "4", label: "Esso", data: esso, map: columnSets.esso },
    { id: "5", label: "Love Capped", data: loveCapped, map: columnSets.loveCapped },
    { id: "6", label: "Love Actual", data: loveActual, map: columnSets.loveActual },
    { id: "7", label: "Ultramar", data: ultramar, map: columnSets.ultramar },
  ];
  // ✅ Define tab content dynamically
  const pricingListTableTab = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    component: (
      <DataTableComponent
        title={tab.label}
        tableColumns={createColumns(tab.map, tab.data.data, { withCheckbox: true })}
        tableData={tab.data.data}
        loading={tab.data.loading}
        pagination
        paginationServer
        paginationTotalRows={tab.data.totalRows}
        onChangeRowsPerPage={tab.data.handlePerRowsChange}
        onChangePage={tab.data.handlePageChange}
      />
    ),
  }));
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Pricing Management" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Pricing List" />
              <CardBody>
                <BasicTabCard tabContent={pricingListTableTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
