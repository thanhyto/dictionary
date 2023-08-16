// Create event listener for form
const searchForm = document.getElementById('searchForm');
let word = '';
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let search = document.getElementById('search');
    // Alert if search box is empty
    if(search.value == ''){
        alert("Please enter a word")
    }
    word = search.value;
    console.log(word);
});