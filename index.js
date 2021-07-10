const buttomFetch = document.createElement("button");
const template = document.querySelector(".template").content;
const contenedor = document.querySelector(".card-container");
const fragment = document.createDocumentFragment();
const botonvm = document.querySelector(".btn-more");
const form = document.querySelector("#formSearch");
let search = document.getElementById("btnSearch");
let searchText = document.getElementById("searching");

let index = 1;
let showAnimes = 50;
let newValue;
//Contenedor de animes
let isSearch = true;
//Bandera encontrado
let isFound = false;
document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
});

botonvm.addEventListener("click", (e) => {
  e.preventDefault();

  showAnimes++;
  console.log("push");
  fetchData();
});
search.addEventListener("click", (e) => {
  cleanDOM(e);
  e.preventDefault();
  founds = [];
  let valuetext = searchText.value.toLowerCase();

  for (let el = 0; el < newValue[0].length; el++) {
    let valuetitle = newValue[0][el][1].attributes.name.value.toLowerCase();

    if (valuetitle.indexOf(valuetext) !== -1) {
      console.log("Found it ");
      founds.push(el);
      // console.log(el[0]);
      asignarValor(newValue[0][el]);
    } else {
      console.log("Not Found");
    }
  }
  console.log(founds);
  founds.length !== 0 ? (isFound = true) : (isFound = false);
  isFound ? alert("Found it :D") : alert("Not Found :c");
  // setTimeout(clickbutton, 1);
  founds = [];
  // console.log(newValue[0][1]);
});

function cleanDOM(e) {
  contenedor.innerHTML = ``;
}
function saveValue(value) {
  newValue = [value];
}

const fetchData = async () => {
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

      arrAnime.push(xml.all);
    }
    asignarValor(arrAnime);
    saveValue(arrAnime);
  } catch (e) {
    console.log(e);
  }
};
const asignarValor = (data) => {
  if (typeof data === "object") {
    console.log("Es objeto");
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
      if (
        el[1].querySelectorAll('info[type="Plot Summary"]')[0] === undefined
      ) {
        description = "Nada que mostrar";
      } else {
        description = el[1].querySelectorAll('info[type="Plot Summary"]')[0]
          .textContent;
      }
      dataTarget.push(id, img, tittle, arrGenres, description);
      const frag = pintarTarget(dataTarget);

      contenedor.appendChild(frag);
    });
  } else {
    console.log("asignando a filtro");
    // console.log(data[1].attributes.id.value);
    let dataTarget = [];
    //Asignamos valores de elementos a agregar
    const id = data[1].attributes.id.value;
    const img =
      data[1].querySelectorAll("info[type=Picture]")[0].attributes.src.value;
    const tittle = data[1].attributes.name.value;
    arrGenres = [];
    const genres = data[1].querySelectorAll("info[type=Genres]");
    for (let i = 0; i < genres.length; i++) {
      arrGenres.push(genres[i].textContent);
    }
    let description = "";
    if (
      data[1].querySelectorAll('info[type="Plot Summary"]')[0] === undefined
    ) {
      description = "Nada que mostrar";
    } else {
      description = data[1].querySelectorAll('info[type="Plot Summary"]')[0]
        .textContent;
    }
    dataTarget.push(id, img, tittle, arrGenres, description);

    const frag = pintarTarget(dataTarget);

    contenedor.appendChild(frag);
    console.log("filtadro exitoso");
  }
};

function pintarTarget(dt) {
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

  const clone = template.cloneNode(true);
  fragment.appendChild(clone);
  document.getElementById("spinner").style.display = "none";
  return fragment;
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
