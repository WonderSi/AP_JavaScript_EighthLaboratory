import { getData } from "./humansData.js";

let currentData = [];
let editingIndex = null;

document.getElementById("loadBtn").addEventListener("click", async () => {
  currentData = await getData();
  renderTable();
});

function renderTable() {
  const genderFilter = document.getElementById("genderFilter").value;
  const filteredData =
    genderFilter === "all"
      ? currentData
      : currentData.filter((person) => person.gender === genderFilter);

  const tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="selectAll"></th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Возраст</th>
                            <th>Пол</th>
                            <th>Адрес</th>
                            <th>Телефон</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredData
                          .map((person, index) => {
                            const ageClass =
                              person.age < 18
                                ? "child"
                                : person.age < 60
                                ? "adult"
                                : "senior";
                            const genderText =
                              person.gender === "male" ? "Мужской" : "Женский";

                            return `
                                <tr class="${ageClass}">
                                    <td><input type="checkbox" data-index="${index}"></td>
                                    <td>${person.firstName}</td>
                                    <td>${person.lastName}</td>
                                    <td>${person.age}</td>
                                    <td>${genderText}</td>
                                    <td>${person.address}</td>
                                    <td>${person.phone}</td>
                                    <td class="action-buttons">
                                        <button class="editBtn" data-index="${index}">Редактировать</button>
                                        <button class="deleteBtn" data-index="${index}">Удалить</button>
                                    </td>
                                </tr>
                            `;
                          })
                          .join("")}
                    </tbody>
                </table>
            `;

  document.getElementById("tableContainer").innerHTML = tableHTML;

  document.getElementById("selectAll")?.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(
      'tbody input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = this.checked;
    });
  });

  document.querySelectorAll(".editBtn").forEach((btn) => {
    btn.addEventListener("click", function () {
      editingIndex = parseInt(this.getAttribute("data-index"));
      showEditModal(currentData[editingIndex]);
    });
  });

  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      currentData.splice(index, 1);
      renderTable();
    });
  });
}

document.getElementById("addBtn").addEventListener("click", () => {
  editingIndex = null;
  showEditModal({
    firstName: "",
    lastName: "",
    age: 18,
    gender: "male",
    address: "",
    phone: "",
  });
});

document.getElementById("deleteSelectedBtn").addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(
    'tbody input[type="checkbox"]:checked'
  );
  const indexes = Array.from(checkboxes).map((cb) =>
    parseInt(cb.getAttribute("data-index"))
  );

  indexes
    .sort((a, b) => b - a)
    .forEach((index) => {
      currentData.splice(index, 1);
    });

  renderTable();
});

document.getElementById("genderFilter").addEventListener("change", renderTable);

function showEditModal(data) {
  document.getElementById("modalTitle").textContent =
    editingIndex === null ? "Добавить запись" : "Редактировать запись";
  const form = document.getElementById("editForm");

  Object.keys(data).forEach((key) => {
    if (form.elements[key]) {
      form.elements[key].value = data[key];
    }
  });

  document.getElementById("editModal").style.display = "block";
}

function hideEditModal() {
  document.getElementById("editModal").style.display = "none";
}

document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const newPerson = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    age: parseInt(formData.get("age")),
    gender: formData.get("gender"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  };

  if (editingIndex === null) {
    currentData.push(newPerson);
  } else {
    currentData[editingIndex] = newPerson;
  }

  hideEditModal();
  renderTable();
});

document.getElementById("cancelBtn").addEventListener("click", hideEditModal);
