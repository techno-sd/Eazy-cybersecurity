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
      { label: "Vision", link: "/about/about-us#vision" },
      { label: "Mission", link: "/about/about-us#mission" },
      { label: "Core Values", link: "/about/about-us#values" },
      { label: "Team", link: "/about/about-us#team" }
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
    label: "Vision 2030 Alignment",
    link: "/vision-2030/",
  },
  {
    label: "Why Choose Us",
    link: "/about/team/",
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
