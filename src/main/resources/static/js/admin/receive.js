export async function loadReceiveRequests(section) {
  section.innerHTML = "<p class='text-gray-500'>Loading pending requests...</p>";

  const res = await fetch("/api/admin/requests/pending", { credentials: "include" });
  if (!res.ok) {
    section.innerHTML = "<p class='text-red-600'>Failed to load pending requests.</p>";
    return;
  }

  const data = await res.json();
  if (!data.length) {
    section.innerHTML = "<p class='text-gray-500'>No pending requests right now.</p>";
    return;
  }

  section.innerHTML = `<h2 class='text-xl font-bold mb-4'>Pending Requests</h2>`;

  data.forEach(req => {
    section.innerHTML += `
      <div class="bg-yellow-100 p-4 rounded-lg shadow mb-3">
        <p><strong>Request ID:</strong> ${req.requestId}</p>
        <p><strong>User ID:</strong> ${req.user.userId}</p>
        <p><strong>Name:</strong> ${req.user.name}</p>
        <p><strong>Clothes:</strong> ${req.numClothes}</p>
        <p><strong>Info:</strong> ${req.additionalInfo || "N/A"}</p>
        <div class="mt-2 flex gap-3">
          <button class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            onclick="updateStatus(${req.requestId}, 'IN_PROGRESS')">Accept</button>
          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onclick="updateStatus(${req.requestId}, 'REJECTED')">Reject</button>
        </div>
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
