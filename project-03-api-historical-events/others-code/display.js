///// FUNCTION FROM EDWARD /////
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
