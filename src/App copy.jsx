import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#FAFBFC",
  white: "#FFFFFF",
  text: "#1A2B3C",
  textMid: "#4A5E73",
  textLight: "#8A9AB0",
  accent: "#065A82",
  accentLight: "#1C7293",
  accentGlow: "rgba(6,90,130,0.08)",
  amber: "#F39C12",
  border: "#E8EDF2",
  cardBg: "#FFFFFF",
  sectionAlt: "#F4F7FA",
};

const NAV_ITEMS = ["Services", "About", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const services = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="3" y="7" width="30" height="22" rx="3" stroke="#065A82" strokeWidth="2" />
        <path d="M10 17l4 4 8-8" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "AI Drawing Review",
    desc: "Automated compliance checking of engineering drawings against codes and standards. Upload a drawing and a standard — get a clause-by-clause report in seconds.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="#065A82" strokeWidth="2" />
        <path d="M18 10v8l5.5 3" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Interactive Simulations",
    desc: "AI-generated browser-based engineering simulations. Adjust parameters in real time and visualise system behaviour — from AHU operations to chilled water loops.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="5" y="3" width="26" height="30" rx="3" stroke="#065A82" strokeWidth="2" />
        <line x1="11" y1="11" x2="25" y2="11" stroke="#F39C12" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="17" x2="25" y2="17" stroke="#E8EDF2" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="23" x2="20" y2="23" stroke="#E8EDF2" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Schematic Generation",
    desc: "Describe your system in plain language and the AI generates complete engineering schematics — equipment layouts, piping diagrams, and control sequences.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M8 28V14l10-8 10 8v14a2 2 0 01-2 2H10a2 2 0 01-2-2z" stroke="#065A82" strokeWidth="2" />
        <rect x="14" y="20" width="8" height="10" rx="1" stroke="#F39C12" strokeWidth="2" />
      </svg>
    ),
    title: "Built Environment Analytics",
    desc: "Data-driven insights for HVAC, fire protection, plumbing, and electrical systems. Cross-check specifications, equipment data, and commissioning records.",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const email = import.meta.env.VITE_CONTACT_EMAIL || "your-email@example.com";
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New enquiry from Built-Environment AI website",
          _template: "box",
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 4000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Failed to send. Please check your connection and try again.");
    }
    setSending(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: COLORS.text, background: COLORS.bg, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

      {/* ─── NAV ─── */}
      <nav
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: scrolled ? "rgba(250,251,252,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
    transition: "all 0.4s ease",
  }}
>
  <div
    style={{
      maxWidth: 1120,
      margin: "0 auto",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
    }}
  >
    <div
      style={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <img
        src="/comply-logo.png"
        alt="Comply Logo"
        style={{
          height: 250,
          width: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      {NAV_ITEMS.map((item) => (
        <button
          key={item}
          onClick={() => scrollTo(item.toLowerCase())}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: COLORS.textMid,
            padding: "4px 0",
            borderBottom: "2px solid transparent",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = COLORS.accent;
            e.target.style.borderBottomColor = COLORS.amber;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = COLORS.textMid;
            e.target.style.borderBottomColor = "transparent";
          }}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
</nav>

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: `linear-gradient(165deg, ${COLORS.bg} 0%, #EDF2F7 40%, ${COLORS.accentGlow} 100%)`,
      }}>
        {/* Subtle grid pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(${COLORS.accent} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.accent} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        {/* Accent orb */}
        <div style={{
          position: "absolute", top: "10%", right: "8%", width: 400, height: 400,
          borderRadius: "50%", background: `radial-gradient(circle, rgba(6,90,130,0.06) 0%, transparent 70%)`,
          filter: "blur(40px)",
        }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 720, padding: "120px 24px 80px" }}>
          <div style={{
            display: "inline-block", padding: "6px 16px", borderRadius: 20,
            background: COLORS.accentGlow, border: `1px solid rgba(6,90,130,0.12)`,
            fontSize: 12, fontWeight: 600, color: COLORS.accent, letterSpacing: "1px", textTransform: "uppercase",
            marginBottom: 28,
          }}>
            AI · Data · HVAC · Infrastructure
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(38px, 6vw, 62px)",
            fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px",
            color: COLORS.text, letterSpacing: "-1px",
          }}>
            Smarter tools for the{" "}
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              built environment
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.7, color: COLORS.textMid,
            margin: "0 auto 40px", maxWidth: 540,
          }}>
            AI-powered engineering tools that review drawings, check compliance, and generate simulations — so engineers can focus on what matters most.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("services")}
              style={{
                padding: "14px 32px", borderRadius: 10, border: "none", cursor: "pointer",
                background: COLORS.accent, color: COLORS.white,
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
                boxShadow: "0 4px 16px rgba(6,90,130,0.3)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 6px 24px rgba(6,90,130,0.4)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 16px rgba(6,90,130,0.3)"; }}
            >
              Explore Services
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                padding: "14px 32px", borderRadius: 10, cursor: "pointer",
                background: "transparent", color: COLORS.accent,
                border: `2px solid ${COLORS.accent}`,
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.target.style.background = COLORS.accentGlow; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4,
        }}>
          <div style={{
            width: 24, height: 38, borderRadius: 12, border: `2px solid ${COLORS.textMid}`,
            display: "flex", justifyContent: "center", paddingTop: 6,
          }}>
            <div style={{
              width: 3, height: 8, borderRadius: 2, background: COLORS.textMid,
              animation: "scrollBounce 2s infinite",
            }} />
          </div>
        </div>
        <style>{`@keyframes scrollBounce { 0%,100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(8px); opacity: 0.3; } }`}</style>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{ padding: "100px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.amber, marginBottom: 12 }}>
                What We Do
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, margin: "0 0 16px", letterSpacing: "-0.5px" }}>
                AI Tools for the Built Environment
              </h2>
              <p style={{ fontSize: 17, color: COLORS.textMid, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                Purpose-built AI solutions for HVAC engineers, designers, and building services professionals.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  style={{
                    background: COLORS.cardBg, borderRadius: 16, padding: 32,
                    border: `1px solid ${COLORS.border}`, height: "100%",
                    transition: "all 0.3s ease", cursor: "default",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(6,90,130,0.1)";
                    e.currentTarget.style.borderColor = COLORS.accentLight;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                    e.currentTarget.style.borderColor = COLORS.border;
                  }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: 14, background: COLORS.accentGlow,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: COLORS.text }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textMid, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ padding: "100px 24px", background: COLORS.sectionAlt }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.amber, marginBottom: 12 }}>
                  About
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.5px" }}>
                  Engineering expertise meets AI capability
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.textMid, margin: "0 0 16px" }}>
                  Built-Environment AI was founded by Mohammed Abrar Ahmed — an HVAC engineer who saw firsthand how much time engineers spend on repetitive compliance checks, cross-referencing standards, and manual drawing reviews.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.textMid, margin: "0 0 24px" }}>
                  We build AI tools that understand engineering drawings, read standards documents, and generate actionable compliance reports — not to replace engineers, but to give them better tools so they can focus on design decisions that matter.
                </p>
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  {[
                    { num: "30+", label: "Compliance checks per drawing" },
                    { num: "<60s", label: "Report generation time" },
                    { num: "100%", label: "Engineer stays in the loop" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.accent, fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {stat.num}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.textLight, marginTop: 2 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual card */}
              <div style={{
                background: COLORS.white, borderRadius: 20, padding: 40,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 24 }}>
                  Our Approach
                </div>
                {[
                  { step: "01", title: "Upload", desc: "Standards and engineering drawings" },
                  { step: "02", title: "Analyse", desc: "AI reads both and cross-references every clause" },
                  { step: "03", title: "Report", desc: "Detailed compliance findings with evidence" },
                  { step: "04", title: "Review", desc: "Engineer makes the final decision" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 16, alignItems: "flex-start",
                    padding: "16px 0",
                    borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none",
                  }}>
                    <div style={{
                      minWidth: 36, height: 36, borderRadius: 10,
                      background: i === 3 ? COLORS.amber : COLORS.accentGlow,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700,
                      color: i === 3 ? COLORS.white : COLORS.accent,
                    }}>
                      {item.step}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 2 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, color: COLORS.textMid }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ padding: "100px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.amber, marginBottom: 12 }}>
                Contact
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, margin: "0 0 16px", letterSpacing: "-0.5px" }}>
                Let's talk
              </h2>
              <p style={{ fontSize: 16, color: COLORS.textMid, lineHeight: 1.7 }}>
                Interested in how AI can support your engineering workflow? Drop us a message.
              </p>
            </div>

            <div style={{
              background: COLORS.cardBg, borderRadius: 20, padding: "40px 36px",
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", background: "#E8F8F0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M7 14l5 5L21 9" stroke="#27AE60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>Message sent</h3>
                  <p style={{ fontSize: 14, color: COLORS.textMid }}>We'll get back to you shortly.</p>
                </div>
              ) : (
                <div>
                  {[
                    { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                    { label: "Email", key: "email", type: "email", placeholder: "you@company.com" },
                  ].map((field) => (
                    <div key={field.key} style={{ marginBottom: 20 }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        style={{
                          width: "100%", padding: "12px 16px", borderRadius: 10,
                          border: `1.5px solid ${COLORS.border}`, fontSize: 15,
                          fontFamily: "'DM Sans', sans-serif", color: COLORS.text,
                          background: COLORS.sectionAlt, outline: "none",
                          transition: "border-color 0.2s ease", boxSizing: "border-box",
                        }}
                        onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                        onBlur={(e) => e.target.style.borderColor = COLORS.border}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>
                      Message
                    </label>
                    <textarea
                      placeholder="Tell us about your project or question..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%", padding: "12px 16px", borderRadius: 10,
                        border: `1.5px solid ${COLORS.border}`, fontSize: 15,
                        fontFamily: "'DM Sans', sans-serif", color: COLORS.text,
                        background: COLORS.sectionAlt, outline: "none", resize: "vertical",
                        transition: "border-color 0.2s ease", boxSizing: "border-box",
                      }}
                      onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                      onBlur={(e) => e.target.style.borderColor = COLORS.border}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.email || !formData.message || sending}
                    style={{
                      width: "100%", padding: "14px 0", borderRadius: 10,
                      border: "none", cursor: formData.name && formData.email && formData.message && !sending ? "pointer" : "not-allowed",
                      background: formData.name && formData.email && formData.message ? COLORS.accent : COLORS.border,
                      color: COLORS.white, fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15, fontWeight: 600,
                      opacity: sending ? 0.7 : 1,
                      boxShadow: formData.name && formData.email && formData.message ? "0 4px 16px rgba(6,90,130,0.3)" : "none",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (formData.name && formData.email && formData.message && !sending) {
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = "0 6px 24px rgba(6,90,130,0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = formData.name && formData.email && formData.message ? "0 4px 16px rgba(6,90,130,0.3)" : "none";
                    }}
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: "40px 24px", background: COLORS.text,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6, background: COLORS.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="6" width="14" height="10" rx="1.5" stroke="white" strokeWidth="1.5" />
                <path d="M5 6V4a4 4 0 018 0v2" stroke="#F39C12" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 15, color: COLORS.white }}>
              Built-Environment AI
            </span>
          </div>
          <p style={{ fontSize: 13, color: COLORS.textLight, margin: 0 }}>
            AI · Data · HVAC · Infrastructure
          </p>
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid rgba(255,255,255,0.1)` }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>
              © {new Date().getFullYear()} Built-Environment AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}