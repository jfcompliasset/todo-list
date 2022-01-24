let content_field
let enter_hint
let tasks_aria
let body

$(() => {
  body = $('body')
  enter_hint = $('#enter_hint')
  tasks_aria = $('#tasks-aria')
  content_field = $('#task_content')

  content_field.on('keyup', content_field_keyuped)
  body.on('change', '.checkbox input', task_checkbox_changed)
  body.on('click', '.trash a', trash_clicked)

  function content_field_keyuped (e) {
    show_enter_hint()
  }

  function set_task (scope) {
    let task_id = $(scope).data('task-id')
    let task = $(`.task[data-id=${ task_id }]`)
    return task
  }

  function task_checkbox_changed (e) {
    let task = set_task(this)
    let form = task.find('form').get(0)

    task.addClass('block')
    Rails.fire(form, 'submit')
  }

  function trash_clicked () {
    let task = set_task(this)
    task.addClass('block')
  }

  function show_enter_hint (e) {
    let content = content_field.val()
    content.length == 0 ? enter_hint.addClass('hidden') : enter_hint.removeClass('hidden')
  }
})

function clear_tasks_aria () {
  let need_clear = tasks_aria.data('need-clear')
  if (need_clear) {
    tasks_aria.removeAttr('data-need-clear')
              .data({'need-clear': false})
              .html('')
  }
}

function clear_content_field () {
  content_field.val('')
}