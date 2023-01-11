<script>
    import Profile from "./Profile.svelte";
    import Todos from "./Todos.svelte";

    import { auth, googleProvider } from "./firebase";
    import { authState } from "rxfire/auth";

    let user;

    // No option to unsubscribe lol
    const unsubscribe = authState(auth).subscribe((u) => (user = u));

    // Login with Google provider
    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<section>
    {#if user}
        <!-- If already signed in, show user info -->
        <div id="usercard">
            <Profile {...user} />
            <button on:click={() => auth.signOut()}>Logout</button>
        </div>
        <hr />
        <Todos uid={user.uid} />
    {:else}
        <!-- Otherwise, prompt for signin -->
        <h1>Please sign in to continue</h1>
        <button on:click={login}> Sign in with Google </button>
    {/if}
</section>
