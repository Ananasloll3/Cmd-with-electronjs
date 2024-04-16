import {executeCommand} from './command-basic.js'

//Variable global
let cmd = document.getElementById("cmd");
let cmdMain = document.querySelector(".cmdMain");
let inputCommand = document.getElementById("inputCommand");
let formulaire = document.getElementById("formulaire");

//Variable Globale
let path = "c:/";
let visiblePath = "C:\\";

//intervale de 0.2s qui met a jour les variable : path et visblePath par rapport au variable de main.js
setInterval(miseAJour, 200);

//Fonction de mise a jour auto des chemin contenue dans main.js
async function miseAJour()
{
    path = await electronAPI.getPath();
    visiblePath = await electronAPI.getVisiblePath();
    document.querySelector(".spPath").innerHTML = visiblePath + ">";
}

//Mise a taille dés la page load
document.addEventListener('DOMContentLoaded', async function() {
    let taille = window.innerHeight - 35;
    cmd.style.height = taille + "px";
    cmd.style.width = "900px";
    document.querySelector(".spPath").innerHTML = await electronAPI.getVisiblePath();
});


//Mise a taille de la div par rapport a la taille de la page
window.addEventListener('resize', async function() {
    cmd.style.height = window.innerHeight - 35 + "px";
    cmd.style.width = (window.innerWidth - (window.innerWidth * 0.1)) + "px";
    let widthCmdStr = cmd.style.width.slice(0, cmd.style.width.search("px"));
    let withCmd = parseInt(widthCmdStr);
    inputCommand.style.width = (withCmd - (withCmd * 0.1)) + "px";
});


//Ecout d'evenement submit du formulaire
formulaire.addEventListener('submit', (event) => {
    event.preventDefault();

    //execution de la fonction du systeme de commande
    nouvelleCommande(inputCommand.value);
    inputCommand.value = "";
});



//Pour mettre sur plusieur ligne la commande
function test(text)
{
    if (text.length < 100) {
        return text;
    }
    else if (text.length >= 100 && text.length <= 199)
    {
        return text.slice(0, 99) + "<br>" + text.slice(100, text.length);
    }
    else if (text.length >= 200 && text.length <= 299)
    {
        return text.slice(0, 99) + "<br>" + text.slice(100, 199) + "<br>" + text.slice(200, text.length);
    }
    else if (text.length >= 300 && text.length <= 399)
    {
        return text.slice(0, 99) + "<br>" + text.slice(100, 199) + "<br>" + text.slice(200, 299) + "<br>" + text.slice(300, text.length);
    }
    else if (text.length >= 400 && text.length <= 499)
    {
        return text.slice(0, 99) + "<br>" + text.slice(100, 199) + "<br>" + text.slice(200, 299) + "<br>" + text.slice(300, 399) + "<br>" + text.slice(400, text.length);
    }
    else if (text.length >= 500 && text.length <= 599)
    {
        return text.slice(0, 99) + "<br>" + text.slice(100, 199) + "<br>" + text.slice(200, 299) + "<br>" + text.slice(300, 399) + "<br>" + text.slice(400, 499) + "<br>" + text.slice(500, text.length);
    }
    else
    {
        return text
    }

}


//Fonction pour ajouter une nouvelle commande et l'executer 
async function nouvelleCommande(text)
{
    //Pour executer 1 fois la commande
    let bool = true;

    //Creation de la div et de element pour le texte de la commande
    let div = document.createElement("div");
    div.className = "commandWatch";
    let span = document.createElement("span");
    span.innerHTML += visiblePath + "> " + test(text);

    let brA = document.createElement("br");
    let brB = document.createElement("br");

    //Duplique le formulaire
    let newFormulaire = formulaire;

    //Creation de la div qui stockeras la prochaine commande
    div.appendChild(span);
    div.appendChild(brA);
    div.appendChild(brB);
    cmd.appendChild(div);

    /* Teste si la valeur d'input == au mot, car certainnent commande doivent etre executer
        avant la reaparition du formulaire                                                 */
    // Retour de fonction : Array [0] = erreur, erreur : 0 = reussi
    if (inputCommand.value.toUpperCase().slice(0, 4) === "HELP") {
        await executeCommand(inputCommand.value);
    }
    else if (inputCommand.value.toUpperCase().slice(0, 2) === "CD") {
        await executeCommand(inputCommand.value);
    }
    else if (inputCommand.value.toUpperCase().slice(0,2) === "LS") {
        await executeCommand(inputCommand.value);
    }
    else
    {
        await executeCommand(inputCommand.value);
    }

    //Enleve et remet le formulaire en dessous du reste
    cmd.removeChild(formulaire);
    cmd.appendChild(newFormulaire);


    //Pour que la taille de la div soit a la taille du document
    var taillePage = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    cmd.style.height = (taillePage - 20) + "px";
}

