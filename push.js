const fetch = require("node-fetch");
var key =
  "AAAAYTb-s6M:APA91bFFWCga0nernEpQ9yRrd-hbm8qyiMbdVdNuhrBBoqpwHGVqE5PMiEV80URz36ZNvgyDZEdfLYfspngFMLZpPXTlsbvKX0vncZ3DxU9CLpgTPCFTIv0dTJJ1VAlSRi5AB8zNaGN0";
var to =
  "dAmJpJzr0kfVO-gUs9U1J6:APA91bHD5KbsTg2Yzxs2tRclsRqmhNxtQUF8SUaV9H9G3QmQcajJhWhTsYbFKsNgt5sOl-62Xv8VTR4XRfoG8aqetZA-93H1OGbI9t9Wsn5O-oKSLFO_fhD8Xebhkde4WiW0xbwqL3N-";
var notification = {
  title: "Portugal vs. Denmark",
  body: "5 to 1",
  icon: "fcm/fcm-logo.png",
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
