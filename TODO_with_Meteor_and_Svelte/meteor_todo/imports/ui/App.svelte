<script>
    import Task from './Task.svelte';
    import { TasksCollection } from '../api/TasksCollection';
    import TaskForm from './TaskForm.svelte';

    // Option to filter and hide completed tasks
    let hideCompleted = false;

    const setHideCompleted = value =>  {
        hideCompleted = value;
    }

    const hideCompletedFilter = { isChecked: { $ne: true } };

    $m:tasks = TasksCollection.find(
      hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }
    ).fetch()


    // Incomplete tasks
    let incompleteCount;
    let pendingTasksTitle = '';
    let tasks = [];

    $m: {
        tasks = TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch()

        incompleteCount = TasksCollection.find(hideCompletedFilter).count();

        pendingTasksTitle = `${
                incompleteCount ? `${incompleteCount} Pending Tasks` : 'All Complete!'
        }`;
    }
</script>


<div class="app">
    <header>
        <div class="app-bar">
            <div class="app-header">
                <h1>📝️ Todo List</h1>
                <h2>{pendingTasksTitle}</h2>
            </div>
        </div>
    </header>

    <div class="main">
        <!-- Taskform -->
        <TaskForm />
        
        <!-- Button to hide completed tasks -->
        <div class="filter">
            <button on:click={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
            </button>
        </div>

        <!-- Tasks list -->
        <ul class="tasks">
            {#each tasks as task (task._id)}
                <Task task={task} />
            {/each}
        </ul>
    </div>
</div>
