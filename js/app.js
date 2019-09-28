const gifList = document.querySelector('#gif-container');
const btn = document.querySelector('button');
const gifSearchInput = document.querySelector('input');




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
      gifList.appendChild(section)
      section.innerHTML =
        `<iframe src="${gif.embed_url}">`;
  })
}


btn.addEventListener('click', (event) => {
    event.target.textContent = 'Loading...'

    if(gifList != null){
        gifList.innerHTML= ''
    }
  
    getJSON(`https://api.giphy.com/v1/gifs/search?q=${gifSearchInput.value}&api_key=4tpMFSuczoVjHX6HhhJlcrqILj2uAVGY&limit=5`)
      .then(generateHTML)
      .finally(() => event.target.textContent='Get Gifs!')
})