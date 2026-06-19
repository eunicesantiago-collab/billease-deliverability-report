const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRR37cSPX3g8O-Vmm6VqkvpdnyLL5gVU4tP66oj-cxvNrfww6NEqDzoX070qle6w/pub?gid=2043204496&single=true&output=csv";

function percentToNumber(value) {
  if (!value) return 0;
  return parseFloat(
    String(value)
      .replace("%", "")
      .replace(/,/g, "")
      .trim()
  ) || 0;
}

Papa.parse(SHEET_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {

    const rows = results.data;

    const xsellRows = rows.filter(row =>
      row["Campaign"] &&
      (
        row["Campaign"].includes("Limit Increase") ||
        row["Campaign"].includes("Secondary") ||
        row["Campaign"].includes("Mload") ||
        row["Campaign"].includes("Voucher")
      )
    );

    let bestEmailCVRRow = null;
    let bestEmailCVR = -1;

    xsellRows.forEach(row => {

      const cvr = percentToNumber(row["Email CVR"]);

      if (cvr > bestEmailCVR) {
        bestEmailCVR = cvr;
        bestEmailCVRRow = row;
      }

    });

    if (bestEmailCVRRow) {

      document.getElementById("xsell-best-email-cvr").innerText =
        bestEmailCVRRow["Email CVR"];

      document.getElementById("xsell-best-email-cvr-campaign").innerText =
        bestEmailCVRRow["Campaign"];

    }

    console.log("Best Email CVR Row:", bestEmailCVRRow);

  }
});
