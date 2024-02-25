<script>
	import { goto } from '$app/navigation';
	function searchfile() {
		goto('http://localhost:5173/search');
	}
</script>

<main data-theme="sahara">
	<div class="w-full h-[70px]">
		<!-- http://localhost:5173/search -->

		<div class="w-[90%] h-full flex items-center justify-end gap-7">
			<li class="list-none">login</li>
			<li class="list-none">signUp</li>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li  class="list-none cursor-pointer" on:click={searchfile}>searchFile</li>
		</div>
	</div>
</main>
