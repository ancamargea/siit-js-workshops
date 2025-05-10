///// FUNCTION FROM ANDREEA /////
function getHistoricalEvents(apiKey, requestOptions) {
  // Step 1: Validate requestOptions
  const nonEmptyParams = Object.keys(requestOptions).filter(
    (key) => requestOptions[key] !== "" && requestOptions[key] !== undefined
  );

  if (nonEmptyParams.length === 0) {
    return Promise.reject(new Error("Error: year, month and day are missing."));
  }

  // Step 2: Build query string
  const queryParams = nonEmptyParams
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(requestOptions[key])}`
    )
    .join("&");

  const apiUrl = `https://api.api-ninjas.com/v1/historicalevents?${queryParams}`;

  // Step 3: Validate API key
  if (!apiKey || apiKey.trim() === "") {
    return Promise.reject(new Error("Error: API key is missing."));
  }

  // Step 4: Make API request
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
