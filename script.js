const myLibrary = (function () {
    const library = [
        { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, readstatus: "Read"},
        { title: "Wuthering Heights", author: "Emily Brontë", pages: 464, readstatus: "Not Read"}
    ];

    class Book {
        constructor(title, author, pages, readstatus) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.readstatus = readstatus;
        }
    };

    const addToLibrary = (title, author, pages, readstatus) => {
        const newBook = new Book(title, author, pages, readstatus);
        library.push(newBook);
        display.render();
    };

    const getLibraryArr = () => {
        const arr = library;
        return arr;
    }

    const deleteBookObj = (index) => {
        library.splice(index, 1);
    };

    const changeBookObjReadStatus = (index) => {
        library[index].readstatus = "Read";
    };


    return {addToLibrary, getLibraryArr, deleteBookObj, changeBookObjReadStatus};
})();


const display = (function () {
    //DOM Queries
    const addBookButton = document.getElementById("add-book");
    const newTitle = document.getElementById("title");
    const newAuthor = document.getElementById("author");
    const newPages = document.getElementById("pages");
    const newRead = document.getElementById("read");
    const newNotRead = document.getElementById("not-read");
    const submitBook = document.getElementById("submit-button");
    const closeDialog = document.getElementById("close");
    const dialog = document.getElementById("dialog");
    const tableBody = document.getElementById("body");




    //Display library array as table DOM element
    const render = () => {
        //Clear table before rendering to prevent duplicates
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        };
        myLibrary.getLibraryArr().forEach((book, index) => {
            //Create row
            const row = document.createElement("tr");
            //Create title cell & populate with Book obj title property
            const titleCell = document.createElement("td");
            titleCell.textContent = book.title;
            //Create author cell & populate w/ Book obj author property
            const authorCell = document.createElement("td");
            authorCell.textContent = book.author;
            //Create pages cell & populate w/ Book obj pages property
            const pagesCell = document.createElement("td");
            pagesCell.textContent = book.pages;
            //Create read cell & populate w/ Book obj readstatus property
            const readCell = document.createElement("td");
            readCell.textContent = book.readstatus;
            //Create options cell & populate w/ div containing delete and Read buttons (for Not Read books only)
            const optionsCell = document.createElement("td");
            const optionsButtons = document.createElement("div");
            optionsButtons.classList.add("options");
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.dataset.index = index;
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", deleteBook);
            optionsButtons.append(deleteButton);
            if (book.readstatus === "Not Read") {
                const readButton = document.createElement("button");
                readButton.textContent = "Read";
                readButton.classList.add("change-read");
                readButton.dataset.index = index;
                readButton.addEventListener("click", changeReadStatus);
                optionsButtons.append(readButton);
            }
            optionsCell.append(optionsButtons);
            //Append 5 new cells to row, append row to table
            row.append(titleCell, authorCell, pagesCell, readCell, optionsCell);
            tableBody.append(row);
        });
    };

    const deleteBook = (e) => {
        myLibrary.deleteBookObj(e.target.dataset.index);
        render();
    };

    const changeReadStatus = (e) => {
        myLibrary.changeBookObjReadStatus(e.target.dataset.index);
        render();
    }

    //Event listeners
    addBookButton.addEventListener("click", () => dialog.showModal());
    closeDialog.addEventListener("click", () => dialog.close());
    submitBook.addEventListener("click", () => {
        const title = newTitle.value;
        const author = newAuthor.value;
        const pages = newPages.value;
        let read;
        if (newRead.checked) {
            read = "Read";
        } else read = "Not Read";
        myLibrary.addToLibrary(title, author, pages, read);
    });
    window.addEventListener("load", render);

    return {render};
})();