import LogoIcon from "./LogoIcon";
import LogoText from "./LogoText";

export default function Logo({ isFooter = false }: { isFooter?: boolean }) {
  return (
    <a href={"/"} className="gap-xs flex items-center">
      <LogoIcon isFooter={isFooter} />
      <LogoText />
    </a>
  );
}
