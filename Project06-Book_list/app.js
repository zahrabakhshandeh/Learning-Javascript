const list = document.querySelector('#book-list');
const container = document.querySelector('.container');
const form = document.querySelector('#book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const id = document.querySelector('#id');

//Add Book
form.addEventListener('submit',add);
// Remove Book
list.addEventListener('click', remove);

// 1. Book Class: Represents a Book
class Book{
	constructor(title, author, id){
		this.title = title;
		this.author = author;
		this.id = id;
	}
}

// 2. UI Class: UI Tasks
class UI{
	static addBookToList(book){
		const row=document.createElement('tr');
		row.innerHTML = `
			<td>${book.title}</td>
          	<td>${book.author}</td>
          	<td>${book.id}</td>
          	<td><a class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
        title.value = "";
        author.value = "";
        id.value = "";
	}
	static showAlert(text, className){
		const div = document.createElement('div');
    	div.className = `alert alert-${className}`;
    	div.appendChild(document.createTextNode(text));
    	container.insertBefore(div, form);
		setTimeout(() => document.querySelector('.alert').remove(), 4000);
	}
	static deleteBook(e) {
		console.log(e.parentElement.parentElement);
	    if(e.classList.contains('delete')) {
	      e.parentElement.parentElement.remove();
	    }
	}
}

// 2. Store Class: LocalStorage Tasks
class Storage {
  static getBooks() {
    let books = localStorage.getItem("books")?
   JSON.parse(localStorage.getItem("books"))
    :[];
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBook(book) {
     let books = localStorage.getItem("books")?
   JSON.parse(localStorage.getItem("books"))
    :[];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    let books = localStorage.getItem("books")?
   JSON.parse(localStorage.getItem("books"))
    :[];

    books.forEach((book, index) => {
      if(book.id === id) {
      	console.log(index);
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Storage.getBooks);

function add(e){
	e.preventDefault();
	if (title.value === "" || author.value === "" || id.value === "") {
		console.log("please fill in all fields!!!");
		UI.showAlert("please fill in all fields!!!","danger");
	}else{
		const book = new Book(title.value,author.value,id.value);
		UI.addBookToList(book);
		Storage.addBook(book);
		console.log("sucsses");
		UI.showAlert("Book Added","success");
	}
}

function remove(e){
  UI.deleteBook(e.target);
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert('Book Removed', 'success');
}