document.addEventListener("DOMContentLoaded", function() {
  // Select navigation link elements
  const homeLink = document.querySelector("a[href='#home']");
  const signInLink = document.querySelector("a[href='#signIn']");
  const signUpLink = document.querySelector("a[href='#signUp']");
  const contentArea = document.querySelector(".content");
  const cryptoSearch = document.getElementById("cryptoSearch");
  const cryptoDetails = document.getElementById("cryptoDetails");

  // Add event listeners to navigation links
  if (homeLink) homeLink.addEventListener("click", showHome);
  if (signInLink) signInLink.addEventListener("click", showSignIn);
  if (signUpLink) signUpLink.addEventListener("click", showSignUp);

  // Add event listener for cryptocurrency search input
  if (cryptoSearch) {
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
  }

  // Function to display cryptocurrency details
  function displayCryptoDetails(data) {
    if (cryptoDetails) {
      cryptoDetails.innerHTML = `
        <h2>${data.name}</h2>
        <p>Current Price: ${data.current_price}</p>
        <p>Market Cap: ${data.market_cap}</p>
        <!-- Add more details as needed -->
      `;
    }
  }

  // Function to show home content dynamically
  function showHome(event) {
    if (event) event.preventDefault(); // Prevent default anchor behavior

    // Check if the user is signed in
    const isSignedIn = localStorage.getItem("isSignedIn");
    if (!isSignedIn) {
      // Show options to sign in or sign up
      contentArea.innerHTML = `
        <h1>Welcome to CryptoWatch</h1>
        <p>Please choose an option:</p>
        <button id="goToSignIn" class="btn btn-primary">Sign In</button>
        <button id="goToSignUp" class="btn btn-secondary">Sign Up</button>
      `;

      // Add event listeners to the buttons
      const goToSignInButton = document.getElementById("goToSignIn");
      const goToSignUpButton = document.getElementById("goToSignUp");
      if (goToSignInButton) goToSignInButton.addEventListener("click", showSignIn);
      if (goToSignUpButton) goToSignUpButton.addEventListener("click", showSignUp);
      return;
    }

    // Clear any existing content
    contentArea.innerHTML = "";

    // Create and append home content
    const homeContent = document.createElement("div");
    homeContent.innerHTML = `
      <h1>Welcome to CryptoWatch</h1>
      <p>Track your favorite cryptocurrencies in real-time.</p>
      <input type="text" id="cryptoSearch" class="form-control" placeholder="Search for a cryptocurrency...">
      <div id="cryptoDetails"></div>
    `;
    contentArea.appendChild(homeContent);

    // Add event listener for cryptocurrency search input
    const newCryptoSearch = document.getElementById("cryptoSearch");
    if (newCryptoSearch) {
      newCryptoSearch.addEventListener("input", async function() {
        const query = newCryptoSearch.value;
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
    }

    // Perform initial search for Bitcoin
    performSearch("Bitcoin");
  }

  // Function to perform a cryptocurrency search
  async function performSearch(query) {
    try {
      const response = await fetch(`/api/crypto?query=${query}`);
      const data = await response.json();
      displayCryptoDetails(data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  }

  // Function to show sign-in form dynamically
  function showSignIn(event) {
    if (event) event.preventDefault(); // Prevent default anchor behavior

    // Show sign-in modal
    $('#signInModal').modal('show');

    // Add event listener for form submission
    const signInForm = document.getElementById("signInForm");
    if (signInForm) {
      signInForm.addEventListener("submit", handleSignIn);
    }
  }

  // Function to handle sign-in form submission
  function handleSignIn(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    // Perform sign-in logic here (e.g., API call)
    console.log("Sign In:", email, password);

    // Simulate successful sign-in
    localStorage.setItem("isSignedIn", true);
    $('#signInModal').modal('hide');
    showHome();
  }

  // Function to show sign-up form dynamically
  function showSignUp(event) {
    if (event) event.preventDefault(); // Prevent default anchor behavior

    // Show sign-up modal
    $('#signUpModal').modal('show');

    // Add event listener for form submission
    const signUpForm = document.getElementById("signUpForm");
    if (signUpForm) {
      signUpForm.addEventListener("submit", handleSignUp);
    }
  }

  // Function to handle sign-up form submission
  function handleSignUp(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    // Perform sign-up logic here (e.g., API call)
    console.log("Sign Up:", email, password);

    // Simulate successful sign-up and redirect to sign-in
    $('#signUpModal').modal('hide');
    showSignIn();
  }

  // Show home content by default when the page loads
  showHome();
});