function colorCodeType(theme, type) 
{

    const type_name = type.name.toLowerCase();
    let type_style = {};
    
    if (theme["type_" + type_name]) {
        let fg = theme["type_" + type_name].fg;
        let bg = theme["type_" + type_name].bg;
        type_style.color = fg;
        type_style.backgroundColor = bg;
    }

    return type_style;

}

function colorCodeHabitat(theme, habitat) 
{
    const habitat_name = habitat.name.toLowerCase().replace("-", "_");

    let habitat_style = {};
    
    if (theme["habitat_" + habitat_name]) {
        let fg = theme["habitat_" + habitat_name].fg;
        let bg = theme["habitat_" + habitat_name].bg;
        habitat_style.color = fg;
        habitat_style.backgroundColor = bg;
    }

    return habitat_style;

}

export { colorCodeType,  colorCodeHabitat };
