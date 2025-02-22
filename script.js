/* DOM */
const btnAjouter = document.querySelector("#ajouter");
const listTache = document.querySelector("#listeTache");
const toutSupprBtn = document.querySelectorAll(".btnToutSuppr");
const textInfos = document.querySelector("#textInfos");

const dataSaveBtn = document.querySelector(".sauvegarder");
const dataLink = document.querySelector("#saveData > a");
const inProgressText = document.querySelector("#saveData > span");

const myChartElement = document.querySelector("#myChart");

const myChart = new Chart(myChartElement, {
  type: "pie",
  data: {
    datasets: [
      {
        label: "# de tâches accomplis ",
        data: [0, 0],
        borderWidth: 1,
      },
    ],
  },
});

function effacerInput() {
  document.querySelector("#tache").value = ""; // Corrige le problème
}

function majChart() {
  let nbTaches = 0;
  let nbTachesAccomplis = 0;
  for (let i = 0; i < listTache.childNodes.length; i++) {
    if (listTache.childNodes[i].firstChild.classList.contains("done")) {
      nbTachesAccomplis++;
    } else {
      nbTaches++;
    }
  }

  myChart.data.datasets[0].data = [nbTaches, nbTachesAccomplis];
  myChart.update();
}

function createObject() {
  let listTacheObj = {};

  for (let i = 0; i < listTache.childNodes.length; i++) {
    let valeur = listTache.childNodes[i];

    if (listTache.childNodes.length != 0) {
      let isActive = !valeur.classList.contains("done");

      listTacheObj[`tache_${i}`] = {
        isActive: `${isActive}`,
        tacheContent: `${valeur.firstChild.textContent}`,
      };
    } else {
      listTacheObj = {};
    }
  }

  let blob = new Blob([JSON.stringify(listTacheObj)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  dataLink.href = `${url}`;
  dataLink.download = "todolist_data.json";
}

function evenement() {
  let valeur = document.querySelector("#tache").value;
  /* console.log(nouvelleTache); */

  const VerifInput = valeur.trim();

  if (VerifInput === "") {
    textInfos.textContent = "Veuillez remplir le champs de texte";
    textInfos.classList.add("textInfosError");
    preventDefault();
  }

  const newDiv = document.createElement("div");
  newDiv.classList.add("nouvelleTache");

  const nouvelleTache = document.createElement("p");
  const btnSupprimer = document.createElement("button");

  const poubelle = document.createElement("i");
  poubelle.classList.add("fa-solid");
  poubelle.classList.add("fa-trash");

  /* Ajouter la valeur a nouvelleTache */
  nouvelleTache.textContent = valeur;
  btnSupprimer.appendChild(poubelle);

  /* Ajouter la class supprimer a btnSupprimer */
  btnSupprimer.classList.add("supprimer");

  /* Ajouter le nouvelleTache et btnSupprimer dans newDiv */
  newDiv.appendChild(nouvelleTache);
  newDiv.appendChild(btnSupprimer);

  listTache.appendChild(newDiv);

  /* Mets a jour mon graphique */
  majChart();

  if (listTache.contains(newDiv)) {
    textInfos.textContent = "La tâche a été ajouté avec succès";
    textInfos.classList.remove("textInfosError");
    setTimeout(() => {
      textInfos.textContent = "";
      setTimeout(() => {
        let nbEnfants = listTache.childNodes.length;

        if (!textInfos.textContent.includes(`Vous avez ${nbEnfants}`)) {
          if (nbEnfants < 2) {
            textInfos.textContent = `Vous avez ${nbEnfants} tâche en cours`;
          } else {
            textInfos.textContent = `Vous avez ${nbEnfants} tâches en cours`;
          }
        }
      });
    }, 2500);
  }

  /* Ajout un text-decoration au click de newDiv */
  newDiv.addEventListener("click", () => {
    newDiv.firstChild.classList.toggle("done");
    majChart();
    createObject();
  });

  /* Ajouter un événement pour supprimer l'element newDiv */
  btnSupprimer.addEventListener("click", () => {
    btnSupprimer.parentElement.remove();
    let nbEnfants = listTache.childNodes.length;
    if (nbEnfants < 2) {
      textInfos.textContent = `Vous avez ${nbEnfants} tâche en cours`;
      textInfos.classList.remove("textInfosError");
    } else {
      textInfos.textContent = `Vous avez ${nbEnfants} tâches en cours`;
      textInfos.classList.remove("textInfosError");
    }

    createObject();
  });

  /* Ajouter un evenemenet sur toutSupprBtn  */
  toutSupprBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      listTache.removeChild(newDiv);
      let nbEnfants = listTache.childNodes.length;
      majChart();
      createObject();
      if (nbEnfants < 2) {
        textInfos.textContent = `Vous avez ${nbEnfants} tâche en cours`;
        textInfos.classList.remove("textInfosError");
      } else {
        textInfos.textContent = `Vous avez ${nbEnfants} tâches en cours`;
        textInfos.classList.remove("textInfosError");
      }
    });
  });

  /* Efface la valeur de l'input */
  effacerInput();

  createObject();
}

btnAjouter.addEventListener("click", () => {
  evenement();
});

const input = document.querySelector("#tache");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    evenement();
  }
});

const btnAide = document.querySelector("#btnAide");
const aideModal = document.querySelector("#aideModal");
const btnFerm = document.querySelector("#aideModal div div:first-child i");

btnAide.addEventListener("click", () => {
  const boxDisplay = window.getComputedStyle(aideModal).display;
  if (boxDisplay === "none") {
    aideModal.style.display = "block";
  } else aideModal.style.display = "none";

  btnFerm.addEventListener("click", () => {
    aideModal.style.display = "none";
  });
});

dataSaveBtn.addEventListener("click", () => {
  console.log(listTache.childNodes.length);
  if (listTache.childNodes.length != 0) {
    dataLink.textContent = "";
    inProgressText.textContent = "sauvegarde en cours...";

    setTimeout(() => {
      inProgressText.textContent = "";
      dataLink.textContent = "Cliquez ici pour télécharger la sauvegarde";
      dataLink.style.color = "#37a2eb";
    }, 5000);
  }
});
