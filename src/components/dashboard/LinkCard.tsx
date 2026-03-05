import { deleteLink } from "@/app/dashboard/actions";
import Link from "next/link";
import CopyButton from "./CopyButton";
import CreateLinkDialog from "../forms/CreateLinkDialog";
import QrCodeIcon from "../icons/QrCodeIcon";
import ClicksIcon from "../icons/ClicksIcon";
import TrashIcon from "../icons/TrashIcon";
import EditIcon from "../icons/EditIcon";

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
          <p className="text-foreground leading-none">{destination}</p>
        </div>
      </div>
      <div className="gap-x-md text-foreground flex items-center">
        <p className="gap-x-xs flex items-center">
          <ClicksIcon />
          {clicks} Clicks
        </p>
        <CreateLinkDialog
          initialData={{ slug, destination }}
          className="text-foreground bg-transparent! p-0! font-sans normal-case"
          icon={<EditIcon />}
        />
        <form action={deleteLink}>
          <input type="hidden" name="id" value={id} />

          <button
            type="submit"
            className="hover:text-destructive hover:fill-destructive fill-foreground gap-x-xs flex cursor-pointer items-center transition-colors"
          >
            <TrashIcon />
            Delete
          </button>
        </form>

        <Link className="ml-sm" href={"/dashboard/qr"}>
          <QrCodeIcon />
        </Link>
        <CopyButton url={`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`} />
      </div>
    </li>
  );
}
