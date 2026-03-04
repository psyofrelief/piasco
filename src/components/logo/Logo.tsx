import LogoIcon from "./LogoIcon";
import LogoText from "./LogoText";

export default function Logo({ isFooter = false }: { isFooter?: boolean }) {
  return (
    <div
      className={`gap-xs flex items-center ${isFooter ? "flex-col sm:flex-row" : ""}`}
    >
      <LogoIcon
        variant={isFooter ? "outline" : "default"}
        className={isFooter ? "text-outline" : "text-white"}
      />
      <LogoText />
    </div>
  );
}
