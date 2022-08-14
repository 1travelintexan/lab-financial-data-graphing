const ctx = document.getElementById("myChart");
ctx.style.display = "none";
const startElement = document.getElementById("from");
const endElement = document.getElementById("to");
const searchButton = document.getElementById("search");
const currencySelect = document.getElementById("currency");
const minElement = document.getElementById("min");
const maxElement = document.getElementById("max");

let months;
let prices;
let startDate;
let endDate;
let currency = "USD";
let min = 0;
let max = 0;

searchButton.addEventListener("click", async () => {
  ctx.style.display = "flex";
  startDate = startElement.value;
  endDate = endElement.value;
  currency = currencySelect.value;
  getData();
});

const getData = async () => {
  //clears the old chart to draw a new one
  let chartStatus = Chart.getChart("myChart");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  //api request that gets the data
  const bitcoinData = await axios.get(
    `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`
  );

  let months = Object.keys(bitcoinData.data.bpi).filter((elem, index) => {
    return index % 7 === 0;
  });

  prices = Object.values(bitcoinData.data.bpi).map((price) =>
    Math.round(price)
  );

  //changing the DOM to show the highest and lowest price for that time frame
  min = Math.min(...prices);
  max = Math.max(...prices);
  if (currency === "USD") {
    minElement.innerText = `$${min}`;
    maxElement.innerText = `$${max}`;
  } else {
    minElement.innerText = `€${min}`;
    maxElement.innerText = `€${max}`;
  }

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
