import React from "react";
import Dashboard from "../components/Dashboard";
import CreateConference from "../components/CreateConference";
import Sidenav from "../components/Sidenav";
import Contacts from "../components/Contacts";
import ConferenceTemplates from "../components/ConferenceTemplates";
import { Routes, Route } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Sidenav />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/createConference" element={<CreateConference />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route
          path="/conferenceTemplates"
          element={<ConferenceTemplates />}
        ></Route>
      </Routes>
    </div>
  );
}
