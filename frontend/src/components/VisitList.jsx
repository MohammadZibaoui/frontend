import React from "react";

export default function VisitsList({ visits, refresh, apiUrl }) {
  async function handleDelete(id) {
    const ok = confirm("Confirma excluir?");
    if (!ok) return;
    await fetch(`${apiUrl}/visits/${id}`, { method: "DELETE" });
    refresh();
  }

  async function handleUpdate(id) {
    const novo = prompt("Novo título:");
    if (!novo) return;
    await fetch(`${apiUrl}/visits/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: novo }),
    });
    refresh();
  }

  async function checkDistance(id) {
    // exemplo: pede permissão de geolocalização do navegador (fallback simples)
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      // use coordenadas fixas para destino quando não houver lat/lon salvo
      const visit = visits.find((v) => v.id === id);
      const dest =
        visit && visit.lat && visit.lon
          ? { lat: visit.lat, lon: visit.lon }
          : { lat: -19.9, lon: -43.9 };
      const res = await fetch(`${apiUrl}/visits/${id}/distance-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin: { lat, lon }, destination: dest }),
      });
      if (res.ok) {
        const data = await res.json();
        alert(`Distância: ${data.distance_km} km`);
      } else {
        alert("Erro ao checar distância");
      }
    });
  }

  return (
    <div>
      <h3>Visitas (GET)</h3>
      <ul>
        {visits.map((v) => (
          <li key={v.id} style={{ marginBottom: 6 }}>
            <strong>{v.title}</strong> - {v.date || "sem data"}
            <br />
            <button onClick={() => handleUpdate(v.id)}>Editar (PUT)</button>
            <button onClick={() => handleDelete(v.id)}>Excluir (DELETE)</button>
            <button onClick={() => checkDistance(v.id)}>
              Checar distância
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
