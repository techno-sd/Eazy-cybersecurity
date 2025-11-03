import { redirect } from "next/navigation";

type Params = {
  params: {
    locale: string;
    segments?: string[];
  };
};

export default function LocaleRedirectPage({ params }: Params) {
  const parts = params.segments ?? [];
  let path = "/" + parts.join("/");
  // Respect trailingSlash config
  if (path !== "/" && !path.endsWith("/")) path += "/";
  redirect(path);
}
