const poke_container = document.getElementById("poke-container");
const pokemon_count = 201;
const colors = {
    generation1: "linear-gradient(145deg, " +'#1111ff' + ", " + '#ff1111' + ", " + '#ffd733' +")",
    generation2: "linear-gradient(145deg, " +'#daa520' + ", " + '#c0c0c0' + ", " + '#4fd9ff' +")",
    generation3: "linear-gradient(145deg, " +'#a00000' + ", " + '#0000a0' + ", " + '#00a000' +")",
}

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
                <span class="number" onclick="selectPokemon(${pokemon.id})">#${id}</span>
                <h3 class="name">${name}</h3>
            </div>
            `
    pokemonEl.innerHTML = pokemonHTMLString;

    poke_container.appendChild(pokemonEl)
};

const selectPokemon = async (id) => {
    const url = `https://updated-pokemon-apis-production.up.railway.app/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    displayCard(pokeman);
};

const displayCard = (pokeman) => {
    const htmlString = `
        <div class="poke-card">
            <div class="poke-card-body">
                <div class="left-side">
                    <h1 class="num">#${pokeman.id.toString().padStart(3,'0')}</h1>
                    <h2 class="card-name">${pokeman.name}</h2>
                    <img src="https://pokeimage-production.up.railway.app/pokeImg/${pokeman.id}.png" class="card-img">
                    <h3 class="poke-height">${pokeman.height}</h3>
                    <h3 class="poke-height">${pokeman.weight}</h3>
                </div>
                <div class="right-side">
                    <h2 class="section-header">Enrty:</h2>
                    <div class="enrty-container">
                        <p class="enrty-info"></p>
                    </div>
                    <h2 class="section-header">Abilities:</h2>
                    <div class="ability-container">
                         <p class="ability-info"><${pokeman.abilities}/p>
                    </div>
                    <h2 class="section-header">Base Stats</h2>
                    <div class="bs-container">
                        <div class="stat-columns">
                            <div class="stat-name">HP</div>
                            <divclass="stat-val">${pokeman.stats.HP}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Attack</div>
                            <div class="stat-val">${pokeman.stats.Attack}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Defense</div>
                            <div class="stat-val">${pokeman.stats.Defense}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Special Attack</div>
                            <div class="stat-val">${pokeman.stats.SpAtk}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Special Defense</div>
                            <div class="stat-val">${pokeman.stats.SpDef}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Speed</div>
                            <div class="stat-val">${pokeman.stats.Speed}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    poke_container.innerHTML = htmlString + poke_container.innerHTML;
    console.log(htmlString);
}

fetchPokemon();

