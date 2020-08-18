var dbPromised = idb.open("ball-ballan", 1, function (upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("clubs", {
    keyPath: "id",
  });
  teamsObjectStore.createIndex("post_club", "post_club", {
    unique: false,
  });
});

function saveForLater(club) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("clubs", "readwrite");
        let store = tx.objectStore("clubs");
        store.add(club);
        return tx.complete;
      })
      .then(function () {
        resolve(true);
      })
      .catch(function () {
        resolve(false);
      });
  });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("clubs", "readonly");
        let store = tx.objectStore("clubs");
        return store.getAll();
      })
      .then(function (clubs) {
        resolve(clubs);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("clubs", "readonly");
        let store = tx.objectStore("clubs");
        return store.get(id);
      })
      .then(function (club) {
        resolve(club);
      });
  });
}

function deleteById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("clubs", "readwrite");
        let store = tx.objectStore("clubs");
        store.delete(id);
        return tx.complete;
      })
      .then(function (id) {
        resolve(true);
      })
      .catch(function (err) {
        reject(false);
      });
  });
}
