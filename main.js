if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/pwa-teste/sw.js")
    .then(() => {
      console.log("service worker registered");
    })
    .catch(() => {
      console.warn("service worker failed");
    });
}

let myPrompt;
const pwaAlert = document.querySelector(".pwa_alert");
const btnPWA = document.querySelector(".pwa_alert_btn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();

  myPrompt = e;

  pwaAlert.style.display = "block";
});

btnPWA.addEventListener("click", () => {
  pwaAlert.style.display = "none";
  myPrompt.prompt();
  myPrompt.userChoice.then((choiceResult) => {
    if (choiceResult === "accepted") {
      console.log("Aceitou");
    } else {
      console.log("Cancelou");
    }
  });
});

// Calculation

var activedShape = "Quadrado";
var paredeAltura = "";
var paredeLargura = "";
var placaAltura = "";
var placaLargura = "";
var ladoPlaca = "";
var totalPlacasParede = 0;

function onChangeShape() {
  const inputElements = document.getElementsByName("radio");

  Array.from(inputElements).map((element) => {
    if (element.checked === true) {
      activedShape = element.value;
    }
  });

  changeInputs(activedShape);

  return activedShape;
}

function getInputsValue() {
  try {
    paredeAltura = parseFloat(document.getElementById("altura-parede").value);
    paredeLargura = parseFloat(document.getElementById("largura-parede").value);
    placaAltura = parseFloat(document.getElementById("altura-placa").value);
    placaLargura = parseFloat(document.getElementById("largura-placa").value);
    ladoPlaca = parseFloat(document.getElementById("lado-placa").value);

    if (paredeAltura === NaN || paredeAltura === "") {
      paredeAltura = 0;
    }
    if (paredeLargura === NaN || paredeLargura === "") {
      paredeLargura = 0;
    }
    if (placaAltura === NaN || placaAltura === "") {
      placaAltura = 0;
    }
    if (placaLargura === NaN || placaLargura === "") {
      placaLargura = 0;
    }
    if (ladoPlaca === NaN || ladoPlaca === "") {
      ladoPlaca = 0;
    }

    return {
      paredeAltura: paredeAltura,
      paredeLargura: paredeLargura,
      placaAltura: placaAltura,
      placaLargura: placaLargura,
      ladoPlaca: ladoPlaca,
    };
  } catch (error) {}
}

function doCalculation() {
  activedShape = onChangeShape();

  const inputsValueObject = getInputsValue();

  try {
    let areaParede = paredeAltura * paredeLargura;
    let areaPlaca = 0;
    let alturaTrianguloEquilatero = 0;

    if (ladoPlaca !== "") {
      alturaTrianguloEquilatero = (ladoPlaca * Math.sqrt(3)) / 2;
    }

    if (activedShape === "Quadrado") {
      areaPlaca = placaAltura * placaAltura;
    } else {
      if (activedShape === "Triângulo") {
        areaPlaca = (ladoPlaca * alturaTrianguloEquilatero) / 2;
      } else {
        if (activedShape === "Hexágono") {
          areaPlaca = ((ladoPlaca * alturaTrianguloEquilatero) / 2) * 6;
        } else {
          if (activedShape === "Retângulo") {
            areaPlaca = placaAltura * placaLargura;
          }
        }
      }
    }

    const placasQTD = areaParede / areaPlaca;

    localStorage.setItem(
      "result",
      JSON.stringify({
        paredeAltura: paredeAltura,
        paredeLargura: paredeLargura,
        activedShape: activedShape,
        placaAltura: placaAltura,
        placaLargura: placaLargura,
        ladoPlaca: ladoPlaca,
        placasPorParede: Math.round(placasQTD),
      })
    );

    location.href = "/resultado.html";
  } catch (error) {
    window.alert(error);
  }
}

function changeInputs(shape = "Quadrado") {
  const quadradoElement = document.getElementById("quadrado");
  const retanguloElement = document.getElementById("retangulo");
  const trianguloElement = document.getElementById("triangulo");
  const hexagonoElement = document.getElementById("hexagono");

  quadradoElement.style =
    "opacity: 0; position: absolute; pointer-events: none;";
  retanguloElement.style =
    "opacity: 0; position: absolute; pointer-events: none;";
  trianguloElement.style =
    "opacity: 0; position: absolute; pointer-events: none;";
  hexagonoElement.style =
    "opacity: 0; position: absolute; pointer-events: none;";

  if (shape === "Quadrado") {
    quadradoElement.style =
      "opacity: 1; position: relative; pointer-events: unset;";
  } else {
    if (shape === "Retângulo") {
      retanguloElement.style =
        "opacity: 1; position: relative; pointer-events: unset;";
    } else {
      if (shape === "Triângulo") {
        trianguloElement.style =
          "opacity: 1; position: relative; pointer-events: unset;";
      } else {
        if (shape === "Hexágono") {
          hexagonoElement.style =
            "opacity: 1; position: relative; pointer-events: unset;";
        }
      }
    }
  }
}

function setResultValues() {
  const resultObject = JSON.parse(localStorage.getItem("result"));

  const paredeAlturaElement = document.getElementById("paredeAltura");
  const paredeLarguraElement = document.getElementById("paredeLargura");
  const activedShapeElement = document.getElementById("tipoPlaca");
  const placaAlturaElement = document.getElementById("placaAltura");
  const placaLarguraElement = document.getElementById("placaLargura");
  const totalPlacasElement = document.getElementById("resultPlacas");
  const placaLadoElement = document.getElementById("placaLado");

  paredeAlturaElement.innerHTML = `${resultObject.paredeAltura}`;
  paredeLarguraElement.innerHTML = `${resultObject.paredeLargura}`;
  activedShapeElement.innerHTML = `${resultObject.activedShape}`;
  placaAlturaElement.innerHTML = `${resultObject.placaAltura}`;
  placaLarguraElement.innerHTML = `${resultObject.placaLargura}`;
  totalPlacasElement.innerHTML = `${resultObject.placasPorParede}`;
  placaLadoElement.innerHTML = `${resultObject.ladoPlaca}`;
}
