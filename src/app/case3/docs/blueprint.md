# **App Name**: Thelen Home Connect

## Core Features:

- Service Showcase: Clearly display a comprehensive list of plumbing, heating, and air conditioning services offered to potential customers.
- Contact Information & Location Display: Prominently feature essential contact details including phone number, email, and service addresses for easy access.
- Customer Testimonial Highlights: Showcase positive reviews, ratings, and testimonials (e.g., Google 4.9, 500+ reviews, 98% recommend) to build trust and credibility.
- Frequently Asked Questions (FAQ): Provide a searchable or categorized section of common customer questions and their answers using shadcn/ui Accordion components.
- Emergency Service Callout: Visibly promote the 24/7 same-day guarantee or $100 off for emergency services to reassure users.
- AI Chatbot Assistant: An AI-powered tool that provides instant answers to user queries, assists with basic troubleshooting, or guides them toward the appropriate service based on their input.
- Service Request Form: A user-friendly form for potential customers to schedule estimates or service appointments, integrated with shadcn/ui Input and Button components.

## Style Guidelines:

- Color scheme: Light theme, utilizing warm and earthy tones complemented by cool accents. The primary palette establishes a professional and inviting presence.
- Primary brand color (heating/warm): A rich terracotta red (#D94F2E), conveying energy and warmth for key actions and branding.
- Background color: A soft, warm off-white (#F5F1EA), providing a clean and inviting canvas.
- Accent color (cooling/ice): A calming cool blue (#7FB3C9), representing air conditioning services and providing visual balance.
- Emergency situations: A vibrant red (#E63946) for critical calls and urgent notices, ensuring immediate attention.
- Success indicators: A confident forest green (#4A7C59), signifying trust and positive outcomes.
- Foreground (text): A deep, rich charcoal (#0F1419) for main text, ensuring high readability.
- Muted text: A versatile gray (#6B6864) for secondary information, adding depth without distraction.
- Dark sections: A deep, almost black (#1A1D1F) for contrasting background elements or feature sections.
- Headline font: 'Archivo Black' or 'Anton' (sans-serif) for large, impactful headlines, conveying strength and directness. Note: currently only Google Fonts are supported.
- Body font: 'Inter Tight' (sans-serif) for clear and legible body text, optimizing for web readability. Note: currently only Google Fonts are supported.
- Monospace font: 'JetBrains Mono' (monospace) for displaying structured data like prices or tables, offering precise readability. Note: currently only Google Fonts are supported.
- All typography will be set in vw units with clamp() for adaptive scaling across viewports.
- Mobile-first responsive design, rigorously tested at 375px, 768px, 1440px, and 1920px. Tablets are treated as mobile for animations, using a single `md:` breakpoint at 768px.
- Utilize Framer Motion for sophisticated animations. Prioritize CSS for animations when possible, reserving JavaScript for animation logic and complex orchestrations. Noise overlays will feature `steps(1)` animation for a subtle, non-rhythmic effect.
- Modern and clean line-style icons will represent services (plumbing, heating, air) and key actions (contact, emergency, reviews), maintaining a consistent brand aesthetic.