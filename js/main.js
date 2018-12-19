var g = {}; //global variable for data from ajax response available in other files
g.categories = [];
$(document).ready(function () {

    function loadAPI() {
        $.ajax({
            url: "https://swapi.co/api/people",
            type: "GET",
            data: null,
            beforeSend: function () { //Wait indicator show
                $(".loading").show();
            },
            complete: function () { //Wait indicator hide
                $(".loading").hide();
            },
            success: function (data) {
                g.categories = data.results; //To show only ten results
            }
        });

    }

    loadAPI();

    eventTrackerLibrary.startListening(); //initialize events tracker library
});
