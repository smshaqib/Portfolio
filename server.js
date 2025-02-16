const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { email, mobile, message } = req.body;

    // Create a new workbook and add a worksheet
    const workbook = xlsx.utils.book_new();
    const worksheetData = [
        ['Email', 'Mobile', 'Message'],
        [email, mobile, message]
    ];
    const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Form Data');

    // Save the workbook to a file
    const filePath = path.join(__dirname, 'form_data.xlsx');
    xlsx.writeFile(workbook, filePath);

    res.send('Form data has been exported to Excel.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});