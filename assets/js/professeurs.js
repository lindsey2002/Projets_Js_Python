
       
       // ---------- Variables  ----------
let professeurs = []



        // ---------- Elements html  ----------
const nomInput = document.getElementById("prof-nom")
const matieresInput = document.getElementById("prof-matieres")
const classesInput = document.getElementById("prof-classes")
const btnAjouter = document.getElementById("btn-ajouter-prof")
const tableBody = document.getElementById("table-prof")
const form = document.getElementById("form-professeur");
const errorNom = document.getElementById("error-nom");


// ---------- Variables pour la modification ----------
let currentEditId = null;

        // ---------- Evenement  ----------

// form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     ajouterProfesseur();
// });
btnAjouter.addEventListener("click", ajouterProfesseur);



        // ---------- Fonctions  ----------
function ajouterProfesseur()
{
    const nom = nomInput.value.trim();
    const matieres = matieresInput.value.split(",").map(m => m.trim());
    const classes = classesInput.value.split(",").map(c => c.trim());

    if (nom === "")
    {
        errorNom.textContent = "Le nom du professeur est obligatoire";
        return;
    }

    // 🔁 MODE MODIFICATION
    if (currentEditId !== null)
    {
        const index = professeurs.findIndex(p => p.id === currentEditId);
        if (index !== -1)
        {
            professeurs[index].nom = nom;
            professeurs[index].matieres = matieres;
            professeurs[index].classes = classes;
        }

        currentEditId = null;
        btnAjouter.textContent = "Ajouter";
    }
    // ➕ MODE AJOUT
    else
    {
        const professeur = {
            id: Date.now(),
            nom: nom,
            matieres: matieres,
            classes: classes
        };

        professeurs.push(professeur);
    }

    sauvegarderProfesseurs();
    afficherProfesseurs();
    viderFormulaire();
}

function afficherProfesseurs()
{
    tableBody.innerHTML = "";

    for (let prof of professeurs)
    {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${prof.nom}</td>
            <td>${prof.matieres.join(", ")}</td>
            <td>${prof.classes.join(", ")}</td>
            <td>
                <button onclick="lancerModification(${prof.id})"> Modifier </button>
                <button onclick="supprimerProfesseur(${prof.id})"> Supprimer </button>
            </td>
        `;

        tableBody.appendChild(tr);
    }
}

function supprimerProfesseur(id)
{
    professeurs = professeurs.filter(p => p.id !== id);
    sauvegarderProfesseurs();
    afficherProfesseurs();
}

function sauvegarderProfesseurs()
{
    localStorage.setItem("professeurs", JSON.stringify(professeurs));
}

function chargerProfesseurs()
{
    const data = localStorage.getItem("professeurs");
    if (data){
        professeurs = JSON.parse(data);
    }
}

function viderFormulaire()
{
    nomInput.value = "";
    matieresInput.value = "";
    classesInput.value = "";
    errorNom.textContent = "";
}

// ---------- MODIFICATION ----------

function lancerModification(id) {
    const prof = professeurs.find(p => p.id === id);
    if (!prof) return;

    nomInput.value = prof.nom;
    matieresInput.value = prof.matieres.join(", ");
    classesInput.value = prof.classes.join(", ");

    currentEditId = id;
    btnAjouter.textContent = "Modifier";
}


        // ---------- Chargement au demarrage  ----------
    
    chargerProfesseurs();
    afficherProfesseurs();





