import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (source: axios.CancelTokenSource) => {
      try {
        setLoading(true);
        const response = await axios.get<T>(url, {
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
    },
    [url]
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    fetchData(source);

    return () => {
      source.cancel("Component unmounted");
    };
  }, [url, fetchData]);

  return { data, loading, error };
};

export default useFetch;
