import Config from "./config"

// roughly center of screen below crosshair
const x = 440;
const y = 285;

let reg = false;
let ticksRemaining = 0;
const text = new Text(`-`).setShadow(true).setScale(2);

const rc = Client.getMinecraft().class.getDeclaredMethod("func_147121_ag")
rc.setAccessible(true)
const rightClick = () => rc.invoke(Client.getMinecraft())

register("worldLoad", () => {
    ticksRemaining = 0
    text.setString(`-`)
})

register("tick", () => {
    if (!Config.modEnabled || ticksRemaining <= 0) {
        ticksRemaining = 0;
        if (reg) renderTrigger.unregister();
        reg = false;

        return;
    };
    if (ticksRemaining === 2) {
        World.playSound("random.anvil_land", 5, 1);
        if (Config.auto && Player.getHeldItem()?.getName() === "§5Fire Freeze Staff") {
            rightClick()
        }
    }

    ticksRemaining--;
    text.setString(`FF: ${(ticksRemaining / 20).toFixed(2)}s`);
})

const renderTrigger = register("renderOverlay", () => {
    text.setX(x).setY(y).draw();
}).unregister()

register("chat", () => {
    if (!Config.modEnabled) return;

    ticksRemaining = 100 + Config.offset;
    renderTrigger.register()
    reg = true

}).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?")

register("command", () => {
    Config.openGUI()
}).setName("firefreeze").setAliases("ffr") /* skyhanni already uses /ff */