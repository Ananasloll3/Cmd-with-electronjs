export async function systemInfoFunc(systemInfo)
 {
    let divSystemInfo = document.createElement("div");
    let divSystemInfoCpu = document.createElement("div");
    let divSystemInfoGpu = document.createElement("div");
    let divSystemInfoMoniteur = document.createElement("div");
    let divSystemInfoRam = document.createElement("div");
    let divSystemInfoMachine = document.createElement("div");


    divSystemInfo.className = "divSystemInfo";
    divSystemInfoCpu.className = "divSystemInfoCpu";
    divSystemInfoGpu.className = "divSystemInfoGpu";
    divSystemInfoMoniteur.className = "divSystemInfoMoniteur";
    divSystemInfoRam.className = "divSystemInfoRam";
    divSystemInfoMachine.className = "divSystemInfoMachine";

    let spanCpuHeart = document.createElement("span");
    let spanCpu = document.createElement("span");
    let spanGpu = document.createElement("span");
    let spanGraphique = document.createElement("span");
    let spanMoniteur = document.createElement("span");
    let spanMoniteurIn = document.createElement("span");
    let spanInfoMachine = document.createElement("span");
    let spanInfoMachineIn = document.createElement("span");
        
    spanCpu.innerHTML = "Processeur : ";
    spanGraphique.innerHTML = "Graphique : ";
    spanMoniteur.innerHTML = "Moniteur :";
    spanInfoMachine.innerHTML = "Info Machine :";


    spanCpu.style.color = "red";
    spanCpu.style.textDecoration = "underline";

    spanGraphique.style.color = "red";
    spanGraphique.style.textDecoration = "underline";

    spanMoniteur.style.color = "red";
    spanMoniteur.style.textDecoration = "underline";

    spanInfoMachine.style.color = "red";
    spanInfoMachine.style.textDecoration = "underline";


    //Cpu -------------------------------------------
    spanCpuHeart.innerHTML = `Nombre de coeur = ${systemInfo[0].length} :<br><br>`;
    for (let index = 0; index < systemInfo[0].length ; index++) {
        spanCpuHeart.innerHTML = spanCpuHeart.innerHTML + systemInfo[0][index].model + ", speed : " + systemInfo[0][index].speed + "h / " + (systemInfo[0][index].speed / 1000) + "GHz<br>"
    }
    spanCpuHeart.style.color = "rgb(61, 180, 61)";
    spanCpuHeart.innerHTML = spanCpuHeart.innerHTML + "<br>";


    //Graphique --------------------------------------
    spanGpu.innerHTML = `Model = ${systemInfo[12].controllers[0].model}<br>Name = ${systemInfo[12].controllers[0].name}<br>Vendeur = ${systemInfo[12].controllers[0].vendor}<br>Vram = ${systemInfo[12].controllers[0].Vram}<br>Memory Free = ${systemInfo[12].controllers[0].memoryFree}<br>Version du driver = ${systemInfo[12].controllers[0].driverVersion}<br>Bus = ${systemInfo[12].controllers[0].bus}<br><br>`;
        spanGpu.style.color = "rgb(61, 180, 61)";
        

    //moniteur ----------------------------------------
    for (let index = 0; index < systemInfo[12].displays.length; index++) { 
        spanMoniteurIn.innerHTML = spanMoniteurIn.innerHTML + "Numeros = " + index + "<br>Model = " + systemInfo[12].displays[index].model + "<br>Pixel = " + systemInfo[12].displays[index].currentResX + "x" + systemInfo[12].displays[index].currentResY + "<br>Connection = " + systemInfo[12].displays[index].connection + "<br>Main = " + systemInfo[12].displays[index].main + "<br>Nom ecran (windows) = " + systemInfo[12].displays[index].deviceName + "<br><br>";
    }
    spanMoniteurIn.style.color = "rgb(61, 180, 61)";

    //Info System --------------------------------------
    spanInfoMachineIn.innerHTML = `<br>Hostname = ${systemInfo[3]}<br>Username = ${systemInfo[4].username}<br>HomeDir = ${systemInfo[4].homedir}<br>Arch = ${systemInfo[1]}<br>Machine = ${systemInfo[6]}<br>Platforme = ${systemInfo[5]}<br>Type = ${systemInfo[7]} : ${systemInfo[9]}<br>Version = ${systemInfo[8]}<br><br>`;
    spanInfoMachineIn.style.color = "rgb(61, 180, 61)";


    //Mise en forme ------------------------------------
    divSystemInfo.appendChild(spanCpu);
    divSystemInfo.appendChild(document.createElement("br"));

    //Cpu
    divSystemInfoCpu.appendChild(spanCpuHeart);

    //Gpu
    divSystemInfoGpu.appendChild(spanGraphique);
    divSystemInfoGpu.appendChild(spanGpu);

    //Moniteur
    divSystemInfoMoniteur.appendChild(spanMoniteur);
    divSystemInfoMoniteur.appendChild(document.createElement("br"));
    divSystemInfoMoniteur.appendChild(spanMoniteurIn);

    //Info Machine
    divSystemInfoMachine.appendChild(spanInfoMachine);
    divSystemInfoMachine.appendChild(spanInfoMachineIn);


    //Info system
    divSystemInfo.appendChild(divSystemInfoCpu);
    divSystemInfo.appendChild(spanGraphique);
    divSystemInfo.appendChild(divSystemInfoGpu);
    divSystemInfo.appendChild(divSystemInfoMoniteur);
    divSystemInfo.appendChild(divSystemInfoMachine);

    return divSystemInfo;
 }


