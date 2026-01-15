"use client"
import Image from "next/image";
import Link from "next/link";
export default function(){
    return <Link href="/">
        <Image src="/logo.png" alt="Logo" width={180} height={80} className="w-[160px] md:w-[180px] h-[auto]" priority/>
    </Link>
    
}