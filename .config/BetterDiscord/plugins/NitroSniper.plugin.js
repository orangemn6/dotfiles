/**
 * @name NitroSniper
 * @version 1.0.3
 * @description Automatically redeems Discord nitro gift codes. Donate some bitcoin if you wish `bc1q9wmggjd8st8erqfnyyt309ew3r9hwc3ss97mgj`
 * @authorId 230356924284010508
 * @source https://gist.github.com/Xpl0itR/ecbddbd495b8ca20c3a209bfb3a680f5
 */
/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

module.exports = (() => {
    const config = {"info":{"name":"NitroSniper","authors":[{"name":"Xpl0itR","discord_id":"230356924284010508","github_username":"Xpl0itR"}],"version":"1.0.3","description":"Automatically redeems Discord nitro gift codes. Donate some bitcoin if you wish `bc1q9wmggjd8st8erqfnyyt309ew3r9hwc3ss97mgj`","github":"https://gist.github.com/Xpl0itR/ecbddbd495b8ca20c3a209bfb3a680f5","github_raw":""},"main":"index.js"};

    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {
    const { Patcher,    DiscordModules  } = Library;
    const { getGuild,   getGuilds       } = DiscordModules.GuildStore;
    const { getChannel, getDMFromUserId } = DiscordModules.ChannelStore;

    return class NitroSniper extends Plugin {
        PaymentSourceId = null
        UnpatchDispatch = null
        Headers         = {
            "Accept":        "*/*",
            "User-Agent":    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.56 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36",
            "Authorization": ""
        }

        async onStart() {
            let success;

            for (let token of this.findTokens()) {
                success = await this.logIn(token);
                if (success) break;
            }

            if (!success) {
                BdApi.alert("NitroSniper Error", "Could not find a token to login with! Exiting...");
                return;
            }

            //success = await this.setPaymentSourceId()
            //if (!success) return

            this.UnpatchDispatch = BdApi.monkeyPatch(BdApi.findModuleByProps("dispatch"), "dispatch", { after: this.afterDispatch.bind(this) });
        }

        onStop() {
            this.UnpatchDispatch?.();
        }

        findTokens() {
            const fs          = require("fs");
            const discordName = process.cwd().match(/discord?.+?(?=(\\|\/))/gi)[0];
            const levelDbPath = `${process.env.APPDATA}\\${discordName}\\Local Storage\\leveldb\\`;

            let tokens = [];
            for (let fileName of fs.readdirSync(levelDbPath)) {
                if (fileName === "LOCK") continue;

                let file = fs.readFileSync(levelDbPath + fileName, { encoding: "utf8" })

                for (let regex of [new RegExp("mfa\\.[\\w-]{84}"), new RegExp("[\\w-]{24}\\.[\\w-]{6}\\.[\\w-]{27}")]) {
                    let match = file.match(regex);
                    if (match != null)
                        tokens = tokens.concat(match);
                }
            }

            return new Set(tokens)
        }

        async logIn(token) {
            this.Headers["Authorization"] = token;

            let response = await fetch("https://discord.com/api/v8/users/@me", {
                method:  "GET",
                headers: this.Headers
            });

            if (response.status === 200) {
                let responseBody = await response.json();
                let userText     = `${responseBody.username}#${responseBody.discriminator} [${responseBody.id}]`;

                BdApi.showToast(`NitroSniper logged in successfully as ${userText}`, { type: "success" });
                return true;
            }

            return false;
        }

        async setPaymentSourceId() {
            let response = await fetch("https://discord.com/api/v8/users/@me/billing/payment-sources", {
                method:  "GET",
                headers: this.Headers,
            });

            if (response.status !== 200) {
                BdApi.alert("NitroSniper Error", `Could not find a valid payment source. Request returned ${response.status} - ${response.statusText}`);
                return false;
            }

            for (let paymentSource of await response.json()) {
                if (!paymentSource.invalid) {
                    this.PaymentSourceId = paymentSource.id;
                    return true;
                }
            }

            BdApi.alert("NitroSniper Error", `Could not find a valid payment source! Please make sure you have a valid payment source linked to your account.`);
            return false;
        }

        afterDispatch(dispatched) {
            if (dispatched.methodArguments[0].type !== "MESSAGE_CREATE" && dispatched.methodArguments[0].type !== "MESSAGE_UPDATE")
                return;

            const message = dispatched.methodArguments[0].message;

            if (message.content == null)
                return;

            const giftUrlArray = message.content.match(/(https?:\/\/)?(www\.)?(discord(\.|\.com\/)gifts?)\/[^_\W]+/g);

            if (giftUrlArray == null)
                return;

            giftUrlArray.forEach(async (giftUrl) => {
                const code = giftUrl.replace(/(https?:\/\/)?(www\.)?(discord(\.|\.com\/)gifts?)\//g, "");

                let checkResponse = await fetch(`https://discord.com/api/v8/entitlements/gift-codes/${code}`, {
                    method:  "GET",
                    headers: this.Headers,
                });

                if (checkResponse.status !== 200) {
                    BdApi.alert("NitroSniper Error", await this.formatRedeemAlert(code, message, false, checkResponse));
                    return;
                }

                let checkResponseBody = await checkResponse.json();
                if (checkResponseBody.redeemed === true) {
                    BdApi.alert("NitroSniper Error", `The nitro code, \`${code}\`, has already been redeemed! Code was ${this.messageContextString(message)}`);
                    return;
                }

                let redeemResponse = await fetch(`https://discord.com/api/v8/entitlements/gift-codes/${code}/redeem`, {
                    method: "POST",
                    headers: this.Headers,
                    //body: {"channel_id": message.channel_id, "payment_source_id": this.PaymentSourceId }
                });

                if (redeemResponse.status === 200)
                    BdApi.alert("NitroSniper Success", await this.formatRedeemAlert(code, message, true, null));
                else
                    BdApi.alert("NitroSniper Error", await this.formatRedeemAlert(code, message, false, redeemResponse));
            });
        }

        async formatRedeemAlert(code, message, success, response) {
            let text = this.messageContextString(message)

            if (success)
                return `Successfully redeemed nitro code \`${code}\` ${text}`

            let responseBody = await response.json()
            let errorMsg     = `HTTP Error ${response.status}.`

            if (response.statusText != null && response.statusText !== "")
                errorMsg += ` - ${response.statusText}`

            errorMsg += ` Discord Error ${responseBody.code} - ${responseBody.message}`

            return `Failed to redeem nitro code: \`${code}\` ${text}. ${errorMsg}`
        }

        messageContextString(message) {
            let text = `from \`${message.author.username}#${message.author.discriminator}\``

            let channel = getChannel(message.channel_id)
            if (channel.name != null && channel.name !== "")
                text += ` in \`#${channel.name}\``

            if (message.guild_id != null)
                text += ` in server \`${getGuild(message.guild_id).name}\``

            return text
        }
    };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/