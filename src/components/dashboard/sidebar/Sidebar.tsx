import { DASHBOARD_LINKS } from "@/lib/data/navigation";
import Logo from "../../logo/Logo";
import SidebarLink from "../sidebar/SidebarLink";
import Button from "../../ui/Button";
import Heading from "@/components/ui/Heading";

export default function Sidebar() {
  return (
    <aside className="p-lg border-r-outline flex min-w-100 flex-col justify-between border-r border-dashed">
      <div className="gap-y-lg flex flex-col">
        <Logo />
        <div className="gap-y-lg flex flex-col">
          {DASHBOARD_LINKS.map((e) => (
            <div key={e.category} className="gap-y-md flex flex-col">
              <Heading
                className="border-b-outline pb-xs border-b border-dashed"
                label={e.category}
              />
              <ul className="flex flex-col">
                {e.links.map((l, idx) =>
                  l.label !== "Logout" ? (
                    <SidebarLink label={l.label} href={l.href} key={idx + 1} />
                  ) : (
                    <li
                      key={l.label}
                      className="p-sm flex flex-1 font-mono uppercase transition-colors"
                    >
                      {l.label}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full">Shorten URL</Button>
    </aside>
  );
}
