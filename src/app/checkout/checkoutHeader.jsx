import Link from "next/link";
import Image from "next/image";
export default function (){
    return  <div className="md:px-4 flex items-center justify-between border-b border-color">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={180} height={40} priority className="md:w-[180px] w-[160px]" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Secure Checkout 🔒
            </span>
          </div>
      </div>
}