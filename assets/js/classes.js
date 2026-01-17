// ---------- Variables ----------
let classes = [];

// ---------- Elements HTML ----------
const classeNomInput = document.getElementById("classe-nom");
const matiereNomInput = document.getElementById("classe-matiere");
const nbNotesInput = document.getElementById("classe-nb-notes");
const btnAjouter = document.getElementById("btn-ajouter-classe");
const tableBody = document.getElementById("table-classes");


function chargerClasses() {
    const data = localStorage.getItem("classes");
    if (data) {
        classes = JSON.parse(data);
    }
}

function sauvegarderClasses() {
    localStorage.setItem("classes", JSON.stringify(classes));
}

function afficherClasses() {
    tableBody.innerHTML = "";

    for (let classe of classes) {
        const tr = document.createElement("tr");

        tr.innerHTML = `
    <td>${classe.nom}</td>

    <td>${classe.matieres.map(m => m.nom).join(", ")}</td>

    <td>${classe.matieres.map(m => m.nbNotes).join(", ")}</td>

    <td>
        <button onclick="ajouterMatiere(${classe.id})">
            Ajouter matière
        </button>
        <button onclick="supprimerClasse(${classe.id})">
            Supprimer
        </button>
    </td>
`;


        tableBody.appendChild(tr);
    }
}


function ajouterClasse() {
    const nomClasse = classeNomInput.value.trim();
    if (nomClasse === "") return;

    const nouvelleClasse = {
        id: Date.now(),
        nom: nomClasse,
        matieres: []
    };

    classes.push(nouvelleClasse);
    sauvegarderClasses();
    afficherClasses();
    classeNomInput.value = "";
}

btnAjouter.addEventListener("click", ajouterClasse);

function supprimerClasse(id) {
    classes = classes.filter(c => c.id !== id);
    sauvegarderClasses();
    afficherClasses();
}

// ---------- Chargement ----------
chargerClasses();
afficherClasses();

function ajouterMatiere(classeId) {
    const nomMatiere = matiereNomInput.value.trim();
    const nbNotes = parseInt(nbNotesInput.value);

    if (nomMatiere === "" || isNaN(nbNotes)) return;

    const classe = classes.find(c => c.id === classeId);
    if (!classe) return;

    classe.matieres.push({
        nom: nomMatiere,
        nbNotes: nbNotes
    });

    sauvegarderClasses();
    afficherClasses();

    matiereNomInput.value = "";
    nbNotesInput.value = "";
}



