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
  }

  // Function to show sign-in form dynamically
  function showSignIn(event) {
      if (event) event.preventDefault(); // Prevent default anchor behavior
      // Show sign-in modal
      $('#signInModal').modal('show');
  }

  // Function to show sign-up form dynamically
  function showSignUp(event) {
      if (event) event.preventDefault(); // Prevent default anchor behavior
      // Show sign-up modal
      $('#signUpModal').modal('show');
  }

  // Handle sign-up form submission
  const signUpForm = document.getElementById("signUpForm");
  if (signUpForm) {
      signUpForm.addEventListener("submit", async function(event) {
          event.preventDefault(); // Prevent default form submission
          const formData = new FormData(signUpForm);
          const email = formData.get("email");
          const password = formData.get("password");
          try {
              const response = await fetch("/api/signup", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ email, password })
              });
              const data = await response.json();
              if (data.success) {
                  $('#signUpModal').modal('hide'); // Hide the sign-up modal
                  showHome(); // Redirect to the home page
              } else {
                  alert(data.message); // Show error message
              }
          } catch (error) {
              console.error("Error signing up:", error);
          }
      });
  }

  // Handle sign-in form submission
  const signInForm = document.getElementById("signInForm");
  if (signInForm) {
      signInForm.addEventListener("submit", async function(event) {
          event.preventDefault(); // Prevent default form submission
          const formData = new FormData(signInForm);
          const email = formData.get("email");
          const password = formData.get("password");
          try {
              const response = await fetch("/api/signin", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ email, password })
              });
              const data = await response.json();
              if (data.success) {
                  $('#signInModal').modal('hide'); // Hide the sign-in modal
                  showHome(); // Redirect to the home page
              } else {
                  alert(data.message); // Show error message
              }
          } catch (error) {
              console.error("Error signing in:", error);
          }
      });
  }

  // Show home content by default when the page loads
  showHome();
});