<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function remove() {
        dispatch("remove", { id });
    }

    function toggleStatus() {
        let newStatus = !complete;
        // alert("DEBUG: ID: " + id + ", Status: " + newStatus);

        dispatch("toggle", {
            id,
            newStatus,
        });
    }

    // Public vars
    export let id; // Task (Firebase) ID
    export let text;
    export let created;
    export let complete;

    // Nicely format the time
    const nicetime = "Created at: " + new Date(created).toLocaleString();
</script>

<li>
    {#if complete}
        <span class="is-complete">{text}</span>
        <span class="time is-complete">{nicetime}</span>
        <button on:click={toggleStatus}> ❌ </button>
    {:else}
        <span>{text}</span>
        <span class="time">{nicetime}</span>
        <button on:click={toggleStatus}> ✅ </button>
    {/if}

    <button on:click={remove}> 🗑️ </button>
</li>
