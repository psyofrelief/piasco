import { useMenuContext } from "@/contexts/menuContext";
import Link from "next/link";

interface Props {
  label: string;
  href: string;
}

export default function MenuNavLink({ label, href }: Props) {
  const { closeMenu } = useMenuContext();

  return (
    <li
      onClick={() =>
        setTimeout(() => {
          closeMenu();
        }, 250)
      }
      className="rounded text-2xl"
    >
      <Link
        href={href}
        className="p-sm border-b-outline flex flex-1 justify-between border-b border-dashed"
      >
        <p className="gap-x-xs font-display flex flex-1 leading-none font-light">
          {label}{" "}
          {label === "Projects" && (
            <span className="mb-md text-accent text-sm">(4)</span>
          )}
        </p>
      </Link>
    </li>
  );
}
