//making sure we wait to attache our handlers until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (e) => {
    if (e) {
        console.log('DOM loaded! 🚀');
    }
//just following the pattern here from Burger HW. Not sure if event-container should go here

// create
const saveEventBtn = document.getElementsByClassName(".event-form");
if(saveEventBtn) {
    saveEventBtn.addEventListener("submit", (e) => {
        e.preventDefault();

        //constructing the event based on the input of the form.
        const Events = {
            title: document.getElementById("titleinput").value.trim(),
            start_date: document.getElementById("timeinput").value,
            start_time: document.getElementById("timeinput").value,
            duration: document.getElementById("durationinput").value,
            repeat_cycle: document.getElementById("repeatinput").value,
            description: document.getElementById("descriptioninput").value.trim(),

        };
         //create events for handlebars format
         const events = (Events) => {
             fetch("/api/events", {
                 method: "POST",
                 headers: {"Content-Type": "aplication/json",
             },
             body: JSON.stringify(Events),
            })
            //grabbint them to post? 
            .then(getEvents)
            .catch((err) => console.error(err));

         };

         //I am getting stuck here
           // Grab all events to post in handle bars
  const getEvents = () => {
    console.log('getEvents is getting called');
    fetch('/api/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //serializing the JSON body can't remember here if handlebars requires us to parse?
     // body: JSON.parse(Events),
    })
      .then((response) => response.json())
      .then((data) => {
          // stuck here
        
        }
       
      
      .catch((error) => console.error('Error:', error));
  };


        
    })
}
    

    //function to grab events from the database


    //this is what Robert set up let's see if we can do it in a shorter route like above

    // function getTitleInput() {
    //     var titleInput = document.getElementById("titleinput").value
    //     console.log(titleInput)
    //     return titleInput
    // }

    // function getTimeInput() {
    //     var timeInput = document.getElementById("timeinput").value
    //     console.log(timeInput)
    //     return timeInput
    // }

    // function getDateInput() {
    //     var dateInput = document.getElementById("dateinput").value
    //     console.log(dateInput)
    //     return dateInput
    // }

    // function getDurationInput() {
    //     var durationInput = document.getElementById("durationinput").value;
    //     console.log(durationInput)
    //     return durationInput
    // }

    // function getRepeatInput() {
    //     var repeatInput = document.getElementById("repeatinput").value
    //     console.log(repeatInput)
    //     return repeatInput
    // }

    // getTitleInput();
    // getTimeInput();
    // getDateInput();
    // getDurationInput();
    // getRepeatInput();

    // function allFunctions() {

    // var allInputs = {
    //     titleInput:titleInput,
    //     timeInput:timeInput,
    //     dateInput:dateInput, 
    //     // durationInput:durationInput,
    //     // repeatInput:repeatInput
    //     }
    //     console.log(allInputs)
    //     return allInputs

    // }




    // allFunctions()


    // console.log(allInputs)
}