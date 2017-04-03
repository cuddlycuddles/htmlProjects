"use strict";

// elements
var input = document.getElementById('input');
var list = document.getElementById('list');
// functions
var todos = [];

function addTodo(e) {
	if (e.which === 13 && e.target.value) { // enter was pressed and input is not empty
		todos.push({ // add todo
			todo: input.value.trim(),
			completed: false
		});
		input.value = ''; // clear input
		displayTodos();
	}
}

// function to see if click event was button and respond accordingly
function buttonClick(e) {
	var targetName = e.target.nodeName.toLowerCase();
	var listItem = e.target;
	if (targetName === 'span' || targetName === 'button') { // if a button was clicked
		var todoItem;
		if (listItem.parentNode.nodeName.toLowerCase() === 'button') { // traverse DOM to compare buttons
			listItem = listItem.parentNode;
		}

		todoItem = listItem.parentNode.getAttribute('id'); // set todoItem to list item's id

		if (listItem.getAttribute('class').length === 21) { // if delete button was clicked
			todos.splice(todoItem, 1);
		} else {
			todos[todoItem].completed = !todos[todoItem].completed;
		}

		displayTodos();
	}
}

function displayTodos() {
	list.innerHTML = ''; // clear list

	for (var i = 0; i < todos.length; i++) { // loop to insert todo list items into list
		// create elements
		var listItem = document.createElement('li');
		var completedButton = document.createElement('button');
		var deleteButton = document.createElement('button');
		var completedIcon = document.createElement('span');
		var deleteIcon = document.createElement('span');
		var textWrapper = document.createElement('span');
		var todoText = todos[i].todo; // retrieve todo text value

		textWrapper.textContent = todoText; // add wrapper around text

		listItem.className = 'list-group-item'; // bootstrap list
		listItem.setAttribute('id', i); // set id of list to the todo it will hold

		completedButton.setAttribute('type', 'button'); // set button type
		completedButton.className = 'btn '; // add bootstrap class name

		deleteButton.setAttribute('type','button'); // set button type
		deleteButton.className = 'btn btn-default right'; // set button background
		deleteIcon.className = 'glyphicon glyphicon-trash'; // set delete icon

		if (todos[i].completed) { // if current todo is completed
			completedButton.className += 'btn-success'; // set button background to green
			completedIcon.className = 'glyphicon glyphicon-ok'; // add tick icon
			textWrapper.className = 'completed' // add text-decoration line-through to text
		} else { // if current todo is not completed
			completedButton.className += 'btn-danger'; // set button background to red
			completedIcon.className = 'glyphicon glyphicon-remove'; // add cross icon
			textWrapper.className = '';
		}

		completedButton.appendChild(completedIcon); // add icon to button
		deleteButton.appendChild(deleteIcon); // add icon to button
		listItem.appendChild(completedButton); // add completed button to list item
		listItem.innerHTML += "&nbsp&nbsp";
		listItem.appendChild(textWrapper); // add text to list item
		listItem.appendChild(deleteButton); // add delete wrapper to list item
		list.appendChild(listItem); // add list item to main list
	}
}

// event listeners
input.addEventListener('keyup', function(e) {
	addTodo(e);
});
list.addEventListener('click', function(e) {
	buttonClick(e);
});
