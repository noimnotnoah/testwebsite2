import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroChip from "@/assets/hero-chip.png";
import build1 from "@/assets/pcbuild.avif";
import build2 from "@/assets/computerrepair.avif";
import build3 from "@/assets/build-3.jpg";
import mikefacecardAvif from "@/assets/mikefacecard.avif";
import buildWithYou from "@/assets/buildwithyou.avif";

export const Route = createFileRoute("/")({ component: HomePage });

/* ============ Cursor ============ */
function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot"; ring.className = "cursor-ring";
    document.body.append(dot, ring);
    let mx=0,my=0,rx=0,ry=0;
    let rafId = 0;
    const move = (e: MouseEvent) => { mx=e.clientX; my=e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; };
    const raf = () => { rx+=(mx-rx)*.18; ry+=(my-ry)*.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; rafId = requestAnimationFrame(raf); };
    const sel = "a,button,.card-snap,input,textarea,label[for]";
    const over = (e: Event) => { (e.target as HTMLElement).closest(sel) && ring.classList.add("expand"); };
    const out = (e: Event) => { (e.target as HTMLElement).closest(sel) && ring.classList.remove("expand"); };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    raf();
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(rafId);
      dot.remove(); ring.remove();
    };
  }, []);
  return null;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach(e => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============ Icons ============ */
const I = {
  laptop:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>,
  cpu:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>,
  wrench:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-2.4 2.6-2.6Z"/></svg>,
  users:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  star:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2Z"/></svg>,
  phone:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>,
  mail:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>,
  pin:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  arrow:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  check:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  close:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  fb:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z"/></svg>,
  ig:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  wa:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 0 0 3.4 17.3L2 22l4.8-1.4A11 11 0 1 0 20.5 3.5Zm-8.5 17a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.9 8.9 0 1 1 12 20.5Zm5-6.6c-.3-.2-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.6.1a7.3 7.3 0 0 1-3.6-3.2c-.3-.5.3-.4.8-1.4.1-.2 0-.3 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.5 3.9 1.7.7 2.3.7 3.1.6.5 0 1.6-.6 1.8-1.3.2-.7.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3Z"/></svg>,
  paw:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><ellipse cx="5" cy="9" rx="2" ry="2.5"/><ellipse cx="9" cy="6" rx="2" ry="2.5"/><ellipse cx="15" cy="6" rx="2" ry="2.5"/><ellipse cx="19" cy="9" rx="2" ry="2.5"/><path d="M12 11c-3 0-6 2.5-6 5.5C6 19 8 20 10 20c1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 4-1 4-3.5 0-3-3-5.5-6-5.5Z"/></svg>,
  google:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 12.23c0-.7-.06-1.37-.18-2.02H12v3.83h5.39a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.97-4.33 2.97-7.34Z"/><path d="M12 22c2.7 0 4.96-.9 6.63-2.43l-3.24-2.51c-.9.6-2.05.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H3.05v2.59A10 10 0 0 0 12 22Z"/><path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.05a10 10 0 0 0 0 9l3.35-2.6Z"/><path d="M12 5.98c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.95 3 14.7 2 12 2A10 10 0 0 0 3.05 7.5l3.35 2.6C7.19 7.73 9.4 5.98 12 5.98Z"/></svg>,
  clock:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  shop:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18l-1 11H4L3 9Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></svg>,
  truck:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v10H3z"/><path d="M14 10h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
  spark:(p:any)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z"/></svg>,
};

/* ============ Data ============ */
const services = [
  { icon: I.laptop, title: "Refurbished Corporate Laptops & Desktops", from: "From £150", desc: "Premium ex-corporate Dell & Lenovo, built to outlast and outpace consumer kit.",
    detail: "Carefully chosen ex-corporate Dell and Lenovo machines that deliver better speed, build quality and reliability than most consumer devices. Reducing corporate waste through recycling lets us offer great-quality laptops and desktops at a fraction of the original cost. Free consultation, honest advice, tailored to you." },
  { icon: I.cpu, title: "Bespoke Custom Gaming PCs", from: "From £600", desc: "Custom builds designed around your budget, your games and your aesthetic.",
    detail: "We love designing and building beautiful PCs. Every build is shaped around your budget and exact needs, with our team hand-picking quality parts for incredible speed, durability and long-lasting reliability — a machine built just for you. Free consultation included." },
  { icon: I.users, title: "Build With You", from: "From £50", desc: "Hands-on session — you build it, we guide every step. Just £50 + parts.",
    detail: "Get hands-on with building your own PC while we guide you every step of the way. We'll show you exactly what to do, making sure you feel confident and fully involved as your computer comes to life. \"Build With You\" is just £50, plus the cost of the PC." },
  { icon: I.wrench, title: "PC & Laptop Upgrades & Repairs", from: "From £50", desc: "Honest diagnostics, fair quotes — most fixes cost far less than a new machine.",
    detail: "Sometimes your computer just needs a bit of love to feel like new again. Our team will take a good look, figure out what's going on, and guide you toward the best options. Most upgrades and repairs cost far less than replacing the whole thing." },
];

const reviews = [
  { quote: "Mike has just built a gaming tower for my youngest son for Christmas, within our budget and with the best spec possible. A \"fantastic\" piece of kit. Brilliant, caring customer service. I cannot recommend Mike highly enough. Thank you!!", name: "Stephen O'Reilly", place: "Devon", source: "Google" },
  { quote: "Absolutely brilliant! Bought two ThinkPads from here and also serviced two existing ones we had. Great price and customer service.. highly recommended! 😉👍", name: "Vincent Miller", place: "Exeter", source: "Google" },
  { quote: "Totally recommend Mike and his honest, friendly, helpful advice! Really pleased with the laptop we bought from him!", name: "David Bartlett", place: "Devon", source: "Facebook" },
  { quote: "Had an absolutely fantastic service, and the laptops are of great quality.", name: "Google customer", place: "Exeter", source: "Google" },
  { quote: "Highly recommend Mike, down to earth, knows his tech, excellent repair price.", name: "Google customer", place: "Exeter", source: "Google" },
  { quote: "Very kind people and a beautiful dog called Flash, who's very eager to play!", name: "Google customer", place: "Exeter", source: "Google" },
];

const team = [
  { name: "Mike", role: "Founder · Lead Builder & Technician", init: "M" },
  { name: "Cassie", role: "Shop Floor · Customer Care", init: "C" },
  { name: "Noah", role: "Next-Gen Builder", init: "N" },
  { name: "Flash", role: "Chief Tail-Wagger 🐾", init: "🐶" },
];

const process = [
  { step: "01", t: "Free consultation", d: "Phone, email or pop in — we listen first, then advise. No pressure, no upsell." },
  { step: "02", t: "Honest recommendation", d: "Refurb, custom build, or repair — we'll tell you what's actually best for you." },
  { step: "03", t: "Built or fixed in-house", d: "Every machine is hand-built, cable-managed and stress-tested at our Exeter workshop." },
  { step: "04", t: "Aftercare that lasts", d: "Anything not right? Bring it back. We're a five-minute walk, not a call centre." },
];

const builds = [
  { img: build1, tag: "Custom Gaming PC", title: "Mid-tower blue-loop build" },
  { img: buildWithYou, tag: "Build With You", title: "Hands-on session — you build it, we guide" },
  { img: build2, tag: "Repair & Upgrade", title: "SSD + RAM upgrade in progress" },
  { img: build3, tag: "Refurbished Laptop", title: "Ex-corporate Dell, tested & cleaned" },
];

/* ============ Components ============ */
function AnnouncementBar() {
  const items = [
    "★ 4.9 on Google · 153 reviews",
    "Service First — always",
    "Free consultation on every job",
    "In-store · Pick-up · Delivery",
    "46+ years combined IT experience",
    "Family-run · Independent · Exeter",
  ];
  return (
    <div className="bg-[var(--ink)] text-white text-sm overflow-hidden">
      <div className="marquee-track py-2.5">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap opacity-80">
            <I.spark className="w-3.5 h-3.5 text-[color:var(--primary-glow)]" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [["Home","#home"],["Services","#services"],["Builds","#builds"],["About","#about"],["Reviews","#reviews"],["Contact","#contact"]];
  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <nav className={`glass rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? "shadow-[var(--shadow-soft)]" : ""}`}>
          <a href="#home" className="flex items-center gap-2.5 font-display font-black text-lg">
            <img src="/logo.png" alt="Mike's Laptop's" className="w-9 h-9 rounded-xl object-contain" />
            <span>Mike's Laptop's<span className="text-[color:var(--primary)]">.</span></span>
          </a>
          <ul className="hidden lg:flex items-center gap-1">
            {links.map(([l,h]) => (
              <li key={h}><a href={h} className="px-4 py-2 text-sm font-medium rounded-full hover:bg-[var(--secondary)] transition-colors">{l}</a></li>
            ))}
          </ul>
          <div className="hidden sm:flex items-center gap-2">
            <a href="https://wa.me/447888257303" target="_blank" rel="noopener" className="btn-ghost !py-2.5 !px-4 text-sm">
              <I.wa className="w-4 h-4" /> WhatsApp
            </a>
            <a href="tel:07888257303" className="btn-primary !py-2.5 !px-5 text-sm">
              <I.phone className="w-4 h-4" /> Call Us
            </a>
          </div>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </nav>
        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-1">
            {links.map(([l,h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-[var(--secondary)]">{l}</a>
            ))}
            <a href="tel:07888257303" className="btn-primary mt-2 justify-center"><I.phone className="w-4 h-4" /> 07888 257303</a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2)/r.width;
      const y = (e.clientY - r.top - r.height/2)/r.height;
      el.style.setProperty("--px", `${x*30}px`);
      el.style.setProperty("--py", `${y*30}px`);
      el.style.setProperty("--rx", `${-y*8}deg`);
      el.style.setProperty("--ry", `${x*8}deg`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden mesh-bg">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 w-[460px] h-[460px] rounded-full opacity-40 blur-3xl"
           style={{ background: "var(--gradient-primary)", animation: "var(--animate-blob)" }} />
      <div aria-hidden className="pointer-events-none absolute top-40 -right-32 w-[520px] h-[520px] rounded-full opacity-25 blur-3xl"
           style={{ background: "var(--gradient-primary)", animation: "var(--animate-blob)", animationDelay: "-6s" }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-24 md:pt-20 md:pb-32 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 reveal">
          <a href="#reviews" className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[var(--border)] text-xs font-semibold tracking-wide hover:border-[color:var(--primary)] transition-colors">
            <span className="flex gap-0.5 text-[color:var(--primary)]">{[0,1,2,3,4].map(i=><I.star key={i} className="w-3 h-3" />)}</span>
            <span className="text-[color:var(--ink)]">4.9</span>
            <span className="text-[color:var(--muted-foreground)]">· 153 Google reviews</span>
            <I.arrow className="w-3 h-3 text-[color:var(--primary)]" />
          </a>
          <h1 className="mt-6 font-display font-black text-[2.75rem] sm:text-6xl lg:text-[5.5rem] leading-[0.92] text-[color:var(--ink)] tracking-tight">
            Built. Fixed. <span className="text-gradient">Loved.</span>
            <span className="block mt-2 text-[color:var(--muted-foreground)] text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight">
              Exeter's independent computer specialists.
            </span>
          </h1>
          <p className="mt-7 text-lg text-[color:var(--muted-foreground)] max-w-xl leading-relaxed">
            Family-run by Mike, Cassie & Noah. Premium ex-corporate refurbs,
            bespoke gaming rigs, and honest repairs — backed by 46+ years of
            combined IT experience and a Service First philosophy.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#services" className="btn-primary">Explore services <I.arrow className="w-4 h-4" /></a>
            <a href="#contact" className="btn-ghost">Free consultation</a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm">
            {[
              { i: I.shop, t: "In-store shopping" },
              { i: I.users, t: "In-store pick-up" },
              { i: I.truck, t: "Delivery" },
            ].map(b => (
              <div key={b.t} className="flex items-center gap-2 text-[color:var(--ink)] font-medium">
                <span className="w-8 h-8 rounded-lg grid place-items-center text-[color:var(--primary)] bg-[color:var(--secondary)]">
                  <b.i className="w-4 h-4" />
                </span>
                {b.t}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 reveal relative h-[420px] sm:h-[520px] flex items-center justify-center" style={{ perspective: "1200px" }}>
          <div aria-hidden className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full blur-3xl opacity-55"
               style={{ background: "var(--gradient-primary)" }} />
          {/* Rotating ring */}
          <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" style={{ animation: "var(--animate-spin-slow)" }}>
            <defs>
              <linearGradient id="rg" x1="0" x2="1"><stop offset="0%" stopColor="var(--primary)" /><stop offset="100%" stopColor="var(--primary-glow)" /></linearGradient>
            </defs>
            <circle cx="200" cy="200" r="180" fill="none" stroke="url(#rg)" strokeWidth="1.2" strokeDasharray="4 8" opacity=".6" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="url(#rg)" strokeWidth="0.8" strokeDasharray="2 14" opacity=".4" />
          </svg>
          <img
            src={heroChip} alt="Glowing CPU microchip"
            width={1280} height={1280}
            className="relative w-full max-w-[520px] drop-shadow-2xl"
            style={{
              transform: "translate3d(var(--px,0), var(--py,0), 0) rotateX(var(--rx,0)) rotateY(var(--ry,0))",
              transition: "transform .25s var(--ease-snappy)",
              animation: "var(--animate-float-slow)",
            }}
          />
          <div className="absolute top-4 right-0 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[var(--shadow-soft)]"
               style={{ animation: "var(--animate-float)" }}>
            <span className="w-9 h-9 rounded-lg grid place-items-center text-white" style={{ background: "var(--gradient-primary)" }}>
              <I.spark className="w-5 h-5" />
            </span>
            <div className="text-sm">
              <div className="font-bold text-[color:var(--ink)]">Service First</div>
              <div className="text-[color:var(--muted-foreground)] text-xs">Our one rule</div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[var(--shadow-soft)]"
               style={{ animation: "var(--animate-float)", animationDelay: "-3s" }}>
            <span className="w-9 h-9 rounded-lg grid place-items-center text-white" style={{ background: "var(--gradient-primary)" }}>
              <I.paw className="w-5 h-5" />
            </span>
            <div className="text-sm">
              <div className="font-bold text-[color:var(--ink)]">Flash approved</div>
              <div className="text-[color:var(--muted-foreground)] text-xs">Shop dog on duty</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { v: "4.9★", l: "Google rating", s: "from 153 reviews" },
    { v: "46+", l: "Years combined IT experience", s: "Mike, Cassie & Noah" },
    { v: "£50", l: "Starting price for repairs", s: "Free consultation first" },
    { v: "100%", l: "Built & fixed in Exeter", s: "Never outsourced" },
  ];
  return (
    <section className="relative -mt-px py-14 md:py-20 bg-[color:var(--ink)] text-white">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s,i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i*80}ms` }}>
            <div className="font-display font-black text-5xl md:text-6xl text-gradient leading-none">{s.v}</div>
            <div className="mt-3 font-semibold">{s.l}</div>
            <div className="text-sm text-white/60 mt-1">{s.s}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services({ onOpen }: { onOpen:(i:number)=>void }) {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--primary)]">What we do</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-black text-[color:var(--ink)] leading-[0.95]">
            Four services.<br/><span className="text-gradient">Zero compromise.</span>
          </h2>
          <p className="mt-5 text-[color:var(--muted-foreground)] text-lg">
            From a £150 refurbished workhorse to a £2,000+ dream rig — and every fix in between.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s,i) => (
            <article key={s.title} className="card-snap reveal group bg-card border border-[var(--border)] rounded-2xl p-7 flex flex-col"
                     style={{ transitionDelay: `${i*80}ms` }}>
              <span className="w-14 h-14 rounded-xl grid place-items-center text-white mb-5"
                    style={{ background: "var(--gradient-primary)", animation: "var(--animate-float)", animationDelay: `${i*-1.2}s` }}>
                <s.icon className="w-7 h-7" />
              </span>
              <div className="text-xs font-bold uppercase tracking-wider text-[color:var(--primary)] mb-1.5">{s.from} · Free consultation</div>
              <h3 className="font-display font-extrabold text-xl text-[color:var(--ink)] leading-tight">{s.title}</h3>
              <p className="mt-2 text-[color:var(--muted-foreground)] text-sm leading-relaxed flex-1">{s.desc}</p>
              <button onClick={()=>onOpen(i)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary)] group-hover:gap-3 transition-all">
                Learn more <I.arrow className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Builds({ onBuy }: { onBuy:(t:string)=>void }) {
  return (
    <section id="builds" className="relative py-24 md:py-32 bg-[var(--ink)] text-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-25" />
      <div aria-hidden className="absolute -top-32 right-0 w-[480px] h-[480px] rounded-full opacity-30 blur-3xl"
           style={{ background: "var(--gradient-primary)" }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-wrap items-end justify-between gap-6 max-w-5xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--primary-glow)]">From the workshop</span>
            <h2 className="mt-3 text-4xl md:text-6xl font-black leading-[0.95]">
              Recent <span className="text-gradient">builds & fixes</span>.
            </h2>
          </div>
          <p className="text-white/70 max-w-sm">
            Stock changes weekly. Want to see what's on the shelf right now?
            Message us on WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {builds.map((b,i) => (
            <article key={b.title} className="card-snap reveal group rounded-2xl overflow-hidden glass-dark flex flex-col"
                     style={{ transitionDelay: `${i*80}ms` }}>
              <div className="aspect-[4/3] overflow-hidden bg-black">
                <img src={b.img} alt={b.title} loading="lazy" width={1280} height={1024}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs font-bold uppercase tracking-wider text-[color:var(--primary-glow)]">{b.tag}</div>
                <h3 className="mt-2 font-display font-extrabold text-lg text-white">{b.title}</h3>
                <button onClick={()=>onBuy(b.title)} className="mt-5 self-start inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:gap-3 transition-all">
                  Enquire about similar <I.arrow className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--primary)]">How it works</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-black text-[color:var(--ink)] leading-[0.95]">
            Four steps. <span className="text-gradient">No surprises.</span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-4 gap-6 relative">
          <div aria-hidden className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--primary)]/30 to-transparent" />
          {process.map((p,i) => (
            <div key={p.step} className="reveal relative" style={{ transitionDelay: `${i*100}ms` }}>
              <div className="w-24 h-24 rounded-2xl grid place-items-center bg-white border border-[var(--border)] font-display font-black text-3xl text-gradient shadow-[var(--shadow-card)]"
                   style={{ animation: "var(--animate-pulse-glow)", animationDelay: `${i*0.5}s` }}>
                {p.step}
              </div>
              <h3 className="mt-6 font-display font-extrabold text-xl text-[color:var(--ink)]">{p.t}</h3>
              <p className="mt-2 text-[color:var(--muted-foreground)] text-sm leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[color:var(--secondary)] overflow-hidden">
      <div aria-hidden className="absolute -bottom-32 -left-32 w-[460px] h-[460px] rounded-full opacity-25 blur-3xl"
           style={{ background: "var(--gradient-primary)" }} />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 reveal">
          <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--primary)]">The team</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-black text-[color:var(--ink)] leading-[0.95]">
            Three humans.<br/>One dog.<br/><span className="text-gradient">46+ years of know-how.</span>
          </h2>
          <p className="mt-6 text-[color:var(--muted-foreground)] text-lg leading-relaxed">
            Reducing corporate waste by recycling allows us to offer
            great-quality laptops and desktops at a fraction of the original
            cost. We also love designing and building beautiful PCs — get as
            involved with the process as you like.
          </p>
          <p className="mt-4 text-[color:var(--muted-foreground)] text-lg leading-relaxed">
            Whether it's something new, refurbished, or repaired — we offer
            honest advice and tailor our service specifically for you. That's
            it. That's the whole pitch.
          </p>
          <a href="#contact" className="btn-primary mt-8">Come say hi <I.arrow className="w-4 h-4" /></a>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-5">
          {team.map((m,i) => (
            <div key={m.name} className="card-snap reveal bg-white border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col"
                 style={{ transitionDelay: `${i*100}ms` }}>
              {m.name === "Mike" ? (
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  <img src={mikefacecardAvif} alt="Mike" loading="lazy" width={1280} height={1024}
                       className="w-full h-full object-cover" />
                </div>
              ) : (
                <span className="w-16 h-16 rounded-2xl grid place-items-center text-white font-display font-black text-2xl mb-4 ml-6 mt-6"
                      style={{ background: "var(--gradient-primary)" }}>
                  {m.init}
                </span>
              )}
              <div className="p-6 pt-4 flex flex-col flex-1">
                <div className="font-display font-extrabold text-2xl text-[color:var(--ink)]">{m.name}</div>
                <div className="text-sm text-[color:var(--muted-foreground)] mt-1">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--primary)]">The receipts</span>
            <h2 className="mt-3 text-4xl md:text-6xl font-black text-[color:var(--ink)] leading-[0.95]">
              4.9★ on Google.<br/><span className="text-gradient">153 reviews and counting.</span>
            </h2>
          </div>
          <a href="https://www.google.com/maps/place/Mike's+Laptops" target="_blank" rel="noopener" className="btn-ghost">
            <I.google className="w-4 h-4" /> Read all reviews
          </a>
        </div>

        <div className="mt-14 columns-1 md:columns-2 lg:columns-3 gap-6 [&>*]:break-inside-avoid [&>*]:mb-6">
          {reviews.map((r,i) => (
            <figure key={i} className="card-snap reveal review-card p-7 flex flex-col"
                    style={{ transitionDelay: `${(i%3)*90}ms` }}>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-[color:var(--primary)]">
                  {[0,1,2,3,4].map(s => <I.star key={s} className="w-4 h-4" />)}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)] flex items-center gap-1.5">
                  {r.source === "Google" ? <I.google className="w-3.5 h-3.5" /> : <I.fb className="w-3.5 h-3.5" />}
                  {r.source}
                </span>
              </div>
              <blockquote className="mt-4 text-[color:var(--ink)] leading-relaxed">"{r.quote}"</blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-semibold text-[color:var(--ink)]">{r.name}</div>
                <div className="text-[color:var(--muted-foreground)]">{r.place}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ prefill, onSent }: { prefill: string; onSent: ()=>void }) {
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [statusText, setStatusText] = useState("");
  useEffect(() => {
    if (prefill) setMsg(`Hi! I'm interested in something similar to "${prefill}". Could you let me know what's currently available?`);
  }, [prefill]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const trap = String(data.get("website") || "").trim();
    if (trap) return;

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const bodyMessage = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Website enquiry from ${name || "customer"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "Message:",
        bodyMessage,
      ].join("\n"),
    );

    const mailtoHref = `mailto:info@mikeslaptops.co.uk?subject=${subject}&body=${body}`;
    setSending(true);
    window.location.href = mailtoHref;
    setTimeout(() => {
      setSending(false);
      setStatusText("Draft email opened. If nothing appeared, call or WhatsApp us.");
      onSent();
      setMsg("");
      form.reset();
    }, 500);
  };
  return (
    <section id="contact" className="relative py-24 md:py-32 mesh-bg">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div className="reveal">
          <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--primary)]">Get in touch</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-black text-[color:var(--ink)] leading-[0.95]">
            Pop in. Ring.<br/><span className="text-gradient">Drop a line.</span>
          </h2>
          <p className="mt-5 text-[color:var(--muted-foreground)] text-lg">
            Every service starts with a free consultation — and yes, Flash will
            probably greet you at the door.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: I.pin, label: "Lower-Ground Floor, 4 Southernhay West, Exeter, EX1 1JG", sub: "Plus code: PFCC+PX Exeter", href: "https://www.google.com/maps/dir/?api=1&destination=4%20Southernhay%20W%2C%20Exeter%20EX1%201JG%2C%20UK" },
              { icon: I.phone, label: "07888 257303", sub: "WhatsApp friendly", href: "tel:07888257303" },
              { icon: I.mail, label: "info@mikeslaptops.co.uk", sub: "We reply quickly", href: "mailto:info@mikeslaptops.co.uk" },
              { icon: I.clock, label: "Opens 10am Tue", sub: "Check Google for live hours", href: "https://www.google.com/maps/place/Mike's+Laptops" },
            ].map(c => (
              <a key={c.label} href={c.href} className="card-snap flex items-center gap-4 bg-white border border-[var(--border)] rounded-2xl p-5">
                <span className="w-12 h-12 rounded-xl grid place-items-center text-white shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <c.icon className="w-6 h-6" />
                </span>
                <div>
                  <div className="font-semibold text-[color:var(--ink)]">{c.label}</div>
                  <div className="text-xs text-[color:var(--muted-foreground)] mt-0.5">{c.sub}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a href="https://wa.me/447888257303" target="_blank" rel="noopener" aria-label="WhatsApp" className="w-11 h-11 grid place-items-center rounded-full bg-white border border-[var(--border)] hover:text-[color:var(--primary)] hover:border-[color:var(--primary)] transition-colors"><I.wa className="w-5 h-5" /></a>
            <a href="https://www.facebook.com/mikeslaptops" target="_blank" rel="noopener" aria-label="Facebook" className="w-11 h-11 grid place-items-center rounded-full bg-white border border-[var(--border)] hover:text-[color:var(--primary)] hover:border-[color:var(--primary)] transition-colors"><I.fb className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/mikeslaptops/" target="_blank" rel="noopener" aria-label="Instagram" className="w-11 h-11 grid place-items-center rounded-full bg-white border border-[var(--border)] hover:text-[color:var(--primary)] hover:border-[color:var(--primary)] transition-colors"><I.ig className="w-5 h-5" /></a>
            <a href="https://www.google.com/maps/place/Mike's+Laptops" target="_blank" rel="noopener" aria-label="Google" className="w-11 h-11 grid place-items-center rounded-full bg-white border border-[var(--border)] hover:text-[color:var(--primary)] hover:border-[color:var(--primary)] transition-colors"><I.google className="w-5 h-5" /></a>
          </div>
        </div>

        <form id="contact-form" onSubmit={submit} className="reveal bg-white border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] space-y-5">
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Leave this blank</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-semibold block mb-2">Name</label>
            <input id="name" name="name" autoComplete="name" required className="w-full bg-[color:var(--secondary)] border border-transparent focus:border-[color:var(--primary)] focus:bg-white outline-none rounded-xl px-4 py-3.5 transition-all" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="text-sm font-semibold block mb-2">Email</label>
              <input id="email" name="email" autoComplete="email" required type="email" className="w-full bg-[color:var(--secondary)] border border-transparent focus:border-[color:var(--primary)] focus:bg-white outline-none rounded-xl px-4 py-3.5 transition-all" />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-semibold block mb-2">Phone (optional)</label>
              <input id="phone" name="phone" autoComplete="tel" className="w-full bg-[color:var(--secondary)] border border-transparent focus:border-[color:var(--primary)] focus:bg-white outline-none rounded-xl px-4 py-3.5 transition-all" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-semibold block mb-2">Message</label>
            <textarea id="message" name="message" required minLength={12} rows={5} value={msg} onChange={e=>setMsg(e.target.value)}
                      className="w-full bg-[color:var(--secondary)] border border-transparent focus:border-[color:var(--primary)] focus:bg-white outline-none rounded-xl px-4 py-3.5 transition-all resize-none"
                      placeholder="Tell us what you're looking for — refurbished laptop, custom build, repair…" />
          </div>
          <p aria-live="polite" className="text-xs text-[color:var(--muted-foreground)] min-h-4">{statusText}</p>
          <button disabled={sending} className="btn-primary w-full justify-center disabled:opacity-70">
            {sending ? (<><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />Opening email…</>) : (<>Submit <I.arrow className="w-4 h-4" /></>)}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 font-display font-black text-xl text-white">
            <img src="/logo.png" alt="Mike's Laptop's" className="w-9 h-9 rounded-xl object-contain" />
            Mike's Laptops & Custom Gaming PCs
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed">
            Independent, family-run computer specialists in Exeter. Refurbished
            business laptops, bespoke custom builds, and honest upgrades &
            repairs — 4.9★ on Google.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href="https://wa.me/447888257303" target="_blank" rel="noopener" className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="WhatsApp"><I.wa className="w-4 h-4" /></a>
            <a href="https://www.facebook.com/mikeslaptops" target="_blank" rel="noopener" className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Facebook"><I.fb className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/mikeslaptops/" target="_blank" rel="noopener" className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Instagram"><I.ig className="w-4 h-4" /></a>
            <a href="https://www.google.com/maps/place/Mike's+Laptops" target="_blank" rel="noopener" className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Google"><I.google className="w-4 h-4" /></a>
          </div>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Visit</div>
          <p className="text-sm leading-relaxed">Lower-Ground Floor<br/>4 Southernhay West<br/>Exeter, EX1 1JG, UK</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:07888257303" className="hover:text-white">07888 257303</a></li>
            <li><a href="mailto:info@mikeslaptops.co.uk" className="hover:text-white">info@mikeslaptops.co.uk</a></li>
            <li className="opacity-70">WhatsApp · Facebook · Instagram</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-xs flex flex-wrap justify-between gap-3 opacity-70">
          <span>© {new Date().getFullYear()} Mike's Laptops & Custom Gaming PCs. All rights reserved.</span>
          <span>Built in Exeter · Watched by Flash 🐾</span>
        </div>
      </div>
    </footer>
  );
}

function Modal({ open, onClose, children }: { open: boolean; onClose: ()=>void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 bg-black/55 backdrop-blur-md" onClick={onClose}
         style={{ animation: "fade-up .3s var(--ease-snappy)" }}>
      <div onClick={e=>e.stopPropagation()} className="relative bg-white rounded-3xl max-w-lg w-full p-8 md:p-10 shadow-2xl"
           style={{ animation: "fade-up .4s var(--ease-snappy)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full hover:bg-[var(--secondary)]" aria-label="Close">
          <I.close className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

function FloatingDock() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
      <a href="https://wa.me/447888257303" target="_blank" rel="noopener" aria-label="WhatsApp"
         className="group relative w-14 h-14 rounded-full grid place-items-center text-white shadow-[var(--shadow-elegant)]"
         style={{ background: "var(--gradient-primary)", animation: "var(--animate-pulse-glow)" }}>
        <I.wa className="w-6 h-6" />
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full bg-[var(--ink)] text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat on WhatsApp</span>
      </a>
      <a href="tel:07888257303" aria-label="Call"
         className="w-14 h-14 rounded-full grid place-items-center bg-white border border-[var(--border)] shadow-[var(--shadow-card)] text-[color:var(--primary)] hover:bg-[color:var(--secondary)] transition-colors">
        <I.phone className="w-5 h-5" />
      </a>
    </div>
  );
}

/* ============ Index ============ */
export function HomePage() {
  useReveal();
  const [serviceIdx, setServiceIdx] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [prefill, setPrefill] = useState("");

  const onBuy = (name: string) => {
    setPrefill(name);
    setTimeout(() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  const svc = serviceIdx !== null ? services[serviceIdx] : null;

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <CustomCursor />
      <AnnouncementBar />
      <Nav />
      <main id="main-content">
        <Hero />
        <StatsBar />
        <Services onOpen={setServiceIdx} />
        <Builds onBuy={onBuy} />
        <Process />
        <About />
        <Reviews />
        <Contact prefill={prefill} onSent={() => setSuccess(true)} />
      </main>
      <Footer />
      <FloatingDock />

      <Modal open={svc !== null} onClose={() => setServiceIdx(null)}>
        {svc && (
          <>
            <span className="w-14 h-14 rounded-xl grid place-items-center text-white mb-4" style={{ background: "var(--gradient-primary)" }}>
              <svc.icon className="w-7 h-7" />
            </span>
            <div className="text-xs font-bold uppercase tracking-wider text-[color:var(--primary)] mb-1">{svc.from} · Free consultation</div>
            <h3 className="font-display font-black text-3xl text-[color:var(--ink)]">{svc.title}</h3>
            <p className="mt-4 text-[color:var(--muted-foreground)] leading-relaxed">{svc.detail}</p>
            <div className="mt-6 flex gap-3">
              <a href="#contact" onClick={() => setServiceIdx(null)} className="btn-primary">Enquire <I.arrow className="w-4 h-4" /></a>
              <a href="https://wa.me/447888257303" target="_blank" rel="noopener" className="btn-ghost"><I.wa className="w-4 h-4" /> WhatsApp</a>
            </div>
          </>
        )}
      </Modal>

      <Modal open={success} onClose={() => setSuccess(false)}>
        <span className="w-14 h-14 rounded-full grid place-items-center text-white mb-4 mx-auto" style={{ background: "var(--gradient-primary)" }}>
          <I.check className="w-7 h-7" />
        </span>
        <h3 className="font-display font-black text-3xl text-center text-[color:var(--ink)]">Thanks for submitting!</h3>
        <p className="mt-3 text-center text-[color:var(--muted-foreground)]">
          Mike, Cassie or Noah will be back to you very shortly. Urgent? Ring <a href="tel:07888257303" className="font-semibold text-[color:var(--primary)]">07888 257303</a>.
        </p>
        <button onClick={() => setSuccess(false)} className="btn-primary w-full justify-center mt-6">Close</button>
      </Modal>
    </>
  );
}
