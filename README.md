# Photo Sharing App - Frontend (Lab 2)

Đây là mã nguồn Frontend React cho Lab 2 chạy độc lập, kết nối với Backend Express.

## Cách chạy Local
1. Chạy Backend (\WebThucHanh2\) ở 1 terminal riêng biệt bằng lệnh \
pm start\ (Backend sẽ chạy ở port **8081**).
2. Chạy Frontend ở terminal này bằng lệnh:
\\\ash
npm install
npm start
\\\
Mặc định frontend sẽ gọi backend qua \http://localhost:8081\.

## Cách import lên CodeSandbox (Tách riêng Frontend & Backend)
Nếu bạn muốn chia Frontend và Backend làm 2 CodeSandbox khác nhau để nộp bài:

**Bước 1:** Import Backend (\WebThucHanh2\) lên CodeSandbox và chạy nó. CodeSandbox sẽ cung cấp một URL Preview cho Backend, ví dụ: \https://abcd-8081.csb.app\.

**Bước 2:** Import Frontend (repo này) lên CodeSandbox.

**Bước 3:** Cấu hình biến môi trường kết nối Backend:
- Trong sidebar bên trái của CodeSandbox Frontend, tìm tới phần **"🔒 Env Variables"**.
- Thêm biến môi trường sau:
  - **Key:** \REACT_APP_API_URL\
  - **Value:** Điền URL của Backend lấy ở Bước 1 (Ví dụ: \https://abcd-8081.csb.app\). KHÔNG thêm dấu gạch chéo \/\ ở cuối URL! 
- Nhấn Save và CodeSandbox sẽ tự khởi động lại App. Khi này Frontend đã được kết nối với Backend.
