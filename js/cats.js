// Gets an HTMLCollection Object of all elements with the class of "rcp" (Short for random cat picture)
// An example would be <img class=rpc></img>
// If you need it to be a standard array, use Array.from(HTMLCollection);
const imgElements = document.getElementsByClassName("rcp");
        // This is a proxy to bypass the CORS security protocall.
        // Read more about this here: https://developer.mozilla.org/en-US/docs/Glossary/CORS
const CorsProxy = "https://corsproxy.io/?url="

// This function gets the cat images.
// We need to use a function here to take advantage of asynchronous processing.
async function getCatPictures() {
    // This is the API that we will call.
        // It's a free service that will serve cat images when requested.
    const BaseURL = "https://cataas.com/api/"
    // This is a compressed version of the below code.
    const catCount = (
        await (await fetch(
            `https://corsproxy.io/?url=${BaseURL}count`
        )).json()).count;
    const skipAmnt = catCount - imgElements.length;
    console.log(skipAmnt);
    // Here we make a fetch() request. fetch() gets data from the input URL.
    // The await keyword will stall this scripts execution until it receives a response.
    const res = await fetch(
        CorsProxy
        // This "adds" the two strings together to make one large URL
        + encodeURIComponent(
            // This endpoint returns a json object.
            BaseURL + 
            // We call this with a limit equal to the number of elements with "rcp" on the page when loaded.
            "cats?limit=" + imgElements.length
            +
            // Here we select some of the cats within the range 0 - n - imgElements.length
            "&skip=" + Math.floor(Math.random() * (skipAmnt))
        )
    );
    // Waits for the json, and then returns it.
    const json = await res.json();
    return json;
    }

async function setCatPictures() {
    if (imgElements && imgElements.length > 0){
        // Awesome cat picture fetcher.
        const catPcitures = await getCatPictures();
        // For each loop.
        for (var i = 0; i < imgElements.length; i++) {
            // Get the image from https://cataas.com/cat/{id}
            const catPictureURL = "https://cataas.com/cat/" + catPcitures[i].id;
            // Set image source to the URL. Your browser will handle the rest.
            imgElements[i].src = catPictureURL;
        }
    }
}

setCatPictures();

