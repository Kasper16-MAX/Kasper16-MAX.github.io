let piggy = {
    name: "",
    goal: 0,
    current: 0
};

function createPiggy() {
    piggy.name = document.getElementById("name").value;
    piggy.goal = Number(document.getElementById("goal").value);
    piggy.current = 0;

    document.getElementById("createPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";

    document.getElementById("piggyName").innerText = piggy.name;

    updateUI();
}

function addMoney() {
    let money = Number(document.getElementById("money").value);
    piggy.current += money;

    document.getElementById("money").value = "";

    updateUI();
}

function updateUI() {
    let percent = (piggy.current / piggy.goal) * 100;

    if (percent > 100) percent = 100;

    document.getElementById("progressText").innerText =
        `${piggy.current} ₽ / ${piggy.goal} ₽`;

    document.getElementById("progressBar").style.width = percent + "%";
}
