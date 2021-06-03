/**
 * @name DiscordLock
 * @author cojored
 * @description Adds a button to lock discord when you are away
 * @version 0.0.1
 * @invite qQ7zds27
 * @authorId 694644198531661844
 */

module.exports = class DiscordLock {
  load() {}

  getVersion() {
    return "0.0.1";
  }

  getDescription() {
    return "Adds a button to lock discord when you are away";
  }

  getName() {
    return "DiscordLock";
  }

  getAuthor() {
    return "cojored";
  }

  start() {
    this.enabled = true;

    setInterval(() => {
      if (this.enabled === false) return;
      createIcon();
    }, 500);

    function wait(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
    fetch("https://dscgg.net/versions/discordlock")
      .then((res) => res.text())
      .then((res) => {
        if (res != "0.0.1") {
          BdApi.alert(
            "Plugin Outdated",
            "The plugin discord lock is outdated please update it at https://github.com/cojored/DiscordLock-BD-Plugin"
          );
        }
      });

    setInterval(() => {
      fetch("https://dscgg.net/versions/discordlock")
        .then((res) => res.text())
        .then((res) => {
          if (res != "0.0.1") {
            BdApi.alert(
              "Plugin Outdated",
              "The plugin discord lock is outdated please update it at https://github.com/cojored/DiscordLock-BD-Plugin"
            );
          }
        });
    }, 3600000);

    async function createIcon() {
      if (document.getElementById("lockbtn")) return;
      var div = document.createElement("div");
      document
        .getElementsByClassName("buttons-3JBrkn da-buttons")[0]
        .appendChild(div);
      div.innerHTML = `<button aria-label="Lock" tabindex="0" id="lockbtn" type="button" class="button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow"><div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button"><div class="buttonWrapper-1ZmCpA da-buttonWrapper" id="children" style="opacity: 1; transform: none;"><svg width="30" height="30" aria-hidden="false" viewBox="15 10 27 27"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M30.242,15.779c0-3.721-3.025-6.747-6.745-6.747c-3.718,0-6.742,3.026-6.742,6.747v4.857H13.63V37.97h19.74V20.637h-3.128    V15.779z M26.868,20.637h-6.736V15.78c0-1.863,1.511-3.372,3.366-3.372c1.857,0,3.371,1.509,3.371,3.372L26.868,20.637    L26.868,20.637z"></path></svg></div></div></button>`;
      //await wait(1000)
      document
        .getElementById("lockbtn")
        .addEventListener("click", async function() {
          if (
            BdApi.getData("DiscordLock", "unlockChar") === null ||
            BdApi.getData("DiscordLock", "unlockChar") === undefined
          )
            return BdApi.alert(
              "No unlock button",
              "No unlock button is defined please enter one in settings"
            );
          document.getElementById("app-mount").remove();
          const cover = document.createElement("div");
          //cover.setAttribute("class", "da-appMount")
          cover.setAttribute("id", "app-mount");
          cover.setAttribute("width", "100vh");
          cover.setAttribute("height", "100vh");
          cover.setAttribute("style", "background-color: black;");
          const backbtn = document.createElement("button");
          backbtn.setAttribute(
            "style",
            `border: none;
        color: black;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        background-color: black;
        cursor: default;
        font-size: 16px;
        margin: 4px 2px;`
          );
          cover.appendChild(backbtn);
          backbtn.innerHTML = `&rlm;&rlm;&lrm;&lrm;<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>&rlm;&rlm;&lrm;&lrm;`;
          document.getElementsByTagName("body")[0].appendChild(cover);
          document.addEventListener("keydown", (keyPress) => {
            const special = {
              "/": "Slash",
              ";": "Semicolon",
              ",": "Comma",
              ".": "Period",
              " ": "Space",
            };
            if (
              `Numpad${BdApi.getData(
                "DiscordLock",
                "unlockChar"
              ).toUpperCase()}` === keyPress.code ||
              special[BdApi.getData("DiscordLock", "unlockChar")] ===
                keyPress.code ||
              `Digit${BdApi.getData(
                "DiscordLock",
                "unlockChar"
              ).toUpperCase()}` === keyPress.code ||
              `Key${BdApi.getData(
                "DiscordLock",
                "unlockChar"
              ).toUpperCase()}` === keyPress.code
            ) {
              window.location.reload();
            } else {
              alert("Incorrect");
            }
          });
          //alert("Button Pressed");
        });
      // console.log("attempted icon change");
    }
  }
  stop() {
    this.enabled = false;
  }

  getSettingsPanel() {
    const div = document.createElement("div");
    const header = Object.assign(document.createElement("h2"), {
      innerHTML: "<b>Discord Lock Settings</b>",
    });
    div.appendChild(header);
    const settingText = Object.assign(document.createElement("h5"), {
      innerHTML: "<br><br><b>Unlock Character</b>",
    });
    div.appendChild(settingText);
    div.appendChild(document.createElement("br"));
    const settingTextBox = Object.assign(document.createElement("input"), {
      style: `color: white;
        background-color: var(--background-primary);`,
      id: "unlockChar",
      placeholder:
        "Please only enter lowercase letters and numbers anything or risk not being able to unlock discord",
    });
    settingTextBox.setAttribute(
      "class",
      "input-1G2o7i input-1UhAnY base-96ewKC da-input da-input da-base"
    );
    settingTextBox.setAttribute("maxlength", "1");
    settingTextBox.setAttribute("pattern", "([a-z]|d)");
    div.appendChild(settingTextBox);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    const saveBtn = Object.assign(document.createElement("button"), {
      innerHTML: "Save!",
    });
    saveBtn.setAttribute("class", "bd-button bda-settings-button");
    div.appendChild(saveBtn);
    saveBtn.addEventListener("click", () => {
      BdApi.saveData(
        "DiscordLock",
        "unlockChar",
        document.getElementById("unlockChar").value
      );
      settingTextBox.value = "";
      BdApi.alert("Saved", "We have saved the data");
    });
    return div;
  }
};
