function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD") // bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "") // bỏ ký tự đặc biệt
    .trim();
}

function findExpectedName(appName, expectedList) {
  const normApp = normalize(appName);
  for (let expected of expectedList) {
    if (normApp.includes(normalize(expected))) {
      return expected;
    }
  }
  return "Không tìm thấy";
}

export default function findBranchName(appBranchName) {
  // Ví dụ:
  const expectedNames = [
    "66A NGUYỄN HUỆ",
    "68 NGUYỄN HUỆ",
    "VÕ VĂN KIỆT",
    "194 CÁCH MẠNG THÁNG TÁM",
    "6B CÔNG TRƯỜNG DÂN CHỦ",
    "301 NGUYỄN ĐÌNH CHIỂU",
    "307 ĐẶNG NGUYÊN CẨN",
    "67 HẬU GIANG",
    "71 HẬU GIANG",
    "CLASSIC",
    "HUỲNH TẤN PHÁT",
    "187 LẠC LONG QUÂN",
    "161 NGÔ TẤT TỐ",
    "17A NGÔ TẤT TỐ",
    "137A NGUYỄN HỮU CẢNH",
    "07 BÌNH LONG",
    "190 HUỲNH VĂN BÁNH",
    "172 HUỲNH VĂN BÁNH",
    "1200A KHA VẠN CÂN",
    "606 CỘNG HÒA",
    "466 CỘNG HÒA",
    "417 CỘNG HÒA",
    "421 CỘNG HÒA",
    "143 LIÊU BÌNH HƯƠNG - CỦ CHI",
    "TỈNH LỘ 8 CỦ CHI",
    "601 CMT8 TÂY NINH",
    "PHẠM VĂN ĐỒNG - TÂY NINH",
    "101 THÍCH QUẢNG ĐỨC",
    "244 THÍCH QUẢNG ĐỨC - TDM",
    "1349 CMT8",
    "NGUYỄN AN NINH - BÌNH DƯƠNG",
    "TRẦN HƯNG ĐẠO - BÌNH DƯƠNG",
    "THUẬN AN",
    "TRẢNG BOM",
    "77/7A KHU VĂN HẢI - LONG THÀNH",
    "204 HÀ HUY GIÁP - BH",
    "32 TRẦN HƯNG ĐẠO - PHAN THIẾT",
    "884 PHÚ RIỀNG ĐỎ - BP",
    "615 CMT8 - BÀ RỊA",
    "87 HOÀNG HOA THÁM - VŨNG TÀU",
    "330 TRƯƠNG ĐỊNH",
    "17 TÔN ĐỨC THẮNG",
    "THANH NHÀN - HÀ NỘI",
    "ĐỘI CẤN - HÀ NỘI",
    "ĐƯỜNG LÁNG",
    "472 LÊ DUẪN",
    "496 HOÀNG DIỆU",
    "371 QUANG TRUNG - QUẢNG NGÃI",
    "HÙNG VƯƠNG",
    "HÙNG VƯƠNG - HUẾ",
    "BÀ TRIỆU",
    "ĐOÀN THỊ ĐIỂM - HUẾ",
    "88 QL62 - LONG AN",
    "87/2 LÊ THỊ HỒNG GẤM - MỸ THO - TIỀN GIANG",
    "ĐẠI LỘ ĐỒNG KHỞI - BẾN TRE",
    "422 HÀ HOÀNG HỔ",
    "108 TRẦN HƯNG ĐẠO - CẦN THƠ",
    "25 TRƯNG NỮ VƯƠNG - VL",
    "TRÀ VINH",
    "466 NGUYỄN TRUNG TRỰC - KIÊN GIANG",
    "NGUYỄN VĂN CỪ PHÚ QUỐC",
    "NGUYỄN TRUNG TRỰC PHÚ QUỐC",
    "BÙI THỊ TRƯỜNG - CÀ MAU",
  ];

  return findExpectedName(appBranchName, expectedNames);
}
