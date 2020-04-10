// Calculate values to display on timer
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    total: t,
    minutes: minutes,
    seconds: seconds,
  };
}

// Set up clock and begin timer
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);

  document.getElementById('stop').addEventListener('click', () => {
    clearInterval(timeinterval);
    document.getElementById('start').disabled = false;
  });
}

function startTimer() {
  var d = new Date();
  document.getElementById('start').disabled = true;
  d.setMinutes(d.getMinutes() + 25);
  initializeClock('clockDiv', d);
}

// ------------------------------------------------

// Todo
function addTask() {
  var input = document.getElementById('enter-task');
  var inputValue = input.value;
  if (input.value == '') {
    return;
  }
  input.value = '';

  var task = document.createElement('li');
  taskText = document.createTextNode(inputValue);
  task.appendChild(taskText);

  var btnDelete = document.createElement('button');
  btnDelete.onclick = () => {
    task.parentNode.removeChild(task);
  };

  task.className =
    'list-group-item d-flex justify-content-between align-items-center group-item';
  btnDelete.innerText = 'X';
  btnDelete.className = 'btn btn-delete';

  task.appendChild(btnDelete);
  document.getElementById('tasks').appendChild(task);
}

var taskInput = document.getElementById('enter-task');
taskInput.addEventListener('keydown', (e) => {
  if (event.keyCode === 13) {
    e.preventDefault();
    addTask();
  }
});
