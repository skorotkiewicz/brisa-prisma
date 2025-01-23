import type { Animal, AnimalInfo } from "@/types";
import type { Props, WebContext } from "brisa";

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export default async function AdminAnimal({}: Props, { state }: WebContext) {
  const animals = state(await fetch("/api/animal/admin").then((r) => r.json()));
  const currentAnimal = state<AnimalInfo | null>(null);
  const mode = state("add");

  async function onChange(e: Event) {
    const id = (e.target as HTMLSelectElement).value;
    const curr = await fetch(`/api/animal/${id}`).then((r) => r.json());
    currentAnimal.value = curr;
    mode.value = "edit";
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const url =
      mode.value === "add"
        ? "/api/animal/admin"
        : `/api/animal/admin/${currentAnimal.value?.id}`;
    const method = mode.value === "add" ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error("Something went wrong");

      // Refresh the list of animals
      const updatedAnimals = await fetch("/api/animal/admin").then((r) =>
        r.json(),
      );
      animals.value = updatedAnimals;

      // Reset form
      form.reset();
      currentAnimal.value = null;
      mode.value = "add";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleDelete() {
    if (!currentAnimal.value?.id) return;

    try {
      const response = await fetch(
        `/api/animal/admin/${currentAnimal.value.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete animal");

      // Refresh the list of animals
      const updatedAnimals = await fetch("/api/animal/admin").then((r) =>
        r.json(),
      );
      animals.value = updatedAnimals;

      // Reset form and state
      currentAnimal.value = null;
      mode.value = "add";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div class="admin-animal-container">
      <select class="admin-animal-select" onChange={onChange}>
        <option value="">Select an animal</option>
        {animals.value.map((animal: Animal) => (
          <option value={animal.id} key={animal.id}>
            {animal.name}
          </option>
        ))}
      </select>

      <form class="admin-animal-form" onSubmit={handleSubmit}>
        <h2>{mode.value === "add" ? "Add New Animal" : "Edit Animal"}</h2>

        <label class="admin-form-label">
          Name:
          <input
            class="admin-form-input"
            type="text"
            name="name"
            id="name"
            value={currentAnimal.value?.name || ""}
            required
          />
        </label>

        <label class="admin-form-label">
          Has tail:
          <input
            class="admin-form-checkbox"
            type="checkbox"
            name="hasTail"
            id="hasTail"
            checked={currentAnimal.value?.hasTail || false}
          />
        </label>

        <label class="admin-form-label">
          Image URL:
          <input
            class="admin-form-input"
            type="text"
            name="image"
            id="image"
            value={currentAnimal.value?.image || ""}
          />
        </label>

        <label class="admin-form-label">
          Abilities (comma-separated):
          <input
            class="admin-form-input"
            type="text"
            name="abilities"
            id="abilities"
            value={currentAnimal.value?.abilities?.join(", ") || ""}
          />
        </label>

        <div class="admin-form-buttons">
          <button class="admin-form-submit" type="submit">
            {mode.value === "add" ? "Add Animal" : "Update Animal"}
          </button>

          {mode.value === "edit" && (
            <button
              class="admin-form-delete"
              type="button"
              onClick={handleDelete}
            >
              Delete Animal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

AdminAnimal.suspense = () => <div>Loading Animals...</div>;

AdminAnimal.error = () => (
  <div style={{ color: "red" }}>Error loading animal data</div>
);
