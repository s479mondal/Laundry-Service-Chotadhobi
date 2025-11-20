export async function loadProgressSection(section) {
  section.innerHTML = "<p class='text-gray-500'>Loading...</p>";
  const res = await fetch("/api/wash/my-requests", { credentials: "include" });
  if (res.status === 401) {
    section.innerHTML = "<p class='text-red-600'>Please login again.</p>";
    return;
  }
  const data = await res.json();
  if (!data.length) {
    section.innerHTML = "<p class='text-gray-500'>No pending requests.</p>";
    return;
  }

  section.innerHTML = `<h2 class='text-xl font-bold mb-4'>In Progress / Pending</h2>`;
  data.filter(r => r.status !== "COMPLETED").forEach(req => {
    const color = req.status === "PENDING" ? "bg-yellow-100" : "bg-blue-100";
    section.innerHTML += `
      <div class="p-4 rounded-lg shadow-md ${color}">
        <p><strong>Request ID:</strong> ${req.requestId}</p>
        <p><strong>Clothes:</strong> ${req.numClothes}</p>
        <p><strong>Status:</strong> ${req.status}</p>
        <p><strong>Updated:</strong> ${new Date(req.updatedAt).toLocaleString()}</p>
      </div>`;
  });
}
