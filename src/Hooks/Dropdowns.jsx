import { useState, useEffect } from "react";
import axios from "axios";
import {
  companyall,
  itemsAll,
  supplierAll,
  salesmanAll,
  esso_rack_all,
  country_all,
  state_all,
  supplierById
} from "../api/index";

/**
 * 🔹 Generic reusable hook for dropdown data
 * @param {string} apiUrl - API endpoint URL
 * @param {function} mapFn - function to map each item into { value, label }
 */
const useDropdown = (apiUrl, mapFn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // safety for cleanup in Strict Mode
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl);
        const result = response.data; 
        if (!Array.isArray(result)) {
          if (isMounted) setData([]);
          return;
        }

        const options = result.map(mapFn);
        if (isMounted) setData(options);
      } catch (err) {
        if (isMounted) setError(err);
        console.error(`Error fetching data from ${apiUrl}:`, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false };
  }, [apiUrl]);

  return { data, loading, error };
};

/**
 * 🔸 Specific dropdown hooks
 */

export const useCompany = (invoice_creation = "", ta_retail_invoice = "", owner_operator_invoice = "",cust_inv_type = "",  ul_owner_operator_invoice="",supplier_ids=""
) => {

  let url = companyall; // Base URL

  const params = new URLSearchParams();
  
  if(supplier_ids)
  { 

    switch (String(supplier_ids)) {
        case "3":
          params.append("ta_retail_invoice", ta_retail_invoice);
          break;
        case "6":
         
           if (owner_operator_invoice==="Yes"){params.append("owner_operator_invoice", owner_operator_invoice);} 
           else{ params.append("esso_inv_type", ta_retail_invoice);}
            
          break;
        case "7":
          params.append("love_retail_invoice", ta_retail_invoice);
          break;
        case "10":

         if (owner_operator_invoice==="Yes"){params.append("ul_owner_operator_invoice", owner_operator_invoice);} 
           else{ params.append("ul_inv_type", ta_retail_invoice);} 
           
          break;
        default:
         params.append("", "");
      } 
  }
  else
  {
    if (invoice_creation) params.append("invoice_creation", invoice_creation);
    if (ta_retail_invoice) params.append("ta_retail_invoice", ta_retail_invoice);
    if (owner_operator_invoice) params.append("owner_operator_invoice", owner_operator_invoice);
    if (cust_inv_type) params.append("cust_inv_type", cust_inv_type); 
    if (ul_owner_operator_invoice) params.append("ul_owner_operator_invoice", ul_owner_operator_invoice);  
    //if (esso_inv_type) params.append("esso_inv_type", esso_inv_type); 
   // if (ul_inv_type) params.append("ul_inv_type", ul_inv_type); 
   // if (love_retail_invoice) params.append("love_retail_invoice", love_retail_invoice); 
    
  } 
  if (params.toString()) url = `${companyall}?${params.toString()}`;

  return useDropdown(url, (c) => ({
    value: c.company_id,
    label: c.company_name,
  }));
};


export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart( 2, "0" )}-${String(d.getDate()).padStart(2, "0")}`;
};

export  const downloadPdf = async (url,invoiceName,data) => {
  console.log(invoiceName)
  const res = await fetch(url);
  const blob = await res.blob();
  const filename=url.split("/").pop().split("?")[0];
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a"); 
  link.href = blobUrl;
  link.download = filename || "invoice.pdf"; 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); 
  window.URL.revokeObjectURL(blobUrl);
};

export const useItems = () =>
  useDropdown(itemsAll, (i) => ({
    value: i.item_id,
    label: i.item_name,
  }));

export const useSupplier = (supplier_ids = "") => {
  const url = supplier_ids
    ? `${supplierById}/${supplier_ids}`
    : supplierById;
  return useDropdown(url, (s) => ({
    value: s.id,
    label: s.supplier_name,
  }));
};
export const useSupplierAll = () => {
   
  return useDropdown(supplierAll, (s) => ({
    value: s.id,
    label: s.supplier_name,
  }));
};
export const InvoiceType = (type = "") => {

  const invoiceTypes = [
  { value: "R", label: "R (Rack Invoice)" },
  { value: "RG", label: "RG (General Unit Price Update)" },
  { value: "RP", label: "RP (Pricing PDF Unit Price Update)" }
];

  return type ? invoiceTypes.filter(item => item.value === type) : invoiceTypes;
};
  

  

export const useSalesman = () =>
  useDropdown(salesmanAll, (s) => ({
    value: s.id,
    label: s.name,
  }));

  export const useEssoRack = () =>
  useDropdown(esso_rack_all, (s) => ({
    value: s.id,
    label: s.name,
  }));


   export const useStates = () =>
    useDropdown(state_all, (s) => ({
    value: s.state_id,
    label: s.province_name,
  }));

     export const useStatesReport = () =>
    useDropdown(state_all, (s) => ({
    value: s.province_abbreviation,
    label: s.province_name,
  }));

  


  export const useCountry = (country_id = "",) => {
  const url = country_id
    ? `${country_all}?country_id=${country_id}`
    : country_all;

  const { data, loading, error } = useDropdown(url, (s) => ({
    value: s.country_id,
    label: s.country_name,
  })); 
  // Add static first entry (e.g., "Select Country")
  const countries = [
  //  { isDisabled: true, label: "Select Country" }, // 👈 static option
    ...data,
  ];

  return { data: countries, loading, error };
};

