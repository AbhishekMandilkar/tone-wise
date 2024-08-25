import { useEffect, useState } from "react";
import axios from "axios";
import useRequestHeaders from "./useRequestHeaders";

const usePost = () => {
  const headers = useRequestHeaders();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postData = async (url: string, postData: any) => {
    try {
      const response = await axios.post(url, postData, {
        headers,
      });
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;
