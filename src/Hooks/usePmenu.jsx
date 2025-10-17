import { useState, useEffect } from "react";
import axios from "axios";
import { pmenuAll } from "../api/index"; // ✅ correct endpoint

const usePmenu = () => {
  const [pmenu, setPmenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPmenu = async () => {
      setLoading(true);
      try {
        const response = await axios.get(pmenuAll);
        const data = response.data; // or response.data.data if nested
        if (!Array.isArray(data)) {
          setPmenu([]); // ✅ fixed
          return;
        }

        const options = data.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        setPmenu(options);
      } catch (err) {
        setError(err);
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPmenu();
  }, []);
  return { pmenu, loading, error };
};

export default usePmenu;
