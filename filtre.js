
function mettreFiltres() {
    

    let curseur = document.getElementById("choix_prix");
    let caseEnfants = document.getElementById("choix_enfants");
    let caseAnimaux = document.getElementById("choix_animaux");
    let bouton = document.getElementById("bouton_reset");
    let affichePrix = document.getElementById("prix_affiche");
    
    let cartes = document.getElementsByClassName("destination-card");
    

    function filtrer() {
        
        let prixMax = parseInt(curseur.value);
        let avecEnfants = caseEnfants.checked;
        let avecAnimaux = caseAnimaux.checked;
        
        
        affichePrix.textContent = prixMax;
        
    
        
        for(let i = 0; i < 8; i++) { 
            let carte = cartes[i];
            
           
            let titre = carte.querySelector(".dest_nom").textContent;
            
            
            let destinationTrouvee = null;
            
            
            for(let j = 0; j < destinations.length; j++) {
                if(destinations[j].nom === titre) {
                    destinationTrouvee = destinations[j];
                    break;
                }
            }
            
            if(destinationTrouvee) {
                
                let montrer = true;
                
                
                if(destinationTrouvee.prixJour > prixMax) {
                    montrer = false;
                }
                
            
                if(avecEnfants === true) {
                    if(destinationTrouvee.enfants !== true) {
                        montrer = false;
                    }
                }
                
                
                if(avecAnimaux === true) {
                    if(destinationTrouvee.animaux !== true) {
                        montrer = false;
                    }
                }
                
                
                if(montrer === true) {
                    carte.style.display = "block";
                } else {
                    carte.style.display = "none";
                }
            }
        }
    }
    
   
    curseur.oninput = filtrer;
    caseEnfants.onchange = filtrer;
    caseAnimaux.onchange = filtrer;
    
  
    bouton.onclick = function() {
        curseur.value = 250;
        caseEnfants.checked = false;
        caseAnimaux.checked = false;
        affichePrix.textContent = "250";
        filtrer();
    };
    
    
    filtrer();
}


setTimeout(mettreFiltres, 100);
