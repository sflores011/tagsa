import Image from "next/image";
import ContactFormPanel from "@/components/contact/ContactFormPanel";
import { getPageDataBySlug } from "@/lib/wordpress";

function getContactImageUrl(pageImageUrl?: string): string {
  if (pageImageUrl) {
    return pageImageUrl.replace("http://", "https://");
  }

  return "https://tagsa.aumenta.do/wp-content/uploads/2026/02/contacto-1024x716.jpg";
}

export default async function ContactoPage() {
  const pageData = await getPageDataBySlug("contacto");

  const leftColumnImage =
    pageData?.gutenberg_structure?.[0]?.blocks?.[0]?.columns?.[0]?.blocks?.[0];

  const imageUrl = getContactImageUrl(leftColumnImage?.url);
  const pageTitle = pageData?.title?.trim() || "Contacto";

  return (
    <section className="min-h-screen bg-[#E6E6E6]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[400px] lg:min-h-full">
          <Image
            src={imageUrl}
            alt={leftColumnImage?.alt || pageTitle}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0361B4] via-[#0361B470] to-transparent" />

          <div className="absolute inset-x-0 bottom-10 px-10 text-white md:px-16">
            <h1
              style={{ fontFamily: "Benn" }}
              className="text-[42px] uppercase tracking-[0.06em] text-shadow-title md:text-[64px]"
            >
              Nuestro {pageTitle}
            </h1>
            <p className="max-w-[360px] text-[24px] text-white/90">Lorem Impsum</p>
          </div>
        </div>

        <ContactFormPanel />
      </div>
    </section>
  );
}
