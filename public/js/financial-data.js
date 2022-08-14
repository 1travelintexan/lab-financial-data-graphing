const ctx = document.getElementById("myChart");
ctx.style.display = "none";
const startElement = document.getElementById("from");
const endElement = document.getElementById("to");
const searchButton = document.getElementById("search");

const now = new Date().toJSON().slice(0, 10);
let months;
let prices;
let start;
let end;

searchButton.addEventListener("click", async () => {
  ctx.style.display = "flex";
  start = startElement.value;
  end = endElement.value;
  getData();
});

const getData = async () => {
  let chartStatus = Chart.getChart("myChart");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  const bitcoinData = await axios.get(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
  );
  months = Object.keys(bitcoinData.data.bpi);
  prices = Object.values(bitcoinData.data.bpi).map((price) =>
    Math.round(price)
  );

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Bitcoin Price History",
          data: prices,
          backgroundColor: ["rgba(75, 192, 192, .5)"],
          borderColor: ["rgb(75, 192, 192)"],
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

// getData();
