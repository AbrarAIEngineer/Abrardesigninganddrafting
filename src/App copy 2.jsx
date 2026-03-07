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
  footerBg: "#12202F",
};

const NAV_ITEMS = ["Services", "About", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
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
        <rect x="4" y="6" width="28" height="24" rx="4" stroke="#065A82" strokeWidth="2" />
        <path d="M11 18h14" stroke="#E8EDF2" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 12h8" stroke="#F39C12" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 24h10" stroke="#E8EDF2" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Custom AI Tool Development",
    desc: "We work with built environment companies to design and build practical AI tools tailored to their workflows, data, and business needs.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="5" y="5" width="26" height="26" rx="4" stroke="#065A82" strokeWidth="2" />
        <path d="M10 18l5 5 11-11" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Drawing, Document & Compliance Workflows",
    desc: "Automate reviews, cross-check technical documents, extract key information, and reduce repetitive manual checking across project deliverables.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M8 10h20" stroke="#065A82" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 18h12" stroke="#065A82" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 26h16" stroke="#065A82" strokeWidth="2" strokeLinecap="round" />
        <circle cx="25" cy="18" r="4" stroke="#F39C12" strokeWidth="2" />
      </svg>
    ),
    title: "Internal Process Automation",
    desc: "Streamline reporting, QA workflows, engineering calculations, document generation, and repetitive internal tasks with custom software and automation.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M7 28V10" stroke="#065A82" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 28V15" stroke="#065A82" strokeWidth="2" strokeLinecap="round" />
        <path d="M27 28V6" stroke="#065A82" strokeWidth="2" strokeLinecap="round" />
        <circle cx="7" cy="10" r="2.5" fill="#F39C12" />
        <circle cx="17" cy="15" r="2.5" fill="#F39C12" />
        <circle cx="27" cy="6" r="2.5" fill="#F39C12" />
      </svg>
    ),
    title: "Data Dashboards & Decision Support",
    desc: "Turn project, asset, and operational data into useful dashboards, reports, and decision-support tools for technical teams and managers.",
  },
];

const solutionExamples = [
  "Reviewing drawings and documents against standards or internal checklists",
  "Extracting key information from specifications, reports, and technical documents",
  "Automating repetitive engineering calculations or report generation",
  "Building internal dashboards for projects, assets, or compliance tracking",
  "Creating custom tools for QA, approvals, and technical workflows",
  "Prototyping digital products for engineering and construction businesses",
];

const processSteps = [
  {
    step: "01",
    title: "Discover",
    desc: "Understand your workflow, bottlenecks, and business goals.",
  },
  {
    step: "02",
    title: "Define",
    desc: "Identify the highest-value use case and shape the right solution.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Develop a practical tool, prototype, or internal system around your process.",
  },
  {
    step: "04",
    title: "Improve",
    desc: "Refine with real user feedback and expand as your team grows.",
  },
];

const proofPoints = [
  { num: "Engineer-led", label: "Built with real industry context" },
  { num: "Custom-fit", label: "Solutions tailored to your workflow" },
  { num: "Practical AI", label: "Focused on operational value" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const email = import.meta.env.VITE_CONTACT_EMAIL || "your-email@example.com";

      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New enquiry from Built Environment AI website",
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
    <div
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        color: COLORS.text,
        background: COLORS.bg,
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap"
        rel="stylesheet"
      />

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
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 76,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/comply-logo.png"
              alt="Built Environment AI logo"
              style={{
                height: 223,
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

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(165deg, ${COLORS.bg} 0%, #EDF2F7 40%, ${COLORS.accentGlow} 100%)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `linear-gradient(${COLORS.accent} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.accent} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "8%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(6,90,130,0.06) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: 860,
            padding: "140px 24px 80px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "7px 18px",
              borderRadius: 999,
              background: COLORS.accentGlow,
              border: `1px solid rgba(6,90,130,0.12)`,
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.accent,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Custom AI · Workflow Automation · Internal Tools · Built Environment
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(38px, 6vw, 66px)",
              fontWeight: 700,
              lineHeight: 1.08,
              margin: "0 0 24px",
              color: COLORS.text,
              letterSpacing: "-1px",
            }}
          >
            Custom AI tools for the{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              built environment
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(17px, 2vw, 20px)",
              lineHeight: 1.75,
              color: COLORS.textMid,
              margin: "0 auto 40px",
              maxWidth: 680,
            }}
          >
            We help engineering, design, construction, and asset-focused teams turn manual
            processes into practical digital tools — from document workflows and QA reviews
            to reporting, dashboards, and internal automation.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <button
              onClick={() => scrollTo("contact")}
              style={{
                padding: "14px 32px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: COLORS.accent,
                color: COLORS.white,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                boxShadow: "0 4px 16px rgba(6,90,130,0.3)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 24px rgba(6,90,130,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 16px rgba(6,90,130,0.3)";
              }}
            >
              Discuss Your Idea
            </button>

            <button
              onClick={() => scrollTo("services")}
              style={{
                padding: "14px 32px",
                borderRadius: 10,
                cursor: "pointer",
                background: "transparent",
                color: COLORS.accent,
                border: `2px solid ${COLORS.accent}`,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = COLORS.accentGlow;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              Explore Services
            </button>
          </div>

          <p
            style={{
              fontSize: 14,
              color: COLORS.textLight,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Built for consultants, contractors, design teams, asset owners, and built
            environment businesses exploring smarter ways to work.
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: 0.4,
          }}
        >
          <div
            style={{
              width: 24,
              height: 38,
              borderRadius: 12,
              border: `2px solid ${COLORS.textMid}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 6,
            }}
          >
            <div
              style={{
                width: 3,
                height: 8,
                borderRadius: 2,
                background: COLORS.textMid,
                animation: "scrollBounce 2s infinite",
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes scrollBounce {
            0%,100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(8px); opacity: 0.3; }
          }
        `}</style>
      </section>

      <section id="services" style={{ padding: "100px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: COLORS.amber,
                  marginBottom: 12,
                }}
              >
                What We Do
              </p>

              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 700,
                  margin: "0 0 16px",
                  letterSpacing: "-0.5px",
                }}
              >
                What we help built environment teams do
              </h2>

              <p
                style={{
                  fontSize: 17,
                  color: COLORS.textMid,
                  maxWidth: 700,
                  margin: "0 auto",
                  lineHeight: 1.75,
                }}
              >
                We partner with companies to identify useful opportunities for AI,
                automation, and custom software — then build practical tools around the
                way their teams actually work.
              </p>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  style={{
                    background: COLORS.cardBg,
                    borderRadius: 18,
                    padding: 32,
                    border: `1px solid ${COLORS.border}`,
                    height: "100%",
                    transition: "all 0.3s ease",
                    cursor: "default",
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
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 14,
                      background: COLORS.accentGlow,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    {s.icon}
                  </div>

                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      margin: "0 0 10px",
                      color: COLORS.text,
                    }}
                  >
                    {s.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: COLORS.textMid,
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 24px", background: COLORS.bg }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: COLORS.amber,
                  marginBottom: 12,
                }}
              >
                Example Problems We Can Help Solve
              </p>

              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 700,
                  margin: "0 0 16px",
                  letterSpacing: "-0.5px",
                }}
              >
                Practical solutions, shaped around your workflow
              </h2>

              <p
                style={{
                  fontSize: 17,
                  color: COLORS.textMid,
                  maxWidth: 760,
                  margin: "0 auto",
                  lineHeight: 1.75,
                }}
              >
                These are examples of the kinds of challenges we can help address. The
                right solution depends on your team, your process, and the problem you are
                trying to solve.
              </p>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {solutionExamples.map((item, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 16,
                    padding: 22,
                  }}
                >
                  <div
                    style={{
                      minWidth: 28,
                      height: 28,
                      borderRadius: 999,
                      background: COLORS.accentGlow,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: COLORS.amber,
                      }}
                    />
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: COLORS.textMid,
                    }}
                  >
                    {item}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: "100px 24px", background: COLORS.sectionAlt }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <FadeIn>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 48,
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: COLORS.amber,
                    marginBottom: 12,
                  }}
                >
                  About
                </p>

                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(28px, 4vw, 42px)",
                    fontWeight: 700,
                    margin: "0 0 20px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Engineering knowledge, applied through AI
                </h2>

                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.9,
                    color: COLORS.textMid,
                    margin: "0 0 16px",
                  }}
                >
                  Built Environment AI was founded by Mohammed Abrar Ahmed, an engineer
                  who has seen firsthand how much time teams across the built environment
                  spend on repetitive reviews, manual cross-checking, disconnected
                  information, and inefficient workflows.
                </p>

                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.9,
                    color: COLORS.textMid,
                    margin: "0 0 24px",
                  }}
                >
                  We work with companies to identify real operational pain points and turn
                  them into practical digital tools — whether that means AI-assisted
                  document review, internal workflow automation, reporting systems,
                  engineering support tools, or custom applications built around your
                  team’s needs.
                </p>

                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.9,
                    color: COLORS.textMid,
                    margin: "0 0 30px",
                  }}
                >
                  Our goal is not to replace technical professionals, but to help them
                  work faster, more consistently, and with better access to the
                  information they need.
                </p>

                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  {proofPoints.map((stat, i) => (
                    <div key={i}>
                      <div
                        style={{
                          fontSize: 26,
                          fontWeight: 700,
                          color: COLORS.accent,
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {stat.num}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.textLight, marginTop: 4 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: COLORS.white,
                  borderRadius: 22,
                  padding: 40,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.accent,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: 24,
                  }}
                >
                  How We Work
                </div>

                {processSteps.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      padding: "16px 0",
                      borderBottom: i < processSteps.length - 1 ? `1px solid ${COLORS.border}` : "none",
                    }}
                  >
                    <div
                      style={{
                        minWidth: 44,
                        height: 44,
                        borderRadius: 12,
                        background: i === processSteps.length - 1 ? COLORS.amber : COLORS.accentGlow,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        color: i === processSteps.length - 1 ? COLORS.white : COLORS.accent,
                      }}
                    >
                      {item.step}
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: COLORS.text,
                          marginBottom: 4,
                        }}
                      >
                        {item.title}
                      </div>
                      <div style={{ fontSize: 14, color: COLORS.textMid, lineHeight: 1.7 }}>
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

      <section id="contact" style={{ padding: "100px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: COLORS.amber,
                  marginBottom: 12,
                }}
              >
                Contact
              </p>

              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 700,
                  margin: "0 0 16px",
                  letterSpacing: "-0.5px",
                }}
              >
                Let’s explore your idea
              </h2>

              <p style={{ fontSize: 16, color: COLORS.textMid, lineHeight: 1.8 }}>
                If your team has a repetitive workflow, a reporting bottleneck, a document
                challenge, or an idea for a useful internal tool, get in touch and let’s
                discuss what could be built.
              </p>
            </div>

            <div
              style={{
                background: COLORS.cardBg,
                borderRadius: 20,
                padding: "40px 36px",
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "#E8F8F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path
                        d="M7 14l5 5L21 9"
                        stroke="#27AE60"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>
                    Message sent
                  </h3>
                  <p style={{ fontSize: 14, color: COLORS.textMid, margin: 0 }}>
                    Thanks — I’ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {[
                    { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                    { label: "Email", key: "email", type: "email", placeholder: "you@company.com" },
                  ].map((field) => (
                    <div key={field.key} style={{ marginBottom: 20 }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: COLORS.text,
                          marginBottom: 8,
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: 10,
                          border: `1.5px solid ${COLORS.border}`,
                          fontSize: 15,
                          fontFamily: "'DM Sans', sans-serif",
                          color: COLORS.text,
                          background: COLORS.sectionAlt,
                          outline: "none",
                          transition: "border-color 0.2s ease",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
                        onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: 24 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: COLORS.text,
                        marginBottom: 8,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      placeholder="Tell me about your workflow, your problem, or the kind of tool you want to explore..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 10,
                        border: `1.5px solid ${COLORS.border}`,
                        fontSize: 15,
                        fontFamily: "'DM Sans', sans-serif",
                        color: COLORS.text,
                        background: COLORS.sectionAlt,
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.2s ease",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
                      onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!formData.name || !formData.email || !formData.message || sending}
                    style={{
                      width: "100%",
                      padding: "14px 0",
                      borderRadius: 10,
                      border: "none",
                      cursor:
                        formData.name && formData.email && formData.message && !sending
                          ? "pointer"
                          : "not-allowed",
                      background:
                        formData.name && formData.email && formData.message
                          ? COLORS.accent
                          : COLORS.border,
                      color: COLORS.white,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      opacity: sending ? 0.7 : 1,
                      boxShadow:
                        formData.name && formData.email && formData.message
                          ? "0 4px 16px rgba(6,90,130,0.3)"
                          : "none",
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
                      e.target.style.boxShadow =
                        formData.name && formData.email && formData.message
                          ? "0 4px 16px rgba(6,90,130,0.3)"
                          : "none";
                    }}
                  >
                    {sending ? "Sending..." : "Send Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <footer
        style={{
          padding: "44px 24px",
          background: COLORS.footerBg,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <img
              src="/comply-logo.png"
              alt="Built Environment AI logo"
              style={{
                height: 225,
                width: "auto",
                objectFit: "contain",
                display: "block",
                filter: "brightness(1.05)",
              }}
            />
          </div>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0 }}>
            Custom AI tools and workflow automation for built environment teams
          </p>

          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              © {new Date().getFullYear()} Built Environment AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}