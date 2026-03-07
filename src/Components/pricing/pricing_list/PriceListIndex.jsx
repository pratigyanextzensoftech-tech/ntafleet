import React,{Fragment,useState,useEffect} from 'react'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import {Btn} from '../../../AbstractElements';
import BasicTabCard from '../../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { Breadcrumbs } from '../../../AbstractElements';
import HeaderCard from '../../Common/Component/HeaderCard'
import PricingListCommon from './PricingListCommon';
import { ta_pricing_actual as TA_ACTUAL_API,
  ta_pricing as TA_CAPPED_API,
  esso_pricing as esso_pricing,
  love_pricing as LOVE_CAPPED_API,
  love_pricing_actual as LOVE_ACTUAL_API,
  ul_pricing as ULTRAMAR_API,
  irv_pricing as IRVING_API,
  pricing,
  cen_pricing } from "../../../api";
import axios from 'axios';
import $ from "jquery";
import "datatables.net";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import Swal from 'sweetalert2';
const PriceListIndex = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const[filters,setFilters]=useState({})
      const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };

    const getApiByTab = (tab) => {
      switch (tab) {
        case "1":
          return pricing;
        case "2":
          return TA_CAPPED_API;
        case "3":
          return TA_ACTUAL_API ;
           case "4":
          return esso_pricing;
           case "5":
          return LOVE_CAPPED_API;
            case "6":
          return LOVE_ACTUAL_API;
            case "7":
          return ULTRAMAR_API;
            case "8":
          return IRVING_API;
            case "9":
          return cen_pricing;
       
      }
    };
  
    const getTableIdByTab = (tab) => {
      switch (tab) {
        case "1":
          return "#pricing";
        case "2":
          return "#ta-capped";
        case "3":
          return "#ta-actual";
        case "4":
          return "#esso-pricing";
          case "5":
          return "#love-capped";
           case "6":
          return "#love-actual";
           case "7":
          return "#ultramar";
           case "8":
          return "#irving";
            case "9":
          return "#cen-pricing";

      }
    };

const ta_actual = [
  { data: "id", title: "id" },
  { data: "pricing_date", title: "Date" },
  { data: "supplier", title: "Supplier" },
  { data: "loc_type", title: "Loc Type" },
  { data: "loc_id", title: "Loc #" },
  { data: "travel_center", title: "Travel Center" },
  { data: "st", title: "ST" },
  { data: "merchant_id", title: "Merchant ID" },
  { data: "city_state", title: "City/State" },
  { data: "rack_id", title: "Rack ID" },
  { data: "product_dispensed", title: "Dispensed" },
  { data: "index", title: "Index" },
  { data: "freight", title: "Freight" },
  { data: "ibp_fuel_price", title: "IBP Price" },
  { data: "retail_price", title: "Retail Price" },
  { data: "retail_fuel_price", title: "R.Fuel Price" },
  { data: "fuel_price", title: "Fuel Price" },
  { data: "saving_total", title: "Savings" },
  { data: "bulk_def_price", title: "Bulk DEF" },
   {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
},
];
const taCapped = [
  { data: "id", title: "id" },
  { data: "pricing_date", title: "Date" },
  { data: "supplier", title: "Supplier" },
  { data: "loc_type", title: "Loc Type" },
  { data: "loc_id", title: "Loc #" },
  { data: "travel_center", title: "Travel Center" },
  { data: "st", title: "ST" },
  { data: "merchant_id", title: "Merchant ID" },
  { data: "city_state", title: "City/State" },
  { data: "rack_id", title: "Rack ID" },
  { data: "product_dispensed", title: "Dispensed" },
  { data: "index", title: "Index" },
  { data: "freight", title: "Freight" },
  { data: "ibp_fuel_price", title: "IBP Price" },
  { data: "retail_price", title: "Retail Price" },
  { data: "retail_fuel_price", title: "R.Fuel Price" },
  { data: "fuel_price", title: "Fuel Price" },
  { data: "saving_total", title: "Savings" },
  { data: "bulk_def_price", title: "Bulk DEF" },
   {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
},
];
const esso = [
  { data: "id", title: "id" },
  { data: "pricing_date", title: "Date" },
  { data: "supplier", title: "Supplier" },
  { data: "SITE_NUMBER", title: "SITE NUMBER" },
  { data: "LOCATION", title: "LOCATION" },
  { data: "PROV", title: "PROV." },
  { data: "PRODUCT", title: "PRODUCT" },
  { data: "NET_PRICE", title: "NET PRICE" },
  { data: "FET", title: "FET" },
  { data: "PFT", title: "PFT" },
  { data: "PCT", title: "PCT" },
  { data: "PCT", title: "LOCAL" },
  { data: "PRICE_LTR", title: "PRICE/LTR." },
  { data: "GST_HST_FNT", title: "GST/HST/FNT" },
  { data: "PST_QST", title: "PST/QST" },
  { data: "TOTAL_PRICE", title: "TOTAL PRICE" },
   {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
},
];
const flyingJ = [
  { data: "id", title: "id" },
  { data: "pricing_date", title: "Date" },
  { data: "supplier", title: "Supplier" },
  { data: "site", title: "Site" },
  { data: "city", title: "City" },
  { data: "prov", title: "Prov" },
  { data: "prod", title: "Prod" },
  { data: "rack_id", title: "Rack ID" },
  { data: "rack_city", title: "Rack City" },
  { data: "rack_prov", title: "Rack Prov" },
  { data: "cost", title: "Cost" },
  { data: "total_cost", title: "Total Cost" },
  { data: "retail_price", title: "Retail Price" },
  { data: "disc_retail", title: "Disc Retail" },
  { data: "your_price", title: "Your Price" },
  { data: "savings_total", title: "Savings Total" },
    {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
},

];
const loveCapped = [
  { data: "id", title: "id" },
  { data: "pricing_date", title: "Date" },
  { data: "supplier", title: "Supplier" },
  { data: "Store_No", title: "Store_No" },
  { data: "City", title: "City" },
  { data: "State", title: "State" },
  { data: "OPIS_Rack_ID", title: "Rack_ID" },
  { data: "Retail_Price", title: "Retail_Price" },
  { data: "OPIS_Discounted_Price", title: "Disc" },
  { data: "Best_Discounted_Price", title: "Disc. Price" },
  { data: "Pumping_Fee", title: "Pumping_Fee" },
  { data: "Total_Taxes_Fees", title: "Total_Taxes" },
  { data: "Federal_Taxes", title: "Federal_Taxes" },
  { data: "State_Taxes", title: "State_Taxes" },
  { data: "Other_Taxes", title: "Other_Taxes" },
  { data: "Sales_Tax", title: "Sales_Tax" },
  { data: "Freight_Fee", title: "Freight_Fee" },
  { data: "DEF_Retail_Price", title: "Retail_Price(2)" },
  {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
},
];
const loveActual= [
  { title: "id", data: "id" },
  { title: "Date", data: "pricing_date" },
  { title: "Supplier", data: "supplier" },
  { title: "Store_No", data: "Store_No" },
  { title: "City", data: "City" },
  { title: "State", data: "State" },
  { title: "Rack_ID", data: "OPIS_Rack_ID" },
  { title: "Retail_Price", data: "Retail_Price" },
  { title: "Disc", data: "OPIS_Discounted_Price" },
  { title: "Disc_Price", data: "Best_Discounted_Price" },
  { title: "Pumping_Fee", data: "Pumping_Fee" },
  { title: "Total_Taxes", data: "Total_Taxes_Fees" },
  { title: "Federal_Taxes", data: "Federal_Taxes" },
  { title: "State_Taxes", data: "State_Taxes" },
  { title: "Other_Taxes", data: "Other_Taxes" },
  { title: "Sales_Tax", data: "Sales_Tax" },
  { title: "Freight_Fee", data: "Freight_Fee" },
  { title: "Retail_Price_2", data: "DEF_Retail_Price" },
{
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
},
]
const ultramar = [
  { data: "id", title: "id" },
  { data: "pricing_date", title: "Date" },
  { data: "supplier", title: "Supplier" },
  { data: "site", title: "Site" },
  { data: "diesel", title: "Diesel" },
  { data: "prov", title: "Prov" },
  { data: "old_price", title: "Old Price" },
  { data: "new_price", title: "New Price" },
  { data: "carbon_tax", title: "Carbon Tax" },
  { data: "pft", title: "PFT" },
  { data: "fed_ex", title: "Fed Ex" },
  { data: "sub_total", title: "Sub Total" },
  { data: "gst_hst", title: "GST / HST" },
  { data: "pst", title: "PST" },
  { data: "total", title: "Total" },
   {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
}
];
const irving = [
  { data: "id", title: "id" },
  { data: "pricing_date", title: "Date" },
  { data: "supplier", title: "Supplier" },
  { data: "site_id", title: "Site#" },
  { data: "site_name", title: "Site" },
  { data: "city", title: "City" },
  { data: "prov", title: "Prov" },
  { data: "prod", title: "Prod" },
  { data: "card_id", title: "Card_ID" },
  { data: "rack_city", title: "Rack City" },
  { data: "rack_prov", title: "Rack Prov" },
  { data: "base_price", title: "Base_Price" },
  { data: "excise_tax", title: "Excise_Tax" },
  { data: "prov_fuel_tax_fees", title: "Prov_Tax" },
  { data: "fuel_price", title: "Fuel_Price" },
  { data: "gst_hst", title: "GST_HST" },
  { data: "qst", title: "QST" },
  { data: "in_tax_price", title: "Tax_Price" },
  { data: "total_cost", title: "Total_Cost" },
   {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
}

];
const cenovus = [
  { data: "id", title: "id" },
  { data: "pricing_date", title: "Date" },
  { data: "supplier", title: "Supplier" },
  { data: "SITE_NUMBER", title: "SITE NUMBER" },
  { data: "LOCATION", title: "LOCATION" },
  { data: "PROV", title: "PROV." },
  { data: "PRODUCT", title: "PRODUCT" },
  { data: "NET_PRICE", title: "NET PRICE" },
  { data: "FET", title: "FET" },
  { data: "PFT", title: "PFT" },
  { data: "PCT", title: "PCT" },
  { data: "PCT", title: "LOCAL" },
  { data: "PRICE_LTR", title: "PRICE/LTR." },
  { data: "GST_HST_FNT", title: "GST/HST/FNT" },
  { data: "PST_QST", title: "PST/QST" },
  { data: "TOTAL_PRICE", title: "TOTAL PRICE" },
  {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
}
];
  const GetDataTAble = (api, tableId,pricing_date,supplier) => {
    console.log(api)
   if ($.fn.DataTable.isDataTable(tableId)) {
  $(tableId).DataTable().clear().destroy();
}
let columns;
if(api===pricing ){
    columns=flyingJ
}
else if(api===TA_CAPPED_API){
    columns=taCapped
}

else if(api===TA_ACTUAL_API){
    columns=ta_actual
}
else if(api===esso_pricing){
    columns=esso
}
else if(api===LOVE_CAPPED_API){
    columns=loveCapped
}
else if(api===LOVE_ACTUAL_API){
    columns=loveActual
}
else if(api===ULTRAMAR_API){
    columns=ultramar
}
else if(api===IRVING_API){
    columns=irving
}
else{
     columns=cenovus
}

    $(tableId).DataTable({
      serverSide: true,
      processing: true,
      paging: true,
      searching: true,
      destroy:true,
      ordering: true,
       scrollX: true,
      scrollCollapse: true,
      fixedColumns: { leftColumns: 1},
      pageLength: 10,
 columns: columns, 
      ajax: async function (data, callback) {
        const params = new URLSearchParams();
        params.append("start", data.start);
        params.append("length", data.length);
        params.append("search", data.search.value || "");
        params.append("pricing_date", pricing_date?pricing_date:"");
        params.append("supplier", supplier?supplier :"");

        try {
          const response = await fetch(`${api}?${params.toString()}`);
          const json = await response.json();
     const tableData = json.data.map((row) => (
      
    {
      id: row.id,
      pricing_date: row.pricing_date,
      supplier: row.supplier,
      site: row.site,
      city: row.city,
      prov: row.prov,
      prod: row.prod,
      rack_id: row.rack_id,
      rack_city: row.rack_city,
      rack_prov: row.rack_prov,
      cost: row.cost,
      total_cost: row.total_cost,
      retail_price: row.retail_price,
      disc_retail: row.disc_retail,
      your_price: row.your_price,
      savings_total: row.savings_total,

      loc_type: row.loc_type,
      loc_id: row.loc_id,
      freight: row.freight,
      travel_center: row.travel_center,
      st: row.st,
      merchant_id: row.merchant_id,
      city_state: row.city_state,
      rack_id: row.rack_id,
      product_dispensed: row.product_dispensed,
      index: row.index,
      ibp_fuel_price: row.ibp_fuel_price,
      retail_fuel_price: row.retail_fuel_price,
      fuel_price: row.fuel_price,
      saving_total: row.saving_total,
      fuel_price: row.fuel_price,
      bulk_def_price: row.bulk_def_price,

      SITE_NUMBER: row.SITE_NUMBER,
      LOCATION: row.LOCATION,
      PROV: row.PROV,
      PRODUCT: row.PRODUCT,
      NET_PRICE: row.NET_PRICE,
      FET: row.FET,
      PFT: row.PFT,
      PCT: row.PCT,
      PRICE_LTR: row.PRICE_LTR,
      GST_HST_FNT: row.GST_HST_FNT,
      PST_QST: row.PST_QST,
      TOTAL_PRICE: row.TOTAL_PRICE,

      Store_No:row.Store_No,
      City:row.City,
      State:row.State,
      OPIS_Rack_ID:row.OPIS_Rack_ID,
      Retail_Price:row.Retail_Price,
      OPIS_Discounted_Price:row.OPIS_Discounted_Price,
      Best_Discounted_Price:row.Best_Discounted_Price,
      Pumping_Fee:row.Pumping_Fee,
      Total_Taxes_Fees:row.Total_Taxes_Fees,
      Federal_Taxes:row.Federal_Taxes,
      State_Taxes:row.State_Taxes,
      Other_Taxes:row.Other_Taxes,
      Sales_Tax:row.Sales_Tax,
      Freight_Fee:row.Freight_Fee,
      DEF_Retail_Price:row.DEF_Retail_Price,

      diesel:row.diesel,
      old_price:row.old_price,
      new_price:row.new_price,
      carbon_tax:row.carbon_tax,
      pft:row.pft,
      fed_ex:row.fed_ex,
      sub_total:row.sub_total,
      gst_hst:row.gst_hst,
      pst:row.pst,
      pft:row.pft,
      total:row.total,

      site_id:row.site_id,
      site_name:row.site_name,
      card_id:row.card_id,
      base_price:row.base_price,
      excise_tax:row.excise_tax,
      prov_fuel_tax_fees:row.prov_fuel_tax_fees,
      qst:row.qst,
      in_tax_price:row.in_tax_price,

    }));
    console.log(tableData)
          callback({
            draw: data.draw,
            recordsTotal: json.recordsTotal,
            recordsFiltered: json.recordsFiltered,
            data: tableData,
          });
        } catch (error) {
          console.error(error);
          callback({
            draw: data.draw,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: [],
          });
        }
      },
    });
    let selected = [];
    $(document)
  .off("change", "#select-all")
  .on("change", "#select-all", function () {

    const checked = $(this).is(":checked");
  const ids = [];
     $(".row-checkbox").each(function () {

    $(this).prop("checked", checked);

    if (checked) {
      ids.push($(this).val());
    }

  });

  setSelectedRows(ids);

});
 $(document)
.off("change", ".row-checkbox")
.on("change", ".row-checkbox", function () {

  const id = $(this).val();

  setSelectedRows((prev) => {

    if ($(this).is(":checked")) {

      if (!prev.includes(id)) {
        return [...prev, id];
      }

      return prev;

    } else {

      return prev.filter(item => item !== id);

    }

  });

});

  };
const handleDelete = ({ ids = [], deleteApi, refetch }) => {

  if (!ids.length) {
    Swal.fire("Warning", "Please select at least one record.", "warning");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete selected records?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then(async (result) => {

    if (result.isConfirmed) {

      try {

        // delete all ids
        await Promise.all(
          ids.map(id => axios.delete(`${deleteApi}/${id}`))
        );

        Swal.fire("Deleted!", "Record deleted successfully.", "success");

        setSelectedRows([]);              // clear selected rows
        $("#select-all").prop("checked", false); 

        refetch(); // reload DataTable

      } catch (error) {

        Swal.fire("Error!", "Failed to delete record.", "error");

      }

    }

  });

};
const handleDeleteClick = () => {

  const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab);
  const pricing_date=filters.pricing_date;
  const supplier=filters.supplier

  handleDelete({
    ids: selectedRows,
    deleteApi: api,
    refetch: () => GetDataTAble(api, tableId,pricing_date,supplier)
  });

};
   const PricingTable = [ 
  {
    id: '1',
    label:"Flying J",
    component: (
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Flying J Pricing List"
        />
      
        <CardBody>
             <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger",onClick:handleDeleteClick }}>Delete Pricing</Btn>
                </div>
          <table
            id="pricing"
            className="table table-bordered w-100"
          />
        </CardBody>
    
      </Card>
    </Col>
  </Row>
),
  },
  {
    id: '2',
    label: (
      <>
       Ta-Petro  - <strong> [Capped]</strong>
      </>
    ),
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="TA-Petro Pricing List (Capped) List "
        />
      
        <CardBody>
              <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger",onClick:handleDeleteClick }}>Delete Mail</Btn>
                </div>
          <table
            id="ta-capped"
            className="table table-bordered w-100"
          />
        </CardBody>
       
      </Card>
    </Col>
  </Row>
) ,
  },

  {
    id: '3',
    label: (
      <>
       Ta-Petro  - <strong> [Actual]</strong>
      </>
    ),
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="TA-Petro Pricing List (Actual) List"
        />
    
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger",onClick:handleDeleteClick
    }}>Delete Mail</Btn>
                </div>
          <table
            id="ta-actual"
            className="table table-bordered w-100"
          />
        </CardBody>
      
      </Card>
    </Col>
  </Row>
),
  },
   {
    id: '4',
    label:"Esso",
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="ESSO Pricing List "
        />
    
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger",onClick:handleDeleteClick
    }}>Delete Mail</Btn>
                </div>
          <table
            id="esso-pricing"
            className="table table-bordered w-100"
          />
        </CardBody>
      
      </Card>
    </Col>
  </Row>
),
  },
   {
    id: '5',
    label: (
      <>
      Love  - <strong> [Capped]</strong>
      </>
    ),
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="LOVES Pricing List (Capped) List "
        />
       
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger",onClick:handleDeleteClick
     }}>Delete Mail</Btn>
                </div>
          <table
            id="love-capped"
            className="table table-bordered w-100"
          />
        </CardBody>
      
      </Card>
    </Col>
  </Row>
) ,
  },
   {
    id: '6',
    label: (
      <>
       Love  - <strong> [Actual]</strong>
      </>
    ), 
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="LOVES Pricing List (Actual) List "
        />
     
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger",onClick:handleDeleteClick
      
             }}>Delete Mail</Btn>
                </div>
          <table
            id="love-actual"
            className="table table-bordered w-100"
          />
        </CardBody>
      
      </Card>
    </Col>
  </Row>
),
  },
    {
    id: '7',
    label:"Ultramar", 
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="ULTRAMAR Pricing List "
        />
     
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger",onClick:handleDeleteClick
      
             }}>Delete Mail</Btn>
                </div>
          <table
            id="ultramar"
            className="table table-bordered w-100"
          />
        </CardBody>
      
      </Card>
    </Col>
  </Row>
),
  },
    {
    id: '8',
    label: "Irving", 
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Irving Pricing List"
        />
     
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger",onClick:handleDeleteClick
      
             }}>Delete Mail</Btn>
                </div>
          <table
            id="irving"
            className="table table-bordered w-100"
          />
        </CardBody>
      
      </Card>
    </Col>
  </Row>
),
  },
    {
    id: '9',
    label:"Cenovus", 
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Cenovus Pricing List"
        />
     
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger",onClick:handleDeleteClick
             }}>Delete Mail</Btn>
                </div>
          <table
            id="cen-pricing"
            className="table table-bordered w-100"
          />
        </CardBody>
      
      </Card>
    </Col>
  </Row>
),
  },
  
];
useEffect(() => {
  if ( !filters) return;

  const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab);
const pricing_date=document.getElementById("pricing_date")?.value
const supplier=document.getElementById("supplier")?.value

  GetDataTAble(
    api,
    tableId,
  pricing_date,
  supplier
   
  );

}, [ filters]);
const handleSearch = (formData) => {
  console.log("🔍 Filters received:", formData);
 const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab);
  const pricing_date=formData.pricing_date
  const supplier=formData.supplier
  setFilters(formData);  
    GetDataTAble(
    api,
    tableId,
  pricing_date,
  supplier
   
  );
};
const PricingTab = [
    {
      id: '1',
      label:"Flying J"  , 
      component: <PricingListCommon title="Flying J " onSearch={handleSearch}  apiName={pricing}  btnTitle="Search Data" />,
    },
    {
      id: '2',
      label:
         (
        <>
         Ta-Petro  - <strong> [Capped]</strong>
        </>
      ), 
       component: <PricingListCommon title="Ta-Petro[Capped]" onSearch={handleSearch}  supplier_ids="3" apiName={TA_CAPPED_API}  btnTitle="Search Data"/>,
    },
    {
      id: '3',
      label: 
       (
        <>
         Ta-Petro  - <strong> [Actual]</strong>
        </>
      )
     ,
      component: <PricingListCommon title="Ta-Petro [Actual]"  onSearch={handleSearch} supplier_ids="3" apiName={TA_ACTUAL_API}  btnTitle="Search Data"/>,
    },
   {
      id: '4',
      label:" Esso ", 
      component:  <PricingListCommon title="Esso" onSearch={handleSearch}  supplier_ids="6" apiName={esso_pricing} btnTitle="Search Data"/>,
    },
     {
      id: '5',
      label:  (
        <>
        Love  - <strong> [Capped]</strong>
        </>
      )
     ,
      component: <PricingListCommon title="Love [Capped]" onSearch={handleSearch}  supplier_ids="7"   apiName={LOVE_CAPPED_API}  btnTitle="Search Data" /> ,
    },
     {
      id: '6',
      label: 
       (
        <>
         Love  - <strong> [Actual]</strong>
        </>
      ), 
      component:  <PricingListCommon title="Love [Actual]" onSearch={handleSearch} supplier_ids="7"  apiName={LOVE_ACTUAL_API}  btnTitle="Search Data"/>,
    },
     {
      id: '7',
      label: "Ultramar",
      
      component: <PricingListCommon title="Ultramar" onSearch={handleSearch}  supplier_ids="10" apiName={ULTRAMAR_API} btnTitle="Search Data"/>,
    },
     {
      id: '8',
      label:
         (
        <>
         Irving 
        </>
      ), 
       component: <PricingListCommon title="Irving" onSearch={handleSearch}  supplier_ids="5" apiName={IRVING_API}  btnTitle="Search Data"/>,
    },
    {
      id: '9',
      label:
         (
        <>
         Cenovus 
        </>
      ), 
       component: <PricingListCommon title="Cenovus" onSearch={handleSearch}  supplier_ids="11" apiName={IRVING_API}  btnTitle="Search Data"/>,
    },
    
  ];

  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="Send Bulk Invoice" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Send Bulk Invoice" />
              <CardBody>
                <BasicTabCard tabContent={PricingTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Send Bulk Invoice" />
              <CardBody>
                <BasicTabCard tabContent={PricingTable} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment> 
               
  )
}

export default PriceListIndex
