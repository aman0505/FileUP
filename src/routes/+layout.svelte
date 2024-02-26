<script lang="ts">
	import '../app.postcss';
	import Navbar from "../components/navbar/+page.svelte"
</script>
<main class="max-w-[1700px] mx-auto min-w-[400px]">
	<Navbar/>

	<slot />
</main>


