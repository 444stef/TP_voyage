// Les destinations
const destinations = {
    1: "Tokyo",
    2: "New York",
    3: "Egypte",
    4: "Islande",
    5: "Italie",
    6: "Hawaii",
    7: "Rio de Janeiro",
    8: "Canada"
};

// Prix pour chaque destination
const prixParDestination = [
    0,
    120,    // 1 Tokyo
    150,    // 2 New York
    90,     // 3 Egypte
    130,    // 4 Islande (j'ai mis 130 au lieu de 10)
    100,    // 5 Italie
    200,    // 6 Hawaii
    180,    // 7 Rio
    130     // 8 Canada
];

window.onload = function() {
    // Récupérer l'ID de la destination
    var url = window.location.href;
    var morceaux = url.split('=');
    var id = morceaux[1];

    // Afficher le nom de la destination
    if (destinations[id]) {
        var nom = destinations[id];
        document.title = "Réservation - " + nom;
        var titre = document.querySelector('h1');
        titre.textContent = "Réservation : " + nom;
        console.log("Destination chargée : " + nom);
    }

    // Initialiser le calcul de prix
    initialiserCalculPrix();
};

function initialiserCalculPrix() {
    // Récup id dans l'url (méthode plus propre)
    const params = new URLSearchParams(window.location.search);
    const idDestination = parseInt(params.get("id")) || 1;
    const prixJour = prixParDestination[idDestination];

    // Éléments du formulaire
    const date_d = document.getElementById("date-depart");
    const date_r = document.getElementById("date-retour");
    const nb_adultes = document.getElementById("adultes");  // Plus simple avec getElementById
    const nb_enfants = document.getElementById("enfants");  // Plus simple avec getElementById
    const petit_dej = document.getElementById("petit-dej"); // Plus simple avec getElementById
    const prix_tot = document.getElementById("prix-total");
    const erreur = document.getElementById("erreur");

    // Calcul
    function calculer() {
        // On efface l'erreur possible
        if (erreur) erreur.textContent = "";

        // Vérification des dates
        const d1 = new Date(date_d.value);
        const d2 = new Date(date_r.value);

        if (date_d.value === "" || date_r.value === "") {
            prix_tot.textContent = "0 €";
            return;
        }

        if (d2 <= d1) {
            if (erreur) erreur.textContent = "La date de retour doit être après la date de départ.";
            prix_tot.textContent = "0 €";
            return;
        }

        // Nombre de jours
        const nbJours = (d2 - d1) / (1000 * 60 * 60 * 24);

        // Participants
        const adultes = parseInt(nb_adultes.value) || 0;
        const enfants = parseInt(nb_enfants.value) || 0;

        if (adultes < 1) {
            if (erreur) erreur.textContent = "Il faut au moins 1 adulte.";
            prix_tot.textContent = "0 €";
            return;
        }

        // Calcul
        const prix_adultes = adultes * prixJour * nbJours;
        const prix_enfants = enfants * prixJour * 0.4 * nbJours;
        const supp_petit_dej = petit_dej.checked ? 15 * (adultes + enfants) * nbJours : 0;

        const total = prix_adultes + prix_enfants + supp_petit_dej;

        prix_tot.textContent = total.toFixed(2) + " €";
    }

    // Mise à jour auto
    date_d.addEventListener("change", calculer);
    date_r.addEventListener("change", calculer);
    nb_adultes.addEventListener("input", calculer);
    nb_enfants.addEventListener("input", calculer);
    petit_dej.addEventListener("change", calculer);

    // Premier calcul
    calculer();
}