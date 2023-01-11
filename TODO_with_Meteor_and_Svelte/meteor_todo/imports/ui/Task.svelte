<script>
    import { TasksCollection } from '../api/TasksCollection';
  
    export let task;
  
    const toggleChecked = () => {
      // Set the isChecked property to the opposite of its current value
      TasksCollection.update(task._id, {
        $set: { isChecked: !task.isChecked }
      });
    };

    const deleteTask = () => {
        TasksCollection.remove(task._id);
    };
</script>

<!-- Each task -->
<li>
    <!-- Checkbox -->
    <input
        type="checkbox"
        readonly
        checked={task.isChecked}
        on:click={toggleChecked}
    />

    <!-- Task contents -->
    <span>{ task.text }</span>

    <!-- Delete button -->
    <button class="delete" on:click={deleteTask}>DELETE</button>
</li>
