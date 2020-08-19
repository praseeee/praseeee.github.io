importScripts("https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.17.2/firebase-messaging.js"
);
// Your web app's Firebase configuration
var firebaseConfig = {
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

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload.data.status,
    // icon: "fcm/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
// [END background_handler]
