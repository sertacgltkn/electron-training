const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

console.log(process.platform);

app.on("ready", () => {
  mainWindow = new BrowserWindow({});

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  ipcMain.on("key", (err, data) => {
    console.log(data);
  });
  ipcMain.on("key:inputValue", (err, data) => {
    console.log(data);
  });

  ipcMain.on("key:newWindow", () => {
    createWindow();
  });

  mainWindow.on("closed", () => {
    app.quit();
  });
});

const mainMenuTemplate = [
  {
    label: "Dosya",
    submenu: [
      {
        label: "Yeni ToDo Ekle",
      },
      {
        label: "Tümünü Sil",
      },
      {
        label: "Cikis",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        role: "quit",
      },
    ],
  },
];

// menu for mac
if (process.platform === "darwin") {
  mainMenuTemplate.unshift({
    label: app.getName(),
    role: "TODO",
  });
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    subMenu: [
      {
        label: "Geliştirici Penceresini Aç",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: "Yenile",
        role: "reload",
      },
    ],
  });
}

function createWindow() {
  addWindow = new BrowserWindow({
    width: 482,
    height: 200,
    title: "Ynei bir pencere",
  });

  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "modal.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  addWindow.on("close", () => {
    addWindow = null;
  });
}
