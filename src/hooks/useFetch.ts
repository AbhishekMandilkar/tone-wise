import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import {objectToQueryParams, QueryParams} from "@/lib/utils";

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

  const fetchData = (queryParams?: QueryParams) => {
    setloading(true);
    let newUrl = url;
    if (queryParams) {
      const params = objectToQueryParams(queryParams);
      newUrl += `?${params}`;
    }
    axios
      .get(newUrl, {
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
  console.log(loading)
  return { response, error, loading, fetchData };
};

export default useFetch;
