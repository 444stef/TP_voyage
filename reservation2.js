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

window.onload = function() {
    var url = window.location.href;
    var morceaux = url.split('=');
    var id = morceaux[1];

    // CORRECTION : utiliser "id" au lieu de "numero"
    if (destinations[id]) {
        var nom = destinations[id];
        
        // CORRECTION : "document.title" au lieu de "documentation.title"
        document.title = "Réservation - " + nom;

        // CORRECTION : enlever "this." devant document
        var titre = document.querySelector('h1');
        titre.textContent = "Réservation : " + nom;
        
        console.log(" Destination chargée : " + nom);
    } else {
        console.log("Destination non trouvée pour l'ID : " + id);
    }
};
