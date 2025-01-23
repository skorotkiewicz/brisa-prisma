import type { WebContext } from "brisa";

export default function Counter(
  { initialValue = 0 }: { initialValue: number },
  { state }: WebContext,
) {
  const count = state(initialValue);

  return (
    <div class="counter">
      <div class="counter-container">
        <h2>Client counter</h2>
        <button
          type="button"
          class="increment-button"
          onClick={() => count.value++}
        />
        <div class="counter-value">{count.value}</div>
        <button
          type="button"
          class="decrement-button"
          onClick={() => count.value--}
        />
      </div>
    </div>
  );
}
