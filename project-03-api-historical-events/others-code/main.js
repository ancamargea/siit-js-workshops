///// MY CODE WITH THE FUNCTIONS FROM OTHER /////
console.log("Get historical events - with code from others");

const apiKey = "aCsseKRnikY1LGoyVn5+pA==mAIPwmBlSbtKIiJE";

const requestOptions = {
  year: "1618",
  month: "",
  day: "",
  text: "",
};

const parentElement = document.querySelector("#display-content");

// getHistoricalEvents(apiKey, requestOptions)
//   .then((data) => {
//     displayHistoricalEvents(parentElement, data);
//   })
//   .catch((error) => console.error(error));

getHistoricalEvents(apiKey, requestOptions)
  .then((data) => {
    displayHistoricalEvents(parentElement, data);

    [...parentElement.children].forEach((child) => {
      child.className = "event";
      const [title, date] = child.querySelectorAll("div");
      if (title) title.className = "event-title";
      if (date) date.className = "event-date";
    });
  })
  .catch(console.error);
