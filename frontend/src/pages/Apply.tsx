import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  CheckCircle2,
  ShieldCheck,
  BriefcaseBusiness,
  UserRound,
  Mail,
  Phone,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import "./Apply.css";

type ApplicationJob = {
  jobId?: string;
  jobTitle?: string;
  company?: string;
};

function Apply() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedJob = (location.state || {}) as ApplicationJob;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload your resume as a PDF or Word document.");
      event.target.value = "";
      setResume(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Your resume must be smaller than 5 MB.");
      event.target.value = "";
      setResume(null);
      return;
    }

    setError("");
    setResume(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !phone.trim() || !resume) {
      setError("Please complete all required fields and upload your resume.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (phone.trim().replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      const application = {
        id: `APP-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        coverLetter: coverLetter.trim(),
        jobId: selectedJob.jobId || "",
        jobTitle: selectedJob.jobTitle || "General Application",
        company: selectedJob.company || "Careerly",
        resumeName: resume.name,
        submittedAt: new Date().toISOString(),
        status: "Submitted",
      };

      const existingApplications = JSON.parse(
        localStorage.getItem("careerly-applications") || "[]"
      );

      if (!Array.isArray(existingApplications)) {
        throw new Error("Invalid application storage");
      }

      existingApplications.push(application);

      localStorage.setItem(
        "careerly-applications",
        JSON.stringify(existingApplications)
      );

      setSubmitted(true);
    } catch {
      setError(
        "We couldn't save your application in this browser. Please check your browser storage and try again."
      );
    }
  };

  const removeResume = () => {
    setResume(null);

    const input = document.getElementById(
      "resume-upload"
    ) as HTMLInputElement | null;

    if (input) input.value = "";
  };

  if (submitted) {
    return (
      <div className="apply-page">
        <Navbar />

        <main className="apply-success-wrap">
          <div className="apply-success-card">
            <div className="apply-success-icon">
              <CheckCircle2 size={42} />
            </div>

            <span className="apply-eyebrow">APPLICATION RECEIVED</span>
            <h1>Application submitted!</h1>

            <p className="apply-success-description">
              Thank you, {name.trim()}. Your application has been saved in
              this browser for this demo.
            </p>

            <div className="apply-success-job">
              <div className="apply-success-job-icon">
                <BriefcaseBusiness size={21} />
              </div>
              <div>
                <strong>
                  {selectedJob.jobTitle || "General Application"}
                </strong>
                <span>{selectedJob.company || "Careerly"}</span>
              </div>
              <CheckCircle2 size={20} className="apply-success-check" />
            </div>

            <div className="apply-success-note">
              <ShieldCheck size={18} />
              <span>
                This is a demo submission. No employer has received your
                application yet.
              </span>
            </div>

            <div className="apply-success-actions">
              <Link to="/jobs" className="apply-primary-button">
                Browse more jobs <ArrowRight size={17} />
              </Link>

              <button
                type="button"
                className="apply-secondary-button"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="apply-page">
      <Navbar />

      <div className="apply-topbar">
        <div className="apply-container">
          <Link
            to={selectedJob.jobId ? `/jobs/${selectedJob.jobId}` : "/jobs"}
            className="apply-back-link"
          >
            <ArrowLeft size={16} />
            {selectedJob.jobId ? "Back to job details" : "Back to jobs"}
          </Link>

          <span className="apply-step-label">APPLICATION FORM</span>
        </div>
      </div>

      <main className="apply-container apply-main">
        <header className="apply-heading">
          <span className="apply-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h1>Apply for your next opportunity.</h1>
          <p>
            Share your details and resume to complete your job application.
          </p>
        </header>

        <div className="apply-layout">
          <section className="apply-form-card">
            <div className="apply-form-heading">
              <div className="apply-form-heading-icon">
                <UserRound size={21} />
              </div>

              <div>
                <h2>Your application</h2>
                <p>Fields marked with * are required.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="apply-field">
                <label htmlFor="applicant-name">Full name *</label>
                <div className="apply-input-wrap">
                  <UserRound size={17} />
                  <input
                    id="applicant-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div className="apply-form-row">
                <div className="apply-field">
                  <label htmlFor="applicant-email">Email address *</label>
                  <div className="apply-input-wrap">
                    <Mail size={17} />
                    <input
                      id="applicant-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="apply-field">
                  <label htmlFor="applicant-phone">Phone number *</label>
                  <div className="apply-input-wrap">
                    <Phone size={17} />
                    <input
                      id="applicant-phone"
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="apply-field">
                <label>Resume / CV *</label>

                <label
                  htmlFor="resume-upload"
                  className={`apply-upload-box ${resume ? "has-file" : ""}`}
                >
                  {resume ? (
                    <div className="apply-uploaded-file">
                      <div className="apply-file-icon">
                        <FileText size={23} />
                      </div>

                      <div className="apply-file-info">
                        <strong>{resume.name}</strong>
                        <span>
                          {(resume.size / 1024).toFixed(0)} KB · Ready to submit
                        </span>
                      </div>

                      <button
                        type="button"
                        className="apply-remove-file"
                        aria-label="Remove resume"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeResume();
                        }}
                      >
                        <X size={17} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="apply-upload-icon">
                        <Upload size={23} />
                      </div>
                      <strong>Click to upload your resume</strong>
                      <span>PDF or Word document · Maximum 5 MB</span>
                    </>
                  )}

                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleResumeChange}
                    required={!resume}
                  />
                </label>
              </div>

              <div className="apply-field">
                <label htmlFor="cover-letter">
                  Cover letter <span className="apply-optional">(Optional)</span>
                </label>
                <textarea
                  id="cover-letter"
                  rows={5}
                  placeholder="Tell the employer a little about yourself and why you're interested in this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  maxLength={2000}
                />
                <div className="apply-character-count">
                  {coverLetter.length}/2000 characters
                </div>
              </div>

              {error && (
                <div className="apply-error" role="alert">
                  <X size={17} />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="apply-submit-button">
                Submit application <ArrowRight size={18} />
              </button>

              <p className="apply-privacy-note">
                <ShieldCheck size={16} />
                Your details will be stored locally in this browser demo.
              </p>
            </form>
          </section>

          <aside className="apply-sidebar">
            <section className="apply-job-summary">
              <span className="apply-sidebar-label">YOU'RE APPLYING FOR</span>

              <div className="apply-summary-icon">
                <BriefcaseBusiness size={25} />
              </div>

              <h2>{selectedJob.jobTitle || "General Application"}</h2>
              <p className="apply-summary-company">
                {selectedJob.company || "Careerly"}
              </p>

              <div className="apply-summary-divider" />

              <div className="apply-summary-row">
                <CheckCircle2 size={17} />
                <span>Review your details before submitting.</span>
              </div>

              <div className="apply-summary-row">
                <CheckCircle2 size={17} />
                <span>Upload an up-to-date resume.</span>
              </div>

              <div className="apply-summary-row">
                <CheckCircle2 size={17} />
                <span>Use a professional email address.</span>
              </div>
            </section>

            <section className="apply-help-card">
              <div className="apply-help-icon">
                <FileText size={20} />
              </div>
              <h3>Make your application stand out</h3>
              <p>
                Use a clear resume, check your contact information, and
                tailor your cover letter to the position.
              </p>
              <Link to="/jobs">
                Explore other jobs <ArrowRight size={15} />
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Apply;
