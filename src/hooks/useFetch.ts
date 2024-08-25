import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useFetch = <T>({
  url,
  params,
  onComplete,
}: {
  url: string;
  params?: AxiosRequestConfig;
  onComplete?: (data: T) => void;
}) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        setResponse(res.data);
        onComplete && onComplete(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { response, error, loading };
};

export default useFetch;
