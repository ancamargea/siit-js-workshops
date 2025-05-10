// Added the API Key to a different file to be ignored by git
// const apiKey = "";
import apiKey from "./config";

const requestOptions = {
  year: "1618",
  month: "",
  day: "",
  text: "",
};

async function getHistoricalEvents(apiKey, options) {
  const apiUrl = "https://api.api-ninjas.com/v1/historicalevents";
  const url = `${apiUrl}?year=${options.year}&month=${options.month}&day=${options.day}&text=${options.text}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      console.error(
        `Request failed with status 400: Unauthorized – API key is missing or invalid.`
      );
    } else if (response.status === 403) {
      console.error(
        `Request failed with status 403: Forbidden – you don’t have access to this resource.`
      );
    } else if (response.status === 404) {
      console.error(
        `Request failed with status 404: Not Found – the endpoint might be incorrect.`
      );
    } else {
      console.error(
        `Request failed with status ${response.status}: Unexpected error.`
      );
    }

    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Create an ordered list in the specified parent element, displaying the events list given as a parameter
// parentElem: DOM Element reference
// Before creating the list, all the child nodes of the parent elem will be deleted

const parentElement = document.querySelector("#events-list");

function displayHistoricalEvents(parentElement, eventsList) {
  parentElement.innerHTML = "";

  eventsList.forEach((eventDate) => {
    const listItem = document.createElement("li");

    const daySpan = document.createElement("span");
    daySpan.classList.add("day");
    daySpan.textContent = eventDate.day ? eventDate.day + " " : "";

    const monthSpan = document.createElement("span");
    monthSpan.classList.add("month");
    monthSpan.textContent = eventDate.month ? eventDate.month + " " : "";

    const yearSpan = document.createElement("span");
    yearSpan.classList.add("year");
    yearSpan.textContent = eventDate.year || "";

    const eventSpan = document.createElement("span");
    eventSpan.classList.add("event");
    eventSpan.textContent = ": " + eventDate.event;

    listItem.appendChild(daySpan);
    listItem.appendChild(monthSpan);
    listItem.appendChild(yearSpan);
    listItem.appendChild(eventSpan);

    parentElement.appendChild(listItem);
  });
}

getHistoricalEvents(apiKey, requestOptions)
  .then((data) => {
    displayHistoricalEvents(parentElement, data);
  })
  .catch((error) => console.error(error));
