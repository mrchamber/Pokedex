const poke_container = document.getElementById("poke-container");
const SearchContainer = document.getElementById("search-container");
const RegionElement = document.getElementById("region-container");
const TypeElement = document.getElementById("type-container");

/*Creates the search bar*/
const SearchElement = document.createElement("input");
SearchElement.setAttribute("type", "text");
SearchElement.setAttribute("name", "searchBar");
SearchElement.setAttribute("placeholder", "Search...");
SearchContainer.appendChild(SearchElement);

/*Creates the region select and options*/
const region = ["All Regions", "Kanto","Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Hisui", "Paldea", "Kitakami"];
const regionSelect = document.createElement("select");
regionSelect.id = "select-option";
RegionElement.appendChild(regionSelect);

/*Loops through array for the region options*/
for (let i = 0; i < region.length; i++){
    let option = document.createElement("option");
    option.value = region[i];
    option.text = region[i];
    regionSelect.appendChild(option);
}

/*Creates the type select and options*/
const type = ["All Types", "Bug","Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"];
const typeSelect = document.createElement("select");
typeSelect.id = "type-select";
TypeElement.appendChild(typeSelect);

/*Loops through array for the type options*/
for (let i = 0; i < type.length; i++){
    let option = document.createElement("option");
    option.value = type[i];
    option.text = type[i];
    typeSelect.appendChild(option);
}

const SortElement = document.getElementById("sort");

const pokeCache = {};

let pokemons = "";
let pokemon_sel;
let tempPoke;

/*Colors for the generations*/
const colors = {
    generation1: "linear-gradient(145deg, " +'#1111ff' + ", " + '#ff1111' + ", " + '#ffd733' +")",
    generation2: "linear-gradient(145deg, " +'#daa520' + ", " + '#c0c0c0' + ", " + '#4fd9ff' +")",
    generation3: "linear-gradient(145deg, " +'#a00000' + ", " + '#0000a0' + ", " + '#00a000' +")",
    generation4: "linear-gradient(145deg, " +'#aaaaff' + ", " + '#ffaaaa' + ", " + '#999999' +")",
    generation5: "linear-gradient(145deg, " +'#444444' + ", " + '#e1e1e1' + ")",
    generation6: "linear-gradient(145deg, " +'#6376b8' + ", " + '#ed5540' + ")",
    generation7: "linear-gradient(145deg, " +'#f1912b' + ", " + '#5599ca' + ")",
    generation8: "linear-gradient(145deg, " +'#00d1f6' + ", " + '#9e2306' + ")",
    generation85: "linear-gradient(145deg, " +'#fad709' + ", " + '#f1f4f4' + ", " + '#5e6365' +")",
    generation9: "linear-gradient(145deg, " +'#c91421' + ", " + '#632ea6' + ")",
    generation95: "linear-gradient(145deg, " +'#4c9c3f' + ", " + '#282e26' + ", " + '#22a496' + ")"
}
/*Colors for the types*/
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
/* This for the load screen no touch Ant. I don't even know how to explain this*/
function onReady(callback) {
    const intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 1000);
}

function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function (){
    setVisible('.page', true);
    setVisible('#loading', false)
})
/*Clears the poke-container for the Gens/Region*/
function clearBox(element){
    document.getElementById("poke-container").innerHTML = "";
}

let apiUrl = "https://updated-pokemon-apis-production.up.railway.app/Pokemon/"

async function getPokemon(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

//pulls pokemons info from the api
async function fetchPokemon() {
    getPokemon(apiUrl)
        .then(data => {
            pokemons = data;
            createPokemonCard(pokemons);
        })
    pokemons = await getPokemon(apiUrl)
    pokemon_sel = await getPokemon(apiUrl)
    console.log(pokemons);
}

fetchPokemon();

//Pulls pokemon by id for the region select
function filter(min, max) {
    return pokemons.filter(pokeman => {
        return pokeman.id >= min && pokeman.id <= max;
    });
}

pokemon_sel = pokemons;
console.log(pokemon_sel)

//Region dropdown list listener and set the temp array pokemon_sel to the filter function
RegionElement.addEventListener('change', function handleChangeRegion (event){
    if (event.target.value === 'All Regions'){
        pokemon_sel = pokemons
        clearBox();
        createPokemonCard(pokemons);
    }
    if (event.target.value === 'Kanto'){
        pokemon_sel = filter(1,151);
        console.log(pokemon_sel);
        clearBox();
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Johto'){
        pokemon_sel = filter(152,251);
        // clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Hoenn'){
        pokemon_sel = [...filter(252,386)];
        clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Sinnoh'){
        pokemon_sel = [...filter(387,493)];
        clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Unova'){
        pokemon_sel = filter(494,649);
        clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Kalos'){
        pokemon_sel = filter(650,721);
        clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Alola'){
        pokemon_sel = filter(722,809);
        clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Galar'){
        pokemon_sel = filter(810,898);
        clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Hisui'){
        pokemon_sel = filter(899,905);
        clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Paldea'){
        pokemon_sel = filter(906,1010);
        clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
    if (event.target.value === 'Kitakami'){
        pokemon_sel = filter(1011,1017);
        clearBox();
        console.log(pokemon_sel)
        createPokemonCard(pokemon_sel);
    }
});

function createPokemonCard(pokemons) {
    console.log(pokemons);
    let pokemonHTMLString = "";
    for (let i = 0; i < pokemons.length; i++) {
        pokemonHTMLString += `
            <!-- .pokemon contorls the card -->
            <div class="pokemon" data-generation="${pokemons[i].generation}" style="background: ${colors[pokemons[i].generation]}">
                 <!-- is contorled by .pokemon -->
                 <div id="tilecard" class="tile-card" onclick="selectPokemon(${pokemons[i].id})">
                 <!-- is contorled by .pokemon .img-container -->
                    <div class="img-container">
                            <!-- is contorled by .pokemon .img-container img -->
                            <img id="poke" src="https://pokeimage-production.up.railway.app/pokeImg/${pokemons[i].id}.png">
                        </div>
                        <!-- is contorled by .pokemon .info -->
                        <div class="info">
                            <!-- is contorled by .pokemon .info .number -->
                            <span class="number">#${pokemons[i].id.toString().padStart(3, '0')}</span>
                            <!-- is contorled by .pokemon .info .name -->
                            <h3 class="name">${pokemons[i].name[0].toUpperCase() + pokemons[i].name.slice(1)}</h3>
                        </div>
                 </div>
            </div>
            `
    }
    poke_container.innerHTML = pokemonHTMLString;
};

//Caches info for users to keep from multi network requests
const selectPokemon = async (id) => {

    if (!pokeCache[id]){
        const url = `https://updated-pokemon-apis-production.up.railway.app/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        pokeCache[id] = pokeman;
        displayCard(pokeman);
    }
    else{
        displayCard(pokeCache[id]);
    }

};

const displayCard = (pokeman) => {
    const ability = pokeman.abilities;
    const type = Object.values(pokeman.type).map((type) => type).join('/');

    const htmlString = `
        <!-- is contorled by .poke_card -->
        <div class="poke_card">
       
            <!-- is contorled by .poke-card-body -->
            <div class="poke-card-body" id="poke-card-body">
            <!-- is contorled by #closeBtn -->
            <img src="gray%20X.png" id="closeBtn" onclick="closeCard()">
                <!-- is contorled by .left-side -->
                <div class="left-side">
                    <!-- is contorled by .num -->
                    <h1 class="num">#${pokeman.id.toString().padStart(3,'0')}</h1>
                    <!-- is contorled by .card-name -->
                    <h2 class="card-name">${pokeman.name}</h2>
                    <!-- is contorled by .card-title -->
                    <h2 class="card-title"><em>The ${pokeman.category} Pokemon</em></h2>
                    <!-- is contorled by .card-img the animation is contorled by .card-img:hover and bounce-->
                    <img src="https://pokeimage-production.up.railway.app/pokeImg/${pokeman.id}.png" class="card-img" id="card-img" onclick="play()">
                    <audio id="audio" src="https://pokeimage-production.up.railway.app/pokeCry/${pokeman.id}.mp3"></audio>
                    <!-- is contorled by nothing -->
                    <h3 class="poke-height">${type}</h3>
                    <h3 class="poke-height">${pokeman.height}</h3>
                    <h3 class="poke-height">${pokeman.weight}</h3>
                </div>
                <!-- .left-side ends here -->
                <!-- is contorled by .right-side -->
                <div class="right-side">
                    <!-- is contorled by .section-header -->
                    <h2 class="section-header">Entry: </h2>
                    <!-- is contorled by .enrty-container and .ability-container, .bs-container, .enrty-container -->
                    <div class="enrty-container">
                        <p class="enrty-info">${pokeman.entry}</p>
                    </div>
                    <h2 class="section-header">Abilities: </h2>
                    <!-- is contorled by .ability-container and .ability-container, .bs-container, .enrty-container -->
                    <div class="ability-container">
                         <!-- is contorled by .ability-info -->
                         <p class="ability-info">${ability}</p>
                    </div>
                    <h2 class="section-header">Base Stats: </h2>
                    <!-- is contorled by .bs-container and .ability-container, .bs-container, .enrty-container -->
                    <div class="bs-container">
                        <!-- is contorled by .stat-columns -->
                        <div class="stat-columns">
                            <!-- is contorled by .stat-name, .stat-val -->
                            <!-- is contorled by .stat-name -->
                            <div class="stat-name">HP</div>
                            <!-- is contorled by .stat-val -->
                            <div class="stat-val">${pokeman.stats.HP}</div>
                        </div>
                        <!-- is contorled by .stat-name, .stat-val -->
                        <!-- is contorled by .stat-columns -->
                        <div class="stat-columns">
                            <!-- is contorled by .stat-name -->
                            <div class="stat-name">Attack</div>
                            <!-- is contorled by .stat-val -->
                            <div class="stat-val">${pokeman.stats.Attack}</div>
                        </div>
                        <!-- is contorled by .stat-name, .stat-val -->
                        <!-- is contorled by .stat-columns -->
                        <div class="stat-columns">
                            <div class="stat-name">Defense</div>
                            <!-- is contorled by .stat-val -->
                            <div class="stat-val">${pokeman.stats.Defense}</div>
                        </div>
                        <!-- is contorled by .stat-name, .stat-val -->
                        <!-- is contorled by .stat-columns -->
                        <div class="stat-columns">
                            <!-- is contorled by .stat-name -->
                            <div class="stat-name">Sp. Attack</div>
                            <!-- is contorled by .stat-val -->
                            <div class="stat-val">${pokeman.stats.SpAtk}</div>
                        </div>
                        <!-- is contorled by .stat-name, .stat-val -->
                        <!-- is contorled by .stat-columns -->
                        <div class="stat-columns">
                            <!-- is contorled by .stat-name -->
                            <div class="stat-name">Sp. Defense</div>
                            <!-- is contorled by .stat-val -->
                            <div class="stat-val">${pokeman.stats.SpDef}</div>
                        </div>
                        <!-- is contorled by .stat-name, .stat-val -->
                        <!-- is contorled by .stat-columns -->
                        <div class="stat-columns">
                            <!-- is contorled by .stat-name -->
                            <div class="stat-name">Speed</div>
                            <!-- is contorled by .stat-val -->
                            <div class="stat-val">${pokeman.stats.Speed}</div>
                        </div>
                    </div>
                    <!-- is contorled by nothing -->
                    /*<h2 class="section-header">Evolutions: </h2>
                </div>
                <!-- .right-side ends here -->
            </div>
            <!-- .poke-card-body ends here -->
        </div>
        <!-- .poke_card ends here -->
    `;


    poke_container.innerHTML = htmlString + poke_container.innerHTML;

    const cry = document.getElementById("audio")
    const pokeCry = document.getElementById("card-img")

    function play() {
        pokeCry.style.animation = "bounce .5s linear";
        cry.play();
        cry.volume = .5;
    }

    pokeCry.addEventListener('mouseover', play)
    pokeCry.addEventListener('mouseout', stop)


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

SearchElement.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
    poke_container.innerHTML = "";
    tempPoke = pokemon_sel.filter((poke) =>
        poke.name.toLowerCase().includes(value)
    );
    createPokemonCard(tempPoke);

});
SearchElement.addEventListener('submit',()=> { return false})

TypeElement.addEventListener('change', (e) => {
    tempPoke = pokemons
    if (typeSelect.value === e.target.value) {
        poke_container.innerHTML = "";
        tempPoke = tempPoke.filter((type) => type.type.T1 === e.target.value || type.type.T2 === e.target.value);
        createPokemonCard(tempPoke);
    }
    if (e.target.value === "All Types") {
        poke_container.innerHTML = "";
        tempPoke = pokemons
        createPokemonCard(tempPoke);
    }
})

RegionElement.addEventListener('change', function handleChangeRegion (event) {
    TypeElement.addEventListener('change', (e) => {
        tempPoke = pokemon_sel
        if (typeSelect.value === e.target.value && event.target.value !== "All Regions") {
            poke_container.innerHTML = "";
            tempPoke = tempPoke.filter((type) => type.type.T1 === e.target.value || type.type.T2 === e.target.value);
            createPokemonCard(tempPoke);
        }
        if (typeSelect.value === e.target.value && event.target.value === "All Regions") {
            poke_container.innerHTML = "";
            tempPoke = tempPoke.filter((type) => type.type.T1 === e.target.value || type.type.T2 === e.target.value);
            createPokemonCard(tempPoke);
        }

        if (event.target.value === "All Regions") {
            poke_container.innerHTML = "";
            tempPoke = pokemons.filter((type) => type.type.T1 === e.target.value || type.type.T2 === e.target.value);
            createPokemonCard(tempPoke);
        }
        if (event.target.value === "All Regions" && e.target.value === "All Types") {
            poke_container.innerHTML = "";
            tempPoke = pokemons
            createPokemonCard(tempPoke);
        }

        if (e.target.value === "All Types" && event.target.value !== "All Regions") {
            poke_container.innerHTML = "";
            tempPoke = pokemon_sel
            createPokemonCard(tempPoke);
        }
    })
})

function sortPokemons (array, attr){

    if (attr === 'id-asc') {
        tempPoke = array.sort((a, b) => a['id'] - b['id'])
    }
    if (attr === 'id-dsc') {
        tempPoke = array.sort((a, b) => b['id'] - a['id'])
    }
    if (attr === 'name') {
        tempPoke = array.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    }


    poke_container.innerHTML = ""

    createPokemonCard(tempPoke);
}

SortElement.addEventListener('change', () =>{
        sortPokemons(tempPoke, SortElement.value)
})