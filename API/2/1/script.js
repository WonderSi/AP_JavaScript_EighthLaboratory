const xhr1 = new XMLHttpRequest();
xhr1.open("GET", "https://api.jikan.moe/v4/anime/1");
xhr1.onload = function () {
  console.log("Anime Info:", JSON.parse(xhr1.responseText));

  const xhr2 = new XMLHttpRequest();
  xhr2.open("GET", "https://dog.ceo/api/breeds/image/random");
  xhr2.onload = function () {
    console.log("Dog Image:", JSON.parse(xhr2.responseText));

    const xhr3 = new XMLHttpRequest();
    xhr3.open(
      "GET",
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    xhr3.onload = function () {
      console.log("Bitcoin Price:", JSON.parse(xhr3.responseText));

      const xhr4 = new XMLHttpRequest();
      xhr4.open("GET", "https://v2.jokeapi.dev/joke/Any?type=single");
      xhr4.onload = function () {
        console.log("Joke:", JSON.parse(xhr4.responseText));

        const xhr5 = new XMLHttpRequest();
        xhr5.open("GET", "https://restcountries.com/v3.1/name/russia");
        xhr5.onload = function () {
          console.log("Country Info:", JSON.parse(xhr5.responseText));
        };
        xhr5.send();
      };
      xhr4.send();
    };
    xhr3.send();
  };
  xhr2.send();
};
xhr1.send();
