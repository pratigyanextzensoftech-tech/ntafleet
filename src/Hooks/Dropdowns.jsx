import { useState, useEffect } from "react";
import axios from "axios";
import {
  companyall,
  itemsAll,
  supplierAll,
  salesmanAll,
  esso_rack_all,
  country_all,
  state_all
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

export const useCompany = () =>
  useDropdown(companyall, (c) => ({
    value: c.company_id,
    label: c.company_name,
  }));

export const useItems = () =>
  useDropdown(itemsAll, (i) => ({
    value: i.item_id,
    label: i.item_name,
  }));

export const useSupplier = () =>
  useDropdown(supplierAll, (s) => ({
    value: s.id,
    label: s.supplier_name,
  }));

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
   
  export const useCountry = () => {
  const { data, loading, error } = useDropdown(country_all, (s) => ({
    value: s.country_id,
    label: s.country_name,
  }));

  // Add static first entry (e.g., "Select Country")
  const countries = [
    { value: "0", label: "Both Country" }, // 👈 static option
    ...data,
  ];

  return { data: countries, loading, error };
};

