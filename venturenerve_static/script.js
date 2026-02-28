const startups = [
  { name: "HelioPay", irr: 34, pd: 32 },
  { name: "GridPulse", irr: 30, pd: 26 },
  { name: "ClinicFlow", irr: 28, pd: 23 },
  { name: "MintCart", irr: 40, pd: 48 },
  { name: "SignalOps", irr: 32, pd: 38 }
];

const irrSlider = document.getElementById("irr");
const pdSlider = document.getElementById("pd");
const irrVal = document.getElementById("irrVal");
const pdVal = document.getElementById("pdVal");

irrSlider.oninput = () => irrVal.textContent = irrSlider.value;
pdSlider.oninput = () => pdVal.textContent = pdSlider.value;

function runMatch() {
  const minIrr = parseInt(irrSlider.value);
  const maxPd = parseInt(pdSlider.value);

  const eligible = startups.filter(s => s.irr >= minIrr && s.pd <= maxPd);

  const scored = eligible.map(s => ({
    ...s,
    rar: s.irr * (1 - s.pd / 100)
  }));

  scored.sort((a, b) => b.rar - a.rar);

  const top3 = scored.slice(0, 3);

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (top3.length === 0) {
    resultsDiv.innerHTML = "<p>No startups match your criteria.</p>";
    return;
  }

  top3.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>#${i+1} ${s.name}</strong><br/>
      IRR: ${s.irr}%<br/>
      PD: ${s.pd}%<br/>
      RAR: ${s.rar.toFixed(2)}%
    `;
    resultsDiv.appendChild(card);
  });
}
