const buttomFetch = document.createElement("button");
const template = document.querySelector(".template").content;
const contenedor = document.querySelector(".card-container");
const fragment = document.createDocumentFragment();
const botonvm = document.querySelector(".btn-more");
const form = document.querySelector("#formSearch");
let search = document.getElementById("btnSearch");

let index = 1;
let showAnimes = 20;
//Contenedor de animes
let isSearch = true;
document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
});

botonvm.addEventListener("click", (e) => {
  e.preventDefault();
  showAnimes = 1;
  fetchData();
  console.log("se activo");
  console.log(showAnimes);
  // showAnimes++;
  // fetchData();
});
search.addEventListener("click", () => {
  showAnimes = 0;
  fetchData();
  console.log("se activo");
});

const fetchData = async () => {
  console.log(showAnimes);
  // return fetch(apis.currentWeather.url(lat, lon))
  // .then(response => response.text())
  // .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  // .then(data => console.log(data))
  // const prom = fetch('https://api.thecatapi.com/v1/images/search')
  // .then(res=>res.json())
  // .then(data=>console.log(data))
  try {
    const arr = [6, 10, 11, 21, 25, 28, 30, 31, 32, 33, 39, 40, 68, 71, 76, 78];
    let arrAnime = [];
    for (index; index <= showAnimes; index++) {
      if (arr.indexOf(index) > -1) {
        continue;
      }
      const api = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?";
      const animu = `anime=${index}`;
      const res = await fetch(api + animu);
      const data = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      //   (str) => new (window.DOMParser().parseFromString)(str, "text/xml");
      console.log(xml.all[1].attributes.name.value.toLowerCase());
      arrAnime.push(xml.all);
    }
    asignarValor(arrAnime);
  } catch (e) {
    console.log(e);
  }
};
const asignarValor = (data) => {
  data.forEach((el) => {
    // console.log(el[1]);
    let dataTarget = [];
    //Asignamos valores de elementosw a agregar
    const id = el[1].attributes.id.value;
    const img =
      el[1].querySelectorAll("info[type=Picture]")[0].attributes.src.value;
    const tittle = el[1].attributes.name.value;
    arrGenres = [];
    const genres = el[1].querySelectorAll("info[type=Genres]");
    for (let i = 0; i < genres.length; i++) {
      arrGenres.push(genres[i].textContent);
    }
    let description = "";
    if (el[1].querySelectorAll('info[type="Plot Summary"]')[0] === undefined) {
      description = "Nada que mostrar";
    } else {
      description = el[1].querySelectorAll('info[type="Plot Summary"]')[0]
        .textContent;
    }
    dataTarget.push(id, img, tittle, arrGenres, description);

    pintarTarget(dataTarget);
  });
};

function pintarTarget(dt) {
  const clone = template.cloneNode(true);
  //id
  template.querySelectorAll("p")[0].textContent = dt[0];
  //img
  template.querySelector("img").setAttribute("src", dt[1]);
  //tittle
  template.querySelector("h1").textContent = dt[2];
  //Generos
  template.querySelectorAll("p")[1].textContent = dt[3];
  //description
  template.querySelectorAll("p")[2].textContent = dt[4];

  fragment.appendChild(clone);
  contenedor.appendChild(fragment);

  document.getElementById("spinner").style.display = "none";
}

const pintarCat = (data) => {
  //Creamos clone
  const clone = template.cloneNode(true);

  //Asignamos id
  template.querySelectorAll("p")[0].textContent =
    data.childNodes[0].childNodes[0].attributes[0].value;
  //Asignamos el url de la imagen
  const imagen =
    data.childNodes[0].childNodes[0].querySelector("info").attributes[2].value;
  template.querySelector("img").setAttribute("src", imagen);
  //Asignamos titulo
  template.querySelector("h1").textContent =
    data.childNodes[0].childNodes[0].attributes[3].value;
  //Recuperamos todos los generos
  const generos =
    data.childNodes[0].childNodes[0].querySelectorAll("info[type=Genres]");
  //Creamos constante que guarda los generos

  const arrGen = [];
  for (let i = 0; i < generos.length; i++) {
    if (generos[i] == undefined) {
      console.log("something wrong");
      continue;
    } else {
      arrGen.push(generos[i].textContent);
    }
  }
  //Colocamos los generos existentes
  template.querySelectorAll("p")[1].textContent = arrGen;
  //Agregamos la descripción
  const description = data.childNodes[0].childNodes[0].querySelector(
    'info[type="Plot Summary"]'
  );

  template.querySelectorAll("p")[2].textContent = description.textContent;

  fragment.appendChild(clone);
  contenedor.appendChild(fragment);
};

// const fetchDataComplete = async function () {
//   for (let i = 1; i < 5; i++) {
//     const api = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?";
//     const anime = `anime=${i}`;
//     const res = await fetch(api + anime);
//     const data = await res.text();
//     const parser = new DOMParser();
//     const xml = parser.parseFromString(data, "application/xml");
//     // console.log(xml);
//   }
// };
// fetchDataComplete();
