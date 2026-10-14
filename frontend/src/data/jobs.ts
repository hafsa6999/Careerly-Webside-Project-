export type Job = {
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

export const jobs: Job[] = [
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
    description: "Build modern, responsive web applications using React and TypeScript.",
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
    description: "Design intuitive user experiences and polished digital products.",
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
    description: "Work with an experienced engineering team to develop React applications.",
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
    description: "Plan digital campaigns and improve brand reach across online channels.",
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
    description: "Develop secure APIs and scalable backend services for web products.",
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
    description: "Create engaging visual assets for marketing and brand campaigns.",
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
    description: "Support recruitment, candidate communication, and onboarding activities.",
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
    description: "Help analyze datasets and create useful reports for business teams.",
    skills: ["Excel", "SQL", "Data Analysis"],
    logo: "I",
  },
];