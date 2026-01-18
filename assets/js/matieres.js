
// ------------------------------------ Variables -------------------------------------------//

let classes = JSON.parse(localStorage.getItem("classes")) || [];
let classeEnCours = null;
let matiereEnEdition = null;

// -------------------------------- Elements html -------------------------------------//

const selectClasse = document.getElementById("select-classe");
const matiereNomInput = document.getElementById("matiere-nom");
const nbNotesSelect = document.getElementById("nb-notes");
const nbNotesAutreInput = document.getElementById("nb-notes-autre");
const formMatieres = document.getElementById("form-matiere");
const tableMatieres = document.getElementById("table-matieres");
const tableClasses = document.getElementById("table-classes");
const btnAjouterMatiere = document.getElementById("btn-ajouter-matiere");

// ------------------------- Chargement de la liste des classes dans select -------------------------------//

function chargerSelectClasses(){
    selectClasse.innerHTML = `<option value = "">--Selectionner une classe --</option>`;
    classes.forEach(classe =>{
        const option = document.createElement("option");
        option.value = classe.id;
        option.textContent = classe.nom;
        selectClasse.appendChild(option);
    });
}
chargerSelectClasses();

// --------------------------- Affichage tableau classes avec boutton description -------------------------------//

function afficherTableClasses(){
    tableClasses.innerHTML = "";
    classes.forEach(classe => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${classe.nom}</td>
            <td>
                <button onclick = "voirDescription(${classe.id})">Description</button>
            </td>
        `;
        tableClasses.appendChild(tr);
    });
}
afficherTableClasses();

// --------------------------- gestion de l'affichage 'autre' pour nbre de Note -------------------------------//

nbNotesSelect.addEventListener("change", () => {
    nbNotesAutreInput.hidden = nbNotesSelect.value !== "autre";
});

// --------------------------- choix de la classe dans le select -------------------------------//

selectClasse.addEventListener("change", () => {
    const classeId = Number(selectClasse.value);
    classeEnCours = classes.find(c => c.id === classeId);
    afficherMatieres();
    // Reset formulaire et état édition
    matiereEnEdition = null;
    formMatieres.reset();
    btnAjouterMatiere.textContent = "Ajouter la matière";
    nbNotesAutreInput.hidden = true;
});

// --------------------------- Affichage matieres de la classe selectionnee -------------------------------//

function afficherMatieres(){
    if(!classeEnCours){
        tableMatieres.innerHTML = "";
        return;
    }
    tableMatieres.innerHTML = "";
    classeEnCours.matieres = classeEnCours.matieres || [];

    classeEnCours.matieres.forEach(m => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${m.nom}</td>
            <td>${m.nbNotes}</td>
            <td>
                <button onclick = "editerMatiere(${m.id})">modifier</button>
                <button onclick = "supprimerMatiere(${m.id})">supprimer</button>
            </td>
        `;
        tableMatieres.appendChild(tr);
    });
}

// --------------------------- Ajout ou modification de matiere -------------------------------//

formMatieres.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!classeEnCours) return;

    const nom = matiereNomInput.value.trim();
    let nbNotes = nbNotesSelect.value === "autre"
        ? Number(nbNotesAutreInput.value)
        : Number(nbNotesSelect.value);
    
    if(!nom || !nbNotes) return;

    if(matiereEnEdition){
        // Modification
        const matiere = classeEnCours.matieres.find(m => m.id === matiereEnEdition);
        if(matiere){
            matiere.nom = nom;
            matiere.nbNotes = nbNotes;
        }
        matiereEnEdition = null;
        btnAjouterMatiere.textContent = "Ajouter la matiere";
    }else {
        // Ajout
        classeEnCours.matieres.push({
            id: Date.now(),
            nom,
            nbNotes
        });
    }

    localStorage.setItem("classes", JSON.stringify(classes));
    afficherMatieres();
    formMatieres.reset();
    nbNotesAutreInput.hidden = true;
});

// --------------------------- Suppression de matiere -------------------------------//

function supprimerMatiere(matiereId){
    classeEnCours.matieres = classeEnCours.matieres.filter(m => m.id !== matiereId);
    localStorage.setItem("classes", JSON.stringify(classes));
    afficherMatieres();
}

// --------------------------- Edition de matiere -------------------------------//

function editerMatiere(matiereId){
    const matiere = classeEnCours.matieres.find(m => m.id === matiereId);
    if(!matiere) return;

    matiereNomInput.value = matiere.nom;
    if([2,3,4,5,6,7,8].includes(matiere.nbNotes)){
        nbNotesSelect.value = matiere.nbNotes;
        nbNotesAutreInput.hidden = true;
    }else{
        nbNotesSelect.value = "autre";
        nbNotesAutreInput.hidden = false;
        nbNotesAutreInput.value = matiere.nbNotes;
    }

    matiereEnEdition = matiereId;
    btnAjouterMatiere.textContent = "mettre a jour";
}

// --------------------------- Voir description de la classe -------------------------------//

function voirDescription(classeId){
    window.location.href = `description.html?id=${classeId}`;
}
