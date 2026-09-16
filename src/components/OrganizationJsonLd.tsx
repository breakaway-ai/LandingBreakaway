import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/json-ld";

export default function OrganizationJsonLd() {
  return <JsonLd data={organizationJsonLd()} />;
}
