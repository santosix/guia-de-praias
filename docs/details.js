const params = new URLSearchParams(window.location.search);
const nomePraia = params.get("nome");

fetch("data.json")
  .then(res => res.json())
  .then(dados => {
    const praia = dados.find(p => p.nome === nomePraia);

    if (!praia) {
      document.body.innerHTML = "<h1>Praia não encontrada</h1>";
      return;
    }

    const lat = praia.latitude;
    const lon = praia.longitude;

    document.getElementById("praia-nome").textContent = praia.nome;
    document.getElementById("praia-desc").textContent = praia.descricao;
    document.getElementById("praia-img").src = praia.imagem;

    document.getElementById("praia-mapa").src =
      `https://guia-de-praias.onrender.com/map?lat=${lat}&lon=${lon}`;
  });




