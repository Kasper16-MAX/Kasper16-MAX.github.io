let piggies = JSON.parse(localStorage.getItem("piggies")) || [];

function save() {
    localStorage.setItem("piggies", JSON.stringify(piggies));
}

function createPiggy() {
    let name = document.getElementById("name").value;
    let goal = Number(document.getElementById("goal").value);

    if (!name || !goal) return;

    piggies.push({
        id: Date.now(),
        name: name,
        goal: goal,
        current: 0
    });

    save();
    render();

    document.getElementById("name").value = "";
    document.getElementById("goal").value = "";
}

function addMoney(id) {
    let amount = Number(prompt("Сколько добавить?"));

    let piggy = piggies.find(p => p.id === id);

    if (!piggy || !amount) return;

    piggy.current += amount;

    save();
    render();
}

function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    piggies.forEach(p => {
        let percent = (p.current / p.goal) * 100;
        if (percent > 100) percent = 100;

        list.innerHTML += `
            <div class="piggy">
                <h3>${p.name}</h3>
                <p>${p.current} ₽ / ${p.goal} ₽</p>

                <div class="bar">
                    <div class="fill" style="width:${percent}%"></div>
                </div>

                <button onclick="addMoney(${p.id})">Добавить деньги</button>
            </div>
        `;
    });
}

render();
