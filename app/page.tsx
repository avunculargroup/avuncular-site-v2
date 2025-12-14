import BusinessCard from "@/app/components/business-card";
import ContactForm from "@/app/components/contact-form";
import Header from "@/app/components/header";
import Section from "@/app/components/section";

const BUSINESSES = [
  {
    name: "Bitcoin Treasury Solutions",
    tagline: "Training and Consulting for Businesses.",
    description:
      "Structured education, tailored coaching, and strategic consulting to help Australian businesses and professionals assess, adopt, manage, and even accept Bitcoin within their treasury and payment operations.",
  },
  {
    name: "Aussie Bitcoin Merchants",
    tagline: "Onboard small retailers and get them on the map.",
    description:
      "Helping small Australian retailers onboard to the Bitcoin network by providing practical resources, guidance, and support, along with an easy way to add their business to BTC Map through OpenStreetMap.",
  },
];

const PIPELINE = [
  {
    name: "BoltBar",
    tagline: "The POS that loves to save.",
    description:
      "A Point of Sale application that leverages both traditional payments and bitcoin.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-6xl space-y-32 px-6 py-16 lg:px-8">
        <Header />

        <Section title="About">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
            Avuncular Group brings local talent and skill under one warm roof. We
            grow businesses that are grounded, local, and quietly
            compounding—balancing patient capital with pragmatic execution. Each
            project shares a bias toward service, craftsmanship, and open source software.
          </p>
        </Section>

        <Section title="Businesses">
          <div className="grid gap-6 md:grid-cols-2">
            {BUSINESSES.map((business) => (
              <BusinessCard key={business.name} {...business} />
            ))}
          </div>
        </Section>

        <Section title="In Development">
          <div className="space-y-6">
            {PIPELINE.map((business) => (
              <BusinessCard key={business.name} {...business} subdued />
            ))}
          </div>
        </Section>

        <Section title="Contact">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-sm text-ink-muted leading-relaxed">
                Introduce yourself, share what you are building, or tell us
                where you could use a steady partner. We read every message and
                typically reply within two business days.
              </p>
              <div className="text-xs text-ink-muted">
                info@avunculargroup.com
              </div>
            </div>
            <ContactForm />
          </div>
        </Section>

        <footer className="pt-12 text-xs text-ink-muted">
          © {new Date().getFullYear()} Avuncular Group. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
