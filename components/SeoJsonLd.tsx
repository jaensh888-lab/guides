interface SeoJsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function SeoJsonLd({ data }: SeoJsonLdProps) {
  const json = JSON.stringify(data, null, 2);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
