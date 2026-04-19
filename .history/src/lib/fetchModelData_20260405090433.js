/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise}       A promise that resolves with an object containing the data.
 */
function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    // 1. Sử dụng fetch API để gửi yêu cầu GET
    fetch(url)
      .then((response) => {
        // 2. Kiểm tra trạng thái phản hồi (HTTP status)
        if (!response.ok) {
          // Trả về reject nếu lỗi (ví dụ 404, 500)
          reject(new Error(`HTTP error! status: ${response.status}`));
          return;
        }
        // 3. Chuyển đổi dữ liệu sang JSON
        return response.json();
      })
      .then((data) => {
        // 4. Giải quyết Promise với định dạng { data: <dữ liệu> }
        resolve({ data: data });
      })
      .catch((error) => {
        // 5. Xử lý lỗi kết nối mạng
        reject(new Error(error.message));
      });
  });
}

export default fetchModel;