const poke_container = document.getElementById("poke-container");
const pokemon_count = 386;
const colors = {
    generation1: "linear-gradient(145deg, " +'#1111ff' + ", " + '#ff1111' + ", " + '#ffd733' +")",
    generation2: "linear-gradient(145deg, " +'#daa520' + ", " + '#c0c0c0' + ", " + '#4fd9ff' +")",
    generation3: "linear-gradient(145deg, " +'#a00000' + ", " + '#0000a0' + ", " + '#00a000' +")",
    generation4: "linear-gradient(145deg, " +'#aaaaff' + ", " + '#ffaaaa' + ", " + '#999999' +")",
    generation5: "linear-gradient(145deg, " +'#444444' + ", " + '#e1e1e1' + ")",
    generation6: "linear-gradient(145deg, " +'#6376b8' + ", " + '#ed5540' + ")",
    generation7: "linear-gradient(145deg, " +'#f1912b' + ", " + '#5599ca' + ")",
    generation8: "linear-gradient(145deg, " +'#00d1f6' + ", " + '#9e2306' + ")",
    generation10: "linear-gradient(145deg, " +'#c91421' + ", " + '#632ea6' + ")",
}

const infoColors = {
  Bug: '#A6B91A',
  Dark: '#705746',
  Dragon: '#6F35FC',
  Electric: '#F7D02C',
  Fairy: '#D685AD',
  Fighting: '#C22E28',
  Fire: '#EE8130',
  Flying: '#A98FF3',
  Ghost: '#735797',
  Grass: '#7AC74C',
  Ground: '#E2BF65',
  Ice: '#96D9D6',
  Normal: '#A8A77A',
  Poison: '#A33EA1',
  Psychic: '#F95587',
  Rock: '#B6A136',
  Steel: '#B7B7CE',
  Water: '#6390F0',
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
     <div class="tile-card" onclick="selectPokemon(${pokemon.id})">
        <div class="img-container">
                <img src="https://pokeimage-production.up.railway.app/pokeImg/${pokemon.id}.png">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
            </div>
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
    const ability = pokeman.abilities;
    const type = Object.values(pokeman.type).map((type) => type).join('/');
    console.log(type);
    const htmlString = `
        <div class="poke_card" onclick="closeCard()">
            <div class="poke-card-body" id="poke-card-body">
                <div class="left-side">
                    <h1 class="num">#${pokeman.id.toString().padStart(3,'0')}</h1>
                    <h2 class="card-name">${pokeman.name}</h2>
                    <h2 class="card-title"><em>The ${pokeman.category} Pokemon</em></h2>
                    <img src="https://pokeimage-production.up.railway.app/pokeImg/${pokeman.id}.png" class="card-img">
                    <h3 class="poke-height">${type}</h3>
                    <h3 class="poke-height">${pokeman.height}</h3>
                    <h3 class="poke-height">${pokeman.weight}</h3>
                </div>
                <div class="right-side">
                    <h2 class="section-header">Enrty:</h2>
                    <div class="enrty-container">
                        <p class="enrty-info">${pokeman.entry}</p>
                    </div>
                    <h2 class="section-header">Abilities:</h2>
                    <div class="ability-container">
                         <p class="ability-info">${ability}</p>
                    </div>
                    <h2 class="section-header">Base Stats</h2>
                    <div class="bs-container">
                        <div class="stat-columns">
                            <div class="stat-name">HP</div>
                            <div class="stat-val">${pokeman.stats.HP}</div>
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
                            <div class="stat-name">Sp. Attack</div>
                            <div class="stat-val">${pokeman.stats.SpAtk}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Sp. Defense</div>
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

    const poke = document.getElementById("poke-card-body");

    const poke_type = pokeman.type.T1;
    const poke_type2 = pokeman.type.T2;


    const color = infoColors[poke_type];
    const color2 = infoColors[poke_type2];


    if(Object.keys(pokeman.type).length === 2){
        poke.style.background = "linear-gradient(145deg, " + color + ", " + "#d3d3d3" + ", " + color2 +")";
    }

    if (Object.keys(pokeman.type).length === 1) {
        poke.style.background = "linear-gradient(145deg, " + color + ", " + "#d3d3d3" + ", " + color +")";
    }

};

const closeCard = () => {
    const card = document.querySelector('.poke_card');
    card.parentElement.removeChild(card)
}

fetchPokemon();

