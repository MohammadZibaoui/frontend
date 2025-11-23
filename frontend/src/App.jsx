import React, { useState, useEffect } from "react";
import VisitForm from "./components/VisitForm";
import VisitsList from "./components/VisitsList";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [visits, setVisits] = useState([]);

  const fetchVisits = async () => {
    const res = await fetch(`${API}/visits`);
    const data = await res.json();
    setVisits(data);
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>VisitaUp</h1>
      <VisitForm onCreated={fetchVisits} apiUrl={API} />
      <hr />
      <VisitsList visits={visits} refresh={fetchVisits} apiUrl={API} />
    </div>
  );
}
