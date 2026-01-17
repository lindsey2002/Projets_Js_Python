let classes = [];

const classeNomInput = document.getElementById("classe-nom");
const formClasse = document.getElementById("form-classe");
const tableBody = document.getElementById("table-classes");

// -------------------Chargement-----------------//

function ChargerClasse(){
    const data = localStorage.getItem("classes");
    if(data){
        classes = JSON.parse(data);
    }
}

// -------------------Sauvegarde-----------------//

function sauvegarderClasses(){
    localStorage.setItem("classes", JSON.stringify(classes));
}

// -------------------Afficher classe-----------------//

function AfficherClasses(){
    tableBody.innerHTML = "";

    classes.forEach(classe => {
        const tr = document.createElement("tr");

        tr.innerHTML =`
            <td>${classe.nom}</td>
            <td>
                <button onclick = "supprimerClasse(${classe.id})">
                    Supprimer
                </button>
            </td>
        `;
        
        tableBody.appendChild(tr);
    });
}

// -------------------Ajouter-----------------//

formClasse.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomClasse = classeNomInput.value.trim();
    if(nomClasse === "") return;

    const nouvelleClasse = {
        id: Date.now(),
        nom: nomClasse
    };

    classes.push(nouvelleClasse);
    sauvegarderClasses();
    AfficherClasses();
    formClasse.reset();
});

// -------------------Supprimer-----------------//

function supprimerClasse(id){
    classes = classes.filter(c => c.id !== id);
    sauvegarderClasses();
    AfficherClasses();
}

// -------------------Initialisation-----------------//

ChargerClasse();
AfficherClasses();