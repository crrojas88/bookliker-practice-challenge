
const URL = 'http://localhost:3000/books'
// getBooks fetches all books from db then iterates through all book objects in following function
function getBooks() {
    fetch(URL)
    .then(response => (response.json()))
    .then(allBooks => iterateBooks(allBooks))
}
// iterateBooks loops through allBooks and creates a list element for each book
function iterateBooks(allBooks) {
    for (book of allBooks) {
        createBookList(book)
    }
}
    // createBookList creates elements for book list sidebar.
function createBookList(book) {

    // grab div and ul parent elements to append list items for each book
    const divList = document.getElementById('list-panel')
    const bookUl = document.getElementById('list')
   
    // create list item for each book title
    const bookLi = document.createElement('li')
    bookLi.innerText = book.title
    // add an event listener for each click that loads show panel
    bookLi.addEventListener("click", () => {
        // grab show panel to eventually blank out in following line.
        const oldShow = document.getElementById('show-panel')
        // empty out show panel before loading a new book 
        oldShow.innerText = ""
        // load book panel
        showBookPanel(book)
    })
   
    // append elements to parents
    bookUl.appendChild(bookLi)
    divList.appendChild(bookUl)

}
// showBookPanel creates a show panel for each book object with a corresponding element and book key
function showBookPanel(book) {
    // grab show panel to later append child elements.
    const bookShow = document.getElementById('show-panel')
    // create elements and add corresponding values from book obj.
    const bookImg = document.createElement('img')
    bookImg.src = book.img_url
    
    const header1 = document.createElement('h2')
    header1.innerText = book.title
    
    const header2 = document.createElement('h2')
    header2.innerText = book.subtitle
    
    const header3 = document.createElement('h2')
    header3.innerText = book.author
    
    const bookP = document.createElement('p')
    bookP.innerText = book.description
    // create a parent ul to hold users that like book
    const likeList = document.createElement('ul')
    // loop through book.users for each user
    for(user of book.users) {    
        // create a new li for each user
        const likeLi = document.createElement('li')
        // fill inner text of each li with username of each user
        likeLi.innerText = user.username
        // append li to parent
        likeList.appendChild(likeLi)
    }
    // create like button element
    const bookLike = document.createElement('button')
    bookLike.innerText = "LIKE"
    // add an event listener for a click that calls on addLike function
    bookLike.addEventListener("click", () => addLike(book))
    // append all elements to show panel
    bookShow.append(bookImg, header1, header2, header3, bookP, likeList, bookLike)    
}
// addLike takes a book object and updates the users with a given user
function addLike(book) {
    // push new user object into array of users when this function is invoked in event listener
    const newUser = book.users.push({"id":1, "username":"pouros"})

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            users: book.users
        })
    }
    fetch(URL + `/${book.id}`, configObj)
    .then(response => response.json())
    .then(book => {
        // clear the show panel before rendering edited page with new like user 
        const oldShow = document.getElementById('show-panel')
        oldShow.innerText = ""
        showBookPanel(book)
    })
}

getBooks()