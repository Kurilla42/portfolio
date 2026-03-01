
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

      {/* Comparison Section (About Block) - Proportionally Scaling */}
      <section className="min-h-screen py-[12vh] md:py-[18vh] bg-[#fcfbf7] border-y" id="about">
        <div className="w-full px-[4vw] md:px-[6vw]">
          <div className="mb-[8vh] md:mb-[12vh]">
            <h2 className="heading-lg text-primary tracking-tighter reveal-text max-w-[70vw]">
              Fully integrated. <br />
              <em className="accent-italic">Best in class.</em>
            </h2>
          </div>

          <div className="relative overflow-x-auto lg:overflow-visible">
            <div className="min-w-[1200px] lg:min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_1.5fr_1fr] items-end border-b-2 border-primary/10 pb-[4vh]">
                <div className="px-[2vw]">
                  <span className="label text-muted-foreground opacity-30 text-[0.8vw]">Criteria</span>
                </div>
                <div className="px-[3vw] text-center">
                  <div className="inline-block px-[3vw] py-[1.2vh] bg-primary text-white heading-md rounded-t-2xl mb-[-4vh] relative z-10 reveal-text text-[1.4vw]">
                    ANTON KOLESNIKOV
                  </div>
                </div>
                <div className="px-[2vw] text-center">
                  <span className="label text-muted-foreground opacity-30 reveal-text text-[0.8vw]">Typical Freelancer</span>
                </div>
              </div>

              {/* Table Body */}
              <div className="relative">
                {/* Visual highlight for central column */}
                <div className="absolute top-0 bottom-0 left-[25%] right-[25%] bg-primary/[0.04] rounded-b-[3vw] pointer-events-none z-0" />
                
                {comparisonData.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_1.5fr_1fr] items-center border-b border-black/5 last:border-0 relative z-10 group">
                    <div className="py-[6vh] px-[2vw]">
                      <h3 className="heading-md text-primary text-[1.8vw] reveal-text">{row.criterion}</h3>
                    </div>
                    <div className="py-[6vh] px-[4vw] text-center">
                      <p className="body-text text-primary font-bold text-[1.2vw] leading-relaxed reveal-text reveal-delay-1 max-w-[35vw] mx-auto">
                        {row.me}
                      </p>
                    </div>
                    <div className="py-[6vh] px-[2vw] text-center">
                      <p className="body-text text-muted-foreground opacity-50 text-[1vw] leading-relaxed reveal-text reveal-delay-2 max-w-[20vw] mx-auto">
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

      {/* Packages Section - Proportionally Scaling */}
      <section className="py-[12vh] md:py-[20vh] bg-white" id="packages">
        <div className="w-full px-[6vw]">
          {/* Timeline UI */}
          <div className="relative mb-[10vh] hidden md:block">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/10 -translate-y-1/2 z-0" />
            <div className="flex justify-between relative z-10">
              <div className="w-[1vw] h-[1vw] rounded-full bg-primary ring-[0.4vw] ring-white" />
              <div className="w-[1vw] h-[1vw] rounded-full bg-primary ring-[0.4vw] ring-white" />
              <div className="w-[1vw] h-[1vw] rounded-full bg-accent ring-[0.4vw] ring-white shadow-[0_0_1.5vw_rgba(139,125,58,0.4)]" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-[6vw]">
            {/* Package 1 */}
            <div className="flex flex-col reveal-text">
              <div className="mb-[3vh]">
                <h3 className="heading-md text-[2.2vw] mb-[1vh]">Fast Launch Starter</h3>
                <p className="body-text text-muted-foreground text-[0.9vw]">
                  A fast launch of a professional landing page for a small plumbing business.
                </p>
              </div>
              <ul className="space-y-[1.5vh] mb-[6vh] flex-grow">
                {[
                  "One high-converting landing page based on a proven template",
                  "Mobile-optimized, branded with your logo, colors, and fonts",
                  "Setup of contact details, click-to-call buttons, and a simple lead form",
                  "Basic on-page SEO structure for your main city",
                  "Launch on your domain/hosting"
                ].map((item, i) => (
                  <li key={i} className="body-text flex gap-[1vw] text-[0.8vw] leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="w-[0.9vw] h-[0.9vw] text-accent shrink-0 mt-[0.2vh]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-[3vh] border-t border-black/5">
                <div className="flex items-baseline gap-[0.8vw] mb-[4vh]">
                  <span className="label line-through opacity-30 text-[1vw]">$900</span>
                  <span className="heading-md text-[2.5vw] text-primary">$697</span>
                  <span className="tag opacity-40 text-[0.7vw]">one-time</span>
                </div>
                <Button className="w-full rounded-full btn text-[0.8vw] bg-primary text-white h-[4vw] hover:scale-[1.02] transition-transform">Get Started</Button>
              </div>
            </div>

            {/* Package 2 */}
            <div className="flex flex-col reveal-text reveal-delay-1">
              <div className="mb-[3vh]">
                <h3 className="heading-md text-[2.2vw] mb-[1vh]">Local Leads Pro</h3>
                <p className="body-text text-muted-foreground text-[0.9vw]">
                  A multi-page website built for local SEO and a steady flow of leads.
                </p>
              </div>
              <ul className="space-y-[1.5vh] mb-[6vh] flex-grow">
                {[
                  "Up to 5–7 pages: Home, Services, individual key services, About, Contact",
                  "“Service Areas” / “Cities We Serve” sections",
                  "Strong trust elements: reviews, guarantees, licenses",
                  "Enhanced on-page SEO and internal linking",
                  "Multiple CTAs: call, quote request, service request forms",
                  "Form integrations with email / Google Sheets / simple CRM"
                ].map((item, i) => (
                  <li key={i} className="body-text flex gap-[1vw] text-[0.8vw] leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="w-[0.9vw] h-[0.9vw] text-accent shrink-0 mt-[0.2vh]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-[3vh] border-t border-black/5">
                <div className="flex items-baseline gap-[0.8vw] mb-[4vh]">
                  <span className="label line-through opacity-30 text-[1vw]">$1500</span>
                  <span className="heading-md text-[2.5vw] text-primary">$1197</span>
                  <span className="tag opacity-40 text-[0.7vw]">one-time</span>
                </div>
                <Button className="w-full rounded-full btn text-[0.8vw] bg-primary text-white h-[4vw] hover:scale-[1.02] transition-transform">Get Started</Button>
              </div>
            </div>

            {/* Package 3 */}
            <div className="flex flex-col relative reveal-text reveal-delay-2">
              <div className="absolute -top-[3vh] left-0">
                <span className="tag bg-accent text-accent-foreground px-[1.2vw] py-[0.6vh] rounded-full text-[0.7vw] font-bold shadow-lg shadow-accent/20">Most Popular</span>
              </div>
              <div className="mb-[3vh]">
                <h3 className="heading-md text-[2.2vw] mb-[1vh]">Local Leads Pro</h3>
                <p className="body-text text-muted-foreground text-[0.9vw]">
                  A subscription for support, maintenance, and growth without the tech headaches.
                </p>
              </div>
              <ul className="space-y-[1.5vh] mb-[6vh] flex-grow">
                {[
                  "Website built on the Local Leads Pro package",
                  "Hosting and technical maintenance included",
                  "Monthly small content and promo updates",
                  "Light SEO and UX tweaks based on performance",
                  "Priority email support"
                ].map((item, i) => (
                  <li key={i} className="body-text flex gap-[1vw] text-[0.8vw] leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="w-[0.9vw] h-[0.9vw] text-accent shrink-0 mt-[0.2vh]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-[3vh] border-t border-black/5">
                <div className="mb-[4vh]">
                  <span className="label opacity-40 text-[0.8vw] block mb-[0.5vh]">setup from $700</span>
                  <span className="heading-md text-[2vw] text-accent">+$129–$199/mo.</span>
                </div>
                <Button className="w-full rounded-full btn text-[0.8vw] bg-accent text-accent-foreground h-[4vw] hover:scale-[1.02] transition-transform shadow-xl shadow-accent/10">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-[12vh] md:py-[18vh] bg-background border-t" id="contact">
        <div className="w-full px-[6vw]">
          <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-[8vw] text-center max-w-[80vw] mx-auto rounded-[3vw] shadow-2xl relative overflow-hidden reveal-text">
            <div className="relative z-10 space-y-[4vh]">
              <h2 className="heading-lg text-white leading-tight">Ready to Double Your <br />Plumbing Leads?</h2>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-white text-[1.4vw] rounded-full btn h-[6vw] px-[4vw] shadow-2xl group">
                <Link href="https://calendly.com" target="_blank" className="flex items-center gap-[1vw]">
                  Book My Free Call
                  <ArrowRight className="w-[1.4vw] h-[1.4vw] group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="tag opacity-60 text-[0.8vw]">Limited spots available for monthly intake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[8vh] border-t bg-white">
        <div className="w-full px-[4vw]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-[4vh]">
            <div className="flex items-center gap-[1vw]">
              <div className="w-[3vw] h-[3vw] rounded-[0.8vw] bg-primary flex items-center justify-center text-white heading-md text-[1.5vw]">J</div>
              <span className="heading-md text-primary text-[1.5vw]">JobFlow Landing Pages</span>
            </div>
            <div className="tag text-muted-foreground text-[0.8vw]">
              &copy; {new Date().getFullYear()} Anton Kolesnikov. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
