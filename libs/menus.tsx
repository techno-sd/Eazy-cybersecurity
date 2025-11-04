// removed duplicate export
export const menus = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About Us",
    link: "/about/",
    submenu: [
      { label: "Vision & Mission", link: "/about#vision-mission" },
      { label: "Core Values", link: "/about#values" },
      { label: "Our Team", link: "/about#team" },
      { label: "Why Choose Us", link: "/about#why-us" }
    ],
  },
  {
    label: "Services",
    link: "/services/",
    submenu: [
      { label: "AI Solutions", link: "/services#ai" },
      { label: "Cybersecurity Services", link: "/services#cybersecurity" },
      { label: "Big Data & Analytics", link: "/services#bigdata" },
      { label: "Cloud Computing & Hosting", link: "/services#cloud" },
      { label: "SME-EAZY Program", link: "/services#sme" }
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
    label: "Blog",
    link: "/blog/",
  },
  {
    label: "Contact Us",
    link: "/contact/",
  },
];
