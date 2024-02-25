<script lang="ts">
	export let filedata: unknown;

	// $: d = filedata;
	// console.log(d);
	console.log('fileList component');

	$:filesize = filedata.size / 1000 / 1000;
	const fileFormate: String = filedata.name.split('.').pop();

	console.log(filedata);
</script>

<main>
	<div class="flex justify-start gap-4 my-2 items-center">
		<div class=" w-10 flex justify-center items-center shrink-0">
			{#if fileFormate == 'png' || fileFormate == 'jpeg' || fileFormate == 'jpg'}
				<i class=" fa-solid fa-image text-5xl text-left"></i>
			{:else if fileFormate == 'pdf'}
				<i class=" text-5xl fa-solid fa-file-pdf"></i>
			{:else if fileFormate == 'zip'}
				<i class=" text-5xl fa-regular fa-file-zipper"></i>
			{:else}
				<i class="text-5xl fa-solid fa-file"></i>
			{/if}
		</div>
		<p class="max-[1000px]:text-sm">{filedata.name}</p>
		<p>{filesize.toFixed(3) == 0.0 ? 'Bytes' : filesize.toFixed(3) + 'MB'}</p>
	</div>
</main>
