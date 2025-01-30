/* DOM */
const btnAjouter = document.querySelector('#ajouter');
const listTache = document.querySelector('#listeTache');
const toutSupprBtn = document.querySelectorAll('.btnToutSuppr');

btnAjouter.addEventListener('click', () => {
    /* Récupere la valeur de l'input */
    const valeur = document.querySelector('#tache').value;
    /* console.log(nouvelleTache); */

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
    });

    /* Ajouter un evenemenet sur toutSupprBtn  */
    toutSupprBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            listTache.removeChild(newDiv);
        });
    });

})
