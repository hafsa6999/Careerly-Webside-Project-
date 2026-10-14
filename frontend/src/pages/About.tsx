import {
  Target,
  Heart,
  TrendingUp,
  Users,
  BriefcaseBusiness,
  ArrowUpRight,
  Lightbulb,
  Handshake,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

const values = [
  {
    icon: Heart,
    title: "People First",
    description:
      "We put people at the center of every opportunity and help job seekers find work that matters.",
    color: "pink",
  },
  {
    icon: Lightbulb,
    title: "Keep Growing",
    description:
      "We believe every career is a journey of learning, discovery, and continuous improvement.",
    color: "yellow",
  },
  {
    icon: Handshake,
    title: "Build Connections",
    description:
      "We bring talented people and great companies together to create meaningful possibilities.",
    color: "blue",
  },
  {
    icon: Rocket,
    title: "Make an Impact",
    description:
      "We help people take the next step toward their goals and build a future they are proud of.",
    color: "green",
  },
];

const stats = [
  { number: "10K+", label: "Job opportunities", icon: BriefcaseBusiness },
  { number: "5K+", label: "Partner companies", icon: Users },
  { number: "50K+", label: "Career journeys", icon: TrendingUp },
];

function About() {
  return (
    <div className="app about-page">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <span className="about-eyebrow">
              <span className="about-eyebrow-dot" />
              ABOUT CAREERLY
            </span>

            <h1>
              Building better
              <br />
              careers, <span>together.</span>
            </h1>

            <p className="about-hero-description">
              Your next opportunity could change everything. Careerly connects
              ambitious people with meaningful work and companies where they
              can thrive.
            </p>

            <div className="about-hero-actions">
              <Link to="/jobs" className="about-primary-button">
                Explore Jobs
                <ArrowUpRight size={19} />
              </Link>

              <a href="#our-mission" className="about-secondary-button">
                Discover our mission
              </a>
            </div>

            <div className="about-trust-note">
              <div className="about-trust-icon">
                <CheckCircle2 size={18} />
              </div>
              <span>Helping people move forward in their careers.</span>
            </div>
          </div>

          <div className="about-hero-visual">
            <div className="about-visual-glow" />

            <div className="about-visual-card about-visual-card-main">
              <div className="about-illustration-top">
                <div className="about-illustration-logo">
                  <BriefcaseBusiness size={23} />
                </div>
                <span className="about-illustration-tag">YOUR NEXT CHAPTER</span>
              </div>

              <h3>Find work that moves you forward.</h3>
              <p>
                Discover opportunities that match your ambitions and your
                potential.
              </p>

              <div className="about-illustration-progress">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="about-illustration-footer">
                <div>
                  <strong>New possibilities</strong>
                  <span>Start with one step</span>
                </div>
                <div className="about-illustration-arrow">
                  <ArrowUpRight size={21} />
                </div>
              </div>
            </div>

            <div className="about-floating-card about-floating-top">
              <div className="about-floating-icon">
                <Target size={21} />
              </div>
              <div>
                <strong>Find your direction</strong>
                <span>Build your future</span>
              </div>
            </div>

            <div className="about-floating-card about-floating-bottom">
              <div className="about-floating-icon about-floating-icon-light">
                <Users size={21} />
              </div>
              <div>
                <strong>Better together</strong>
                <span>People. Purpose. Progress.</span>
              </div>
            </div>

            <div className="about-decorative-dot about-dot-one" />
            <div className="about-decorative-dot about-dot-two" />
          </div>
        </section>

        {/* Statistics */}
        <section className="about-stats-section" aria-label="Our impact">
          <div className="about-stats-heading">
            <span>CAREERLY BY THE NUMBERS</span>
            <h2>Opportunities that open doors.</h2>
          </div>

          <div className="about-stats-grid">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="about-stat-card" key={stat.label}>
                  <div className="about-stat-icon">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3>{stat.number}</h3>
                    <p>{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="about-stats-note">
            Our vision is to make career opportunities more accessible to
            everyone.
          </p>
        </section>

        {/* Mission Section */}
        <section className="about-mission-section" id="our-mission">
          <div className="about-mission-visual">
            <div className="about-mission-icon-wrap">
              <Target size={48} strokeWidth={1.5} />
            </div>
            <div className="about-mission-orbit about-orbit-one" />
            <div className="about-mission-orbit about-orbit-two" />
            <span className="about-mission-label">PURPOSE WITH PROGRESS</span>
          </div>

          <div className="about-mission-content">
            <span className="about-section-eyebrow">OUR MISSION</span>
            <h2>
              Work should be more than a job. It should be a <span>future.</span>
            </h2>
            <p>
              We created Careerly to make the search for meaningful work
              simpler, more transparent, and more empowering. Everyone deserves
              the chance to discover their strengths, find the right
              opportunity, and grow with confidence.
            </p>
            <p>
              By connecting job seekers with employers, we aim to turn career
              goals into real possibilities.
            </p>

            <Link to="/jobs" className="about-text-link">
              Find your next opportunity
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values-section">
          <div className="about-section-heading">
            <span className="about-section-eyebrow">WHAT GUIDES US</span>
            <h2>Our values move us forward.</h2>
            <p>
              The principles behind every connection, every opportunity, and
              every step toward a better career.
            </p>
          </div>

          <div className="about-values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <article className="about-value-card" key={value.title}>
                  <div
                    className={`about-value-icon about-value-icon-${value.color}`}
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <span className="about-value-number">
                    0{index + 1}
                  </span>

                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="about-cta-section">
          <div className="about-cta-decoration about-cta-decoration-one" />
          <div className="about-cta-decoration about-cta-decoration-two" />

          <div className="about-cta-content">
            <span className="about-cta-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
            <h2>Ready to make your next move?</h2>
            <p>
              Your skills, your ambitions, your future. Discover where they
              can take you with Careerly.
            </p>

            <Link to="/jobs" className="about-cta-button">
              Explore Jobs
              <ArrowUpRight size={19} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;