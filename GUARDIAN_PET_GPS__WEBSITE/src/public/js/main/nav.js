document.addEventListener("DOMContentLoaded", () => {
    const navList = document.querySelector(".navigation ul");
    const loginBtn = navList.querySelector('a[href="/login"]');
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && loginBtn) {
        const profileLink = document.createElement("a");
        profileLink.className = "page-btn active";
        profileLink.textContent = "Mi Perfil";
        if (user.rol === "admin") {
            profileLink.href = "/perfil-admin";
        } else {
            profileLink.href = "/perfil-usuario";
        }
        loginBtn.replaceWith(profileLink);
    }
});

function toggleMenu() {
    const toggleMenu = document.querySelector(".toggle-menu");
    const navigation = document.querySelector(".navigation");
    toggleMenu.classList.toggle("active");
    navigation.classList.toggle("active");
}

function lightDark() {
    const lightDark = document.querySelector(".lightDark");
    lightDark.classList.toggle("active");
    let element = document.body;
    element.classList.toggle("dark-mode");
}
