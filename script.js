document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');

    function createCard(name, school, slogan) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${name}</h2>
            <h3>${school}</h3>
            <p>${slogan}</p>
        `;
        return card;
    }

    // 示例数据，将被GitHub Actions替换
    const cardsData = [
  {
    "name": "yiyialways",
    "school": "CQUPT",
    "slogan": "Welcome each contributor!"
  },
  {
    "name": "NaNa",
    "school": "CQUPT",
    "slogan": "Love words and codes!"
  },
  {
    "name": "Ray",
    "school": "CQUPT",
    "slogan": "Love words and codes!"
  }
];

    // 清空容器并添加所有卡片
    cardsContainer.innerHTML = '';
    cardsData.forEach(data => {
        cardsContainer.appendChild(createCard(
            data.name,
            data.school,
            data.slogan
        ));
    });
}); 