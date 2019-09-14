// MARRICK LIP 2019

var ERROR_LOG = console.error.bind(console);

// global variable which holds a reference to the to-do item to be deleted; initially null
var performDelete = function(){ console.warn('performDelete', 'null') };
// global variable holding reference to the item being edited
var editTarget = undefined;

$(document).ready(function(e) {
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

				// var ERROR_LOG = console.error.bind(console); $.Ajax({
				// 	NOTE:
				// 	method: 'POST',
				// 	url: 'http://localhost:8080/my_post_function/', data: JSON.stringify({
				// 	task: task.find('.task').html() }),
				// 	contentType: "application/json",
				// 	dataType: "json" }).then(my_next_function, ERROR_LOG)
				console.log($);
				$.ajax({
					method: 'POST',
					url: '/api/list',
					data: JSON.stringify({
						title: taskName,
						completed: false,
					}),
					contentType: 'application/json',
					dataType: 'json'
				}).then((resp) => console.log(resp), ERROR_LOG);

				let taskHTML = '<li><span class="done">%</span>';
				taskHTML += '<span class="delete">x</span>';
				taskHTML += '<span class="edit">e</span>';
				taskHTML += '<span class="task"></span></li>';
				var $newTask = $(taskHTML);

				$newTask.find('.task').text(taskName);
				$newTask.hide();
				$('#todo-list').prepend($newTask);
				$newTask.show('clip',250).effect('highlight',1000);
				$(this).dialog('close');
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