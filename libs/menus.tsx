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
      { label: "Vision", link: "/about/vision/" },
      { label: "Mission", link: "/about/mission/" },
      { label: "Core Values", link: "/about/core-values/" },
      { label: "Our Team", link: "/about/team/" }
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
    link: "#",
    submenu: [
      { label: "Government & Public Sector", link: "/industries/government-public/" },
      { label: "Banking & Financial Services", link: "/industries/banking-financial/" },
      { label: "Energy & Telecom", link: "/industries/energy-telecom/" },
      { label: "Healthcare", link: "/industries/healthcare/" },
      { label: "Education & Universities", link: "/industries/education-universities/" },
      { label: "SMEs & Startups", link: "/industries/smes-startups/" }
    ],
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
