let classes = [];
const btnAjouter = document.getElementById("btn-ajouter-classe");
let classeEnEdition = null;

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
                <button onclick = "editerClasse(${classe.id})"> Modifier </button>
                <button onclick = "supprimerClasse(${classe.id})"> Supprimer </button>  
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


    // ----------------- modification dans formulaire -----------//

    if (classeEnEdition) {
        const classe = classes.find(c => c.id === classeEnEdition);
        if (classe) {
            classe.nom = nomClasse;
        }
        classeEnEdition = null;
        btnAjouter.textContent = "Ajouter la classe";
    }else{
        const nouvelleClasse = {
            id: Date.now(),
            nom: nomClasse
        };
        classes.push(nouvelleClasse);
    }
    

    sauvegarderClasses();
    AfficherClasses();
    formClasse.reset();
});

// -------------------Supprimer classe-----------------//

function supprimerClasse(id){
    classes = classes.filter(c => c.id !== id);

    classeEnEdition = null;
    btnAjouter.textContent = "Ajouter la classe";
    formClasse.reset();
    
    sauvegarderClasses();
    AfficherClasses();
}

// -------------------Modifier  classe-----------------//

function editerClasse(id){
    const classe = classes.find(c => c.id === id);
    if(!classe) return;

    classeNomInput.value = classe.nom;
    classeEnEdition = id;

    btnAjouter.textContent = "Mettre a jour";
}

// -------------------Initialisation-----------------//

ChargerClasse();
AfficherClasses();