const freebiesTable = document.getElementById("freebies");
const lootTable = document.getElementById("loot");
const bestTable = document.getElementById("best");
const bargainTable = document.getElementById("bargains");

async function updateFreebies() {
    // Fetch API Data
    const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?upperPrice=0`);
    const data = await response.json();
    var tableData = "";
    data.forEach(d => {
        tableData += `
        <tr>
            <td><s>${d.normalPrice}</s> FREE!!!</td>
            <td><a 
            href="https://www.cheapshark.com/redirect?dealID=${d.dealID}"
            target="_blank" rel="noopener noreferrer"
            >${d.title}</a></td>
        </tr>
        `
    });
    freebiesTable.innerHTML = tableData;
}

/*
Gets sales from cheapshark.
type: 0 = Best, 1 = AAA, 2 = Price, 3 = Savings
*/
async function updateSalesCheapShark(type, table) {
    const types = [
        "https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=DealRating",
        "https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=DealRating&AAA=1",
        "https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=Price",
        "https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=Savings"
    ]
    // Fetch API Data
    const response = await fetch(types[type]);
    const data = await response.json();
    var tableData = "";
    data.forEach(d => {
        tableData += `
        <tr>
            <td class=steam-sale><b class="steam-sale">${(100 - (d.salePrice / d.normalPrice * 100)).toFixed(0)}%</b></td>
            <td><s>${d.normalPrice}</s> ${d.salePrice}!</td>
            <td><a
            href="https://store.steampowered.com/app/${d.steamAppID}"
            target="_blank" rel="noopener noreferrer">${d.title}
            
            </a></td>
        </tr>
        `
    });
    table.innerHTML = tableData
}

function updateAll() {
    updateFreebies();
    updateSalesCheapShark(0,bestTable);
    updateSalesCheapShark(2,bargainTable);
}

updateAll()