import HomeIcon from "@/components/icons/HomeIcon";
import LinksIcon from "@/components/icons/LinksIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";
import QrCodeIcon from "@/components/icons/QrCodeIcon";
import UserIcon from "@/components/icons/UserIcon";

type DashboardLinkItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type DashboardCategory = {
  category: string;
  links: DashboardLinkItem[];
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "API", href: "/api-docs" },
  { label: "Contact", href: "/contact" },
] as const;

export const DASHBOARD_LINKS: DashboardCategory[] = [
  {
    category: "MENU",
    links: [
      { label: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
      { label: "My Links", href: "/dashboard/links", icon: <LinksIcon /> },
      { label: "QR Generator", href: "/dashboard/qr", icon: <QrCodeIcon /> },
    ],
  },
  {
    category: "ACCOUNT",
    links: [
      { label: "Settings", href: "/dashboard/settings", icon: <UserIcon /> },
      { label: "Logout", href: "logout", icon: <LogoutIcon /> },
    ],
  },
] as const;

type FooterLinkItem = {
  label: string;
  href: string;
  trueLink?: boolean;
};

type FooterCategory = {
  category: string;
  links: FooterLinkItem[];
};
export const FOOTER_LINKS: FooterCategory[] = [
  {
    category: "Sitemap",
    links: [
      { label: "Home", href: "/" },
      { label: "FAQS", href: "/#faqs" },
    ],
  },
  {
    category: "Company",
    links: [
      { label: "Developer API", href: "/api-docs" },
      { label: "Contact Us", href: "/contcct" },
    ],
  },
  {
    category: "Legal",
    links: [
      { label: "Terms Of Use", href: "/terms-of-use" },
      { label: "Privacy Policy", href: "privacy-policy" },
    ],
  },
] as const;
