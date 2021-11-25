const container = document.getElementById('card-container');
// button function
const loadBooks = () => {
    document.getElementById('failed-message').style.display = 'none';
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    container.textContent = '';
    //checking weather the search Field is empty or not
    if(searchText.length === 0 ){
        document.getElementById('error-message').style.display = 'block';
         toggleSearchResult('none');
    } 
    else {
        // fetching url for getting data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => DisplayBooks(data.docs, data.numFound));
            toggleSpinner('block');
            toggleSearchResult('none');
            document.getElementById('error-message').style.display = 'none';
    }
}
// displaying spinner
const toggleSpinner = displaySpinner => {
    document.getElementById('Loading').style.display = displaySpinner;
}
// displaying search result
const toggleSearchResult = (displayStyle) => {
document.getElementById('display-numbers').style.display = displayStyle;
}
// Displaying Books
const DisplayBooks =(books, numFound)   => {
    let bookCover = '';
    let AuthorName = '';
    let firstPublishYear = '';
  let publisherName = '';
  const searchNumbers = document.getElementById('display-numbers');
searchNumbers.textContent = '';
// showing numbers of books
  searchNumbers.innerText = `Total Items Found ${numFound}`;
//   checking if any book doesnt found
  if(numFound === 0){
    document.getElementById('failed-message').style.display = 'block';
    toggleSpinner('none');
  }
  else {
    const container = document.getElementById('card-container');
    container.innerText = '';
    books.forEach(book => {
        // checking if there is any book publisher
   if(book.publisher !== undefined){
    publisherName = book.publisher;
   }   // checking publishing year
        if(book.first_publish_year !== undefined){
            firstPublishYear = book.first_publish_year;
        }
    //  checking author name
        if(book.author_name !== undefined){
            AuthorName = book.author_name ;
        }
        // checking bookcover
        if(book.cover_i === undefined){
            bookCover = "img/bookCover.jpg";
        }
        else {
           bookCover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }
            // creating element
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
            <div class="card h-100 shadow">
            <img src=${bookCover} class="card-img-top w-50 mx-auto mt-5" alt="Book image">
            <div class="card-body">
            <h5 class="card-title fw-bolder fs-4 text-dark">${book.title}</h5>
            <hr class="container">
            <p class="block fw-bolder"> <strong>Author:</strong> ${AuthorName} </p> 
            <p class="block fw-bolder"><strong> Publisher(s): </strong> ${publisherName} </p> 
            <p class="card-text fw-bolder"><strong> Published year:</strong>  ${firstPublishYear}</p>
             </div>
            </div>
        `;
        // adding to container
        container.appendChild(newDiv);
    });
    document.getElementById('error-message').style.display = 'none'
    toggleSpinner('none');
    toggleSearchResult('block')
   
  }
}
