/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise}       A promise that resolves with an object containing the data.
 */
function fetchModel(url) {
  // prepend base URL if it's a relative path (for CodeSandbox support)
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8081";
  const fetchUrl = url.startsWith("http") ? url : baseUrl + url;

  return new Promise(function (resolve, reject) {
    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          reject(new Error(\HTTP error! status: \\));
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
