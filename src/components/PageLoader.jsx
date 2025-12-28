"use client";

import Image from "next/image";

export default function PageLoader() {
  // return (
  //   <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
  //     <div className="flex flex-col items-center gap-4">

  //       {/* Logo */}
  //       <Image
  //         src="/logo.png"
  //         alt="MiriLux"
  //         width={140}
  //         height={40}
  //         priority
  //       />

  //       {/* Spinner */}
  //       <div className="relative h-12 w-12">
  //         <span className="absolute inset-0 rounded-full border-2 border-gray-200"></span>
  //         <span className="absolute inset-0 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin"></span>
  //       </div>

  //       {/* Text */}
  //       <p className="text-xs tracking-wide text-gray-500">
  //         Loading luxury fragrances…
  //       </p>
  //     </div>
  //   </div>
  // );


  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-[var(--primary)] animate-bounce [animation-delay:-0.3s]" />
        <span className="h-3 w-3 rounded-full bg-[var(--primary)] animate-bounce [animation-delay:-0.15s]" />
        <span className="h-3 w-3 rounded-full bg-[var(--primary)] animate-bounce" />
      </div>
    </div>
  );
}
