import { useState, useEffect } from "react";
import axios from "axios";
import { supplierAll } from "../api/index"; // ✅ correct endpoint

const useSupplier = () => {
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      setLoading(true);
      try {
        const response = await axios.get(supplierAll);
        const data = response.data; // or response.data.data if nested

        if (!Array.isArray(data)) {
          setSupplier([]); // ✅ fixed
          return;
        }

        const options = data.map((item) => ({
          value: item.id,
          label: item.supplier_name,
        }));

        setSupplier(options);
      } catch (err) {
        setError(err);
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, []);
  return { supplier, loading, error };
};

export default useSupplier;
