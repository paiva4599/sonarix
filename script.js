const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");
const artistContainer = document.getElementById("artist-container");

function requestApi(searchTerm) {
    const url = "api-artists/artists.json";
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then((data) => {
            const artists = data.artists;

            const filteredResults = artists.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            displayResults(filteredResults);
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados:", error);
        });
}

function displayResults(result) {
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
    console.log(searchTerm);
    
    if (searchTerm === "") {
        resultArtist.classList.add("hidden");
        resultPlaylist.classList.remove("hidden");
        artistContainer.innerHTML = "";
        return;
    }

    requestApi(searchTerm);
});


let currentAudio = null; 
function playAudio(music, clickedDiv) {

    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        clickedDiv.style.backgroundColor = "";
        return;
    }

    currentAudio = new Audio(music);
    currentAudio.play();
    clickedDiv.style.backgroundColor = "black";
}