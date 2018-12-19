var db = {
    set: function (key, value) {//Here we save in localStorage parameters from event
        var valueStringify = JSON.stringify(value);
        localStorage.setItem(key, valueStringify);
    },
    get: function (key) {//Here we read from localStorage parameters from event
        var valueStringify = localStorage.getItem(key);
        return JSON.parse(valueStringify);
    }
};
//Event tracker library.
//Everything starts from startListening function
var eventTrackerLibrary = {
    incrementCounter: function () {//Function to process counter. Counter itself we need to have id for event. In order
        var counter = eventTrackerLibrary.counter++; //not to overwrite it in localStorage
        db.set("counter", counter);
        return counter;
    },
    eventRegistration: function (domElement, eventType) {
        var eventRegister = {};
        $(domElement).on(eventType, function (e) {
            var date = +new Date(); //To have actual timeStamp, because timeStamp from event indicates time, which app works
            var originalEvent = e.originalEvent;
            eventRegister = {
                "type": originalEvent.type,
                "timeStamp": originalEvent.timeStamp,
                "pageX": originalEvent.pageX,
                "pageY": originalEvent.pageY,
                "keyCode": originalEvent.keyCode, //for keydown
                "date": date
            };

            db.set(eventTrackerLibrary.incrementCounter(), eventRegister);
        });
    },
    eventsListRecords: function () {
        var eventsArray = [//Created array of events for easier access to our events
            "click",
            "dblclick",
            "mouseover",
            "mousemove",
            "change",
            "focusin",
            "focusout",
            "submit",
            "keydown"
        ];
        for (var i = 0; i < eventsArray.length; i++) {
            eventTrackerLibrary.eventRegistration("body", eventsArray[i]);
        }
        eventTrackerLibrary.eventRegistration(window, "load");
        eventTrackerLibrary.eventRegistration(window, "resize");
    },
    startListening: function () {//At the very beginning of listening to events
        var counter = db.get("counter") || 0; //If nothing is present in localStorage, then counter equal to 0
        eventTrackerLibrary.counter = counter;
        eventTrackerLibrary.eventsListRecords();
    },
    counter: null
};
