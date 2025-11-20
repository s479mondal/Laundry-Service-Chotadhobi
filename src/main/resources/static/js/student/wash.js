export function loadWashForm(section) {
  section.innerHTML = `
    <div class="bg-white shadow-xl rounded-2xl p-6 max-w-md mx-auto">
      <h2 class="text-2xl font-semibold mb-4 text-center text-indigo-700">🧺 Create Wash Request</h2>
      <form id="washForm" class="space-y-4">
        <input type="number" name="num_clothes" placeholder="Number of Clothes" required
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400" />
        <textarea name="additional_info" placeholder="Additional Information"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"></textarea>
        <button type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow-md transition">
          Submit Request
        </button>
      </form>
      <div id="washMessage" class="mt-4 text-center font-semibold"></div>
    </div>
  `;

  const form = document.getElementById("washForm");
  const msg = document.getElementById("washMessage");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
      numClothes: e.target.num_clothes.value,
      additionalInfo: e.target.additional_info.value
    };

    msg.textContent = "⏳ Submitting...";
    msg.className = "text-blue-500 font-semibold";

    try {
      const res = await fetch("/api/wash/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
      });

      const text = await res.text();
      if (res.ok) {
        msg.textContent = "✅ Request submitted successfully!";
        msg.className = "text-green-600 font-semibold";
        form.reset();
      } else {
        msg.textContent = "❌ Failed: " + text;
        msg.className = "text-red-600 font-semibold";
      }
    } catch (err) {
      msg.textContent = "❌ " + err.message;
      msg.className = "text-red-600 font-semibold";
    }
  });
}
