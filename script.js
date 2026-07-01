let piggies =
    JSON.parse(localStorage.getItem("piggies")) || [];

let currentPiggy = null;

function save() {
    localStorage.setItem(
        "piggies",
        JSON.stringify(piggies)
    );
}

function createPiggy() {

    const name =
        document.getElementById("name").value;

    const goal =
        Number(document.getElementById("goal").value);

    if (!name || goal <= 0) return;

    const piggy = {
        id: Date.now(),
        name,
        goal,
        current: 0
    };

    piggies.push(piggy);

    save();
    renderMenu();

    document.getElementById("name").value = "";
    document.getElementById("goal").value = "";
}

function renderMenu() {

    const list =
        document.getElementById("piggyList");

    list.innerHTML = "";

    piggies.forEach(piggy => {

        list.innerHTML += `
            <button
                class="piggy-button"
                onclick="openPiggy(${piggy.id})">

                ${piggy.name}

            </button>
        `;
    });
}

function openPiggy(id) {

    currentPiggy =
        piggies.find(p => p.id === id);

    renderPiggy();
}

function addMoney() {

    const money =
        Number(prompt("Сколько добавить?"));

    if (!money || money <= 0) return;

    currentPiggy.current += money;

    save();

    renderPiggy();
}

function renderPiggy() {

    if (!currentPiggy) return;

    let percent =
        currentPiggy.current /
        currentPiggy.goal * 100;

    if (percent > 100)
        percent = 100;

    document.getElementById(
        "piggyInfo"
    ).innerHTML = `

        <h1>${currentPiggy.name}</h1>

        <h3>
            ${currentPiggy.current} ₽
            /
            ${currentPiggy.goal} ₽
        </h3>

        <div class="bar">
            <div
                class="fill"
                style="width:${percent}%">
            </div>
        </div>

        <button onclick="addMoney()">
            Добавить деньги
        </button>

    `;
}

renderMenu();
