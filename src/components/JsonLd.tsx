import { serializeJsonLd, type JsonLdObject } from "@/lib/json-ld";

type JsonLdProps = {
  data: JsonLdObject | JsonLdObject[];
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
