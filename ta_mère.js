<section id="filtres">

    <h2>Filtres</h2>

    <!-- Prix -->
    <label>
        Prix max :
        <input type="range" id="filtre_prix" min="0" max="250" value="250">
        <span id="valeur_prix">250 €</span>
    </label>

    <!-- Enfants -->
    <label>
        <input type="checkbox" id="filtre_enfants">
        Enfants autorisés
    </label>

    <!-- Animaux -->
    <label>
        <input type="checkbox" id="filtre_animaux">
        Animaux autorisés
    </label>

    <button id="reset_filtres">Réinitialiser</button>

</section>



// === FILTRES ===

const filtrePrix = document.getElementById("filtre_prix");
const filtreEnfants = document.getElementById("filtre_enfants");
const filtreAnimaux = document.getElementById("filtre_animaux");
const resetBtn = document.getElementById("reset_filtres");
const valeurPrix = document.getElementById("valeur_prix");

function appliquerFiltres() {

    const maxPrix = parseInt(filtrePrix.value);
    const enfantsOK = filtreEnfants.checked;
    const animauxOK = filtreAnimaux.checked;

    valeurPrix.textContent = maxPrix + " €";

    document.querySelectorAll(".destination-item").forEach(article => {

        const prix = parseInt(article.dataset.prix);
        const accepteEnfants = article.dataset.enfants === "true";
        const accepteAnimaux = article.dataset.animaux === "true";

        let afficher = true;

        if (prix > maxPrix) afficher = false;
        if (filtreEnfants.checked && !accepteEnfants) afficher = false;
        if (filtreAnimaux.checked && !accepteAnimaux) afficher = false;

        article.style.display = afficher ? "block" : "none";
    });
}

filtrePrix.addEventListener("input", appliquerFiltres);
filtreEnfants.addEventListener("change", appliquerFiltres);
filtreAnimaux.addEventListener("change", appliquerFiltres);

resetBtn.addEventListener("click", () => {
    filtrePrix.value = 250;
    filtreEnfants.checked = false;
    filtreAnimaux.checked = false;
    valeurPrix.textContent = "250 €";
    appliquerFiltres();
});