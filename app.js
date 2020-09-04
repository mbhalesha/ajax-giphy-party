console.log("Let's get this party started!");

const $gifArea = $("#gif-area");
const $searchInput = $("#search");

// use AJAX result to add a gif

function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100",
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

// handle form submission: clear search box and make AJAX call

$("form").on("submit", async function (e) {
  e.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { q: searchTerm, api_key: "HcrR1Y3gwYBMREZ7PFX6P2Cv9M1UsT6n" },
  });
  addGif(response.data);
});

// remove all images

$("#remove").on("click", function () {
  $gifArea.empty();
});
