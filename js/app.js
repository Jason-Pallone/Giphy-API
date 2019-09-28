const btn = document.querySelector('button');
const gifContainer = document.querySelector('#gif-container');
const errorDiv = document.querySelector('#error-div')
const searchInput = document.querySelector('input');


async function getJSON(url){
  try{  
    const response = await fetch(url);
    return await response.json();
  }catch(error){
      throw error;
  }
}

function generateHTML(json){
  json.data.map((gif) =>{
    const section = document.createElement('section')
    gifContainer.appendChild(section)
    section.innerHTML =
      `<iframe src="${gif.embed_url}">`;
  })
}

function clearContainer(){
  if(gifContainer != null){
    gifContainer.innerHTML= ''
  };
}

btn.addEventListener('click', (event) => {
  event.target.textContent = 'Loading...';
  clearContainer();

  getJSON(`https://api.giphy.com/v1/gifs/search?q=${searchInput.value}&api_key=4tpMFSuczoVjHX6HhhJlcrqILj2uAVGY&limit=24&rating=pg-13`)
    .then(generateHTML)
    .catch( err => {
      errorDiv.innerHTML = "<h3>Something went wrong!</h3>"
      console.error(err);
    })
    .finally(() => event.target.textContent='Get Gifs!');

  searchInput.value = '';
})