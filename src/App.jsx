import "./App.css";

export default function App() {
  return (
    <main className="page">
      <section className="card">
        <h1>Mi app estática</h1>
        <p>
          Desplegada con Vite a <code>dist/</code>, subida a S3 y servida por CloudFront.
        </p>
        <p className="muted">
          Cada push a GitHub ejecuta build, upload e invalidación del CDN. Funcionara?
        </p>
      </section>
    </main>
  );
}
