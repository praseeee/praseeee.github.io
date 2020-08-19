const fetch = require("node-fetch");
var key =
  "AAAAy3zDZ2Y:APA91bE3X2o3RASVAf60sJFfcfmw2l4TrtC1QdjZpfAqyscaCdRnygcsRt317PMbpW4vTM4dMzq8iFYA9sbqigY4MmINzAdcnbuWuvX9Xb4WiLBiy_EEjnxDuQd6vxdu47pmcz8m9gDa";
var to =
  "eku0JUbXCt73nerr52AQcX:APA91bHBjSM1HK5ySAudLKp58jSgZ_HJCMCZ_FfdnS5a3y_XrkKqXL1CkgbG7QB_Yy90sBBXodg9WFU62OS2pKrmC7wSdBe6ovF0D19Lk26ri9jjzYOkC6fi9m7qgVjlnQaPHV1hvhww";
var notification = {
  title: "Portugal vs. Denmark",
  body: "5 to 1",
  icon: "firebase-logo.png",
  click_action: "http://localhost:8081",
};

fetch("https://fcm.googleapis.com/fcm/send", {
  method: "POST",
  headers: {
    Authorization: "key=" + key,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    notification: notification,
    to: to,
  }),
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  });
