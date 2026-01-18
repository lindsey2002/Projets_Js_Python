// Récupérer l'id de la classe depuis l'URL
const params = new URLSearchParams(window.location.search);
const classeId = Number(params.get("id"));

// Récupérer les classes depuis localStorage
const classes = JSON.parse(localStorage.getItem("classes")) || [];

// Trouver la classe correspondante
const classe = classes.find(c => c.id === classeId);

const classeNomElem = document.getElementById("classe-nom");
const tbodyMatieres = document.getElementById("table-matieres-description");

if (classe) {
    // Afficher le nom de la classe
    classeNomElem.textContent = `Classe : ${classe.nom}`;

    // Afficher les matières
    classe.matieres = classe.matieres || [];
    tbodyMatieres.innerHTML = "";

    classe.matieres.forEach(m => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${m.nom}</td>
            <td>${m.nbNotes}</td>
            <td>${m.coef}</td>
        `;
        tbodyMatieres.appendChild(tr);
    });
} else {
    classeNomElem.textContent = "Classe introuvable";
    tbodyMatieres.innerHTML = `<tr><td colspan="2">Aucune matière trouvée</td></tr>`;
}
