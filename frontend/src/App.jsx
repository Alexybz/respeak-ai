import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import Home from "./pages/Home/Home";
import Learn from "./pages/Learn";
import Chat from "./pages/Chat";
import Test from "./pages/Test";
import Profile from "./pages/Profile";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/test" element={<Test />} />
                <Route path ="/profile" element={<Profile/>}/>
            </Routes>
        </Router>
    );
}

export default App;
