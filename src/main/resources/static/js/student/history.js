export async function loadHistorySection(section) {
  section.innerHTML = "<p class='text-gray-500'>Loading...</p>";
  const res = await fetch("/api/wash/my-requests", { credentials: "include" });
  const data = await res.json();
  if (!data.length) {
    section.innerHTML = "<p class='text-gray-500'>No history found.</p>";
    return;
  }

  section.innerHTML = `<h2 class='text-xl font-bold mb-4'>Wash History</h2>`;
  data.filter(r => ["COMPLETED", "REJECTED"].includes(r.status))
    .forEach(req => {
      section.innerHTML += `
        <div class="p-4 rounded-lg shadow-md bg-green-50">
          <p><strong>Request ID:</strong> ${req.requestId}</p>
          <p><strong>Clothes:</strong> ${req.numClothes}</p>
          <p><strong>Status:</strong> ${req.status}</p>
          <p><strong>Requested:</strong> ${new Date(req.requestedAt).toLocaleString()}</p>
          <p><strong>Updated:</strong> ${new Date(req.updatedAt).toLocaleString()}</p>
        </div>`;
    });
}
