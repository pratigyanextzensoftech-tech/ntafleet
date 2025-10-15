import { useState, useEffect } from "react";
import axios from "axios";
import { itemsAll } from "../api/index"; // ✅ correct endpoint

const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(itemsAll);
        const data = response.data; // or response.data.data if nested

        if (!Array.isArray(data)) {
          setItems([]); // ✅ fixed
          return;
        }

        const options = data.map((item) => ({
          value: item.item_id,
          label: item.item_name,
        }));

        setItems(options);
      } catch (err) {
        setError(err);
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
  return { items, loading, error };
};

export default useItems;
