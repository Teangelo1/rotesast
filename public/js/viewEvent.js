//wait for DOM to completely load before we run our JS

//functions to grab event  from the database
//function to make delete request for events
//Getting initial lists of events
//function to help construct the post HTML content inside events list
//starting at line 53 in activity 14:12 there is a lot of code for making the element with styling. Need to see if necessary with TEa and Roberts set-up

document.addEventListener("DOMContentLoaded", (event) => {
    if (event) {
        console.info("DOM loaded");
    }
    const viewEvent = document.querySelectorAll(".input-group");

    if (viewEvent) {
        viewEvent.addEventListener("submit", (e) => {
            e.preventDefault();

            // Grabs the value of the textarea that goes by the name, "quote"
            const newEvent= {
                title: document.getElementById("titleinput").value.trim(),
                start_date: document.getElementById("dateinput").value,
                start_time: document.getElementById("timeinput").value,
                duration: document.getElementById("durationinput").value,
                repeat_cycle: document.getElementById("repeatinput").value,
                description: document.getElementById("descriptioninput").value.trim()
            };

            // Send POST request to create a new quote
            fetch("/api/viewEvent", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },

                // make sure to serialize the JSON body
                body: JSON.stringify(newEvent),
            }).then(() => {
               
                // document.getElementById("titleinput").value = "";

                // Reload the page so the user can see the new quote
                console.log("Created a new event");
               
                location.reload();
            });
        });
    }
});

