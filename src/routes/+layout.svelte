<script lang="ts">
	import '../app.postcss';
	import Navbar from "../components/navbar/+page.svelte"
</script>
<main class="max-w-[1700px] mx-auto min-w-96">
	<Navbar/>

	<slot />
</main>


