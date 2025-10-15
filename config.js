import { 
    @Vigilant,
    @SwitchProperty,
    @TextProperty,
    @SliderProperty,
    @ButtonProperty,
    @SelectorProperty
} from "Vigilance";

@Vigilant("firefreeze")
class Config {
    constructor() {
        this.initialize(this)
    }

    @SwitchProperty({
        name: "Enable",
        category: "Main"
    })
    modEnabled = false;

    @SwitchProperty({
        name: "Auto",
        description: "must be holding ff staff",
        category: "Main"
    })
    auto = false;

    @SliderProperty({
        name: "Offset",
        description: "in ticks",
        category: "Main",
        min: -20,
        max: 20
    })
    offset = 0

}

export default new Config();