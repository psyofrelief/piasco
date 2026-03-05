import { deleteLink } from "@/app/dashboard/actions";
import Link from "next/link";
import CopyButton from "./CopyButton";
import CreateLinkDialog from "../forms/CreateLinkDialog";

interface Props {
  id: string | number;
  slug: string;
  destination: string;
  clicks: number;
}

export default function LinkCard({ slug, destination, clicks, id }: Props) {
  return (
    <li className="p-sm border-outline bg-popover flex items-center justify-between border border-dotted border-b-transparent">
      <div className="gap-x-sm flex items-center">
        <div className="bg-foreground/40 aspect-square size-9" />
        <div className="gap-y-xs flex flex-col">
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_URL || "https://p-s.co"}/${slug}`}
            rel="noreferrer"
            target="_blank"
            className="leading-none font-medium"
          >
            {process.env.NEXT_PUBLIC_BASE_URL || "https://p-s.co"}/{slug}
          </a>
          <p className="text-foreground-secondary leading-none">
            {destination}
          </p>
        </div>
      </div>
      <div className="gap-x-md text-foreground-secondary flex items-center font-mono tracking-tighter uppercase">
        <p>{clicks} Clicks</p>
        <Link href={"/dashboard/qr"}>QR Code</Link>
        <form action={deleteLink}>
          <input type="hidden" name="id" value={id} />

          <button
            type="submit"
            className="hover:text-destructive cursor-pointer uppercase transition-colors"
          >
            Delete
          </button>
        </form>
        <CopyButton url={`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`} />
        <CreateLinkDialog
          initialData={{ slug, destination }}
          className="text-foreground-secondary hover:text-foreground h-auto w-auto border-none bg-transparent p-0 font-mono tracking-tighter uppercase"
        />
      </div>
    </li>
  );
}
