const poke_container = document.getElementById("poke-container");
const pokemon_count = 151;
const colors = {
    generation1: "linear-gradient(180deg, " +'#1111ff' + ", " + '#ff1111' + ", " + '#ffd733' +")",
    generation2: "linear-gradient(180deg, " +'#daa520' + ", " + '#c0c0c0' + ", " + '#4fd9ff' +")",
    generation3: "linear-gradient(180deg, " +'#a00000' + ", " + '#0000a0' + ", " + '#00a000' +")",
}

console.log(poke_container);

const fetchPokemon =  async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
}
const getPokemon = async (id) =>{
    const url = `https://updated-pokemon-apis-production.up.railway.app/pokemon/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data);
}

fetchPokemon();

const  createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3,'0')
    const generation = pokemon.generation.name
    const color = colors[generation]

    pokemonEl.style.background = color;


    const pokemonHTMLString = `
     <div class="img-container">
                <img src="https://pokeimage-production.up.railway.app/pokeImg/${pokemon.id}.png">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
            </div>
            `
    pokemonEl.innerHTML = pokemonHTMLString

    poke_container.appendChild(pokemonEl)
};

