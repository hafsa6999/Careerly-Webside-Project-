import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  BriefcaseBusiness,
  Clock,
  DollarSign,
  Building2,
  CheckCircle2,
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Share2,
  GraduationCap,
  Users,
  CalendarDays,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { jobs } from "../data/jobs";
import "./JobDetails.css";

type JobInfo = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  posted: string;
  description: string;
  logo: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  experience: string;
};

const jobDetailsData: JobInfo[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechNova",
    location: "Lahore, Pakistan",
    type: "Full-time",
    category: "Technology",
    salary: "PKR 120k–180k/month",
    posted: "2 days ago",
    description:
      "Build modern, responsive web applications using React and TypeScript.",
    logo: "T",
    about:
      "TechNova builds modern digital products and web applications. Our team focuses on creating reliable, accessible, and user-friendly software experiences.",
    responsibilities: [
      "Build responsive web interfaces using React and TypeScript.",
      "Work with designers to turn UI designs into functional pages.",
      "Write clean, reusable, and maintainable code.",
      "Debug issues and improve application performance.",
      "Collaborate with backend developers and other team members.",
    ],
    requirements: [
      "Knowledge of JavaScript, React, and TypeScript.",
      "Understanding of HTML, CSS, and responsive design.",
      "Familiarity with Git and version control.",
      "Ability to work collaboratively in a team.",
    ],
    skills: ["React", "TypeScript", "CSS", "JavaScript", "Git"],
    experience: "1–3 years",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Remote",
    type: "Full-time",
    category: "Design",
    salary: "PKR 100k–160k/month",
    posted: "1 day ago",
    description:
      "Design intuitive user experiences and polished digital products.",
    logo: "P",
    about:
      "PixelCraft is a creative digital design company that helps businesses build intuitive and visually engaging digital products.",
    responsibilities: [
      "Create wireframes, prototypes, and user interface designs.",
      "Develop user flows and journey maps.",
      "Collaborate with developers and product managers.",
      "Maintain consistency across product interfaces.",
      "Improve designs using user feedback.",
    ],
    requirements: [
      "Experience with Figma or similar design tools.",
      "Understanding of UI design and UX principles.",
      "A portfolio showing design projects.",
      "Good communication and collaboration skills.",
    ],
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    experience: "1–3 years",
  },
  {
    id: "3",
    title: "Junior React Developer",
    company: "CodeNest",
    location: "Karachi, Pakistan",
    type: "Full-time",
    category: "Technology",
    salary: "PKR 70k–110k/month",
    posted: "3 days ago",
    description:
      "Work with an experienced engineering team to develop React applications.",
    logo: "C",
    about:
      "CodeNest develops web applications and provides an environment for developers to learn, collaborate, and grow their technical skills.",
    responsibilities: [
      "Develop reusable React components.",
      "Write readable and maintainable JavaScript.",
      "Fix bugs and test application features.",
      "Work with senior developers on new features.",
      "Learn and follow the team's coding standards.",
    ],
    requirements: [
      "Basic understanding of React and JavaScript.",
      "Knowledge of HTML and CSS.",
      "Familiarity with Git.",
      "Willingness to learn and solve problems.",
    ],
    skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
    experience: "Fresh graduate–1 year",
  },
  {
    id: "4",
    title: "Digital Marketing Specialist",
    company: "GrowthLabs",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    category: "Marketing",
    salary: "PKR 80k–130k/month",
    posted: "4 days ago",
    description:
      "Plan digital campaigns and improve brand reach across online channels.",
    logo: "G",
    about:
      "GrowthLabs helps brands grow their online presence through digital campaigns, content strategy, and performance marketing.",
    responsibilities: [
      "Plan and execute digital marketing campaigns.",
      "Manage social media and online content.",
      "Monitor campaign performance and analytics.",
      "Research audience and market trends.",
      "Prepare marketing reports and recommendations.",
    ],
    requirements: [
      "Knowledge of digital marketing fundamentals.",
      "Understanding of SEO and social media marketing.",
      "Basic analytics and reporting skills.",
      "Strong written communication skills.",
    ],
    skills: ["SEO", "Social Media", "Analytics", "Content Marketing"],
    experience: "1–3 years",
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "CloudBridge",
    location: "Remote",
    type: "Contract",
    category: "Technology",
    salary: "PKR 150k–250k/month",
    posted: "Today",
    description:
      "Develop secure APIs and scalable backend services for web products.",
    logo: "C",
    about:
      "CloudBridge builds cloud-based products and backend systems that help businesses deliver dependable digital services.",
    responsibilities: [
      "Design and develop REST APIs.",
      "Build and maintain backend services.",
      "Work with databases and data models.",
      "Improve security, reliability, and performance.",
      "Collaborate with frontend developers.",
    ],
    requirements: [
      "Experience with Node.js or a similar backend technology.",
      "Knowledge of SQL and database fundamentals.",
      "Understanding of REST APIs.",
      "Familiarity with authentication and security practices.",
    ],
    skills: ["Node.js", "SQL", "REST API", "Git", "Databases"],
    experience: "2–4 years",
  },
  {
    id: "6",
    title: "Graphic Designer",
    company: "Creative House",
    location: "Lahore, Pakistan",
    type: "Part-time",
    category: "Design",
    salary: "PKR 45k–75k/month",
    posted: "5 days ago",
    description:
      "Create engaging visual assets for marketing and brand campaigns.",
    logo: "C",
    about:
      "Creative House works with brands to create memorable visual identities and engaging marketing materials.",
    responsibilities: [
      "Create graphics for digital and print platforms.",
      "Design social media posts and marketing materials.",
      "Maintain brand consistency.",
      "Work with the marketing team on creative concepts.",
      "Prepare final design assets for delivery.",
    ],
    requirements: [
      "Knowledge of graphic design principles.",
      "Familiarity with Illustrator or Photoshop.",
      "A portfolio of design work.",
      "Attention to detail and creativity.",
    ],
    skills: ["Illustrator", "Photoshop", "Branding", "Typography"],
    experience: "1–3 years",
  },
  {
    id: "7",
    title: "HR Coordinator",
    company: "PeopleFirst",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    category: "Human Resources",
    salary: "PKR 65k–95k/month",
    posted: "6 days ago",
    description:
      "Support recruitment, candidate communication, and onboarding activities.",
    logo: "P",
    about:
      "PeopleFirst supports organizations in building strong teams through recruitment, employee support, and human resources services.",
    responsibilities: [
      "Coordinate interviews and candidate schedules.",
      "Maintain recruitment records.",
      "Support onboarding activities.",
      "Communicate with applicants and hiring managers.",
      "Assist with routine HR administration.",
    ],
    requirements: [
      "Good communication and organizational skills.",
      "Interest in recruitment and HR processes.",
      "Basic computer and documentation skills.",
      "Ability to handle information professionally.",
    ],
    skills: ["Recruitment", "Communication", "HR", "Organization"],
    experience: "1–2 years",
  },
  {
    id: "8",
    title: "Data Analyst Intern",
    company: "InsightWorks",
    location: "Remote",
    type: "Internship",
    category: "Data",
    salary: "PKR 25k–45k/month",
    posted: "Today",
    description:
      "Help analyze datasets and create useful reports for business teams.",
    logo: "I",
    about:
      "InsightWorks helps teams understand business performance through data analysis, reporting, and actionable insights.",
    responsibilities: [
      "Clean and organize datasets.",
      "Assist with reports and dashboards.",
      "Use spreadsheets to analyze information.",
      "Identify patterns and trends in data.",
      "Present findings to team members.",
    ],
    requirements: [
      "Basic knowledge of Excel or spreadsheets.",
      "Interest in data analysis.",
      "Basic SQL knowledge is helpful.",
      "Attention to detail and willingness to learn.",
    ],
    skills: ["Excel", "SQL", "Data Analysis", "Reporting"],
    experience: "Internship / Entry-level",
  },
];

const SAVED_JOBS_KEY = "careerly-saved-jobs";

function getSavedJobIds(): string[] {
  try {
    const stored = localStorage.getItem(SAVED_JOBS_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item: unknown) => {
        if (typeof item === "string" || typeof item === "number") {
          return String(item);
        }

        if (
          typeof item === "object" &&
          item !== null &&
          "id" in item
        ) {
          return String((item as { id: string | number }).id);
        }

        return null;
      })
      .filter((id): id is string => id !== null);
  } catch {
    return [];
  }
}

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const jobDetails = jobDetailsData.find((item) => item.id === id);
  const baseJob = jobs.find((item) => item.id === id);

  // Shared job data keeps this page consistent with Jobs and Saved Jobs.
  const job =
    jobDetails && baseJob
      ? { ...jobDetails, ...baseJob }
      : undefined;

  useEffect(() => {
    const savedIds = getSavedJobIds();
    setSaved(id ? savedIds.includes(id) : false);
  }, [id]);

  const toggleSave = () => {
    if (!job) return;

    const savedIds = getSavedJobIds();

    const updatedIds = savedIds.includes(job.id)
      ? savedIds.filter((savedId) => savedId !== job.id)
      : [...savedIds, job.id];

    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedIds));
    setSaved(updatedIds.includes(job.id));
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: job?.title ?? "Job opportunity",
          text: `Check out this job at ${job?.company ?? "Careerly"}.`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // Sharing can be cancelled by the user.
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      try {
        window.prompt("Copy this job link:", url);
      } catch {
        // No action needed if sharing and clipboard are unavailable.
      }
    }
  };

  if (!job) {
    return (
      <>
        <Navbar />

        <main className="job-details-page">
          <div className="job-details-container">
            <Link to="/jobs" className="back-link">
              <ArrowLeft size={18} />
              Back to Jobs
            </Link>

            <section className="job-not-found">
              <Building2 size={44} />
              <h1>Job not found</h1>
              <p>
                This job may have been removed or the link may be incorrect.
              </p>
              <Link to="/jobs" className="apply-button">
                Browse All Jobs
                <ArrowUpRight size={18} />
              </Link>
            </section>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="job-details-page">
        <div className="job-details-container">
          <Link to="/jobs" className="back-link">
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>

          <section className="job-details-header">
            <div className="job-company-logo">
              {job.logo}
            </div>

            <div className="job-header-info">
              <div className="job-header-title-row">
                <div>
                  <span className="job-category-label">
                    {job.category}
                  </span>

                  <h1>{job.title}</h1>

                  <div className="job-company-name">
                    <Building2 size={17} />
                    <span>{job.company}</span>
                  </div>
                </div>

                <div className="job-header-actions">
                  <button
                    type="button"
                    className={`icon-action-button ${
                      saved ? "is-saved" : ""
                    }`}
                    onClick={toggleSave}
                    aria-label={
                      saved ? "Remove saved job" : "Save job"
                    }
                    title={saved ? "Remove saved job" : "Save job"}
                  >
                    <Bookmark
                      size={20}
                      fill={saved ? "currentColor" : "none"}
                    />
                  </button>

                  <button
                    type="button"
                    className="icon-action-button"
                    onClick={handleShare}
                    aria-label="Share job"
                    title="Share job"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {copied && (
                <p className="share-success">
                  Job link copied!
                </p>
              )}

              <div className="job-meta-list">
                <span>
                  <MapPin size={17} />
                  {job.location}
                </span>

                <span>
                  <BriefcaseBusiness size={17} />
                  {job.type}
                </span>

                <span>
                  <DollarSign size={17} />
                  {job.salary}
                </span>

                <span>
                  <Clock size={17} />
                  Posted {job.posted}
                </span>
              </div>
            </div>
          </section>

          <div className="job-details-layout">
            <div className="job-details-main">
              <section className="details-card">
                <h2>Job Description</h2>
                <p>{job.description}</p>

                <h3>About the Company</h3>
                <p>{job.about}</p>
              </section>

              <section className="details-card">
                <h2>Responsibilities</h2>

                <ul className="details-list">
                  {job.responsibilities.map((item, index) => (
                    <li key={`${job.id}-responsibility-${index}`}>
                      <CheckCircle2 size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="details-card">
                <h2>Requirements</h2>

                <ul className="details-list">
                  {job.requirements.map((item, index) => (
                    <li key={`${job.id}-requirement-${index}`}>
                      <CheckCircle2 size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="details-card">
                <h2>Required Skills</h2>

                <div className="job-skills-list">
                  {job.skills.map((skill) => (
                    <span key={skill} className="job-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <aside className="job-details-sidebar">
              <section className="apply-card">
                <h2>Interested in this role?</h2>

                <p>
                  Take the next step in your career and apply for this
                  position.
                </p>

                <Link
                  to={`/apply/${job.id}`}
                  className="apply-button"
                >
                  Apply Now
                  <ArrowUpRight size={18} />
                </Link>

                <button
                  type="button"
                  className="save-job-button"
                  onClick={toggleSave}
                >
                  <Bookmark
                    size={18}
                    fill={saved ? "currentColor" : "none"}
                  />
                  {saved ? "Saved Job" : "Save Job"}
                </button>

                <div className="apply-card-divider" />

                <h3>Job Overview</h3>

                <div className="overview-item">
                  <span className="overview-icon">
                    <BriefcaseBusiness size={18} />
                  </span>
                  <div>
                    <small>Job Type</small>
                    <strong>{job.type}</strong>
                  </div>
                </div>

                <div className="overview-item">
                  <span className="overview-icon">
                    <DollarSign size={18} />
                  </span>
                  <div>
                    <small>Salary</small>
                    <strong>{job.salary}</strong>
                  </div>
                </div>

                <div className="overview-item">
                  <span className="overview-icon">
                    <GraduationCap size={18} />
                  </span>
                  <div>
                    <small>Experience</small>
                    <strong>{job.experience}</strong>
                  </div>
                </div>

                <div className="overview-item">
                  <span className="overview-icon">
                    <CalendarDays size={18} />
                  </span>
                  <div>
                    <small>Posted</small>
                    <strong>{job.posted}</strong>
                  </div>
                </div>

                <div className="overview-item">
                  <span className="overview-icon">
                    <Users size={18} />
                  </span>
                  <div>
                    <small>Category</small>
                    <strong>{job.category}</strong>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}