"use client"

import useApiRequest from "@/hooks/useApiRequest";
import { useEffect } from "react";

export default function Page(){
    const {send2, loading} = useApiRequest();

    // http://localhost:3000/api/token/test, hit this, for test..
    useEffect(()=>{
        const testVeriry = async ()=>{
            const response = await send2("/token/verify", {data:"h"});
            console.warn(response);
        }
        testVeriry();
    }, [])
    
}