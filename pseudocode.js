//myLibrary array
    //array contains Book objects, each containing 4 properties (title, author, pages, read status)

//Book function that creates new Book objects with provided inputs (convert to class from constructor)

//addBookToLibrary function that calls on Book function to create Book objects, and pushes those objects to my Library array

//Display function
    //DOM queries for all interactable/dynamic elements on page
        //Add book button (opens dialog form)
        //All form inputs (title, author, pages, read, not read)
        //Submit button => takes form inputs and feeds them as parameters for addBookToLibrary function
        //Close button => closes dialog without submitting
        //Dialog itself => manipulate when opened/closed
        //table body => table element on which myLibrary array will be displayed, using render function
    //Event listeners
        //Add book button => open dialog
        //Close button => closes dialog without submitting
        //Submit button => takes 4 value from dialog form inputs and feeds to addBookToLibrary function
    //render function => manipulate DOM to display myLibrary array as table on page
        //Iterate through myLibrary array and for each Book object:
            //Create new row element
            //Create 5 table cells elements & append each to new row element
            //Populate first 4 new cells with Book object 4 properties (title, author, pages, read/not read)
            //On fifth cell, add Delete button, and Read button only on books whose read status is Not Read
            //Add classes to delete and read buttons that correspond to equivalent index of Book object in myLibrary array
            //Add event listeners to delete and Read buttons:
                //delete button should call on a delete function that deletes that entire Book object from array, and re renders display
                //Read button should change read status on that specific book to Read, and re render display
            //Append new row to table
            //MAKE SURE WHEN TABLE RENDERS THAT ONLY NEW ADDITIONS ARE ADDED TO TABLE, DONT RE-ADD PRE-EXISTING ONES
            //Render function should be called in 3 instances:
                //When a book is added using dialog
                //When a book is deleted using delete button
                //When a book's Read status is changed using Read button
    //deleteBook function => called as handler on event listener on delete buttons
    //changeReadStatus function => called as handler on event listener on change read status buttons
            
