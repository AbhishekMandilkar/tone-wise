import { useEffect, useState } from "react";
import axios from "axios";

const usePostFetch = (url: string, postData: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const postData = async () => {
      try {
        const response = await axios.post(url, postData, {
          cancelToken: source.token,
        });
        setData(response.data);
        setError(null);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    postData();

    return () => {
      source.cancel("Component unmounted");
    };
  }, [url]);

  return { data, loading, error };
};

export default usePostFetch;
