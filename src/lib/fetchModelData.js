/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise}       A promise that resolves with an object containing the data.
 */
function fetchModel(url) {
  // Gắn cứng URL của Backend CodeSandbox để đảm bảo luôn chạy
  const baseUrl = process.env.REACT_APP_API_URL || "https://28wxk2-8081.csb.app";
  const fetchUrl = url.startsWith("http") ? url : baseUrl + url;

  return new Promise(function (resolve, reject) {
    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          reject(new Error("HTTP error! status: " + response.status));
          return;
        }
        return response.json();
      })
      .then((data) => {
        resolve({ data: data });
      })
      .catch((error) => {
        reject(new Error(error.message));
      });
  });
}

export default fetchModel;
