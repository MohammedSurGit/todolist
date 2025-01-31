/* DOM */
const btnAjouter = document.querySelector('#ajouter');
const listTache = document.querySelector('#listeTache');
const toutSupprBtn = document.querySelectorAll('.btnToutSuppr');
const textInfos = document.querySelector('#textInfos');

function evenement() {
    const valeur = document.querySelector('#tache').value;
    /* console.log(nouvelleTache); */

    const VerifInput = valeur.trim();

    if (VerifInput === "") {
        textInfos.textContent = "Veuillez remplir le champs de texte";
        textInfos.classList.add('textInfosError');
        preventDefault();
    } 

    const newDiv =  document.createElement('div');

    const nouvelleTache = document.createElement('p');
    const btnSupprimer = document.createElement('button');

    const poubelle = document.createElement('i');
    poubelle.classList.add('fa-solid');
    poubelle.classList.add('fa-trash');


    /* Ajouter la valeur a nouvelleTache */
    nouvelleTache.textContent =  valeur;
    btnSupprimer.appendChild(poubelle);


    /* Ajouter la class supprimer a btnSupprimer */
    btnSupprimer.classList.add('supprimer');


    /* Ajouter le nouvelleTache et btnSupprimer dans newDiv */
    newDiv.appendChild(nouvelleTache);
    newDiv.appendChild(btnSupprimer);

    listTache.appendChild(newDiv);


    if (listTache.contains(newDiv)) {
        textInfos.textContent = "La tâche a été ajouté avec succès";
        textInfos.classList.remove('textInfosError');
        setTimeout(() => {
            textInfos.textContent = "";
            setTimeout( () => {
                let nbEnfants = listTache.childNodes.length;
                if (!textInfos.textContent.includes(`Vous avez ${nbEnfants - 1}`)) {
                    if ( nbEnfants < 3 ) {
                        textInfos.textContent = `Vous avez ${nbEnfants - 1} tâche en cours`;
                    } else {textInfos.textContent = `Vous avez ${nbEnfants - 1} tâches en cours`};
                }
            })
        }, 2500);
    }

    /* Ajout un text-decoration au click de newDiv */
    newDiv.addEventListener('click', () => {
        const textDecoration = window.getComputedStyle(nouvelleTache).textDecoration;
        if (textDecoration.includes('line-through')) {
            nouvelleTache.style.textDecoration = 'none';
        } else nouvelleTache.style.textDecoration = 'line-through';
    });


    /* Ajouter un événement pour supprimer l'element newDiv */
    btnSupprimer.addEventListener('click', () => {
        btnSupprimer.parentElement.remove();
        let nbEnfants = listTache.childNodes.length;
        if ( nbEnfants < 3 ) {
            textInfos.textContent = `Vous avez ${nbEnfants - 1} tâche en cours`;
            textInfos.classList.remove('textInfosError')
        } else {textInfos.textContent = `Vous avez ${nbEnfants - 1} tâches en cours`
        textInfos.classList.remove('textInfosError')
    };
        
    });

    /* Ajouter un evenemenet sur toutSupprBtn  */
    toutSupprBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            listTache.removeChild(newDiv);
            let nbEnfants = listTache.childNodes.length;
            if ( nbEnfants < 3 ) {
                textInfos.textContent = `Vous avez ${nbEnfants - 1} tâche en cours`;
                textInfos.classList.remove('textInfosError')
            } else {textInfos.textContent = `Vous avez ${nbEnfants - 1} tâches en cours`
            textInfos.classList.remove('textInfosError')
        };
        });
    });
};

btnAjouter.addEventListener('click', () => {
    evenement();
});

const input = document.querySelector('#tache');

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        evenement();
    };
});


const btnAide = document.querySelector('#btnAide');
const aideModal = document.querySelector('#aideModal');
const btnFerm = document.querySelector('#aideModal div div:first-child i')

btnAide.addEventListener('click', () => {
    const boxDisplay = window.getComputedStyle(aideModal).display;
    if (boxDisplay === 'none') {
        aideModal.style.display = 'block';
    } else aideModal.style.display = 'none';

btnFerm.addEventListener('click', () => {
    aideModal.style.display = 'none';
});

});