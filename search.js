let input = document.querySelector(".inputBox");
let search = document.querySelector(".search");
let content = document.querySelector(".content");
let details = document.getElementsByClassName("details")[0];
let searchBox = document.querySelector(".heading"); // Modified to target the container of the search input and button

console.log(input, search, content);

let keySearch = "ab";
search.addEventListener("click", () => {
    let keySearch = input.value;
    content.innerHTML = "";
    details.innerHTML = "";
    console.log(keySearch);

    fetchData(keySearch);
});

let mainData;
async function fetchData(keySearch) {
    let fetchData = await fetch(`https://api.coingecko.com/api/v3/search?query=${keySearch}`);
    let data = await fetchData.json();
    mainData = data;
    console.log(mainData);
    data.coins.forEach(element => {
        let image = element.thumb;
        let name = element.name;
        let symbol = element.symbol;

        let div = `
        <div class="card">
            <div class="left">
                <img src="${image}" alt="" />
                <h2 class="name">${name}</h2>
                <h2 class="symbol">${symbol}</h2>
            </div>
            <div class="right">
                <button class="moreInfo" onclick='moreInfo("${element.id}")'>More Info</button>
            </div>
        </div>
        `;
        content.innerHTML += div;
    });
}

async function moreInfo(coinId) {
    content.innerHTML = "";
    details.innerHTML = `
        <button class="closeButton" onclick='closeDetails()'>Close</button>
    `;

    // Hide the search elements
    searchBox.style.display = "none";

    let fetchData = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    let data = await fetchData.json();
    console.log(details);
    console.log("moreinfo", data.image.thumb, data.name, data.symbol);
    let div = `
            <img src="${data.image.thumb}" alt="">
            <div class="detail">
                <h1 class="name">${data.name}</h1>
                <div style="margin-bottom:1rem;">
                    <p>${data.symbol}</p>
                    <p>Market Cap Rank: ${data.market_cap_rank}</p>
                    <p>Current Price (INR): ₹${data.market_data.current_price.inr.toFixed(8)}</p>
                    <p>Current Price (USD): $${data.market_data.current_price.usd.toFixed(8)}</p>
                    <p>Current Price (EUR): €${data.market_data.current_price.eur.toFixed(8)}</p>
                    <p>Current Price (GBP): £${data.market_data.current_price.gbp.toFixed(8)}</p>
                </div>
                <div>
                    <h2>Description</h2>
                    <p class="description">${data.description.en ? data.description.en : "No description available"}</p>
                </div>
        </div>
    `;
    details.innerHTML += div;
}

function closeDetails() {
    details.innerHTML = "";

    // Show the search elements
    searchBox.style.display = "flex"; // Reset to the initial display style for the search box container

    fetchData(keySearch);
}

fetchData(keySearch);
