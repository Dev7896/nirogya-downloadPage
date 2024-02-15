// Sample data array
const data = [
    ["Name", "Age", "Country"],
    ["John Doe", 30, "USA"],
    ["Jane Smith", 25, "Canada"],
    ["Michael Johnson", 40, "UK"]
];


function exportToExcel() {

    // Generate CSV content
    const csvContent = "data:text/csv;charset=utf-8," + data.map(row => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);

    // Create a link element
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");

    // Simulate click event to trigger download
    link.click();

}


// Event listeners for button clicks
document.getElementById("ExcelButton").addEventListener("click", exportToExcel);



// Create table
function createTable(data) {
    const tableContainer = document.getElementById("table-container");
    const table = document.createElement("table");
    table.classList.add('table'); // Add 'table' class to the table element

    data.forEach(rowData => {
        const row = document.createElement("tr");
        rowData.forEach(cellData => {
            const cell = document.createElement("td");
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    tableContainer.appendChild(table);
}

// Generate PDF
document.getElementById("Generate-pdf-btn").addEventListener("click", () => {
    const doc = new jsPDF();
    const tableContainer = document.getElementById("table-container");
    tableContainer.style.position = "static"; // Make the table visible temporarily

    html2canvas(tableContainer).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10);
        doc.save("table.pdf");
        tableContainer.style.position = "absolute"; // Hide the table again after generating PDF
        tableContainer.style.left = "-9999px";
    });
});

// Initial table creation
createTable(data);