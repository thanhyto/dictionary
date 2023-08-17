// Create event listener for form
const searchForm = document.getElementById('searchForm');
let word = '';
const rootPath = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
let wordPath = '';
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const dictionaryContainer = document.getElementById('dictionary-container');
    dictionaryContainer.innerHTML = '';
    let search = document.getElementById('search');
    // Alert if search box is empty
    if(search.value == ''){
        alert("Please enter a word")
    }
    word = search.value;
    wordPath = rootPath + word;
    fetchData(wordPath);
});
let dataDict;
// Function fetchData
function fetchData(url) {
    if(url != ''){
        return fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Fetch error: ', error);
                throw error;
            })
            .then(data => {
                const dictionaryContainer = document.getElementById('dictionary-container');
                data.forEach(entry => {
                    const entryDiv = document.createElement('div');
                    entryDiv.classList.add('dictionary-entry');

                    const wordHeading = document.createElement('h2');
                    wordHeading.textContent = entry.word;

                    const phoneticSpan = document.createElement('span');
                    phoneticSpan.textContent = `Phonetic: ${entry.phonetic}`;

                    const meaningList = document.createElement('ol');
                    entry.meanings.forEach(meaning =>{
                        const meaningItem = document.createElement('li');
                        const partOfSpeech = meaning.partOfSpeech;
                        const definition = meaning.definitions[0].definition;
                        meaningItem.textContent = `${partOfSpeech}: ${definition}`;
                        meaningList.appendChild(meaningItem);

                    });
                    entryDiv.appendChild(wordHeading);
                    entryDiv.appendChild(phoneticSpan);
                    entryDiv.appendChild(meaningList);

                    dictionaryContainer.appendChild(entryDiv);
                });
                
            });
    }
}
