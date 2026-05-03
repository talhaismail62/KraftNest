import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [bookSuccess, setBookSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Smooth Scroll Helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  // Cursor Glow Effect
  useEffect(() => {
    const glow = document.getElementById('glow');
    const moveGlow = (e) => {
      if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', moveGlow);
    return () => document.removeEventListener('mousemove', moveGlow);
  }, []);

  // Active Nav Highlight & Scroll Reveal
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'services', 'process', 'case-studies', 'testimonials', 'pricing', 'book', 'contact'];
    
    const handleScroll = () => {
      let current = '';
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Scroll reveal observer
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    reveals.forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  // Form Submission Handlers
  // Form Submission Handlers
  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // 1. Gather the data into a neat object
    const bookingData = {
      name: form['book-name'].value,
      email: form['book-email'].value,
      phone: form['book-phone'].value,
      biz: form['book-biz'].value,
      service: form['book-service'].value,
      msg: form['book-msg'].value
    };

    // 2. Send it securely to your Node backend
    try {
      const response = await fetch('http://localhost:5001/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      
      if (response.ok) {
        setBookSuccess(true); // Show the success message on the website
      } else {
        alert('Something went wrong on our end. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to connect to the server. Make sure your backend is running!');
    }
  };

  const handleContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const contactData = {
      name: form['c-name'].value,
      email: form['c-email'].value,
      subject: form['c-subject'].value || 'Website Inquiry',
      msg: form['c-msg'].value
    };

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      
      if (response.ok) {
        setContactSuccess(true);
      } else {
        alert('Something went wrong on our end. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to connect to the server. Make sure your backend is running!');
    }
  };

  return (
    <>
      <div className="cursor-glow" id="glow"></div>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-brand">
          <div className="nav-logo-wrap">
            <img src="/assets/logo.png" alt="KraftNest Logo" width="35" height="35" style={{ display: 'block', objectFit: 'contain' }} />
          </div>
          <div className="brand-text">
            <div className="name">KraftNest</div>
            <div className="sub">Automations</div>
          </div>
        </a>
        <div className="nav-links">
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
          <a href="#services" className={activeSection === 'services' ? 'active' : ''}>Services</a>
          <a href="#process" className={activeSection === 'process' ? 'active' : ''}>How It Works</a>
          <a href="#case-studies" className={activeSection === 'case-studies' ? 'active' : ''}>Case Studies</a>
          <a href="#pricing" className={activeSection === 'pricing' ? 'active' : ''}>Pricing</a>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </div>
        <div className="nav-right">
          <a href="#contact" className="nav-btn outline">Contact</a>
          <button className="nav-btn solid" onClick={() => scrollToSection('book')}>Book Free Audit</button>
        </div>
        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} id="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
        <a href="#process" onClick={() => setIsMenuOpen(false)}>How It Works</a>
        <a href="#case-studies" onClick={() => setIsMenuOpen(false)}>Case Studies</a>
        <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        <a href="#book" onClick={() => setIsMenuOpen(false)} className="mobile-menu-cta">Book Free Audit →</a>
      </div>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-tag"><span className="hero-tag-dot"></span>AI Automation Agency</div>
        <h1>Your Business Should Run<br /><span style={{ color: 'var(--cyan)' }}>Without You</span> In The Room.</h1>
        <p className="hero-sub">We build AI automation systems that capture every lead, eliminate manual work, and scale your business — so you can focus on growth, not grinding.</p>
        <div className="hero-ctas">
          <button className="cta-main" onClick={() => scrollToSection('book')}>Get Free Automation Audit →</button>
          <button className="cta-ghost" onClick={() => scrollToSection('services')}>See What We Build</button>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-n">1000+</div><div className="stat-l">Hours Saved</div></div>
          <div className="stat"><div className="stat-n">300+</div><div className="stat-l">Businesses Helped</div></div>
          <div className="stat"><div className="stat-n">3-10×</div><div className="stat-l">Growth Accelerated</div></div>
          <div className="stat"><div className="stat-n">24/7</div><div className="stat-l">Systems Running</div></div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          <span className="ticker-item"><span className="ticker-dot"></span>AI Lead Capture</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Workflow Automation</span>
          <span className="ticker-item"><span className="ticker-dot"></span>CRM Integration</span>
          <span className="ticker-item"><span className="ticker-dot"></span>WhatsApp Automation</span>
          <span className="ticker-item"><span className="ticker-dot"></span>AI Chatbots</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Voice Agents</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Dashboard Systems</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Task Automation</span>
          <span className="ticker-item"><span className="ticker-dot"></span>API Integration</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Outreach Automation</span>
          <span className="ticker-item"><span className="ticker-dot"></span>AI Lead Capture</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Workflow Automation</span>
          <span className="ticker-item"><span className="ticker-dot"></span>CRM Integration</span>
          <span className="ticker-item"><span className="ticker-dot"></span>WhatsApp Automation</span>
          <span className="ticker-item"><span className="ticker-dot"></span>AI Chatbots</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Voice Agents</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Dashboard Systems</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Task Automation</span>
          <span className="ticker-item"><span className="ticker-dot"></span>API Integration</span>
          <span className="ticker-item"><span className="ticker-dot"></span>Outreach Automation</span>
        </div>
      </div>

      {/* PROBLEMS BANNER */}
      <div className="problems-wrap reveal">
        <div className="problems-inner">
          <div className="section-eyebrow">Problems We See Every Day</div>
          <div className="section-title">Are You <span style={{ color: 'var(--cyan)' }}>Losing</span> Because of These?</div>
          <div className="section-sub">These are the silent killers of your business growth — and most owners don't even notice them.</div>
          <div className="problems-grid">
            <div className="prob-card">
              <div className="prob-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg></div>
              <div className="prob-title">Manual & Repetitive Tasks</div>
              <div className="prob-desc">Wasting hours on work that should be automated</div>
            </div>
            <div className="prob-card">
              <div className="prob-icon"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /><line x1="2" y1="2" x2="22" y2="22" /></svg></div>
              <div className="prob-title">Disconnected Systems</div>
              <div className="prob-desc">Tools that don't talk to each other create chaos</div>
            </div>
            <div className="prob-card">
              <div className="prob-icon"><svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" /></svg></div>
              <div className="prob-title">No Real-Time Insights</div>
              <div className="prob-desc">Decisions made without data are expensive</div>
            </div>
            <div className="prob-card">
              <div className="prob-icon"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /><line x1="18" y1="8" x2="23" y2="13" /><line x1="23" y1="8" x2="18" y2="13" /></svg></div>
              <div className="prob-title">Missed Leads & Follow-Ups</div>
              <div className="prob-desc">Opportunities slip away without proper systems</div>
            </div>
            <div className="prob-card">
              <div className="prob-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg></div>
              <div className="prob-title">Scaling Becomes Impossible</div>
              <div className="prob-desc">Growth breaks when systems don't exist</div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" className="about-wrap reveal">
        <div className="about-inner">
          <div className="section-eyebrow">Why We Built KraftNest</div>
          <div className="section-title">Built <span style={{ color: 'var(--cyan)' }}>For You.</span> Not For Tech.</div>
          <div className="section-sub">We're not a SaaS tool. We're a team that builds AI automation systems specifically tailored to how your business actually runs.</div>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-num">01</div>
              <div className="about-card-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg></div>
              <div className="about-card-title">We saw <span style={{ color: 'var(--cyan)' }}>good businesses fail</span> — not from lack of effort.</div>
              <div className="about-card-body">Talented owners working 12-hour days, buried in WhatsApp chats, spreadsheets, and manual tasks. They weren't failing because they weren't good enough. They had no system.</div>
            </div>
            <div className="about-card">
              <div className="about-card-num">02</div>
              <div className="about-card-icon"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /><line x1="18" y1="8" x2="23" y2="13" /><line x1="23" y1="8" x2="18" y2="13" /></svg></div>
              <div className="about-card-title">You shouldn't be the <span style={{ color: 'var(--cyan)' }}>bottleneck</span> of your own business.</div>
              <div className="about-card-body">If your business stops when you stop, you don't have a business — you have a job. We build the infrastructure so it runs with or without you in the room.</div>
            </div>
            <div className="about-card">
              <div className="about-card-num">03</div>
              <div className="about-card-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></div>
              <div className="about-card-title">We built <span style={{ color: 'var(--cyan)' }}>KraftNest</span> to change that.</div>
              <div className="about-card-body">AI-powered systems that handle the repetitive, the follow-ups, and the chaos — so you can focus on growth, not grinding. This is automation built for real businesses.</div>
            </div>
          </div>
          <div className="about-stats">
            <div className="about-stat"><div className="about-stat-n">1000+</div><div className="about-stat-label">Hours Saved</div><div className="about-stat-sub">On manual, repetitive work</div></div>
            <div className="about-stat"><div className="about-stat-n">300+</div><div className="about-stat-label">Businesses Helped</div><div className="about-stat-sub">Across different industries</div></div>
            <div className="about-stat"><div className="about-stat-n">3-10×</div><div className="about-stat-label">Growth Accelerated</div><div className="about-stat-sub">With smart automation</div></div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div id="services" className="section reveal">
        <div className="section-eyebrow">Services We Offer</div>
        <div className="section-title">Every Problem<br />Has a System. <span style={{ color: 'var(--cyan)' }}>We Build It.</span></div>
        <div className="section-sub">From disconnected tools to missed leads — we design and deploy the exact automation your business needs.</div>
        <div className="services-grid">
          <div className="svc">
            <div className="svc-num">01</div>
            <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .9h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.7A2 2 0 0122 16.92z" /></svg></div>
            <div className="svc-title">AI Lead System</div>
            <div className="svc-desc">Automated Lead Capture & Instant Follow-Up. Never miss a lead again — our AI qualifies, scores, and follows up with every incoming lead within seconds, 24/7, across every channel.</div>
          </div>
          <div className="svc">
            <div className="svc-num">02</div>
            <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg></div>
            <div className="svc-title">Workflow Automation</div>
            <div className="svc-desc">Smart Workflows That Replace Manual Chaos. Stop copy-pasting between tools. We build end-to-end automation connecting your WhatsApp, spreadsheets, CRM, and every tool you use.</div>
          </div>
          <div className="svc">
            <div className="svc-num">03</div>
            <div className="svc-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
            <div className="svc-title">Task Automation</div>
            <div className="svc-desc">Automate Repetitive Tasks & Save 10+ Hours/Week. From order status updates to team task assignments — everything eating your team's time gets automated and runs on its own.</div>
          </div>
          <div className="svc">
            <div className="svc-num">04</div>
            <div className="svc-icon"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></div>
            <div className="svc-title">Dashboard Systems</div>
            <div className="svc-desc">Real-Time Dashboards for Smarter Decisions. No more guessing. Get full visibility on your leads, revenue, pipeline, and performance in one central dashboard that updates automatically.</div>
          </div>
          <div className="svc">
            <div className="svc-num">05</div>
            <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg></div>
            <div className="svc-title">CRM & Nurturing</div>
            <div className="svc-desc">Pipeline Management & Automated Follow-Ups. Leads go cold because nobody follows up. Our CRM systems and automated nurture sequences keep every deal moving forward.</div>
          </div>
          <div className="svc">
            <div className="svc-num">06</div>
            <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg></div>
            <div className="svc-title">Integration Systems</div>
            <div className="svc-desc">All Your Tools. Connected. All Your Data. Synced. Facebook, WhatsApp, Excel, your website, your CRM — we build the bridges that make your entire tech stack work as one.</div>
          </div>
          <div className="svc">
            <div className="svc-num">07</div>
            <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg></div>
            <div className="svc-title">AI Chatbots (Web & WhatsApp)</div>
            <div className="svc-desc">Deploy intelligent AI chatbots on your website or WhatsApp that handle customer queries, qualify leads, book appointments, and close deals — without a human in the loop.</div>
          </div>
          <div className="svc">
            <div className="svc-num">08</div>
            <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg></div>
            <div className="svc-title">AI Voice Agents</div>
            <div className="svc-desc">AI-powered voice bots that make and receive calls, follow up with prospects, confirm appointments, and handle inbound support — running 24/7 at a fraction of human cost.</div>
          </div>
          <div className="svc">
            <div className="svc-num">09</div>
            <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
            <div className="svc-title">Outreach Automation</div>
            <div className="svc-desc">AI-personalised email and LinkedIn sequences that book meetings on autopilot — targeting the right prospects with the right message at the right time, automatically.</div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="process" className="process-wrap reveal">
        <div className="process-inner">
          <div className="section-eyebrow">How It Works</div>
          <div className="section-title">From Idea to Live System<br />in Days, Not Months</div>
          <div className="process-grid">
            <div className="steps-list">
              <div className="step-item">
                <div className="step-n">01</div>
                <div className="step-body">
                  <div className="step-title">Audit — Free 30-Min Call</div>
                  <div className="step-desc">We break down your current workflow, map every bottleneck, and identify exactly where you're losing time, money, and leads. 100% free — no commitment needed.</div>
                </div>
              </div>
              <div className="step-item">
                <div className="step-n">02</div>
                <div className="step-body">
                  <div className="step-title">System Design & Blueprint</div>
                  <div className="step-desc">We architect your custom automation blueprint — tools, triggers, AI models, integrations, and data flows. You approve every detail before we build a single thing.</div>
                </div>
              </div>
              <div className="step-item">
                <div className="step-n">03</div>
                <div className="step-body">
                  <div className="step-title">Build & QA Testing</div>
                  <div className="step-desc">Every workflow is built and stress-tested before touching your live data. We run QA on every edge case and loop you in for review at each stage.</div>
                </div>
              </div>
              <div className="step-item">
                <div className="step-n">04</div>
                <div className="step-body">
                  <div className="step-title">Launch, Train & Scale</div>
                  <div className="step-desc">We deploy, document everything, train your team, and stay on for ongoing support so your systems keep growing and improving as your business scales.</div>
                </div>
              </div>
            </div>
            <div className="flow-visual">
              <div className="flow-header">Live Automation Example — Lead Pipeline</div>
              <div className="flow-node active"><span>📋</span> Lead comes in via WhatsApp/Web<div className="flow-tag">Trigger</div></div>
              <div className="flow-connector"></div>
              <div className="flow-node active"><span>🤖</span> AI qualifies & scores instantly<div className="flow-tag">AI Layer</div></div>
              <div className="flow-connector"></div>
              <div className="flow-node active"><span>📬</span> Personalised follow-up sent<div className="flow-tag">Action</div></div>
              <div className="flow-connector"></div>
              <div className="flow-node active"><span>📊</span> CRM & pipeline auto-updated<div className="flow-tag">Sync</div></div>
              <div className="flow-connector"></div>
              <div className="flow-node active"><span>📅</span> Meeting booked automatically<div className="flow-tag">Book</div></div>
              <div className="flow-connector"></div>
              <div className="flow-node muted"><span>✅</span> Team notified via Slack/WhatsApp<div className="flow-tag">Notify</div></div>
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '0.5px solid rgba(255,255,255,0.05)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}>Zero human clicks. Runs 24/7. Every single time.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CASE STUDIES */}
      <div id="case-studies" className="section reveal">
        <div className="section-eyebrow">Case Studies</div>
        <div className="section-title">Real Results.<br />Real Businesses.</div>
        <div className="section-sub">Every day without a system is a day your competitors pull ahead.</div>
        <div className="cases-grid">
          <div className="case-card">
            <div className="case-visual blue">
              <div className="case-visual-grid"></div>
              <div className="case-metric"><span>−</span>80%</div>
            </div>
            <div className="case-body">
              <div className="case-tag">Real Estate / Operations</div>
              <div className="case-title">Client onboarding cut from 3 days to 4 hours</div>
              <div className="case-desc">A real estate agency was spending 6+ hours manually onboarding each new client. We built a full onboarding AI agent — document collection, verification, CRM entry, and welcome sequences — all automated. The team now spends under 30 minutes per client.</div>
            </div>
          </div>
          <div className="cases-side">
            <div className="case-mini">
              <div className="mini-metric">3×</div>
              <div className="mini-title">Sales Calls Tripled — Digital Marketing Agency</div>
              <div className="mini-desc">AI outreach sequences over email and WhatsApp tripled booked discovery calls in 30 days with zero extra headcount.</div>
            </div>
            <div className="case-mini">
              <div className="mini-metric">10hrs</div>
              <div className="mini-title">10 Hours/Week Saved — E-Commerce Store</div>
              <div className="mini-desc">Manual order updates, customer follow-ups, and inventory alerts all automated. Owner reclaimed 10+ hours every single week.</div>
            </div>
            <div className="case-mini">
              <div className="mini-metric">90%</div>
              <div className="mini-title">Support Queries Handled by AI — SaaS Company</div>
              <div className="mini-desc">AI chatbot on website + WhatsApp handles 90% of incoming support tickets 24/7 at zero marginal cost per ticket.</div>
            </div>
          </div>
        </div>
        <div className="cases-row2">
          <div className="case-mini">
            <div className="mini-metric">+40%</div>
            <div className="mini-title">Lead Conversion Up 40% — Coaching Business</div>
            <div className="mini-desc">Every lead coming in at night or on weekends now gets an instant personalised response. No more cold leads from slow replies.</div>
          </div>
          <div className="case-mini">
            <div className="mini-metric">2wks</div>
            <div className="mini-title">Full CRM Built in 2 Weeks — Recruitment Firm</div>
            <div className="mini-desc">Disconnected tools replaced by one unified CRM with automated candidate pipelines, follow-ups, and team task assignments.</div>
          </div>
          <div className="case-mini">
            <div className="mini-metric">$0</div>
            <div className="mini-title">24/7 Support at Zero Marginal Cost — Logistics Co.</div>
            <div className="mini-desc">AI voice agent handles inbound calls, confirms shipments, and escalates only when necessary — fully autonomous around the clock.</div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div id="testimonials" className="testi-section reveal">
        <div className="testi-inner">
          <div className="section-eyebrow">Client Results</div>
          <div className="section-title">What Our Clients Say</div>
          <div className="testi-grid">
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <div className="testi-text">"KraftNest cut our onboarding time from 3 days to 4 hours. The AI agent they built handles 80% of client questions on its own. Best investment we made this year."</div>
              <div className="testi-author"><div className="av">SR</div><div><div className="auth-name">Sarah Rahman</div><div className="auth-role">CEO — USA</div></div></div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <div className="testi-text">"We were manually entering data 4 hours a day. Now it's fully automated. KraftNest literally gave us back a full working day, every single week."</div>
              <div className="testi-author"><div className="av">MA</div><div><div className="auth-name">Michael Asif</div><div className="auth-role">Operations Lead — UK</div></div></div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <div className="testi-text">"Our outreach automation now books 3× more calls with zero extra effort. The team understood our business immediately and delivered ahead of schedule."</div>
              <div className="testi-author"><div className="av">LK</div><div><div className="auth-name">Layla Khan</div><div className="auth-role">Founder — Canada</div></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" className="section reveal">
        <div className="section-eyebrow">Pricing</div>
        <div className="section-title">Simple, Transparent Pricing.<br />No Surprises.</div>
        <div className="section-sub">Every plan includes a free discovery call. We only charge when we're confident we can deliver real ROI.</div>
        <div className="pricing-grid">
          <div className="price-card">
            <div className="price-label">Starter</div>
            <div className="price-amount">$999<span>/project</span></div>
            <div className="price-desc">Perfect for small businesses starting with automation</div>
            <hr className="price-divider" />
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>1 core automation workflow</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>AI chatbot (website or WhatsApp)</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>2 tool integrations</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>30-day post-launch support</div>
            <button className="price-btn outline" onClick={() => scrollToSection('book')}>Get Started</button>
          </div>
          <div className="price-card featured">
            <div className="price-label">Growth</div>
            <div className="price-amount">$2,499<span>/project</span></div>
            <div className="price-desc">For scaling businesses that need a full automation system</div>
            <hr className="price-divider" />
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>Up to 5 automation workflows</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>AI agent + voice bot</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>Full CRM + tool integration</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>Custom web development</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>90-day support & maintenance</div>
            <button className="price-btn filled" onClick={() => scrollToSection('book')}>Most Popular — Start Now</button>
          </div>
          <div className="price-card">
            <div className="price-label">Enterprise</div>
            <div className="price-amount">Custom</div>
            <div className="price-desc">Full-scale automation infrastructure for established businesses</div>
            <hr className="price-divider" />
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>Unlimited workflows & agents</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>Dedicated project manager</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>Priority build & deployment</div>
            <div className="price-feature"><div className="price-check"><svg viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" /></svg></div>Ongoing retainer support</div>
            <button className="price-btn outline" onClick={() => window.location.href = 'mailto:kraftnestco@gmail.com?subject=Enterprise Inquiry'}>Talk to Us</button>
          </div>
        </div>
      </div>

      {/* BOOK A CALL */}
      <div id="book" className="book-wrap reveal">
        <div className="book-inner">
          <div className="section-eyebrow">Book a Free Call</div>
          <div className="section-title">Get Your Free<br /><span style={{ color: 'var(--cyan)' }}>Automation Audit</span></div>
          <div className="section-sub">See exactly where you're losing time, leads, and money. No templates. No guesswork. Built specifically for your business.</div>
          <div className="book-layout">
            <div className="book-left">
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.5rem', marginTop: '2rem' }}>What you get in the call:</div>
              <div className="book-perks">
                <div className="book-perk">
                  <div className="book-perk-icon"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></div>
                  <div className="book-perk-text">
                    <div className="book-perk-title">Workflow Audit</div>
                    <div className="book-perk-sub">We map where you're losing time and money right now</div>
                  </div>
                </div>
                <div className="book-perk">
                  <div className="book-perk-icon"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg></div>
                  <div className="book-perk-text">
                    <div className="book-perk-title">Custom Action Plan</div>
                    <div className="book-perk-sub">A clear automation roadmap specific to your business</div>
                  </div>
                </div>
                <div className="book-perk">
                  <div className="book-perk-icon"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg></div>
                  <div className="book-perk-text">
                    <div className="book-perk-title">ROI Estimate</div>
                    <div className="book-perk-sub">Exact hours and revenue you can recover with automation</div>
                  </div>
                </div>
                <div className="book-perk">
                  <div className="book-perk-icon"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg></div>
                  <div className="book-perk-text">
                    <div className="book-perk-title">Zero Commitment</div>
                    <div className="book-perk-sub">No pressure. No fluff. Just clear, honest advice.</div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'var(--cyan-dim)', border: '0.5px solid var(--cyan-border)', borderRadius: '6px', fontSize: '12px', color: 'var(--cyan)', fontFamily: "'Syne', sans-serif", letterSpacing: '0.5px', lineHeight: '1.6' }}>
                → DM <strong>"SYSTEM"</strong> on WhatsApp or Instagram for fastest response.<br />
                <span style={{ color: '#555', fontSize: '11px', marginTop: '4px', display: 'block' }}>Or fill the form and we'll reach out within 24 hours.</span>
              </div>
            </div>
            <div className="book-form-wrap">
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: '700', letterSpacing: '0.3px', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>Request Your Free Audit</div>
              
              {!bookSuccess ? (
                <form className="book-form" id="bookForm" onSubmit={handleBooking}>
                  <div className="form-row">
                    <input type="text" placeholder="Your Name *" required id="book-name" />
                    <input type="email" placeholder="Email Address *" required id="book-email" />
                  </div>
                  <div className="form-row">
                    <input type="tel" placeholder="WhatsApp / Phone" id="book-phone" />
                    <input type="text" placeholder="Business Name" id="book-biz" />
                  </div>
                  <select id="book-service">
                    <option value="">What do you need help with?</option>
                    <option>AI Lead System & Follow-Up</option>
                    <option>Workflow Automation</option>
                    <option>CRM & Pipeline Setup</option>
                    <option>Dashboard Systems</option>
                    <option>AI Chatbot (Web/WhatsApp)</option>
                    <option>AI Voice Agent</option>
                    <option>Full Business Automation Audit</option>
                    <option>Not Sure — Need Advice</option>
                  </select>
                  <textarea placeholder="Briefly describe your biggest operational challenge..." id="book-msg" rows="4"></textarea>
                  <button type="submit" className="cta-main" style={{ width: '100%', fontSize: '12px', padding: '15px' }}>Send Request — We'll Reach Out Within 24 Hours →</button>
                  <div style={{ fontSize: '11px', color: '#444', textAlign: 'center', letterSpacing: '0.3px' }}>No commitment. No spam. Just a clear automation roadmap.</div>
                </form>
              ) : (
                <div className="success-msg" id="bookSuccess" style={{ display: 'block' }}>
                  <span className="check">✓</span>
                  Request received!<br />We'll reach out within 24 hours.<br />
                  <span style={{ fontSize: '12px', color: '#555', fontFamily: "'DM Sans', sans-serif", fontWeight: '300' }}>Check your email — and WhatsApp us "SYSTEM" for fastest response.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" className="section reveal">
        <div className="section-eyebrow">Get In Touch</div>
        <div className="section-title">Let's Talk About<br />Your Business.</div>
        <div className="section-sub">Whether you have a specific project in mind or just want to understand what's possible — we're happy to chat.</div>
        <div className="contact-grid">
          <div className="contact-info-cards">
            <div className="contact-card">
              <div className="contact-card-label">📧 Email Us</div>
              <div className="contact-card-value"><a href="mailto:kraftnestco@gmail.com">kraftnestco@gmail.com</a></div>
              <div className="contact-card-sub">We respond within 24 hours, Mon–Sat.</div>
            </div>
            <div className="contact-card">
              <div className="contact-card-label">💬 WhatsApp / Instagram</div>
              <div className="contact-card-value">DM "SYSTEM" to start</div>
              <div className="contact-card-sub">Fastest way to reach us. We typically reply within a few hours.</div>
            </div>
            <div className="contact-card">
              <div className="contact-card-label">🌐 Website</div>
              <div className="contact-card-value"><a href="https://kraftnest.co" target="_blank" rel="noreferrer">kraftnest.co</a></div>
              <div className="contact-card-sub">Book a free audit directly from the website.</div>
            </div>
            <div className="contact-card" style={{ background: 'var(--cyan-dim)', borderColor: 'var(--cyan-border)' }}>
              <div className="contact-card-label" style={{ color: 'var(--cyan)' }}>⚡ Ready to automate?</div>
              <div className="contact-card-value" style={{ fontSize: '13px', color: '#aaa', fontWeight: '300', lineHeight: '1.7' }}>Skip the form — book a free 30-min call and we'll map out exactly what your business needs.</div>
              <button onClick={() => scrollToSection('book')} className="cta-main" style={{ width: '100%', marginTop: '1rem', fontSize: '11px', padding: '11px' }}>Book Free Audit →</button>
            </div>
          </div>
          <div className="contact-form-wrap">
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: '700', letterSpacing: '0.3px', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>Send Us a Message</div>
            
            {!contactSuccess ? (
              <form className="contact-form" id="contactForm" onSubmit={handleContact}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input type="text" placeholder="Your Name *" required id="c-name" />
                  <input type="email" placeholder="Email Address *" required id="c-email" />
                </div>
                <input type="text" placeholder="Subject" id="c-subject" />
                <textarea placeholder="Your message..." rows="6" required id="c-msg"></textarea>
                <button type="submit" className="cta-main" style={{ width: '100%' }}>Send Message →</button>
              </form>
            ) : (
              <div className="success-msg" id="contactSuccess" style={{ display: 'block' }}>
                <span className="check">✓</span>
                Message sent!<br />We'll reply within 24 hours.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <div className="cta-banner-bg"></div>
        <div className="cta-banner-grid"></div>
        <div className="cta-inner">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Ready to Automate?</div>
          <div className="cta-title">Stop Doing Manually<br />What AI Can Do <span style={{ color: 'var(--cyan)' }}>Instantly.</span></div>
          <div className="cta-sub">Book a free 30-minute automation audit. We'll show you exactly where you're losing time, money, and workforce — and how KraftNest gets it back.</div>
          <div className="cta-ctas">
            <button className="cta-main" onClick={() => scrollToSection('book')}>Book Free Audit Call →</button>
            <button className="cta-ghost" onClick={() => scrollToSection('pricing')}>View Pricing</button>
          </div>
          <div className="cta-note">No commitment. No fluff. Just a clear automation roadmap for your business.</div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="name">KraftNest</div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--cyan)', opacity: '0.7', textTransform: 'uppercase', fontFamily: "'Syne', sans-serif" }}>Automations</div>
            <div className="tagline">We build AI automation systems that help businesses scale with less manual work and more intelligence.</div>
            <div style={{ marginTop: '1rem', fontSize: '11px', color: '#444' }}>
              <a href="mailto:kraftnestco@gmail.com" style={{ color: 'var(--cyan)', textDecoration: 'none', opacity: '0.8' }}>kraftnestco@gmail.com</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <a className="footer-link" href="#services">AI Lead System</a>
            <a className="footer-link" href="#services">Workflow Automation</a>
            <a className="footer-link" href="#services">CRM & Nurturing</a>
            <a className="footer-link" href="#services">Dashboard Systems</a>
            <a className="footer-link" href="#services">AI Chatbots</a>
            <a className="footer-link" href="#services">Voice Agents</a>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <a className="footer-link" href="#about">About Us</a>
            <a className="footer-link" href="#case-studies">Case Studies</a>
            <a className="footer-link" href="#pricing">Pricing</a>
            <a className="footer-link" href="#book">Book a Call</a>
            <a className="footer-link" href="#contact">Contact</a>
          </div>
          <div>
            <div className="footer-col-title">Connect</div>
            <a className="footer-link" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="footer-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a className="footer-link" href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a>
            <a className="footer-link" href="mailto:kraftnestco@gmail.com">kraftnestco@gmail.com</a>
            <a className="footer-link" href="https://kraftnest.co" target="_blank" rel="noreferrer">kraftnest.co</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 KraftNest Automations. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ fontSize: '11px', color: 'var(--subtle)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '11px', color: 'var(--subtle)', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;