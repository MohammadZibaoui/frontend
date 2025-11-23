import React, { useState } from "react";

export default function VisitForm({ onCreated, apiUrl }) {
  const [title, setTitle] = useState("");
  const [cep, setCep] = useState("");

  async function handleCreate(e) {
    e.preventDefault();
    const payload = { title, cep };
    const res = await fetch(`${apiUrl}/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setTitle("");
      setCep("");
      onCreated();
    } else {
      alert("Erro ao criar visita");
    }
  }

  async function lookupCep() {
    if (!cep) return;
    const res = await fetch(`${apiUrl}/address/cep/${cep}`);
    if (!res.ok) {
      alert("CEP não encontrado");
      return;
    }
    const data = await res.json();
    alert(
      `${data.logradouro || ""} - ${data.bairro || ""} - ${data.localidade}/${
        data.uf
      }`
    );
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        <label>Título:</label>
        <br />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>CEP:</label>
        <br />
        <input value={cep} onChange={(e) => setCep(e.target.value)} />
        <button type="button" onClick={lookupCep}>
          Buscar CEP
        </button>
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit">Criar Visita (POST)</button>
      </div>
    </form>
  );
}
