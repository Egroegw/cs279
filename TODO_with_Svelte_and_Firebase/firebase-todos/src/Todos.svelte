<script>
    import TodoItem from './TodoItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    export let uid;

    // Form Text
    let text = '';

    // Query for todos
    const query = db.collection('todos').where('uid', '==', uid).orderBy('created');

    // Subscribe to query
    const todos = collectionData(query, { idField: 'id' }).pipe(startWith([]));
    // This stupid compatability thing required this 'idField' thing to return the IDs...
    // Just spent hours trying to find what was wrong... aaarghghghhg

    // Show the ID
    todos.subscribe(todos => console.log(todos));

    function addTask() {
        db.collection('todos').add({ uid, text, complete: false, created: Date.now() });
        text = '';
    }

    function updateStatus(event) {
        const { id, newStatus } = event.detail;
        // alert("ID: " + id + ", Status: " + newStatus);
        db.collection('todos').doc(id).update({ complete: newStatus });
    }

    function removeItem(event) {
        const { id } = event.detail;
        db.collection('todos').doc(id).delete();
    }
</script>

<style>
    input { display: block }
</style>

<ul class="tasks">
	{#each $todos as todo}
        <TodoItem
            {...todo}
            on:toggle={updateStatus}
            on:remove={removeItem}
        />
        
	{/each}
</ul>


<form class="add-task" on:submit|preventDefault={addTask}>
    <label for="task">Add a task: </label>
    <input type="text" bind:value={text} on:ent placeholder="Enter a task here"/>
    <button type="submit">Add</button>
</form>
