// create
$(document).ready(() => {
  // export button trial--------------------------------------------------ICS export Start
  // this section was moved to an A link in the partial handle bars file so ICS file down loads.
  // const exportICSbutton = document.querySelectorAll(".icsExport"); //"ics-export"
  // if (exportICSbutton) {
  //   exportICSbutton.forEach((button) => {
  //     button.addEventListener("click", (e) => {
  //       const id = e.target.getAttribute("data-id");
  //       // const id = parseInt(e.target.getAttribute("data-id"));
  //       // e.preventDefault();
  //       console.log("export button works id: " + id); // + exportICSbutton.data-id
  //       console.log(typeof id);
  //       fetch(`/api/events/${id}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //         //serializing the JSON body can't remember here if handlebars requires us to parse?
  //         // body: JSON.parse(Events),
  //       }).then((res) => {
  //         // console.log(res);
  //       });
  //     });
  //   });
  // }
  // export button trial--------------------------------------------------ICS export Start
  // this section was moved to an A link in the partial handle bars file so ICS file down loads.

  const saveEventBtn = document.getElementById("saveEventBtn");
  if (saveEventBtn) {
    saveEventBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // console.log("click event works on save btn"); // this works steve 3-21-21-6pm

      //constructing the event based on the input of the form.
      const Events = {
        title: document.getElementById("titleinput").value.trim(),
        start_date: document.getElementById("dateinput").value,
        start_time: document.getElementById("timeinput").value,
        duration: document.getElementById("durationinput").value,
        repeat_cycle: document.getElementById("repeatinput").value,
        description: document.getElementById("descriptioninput").value.trim()
      };

      console.log(Events); // this works steve 3-21-21-6pm

      fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Events)
        // body: Events,
      }).then(console.log("then from api/events"));

      // Grab all events to post in handle bars
      const getEvents = () => {
        console.log("getEvents is getting called");

        fetch("/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
          //serializing the JSON body can't remember here if handlebars requires us to parse?
          // body: JSON.parse(Events),
        })
          .then((response) => response.json())
          .then((data) => {
            // stuck here
          })
          .catch((error) => console.error("Error:", error));
      };
    });
  }
});
