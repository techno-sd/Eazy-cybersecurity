// removed duplicate export
export const menus = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About Us",
    link: "#",
    submenu: [
      { label: "About Us", link: "/about/about-us/" },
      { label: "Vision", link: "/about/vision/" },
      { label: "Mission", link: "/about/mission/" },
      { label: "Core Values", link: "/about/core-values/" },
      { label: "Team", link: "/about/our-team/" },
      { label: "Why Choose Us", link: "/about/team/" }
    ],
  },
  {
    label: "Services",
    link: "#",
    submenu: [
      { label: "AI Solutions", link: "/services/ai/" },
      { label: "Cybersecurity Services", link: "/services/cybersecurity/" },
      { label: "Big Data & Analytics", link: "/services/big-data-analytics/" },
      { label: "Cloud Computing & Hosting", link: "/services/cloud-hosting/" },
      { label: "SME-EAZY Program", link: "/services/sme-eazy-program/" }
    ],
  },
  {
    label: "Industries",
    link: "/industries/",
  },
  {
    label: "Projects",
    link: "/projects/",
  },
  {
    label: "Blog",
    link: "/blog/",
  },
  {
    label: "Contact Us",
    link: "/contact/",
  },
];
