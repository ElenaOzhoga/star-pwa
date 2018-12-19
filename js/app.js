// To hide not necessary details we use this function
function sanitizeCategory(category, details) {
    for (var i = 0; i < details.length; i++) {
        delete category[details[i]];
    }
    return category;
}
// To get into vue.js scope
var app = new Vue({
    el: "#app",
    data: {
        g: g, //access to global variable with data from STAR WARS Api. Variable initialized in main.js and represents ajax response
        currentCategory: "",
        switchLayoutMessage: "Go to the light side!", //Message from layout switching button
        logoText: "Star Wars"
    },
    methods: {
        openCategoryDetails: function (category) { //Here we open hero detail
            this.currentCategory = category.name;
            var detailsToRemove = ["created", "edited", "url", "homeworld", "films", "species", "starships", "vehicles"];
            sanitizeCategory(category, detailsToRemove); //Clean category data
        },
        closeCategoryDetails: function () { //Here we close hero detail just by cleaning currentCategory
            this.currentCategory = "";
            return this.currentCategory;
        },
        switchLayout: function () { //Here we switch layout
            (this.switchLayoutMessage === "Go to the light side!" ? this.switchLayoutMessage = "Go to the dark side!" :
                this.switchLayoutMessage = "Go to the light side!"); //Here we switch message in button, which changes layout
            (this.logoText === "Star Wars" ? this.logoText = "Star Peace" : //And here we switch text in logo
                this.logoText = "Star Wars");
            return this.switchLayoutMessage;
        }
    },
    computed: {
        categories: function () {
            return g.categories; //Our categories loaded from swapi.com (STAR WARS Api)
        }
    }
})