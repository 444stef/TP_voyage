
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


//empecher date passée

const today = new Date().toISOString().split("T")[0];

// Date de départ > aujourd’hui
date_d.min = today;
date_r.min = today;



//date de retour: minimum un jour apès la date d'arrivée

date_d.addEventListener("change"), function () {

    const depart = new Date(date_d.value);

    //on impose +1 jour minimum
    const minRetour = new Date(depart.getTime() + 24 * 60 * 60 * 1000);

    //On impose cette date dans le input
    date_r.min = minRetour.toISOString().split("T")[0];

    // Si la date retour actuelle est trop petite → on la corrige automatiquement
    if (date_r.value <= date_r.min) {
        date_r.value = date_r.min;
    }
}

//calcul

function calculer() {
    // On efface l'erreur possible
    erreur.textContent = "";

    if (date_d.value === "" || date_r.value === "") {
        prix.textContent = "0 €";
        return;
    }


    // Nombre de jours
    const nbJours = (new Date(date_r.value)- new Date(date_d.value)) / (1000 * 60 * 60 * 24);

    // Participants
    const adultes = parseInt(nb_adultes.value) || 0;
    const enfants = parseInt(nb_enfants.value) || 0;


    // Calcul
    const prix_adultes = adultes * prixJour * nbJours;
    const prix_enfants = enfants * prixJour * 0.4 * nbJours;
    const supp_petit_dej = petit_dej.checked ? 15 * (adultes + enfants) * nbJours : 0;

    const total = prix_adultes + prix_enfants + supp_petit_dej;

    prix_tot.textContent = total.toFixed(2) + " €";
}


//mise à jour auto


date_r.addEventListener("change", calculer);
nb_adultes.addEventListener("input", calculer);
nb_enfants.addEventListener("input", calculer);
petit_dej.addEventListener("change", calculer);