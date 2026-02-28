
import { Button } from '@/components/ui/button';
import { LuminaInteractiveList } from '@/components/ui/lumina-interactive-list';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { ProcessSection } from '@/components/ProcessSection';
import Link from 'next/link';
import ShaderShowcase from "@/components/ui/hero";
import { 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

const comparisonData = [
  {
    criterion: "Niche expertise",
    me: "I work only with plumbing and similar home service businesses in the US, I know their pains, seasonality, typical offers, and what owners actually care about.",
    freelancer: "Takes on any niche — from cafés to online courses — so they do not understand plumbing specifics and just copy generic templates."
  },
  {
    criterion: "12 years in marketing",
    me: "12 years in digital marketing: I understand lead generation, ads, SEO, and analytics, and I build all of that directly into the site structure.",
    freelancer: "Builds the site as a “pretty business card”, without thinking how the owner will actually get and track leads."
  },
  {
    criterion: "Proven battle‑tested templates",
    me: "I use my own battle‑tested templates already used in real plumbing projects: thoughtful structure, blocks for offers, social proof, and local trust triggers.",
    freelancer: "Every time builds the site from scratch or edits a random theme, often without checking if this structure converts into calls."
  },
  {
    criterion: "Focus on leads, not pixels",
    me: "Design serves one goal — to increase calls, form submissions, and quote requests; I place CTAs, before/after, guarantees, and FAQ blocks to grow conversion.",
    freelancer: "Talks mostly about colors, fonts, and animations; speaks about “conversion” in vague terms with no numbers or clear logic."
  },
  {
    criterion: "Fast launch and clear process",
    me: "The template lets you launch in a few days: I replace texts and photos, set up forms and calls, connect basic analytics, and hand over a ready‑to‑use site with a simple step‑by‑step process.",
    freelancer: "Timeline stretches out: long brief first, then weeks of messages and revisions, unclear stages, and shifting deadlines."
  },
  {
    criterion: "Transparent fixed pricing",
    me: "I work with a fixed price for a ready‑to‑use site based on the template, with no hidden hours and “extra fees for every revision”.",
    freelancer: "Often charges by the hour or gives a very wide budget range; extra payments appear along the way."
  },
  {
    criterion: "Copy and offers written for owners",
    me: "I write and adapt copy from the plumbing business owner’s point of view: focus on revenue, predictable lead flow, and a simple way to work with a contractor.",
    freelancer: "Asks the client to “write the text themselves”, copies competitor phrases, or uses generic boilerplate that ignores what really matters to the owner."
  },
  {
    criterion: "Ready for ads and scaling",
    me: "The site structure is ready for traffic from day one: service and city pages, blocks for reviews, offers, and forms so a marketer can easily scale lead generation.",
    freelancer: "Delivers one or two generic pages that are hard to use later for ads, local SEO, and scaling campaigns."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ShaderShowcase />

      {/* Why Section */}
      <section className="bg-[#8bacaa]" id="why">
        <LuminaInteractiveList />
      </section>

      {/* Showcase Section */}
      <SiteShowcaseSection />

      {/* Process Section */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* Comparison Section (About Block) - Now Full Screen & Wide */}
      <section className="min-h-screen py-24 md:py-40 bg-[#fcfbf7] border-y" id="about">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="mb-24 md:mb-40">
            <h2 className="heading-lg text-primary tracking-tighter reveal-text max-w-5xl">
              Fully integrated. <br />
              <em className="accent-italic">Best in class.</em>
            </h2>
          </div>

          <div className="relative overflow-x-auto lg:overflow-visible">
            <div className="min-w-[1200px] lg:min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_1.5fr_1fr] items-end border-b-2 border-primary/10 pb-12">
                <div className="px-6">
                  <span className="label text-muted-foreground opacity-30">Criteria</span>
                </div>
                <div className="px-10 text-center">
                  <div className="inline-block px-8 py-3 bg-primary text-white heading-md rounded-t-2xl mb-[-48px] relative z-10 reveal-text">
                    ANTON KOLESNIKOV
                  </div>
                </div>
                <div className="px-6 text-center">
                  <span className="label text-muted-foreground opacity-30 reveal-text">Typical Freelancer</span>
                </div>
              </div>

              {/* Table Body */}
              <div className="relative">
                {/* Visual highlight for central column */}
                <div className="absolute top-0 bottom-0 left-[25%] right-[25%] bg-primary/[0.04] rounded-b-[40px] pointer-events-none z-0" />
                
                {comparisonData.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_1.5fr_1fr] items-center border-b border-black/5 last:border-0 relative z-10 group">
                    <div className="py-16 px-6">
                      <h3 className="heading-md text-primary text-2xl reveal-text">{row.criterion}</h3>
                    </div>
                    <div className="py-16 px-12 text-center">
                      <p className="body-text text-primary font-bold text-lg md:text-xl leading-relaxed reveal-text reveal-delay-1 max-w-2xl mx-auto">
                        {row.me}
                      </p>
                    </div>
                    <div className="py-16 px-6 text-center">
                      <p className="body-text text-muted-foreground opacity-50 text-base leading-relaxed reveal-text reveal-delay-2 max-w-md mx-auto">
                        {row.freelancer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 md:py-48 bg-white" id="packages">
        <div className="container-custom">
          {/* Timeline UI */}
          <div className="relative mb-32 hidden md:block">
            <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10 -translate-y-1/2 z-0" />
            <div className="flex justify-between relative z-10">
              <div className="w-4 h-4 rounded-full bg-primary ring-8 ring-white" />
              <div className="w-4 h-4 rounded-full bg-primary ring-8 ring-white" />
              <div className="w-4 h-4 rounded-full bg-accent ring-8 ring-white shadow-[0_0_15px_rgba(139,125,58,0.4)]" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-24">
            {/* Package 1 */}
            <div className="flex flex-col reveal-text">
              <div className="mb-8">
                <h3 className="heading-md text-3xl mb-3">Fast Launch Starter</h3>
                <p className="body-text text-muted-foreground text-sm">
                  A fast launch of a professional landing page for a small plumbing business.
                </p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {[
                  "One high-converting landing page based on a proven template",
                  "Mobile-optimized, branded with your logo, colors, and fonts",
                  "Setup of contact details, click-to-call buttons, and a simple lead form",
                  "Basic on-page SEO structure for your main city",
                  "Launch on your domain/hosting"
                ].map((item, i) => (
                  <li key={i} className="body-text flex gap-4 text-xs leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-8 border-t border-black/5">
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="label line-through opacity-30 text-lg">$900</span>
                  <span className="heading-md text-4xl text-primary">$697</span>
                  <span className="tag opacity-40 text-[10px]">one-time</span>
                </div>
                <Button className="w-full rounded-full btn text-[10px] bg-primary text-white h-14 hover:scale-[1.02] transition-transform">Get Started</Button>
              </div>
            </div>

            {/* Package 2 */}
            <div className="flex flex-col reveal-text reveal-delay-1">
              <div className="mb-8">
                <h3 className="heading-md text-3xl mb-3">Local Leads Pro</h3>
                <p className="body-text text-muted-foreground text-sm">
                  A multi-page website built for local SEO and a steady flow of leads.
                </p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {[
                  "Up to 5–7 pages: Home, Services, individual key services, About, Contact",
                  "“Service Areas” / “Cities We Serve” sections",
                  "Strong trust elements: reviews, guarantees, licenses",
                  "Enhanced on-page SEO and internal linking",
                  "Multiple CTAs: call, quote request, service request forms",
                  "Form integrations with email / Google Sheets / simple CRM"
                ].map((item, i) => (
                  <li key={i} className="body-text flex gap-4 text-xs leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-8 border-t border-black/5">
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="label line-through opacity-30 text-lg">$1500</span>
                  <span className="heading-md text-4xl text-primary">$1197</span>
                  <span className="tag opacity-40 text-[10px]">one-time</span>
                </div>
                <Button className="w-full rounded-full btn text-[10px] bg-primary text-white h-14 hover:scale-[1.02] transition-transform">Get Started</Button>
              </div>
            </div>

            {/* Package 3 */}
            <div className="flex flex-col relative reveal-text reveal-delay-2">
              <div className="absolute -top-12 left-0">
                <span className="tag bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-[9px] font-bold shadow-lg shadow-accent/20">Most Popular</span>
              </div>
              <div className="mb-8">
                <h3 className="heading-md text-3xl mb-3">Local Leads Pro</h3>
                <p className="body-text text-muted-foreground text-sm">
                  A subscription for your website, ongoing support, and light marketing without the tech headaches.
                </p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {[
                  "Website built on the Local Leads Pro or Lead Magnet Premium package",
                  "Hosting and technical maintenance",
                  "Monthly small content and promo updates",
                  "Light SEO and UX tweaks based on performance",
                  "Priority email support"
                ].map((item, i) => (
                  <li key={i} className="body-text flex gap-4 text-xs leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-8 border-t border-black/5">
                <div className="mb-8">
                  <span className="label opacity-40 text-sm block mb-1">setup from $700</span>
                  <span className="heading-md text-3xl text-accent">+$129–$199/mo.</span>
                </div>
                <Button className="w-full rounded-full btn text-[10px] bg-accent text-accent-foreground h-14 hover:scale-[1.02] transition-transform shadow-xl shadow-accent/10">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-background border-t" id="contact">
        <div className="container-custom">
          <div className="bento-card bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-16 md:p-24 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden reveal-text">
            <div className="relative z-10 space-y-10">
              <h2 className="heading-lg text-white leading-tight">Ready to Double Your <br />Plumbing Leads?</h2>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-white text-lg rounded-full btn h-20 px-12 shadow-2xl group">
                <Link href="https://calendly.com" target="_blank" className="flex items-center gap-3">
                  Book My Free Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="tag opacity-60 text-sm">Limited spots available for monthly intake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t bg-white">
        <div className="w-full px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white heading-md text-xl">J</div>
              <span className="heading-md text-primary text-xl">JobFlow Landing Pages</span>
            </div>
            <div className="tag text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} Anton Kolesnikov. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
