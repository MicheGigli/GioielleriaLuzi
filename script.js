// -------------------- LOGIN & REGISTRAZIONE --------------------

function register() {
    const email = document.getElementById("registerUser").value;
    const password = document.getElementById("registerPass").value;

    if (!email || !password) {
        alert("Compila tutti i campi");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
        alert("Utente già registrato!");
        return;
    }

    users[email] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registrazione avvenuta con successo! Ora puoi accedere.");
}

function login() {
    const email = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email] && users[email] === password) {
        localStorage.setItem("loggedUser", email);
        alert("Accesso effettuato!");
        window.location.href = "index.html";
    } else {
        alert("Credenziali non valide!");
    }
}

// -------------------- CARRELLO --------------------

function aggiungiAlCarrello(nome, prezzo) {
    let carrello = JSON.parse(localStorage.getItem("carrello")) || [];

    carrello.push({ nome: nome, prezzo: prezzo });
    localStorage.setItem("carrello", JSON.stringify(carrello));
    alert("Prodotto aggiunto al carrello!");
}

function mostraCarrello() {
    let carrello = JSON.parse(localStorage.getItem("carrello")) || [];
    let container = document.getElementById("carrello-container");
    let totaleContainer = document.getElementById("totale-container");

    if (carrello.length === 0) {
        container.innerHTML = "<p>Il carrello è vuoto.</p>";
        document.getElementById("checkout-btn").style.display = "none";
        return;
    }

    let html = "<ul>";
    let totale = 0;

    carrello.forEach((item, index) => {
        html += `<li>${item.nome} - €${item.prezzo} 
        <button onclick="rimuoviDalCarrello(${index})">Rimuovi</button></li>`;
        totale += item.prezzo;
    });

    html += "</ul>";
    container.innerHTML = html;
    totaleContainer.innerHTML = `<h3>Totale: €${totale}</h3>`;
}

function rimuoviDalCarrello(index) {
    let carrello = JSON.parse(localStorage.getItem("carrello")) || [];
    carrello.splice(index, 1);
    localStorage.setItem("carrello", JSON.stringify(carrello));
    mostraCarrello();
}

function vaiAlCheckout() {
    localStorage.removeItem("carrello");
    window.location.href = "ordine.html";
}

// -------------------- AUTO AVVIO FUNZIONI --------------------

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("carrello-container")) {
        mostraCarrello();
    }
});
