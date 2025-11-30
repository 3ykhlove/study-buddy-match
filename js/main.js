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



/* ------------------------------------------------------
   FLOATING CURSOR BUBBLES (Added — original code unchanged)
------------------------------------------------------- */
document.addEventListener("mousemove", (e) => {
    const bubble = document.createElement("div");
    bubble.className = "cursor-bubble";

    bubble.style.left = e.clientX + "px";
    bubble.style.top = e.clientY + "px";

    document.body.appendChild(bubble);

    // small delay so transitions activate
    requestAnimationFrame(() => {
        bubble.style.transform = "translate(-50%, -50%) scale(1.6)";
        bubble.style.opacity = "0";
    });

    // remove after animation completes
    setTimeout(() => bubble.remove(), 1200);
});
