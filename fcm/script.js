// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd9cBKyyaAs4UfKDjB-CdheHjSbsESUR8",
  authDomain: "balll-balllan.firebaseapp.com",
  databaseURL: "https://balll-balllan.firebaseio.com",
  projectId: "balll-balllan",
  storageBucket: "balll-balllan.appspot.com",
  messagingSenderId: "417534489507",
  appId: "1:417534489507:web:5806b0147c791ce0c3a016",
  measurementId: "G-1X8DQWWGV8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// [START get_messaging_object]
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
// [END get_messaging_object]
// [START set_public_vapid_key]
// Add the public key generated from the console here.
messaging.usePublicVapidKey(
  "BD7Kf8T2AN_Z6bvx6SijNoQK8X6eY_XPB-0sS-e_2k0btHFGENHL-BTLEmMgmbnoORuLc7_uHw6vXL9lGMxPODU"
);
// [END set_public_vapid_key]

// IDs of divs that display Instance ID token UI or request permission UI.
const tokenDivId = "token_div";
const permissionDivId = "permission_div";

// [START refresh_token]
// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then((refreshedToken) => {
      console.log("Token refreshed.");
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // [START_EXCLUDE]
      // Display new Instance ID token and clear UI of all previous messages.
      resetUI();
      // [END_EXCLUDE]
    })
    .catch((err) => {
      console.log("Unable to retrieve refreshed token ", err);
      showToken("Unable to retrieve refreshed token ", err);
    });
});
// [END refresh_token]

// [START receive_message]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  // [START_EXCLUDE]
  // Update the UI to include the received message.
  appendMessage(payload);
  // [END_EXCLUDE]
});
// [END receive_message]

function resetUI() {
  clearMessages();
  showToken("loading...");
  // [START get_token]
  // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging
    .getToken()
    .then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log(
          "No Instance ID token available. Request permission to generate one."
        );
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      showToken("Error retrieving Instance ID token. ", err);
      setTokenSentToServer(false);
    });
  // [END get_token]
}

function showToken(currentToken) {
  // Show token in console and UI.
  const tokenElement = document.querySelector("#token");
  tokenElement.textContent = currentToken;
}

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log("Sending token to server...");
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log(
      "Token already sent to server so won't send it again " +
        "unless it changes"
    );
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem("sentToServer") === "1";
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem("sentToServer", sent ? "1" : "0");
}

function showHideDiv(divId, show) {
  const div = document.querySelector("#" + divId);
  if (show) {
    div.style = "display: visible";
  } else {
    div.style = "display: none";
  }
}

function requestPermission() {
  console.log("Requesting permission...");
  // [START request_permission]
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // [START_EXCLUDE]
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.
      resetUI();
      // [END_EXCLUDE]
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
  // [END request_permission]
}

function deleteToken() {
  // Delete Instance ID token.
  // [START delete_token]
  messaging
    .getToken()
    .then((currentToken) => {
      messaging
        .deleteToken(currentToken)
        .then(() => {
          console.log("Token deleted.");
          setTokenSentToServer(false);
          // [START_EXCLUDE]
          // Once token is deleted update UI.
          resetUI();
          // [END_EXCLUDE]
        })
        .catch((err) => {
          console.log("Unable to delete token. ", err);
        });
      // [END delete_token]
    })
    .catch((err) => {
      console.log("Error retrieving Instance ID token. ", err);
      showToken("Error retrieving Instance ID token. ", err);
    });
}

// Add a message to the messages element.
function appendMessage(payload) {
  const messagesElement = document.querySelector("#messages");
  const dataHeaderELement = document.createElement("h5");
  const dataElement = document.createElement("pre");
  dataElement.style = "overflow-x:hidden;";
  dataHeaderELement.textContent = "Received message:";
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderELement);
  messagesElement.appendChild(dataElement);
}

// Clear the messages element of all children.
function clearMessages() {
  const messagesElement = document.querySelector("#messages");
  while (messagesElement.hasChildNodes()) {
    messagesElement.removeChild(messagesElement.lastChild);
  }
}

function updateUIForPushEnabled(currentToken) {
  showHideDiv(tokenDivId, true);
  showHideDiv(permissionDivId, false);
  showToken(currentToken);
}

function updateUIForPushPermissionRequired() {
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
}

resetUI();
