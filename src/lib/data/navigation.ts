type DashboardLinkItem = {
  label: string;
  href: string;
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
      { label: "Dashboard", href: "/dashboard" },
      { label: "My Links", href: "/dashboard/links" },
      { label: "QR Generator", href: "/dashboard/qr" },
    ],
  },
  {
    category: "ACCOUNT",
    links: [
      { label: "Settings", href: "/dashboard/settings" },
      { label: "Logout", href: "logout" },
    ],
  },
] as const;
