{
	let tasks = [];
	let hideDoneTasks = false;

	const addNewTask = (newTaskContent) => {
		tasks = [
			...tasks,
			{ content: newTaskContent },
		];
		render();
	};

	const removeTask = (index) => {
		tasks = [
			...tasks.slice(0, index),
			...tasks.slice(index + 1),
		];

		render();
	}

	const toggleTaskDone = (taskIndex) => {
		tasks = [
			...tasks.slice(0, taskIndex),
			{ ...tasks[taskIndex], done: !tasks[taskIndex].done },
			...tasks.slice(taskIndex + 1)
		];

		render();
	}

	const toggleHideDoneTask = () => {
		hideDoneTasks = !hideDoneTasks;

		render();
	};



	const markAllTasksDone = () => {
		tasks = tasks.map((tasks) => ({
			...tasks,
			done: true,
		}));

		render();
	}

	const bindEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});


		const toggleDoneButton = document.querySelectorAll(".js-done");

		toggleDoneButton.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	}

	const renderTasks = () => {
		let tasksListHTMLContent = "";

		for (const task of tasks) {
			tasksListHTMLContent += `
      			<li
      			class="list__item ${hideDoneTasks && task.done ? "list__item--hide" : ""} ">
         		 <button class="list__button list__button--green js-done">
          		${task.done ? " ✔ " : ""}
          		</button>
          		<p class=" ${task.done ? " list__item--done " : ""}">
          		${task.content}
          		</p>
          		<button class="list__button list__button--red js-remove">
          		🗑️
          		</button>
     			 </li>
      			`
		}

		document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
	};

	const renderButtons = () => {
		const listButtons = document.querySelector(".js-buttons")

		if (!tasks.length) {
			listButtons.innerHTML = "";

			return;
		}

		listButtons.innerHTML = `
   			<button class = "section__button js-toggleHideDoneTask" ${tasks.some(({ done }) => done) ? "" : "disabled"}>
  			 ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
   			</button>
   			<button class = "section__button js-markAllTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
   			Ukończ wszystkie
   			</button>
   			`;

	};

	const bindButtonsEvents = () => {
		const toggleHideDoneTaskButton = document.querySelector(".js-toggleHideDoneTask");
		if (toggleHideDoneTaskButton) {
			toggleHideDoneTaskButton.addEventListener("click", () => {
				toggleHideDoneTask();
			});
		};

		const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDone");
		if (markAllTasksDoneButton) {
			markAllTasksDoneButton.addEventListener("click", () => {
				markAllTasksDone();
			});
		};
	};

	const render = () => {

		renderTasks();
		renderButtons();
		bindEvents();
		bindButtonsEvents();
	}

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newTaskElement = document.querySelector(".js-newTask");
		const newTaskContent = newTaskElement.value.trim();

		if (newTaskContent === "") {
			return;
		}

		newTaskElement.value = "";
		newTaskElement.focus();

		addNewTask(newTaskContent);
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}