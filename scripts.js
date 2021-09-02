// showErrorText function declaration 
const showErrorText = (err = 'Sorry! No results found.') => {
    const errorMessage = document.getElementById('search-result-field');
    errorMessage.innerHTML = `
    <h3 class="text-danger">${err}</h3>
    <div class="container w-25">
        <img class="img-fluid" src="images/no-result-found.svg" alt="">
    </div>
    `

}

// toggle spinner function declaration 
const spinnerToggle = spinnerStyle => {
    document.getElementById('spinner').style.display = spinnerStyle;
}
// loadBooks function declaration
const loadBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.trim();

    // spinnerToggle function call 
    spinnerToggle('block', 'none');
    document.getElementById('books-container').classList.add('d-none');

    // clear search field 
    searchField.value = '';
    if (searchText === '') {
        showErrorText('Please search a book name.')
        spinnerToggle('none');

    }
    else {
        fetch(`http://openlibrary.org/search.json?q=${searchText}`)
            .then(response => response.json())
            .then(data => displayBooks(data));
    }

}


// displayBooks function declaration 
const displayBooks = data => {
    const books = data.docs;
    const booksContainer = document.getElementById('books-container');


    // clear previous search results 
    booksContainer.textContent = '';

    // show the number of total book result 
    const searchResultMessage = document.getElementById('search-result-field');
    searchResultMessage.textContent = '';
    const p = document.createElement('p');
    p.innerText = `About ${data.numFound} books found`;
    searchResultMessage.appendChild(p);
    if (books.length === 0) {
        showErrorText();
        spinnerToggle('none');
    }

    else {
        // book display card 
        console.log(books)
        books?.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 text-dark mb-3"">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="img-fluid rounded-start h-100 p-2" alt="Image Not Found">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body container">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">by ${book.author_name ? book.author_name.toString() : ''}</p>
                            <p class="card-text"><small class="text-muted"> publisher: 
                                    ${book.publisher ? book.publisher[0] : ''}</small></p>                      
                            <p class="card-text"><small class="text-muted">First published in  <span class="text-primary">${book.first_publish_year}</span></small></p>

                            <p class="card-text"><small class="text-muted"><span class="text-primary">${book.edition_count}</span> editions in  <span class="text-primary">${book.language ? book.language.length : ''}</span> languages</small></p>
                            <button type="button" class="btn btn-primary btn-lg">Read Book</button>
                            
                        </div>
                    </div>
                </div>
        </div>
        `
            booksContainer.appendChild(div);
        });
        // toggleSpinner function call 
        spinnerToggle('none');
        document.getElementById('books-container').classList.remove('d-none');

    }





}
