export default ImageAssets = {
    use: (iconHref) => {
        switch (iconHref) {
            case "adaptive_icon" :
                return require('./adaptive-icon.png');                
            case "back" :
                return require('./back.png');                
            case "favicon" :
                return require('./favicon.png');
            case "icon" :
                return require('./icon.png');                
            case "splash" :
                return require('./splash.png');                
            case "line" :
                return require('./line.png');                
            case "remove" :
                return require('./remove.png');                
            case "updateExpense_colored" :
                return require('./updateExpensesColored.png');                
            default:
                console.log("no icon found")
                break;
        }
    }
};