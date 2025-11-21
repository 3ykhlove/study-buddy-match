document.addEventListener("DOMContentLoaded", function () {
    const savedUser = localStorage.getItem("user");
    console.log(savedUser);
    const signUpBtn = document.getElementById("signUpBtn");

    // menu btn
    const profileMenu = document.getElementById("profileMenu");
    const profileBtn = document.getElementById("profileBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const profileCircle = document.getElementById("profileCircle");
    const profileName = document.getElementById("profileName");
    const logoutBtn = document.getElementById("logoutBtn");


    // index
    if (signUpBtn) {
        if(savedUser) {
            // user exists
            signUpBtn.textContent = "Make a Group";
            signUpBtn.classList.remove("btn-accent");
            signUpBtn.classList.add("border-mint");

            //
            signUpBtn.addEventListener("click", () => {
                window.location.href = "./group.html";
            });
        } else {
            // no user
            signUpBtn.addEventListener("click", () => {
                window.location.href = "./signin.html";
            });
        }
    }

    // menu
    if (savedUser) {
        // get user
        const user = JSON.parse(savedUser);

        // show profile
        profileMenu.style.display = "flex";

        // show initial
        const initial = user.fullName
            ? user.fullName.charAt(0).toUpperCase()
            : "?";
        profileCircle.textContent = initial;
        profileName.textContent = user.fullName;

        // if click profile, show dropdown menu
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdownMenu.style.display =
                dropdownMenu.style.display === "block" ? "none" : "block";
        });

        // close dropdown menu
        document.addEventListener("click", () => {
            dropdownMenu.style.display = "none";
        });

        // logout
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "./signin.html";
        });
    }
});