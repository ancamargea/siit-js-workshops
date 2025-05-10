///// MY CODE WITH THE FUNCTIONS FROM OTHER /////
const apiKey = "aCsseKRnikY1LGoyVn5+pA==mAIPwmBlSbtKIiJE";

const requestOptions = {
  year: "1618",
  month: "",
  day: "",
  text: "",
};

///// FUNCTION FROM ANDREEA /////
function getHistoricalEvents(apiKey, requestOptions) {
  const nonEmptyParams = Object.keys(requestOptions).filter(
    (key) => requestOptions[key] !== "" && requestOptions[key] !== undefined
  );

  if (nonEmptyParams.length === 0) {
    return Promise.reject(new Error("Error: year, month and day are missing."));
  }

  const queryParams = nonEmptyParams
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(requestOptions[key])}`
    )
    .join("&");

  const apiUrl = `https://api.api-ninjas.com/v1/historicalevents?${queryParams}`;

  if (!apiKey || apiKey.trim() === "") {
    return Promise.reject(new Error("Error: API key is missing."));
  }

  return fetch(apiUrl, {
    headers: {
      "X-Api-Key": apiKey,
      Accept: "application/json",
    },
  }).then((response) => {
    if (response.status === 403 || response.status === 401) {
      throw new Error("Error: API key is incorrect or unauthorized.");
    } else if (!response.ok) {
      throw new Error(`Error: Request failed with status ${response.status}`);
    }
    return response.json();
  });
}

///// FUNCTION FROM EDWARD /////
const parentElement = document.querySelector("#events-list");
const displayHistoricalEvents = (parentElement, events, errClass) => {
  parentElement.innerHTML = "";

  if (!events.length) {
    const errBlock = document.createElement("h2");
    errBlock.classList.add(errClass);
    errBlock.textContent = `No historical events are registered`;
    parentElement.append(errBlock);
  } else {
    events.forEach((ev) => {
      const event = `
      <li>
          <span>${ev.day}</span><span>${ev.month}</span><span>${
        ev.year <= 0 ? `${-ev.year} BCE` : `${ev.year} CE`
      }</span>
          <div>
            <span>Event: ${ev.event}</span>
          </div>
      </li>`;
      parentElement.insertAdjacentHTML("beforeend", event);
    });
  }
};

getHistoricalEvents(apiKey, requestOptions)
  .then((data) => {
    displayHistoricalEvents(parentElement, data);
  })
  .catch((error) => console.error(error));
