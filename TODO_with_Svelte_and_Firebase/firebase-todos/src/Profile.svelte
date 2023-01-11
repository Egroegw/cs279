<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<img
    src={photoURL}
    width="100"
    class="avatar"
    alt="user avatar"
    referrerpolicy="no-referrer"
/>

<span id="welcome">Welcome, {displayName}!</span>
<span class="right">Your userID is: {uid}</span>
