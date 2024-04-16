const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const CommandeClass = require("./command-node.js");
const fs = require("fs");



//Variable global
let commandMain = new CommandeClass();
let mainWindow;

//fonction de creation de la fenetre
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    center: true,
    icon: "./src/icon/icon-main.png",
    title: "Invite de commande; electron js", //Et automatiquement remplacé par <title> dans index.html
    autoHideMenuBar: true,
    webPreferences: {
      //devTools: false, //A activé a la fin
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("src/index.html");
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  } 
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});




//-------------------------------------- API --------------------------------------//


ipcMain.handle("getPath", async (event) => {
  return await commandMain.path;
});

ipcMain.handle("getVisiblePath", async (event) => {
  return await commandMain.visiblePath;
});



ipcMain.handle("setVisiblePath", async (event, newVisiblePath) => {
  newVisiblePath = newVisiblePath.replace("//", '\\');
  newVisiblePath = newVisiblePath.replace("/", '\\');
  commandMain.visiblePath = newVisiblePath;
  console.log(commandMain.visiblePath);
});

ipcMain.handle("setPath", async (event, newPath) => {
  newPath = newPath.replace("\\\\", "/")
  commandMain.path = newPath;
  console.log(commandMain.path);
});

ipcMain.handle("commandStart", async (event, programme) => {
  return await commandMain.start("start", programme, commandMain.path);
});

ipcMain.handle("commandSystemInfo", async (event) => {
  return await commandMain.systemInfo();
});



//Pour la commande cd et ou pour le test de chemin
ipcMain.handle("testFolderExist", async (event, chemin) => {
  let returnValue = [];

  if (chemin === "../") {
    if (path.resolve(commandMain.path, '..') !== null) {
      returnValue.push(true);
      returnValue.push(path.resolve(commandMain.path, '..'));
      return returnValue;
    } else {
      returnValue.push(false);
      returnValue.push("no");
      return returnValue;
    }
  }


  if (chemin === "./") {
    return new Promise((resolve, reject) => {
      fs.access(commandMain.path, fs.constants.F_OK, (err) => {
        if (err) {
          returnValue.push(false)
          returnValue.push(commandMain.path)
          resolve(returnValue);
        } else {
          returnValue.push(true)
          returnValue.push(commandMain.path);
          resolve(returnValue);
        }
      });
    });
  };

  return new Promise((resolve, reject) =>{
    fs.access(chemin, fs.constants.F_OK, (err) => {
      if (err) {
        fs.access((commandMain.path + "/" + chemin), fs.constants.F_OK, (err) => {
          if (err) {
            console.log("jsp");
            returnValue.push(false);
            returnValue.push(chemin)
            resolve(returnValue);
          }
          else
          {
            returnValue.push(true);
            returnValue.push(commandMain.path + "/" + chemin)
            resolve(returnValue);
          }
        });
      } else {
        returnValue.push(true);
        returnValue.push(chemin)
        resolve(returnValue);
      }
    });
  });
});



//Recupere tout les dossier, fichier ou les 2 d'un dossier
ipcMain.handle("getFileInFolder", async (event, argument, chemin) => {
  let returned = [];

  //Lit tout ce qu'il y a dans un dossier
  return new Promise((resolve, reject) => {
    fs.readdir(chemin, (err, fichiers) => {
      //  Mauvais dossier
      if (err) {
        console.error("Erreur lors de la lecture du dossier :", err);
        return "0";
      }
    
      //Recupere tout ce qu'il y a dans un dossier
      if (argument === "-A") {
        fichiers.forEach(element => {
          returned.push(element);
        });
      }

      //Recupere que les Ficher dans le dossier
      else if (argument === "-F")
      {
        const fichiersSeulement = fichiers.filter(fichier => fs.statSync(path.join(chemin, fichier)).isFile());
        fichiersSeulement.forEach(fichier => {
          returned.push(fichier);
        });
      }

      //Recupere que les dossiers dans le dossier
      else if (argument === "-D")
      {
        const sousDossiers = fichiers.filter(fichier => {
          const stat = fs.statSync(path.join(chemin, fichier));
          return stat.isDirectory();
        });

        sousDossiers.forEach(sousDossier => {
          returned.push(sousDossier);
        });
      }
       resolve(returned);

      
    });
  });
});
