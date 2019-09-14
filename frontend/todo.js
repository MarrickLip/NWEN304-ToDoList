// MARRICK LIP 2019

var ERROR_LOG = console.error.bind(console);

// global variable which holds a reference to the to-do item to be deleted; initially null
var performDelete = function(){ console.warn('performDelete', 'null') };
// global variable holding reference to the item being edited
var editTarget = undefined;

const updateTasks = async () => {
	const allTasks = await $.ajax({
		method: 'GET',
		url: '/api/list',
		contentType: 'application/json',
		dataType: 'json'
	});

	const todoList = $('#todo-list');
	const completedList = $('#completed-list');

	todoList.empty();
	completedList.empty();

	for (let task of allTasks) {
		let taskHTML = '<li><span class="done">%</span>';
		taskHTML += '<span class="delete">x</span>';
		taskHTML += '<span class="edit">e</span>';
		taskHTML += '<span class="task"></span></li>';

		const $newTask = $(taskHTML);
		$newTask.find('.task').text(task.title);

		if (task.completed) {
			completedList.append($newTask)
		} else {
			todoList.append($newTask)
		}
	}
};

$(document).ready(function(e) {
	updateTasks().then(r => console.log(r));
	$('#add-todo').button({
		icons: { primary: "ui-icon-circle-plus" }}).click(
		function() {
			$('#task').val(''); // reset the task name
			$('#new-todo').dialog('open');
		});

	$('#new-todo').dialog({
		modal: true,
		autoOpen: false,
		buttons : {
			"Add task" : function () {
				var taskName = $('#task').val();
				if (taskName === '') { return false; }

				$.ajax({
					method: 'POST',
					url: '/api/list',
					data: JSON.stringify({
						title: taskName,
						completed: false,
					}),
					contentType: 'application/json',
					dataType: 'json'
				}).then(() => $(this).dialog('close'), ERROR_LOG);
			},
			"Cancel" : function () {
				$(this).dialog('close');
			}
		}
	});

	$('#todo-list').on('click', '.done', function() {
		var $taskItem = $(this).parent('li');
		$taskItem.slideUp(250, function() {
			var $this = $(this);
			$this.detach();
			$('#completed-list').prepend($this);
			$this.slideDown();
		});
	});

	$('.sortlist').sortable({
		connectWith : '.sortlist',
		cursor : 'pointer',
		placeholder : 'ui-state-highlight',
		cancel : '.delete,.done'
	});

	$('.sortlist').on('click','.delete', function() {
		// global variable which only gets used if applicable;
		performDelete = () => {
			console.log('performDelete', this);
			$(this).parent('li').effect('puff', () => {
				$(this).remove();
			});
		};

		$('#confirm-delete').dialog('open');

	});

	// Implement delete confirmation
	$('#confirm-delete').dialog({
		modal: true,
		autoOpen: false,
		buttons : {
			"Yes" : function () {
				performDelete();
				$(this).dialog('close');
			},
			"Cancel" : function () {
				$(this).dialog('close');
			}
		}
	});

	// implement editing
	$('.sortlist').on('click','.edit', function() {
		editTarget = $(this).parent('li').find('.task');
		$('#task-edit').val(editTarget.text()); // set the dialog's default text to the current value
		$('#edit-todo').dialog('open');
	});

	//
	$('#edit-todo').dialog({
		modal: true,
		autoOpen: false,
		buttons : {
			"Done": function() {
				var taskName = $('#task-edit').val();
				if (taskName === '') { return false; }
				editTarget.text(taskName);
				$(this).dialog('close');
			},
			"Cancel" : function () {
				$(this).dialog('close');
			}
		}
	});

}); // end ready