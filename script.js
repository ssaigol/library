//Library Array containing all books as objects
const myLibrary = [
    { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, read: "Read"},
    { title: "Wuthering Heights", author: "Emily Brontë", pages: 464, read: "Not Read"}
];

//Book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

//Function that uses constructor to create new book object, and then adds it to Library array
function addBookToLibrary (title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

//Event listener that uses addBookToLibrary function to add new entries from form submit to library array
const submit = document.getElementById("submit-button");
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const newTitle = document.getElementById("title").value;
    const newAuthor = document.getElementById("author").value;
    const newPages = document.getElementById("pages").value;
    const entryRead = document.getElementById("read");
    var newRead;
    if (entryRead.checked) {
        newRead = "Read";
    } else newRead = "Not Read";
    addBookToLibrary (newTitle, newAuthor, newPages, newRead);
    dialog.close();
    //Repopulate table display with new book entry
    displayBooks(myLibrary);
    addListener();
})

//Event listeners for opening and closing modal form
const dialog = document.querySelector("dialog");
const addButton = document.querySelector("#add-book");
const closeDialog = document.querySelector("#close");

addButton.addEventListener("click", () => dialog.showModal());
closeDialog.addEventListener("click", () => dialog.close());


//Iterate through library array and display each book object as new table row in DOM
function displayBooks (arr) {
    //Clear display
    const tbody = document.getElementById("body");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    //Create new table row & cells for each object in array
    arr.forEach((book, index) => {
        //Create row
        const row = document.createElement("tr");
        //Create title table cell, populate, and append to row
        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;
        row.appendChild(titleCell);
        //Create author table cell, populate, and append to row
        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        row.appendChild(authorCell);
        //Create pages table cell, populate, and append to row
        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;
        row.appendChild(pagesCell);
        //Create read table cell, populate, and append to row
        const readCell = document.createElement("td");
        readCell.textContent = book.read;
        row.appendChild(readCell)
        //Create delete table cell, populate with button, and append to row
        const optionsCell = document.createElement("td");
        const options = document.createElement("div");
        options.className = "options";
        const removeButton = document.createElement("button");
        removeButton.className = "delete";
        //Add data attribute to correspond DOM button element with array index
        removeButton.dataset.index = index;
        removeButton.textContent = "Delete";
        options.appendChild(removeButton); 
        //Create button for changing read status if book not read
        if (book.read === "Not Read") {
            const changeRead = document.createElement("button");
            changeRead.className = "change-read";
            changeRead.dataset.index = index;
            changeRead.textContent = "Read";
            options.appendChild(changeRead);
        }
        optionsCell.appendChild(options);
        row.appendChild(optionsCell);
        //Append completed new row to table body
        tbody.appendChild(row);
    });
}

//Populate display with library array upon initial load
displayBooks(myLibrary);

//Add event listener to delete buttons, call on delete function when clicked
function addListener () {
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach( e => {
        e.addEventListener("click", () => {
            const deleteIndex = e.dataset.index;
            deleteBook(deleteIndex);
        })
    })
    const changeReadButtons = document.querySelectorAll(".change-read");
    changeReadButtons.forEach( e => {
        e.addEventListener("click", () => {
            const changeReadIndex = e.dataset.index;
            changeReadStatus(changeReadIndex);
        }) 
    })
}

//Initialize addlistener function on load
addListener();

//Delete book function that is called when delete button clicked
function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
    addListener();
}


//Function to change read status
function changeReadStatus(index) {
    myLibrary[index].read = "Read";
    displayBooks(myLibrary);
    addListener();
}