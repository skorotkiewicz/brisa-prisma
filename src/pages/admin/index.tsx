export function Head() {
  return <title id="title">Admin Brisa</title>;
}

export default function Admin() {
  return (
    <>
      <div class="hero">
        <h1>
          <span class="h1_addition">Admin </span>Brisa
        </h1>
        <p class="edit-note">✏️ Change this page on </p>
        <code>src/pages/admin/index.tsx</code>
      </div>
      <div class="about-sections">
        <section>
          <admin-animal />
        </section>
      </div>
    </>
  );
}
