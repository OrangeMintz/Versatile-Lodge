import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // Change to null

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
        setError(null); // Reset error state when request is successful
      } catch (err) {
        setError("An error occurred"); // Set error message
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
      setError(null); // Reset error state when request is successful
    } catch (err) {
      setError("An error occurred"); // Set error message
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
