// --- REGISTRATION FUNCTION ---
function register(event) {
    event.preventDefault();
  
    const user = {
      fullName: document.getElementById("fullName").value.trim(),
      schoolName: document.getElementById("schoolName").value.trim(),
      classGrade: document.getElementById("classGrade").value.trim(),
      age: document.getElementById("age").value.trim(),
      gender: document.getElementById("gender").value,
      email: document.getElementById("email").value.trim(),
      username: document.getElementById("registerUsername").value.trim(),
      password: document.getElementById("registerPassword").value.trim()
    };
  
    // Basic validation
    if (
      !user.fullName ||
      !user.schoolName ||
      !user.classGrade ||
      !user.age ||
      !user.gender ||
      !user.username ||
      !user.password
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    localStorage.setItem("sdgUser", JSON.stringify(user));
    alert("Registration successful!");
    window.location.href = "index.html";
  }
  
  // --- LOGIN FUNCTION ---
  function login(event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const stored = JSON.parse(localStorage.getItem("sdgUser"));
  
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (stored && stored.username === username && stored.password === password) {
      localStorage.setItem("sdgSession", "true"); // ✅ Session flag
      window.location.href = "dashboard.html";
    } else {
      alert("Incorrect username or password!");
    }
  }
  
  // --- DASHBOARD AUTH GUARD + PROFILE & LOGOUT BUTTONS ---
  if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("sdgSession") !== "true") {
      alert("Please login to access the dashboard.");
      window.location.href = "index.html";
    }
  
    const header = document.querySelector("header");
  
    // --- Profile Button ---
    const profileBtn = document.createElement("button");
    profileBtn.innerText = "Profile";
    profileBtn.className = "profile-btn";
    profileBtn.style.marginRight = "10px";
    profileBtn.onclick = () => {
    window.location.href = "profile.html";
    };
    header.appendChild(profileBtn);

  
    // --- Logout Button ---
    const logoutBtn = document.createElement("button");
    logoutBtn.innerText = "Logout";
    logoutBtn.className = "logout-btn";
    logoutBtn.onclick = () => {
      localStorage.removeItem("sdgSession");
      window.location.href = "index.html";
    };
    header.appendChild(logoutBtn);
  }
  
  // --- DASHBOARD CONTENT ---
  if (document.getElementById("dashboard")) {
    const goals = [
      "No Poverty", "Zero Hunger", "Good Health and Well-being", "Quality Education",
      "Gender Equality", "Clean Water and Sanitation", "Affordable and Clean Energy",
      "Decent Work and Economic Growth", "Industry, Innovation and Infrastructure",
      "Reduced Inequality", "Sustainable Cities and Communities",
      "Responsible Consumption and Production", "Climate Action", "Life Below Water",
      "Life on Land", "Peace, Justice and Strong Institutions", "Partnerships for the Goals"
    ];
  
    const dashboard = document.getElementById("dashboard");
    const goalContent = document.getElementById("goalContent");
  
    goals.forEach((goal, i) => {
      const div = document.createElement("div");
      div.className = "goal";
      div.innerHTML = `<h3>Goal ${i + 1}</h3><p>${goal}</p>`;
      div.onclick = () => showGoal(i + 1, goal);
      dashboard.appendChild(div);
    });
  
    function showGoal(num, title) {
      dashboard.style.display = "none";
      goalContent.innerHTML = `
        <div class="goal-page">
          <h2>Goal ${num}: ${title}</h2>
          <video controls>
            <source src="videos/goal${num}.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <p><strong>${title}</strong> is essential for a sustainable world. Learn and act!</p>
          <button class="back-btn" onclick="goBack()">⬅ Back</button>
        </div>
      `;
    }
  
    window.goBack = function () {
      goalContent.innerHTML = "";
      dashboard.style.display = "grid";
    };
  
    // --- Display Profile Info ---
    const profile = JSON.parse(localStorage.getItem("sdgUser"));
    if (profile && document.getElementById("profileInfo")) {
      document.getElementById("profileInfo").innerHTML = `
        <p><strong>Full Name:</strong> ${profile.fullName}</p>
        <p><strong>School:</strong> ${profile.schoolName}</p>
        <p><strong>Class/Grade:</strong> ${profile.classGrade}</p>
        <p><strong>Age:</strong> ${profile.age}</p>
        <p><strong>Gender:</strong> ${profile.gender}</p>
        <p><strong>Email:</strong> ${profile.email || "N/A"}</p>
        <p><strong>Username:</strong> ${profile.username}</p>
      `;
    }
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js").then(() => {
          console.log("Service Worker Registered");
        });
      }      
  }
  