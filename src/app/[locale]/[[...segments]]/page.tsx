import { redirect } from "next/navigation";

type Params = {
  params: Promise<{
    locale: string;
    segments?: string[];
  }>;
};

export default async function LocaleRedirectPage({ params }: Params) {
  const { segments } = await params;
  const parts = segments ?? [];
  let path = "/" + parts.join("/");
  // Respect trailingSlash config
  if (path !== "/" && !path.endsWith("/")) path += "/";
  redirect(path);
}
