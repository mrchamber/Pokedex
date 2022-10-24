const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++){
        const url = `https://updated-pokemon-apis-production.up.railway.app/pokemon/${i}`;
        promises.push(fetch(url).then((res)=> res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.image,
            type: data.type,
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map (pokeman => `
    <div class="card">
        <img class="card-img" src="${pokeman.image}"/>
        <h2 class="card-num">#${pokeman.id.toString().padStart(3,'0')}</h2>
        <h2 class="card-title">${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
    </div>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();
