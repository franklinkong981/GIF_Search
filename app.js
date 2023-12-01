const gifSearchForm = document.querySelector("#gif-search-form");
const gifSearchBar = document.querySelector("#gif-search-bar");
const gifArea = document.querySelector("#gif-area");
const removeAllButton = document.querySelector("#remove-all-button");

const api_key = "YOj61844GpHxKOfbsbLFYTmBgMBAO3j7";

gifSearchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = gifSearchBar.value;
    const response = await sendGIFRequest(searchTerm);
    const gifToUse = getRandomGIF(response);
    console.log(gifToUse);
    const gifElement = createGIFElement(gifToUse.images.downsized_large.url, gifToUse.title);
    gifArea.append(gifElement);
    gifSearchBar.value = "";
});

removeAllButton.addEventListener("click", removeAllGIFs);

async function sendGIFRequest(searchTerm) {
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {params: {api_key, q: searchTerm}});
    return response;
}

function getRandomGIF(response) {
    const indexToChoose = Math.floor(Math.random() * response.data.data.length);
    return response.data.data[indexToChoose];
}

function createGIFElement(gifURL, gifTitle) {
    const newGIF = document.createElement("img");
    newGIF.setAttribute("src", gifURL);
    newGIF.setAttribute("alt", gifTitle);
    newGIF.classList.add("gif");
    return newGIF;
}

function removeAllGIFs() {
    for (let i = gifArea.children.length - 1; i >= 0; i--) {
        gifArea.children[i].remove();
    }
}

