class TasksController < ApplicationController
  before_action :set_task, only: %i[edit update destroy]
  before_action :load_tasks, only: %i[index]

  def index
    @task = Task.new
  end

  def create
    @task = Task.create(task_params)
  end

  def update
    @task.update(task_params)
  end

  def destroy
    @task.update(deleted_at: Time.zone.now)
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def load_tasks
    @tasks = Task.not_deleted.order(done: :asc, created_at: :desc)
  end

  def task_params
    params.require(:task).permit(:content, :done)
  end
end
