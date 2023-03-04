const addTaskForm = document.getElementById('add-task-form');
const taskList = document.getElementById('task-list');
const resetButton = document.getElementById('reset-button');
const completedCount = document.getElementById('completed-count');
const totalCount = document.getElementById('total-count');
const reward = document.getElementById('reward');
const newQuoteButton = document.querySelector("#new-quote-button");

let tasks = [];
newQuoteButton.addEventListener("click", getQuote);
function updateTasks() {
	taskList.innerHTML = '';
	for (let i = 0; i < tasks.length; i++) {
		const task = tasks[i];
		const li = document.createElement('li');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = task.completed;
		checkbox.addEventListener('change', () => {
			task.completed = checkbox.checked;
			updateTasks();
			updateProgress();
		});
		const span = document.createElement('span');
		span.textContent = task.description;
		if (task.completed) {
			span.classList.add('completed');
		}
		li.appendChild(checkbox);
		li.appendChild(span);
		taskList.appendChild(li);
	}
}

function updateProgress() {
	const completedTasks = tasks.filter(task => task.completed).length;
	completedCount.textContent = completedTasks;
	totalCount.textContent = tasks.length;
	
	// update progress bar
	const progress = completedTasks / tasks.length;
	const progressBar = document.querySelector('.progress-bar-progress');
	progressBar.style.width = progress * 100 + '%';

	if (completedTasks === tasks.length && tasks.length > 0) {
		reward.style.display = 'block';
	}
}


function showReward() {
	reward.style.display = 'none';
	motivationalQuotes.style.display = 'block';
}

addTaskForm.addEventListener('submit', event => {
	event.preventDefault();
	const input = addTaskForm.querySelector('input[type="text"]');
	const description = input.value.trim();
	if (description) {
		tasks.push({
			description,
			completed: false
		});
		input.value = '';
		updateTasks();
		updateProgress();
	}
});
function getQuote() {
    fetch("https://api.quotable.io/random")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        quote.textContent = data.content;
        author.textContent = `— ${data.author}`;
      })
      .catch(function(error) {
        console.error(error);
      });
  }

resetButton.addEventListener('click', () => {
	tasks = [];
	updateTasks();
	updateProgress();
	reward.style.display = 'none';
	motivationalQuotes.style.display = 'none';
});

updateTasks();
updateProgress();

    