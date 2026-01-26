import { MapPin, User, Pencil, Phone, Mail, SaveIcon } from "lucide-react"
import Popup from "../ui/Popup";
import AddressPage from "../cart/input/CartAddress";
import { useEffect, useState } from "react";
import ButtonShop from "../ui/buttons/ButtonShop";
import { useGlobalState } from "@/lib/useGlobalState";
export default function AddressPreview(){
  const [open, setOpen] = useState(false);
  const {cartAddress} = useGlobalState();

  const EditAddress =()=>{  
      setOpen(true)
  }
    return   <div className="border-b border-color rounded py-4 mb-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium text-lg">Delivery To</p>

            <button onClick={EditAddress} type="button" className="flex items-center gap-1 text-sm text-orange-600 hover:underline">
              <Pencil size={14} />
              Edit
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">

            {/* Name / Phone / Email */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6">
              <div className="flex items-center gap-2">
                <User size={19} className="shrink-0" />
                <span>{cartAddress?.full_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={19} className="shrink-0" />
                <span>{cartAddress?.phone_no}</span>
              </div>
              <div className="flex items-center gap-2 ">
                <Mail size={19} className="shrink-0" />
                <span>{cartAddress?.email}</span>
              </div>
            </div>

            {/* Address (always full width) */}
            <div className="flex gap-2 items-center">
              <MapPin size={19} className="shrink-0 md:mt-[2px]" />
              <p className="leading-relaxed">
                {cartAddress?.address_line}, {cartAddress?.city}, {cartAddress?.state} - {cartAddress?.pincode}, {cartAddress?.country}
              </p>
            </div>
            <Popup isOpen={open}
                title="Delete Account"
                width="max-w-md" >
                <AddressPage />
                <div className="flex justify-center mt-4">
                  <button onClick={() => setOpen(false)} className="w-[250px] flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-all duration-200 bg-gradient-to-r from-green-600 to-green-700 text-white hover:scale-[1.02] active:scale-95">
                    <SaveIcon size={18} />
                    Update Address
                  </button>
                </div>
            </Popup>

          </div>
        </div>;
}