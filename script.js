const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");
const artistContainer = document.getElementById("artist-container");

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // Filtrando os artistas manualmente
            const filteredResults = data.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            displayResults(filteredResults);
        });
}

function displayResults(result) {
    // Limpa os artistas anteriores antes de adicionar os novos
    artistContainer.innerHTML = "";

    if (result.length === 0) {
        resultArtist.classList.add("hidden");
        resultPlaylist.classList.remove("hidden");
        return;
    }

    result.forEach(element => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        const cardImg = document.createElement("div");
        cardImg.classList.add("card-img");

        const artistImage = document.createElement("img");
        artistImage.src = element.urlImg;
        artistImage.alt = element.name;
        artistImage.classList.add("artist-img");

        const playDiv = document.createElement("div");
        playDiv.classList.add("play");
        playDiv.innerHTML = '<span class="fa fa-solid fa-play"></span>';

        cardImg.appendChild(artistImage);
        cardImg.appendChild(playDiv);

        const cardText = document.createElement("div");
        cardText.classList.add("card-text");

        const artistName = document.createElement("span");
        artistName.innerText = element.name;
        artistName.classList.add("artist-name");

        const artistCategory = document.createElement("span");
        artistCategory.innerText = "Artista";
        artistCategory.classList.add("artist-categorie");

        cardText.appendChild(artistName);
        cardText.appendChild(artistCategory);

        artistCard.appendChild(cardImg);
        artistCard.appendChild(cardText);
        artistContainer.appendChild(artistCard);
    });

    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === "") {
        resultArtist.classList.add("hidden");
        resultPlaylist.classList.remove("hidden");
        artistContainer.innerHTML = ""; // Limpa os resultados
        return;
    }

    requestApi(searchTerm);
});
