//Memo
// : electronAPI

import {systemInfoFunc} from './command-long.js'

export async function executeCommand(commandArriver)
{
    //variable global
    commandArriver = commandArriver.replace(/^\s+/i, '')
    let commands = commandArriver.toUpperCase();
    let cmd = document.getElementById("cmd");
    let formulaire = document.getElementById("formulaire");
    let pathArriver = "";
    let retourFunction = [];


    //Commande Help
    if (commands.slice(0, 4) === "HELP")     //Erreur = 1
    {
        let div = document.createElement("div");
        div.className = "help";

        let span = document.createElement("span");
        span.className = "spanHelp";
        span.innerHTML = `
        help &nbsp;: Donne toute les commande possible<br>
        cls &nbsp;&nbsp;&nbsp;&nbsp;: Clear le cmd<br>
        start : Lance un programme<br>
        ls &nbsp;&nbsp;&nbsp;&nbsp; : Liste tout un dossier<br>
        cd &nbsp;&nbsp;&nbsp;&nbsp;: Change de repertoire<br>
        Print : Ecrit dans le terminal<br>
        Echo : Ecrit dans le terminale<br>
        Log() : Ecrit dans le terminale<br>
        <br>
        `;

        div.appendChild(span);
        cmd.appendChild(div);
    }
    //Commande Cls
    else if (commands.slice(0, 3) === "CLS")   //Erreur = 2
    {
        window.location.href = "./index.html"
        /*
        while (cmd.firstChild) {
            // Vérifier si le nœud n'est pas celui que nous voulons conserver
            if (cmd.firstChild !== formulaire) {
              // Supprimer le nœud enfant
              cmd.removeChild(cmd.firstChild);
            } else {
              // Passer
              break;
            }
        }
        console.log("CLS");*/
    }
    //Comannde Cd
    else if (commands.slice(0, 2) === "CD")    //Erreur = 3
    {
        //Pour garder tout le chemin, enleve le debut de la commande et les espace
        pathArriver = commandArriver.slice(2, commandArriver.length);
        pathArriver = pathArriver.replace(/\s/g, '');
        if (pathArriver == "info") {
            await electronAPI.setPath("C:/users/infostage2");
            await electronAPI.setVisiblePath("C:/users/infostage2");
            return;
        }

        //Recupere un array avec [0] si le chemin existe, [1] le chemin entier
        let test = await testFolder(pathArriver);
        console.log(test);
        if (test[0])
        {
            //mise a jour des varible path et visiblePath de main.js
            await electronAPI.setPath(test[1]);
            await electronAPI.setVisiblePath(test[1]);
        }
        else
        {
          return;  
        }
        
    }
    else if (commands.slice(0, 2) === "LS")    //Erreur = 4
    {
        let argument = commandArriver.slice(2, commandArriver.length);
        argument = argument.replace(/\s/g, '');
        argument = argument.toUpperCase();


        if (argument === "-A" || argument === "-F" ||argument === "-D")
        {
            //Demander a l'api tout les fichier du dossier actuelle
            let arrayFolder = await electronAPI.getFileInFolder(argument, await electronAPI.getPath());
            console.log(arrayFolder);
            let newDiv = document.createElement("div");
            newDiv.className = "divNomFichier";

            arrayFolder.forEach(File => {
                let span = document.createElement("span");
                span.className = "file";
                span.innerHTML = " -" + File;
                newDiv.appendChild(span);
                newDiv.appendChild(document.createElement("br"));
            });
            newDiv.appendChild(document.createElement("br"));
            cmd.appendChild(newDiv);
            return;
        }
        else
        {
            let eDiv = document.createElement('div');
            let eSpan = document.createElement('span');
            eDiv.className = "lsErreurDiv";
            eSpan.className = "lsErreurSpan";
            eSpan.innerHTML = "Commande Incomplete : LS <br>";
            eDiv.appendChild(eSpan);
            cmd.appendChild(eDiv);
        }
    }
    else if (commands.slice(0, 5) === "START") //Erreur = 5
    {   
        //Meilleur command
        let argument = commandArriver.replace(/^(start)\s+/i, '');
        console.log(argument);

        let divStart = document.createElement("div");
        let spanStart = document.createElement("span");
        divStart.className = "divStart";
        spanStart.className = "spanStart";
        let reussi = await electronAPI.commandStart(argument);

        if (reussi === "true") { spanStart.innerHTML = `Le lancement du programme a reussi : ${argument}`; }
        else { spanStart.innerHTML = `Le lancement du programme a echouer  : ${argument}`; }

        divStart.appendChild(spanStart);
        divStart.appendChild(document.createElement("br"));
        divStart.appendChild(document.createElement("br"));
        cmd.appendChild(divStart);
    }
    else if (commands.slice(0, 5) === "PRINT" || commands.slice(0, 4) === "ECHO" || commands.slice(0, 3) == "LOG") //Erreur = 6
    {
        let type = (commands.slice(0, 5) === "PRINT") ? "PRINT" : (commands.slice(0, 4) === "ECHO") ? "ECHO" : "LOG";
        let returned = await terminalMessage(type, commandArriver)

        let divDire = document.createElement("div");
        let spanDire = document.createElement("span");
        divDire.className = "divDire";
        spanDire.className = "spanDire";

        if (returned === "") {
            spanDire.innerHTML = "Command mal ecrite";
        }
        else
        {
            spanDire.innerHTML = returned;
        }

        divDire.appendChild(spanDire);
        divDire.appendChild(document.createElement("br"));
        divDire.appendChild(document.createElement("br"));
        cmd.appendChild(divDire);
    }
    else if (commands.slice(0,10) === "SYSTEMINFO") //Erreur = 7
    {
        let systemInfo = await electronAPI.commandSystemInfo();
        console.log(systemInfo);
        let divSystemInfo = await systemInfoFunc(systemInfo);

        cmd.appendChild(divSystemInfo);
        cmd.appendChild(document.createElement("br"));
        var taillePage = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        cmd.style.height = (taillePage - 20) + "px";
    }
    else{ //Comande Incorrecte
        let divNoCommand = document.createElement("div");
        let span = document.createElement("span");

        divNoCommand.className = "divNonCommandFound";
        span.className = "spanNonCommandFound";

        span.innerHTML = `"${commands}" n'est pas un commande connue`;
        divNoCommand.appendChild(span);
        divNoCommand.appendChild(document.createElement("br"));
        divNoCommand.appendChild(document.createElement("br"));
        cmd.appendChild(divNoCommand);
        return;
    }
}


async function terminalMessage(type, commande)
{
    let str = "";
    if (type === "PRINT") 
    {
        str = commande.slice(5, commande.length);
        str = str.replace(/^\s+/i, '')

        let index = str.search('"');
        str = str.slice(index + 1, str.length);

        index = str.search('"');
        str = str.replace(str.slice(index, str.length), "");

        return str; 
    }
    else if (type === "ECHO")
    {
        str = commande.slice(4, commande.length);
        str = str.replace(/^\s+/i, '')
        return str; 
    }
    else //log()
    {
        str = commande.slice(3, commande.length);
        str = str.replace(/^\s+/i, '')

        let index = str.search('"');
        str = str.slice(index + 1, str.length);

        index = str.search('"');
        str = str.replace(str.slice(index, str.length), "");
        return str; 
    }

}



async function testFolder(chemin)
{
    return await electronAPI.testFolderExist(chemin);
}