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

async function fetchData() {
  try {
    const animeData = await requestPromise("https://api.jikan.moe/v4/anime/1");
    console.log("Anime Info:", animeData);

    const dogData = await requestPromise(
      "https://dog.ceo/api/breeds/image/random"
    );
    console.log("Dog Image:", dogData);

    const bitcoinData = await requestPromise(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    console.log("Bitcoin Price:", bitcoinData);

    const jokeData = await requestPromise(
      "https://v2.jokeapi.dev/joke/Any?type=single"
    );
    console.log("Joke:", jokeData);

    const countryData = await requestPromise(
      "https://restcountries.com/v3.1/name/russia"
    );
    console.log("Country Info:", countryData);
  } catch (error) {
    console.error("Error in request chain:", error);
  }
}

fetchData();
