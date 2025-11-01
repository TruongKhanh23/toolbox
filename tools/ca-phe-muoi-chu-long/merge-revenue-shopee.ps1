# merge_shopee.ps1
# PowerShell script tổng hợp dữ liệu SHOPEE từ nhiều file Excel
# Giữ việc nhập dòng bắt đầu/kết thúc + debug messages

# Hỏi người dùng dòng bắt đầu và kết thúc
$startRow = Read-Host "Nhap dong du lieu bat dau"
$endRow = Read-Host "Nhap dong du lieu ket thuc"

# Lấy folder hiện tại (nơi chứa script)
$folder = $PSScriptRoot
$outputFile = Join-Path $folder "SHOPEE_Merged.xlsx"

# Tạo Excel COM object
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

# Tạo workbook mới để lưu kết quả
$wbOut = $excel.Workbooks.Add()
$wsOut = $wbOut.Sheets.Item(1)

# Ghi header
$wsOut.Cells.Item(1,1) = "Ngay"
$wsOut.Cells.Item(1,2) = "Ten cua hang"
$wsOut.Cells.Item(1,3) = "So tien"

$rowOut = 2

# Lặp qua tất cả file Excel trong folder (không phải file tổng hợp)
Get-ChildItem -Path $folder -Filter "*.xlsx" | Where-Object { $_.BaseName -ne "SHOPEE_Merged" } | ForEach-Object {
    $file = $_.FullName
    $fileName = $_.BaseName

    # Chuyển dd.mm.yyyy -> DateTime
    $dateParts = $fileName -split '\.'  # ["dd","mm","yyyy"]
    # Chuyển sang int
    $day = [int]$dateParts[0]
    $month = [int]$dateParts[1]
    $year = [int]$dateParts[2]

    # Tạo DateTime chỉ có ngày/tháng/năm
    $dateObj = Get-Date -Year $year -Month $month -Day $day

    try {
        $wb = $excel.Workbooks.Open($file)
        
        # Kiểm tra sheet SHOPEE_PIVOT
        if ($wb.Sheets.Item("SHOPEE_PIVOT")) {
            $ws = $wb.Sheets.Item("SHOPEE_PIVOT")
        } else {
            Write-Host "Khong tim thay sheet 'SHOPEE_PIVOT' trong file $fileName"
            $wb.Close($false)
            return
        }

        # Lấy số dòng thực tế có dữ liệu
        $usedRows = $ws.UsedRange.Rows.Count
        Write-Host "Dang xu ly file: $fileName, so dong co du lieu: $usedRows"

        # Duyệt từ startRow -> endRow
        for ($r = [int]$startRow; $r -le [int]$endRow; $r++) {
            # Nếu vượt quá số dòng thực tế, dừng
            if ($r -gt $usedRows) { break }

            $store = $ws.Cells.Item($r,3).Text
            $amount = $ws.Cells.Item($r,4).Value2

            if ($store -ne "") {
                $wsOut.Cells.Item($rowOut,1) = $dateObj
                $wsOut.Cells.Item($rowOut,1).NumberFormat = "dd/mm/yyyy"
                $wsOut.Cells.Item($rowOut,2) = $store
                $wsOut.Cells.Item($rowOut,3) = $amount
                $rowOut++
            }
        }

        Write-Host "Da xu ly dong $startRow -> $([math]::Min($endRow,$usedRows)) trong file $fileName"
        $wb.Close($false)
    } catch {
        Write-Host "Khong the mo file $fileName"
    }
}

# Auto-fit tất cả cột đã sử dụng
$wsOut.UsedRange.Columns.AutoFit()

# Lưu và đóng file tổng hợp
$wbOut.SaveAs($outputFile)
$wbOut.Close()
$excel.Quit()

Write-Host "Da tao file tong hop:" $outputFile
Pause
