const fetch = require("node-fetch");
var key =
  "AAAAW6-dSCs:APA91bG89U-XcGCHbof81lR24n2YHsJ_hn6NEMlKKF0tUUicCpbYjAtOk_2sObKhMB1CSXFjplql_CAVhyf_fGVjPa7dB1MbzwMgKq6OfnobptPFnSwB19K4DcYb8chnmD08TQXe67p_";
var to =
  "eFUpWomnkWqZXFplvr7sHx:APA91bGLvn5B7IIFprwWxzAqZ-lggeU2kr6vsQzuiWjKzaCA0wGfIpXftvi9lIqr_CGTgUCg0zxgryLAwV5Avth0r6ji_kY4dnORtIjyKBX54tiJMiGm7OmvSfdn4G1u2CTcdyziqvA1";
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
