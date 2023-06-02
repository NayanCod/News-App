const API_KEY = "505c41593dbf43c788c7a71f36a0b099";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("Trending"));


function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        
        const cardClone = newsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank");
    })
}
let currentSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');

}

const searchButton = document.getElementById('search-button');
const searchInput = document.querySelector('.news-input');
searchButton.addEventListener('click', ()=>{
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})
