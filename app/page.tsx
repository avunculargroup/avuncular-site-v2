import BusinessCard from "@/app/components/business-card";
import ContactForm from "@/app/components/contact-form";
import Header from "@/app/components/header";
import Section from "@/app/components/section";

const BUSINESSES = [
  {
    name: "Northwind Facilities",
    tagline: "Integrated facilities services for civic campuses.",
    description:
      "Long-horizon contracts that blend hospitality, sustainability, and reliable trade coverage for public institutions.",
  },
  {
    name: "Harbor & Field",
    tagline: "Applied research studio for practical tools.",
    description:
      "Designs bespoke software and playbooks that help underdog operators scale responsibly without losing fidelity.",
  },
];

const PIPELINE = [
  {
    name: "Working Title",
    tagline: "Something new is taking shape.",
    description:
      "A quiet initiative focused on resilient caregiving services. Stay tuned.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-6xl space-y-32 px-6 py-16 lg:px-8">
        <Header />

        <Section title="About">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
            Avuncular Group brings independent operators under one warm roof. We
            steward businesses that are grounded, human, and quietly
            compounding—balancing patient capital with pragmatic execution. Each
            venture shares a bias toward service, craftsmanship, and durable
            partnerships.
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
