"use client";

import { upsertLink } from "@/app/dashboard/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
    >
      {pending ? "Creating..." : "Create Short Link"}
    </button>
  );
}

export default function CreateLinkForm() {
  return (
    <form
      action={upsertLink}
      className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Destination URL
        </label>
        <input
          name="destination"
          type="url"
          required
          placeholder="https://example.com"
          className="rounded-md border px-3 py-2 text-black outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Custom Slug (Optional)
        </label>
        <input
          name="slug"
          type="text"
          placeholder="my-link"
          className="rounded-md border px-3 py-2 text-black outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
