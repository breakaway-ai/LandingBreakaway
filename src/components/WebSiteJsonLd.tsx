import JsonLd from "@/components/JsonLd";
import { websiteJsonLd } from "@/lib/json-ld";

type WebSiteJsonLdProps = {
  locale: string;
};

export default function WebSiteJsonLd({ locale }: WebSiteJsonLdProps) {
  return <JsonLd data={websiteJsonLd({ locale })} />;
}
