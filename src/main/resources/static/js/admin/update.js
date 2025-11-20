export async function loadUpdateRequests(section) {
  section.innerHTML = "<p class='text-gray-500'>Loading in-progress requests...</p>";

  const res = await fetch("/api/admin/requests/in-progress", { credentials: "include" });
  if (!res.ok) {
    section.innerHTML = "<p class='text-red-600'>Failed to load data.</p>";
    return;
  }

  const data = await res.json();
  if (!data.length) {
    section.innerHTML = "<p class='text-gray-500'>No requests currently in progress.</p>";
    return;
  }

  section.innerHTML = `<h2 class='text-xl font-bold mb-4'>In Progress</h2>`;
  data.forEach(req => {
    section.innerHTML += `
      <div class="bg-blue-100 p-4 rounded-lg shadow mb-3">
        <p><strong>Request ID:</strong> ${req.requestId}</p>
        <p><strong>User:</strong> ${req.user.name}</p>
        <p><strong>Clothes:</strong> ${req.numClothes}</p>
        <p><strong>Info:</strong> ${req.additionalInfo || "N/A"}</p>
        <button class="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          onclick="updateStatus(${req.requestId}, 'COMPLETED')">Mark as Completed</button>
      </div>`;
  });
}

window.updateStatus = async (id, status) => {
  const res = await fetch(`/api/admin/requests/${id}/status?value=${status}`, {
    method: "PUT",
    credentials: "include"
  });

  if (res.ok) {
    alert("✅ Updated successfully!");
    location.reload();
  } else {
    alert("❌ Failed to update.");
  }
};
