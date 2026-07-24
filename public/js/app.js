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
                window.location.href = "hospital-list.html";
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
        const phone = document.getElementById("phone").value;
        const hospital = document.getElementById("hospital").value;
        const doctor = document.getElementById("doctor").value;
        const appointmentDate = document.getElementById("appointmentDate").value;
        const appointmentTime = document.getElementById("appointmentTime").value;

        // Allow appointments only between 10:00 AM and 3:00 PM
        if (appointmentTime < "10:00" || appointmentTime > "15:00") {
            alert("Appointments can only be booked between 10:00 AM and 3:00 PM.");
            return;
        }

        const bookingNumber = "HSP" + Math.floor(100000 + Math.random() * 900000);

        const appointment = {
            bookingNumber,
            patientName,
            phone,
            hospital,
            doctor,
            appointmentDate,
            appointmentTime,
            status: "Pending"
        };

        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);

        localStorage.setItem("appointments", JSON.stringify(appointments));

        // Save latest appointment for confirmation page
        localStorage.setItem("bookingNumber", bookingNumber);
        localStorage.setItem("patientName", patientName);
        localStorage.setItem("phone", phone);
        localStorage.setItem("hospital", hospital);
        localStorage.setItem("doctor", doctor);
        localStorage.setItem("appointmentDate", appointmentDate);
        localStorage.setItem("appointmentTime", appointmentTime);

        alert("Appointment Booked Successfully!");
        window.location.href = "appointment-success.html";
    });
} 

});