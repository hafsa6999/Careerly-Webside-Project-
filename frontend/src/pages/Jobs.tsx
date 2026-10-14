import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock,
  Heart,
  SlidersHorizontal,
  X,
  ArrowUpRight,
  ChevronDown,
  Building2,
  RotateCcw,
} from "lucide-react";
import Navbar from "../components/Navbar";
import "./Jobs.css";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  salaryValue: number;
  posted: string;
  description: string;
  skills: string[];
  logo: string;
  featured?: boolean;
};

const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechNova",
    location: "Lahore, Pakistan",
    type: "Full-time",
    category: "Technology",
    salary: "PKR 120k–180k/month",
    salaryValue: 180000,
    posted: "2 days ago",
    description:
      "Build modern, responsive web applications using React and TypeScript.",
    skills: ["React", "TypeScript", "CSS"],
    logo: "T",
    featured: true,
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Remote",
    type: "Full-time",
    category: "Design",
    salary: "PKR 100k–160k/month",
    salaryValue: 160000,
    posted: "1 day ago",
    description:
      "Design intuitive user experiences and polished digital products.",
    skills: ["Figma", "UI Design", "Prototyping"],
    logo: "P",
    featured: true,
  },
  {
    id: "3",
    title: "Junior React Developer",
    company: "CodeNest",
    location: "Karachi, Pakistan",
    type: "Full-time",
    category: "Technology",
    salary: "PKR 70k–110k/month",
    salaryValue: 110000,
    posted: "3 days ago",
    description:
      "Work with an experienced engineering team to develop React applications.",
    skills: ["React", "JavaScript", "Git"],
    logo: "C",
  },
  {
    id: "4",
    title: "Digital Marketing Specialist",
    company: "GrowthLabs",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    category: "Marketing",
    salary: "PKR 80k–130k/month",
    salaryValue: 130000,
    posted: "4 days ago",
    description:
      "Plan digital campaigns and improve brand reach across online channels.",
    skills: ["SEO", "Social Media", "Analytics"],
    logo: "G",
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "CloudBridge",
    location: "Remote",
    type: "Contract",
    category: "Technology",
    salary: "PKR 150k–250k/month",
    salaryValue: 250000,
    posted: "Today",
    description:
      "Develop secure APIs and scalable backend services for web products.",
    skills: ["Node.js", "SQL", "REST API"],
    logo: "C",
    featured: true,
  },
  {
    id: "6",
    title: "Graphic Designer",
    company: "Creative House",
    location: "Lahore, Pakistan",
    type: "Part-time",
    category: "Design",
    salary: "PKR 45k–75k/month",
    salaryValue: 75000,
    posted: "5 days ago",
    description:
      "Create engaging visual assets for marketing and brand campaigns.",
    skills: ["Illustrator", "Photoshop", "Branding"],
    logo: "C",
  },
  {
    id: "7",
    title: "HR Coordinator",
    company: "PeopleFirst",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    category: "Human Resources",
    salary: "PKR 65k–95k/month",
    salaryValue: 95000,
    posted: "6 days ago",
    description:
      "Support recruitment, candidate communication, and onboarding activities.",
    skills: ["Recruitment", "Communication", "HR"],
    logo: "P",
  },
  {
    id: "8",
    title: "Data Analyst Intern",
    company: "InsightWorks",
    location: "Remote",
    type: "Internship",
    category: "Data",
    salary: "PKR 25k–45k/month",
    salaryValue: 45000,
    posted: "Today",
    description:
      "Help analyze datasets and create useful reports for business teams.",
    skills: ["Excel", "SQL", "Data Analysis"],
    logo: "I",
  },
];

const categories = [
  "All Categories",
  "Technology",
  "Design",
  "Marketing",
  "Human Resources",
  "Data",
];

const jobTypes = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const locations = [
  "All Locations",
  "Lahore, Pakistan",
  "Karachi, Pakistan",
  "Islamabad, Pakistan",
  "Remote",
];

function Jobs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [jobType, setJobType] = useState("All Types");
  const [location, setLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("relevance");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("careerly-saved-jobs");
      if (saved) {
        setSavedJobs(JSON.parse(saved));
      }
    } catch {
      setSavedJobs([]);
    }
  }, []);

  const toggleSave = (id: string) => {
    setSavedJobs((current) => {
      const updated = current.includes(id)
        ? current.filter((jobId) => jobId !== id)
        : [...current, id];

      try {
        localStorage.setItem(
          "careerly-saved-jobs",
          JSON.stringify(updated)
        );
      } catch {
        // Saving still works for the current session.
      }

      return updated;
    });
  };

  const filteredJobs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const result = jobs.filter((job) => {
      const matchesSearch =
        !keyword ||
        [
          job.title,
          job.company,
          job.location,
          job.category,
          job.description,
          ...job.skills,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      const matchesCategory =
        category === "All Categories" || job.category === category;

      const matchesType =
        jobType === "All Types" || job.type === jobType;

      const matchesLocation =
        location === "All Locations" || job.location === location;

      const matchesSaved = !savedOnly || savedJobs.includes(job.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesLocation &&
        matchesSaved
      );
    });

    if (sortBy === "salary") {
      result.sort((a, b) => b.salaryValue - a.salaryValue);
    } else if (sortBy === "newest") {
      const order = ["Today", "1 day ago", "2 days ago", "3 days ago",
        "4 days ago", "5 days ago", "6 days ago"];
      result.sort(
        (a, b) => order.indexOf(a.posted) - order.indexOf(b.posted)
      );
    }

    return result;
  }, [
    search,
    category,
    jobType,
    location,
    sortBy,
    savedOnly,
    savedJobs,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setJobType("All Types");
    setLocation("All Locations");
    setSortBy("relevance");
    setSavedOnly(false);
  };

  return (
    <div className="jobs-page">
      <Navbar />

      <section className="jobs-hero">
        <div className="jobs-hero-inner">
          <div className="jobs-hero-copy">
            <span className="jobs-eyebrow">
              <span className="jobs-eyebrow-dot" />
              YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h1>
              Find work that
              <br />
              <span>moves you forward.</span>
            </h1>

            <p>
              Discover opportunities that match your skills, goals, and
              ambitions. Your next big opportunity is waiting.
            </p>

            <div className="jobs-hero-points">
              <span>
                <BriefcaseBusiness size={16} />
                Quality opportunities
              </span>
              <span>
                <Building2 size={16} />
                Growing companies
              </span>
            </div>
          </div>

          <div className="jobs-hero-art" aria-hidden="true">
            <div className="jobs-art-circle jobs-art-circle-one" />
            <div className="jobs-art-circle jobs-art-circle-two" />
            <div className="jobs-art-card">
              <div className="jobs-art-card-top">
                <div className="jobs-art-logo">C</div>
                <span className="jobs-art-status">HIRING NOW</span>
              </div>
              <div className="jobs-art-line jobs-art-line-long" />
              <div className="jobs-art-line jobs-art-line-short" />
              <div className="jobs-art-tags">
                <span>Remote</span>
                <span>Full-time</span>
              </div>
              <div className="jobs-art-bottom">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="jobs-art-floating">
              <span className="jobs-art-check">✓</span>
              <div>
                <strong>New opportunities</strong>
                <small>Find your next role</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="jobs-main">
        <section className="jobs-search-panel">
          <div className="jobs-search-input-wrap">
            <Search size={20} />
            <input
              type="search"
              placeholder="Job title, company, or keyword"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search jobs"
            />
            {search && (
              <button
                type="button"
                className="jobs-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="jobs-search-divider" />

          <div className="jobs-search-select-wrap">
            <MapPin size={19} />
            <select
              aria-label="Filter by location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown size={15} className="jobs-select-chevron" />
          </div>

          <button
            type="button"
            className="jobs-search-button"
            onClick={() => {
              document
                .getElementById("jobs-results")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Search size={17} />
            Search Jobs
          </button>
        </section>

        <div className="jobs-section-heading">
          <div>
            <span className="jobs-section-kicker">CAREER OPPORTUNITIES</span>
            <h2>Explore open positions</h2>
            <p>Find the role that fits your next career move.</p>
          </div>

          <button
            type="button"
            className={`jobs-saved-toggle ${savedOnly ? "active" : ""}`}
            onClick={() => setSavedOnly((current) => !current)}
          >
            <Heart size={17} fill={savedOnly ? "currentColor" : "none"} />
            Saved Jobs
            <span>{savedJobs.length}</span>
          </button>
        </div>

        <div className="jobs-workspace" id="jobs-results">
          <aside className={`jobs-sidebar ${showFilters ? "is-open" : ""}`}>
            <div className="jobs-sidebar-heading">
              <h3>
                <SlidersHorizontal size={18} />
                Filters
              </h3>
              <button type="button" onClick={clearFilters}>
                Reset
              </button>
            </div>

            <div className="jobs-filter-group">
              <label htmlFor="jobs-category">Job Category</label>
              <select
                id="jobs-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="jobs-filter-group">
              <label htmlFor="jobs-type">Employment Type</label>
              <select
                id="jobs-type"
                value={jobType}
                onChange={(event) => setJobType(event.target.value)}
              >
                {jobTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="jobs-filter-group">
              <label htmlFor="jobs-location">Location</label>
              <select
                id="jobs-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              >
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="jobs-filter-note">
              <div className="jobs-filter-note-icon">
                <Search size={18} />
              </div>
              <strong>Keep exploring</strong>
              <p>
                Try different keywords and filters to discover more
                opportunities.
              </p>
            </div>
          </aside>

          <section className="jobs-results-column">
            <div className="jobs-results-toolbar">
              <div>
                <h3>
                  {savedOnly ? "Your saved jobs" : "Available jobs"}
                </h3>
                <p>
                  Showing <strong>{filteredJobs.length}</strong>{" "}
                  {filteredJobs.length === 1 ? "position" : "positions"}
                </p>
              </div>

              <div className="jobs-toolbar-actions">
                <button
                  type="button"
                  className="jobs-mobile-filter"
                  onClick={() => setShowFilters((current) => !current)}
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>

                <label className="jobs-sort-control">
                  <span>Sort by</span>
                  <select
                    aria-label="Sort jobs"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                    <option value="salary">Highest salary</option>
                  </select>
                </label>
              </div>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="jobs-list">
                {filteredJobs.map((job) => (
                  <article className="job-card" key={job.id}>
                    <div className={`job-company-logo logo-${job.logo}`}>
                      {job.logo}
                    </div>

                    <div className="job-card-content">
                      <div className="job-card-title-row">
                        <div>
                          {job.featured && (
                            <span className="job-featured-label">
                              FEATURED
                            </span>
                          )}
                          <h3>
                            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                          </h3>
                          <p className="job-company-name">{job.company}</p>
                        </div>

                        <button
                          type="button"
                          className={`job-save-button ${
                            savedJobs.includes(job.id) ? "is-saved" : ""
                          }`}
                          onClick={() => toggleSave(job.id)}
                          aria-label={
                            savedJobs.includes(job.id)
                              ? `Unsave ${job.title}`
                              : `Save ${job.title}`
                          }
                          title={
                            savedJobs.includes(job.id)
                              ? "Remove saved job"
                              : "Save job"
                          }
                        >
                          <Heart
                            size={19}
                            fill={
                              savedJobs.includes(job.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>

                      <p className="job-description">{job.description}</p>

                      <div className="job-meta">
                        <span>
                          <MapPin size={15} />
                          {job.location}
                        </span>
                        <span>
                          <BriefcaseBusiness size={15} />
                          {job.type}
                        </span>
                        <span>
                          <Clock size={15} />
                          {job.posted}
                        </span>
                      </div>

                      <div className="job-card-bottom">
                        <div className="job-card-tags">
                          {job.skills.slice(0, 3).map((skill) => (
                            <span key={skill}>{skill}</span>
                          ))}
                        </div>

                        <div className="job-card-action">
                          <strong>{job.salary}</strong>
                          <Link
                            to={`/jobs/${job.id}`}
                            className="job-details-link"
                          >
                            View details
                            <ArrowUpRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="jobs-empty-state">
                <div className="jobs-empty-icon">
                  <Search size={28} />
                </div>
                <h3>No jobs found</h3>
                <p>
                  We couldn't find any jobs matching your search. Try
                  changing your keywords or filters.
                </p>
                <button type="button" onClick={clearFilters}>
                  <RotateCcw size={16} />
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <section className="jobs-bottom-cta">
        <div>
          <span>YOUR NEXT CHAPTER</span>
          <h2>Ready to take the next step?</h2>
          <p>
            Create your Careerly profile and get ready for new opportunities.
          </p>
        </div>
        <Link to="/register" className="jobs-cta-button">
          Get Started
          <ArrowUpRight size={17} />
        </Link>
      </section>
    </div>
  );
}

export default Jobs;

