# VisitaUp - Frontend

## Descrição

Frontend o MVP VisitaUp. Fornece formulário para criar visitas, listar, editar e excluir.
Demonstra chamadas HTTP: GET, POST, PUT, DELETE.

## Para rodar local (dev)

1. `npm install`
2. `npm run dev`
   Abra `http://localhost:5173`

## Para buildar e rodar (produção)

1. `npm run build`
2. Servir a pasta `dist` com um servidor estático (nginx, serve, etc)

## Docker

Build: `docker build -t visita-frontend .`
Run: `docker run -p 3000:80 visita-frontend`

## Variáveis

- `VITE_API_URL` pode ser definido em `.env` 

