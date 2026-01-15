"use client";

import { useEffect } from "react";
import useApiRequest from "@/hooks/useApiRequest";

export default function Page() {
  const { send, data, error, loading } = useApiRequest();

  useEffect(() => {
    send("/token/verify", [1, 2, 3, 4, 5]);
  }, []);
  return (
    <div className="text-center my-5 text-2xl">
      <h1>Hello Testing Api</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
    
  );
}
