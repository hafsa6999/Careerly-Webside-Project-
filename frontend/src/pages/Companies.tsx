
import { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

type Company = {
  name: string;
  category: string;
  location: string;
  employees: string;
  jobs: number;
};

const companies: Company[] = [
  {
    name: "Google",
    category: "Technology",
    location: "Mountain View, CA",
    employees: "180,000+ employees",
    jobs: 420,
  },
  {
    name: "Microsoft",
    category: "Technology",
    location: "Redmond, WA",
    employees: "220,000+ employees",
    jobs: 380,
  },
  {
    name: "Amazon",
    category: "E-commerce & Cloud",
    location: "Seattle, WA",
    employees: "1,500,000+ employees",
    jobs: 560,
  },
  {
    name: "Apple",
    category: "Technology",
    location: "Cupertino, CA",
    employees: "160,000+ employees",
    jobs: 290,
  },
  {
    name: "Meta",
    category: "Technology",
    location: "Menlo Park, CA",
    employees: "75,000+ employees",
    jobs: 210,
  },
  {
    name: "Netflix",
    category: "Entertainment",
    location: "Los Gatos, CA",
    employees: "14,000+ employees",
    jobs: 95,
  },
];

function Companies() {
  const [search, setSearch] = useState("");
  const [followedCompanies, setFollowedCompanies] =
    useState<string[]>([]);

  const filteredCompanies = companies.filter((company) => {
    const query = search.trim().toLowerCase();

    return (
      company.name.toLowerCase().includes(query) ||
      company.category.toLowerCase().includes(query) ||
      company.location.toLowerCase().includes(query)
    );
  });

  function toggleFollow(companyName: string) {
    setFollowedCompanies((previous) =>
      previous.includes(companyName)
        ? previous.filter((name) => name !== companyName)
        : [...previous, companyName]
    );
  }

  return (
    <div className="app">
      <Navbar />

      <main className="companies-page">
        <section className="companies-header">
          <div className="container">
            <span className="page-label">
              CAREERLY COMPANIES
            </span>

            <h1>
              Discover Great Companies
            </h1>

            <p>
              Explore leading companies and discover exciting
              opportunities to grow your career.
            </p>

            <form
              className="companies-search"
              onSubmit={(event) => event.preventDefault()}
            >
              <Search size={20} />

              <input
                type="search"
                placeholder="Search companies, categories or locations..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                aria-label="Search companies"
              />

              <button type="submit">
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="companies-content">
          <div className="container">
            <div className="section-heading">
              <div>
                <span>TOP EMPLOYERS</span>

                <h2>Companies Hiring Now</h2>

                <p>
                  Explore companies with exciting career
                  opportunities.
                </p>
              </div>
            </div>

            <p className="company-results">
              Showing {filteredCompanies.length} of{" "}
              {companies.length} companies
            </p>

            {filteredCompanies.length > 0 ? (
              <div className="companies-grid">
                {filteredCompanies.map((company) => {
                  const isFollowed =
                    followedCompanies.includes(company.name);

                  return (
                    <CompanyCard
                      key={company.name}
                      company={company}
                      isFollowed={isFollowed}
                      onToggleFollow={() =>
                        toggleFollow(company.name)
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <div className="no-companies">
                <Search size={34} />

                <h3>No companies found</h3>

                <p>
                  Try another company name, category or location.
                </p>

                <button
                  className="signup-btn"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

type CompanyCardProps = {
  company: Company;
  isFollowed: boolean;
  onToggleFollow: () => void;
};

function CompanyCard({
  company,
  isFollowed,
  onToggleFollow,
}: CompanyCardProps) {
  return (
    <article className="company-list-card">
      <div className="company-list-top">
        <div className="company-big-logo">
          {company.name.charAt(0)}
        </div>

        <button
          type="button"
          className="company-follow"
          onClick={onToggleFollow}
          aria-pressed={isFollowed}
        >
          {isFollowed ? (
            <>
              <Check size={15} />
              Following
            </>
          ) : (
            "Follow"
          )}
        </button>
      </div>

      <h3>{company.name}</h3>

      <span className="company-category">
        {company.category}
      </span>

      <div className="company-info">
        <span>
          <MapPin size={15} />
          {company.location}
        </span>

        <span>
          <Users size={15} />
          {company.employees}
        </span>
      </div>

      <div className="company-card-bottom">
        <strong>{company.jobs} open jobs</strong>

        <Link
          to="/jobs"
          className="company-view-jobs"
        >
          View Jobs
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default Companies;