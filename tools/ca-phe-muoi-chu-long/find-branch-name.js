import fs from "fs";
import path from "path";
import { branchNameByChannel } from "../../data/ca-phe-muoi-chu-long/find-branch-name/data.js";

function normalize(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim();
}

function findExpectedName(appName, expectedList) {
  if (!appName) return appName;

  // Remove common prefixes
  let cleanedAppName = appName
    .replace(/^(CÀ PHÊ MUỐI CHÚ LONG|TRẠM DỪNG CHÂN CHÚ LONG)\s*[-–—]\s*/i, "")
    .trim();

  const normApp = normalize(cleanedAppName);

  // Helper to check if one string is a subset of another
  const isSubsetMatch = (str1, str2) => {
    const words1 = str1.split(/\s+/).filter(Boolean);
    const words2 = str2.split(/\s+/).filter(Boolean);
    return words1.every((word) => words2.some((w) => w.includes(word)));
  };

  // Step 1: Exact match
  for (let expected of expectedList) {
    if (normalize(expected) === normApp) {
      return expected;
    }
  }

  // Step 2: Strict match
  for (let expected of expectedList) {
    const normExpected = normalize(expected);
    if (normApp.includes(normExpected) || normExpected.includes(normApp)) {
      return expected;
    }
  }

  // Step 3: Loose match with number handling
  for (let expected of expectedList) {
    const normExpected = normalize(expected);
    const normExpectedNoNumber = normExpected
      .replace(/^\d+[a-zA-Z]?\s*/g, "")
      .trim();

    if (normExpectedNoNumber && normApp.includes(normExpectedNoNumber)) {
      return expected;
    }

    if (normApp.includes(normExpected.replace(/\s+/g, ""))) {
      return expected;
    }
  }

  // Step 4: Regional suffix handling
  for (let expected of expectedList) {
    const normExpected = normalize(expected);
    const normExpectedParts = normExpected.split(/\s*-\s*/);
    const mainPart = normExpectedParts[0].trim();
    const region = normExpectedParts[1]?.trim();

    if (region && normApp.includes(mainPart) && normApp.includes(region)) {
      return expected;
    }
    if (!region && normApp.includes(mainPart)) {
      return expected;
    }
  }

  // Step 5: Fuzzy subset match
  for (let expected of expectedList) {
    const normExpected = normalize(expected);
    if (
      isSubsetMatch(normApp, normExpected) ||
      isSubsetMatch(normExpected, normApp)
    ) {
      return expected;
    }
  }

  // Fallback: no match
  return null;
}

export default function findBranchName() {
  const exceptionExpectedNames = [
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Thanh Nhà",
      expectedName: "THANH NHÀN - HÀ NỘI",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Quang Trung Gò Vấp",
      expectedName: "Quang Trung Gò Vấp",
    },
    {
      branchNameByChannel: "CÀ PHÊ MUỐI CHÚ LONG - LÊ VĂN SỸ 120 LÊ VĂN SỸ",
      expectedName: "120 LÊ VĂN SỸ",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Tân Hoà Đông",
      expectedName: "307 ĐẶNG NGUYÊN CẨN",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Tân Hòa Đông",
      expectedName: "307 ĐẶNG NGUYÊN CẨN",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Công Trường Quốc Tế",
      expectedName: "6B CÔNG TRƯỜNG DÂN CHỦ",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Lê Văn Lương",
      expectedName: "CLASSIC",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Long Xuyên",
      expectedName: "422 HÀ HOÀNG HỔ",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Biên Hòa",
      expectedName: "204 HÀ HUY GIÁP - BH",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Hồ Con Rùa",
      expectedName: "6B CÔNG TRƯỜNG DÂN CHỦ",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Đồng Xoài",
      expectedName: "884 PHÚ RIÊNG ĐỎ - BP",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Cách Mạng Tháng 8",
      expectedName: "194 CÁCH MẠNG THÁNG TÁM",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - 1349 Cách Mạng Tháng 8",
      expectedName: "1349 CMT8",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Vĩnh Long",
      expectedName: "25 TRƯNG NỮ VƯƠNG - VL",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - Rạch Giá",
      expectedName: "466 NGUYỄN TRUNG TRỰC - KIÊN GIANG",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - P.V.Đồng",
      expectedName: "PHẠM VĂN ĐỒNG - TÂY NINH",
    },
    {
      branchNameByChannel: "Cà Phê Muối Chú Long - N.V.Cừ PQ",
      expectedName: "NGUYỄN VĂN CỪ PHÚ QUỐC",
    },
    {
      branchNameByChannel: "CÀ PHÊ MUỐI CHÚ LONG - VŨNG TÀU 102 HOÀNG HOA THÁM",
      expectedName: "HOÀNG HOA THÁM - VŨNG TÀU",
    },
    {
      branchNameByChannel:
        "CÀ PHÊ MUỐI CHÚ LONG - BÀ RỊA 615 CÁCH MẠNG THÁNG 8",
      expectedName: "615 CMT8 - BÀ RỊA",
    },
    {
      branchNameByChannel: "CÀ PHÊ MUỐI CHÚ LONG 1/97 KHU PHỐ HÒA LÂN 2",
      expectedName: "THUẬN AN",
    },
  ];

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
    "884 PHÚ RIÊNG ĐỎ - BP",
    "615 CMT8 - BÀ RỊA",
    "HOÀNG HOA THÁM - VŨNG TÀU",
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

  const expectedNameByChannel = branchNameByChannel.map(
    ({ channelName, branchName }) => {
      let matched = findExpectedName(branchName, expectedNames);

      if (!matched) {
        // fallback từ exceptionExpectedNames
        const exception = exceptionExpectedNames.find(
          (e) =>
            e.branchNameByChannel.toLowerCase() === branchName.toLowerCase()
        );
        matched = exception ? exception.expectedName : branchName;
      }

      return {
        channelName,
        channelBranchName: branchName,
        expectedBranchName: matched,
      };
    }
  );

  const outputPath = path.resolve(
    "./output/ca-phe-muoi-chu-long/find-branch-name/output.json"
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(expectedNameByChannel, null, 2),
    "utf-8"
  );

  return expectedNameByChannel;
}
