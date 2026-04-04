// Digital School
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.content-panel');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            panels[index].classList.add('active');
        });
    });

    
    document.querySelector(".login-button").addEventListener("click", function(e) {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Simple login check
    if (username === "admin" && password === "1234") {
        
        // Save login status
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to homepage
        window.location.href = "ptomhomepage.html";

    } else {
        alert("Invalid Username or Password ❌");
    }
}); 
        });
    
    
