const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRR37cSPX3g8O-Vmm6VqkvpdnyLL5gVU4tP66oj-cxvNrfww6NEqDzoX070qle6w/pub?gid=2043204496&single=true&output=csv";

function parseCSV(text) {
  return text.trim().split("\n").map(row => row.split(","));
}

function percentToNumber(value) {
  if (!value) return 0;
  return parseFloat(value.replace("%", "").replace(/"/g, "")) || 0;
}

fetch(SHEET_URL)
  .then(response => response.text())
  .then(csvText => {
    const rows = parseCSV(csvText);
    const dataRows = rows.slice(1);

    const xsellRows = dataRows.filter(row =>
      row[0]?.toLowerCase().includes("limit increase") ||
      row[0]?.toLowerCase().includes("secondary") ||
      row[0]?.toLowerCase().includes("mload") ||
      row[0]?.toLowerCase().includes("voucher")
    );

    let bestRow = null;
    let bestValue = -1;

    xsellRows.forEach(row => {
      const emailCVR = percentToNumber(row[18]);

      if (emailCVR > bestValue) {
        bestValue = emailCVR;
        bestRow = row;
      }
    });

    if (bestRow) {
      document.getElementById("xsell-best-email-cvr").innerText = bestRow[18];
      document.getElementById("xsell-best-email-cvr-campaign").innerText = bestRow[0];
    }

    console.log("Best Email CVR:", bestRow);
  })
  .catch(error => {
    console.error("Error loading Google Sheet:", error);
  });
