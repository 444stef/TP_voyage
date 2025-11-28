
//Prix pour chaque destination

const prixParDestination = [
    0,
    120,    // 1 Japon
    150,    // 2 New York
    90,     // 3 Égypte
    10,     // 4 Islande
    100,    // 5 Rome
    200,    // 6 Hawaii
    180,    // 7 Rio
    130     // 8 Canada
];

//recup id dans l'url
const params = new URLSearchParams(window.location.search);
const idDestination = parseInt(params.get("id")) || 1;
const prixJour = prixParDestination[idDestination];


//valeurs du formulaire

const date_d = document.getElementById("date-depart");
const date_r = document.getElementById("date-retour");
const nb_adultes = document.querySelector("input[name='adultes']");
const nb_enfants = document.querySelector("input[name='enfants']");
const petit_dej = document.querySelector("input[name='petit-dej']");
const prix_tot = document.getElementById("prix-total");
const erreur = document.getElementById("erreur");


//calcul

function calculer() {
    // On efface l'erreur possible
    erreur.textContent = "";

    // Vérification des dates
    const d1 = new Date(date_d.value);
    const d2 = new Date(date_r.value);

    if (date_d.value === "" || date_r.value === "") {
        prix_tot.textContent = "0 €";
        return;
    }

    if (d2 <= d1) {
        erreur.textContent = "La date de retour doit être après la date de départ.";
        prix_tot.textContent = "0 €";
        return;
    }

    // Nombre de jours
    const nbJours = (d2 - d1) / (1000 * 60 * 60 * 24);

    // Participants
    const adultes = parseInt(nb_adultes.value) || 0;
    const enfants = parseInt(nb_enfants.value) || 0;

    if (adultes < 1) {
        erreur.textContent = "Il faut au moins 1 adulte.";
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


//mise à jour auto

date_d.addEventListener("change", calculer);
date_r.addEventListener("change", calculer);
nb_adultes.addEventListener("input", calculer);
nb_enfants.addEventListener("input", calculer);
petit_dej.addEventListener("change", calculer);