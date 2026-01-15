import { MapPin, User, Pencil, Phone, Mail } from "lucide-react"
export default function AddressPreview(){
    return   <div className="border-b border-color rounded py-4 mb-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium text-lg">Delivery To</p>

            <button
              type="button"
              className="flex items-center gap-1 text-sm text-orange-600 hover:underline"
            >
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
                <span>John Doe</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={19} className="shrink-0" />
                <span>9876543210</span>
              </div>
              <div className="flex items-center gap-2 ">
                <Mail size={19} className="shrink-0" />
                <span>sajid@gmail.com</span>
              </div>
            </div>

            {/* Address (always full width) */}
            <div className="flex gap-2 items-center">
              <MapPin size={19} className="shrink-0 md:mt-[2px]" />
              <p className="leading-relaxed">
                House No. 702, Gali No. 11, Kapashera, New Delhi - 110037, India
              </p>
            </div>

          </div>
        </div>;
}