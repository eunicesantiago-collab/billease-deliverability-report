const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRR37cSPX3g8O-Vmm6VqkvpdnyLL5gVU4tP66oj-cxvNrfww6NEqDzoX070qle6w/pub?gid=2043204496&single=true&output=csv";

function cleanPercent(value) {
  if (!value) return 0;
  return parseFloat(String(value).replace("%", "").replace(/,/g, "").trim()) || 0;
}

Papa.parse(SHEET_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    const rows = results.data;

    console.log("Parsed rows:", rows);

    const xsellRows = rows.filter(row => 
      row["Month"] && row["Month"].toLowerCase().includes("may")
    );

    let bestRow = null;
    let bestValue = -1;

    xsellRows.forEach(row => {
      const cvr = cleanPercent(row["CVR"]);

      if (cvr > bestValue) {
        bestValue = cvr;
        bestRow = row;
      }
    });

    if (bestRow) {
      document.getElementById("xsell-best-email-cvr").innerText = bestRow["CVR"];
      document.getElementById("xsell-best-email-cvr-campaign").innerText = bestRow["Campaign"];
    }

    console.log("Best Xsell Email CVR:", bestRow);
  },
  error: function(error) {
    console.error("Papa Parse Error:", error);
  }
});
