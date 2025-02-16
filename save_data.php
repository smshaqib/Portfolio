<?php
// Include PhpSpreadsheet library
require 'phpSpreadsheet/vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = $_POST["email"];
    $mobile = $_POST["mobile"];
    $message = $_POST["message"];

    // Set the file path
    $file = 'C:\\Users\\Administrator\\Desktop\\Shaqib Personal Portfolio\\contacts.xlsx';

    // Debugging: Check if data is received
    if (empty($email) || empty($mobile) || empty($message)) {
        echo "Error: Missing form data!";
        exit();
    }

    // Check if the file exists
    if (file_exists($file)) {
        // Load the existing spreadsheet
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
        $worksheet = $spreadsheet->getActiveSheet();
    } else {
        // Create a new spreadsheet if the file doesn't exist
        $spreadsheet = new Spreadsheet();
        $worksheet = $spreadsheet->getActiveSheet();

        // Set headers for the Excel sheet
        $worksheet->setCellValue('A1', 'Email');
        $worksheet->setCellValue('B1', 'Mobile');
        $worksheet->setCellValue('C1', 'Message');
    }

    // Find the next available row
    $row = $worksheet->getHighestRow() + 1;

    // Insert form data into the next row
    $worksheet->setCellValue("A$row", $email);
    $worksheet->setCellValue("B$row", $mobile);
    $worksheet->setCellValue("C$row", $message);

    // Write the data to the Excel file
    try {
        $writer = new Xlsx($spreadsheet);
        $writer->save($file);
        echo "<script>alert('Message Sent Successfully!'); window.location.href='index.html';</script>";
    } catch (Exception $e) {
        echo 'Error writing to Excel file: ' . $e->getMessage();
    }
}
?>
