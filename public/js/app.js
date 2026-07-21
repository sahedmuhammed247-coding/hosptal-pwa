document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // Register Form
    // ==========================
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("phone", phone);
            localStorage.setItem("password", password);

            alert("Registration Successful!");
            window.location.href = "login.html";
        });
    }

    // ==========================
    // Login Form
    // ==========================
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (
                email === localStorage.getItem("email") &&
                password === localStorage.getItem("password")
            ) {
                alert("Login Successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid Email or Password!");
            }
        });
    }

    // ==========================
    // Logout
    // ==========================
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();

            alert("Logged Out Successfully!");
            window.location.href = "login.html";
        });
    }

    // ==========================
    // Appointment Form
    // ==========================
    const appointmentForm = document.getElementById("appointmentForm");

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const patientName = document.getElementById("patientName").value;
            const appointmentDate = document.getElementById("appointmentDate").value;
            const doctor = document.getElementById("doctor").value;

            const bookingNumber = "HSP" + Math.floor(Math.random() * 1000000);

            const appointment = {
                bookingNumber: bookingNumber,
                patientName: patientName,
                doctor: doctor,
                appointmentDate: appointmentDate,
                status: "Pending"
            };

            let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

            appointments.push(appointment);

            localStorage.setItem("appointments", JSON.stringify(appointments));

            // Save latest appointment for confirmation page
            localStorage.setItem("bookingNumber", bookingNumber);
            localStorage.setItem("patientName", patientName);
            localStorage.setItem("doctor", doctor);
            localStorage.setItem("appointmentDate", appointmentDate);

            window.location.href = "appointment-success.html";
        });
    }

});