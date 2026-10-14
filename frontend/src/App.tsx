
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import About from "./pages/About";
import SavedJobs from "./pages/SavedJobs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Job application routes */}
        <Route path="/apply" element={<Apply />} />
        <Route path="/apply/:id" element={<Apply />} />

        <Route path="/companies" element={<Companies />} />
        <Route path="/about" element={<About />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
