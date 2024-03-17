// Import Firebase modules using the correct URLs

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword , updateProfile ,sendEmailVerification ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc ,
  doc,
  addDoc,
  updateDoc ,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN2gBOxP5InheeIJKifz5rm14jR9V6RYI",
  authDomain: "boyo3-82b6c.firebaseapp.com",
  projectId: "boyo3-82b6c",
  storageBucket: "boyo3-82b6c.appspot.com",
  messagingSenderId: "739792907568",
  appId: "1:739792907568:web:d8e574a307a2c18523acf5",
  measurementId: "G-JE3CWQBZX7",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const firestore = getFirestore(app);

const auth = getAuth();


/* -----------------------------For Login Page---------------------- */
let  loginForm = document.querySelector(".loginPage");
if(loginForm){
  /* -----------------------------Login Form---------------------- */
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  
  togglePassword.addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
  
    // Toggle eye icons
    if (type === 'password') {
      togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
      togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
  });
  
  // Form submission
  const loginForm = document.querySelector('.loginForm');
  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
  
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      // Redirect to home page after successful login
      window.location.href = 'index.html';
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error: ${errorCode} - ${errorMessage}`);
      // Handle error, e.g., display an error message to the user
    }
  });
}
/* -----------------------------For Register Page---------------------- */
let registerPage = document.querySelector(".regesterPage")
if(registerPage) {
/* -----------------------------Register Form---------------------- */
document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.querySelector('.registerForm');
  const togglePasswordIcons = document.querySelectorAll('.toggle-password');
  const registerButton = document.getElementById('registerButton');

  togglePasswordIcons.forEach(icon => {
      icon.addEventListener('click', function () {
          const passwordInput = this.parentNode.querySelector('input');
          const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
          passwordInput.setAttribute('type', type);

          // Toggle eye icons
          if (type === 'password') {
              this.innerHTML = '<i class="fas fa-eye"></i>';
          } else {
              this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
          }
      });
  });

//   registerButton.addEventListener('click', async function () {
//     const name = document.getElementById('RegisterName').value;
//     const phoneNumber = document.getElementById('phonenumber').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         const uid = user.uid;
//         const userDocRef = doc(collection(firestore, "users"), uid);

//         await updateProfile(user, {
//             displayName: name
//         });

//         await setDoc(userDocRef, {
//             fullname: name,
//             phoneNumber: phoneNumber,
//             email: email,
//             id: uid,
//             isVerified: false,
//         });

//         // Send email verification
//         await sendEmailVerification(user);

//         alert('A verification email has been sent. Please verify your email before logging in.');

//         // Listen for changes in the user's email verification status
//         onAuthStateChanged(auth, async (user) => {
//             if (user && user.emailVerified) {
//                 // Update isVerified to true in Firestore
//                 await updateDoc(userDocRef, {
//                     isVerified: true
//                 });

//                 alert('User has been verified.');
//             }
//         });

//         window.location.href = 'login.html';
//     } catch (error) {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error(`Error: ${errorCode} - ${errorMessage}`);
//     }
// });

registerButton.addEventListener('click', async function () {
  const name = document.getElementById('RegisterName').value;
  const phoneNumber = document.getElementById('phonenumber').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
          displayName: name
      });

      const uid = user.uid;

      // Assign userDocRef here
      const userDocRef = doc(collection(firestore, "users"), uid);

      await setDoc(userDocRef, {
          fullname: name,
          phoneNumber: phoneNumber,
          email: email,
          id: uid,
          isVerified: false,
      });

      // Send email verification
      await sendEmailVerification(user);
      alert('A verification email has been sent. Please verify your email before logging in.');

      // Wait for email verification and update isVerified
      await waitForEmailVerification(user, userDocRef);

      // Redirect to login page after successful verification
      window.location.href = 'login.html';

  } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error: ${errorCode} - ${errorMessage}`);
  }
});

// Function to wait for email verification and update isVerified
async function waitForEmailVerification(user, userDocRef) {
  return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (updatedUser) => {
          if (updatedUser && updatedUser.emailVerified) {
              // Update isVerified to true in Firestore
              await updateDoc(userDocRef, {
                  isVerified: true
              });

              // Unsubscribe from the listener
              unsubscribe();

              // Resolve the promise
              resolve();
          }
      });
  });
}



});

}
/* -----------------------------For Home Page---------------------- */
let homePage = document.querySelector(".HomePage");
if(homePage) {
/* -----------------------------News Ticker---------------------- */
// Function to fetch latest news data from Firebase
async function fetchLatestNews() {
  try {
    const newsRef = collection(firestore, "latestNews"); // Use collection() function
    const querySnapshot = await getDocs(newsRef);

    const newsData = [];
    querySnapshot.forEach((doc) => {
      newsData.push(doc.data().englishContent);
    });

    return newsData;
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
}

// Function to display latest news in the news ticker list
function displayLatestNews(newsData) {
  const newsTickerList = document
    .getElementById("news-ticker")
    .querySelector("ul");

  newsData.forEach((content) => {
    // Create a new list item and set its content
    const listItem = document.createElement("li");
    listItem.textContent = content;

    // Append the list item to the news ticker list
    newsTickerList.appendChild(listItem);
  });
}

// Usage: Fetch and display latest news
fetchLatestNews().then((newsData) => {
  displayLatestNews(newsData);
});

/* -----------------------------News Ticker---------------------- */
$(function () {
  var $ticker = $("#news-ticker"),
    $first = $("li:first-child", $ticker);

  $("a", $ticker).each(function () {
    var $this = $(this),
      text = $this.text();
    $this.html(text.split("").join("&#8203;"));
  });

  function tick() {
    var $el = $ticker.find(".tick");
    $el.removeClass("tick");

    var $next = $el.next("li");
    $next = $next.length > 0 ? $next : $first;

    $next.addClass("tick");
  }

  $first.addClass("tick");

  setInterval(tick, 5000);
});

/* -----------------------------Featch Cards ---------------------- */
const cavanCardContainer = document.getElementById("caravanCardContainer");
const carCardContainer = document.getElementById("carCardContainer");
const motorCardContainer = document.getElementById("motorCardContainer");

const maxItemsToShow = 4; // Set the maximum number of items to show

let caravanItemsShown = 0;
let carItemsShown = 0;
let motorItemsShown = 0;

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCaravanCard(data) {
  if (caravanItemsShown < maxItemsToShow) {
    const cardHtml = `
    <div class="col-12 col-md-6 col-lg-4  col-xl-3 mb-4">
    <div class="card custom-card h-100"> <!-- Added h-100 class for equal height -->
      <img src="${data.imageUrl}" class="card-img-top" alt="${data.englishName} Image"/>
      <div class="card-body d-flex align-content-stretch flex-column">
      <div class="row">
      <div class="col-12"><h3 class="card-title">${data.englishName}</h3></div>
      </div>
      <div class="box">
      <div class="row">
      <div class="col-6">Price</div> 
      <div class="col-6"><p class="card-text flex-grow-1">${data.price}</p></div> <!-- Added flex-grow-1 for equal height -->
      </div>
      <div class="row">
      <div class="col-6">Warranty</div> 
      <div class="col-6"><p class="card-text">${data.determineWarranty}</p></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      `;

    cavanCardContainer.innerHTML += cardHtml;
    caravanItemsShown++;
  }
}

function createCarCard(data) {
  if (carItemsShown < maxItemsToShow) {
    const cardHtml = `
      <div class="col-12 col-md-6 col-lg-4  col-xl-3 mb-4">
      <div class="card custom-card h-100"> <!-- Added h-100 class for equal height -->
      <img src="${data.imageUrl}" class="card-img-top" alt="${data.englishName} Image"/>
      <div class="card-body d-flex align-content-stretch flex-column">
      <div class="row">
      <div class="col-12"><h3 class="card-title">${data.englishName}</h3></div>
      </div>
      <div class="box">
      <div class="row">
      <div class="col-6">Price</div> 
    <div class="col-6"><p class="card-text flex-grow-1">${data.price}</p></div> <!-- Added flex-grow-1 for equal height -->
    </div>
    <div class="row">
    <div class="col-6">Warranty</div> 
    <div class="col-6"><p class="card-text">${data.determineWarranty}</p></div>
    </div>
    </div>
    </div>
    </div>
    </div>
    `;

    carCardContainer.innerHTML += cardHtml;
    carItemsShown++;
  }
}

function createMotorCard(data) {
  if (motorItemsShown < maxItemsToShow) {
    const cardHtml = `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
    <div class="card custom-card h-100"> 
    <img src="${data.imageUrl}" class="card-img-top" alt="${data.englishName} Image"/>
    <div class="card-body d-flex align-content-stretch flex-column">
    <div class="row">
    <div class="col-12"><h3 class="card-title">${data.englishName}</h3></div>
    </div>
    <div class="box">
    <div class="row">
    <div class="col-6">Price</div> 
    <div class="col-6"><p class="card-text flex-grow-1">${data.price}</p></div> <!-- Added flex-grow-1 for equal height -->
    </div>
    <div class="row">
    <div class="col-6">Warranty</div> 
    <div class="col-6"><p class="card-text">${data.determineWarranty}</p></div>
    </div>
    </div>
    </div>
    </div>
    </div>
    `;

    motorCardContainer.innerHTML += cardHtml;
    motorItemsShown++;
  }
}

async function fetchDataAndPopulateCaravanCards() {
  try {
    const collectionRef = collection(firestore, "Caravans");
    const snapshot = await getDocs(collectionRef);

    const data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    // Shuffle the data array
    const shuffledData = shuffleArray(data);

    // Display the first four items
    shuffledData.slice(0, maxItemsToShow).forEach((item) => {
      createCaravanCard(item);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchDataAndPopulateCarCards() {
  try {
    const collectionRef = collection(firestore, "Car4x4");
    const snapshot = await getDocs(collectionRef);

    const data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    // Shuffle the data array
    const shuffledData = shuffleArray(data);

    // Display the first four items
    shuffledData.slice(0, maxItemsToShow).forEach((item) => {
      createCarCard(item);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchDataAndPopulateMotorCards() {
  try {
    const collectionRef = collection(firestore, "motorcycles");
    const snapshot = await getDocs(collectionRef);

    const data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    // Shuffle the data array
    const shuffledData = shuffleArray(data);

    // Display the first four items
    shuffledData.slice(0, maxItemsToShow).forEach((item) => {
      createMotorCard(item);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the functions to fetch data and populate cards
fetchDataAndPopulateCaravanCards();
fetchDataAndPopulateCarCards();
fetchDataAndPopulateMotorCards();

/* -----------------------------Featch Cards ---------------------- */
const packageAdsCardContainer = document.getElementById(
  "packageAdsCardContainer"
);

async function fetchDataAndPopulateAdsPackages() {
  try {
    const collectionRef = collection(firestore, "packages");
    const snapshot = await getDocs(collectionRef);

    snapshot.forEach((doc) => {
      const data = doc.data();
      // Check if the type is "الباقات الإعلانيه" before creating the card
      if (data.type === "الباقات الإعلانيه") {
        createPackageAdsCard(data);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createPackageAdsCard(data) {
  const cardHtml = `
  <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 package-items position-relative">
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">${data.englishName}</h4>
      <p class="card-text">Price: ${data.price}</p>
      </div>
      <div class="card-body">
<p class="card-text"><i class="fa-solid fa-check"></i>Validity: ${
    data.validity
  }</p>
<p class="card-text"><i class="fa-solid fa-check"></i>Ads: ${
    data.numOfFeaturedAds
  }</p>
<p class="card-text"><i class="fa-solid fa-check"></i>No Of Images: ${
    data.numberOfPhotos
  }</p>
<p class="card-text"><i class="fa-solid ${
    data.hasVideo === "نعم" ? "fa-check" : "fa-xmark"
  }"></i>Video URL : ${data.hasVideo}</p>
<p class="card-text"><i class="fa-solid fa-check"></i>Categories: ${
    data.sections
  }</p>
<a class="btn cart-btn btn-block">Add To Cart <i class="fa-solid fa-cart-shopping"></i></a>
</div>
  </div>
</div>
  `;

  packageAdsCardContainer.innerHTML += cardHtml;
}

fetchDataAndPopulateAdsPackages();

// ---------------------------Commerse Package ----------------------------

const packageCommerseCardContainer = document.getElementById(
  "packageCommerseCardContainer"
);

async function fetchDataAndPopulateCommersePackages() {
  try {
    const collectionRef = collection(firestore, "packages");
    const snapshot = await getDocs(collectionRef);

    snapshot.forEach((doc) => {
      const data = doc.data();
      // Check if the type is "الباقات التجارية"before creating the card
      if (data.type === "الباقات التجارية") {
        createPackageCommerseCard(data);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createPackageCommerseCard(data) {
  const cardHtml = `
  <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 package-items position-relative">
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">${data.englishName}</h4>
      <p class="card-text">Price: ${data.price}</p>
      </div>
      <div class="card-body">
<p class="card-text"><i class="fa-solid fa-check"></i>Validity: ${
    data.validity
  }</p>
<p class="card-text"><i class="fa-solid fa-check"></i>Ads: ${
    data.numOfFeaturedAds
  }</p>
<p class="card-text"><i class="fa-solid fa-check"></i>No Of Images: ${
    data.numberOfPhotos
  }</p>
<p class="card-text"><i class="fa-solid ${
    data.hasVideo === "نعم" ? "fa-check" : "fa-xmark"
  }"></i>Video URL : ${data.hasVideo}</p>
<p class="card-text"><i class="fa-solid fa-check"></i>Categories: ${
    data.sections
  }</p>
<a class="btn cart-btn btn-block">Add To Cart <i class="fa-solid fa-cart-shopping"></i></a>
</div>
  </div>
</div>
  `;

  packageCommerseCardContainer.innerHTML += cardHtml;
}

fetchDataAndPopulateCommersePackages();
// -----------------------------CountrySlider-----------------------------------
var splide = new Splide('.splide', {
  type: 'loop',
  focus: 'center',
  gap: '1.5rem',
  perPage : 4,
  autoplay: true,
});

window.addEventListener('resize', function () {
  updatePerPage();
});

function updatePerPage() {
  var screenWidth = window.innerWidth;

  if (screenWidth >= 1200) {
    splide.options.perPage = 4;
  } else if (screenWidth >= 992) {
    splide.options.perPage = 3;
  } else if (screenWidth >= 768) {
    splide.options.perPage = 2;
  } else {
    splide.options.perPage = 1;
  }
  splide.refresh();
}
updatePerPage();

splide.mount();

// -----------------------------Logo Slider-----------------------------------

var copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);
}