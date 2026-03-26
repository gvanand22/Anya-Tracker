//app.js
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faPersonRunning } from "@fortawesome/free-solid-svg-icons";

// user files linking
import Home from "./pages/home";
import Activity from "./pages/activity";
import Analytics from "./pages/analytics";
import Goals from "./pages/goals";
import Settings from "./pages/settings";
import ExchangeToken from "./pages/ExchangeToken";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Router>
      <div className="navi">
        <nav className="nav_Bar" id="nav-Bar">
          <div className="an_Logo">
            <FontAwesomeIcon icon={faPersonRunning} className="run_Log"/>
            AnRun
          </div>
          <div className="ham_Brg" onClick={()=> setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={isOpen ? faXmark:faBars}/>
          </div>
          <ul className={isOpen ? "nav-Links active" : "nav-Links"}>
            <li><Link to="/" onClick={()=>setIsOpen(false)}>Home</Link></li>
            <li><Link to="/activity" onClick={()=>setIsOpen(false)}>Activity</Link></li>
            <li><Link to="/analytics" onClick={()=>setIsOpen(false)}>Analytics</Link></li>
            <li><Link to="/goals" onClick={()=>setIsOpen(false)}>Goals</Link></li>
            <li><Link to="/settings" onClick={()=>setIsOpen(false)}>Settings</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/exchange_token" element={<ExchangeToken />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App;