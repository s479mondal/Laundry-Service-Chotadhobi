export async function loadAdminHistory(section) {
  section.innerHTML = "<p class='text-gray-500'>Loading history...</p>";

  const res = await fetch("/api/admin/requests/history", { credentials: "include" });
  if (!res.ok) {
    section.innerHTML = "<p class='text-red-600'>Failed to load history.</p>";
    return;
  }

  const data = await res.json();
  if (!data.length) {
    section.innerHTML = "<p class='text-gray-500'>No completed or rejected requests.</p>";
    return;
  }

  section.innerHTML = `<h2 class='text-xl font-bold mb-4'>Completed / Rejected</h2>`;
  data.forEach(req => {
    const color = req.status === "COMPLETED" ? "bg-green-50" : "bg-red-50";
    section.innerHTML += `
      <div class="${color} p-4 rounded-lg shadow mb-3">
        <p><strong>Request ID:</strong> ${req.requestId}</p>
        <p><strong>User:</strong> ${req.user.name}</p>
        <p><strong>Status:</strong> ${req.status}</p>
        <p><strong>Clothes:</strong> ${req.numClothes}</p>
        <p><strong>Info:</strong> ${req.additionalInfo || "N/A"}</p>
        <p><strong>Updated At:</strong> ${new Date(req.updatedAt).toLocaleString()}</p>
      </div>`;
  });
}
