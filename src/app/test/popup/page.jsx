"use client";
import { useState } from "react";
import Popup from "@/components/ui/Popup";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-black px-5 py-2 text-white"
      >
        Open Popup
      </button>

      <Popup
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Delete Account"
        width="max-w-md"
      >
        <p className="text-gray-600">
          Are you sure? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button className="rounded-lg bg-red-600 px-4 py-2 text-white">
            Delete
          </button>
        </div>
      </Popup>
    </div>
  );
}
