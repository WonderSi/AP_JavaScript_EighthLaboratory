function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, JSON.parse(xhr.responseText));
    } else {
      callback(new Error(`Request failed with status ${xhr.status}`), null);
    }
  };
  xhr.onerror = function () {
    callback(new Error("Request failed"), null);
  };
  xhr.send();
}

function requestPromise(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

requestPromise("https://api.jikan.moe/v4/anime/1")
  .then((animeData) => {
    console.log("Anime Info:", animeData);
    return requestPromise("https://dog.ceo/api/breeds/image/random");
  })
  .then((dogData) => {
    console.log("Dog Image:", dogData);
    return requestPromise(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
  })
  .then((bitcoinData) => {
    console.log("Bitcoin Price:", bitcoinData);
    return requestPromise("https://v2.jokeapi.dev/joke/Any?type=single");
  })
  .then((jokeData) => {
    console.log("Joke:", jokeData);
    return requestPromise("https://restcountries.com/v3.1/name/russia");
  })
  .then((countryData) => {
    console.log("Country Info:", countryData);
  })
  .catch((error) => {
    console.error("Error in request chain:", error);
  });
