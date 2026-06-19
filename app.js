const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRR37cSPX3g8O-Vmm6VqkvpdnyLL5gVU4tP66oj-cxvNrfww6NEqDzoX070qle6w/pub?gid=2043204496&single=true&output=csv";

function percentToNumber(value) {
  if (!value) return 0;
  return parseFloat(String(value).replace("%", "").replace(/,/g, "").trim()) || 0;
}

function findBest(rows, group, metric) {
  const filteredRows = rows.filter(row =>
    row["Campaign Group"] &&
    row["Campaign Group"].trim().toLowerCase() === group.toLowerCase() &&
    row["Campaign Name"] &&
    row[metric]
  );

  let bestRow = null;
  let bestValue = -1;

  filteredRows.forEach(row => {
    const value = percentToNumber(row[metric]);

    if (value > bestValue) {
      bestValue = value;
      bestRow = row;
    }
  });

  return bestRow;
}

Papa.parse(SHEET_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    const rows = results.data;

    const bestEmailCVR = findBest(rows, "Xsell", "Email CVR");

    if (bestEmailCVR) {
      document.getElementById("xsell-best-email-cvr").innerText = bestEmailCVR["Email CVR"];
      document.getElementById("xsell-best-email-cvr-campaign").innerText = bestEmailCVR["Campaign Name"];
    }

    console.log("Xsell Best Email CVR:", bestEmailCVR);
  }
});
