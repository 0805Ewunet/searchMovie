const API_KEY = "c167a1d6d90245b8b9aef98026139cfa";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const url =
  "https://api.themoviedb.org/3/search/movie?api_key=c167a1d6d90245b8b9aef98026139cfa";

const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const moviesSearchable = document.querySelector("#movies-searchable");
const imgElement = document.querySelector("img");

//for the movie to display
function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=c167a1d6d90245b8b9aef98026139cfa`;
  return url;
}

function requestMovies(url, onComplete, onError) {
  fetch(newUrl)
    .then((res) => res, json())
    .then(onComplete)
    .catch((onError) => {
      console.log("Error:", error);
    });
}

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img 
      src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id} />`;
    }
  });
}

function createMovieContainer(movies) {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `  
<section class="section">
  ${movieSection(movies)}
  </section>
  <div class="content ">
  <p id="content-close">X</p>
  </div>`;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

function searchMovie(value) {
  const path = "/search/movie";
  const url = generateUrl(path) + "&query=" + value;
  requestMovies(url, renderSearchMovies, "");
}

//error handling
function handleError(error) {
  console.log("Error: ", error);
}

buttonElement.onclick = function (event) {
  event.preventDefault();
  const value = inputElement.value;

  const path = "/search/movie";
  const newUrl = generateUrl(path) + "&query=" + value;

  fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      const movies = data.results;
      const movieBlock = createMovieContainer(movies);
      moviesSearchable.appendChild(movieBlock);
      console.log("Data: ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  inputElement.value = "";
  console.log("Value: ", value);
};

function createIframe(video) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe;
}

function createVideoTemplate(data, content) {
  content.innerHTML = '<p id="content-close">X</p>';
  console.log("Videos: ", data);
  const videos = data.results;
  const length = videos.length > 4 ? 4 : videos.length;
  const iframeContainer = document.createElement("div");

  for (let i = 0; i < length; i++) {
    const video = videos[i];
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }
}

// Event Delegation
document.onclick = function (event) {
  const target = event.target;

  if (target.tagName.toLowerCase() === "img") {
    console.log("Hello World");
    console.log("Event:", event);
    const movieId = target.dataset.movieId;
    console.log("Movie ID: ", movieId);
    const section = event.target.parentElement;
    const content = section.nextElementSibling;
    content.classList.add("content-display");

    const path = `/movie/${movieId}/videos`;
    const url = generateUrl(path);
    //fetch movie videos
    fetch(url)
      .then((res) => res.json())
      .then((data) => createVideoTemplate(data, content))
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  if (target.id === "content-close") {
    const content = target.parentElement;
    content.classList.remove("content-display");
  }
};
