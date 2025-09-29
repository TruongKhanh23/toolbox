
### 1️⃣ Bật tên hàm **GET.WORKBOOK** (hàm cũ của Excel 4 macro, chỉ dùng trong Named Range)

1. Nhấn **Ctrl + F3** → **New** → tạo **Name** mới, ví dụ: `SheetList`.
2. Trong **Refers to**, nhập công thức:

```excel
=REPLACE(GET.WORKBOOK(1);1;FIND("]";GET.WORKBOOK(1));"")
```

* `GET.WORKBOOK(1)` trả về mảng tất cả sheet trong workbook dưới dạng `['Book1.xlsx]Sheet1', 'Book1.xlsx]Sheet2', ...]`.
* `REPLACE(...;1;FIND("]";...); "")` xóa phần `[Book1.xlsx]` chỉ lấy tên sheet.

### 2️⃣ Tách thành từng ô riêng (nếu muốn)

Nếu Excel của bạn hỗ trợ `TEXTSPLIT`:

```excel
=TEXTSPLIT(TEXTJOIN(";"; TRUE; SheetList); ";"; ; TRUE)
```

* Kết quả là mỗi sheet ra một ô theo hàng (hoặc cột, tùy chọn thêm).

---

💡 **Lưu ý:**

* Đây là **hàm cũ dạng Excel 4 macro**, nên **chỉ hoạt động khi tạo Named Range**, không gõ trực tiếp vào ô.
* Không cần VBA, nhưng nếu file quá nhiều sheet, việc update sẽ hơi chậm.
