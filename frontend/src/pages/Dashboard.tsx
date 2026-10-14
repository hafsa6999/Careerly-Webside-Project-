
import { Link, Navigate } from "react-router-dom";
import {
  UserRound,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  Search,
  ArrowRight,
  CalendarDays,
  Building2,
  MapPin,
  Heart,
  Trash2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import "../App.css";
import "./Dashboard.css";

type DemoUser = {
  name: string;
  email: string;
};

type Application = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  resumeName: string;
  submittedAt: string;
  status: string;
};

type SavedJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
};

const availableJobs: SavedJob[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechNova",
    location: "Lahore, Pakistan",
    salary: "PKR 120k–180k/month",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Remote",
    salary: "PKR 100k–160k/month",
  },
  {
    id: "3",
    title: "Junior React Developer",
    company: "CodeNest",
    location: "Karachi, Pakistan",
    salary: "PKR 70k–110k/month",
  },
  {
    id: "4",
    title: "Digital Marketing Specialist",
    company: "GrowthLabs",
    location: "Islamabad, Pakistan",
    salary: "PKR 80k–130k/month",
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "CloudBridge",
    location: "Remote",
    salary: "PKR 150k–250k/month",
  },
  {
    id: "6",
    title: "Graphic Designer",
    company: "Creative House",
    location: "Lahore, Pakistan",
    salary: "PKR 45k–75k/month",
  },
  {
    id: "7",
    title: "HR Coordinator",
    company: "PeopleFirst",
    location: "Islamabad, Pakistan",
    salary: "PKR 65k–95k/month",
  },
  {
    id: "8",
    title: "Data Analyst Intern",
    company: "InsightWorks",
    location: "Remote",
    salary: "PKR 25k–45k/month",
  },
];

function getCurrentUser(): DemoUser | null {
  try {
    const value = localStorage.getItem("careerly-demo-current-user");
    if (!value) return null;

    const user = JSON.parse(value);

    if (
      user &&
      typeof user.name === "string" &&
      typeof user.email === "string"
    ) {
      return user as DemoUser;
    }

    return null;
  } catch {
    return null;
  }
}

function getApplications(): Application[] {
  try {
    const value = localStorage.getItem("careerly-applications");
    if (!value) return [];

    const data: unknown = JSON.parse(value);
    if (!Array.isArray(data)) return [];

    return data.filter(
      (item): item is Application =>
        item !== null &&
        typeof item === "object" &&
        typeof item.email === "string" &&
        typeof item.jobTitle === "string"
    );
  } catch {
    return [];
  }
}

function getSavedJobIds(): string[] {
  try {
    const value = localStorage.getItem("careerly-saved-jobs");
    if (!value) return [];

    const data: unknown = JSON.parse(value);

    if (
      Array.isArray(data) &&
      data.every((id) => typeof id === "string")
    ) {
      return [...new Set(data)];
    }

    return [];
  } catch {
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Dashboard() {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const applications = getApplications().filter(
    (application) =>
      application.email.trim().toLowerCase() ===
      user.email.trim().toLowerCase()
  );

  const savedJobIds = getSavedJobIds();

  const savedJobs = savedJobIds
    .map((id) => availableJobs.find((job) => job.id === id))
    .filter((job): job is SavedJob => job !== undefined);

  function removeSavedJob(id: string) {
    try {
      const currentIds = getSavedJobIds();
      const updatedIds = currentIds.filter((jobId) => jobId !== id);

      localStorage.setItem(
        "careerly-saved-jobs",
        JSON.stringify(updatedIds)
      );

      window.location.reload();
    } catch {
      alert("Could not update saved jobs. Please try again.");
    }
  }

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-page">
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">YOUR CAREER SPACE</p>
            <h1>Welcome back, {user.name}!</h1>
            <p>Manage your profile and discover your next opportunity.</p>
          </div>

          <div className="dashboard-avatar">
            <UserRound size={32} />
          </div>
        </section>

        <section className="dashboard-profile">
          <div className="profile-icon">
            <UserRound size={24} />
          </div>

          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          <span className="profile-badge">Candidate</span>
        </section>

        <section className="dashboard-stats">
          <article className="dashboard-stat-card">
            <div className="stat-icon blue">
              <FileText size={22} />
            </div>
            <div>
              <p>Applications</p>
              <h2>{applications.length}</h2>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="stat-icon purple">
              <Bookmark size={22} />
            </div>
            <div>
              <p>Saved Jobs</p>
              <h2>{savedJobs.length}</h2>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="stat-icon orange">
              <BriefcaseBusiness size={22} />
            </div>
            <div>
              <p>Profile Status</p>
              <h2>Active</h2>
            </div>
          </article>
        </section>

        <section className="dashboard-content">
          <div className="dashboard-section-heading">
            <div>
              <h2>My Applications</h2>
              <p>Track the jobs you have applied for and their status.</p>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="dashboard-empty-state">
              <div className="empty-state-icon">
                <Search size={30} />
              </div>
              <h3>No applications yet</h3>
              <p>Your submitted applications will appear here.</p>
              <Link to="/jobs" className="dashboard-primary-btn">
                Explore Jobs <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="dashboard-applications">
              {applications.slice().reverse().map((application) => (
                <article
                  className="dashboard-application-card"
                  key={application.id}
                >
                  <div className="application-card-top">
                    <div className="application-card-icon">
                      <BriefcaseBusiness size={23} />
                    </div>
                    <span className="application-status">
                      {application.status || "Submitted"}
                    </span>
                  </div>

                  <h3>{application.jobTitle}</h3>

                  <p className="application-company">
                    <Building2 size={16} />
                    {application.company || "Careerly"}
                  </p>

                  <div className="application-card-divider" />

                  <div className="application-meta">
                    <span>
                      <CalendarDays size={16} />
                      Applied: {formatDate(application.submittedAt)}
                    </span>
                    <span>
                      <FileText size={16} />
                      Resume: {application.resumeName || "Uploaded"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-content">
          <div className="dashboard-section-heading">
            <div>
              <h2>My Saved Jobs</h2>
              <p>Jobs you bookmarked for later.</p>
            </div>

            <Link to="/jobs" className="dashboard-primary-btn">
              Browse Jobs <ArrowRight size={17} />
            </Link>
          </div>

          {savedJobs.length === 0 ? (
            <div className="dashboard-empty-state">
              <div className="empty-state-icon">
                <Bookmark size={30} />
              </div>
              <h3>No saved jobs yet</h3>
              <p>
                Visit the jobs page and click the heart icon on any job
                you want to save.
              </p>
              <Link to="/jobs" className="dashboard-primary-btn">
                Find Jobs <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="dashboard-saved-jobs">
              {savedJobs.map((job) => (
                <article className="dashboard-saved-job-card" key={job.id}>
                  <div className="saved-job-heading">
                    <div className="application-card-icon">
                      <BriefcaseBusiness size={22} />
                    </div>

                    <button
                      type="button"
                      className="saved-job-remove"
                      onClick={() => removeSavedJob(job.id)}
                      aria-label={`Remove ${job.title} from saved jobs`}
                      title="Remove saved job"
                    >
                      <Heart size={19} fill="currentColor" />
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <h3>{job.title}</h3>
                  <p className="application-company">
                    <Building2 size={16} />
                    {job.company}
                  </p>
                  <p className="saved-job-location">
                    <MapPin size={16} />
                    {job.location}
                  </p>
                  <p className="saved-job-salary">{job.salary}</p>

                  <Link to={`/jobs/${job.id}`} className="saved-job-details">
                    View job details <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
