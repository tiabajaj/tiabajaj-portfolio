import { HashRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ProjectDetail from "./pages/ProjectDetail"

function Navbar() {
    return (
        <header className="nav">
            <Link to="/" className="nav-name">
                Tia Bajaj
            </Link>
        </header>
    )
}

export default function App() {
    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
            </Routes>
        </HashRouter>
    )
}
