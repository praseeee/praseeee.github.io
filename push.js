var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BKzLWAnUeIap_maCX8tTe2K8HEOysKNp_uT1oh5ht_RJJjtBRSP6P3rEaqlc-EOjALvCD0gEFNfKg047bs2Gii8",
  privateKey: "BKhD2F5yoVuVpGlVQ7_yOe1llVRZTnZREviyZYQ5J8w",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    " https://fcm.googleapis.com/fcm/send/eBLqOKagS28:APA91bEBwl6pzCA6HLOHdDUdVlebxxCA-2-VP6FKLIRN9WHja3-E2gffrok2tGkjxp3wnS8OSysB_67N8o7iJ3-LokNw5DQkGd0lDEwYmTmPF1uzAMmIDr7t6ctwbRs4oUT3cZMg0IjC",
  keys: {
    p256dh:
      "BDwXNmt8okhVims5VjTJgM8/KthFu9WqdI+nc1MsevFvVxW/sd+IUyJwZe8ntJXD4eX6gMpwuxLOugGygKxp7dM=",
    auth: "sbcKLmYWS8bKAI/mVzSOwA==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "489407451958",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
