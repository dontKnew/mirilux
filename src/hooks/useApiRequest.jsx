"use client";

import { useState, useCallback } from "react";
import ApiRequest from "@/lib/ApiRequest";

export default function useApiRequest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const send = useCallback(async (url, payload, options={}) => {
    setLoading(true);
    setError(null);

    try {
      const api = new ApiRequest();
      const response = await api.send(url, payload, options);
      setData(response.data);
      return response;
    } catch (err) {
      console.warn(err);
      const message = err?.message || "UNKNOWN_ERROR";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const send2 = useCallback(async (url, payload, options = {}) => {
    setLoading(true);
    try {
      const api = new ApiRequest();
      const response = await api.send(url, payload, options);
      return response.data;
    }catch(err){
      throw(err)
    } finally {
      setLoading(false);
    }
  }, []);

  return { send, send2, data, error, loading, setLoading};
}
