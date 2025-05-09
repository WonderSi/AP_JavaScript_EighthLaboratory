function generateHuman() {
  const firstNames = [
    "Иван",
    "Алексей",
    "Мария",
    "Елена",
    "Дмитрий",
    "Ольга",
    "Сергей",
    "Анна",
    "Андрей",
    "Наталья",
  ];
  const lastNames = [
    "Иванов",
    "Петров",
    "Сидоров",
    "Смирнов",
    "Кузнецов",
    "Васильев",
    "Попов",
    "Соколов",
    "Михайлов",
    "Новиков",
  ];
  const streets = [
    "Ленина",
    "Гагарина",
    "Пушкина",
    "Советская",
    "Мира",
    "Кирова",
    "Лермонтова",
    "Горького",
    "Чехова",
    "Толстого",
  ];

  return {
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    age: Math.floor(Math.random() * 80) + 10,
    gender: Math.random() > 0.5 ? "male" : "female",
    address: `ул. ${streets[Math.floor(Math.random() * streets.length)]}, ${
      Math.floor(Math.random() * 100) + 1
    }`,
    phone: `+7${Math.floor(Math.random() * 9000000000) + 1000000000}`,
  };
}

export async function getData() {
  return new Promise((resolve) => {
    const count = Math.floor(Math.random() * 15) + 5;
    const humans = [];

    for (let i = 0; i < count; i++) {
      humans.push(generateHuman());
    }

    resolve(humans);
  });
}
