import { FOOTER_LINKS } from "@/lib/data/navigation";
import FooterLink from "./FooterLink";
import Logo from "../logo/Logo";
import ScrollTopButton from "./ScrollTopButton";

export default function Footer() {
  return (
    <footer
      data-theme="dark"
      className="bg-background text-foreground flex w-full flex-col items-center justify-center"
    >
      <div className="gap-x-xl py-lg px-sm sm:px-md border-x-outline flex w-full max-w-250 items-center border-dashed sm:border-x">
        <div className="gap-x-xl flex w-full items-start justify-between">
          <Logo isFooter />
          <ul className="gap-x-md gap-y-lg flex w-full max-w-100 flex-col items-end justify-between sm:flex-row">
            {FOOTER_LINKS.map((e) => (
              <li
                key={e.category}
                className="gap-y-sm flex flex-col items-end text-end sm:items-start sm:text-start"
              >
                <h2 className="text-foreground-secondary font-mono text-xs uppercase">
                  {e.category}
                </h2>
                <ul className="gap-y-xs flex flex-col">
                  {e.links.map((l, idx) => (
                    <FooterLink label={l.label} href={l.href} key={idx + 1} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-outline p-sm md:px-md flex w-full max-w-250 items-center justify-between border-t border-dashed border-b-transparent! sm:border">
        <p>© 2026 Piasco. All Rights Reserved</p>
        <ScrollTopButton />
      </div>
    </footer>
  );
}
