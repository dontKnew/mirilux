"use client"

import ButtonLoader from "@/components/ui/buttons/ButtonLoader";
import { LogInIcon } from "lucide-react";
import { useState } from "react"

export default function Page(){
    const [loading, setLoading] = useState();

    return <>
        <div className="text-center flex justify-center mt-4">
            <ButtonLoader className="w-[100px]" />
        </div>
    </>

}