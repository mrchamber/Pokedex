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
    <li>
        <img src="${pokeman.image}"/>
        <h2>${pokeman.id}. ${pokeman.name}</h2>
        <p>Type: ${pokeman.type}</p>
    </li>
    `)
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();