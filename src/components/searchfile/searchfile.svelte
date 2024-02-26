<script lang="ts">
	export let responsedata;
	let close: boolean = false;
	let password: string;
	// import { goto } from '$app/navigation';

	function downloadfile(e: Event): void {
		e.stopPropagation();

		close = true;
	}
	// uXnFaH
	function closePopupbox(e: Event): void {
		e.preventDefault();
		e.stopPropagation();
		password = ""

		close = false;
		console.log('close');
	}
	function downloadlink(e: Event): void {
		e.preventDefault();
		e.stopPropagation();
		console.log(password);
		if (!(responsedata.FilePassword == password)) {
			alert('password wrong');
			return false;
		}
		// goto(responsedata.FileUrl)
		window.location.assign(responsedata.FileUrl);
	}
	function outerdiv(e: Event): void {
		e.preventDefault();
		e.stopPropagation();
		console.log('outer div button');
		password = ""
		close = false;
	}
	function innerdiv(e: Event): void {
		e.stopPropagation();
		e.preventDefault();
		console.log('inner div');
	}
</script>

<main>
	{#if close == true}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={outerdiv}
			tabindex="1"
			role="button"
			aria-pressed="false"
			class=" min-w-[400px] z-10 absolute top-0 left-0 bg-transparent w-[100%] h-[100%]"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-interactive-supports-focus -->
			<div
				on:click={innerdiv}
				role="button"
				class=" taransparent gap-2 w-[400px] relative top-[25%] h-[200px] mx-auto flex flex-col items-center justify-center"
			>
				<!-- svelte-ignore a11y-positive-tabindex -->
				<div
					on:click={closePopupbox}
					tabindex="2"
					role="button"
					aria-pressed="false"
					class="z-9 top-0 absolute right-5 text-4xl cursor-pointer"
				>
					x
				</div>
				<form action="">
					<label for="password">Password</label>
					<input
						bind:value={password}
						autocomplete="off"
						class="rounded-md ring-blue-300 focus:ring-blue-500 focus:border-blue-500 border-blue-400 bg-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="password"
					/>
				</form>

				<button on:click={downloadlink} class="w-[90px] bg-cyan-500 rounded-md py-0"
					>Download</button
				>
			</div>
		</div>
	{/if}

	<div class="flex gap-4 items-center border-1 border-solid border-gray-400">
		<div class="w-[50px] h-[50px] shrink-0">
			<!-- <img src="../../../static/file-zip-icon-6848.png" alt="" /> -->
			<i class="fa-solid fa-file-zipper text-4xl text-yellow-600"></i>
		</div>
		<p>{responsedata?.FileName ? responsedata.FileName : responsedata.FileUnqueId}</p>
		<!-- svelte-ignore a11y-interactive-supports-focus -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<button
			on:click={downloadfile}
			aria-pressed="false"
			class="w-24 h-6 bg-sky-600 text-center rounded-sm shrink-0">download</button
		>
	</div>
</main>

<style>
	.taransparent {
		border: 1px solid rgba(255, 255, 255, 0.147);
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.193);
		box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

		backdrop-filter: blur(15px);
	}
</style>
