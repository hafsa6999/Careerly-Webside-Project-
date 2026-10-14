import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Heart, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { jobs } from "../data/jobs";
import "./SavedJobs.css";

export default function SavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("careerly-saved-jobs");

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          const ids = parsed.map((item) =>
            typeof item === "object" && item !== null && "id" in item
              ? String(item.id)
              : String(item)
          );

          setSavedIds(ids);
        }
      }
    } catch {
      setSavedIds([]);
    }
  }, []);

  const savedJobs = jobs.filter((job) => savedIds.includes(job.id));

  const removeSavedJob = (id: string) => {
    const updated = savedIds.filter((savedId) => savedId !== id);

    setSavedIds(updated);

    try {
      localStorage.setItem("careerly-saved-jobs", JSON.stringify(updated));
    } catch {
      // Saved state remains updated for this session.
    }
  };

  return (
    <>
      <Navbar />

      <main className="saved-page">
        <section className="saved-hero">
          <div>
            <span className="saved-eyebrow">YOUR COLLECTION</span>
            <h1>Saved Jobs</h1>
            <p>Keep track of the opportunities you want to explore.</p>
          </div>

          <div className="saved-count">
            <Heart size={22} fill="currentColor" />
            <span>{savedJobs.length} saved</span>
          </div>
        </section>

        {savedJobs.length > 0 ? (
          <section className="saved-grid">
            {savedJobs.map((job) => (
              <article className="saved-card" key={job.id}>
                <div className="saved-card-top">
                  <div className="saved-company-icon">
                    <Briefcase size={23} />
                  </div>

                  <button
                    type="button"
                    className="saved-remove"
                    onClick={() => removeSavedJob(job.id)}
                    aria-label={`Remove ${job.title} from saved jobs`}
                    title="Remove saved job"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>

                <h2>{job.title}</h2>
                <p className="saved-company">{job.company}</p>

                <div className="saved-meta">
                  <span>
                    <MapPin size={15} />
                    {job.location}
                  </span>
                  <span>{job.type}</span>
                </div>

                <div className="saved-card-bottom">
                  <strong>{job.salary}</strong>
                  <Link to={`/jobs/${job.id}`} className="saved-view-link">
                    View job <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="saved-empty">
            <div className="saved-empty-icon">
              <Heart size={32} />
            </div>
            <h2>No saved jobs yet</h2>
            <p>
              Jobs you save using the heart button will appear here.
              Explore available opportunities and save your favourites.
            </p>
            <Link to="/jobs" className="saved-explore-btn">
              Explore Jobs <ArrowRight size={18} />
            </Link>
          </section>
        )}
      </main>
    </>
  );
}