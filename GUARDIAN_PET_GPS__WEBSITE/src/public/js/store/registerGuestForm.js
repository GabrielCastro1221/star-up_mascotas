document.querySelector("#register-guest-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const guestId = localStorage.getItem("guestId");
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    guestId
  };

  const response = await fetch("/api/v1/users/register-guest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("user", JSON.stringify(data.usuario));
    window.location.href = `/cart/${data.cart._id}`;
  } else {
    alert(data.message || "Error al registrar usuario");
  }
});
