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

request("https://api.jikan.moe/v4/anime/1", function (error, animeData) {
  if (error) {
    console.error("Error fetching anime info:", error);
    return;
  }
  console.log("Anime Info:", animeData);

  request("https://dog.ceo/api/breeds/image/random", function (error, dogData) {
    if (error) {
      console.error("Error fetching dog image:", error);
      return;
    }
    console.log("Dog Image:", dogData);

    request(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
      function (error, bitcoinData) {
        if (error) {
          console.error("Error fetching bitcoin price:", error);
          return;
        }
        console.log("Bitcoin Price:", bitcoinData);

        request(
          "https://v2.jokeapi.dev/joke/Any?type=single",
          function (error, jokeData) {
            if (error) {
              console.error("Error fetching joke:", error);
              return;
            }
            console.log("Joke:", jokeData);

            request(
              "https://restcountries.com/v3.1/name/russia",
              function (error, countryData) {
                if (error) {
                  console.error("Error fetching country info:", error);
                  return;
                }
                console.log("Country Info:", countryData);
              }
            );
          }
        );
      }
    );
  });
});
