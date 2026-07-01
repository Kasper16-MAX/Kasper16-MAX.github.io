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
            <div class="piggy-item">

                <button
                    class="piggy-button"
                    onclick="openPiggy(${piggy.id})">

                    ${piggy.name}

                </button>

                <button
                    class="delete-button"
                    onclick="deletePiggy(${piggy.id})">

                    🗑️

                </button>

            </div>
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

function removeMoney() {

    const money = Number(
        prompt("Сколько вычесть?")
    );

    if (!money || money <= 0) {
        return;
    }

    currentPiggy.current -= money;

    // Не даём уйти в минус
    if (currentPiggy.current < 0) {
        currentPiggy.current = 0;
    }

    save();
    renderPiggy();
}

function deletePiggy(id) {

    const answer = confirm(
        "Удалить эту копилку?"
    );

    if (!answer) return;

    piggies = piggies.filter(
        piggy => piggy.id !== id
    );

    if (
        currentPiggy &&
        currentPiggy.id === id
    ) {

        currentPiggy = null;

        document.getElementById(
            "piggyInfo"
        ).innerHTML =
            "<h1>Выберите копилку</h1>";
    }

    save();
    renderMenu();
}

function renderPiggy() {

    if (!currentPiggy) return;

    let percent =
        currentPiggy.current /
        currentPiggy.goal * 100;

    if (percent > 100)
        percent = 100;

document.getElementById("piggyInfo").innerHTML = `

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

    <div class="money-buttons">
        <button onclick="addMoney()">
            ➕ Добавить деньги
        </button>

        <button
            class="remove-money-button"
            onclick="removeMoney()">
            ➖ Вычесть деньги
        </button>
    </div>

`;
}

renderMenu();
