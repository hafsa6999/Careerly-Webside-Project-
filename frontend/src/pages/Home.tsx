import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
  Heart,
} from "lucide-react";
import Navbar from "../components/Navbar";
import "../App.css";

type JobCardProps = {
  company: string;
  title: string;
  location: string;
  salary: string;
  id: string;
};

function Home() {
  const featuredJobs: JobCardProps[] = [
    {
      id: "1",
      company: "TechNova",
      title: "Frontend Developer",
      location: "Lahore, Pakistan",
      salary: "PKR 120k–180k/month",
    },
    {
      id: "2",
      company: "PixelCraft",
      title: "UI/UX Designer",
      location: "Remote",
      salary: "PKR 100k–160k/month",
    },
    {
      id: "3",
      company: "CodeNest",
      title: "Junior React Developer",
      location: "Karachi, Pakistan",
      salary: "PKR 70k–110k/month",
    },
    {
      id: "5",
      company: "CloudBridge",
      title: "Backend Developer",
      location: "Remote",
      salary: "PKR 150k–250k/month",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="hero" id="home">
          <div className="container hero-content">
            <div className="hero-text">
              <div className="badge">
                <span className="badge-dot" />
                Your next opportunity awaits
              </div>

              <h1>
                Find Your Next <span>Opportunity</span>
              </h1>

              <p>
                Discover amazing jobs, build your career, and connect
                with companies that value your skills.
              </p>

              <form
                className="search-box"
                onSubmit={(event) => {
                  event.preventDefault();
                  window.location.href = "/jobs";
                }}
              >
                <div className="search-field">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Job title, skills, or company"
                    aria-label="Job title, skills, or company"
                  />
                </div>

                <div className="search-field">
                  <MapPin size={20} />
                  <input
                    type="text"
                    placeholder="Location"
                    aria-label="Location"
                  />
                </div>

                <button type="submit" className="search-btn">
                  Search
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="popular">
                <strong>Popular:</strong>
                <Link to="/jobs">Frontend Developer</Link>
                <Link to="/jobs">UI/UX Designer</Link>
                <Link to="/jobs">Marketing</Link>
              </div>
            </div>

            {/* Hero visual */}
            <div className="hero-visual" aria-hidden="true">
              <div className="hero-circle" />

              <div className="career-card">
                <div className="card-top">
                  <div className="avatar">JD</div>

                  <div>
                    <strong>John Doe</strong>
                    <small>Software Developer</small>
                  </div>
                </div>

                <div className="profile-line" />

                <div className="mini-stats">
                  <div>
                    <strong>24</strong>
                    <small>Applications</small>
                  </div>

                  <div>
                    <strong>12</strong>
                    <small>Saved Jobs</small>
                  </div>

                  <div>
                    <strong>8</strong>
                    <small>Interviews</small>
                  </div>
                </div>

                <div className="career-progress">
                  <div className="progress-header">
                    <span>Career Progress</span>
                    <strong>78%</strong>
                  </div>

                  <div className="progress-bar">
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="stats-section">
          <div className="container stats">
            <div className="stat">
              <div className="stat-icon">
                <Briefcase size={21} />
              </div>
              <div>
                <strong>10,000+</strong>
                <span>Active Jobs</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon">
                <Briefcase size={21} />
              </div>
              <div>
                <strong>2,500+</strong>
                <span>Top Companies</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon">♙</div>
              <div>
                <strong>500,000+</strong>
                <span>Job Seekers</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon">★</div>
              <div>
                <strong>4.8/5</strong>
                <span>User Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="jobs-section" id="jobs">
          <div className="container">
            <div className="section-heading">
              <div>
                <span>FEATURED JOBS</span>
                <h2>Find Your Dream Job</h2>
                <p>
                  Explore top opportunities from leading companies.
                </p>
              </div>

              <Link to="/jobs" className="home-view-all">
                View all jobs
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="job-grid">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="categories-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span>EXPLORE OPPORTUNITIES</span>
                <h2>Browse by Category</h2>
                <p>
                  Find jobs that match your skills and interests.
                </p>
              </div>
            </div>

            <div className="category-grid">
              <Category
                title="Development"
                jobs="1,250+ jobs"
                icon="</>"
              />
              <Category title="Design" jobs="980+ jobs" icon="✎" />
              <Category title="Marketing" jobs="760+ jobs" icon="◈" />
              <Category title="Sales" jobs="540+ jobs" icon="↗" />
              <Category title="Finance" jobs="320+ jobs" icon="$" />
              <Category title="Support" jobs="290+ jobs" icon="♧" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function JobCard({
  company,
  title,
  location,
  salary,
  id,
}: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const syncSavedJobs = () => {
      try {
        const stored: unknown = JSON.parse(
          localStorage.getItem("careerly-saved-jobs") || "[]"
        );

        if (Array.isArray(stored)) {
          setIsSaved(
            stored.some((item) => {
              const savedId =
                typeof item === "object" &&
                item !== null &&
                "id" in item
                  ? String(item.id)
                  : String(item);

              return savedId === id;
            })
          );
        }
      } catch {
        setIsSaved(false);
      }
    };

    syncSavedJobs();
    window.addEventListener("storage", syncSavedJobs);

    return () => {
      window.removeEventListener("storage", syncSavedJobs);
    };
  }, [id]);

  const toggleSave = () => {
    try {
      const stored: unknown = JSON.parse(
        localStorage.getItem("careerly-saved-jobs") || "[]"
      );

      const savedItems: unknown[] = Array.isArray(stored)
        ? stored
        : [];

      const alreadySaved = savedItems.some((item) => {
        const savedId =
          typeof item === "object" &&
          item !== null &&
          "id" in item
            ? String(item.id)
            : String(item);

        return savedId === id;
      });

      const updated = alreadySaved
        ? savedItems.filter((item) => {
            const savedId =
              typeof item === "object" &&
              item !== null &&
              "id" in item
                ? String(item.id)
                : String(item);

            return savedId !== id;
          })
        : [...savedItems, id];

      localStorage.setItem(
        "careerly-saved-jobs",
        JSON.stringify(updated)
      );

      setIsSaved(!alreadySaved);
    } catch {
      alert("Job save nahi ho saki. Please dobara try karein.");
    }
  };

  return (
    <article className="home-job-card">
      <div className="home-company-row">
        <div className="home-company-logo">
          {company.charAt(0)}
        </div>

        <strong className="home-company-name">{company}</strong>

        <button
          type="button"
          className={`home-job-heart${isSaved ? " saved" : ""}`}
          onClick={toggleSave}
          aria-label={isSaved ? `Unsave ${title}` : `Save ${title}`}
          aria-pressed={isSaved}
          title={isSaved ? "Remove from saved jobs" : "Save this job"}
        >
          <Heart
            size={19}
            fill={isSaved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <h3 className="home-job-title">{title}</h3>

      <div className="home-job-tags">
        <span>Full-time</span>
        <span>{location === "Remote" ? "Remote" : "On-site"}</span>
      </div>

      <p className="home-job-location">
        <MapPin size={15} />
        <span>{location}</span>
      </p>

      <div className="home-job-footer">
        <strong className="home-job-salary">{salary}</strong>

        <Link to={`/jobs/${id}`} className="home-job-apply">
          View Job
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

type CategoryProps = {
  title: string;
  jobs: string;
  icon: string;
};

function Category({ title, jobs, icon }: CategoryProps) {
  return (
    <Link to="/jobs" className="category-card">
      <div className="category-icon">{icon}</div>
      <strong>{title}</strong>
      <span>{jobs}</span>
    </Link>
  );
}

export default Home;
