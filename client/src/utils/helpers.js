export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection with version 1
    const request = window.indexedDB.open("shop-shop", 1);

    // create variables to hold reference
    let db, transaction, store;

    // if version changes or first time. create 3 object stores
    request.onupgradeneeded = function (e) {
      const db = request.result;

      // create object store
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    request.onerror = function (e) {
      console.log("there was an error in connecting-INDEXDB");
    };

    // on database open success
    request.onsuccess = function (e) {
      // save reference of db
      db = request.result;

      // open transaction
      transaction = db.transaction(storeName, "readwrite");

      // save reference to that object Store
      store = transaction.objectStore(storeName);

      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("not a valid method");
          break;
      }

      // transaction complete
      transaction.oncomplete = function () {
        console.log("transaction complete, closing db");
        db.close();
      };
    };
  });
}
