const { exec } = require('child_process');
const si = require('systeminformation');
const os = require('os');
const { net } = require('electron');



//Class commande pour l'execution de fichier exe
class CommandeClass{
    path = "C:/";
    visiblePath = "C:\\";
    
    //Commande start
    async start(commandArriver, programme, chemin){
        return new Promise((resolve, reject) => {

            const commands = `command.exe ${commandArriver} ${programme} ${chemin}`;
            exec(commands, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur lors de l'exécution du code C++: ${error}`);
                    reject(error);
                } else {
                    console.log(`Commande exécutée : ${commands}`);
                    console.log(`Sortie (stdout) : ${stdout}`);
                    resolve(stdout);
                }
            });
    
        });
    }  

    //Autre commande
    async systemInfo()
    {
        let systemInfoArray = [];

        //Info CPU
        const cpu = os.cpus();
        const arch = os.arch();
        const cpuTemp = await si.cpuTemperature();

        //Info Machine
        const hostename = os.hostname();
        const userInfo = os.userInfo();
        const platform = os.platform();
        const machine = os.machine();
        const version = os.version();
        const release = os.release();
        const type = os.type();
        const network = os.networkInterfaces();
        const uptime = os.uptime();

        //Info GPU
        const graphics = await si.graphics();

        //Info RAM
        const ram = await si.mem();

        systemInfoArray.push(cpu, arch, cpuTemp, hostename, userInfo, platform, machine, version, release, type, network, uptime, graphics, ram); 
        
        //Retour avec toute les info


        return systemInfoArray;
    }

}

//export de la class vers main.js
module.exports = CommandeClass;