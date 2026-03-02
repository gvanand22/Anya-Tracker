import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import Activity from "./pages/activity";
import Analytics from "./pages/analytics";
import Goals from "./pages/goals";
import Settings from "./pages/settings";

function App() {
  return (
    <Router>
      <div className="navi">
        <nav className="nav_Bar" id="nav-Bar">
          <ul>
            <li>AnRun</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/activity">Activity</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/goals">Goals</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App;