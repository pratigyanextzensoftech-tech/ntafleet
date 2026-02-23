import { useState, useEffect } from "react";
import axios from "axios";
import { companyall } from "../api/index"; // make sure this is correct URL

const 
useCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(companyall); 
        const data = response.data; // if response.data.data, use that
        if (!Array.isArray(data)) { 
          setCompanies([]);
          return;
        }
       const options = [
  { value: '', label: 'All Companies' },
  ...data.map(company => ({
    value: company.company_id,
    label: company.company_name,
  }))
];

        setCompanies(options);
      } catch (err) {
        setError(err);
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, loading, error };
};

export default useCompany;
