import {Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return(
    <Router>
      <div className="navi">
        <nav className="nav_Bar" id="nav-Bar">
          <ul>
            <li>AnRun</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Activity</Link></li>
            <li><Link to="/">Analytics</Link></li>
            <li><Link to="/">Goals</Link></li>
            <li><Link to="/">Settings</Link></li>
          </ul>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </nav>
      </div>
    </Router>
  )
}