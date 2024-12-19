// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function() {
  // Select navigation link elements
  const homeLink = document.querySelector("a[href='#home']");
  const signInLink = document.querySelector("a[href='#signIn']");
  const signUpLink = document.querySelector("a[href='#signUp']");
  const contentArea = document.querySelector(".content");
  const cryptoSearch = document.getElementById("cryptoSearch");
  const cryptoDetails = document.getElementById("cryptoDetails");

  // Add event listeners to navigation links
  homeLink.addEventListener("click", showHome);
  signInLink.addEventListener("click", showSignIn);
  signUpLink.addEventListener("click", showSignUp);

  // Add event listener for cryptocurrency search input
  cryptoSearch.addEventListener("input", async function() {
    const query = cryptoSearch.value;
    if (query.length > 2) {
      try {
        const response = await fetch(`/api/crypto?query=${query}`);
        const data = await response.json();
        displayCryptoDetails(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    }
  });

  // Function to display cryptocurrency details
  function displayCryptoDetails(data) {
    cryptoDetails.innerHTML = `
      <h2>${data.name}</h2>
      <p>Current Price: ${data.current_price}</p>
      <p>Market Cap: ${data.market_cap}</p>
      <!-- Add more details as needed -->
    `;
  }

  // Function to show home content dynamically
  function showHome(event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Clear any existing content
    contentArea.innerHTML = "";

    // Create and append home content
    const homeContent = document.createElement("div");
    homeContent.innerHTML = `
      <h1>Welcome to CryptoWatch</h1>
      <p>Track your favorite cryptocurrencies in real-time.</p>
    `;
    contentArea.appendChild(homeContent);
  }

  // Function to show sign-in form dynamically
  function showSignIn(event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Clear any existing content
    contentArea.innerHTML = "";

    // Create and append sign-in form
    const signInForm = document.createElement("div");
    signInForm.innerHTML = `
      <h2>Sign In</h2>
      <form id="signInForm">
        <div class="form-group">
          <label for="signInEmail">Email address</label>
          <input type="email" class="form-control" id="signInEmail" required>
        </div>
        <div class="form-group">
          <label for="signInPassword">Password</label>
          <input type="password" class="form-control" id="signInPassword" required>
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
      </form>
    `;
    contentArea.appendChild(signInForm);

    // Add event listener for form submission
    document.getElementById("signInForm").addEventListener("submit", handleSignIn);
  }

  // Function to handle sign-in form submission
  function handleSignIn(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    // Perform sign-in logic here (e.g., API call)
    console.log("Sign In:", email, password);
  }

  // Function to show sign-up form dynamically
  function showSignUp(event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Clear any existing content
    contentArea.innerHTML = "";

    // Create and append sign-up form
    const signUpForm = document.createElement("div");
    signUpForm.innerHTML = `
      <h2>Sign Up</h2>
      <form id="signUpForm">
        <div class="form-group">
          <label for="signUpEmail">Email address</label>
          <input type="email" class="form-control" id="signUpEmail" required>
        </div>
        <div class="form-group">
          <label for="signUpPassword">Password</label>
          <input type="password" class="form-control" id="signUpPassword" required>
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </form>
    `;
    contentArea.appendChild(signUpForm);

    // Add event listener for form submission
    document.getElementById("signUpForm").addEventListener("submit", handleSignUp);
  }

  // Function to handle sign-up form submission
  function handleSignUp(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    // Perform sign-up logic here (e.g., API call)
    console.log("Sign Up:", email, password);
  }

  // Show home content by default when the page loads
  showHome();
});

