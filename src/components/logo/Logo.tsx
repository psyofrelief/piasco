import Link from "next/link";
import LogoIcon from "./LogoIcon";
import LogoText from "./LogoText";

export default function Logo({ isFooter = false }: { isFooter?: boolean }) {
  return (
    <Link href={"/"} className="gap-xs flex items-center">
      <LogoIcon isFooter={isFooter} />
      <LogoText />
    </Link>
  );
}
