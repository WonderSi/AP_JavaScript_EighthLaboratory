document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcome-screen");
  const welcomeScreenH1 = document.getElementById("welcome-screen-h1");
  const welcomeScreenP = document.getElementById("welcome-screen-p");
  const animalChoice = document.getElementById("animal-choice");
  const animalFact = document.getElementById("animal-fact");
  const usernameElement = document.getElementById("username");
  const changeNameBtn = document.getElementById("change-name");
  const continueBtn = document.getElementById("continue");
  const animalBtns = document.querySelectorAll(".animal-btn");
  const animalTitle = document.getElementById("animal-title");
  const animalImage = document.getElementById("animal-image");
  const factText = document.getElementById("fact-text");
  const newFactBtn = document.getElementById("new-fact");
  const backToChoiceBtn = document.getElementById("back-to-choice");

  let currentAnimal = "";
  let currentFact = "";

  function generateRandomName() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl =
      "https://api.randomdatatools.ru/?unescaped=false&params=FirstName";

    fetch(proxyUrl + apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const newName = data.FirstName || "Гость";
        usernameElement.textContent = newName;
        welcomeScreenP.textContent = `${newName}?`;
        console.log(newName);
      });
  }

  usernameElement.textContent = "Гость";
  welcomeScreenP.textContent = "Я буду звать тебя Гость, ок?";

  changeNameBtn.addEventListener("click", function () {
    welcomeScreenH1.textContent = "Хм... Тогда что насчет";
    generateRandomName();
  });

  continueBtn.addEventListener("click", function () {
    welcomeScreen.classList.remove("active");
    animalChoice.classList.add("active");
  });

  animalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      currentAnimal = this.dataset.animal;
      animalChoice.classList.remove("active");
      animalFact.classList.add("active");

      const animalNames = {
        cat: "Коты",
        dog: "Собаки",
        fox: "Лисы",
      };
      animalTitle.textContent = animalNames[currentAnimal];

      getAnimalFact(currentAnimal);
    });
  });

  function getAnimalFact(animal) {
    fetch(`https://some-random-api.ml/facts/${animal}`)
      .then((response) => response.json())
      .then((data) => {
        currentFact = data.fact;
        factText.textContent = currentFact;
        console.log(currentFact);
      });

    fetch(`https://some-random-api.ml/img/${animal}`)
      .then((response) => response.json())
      .then((data) => {
        animalImage.src = data.link;
        console.log(data.link);
      });
  }

  newFactBtn.addEventListener("click", function () {
    getAnimalFact(currentAnimal);
  });

  backToChoiceBtn.addEventListener("click", function () {
    animalFact.classList.remove("active");
    animalChoice.classList.add("active");
  });
});
