<script lang="ts">
	// let file=document.querySelector("#files") as HTMLInputElement

	import FileList from '../Fileupload/FIleList.svelte';
	import InputFields from '../inputFileds/+page.svelte';
	import { getContext } from 'svelte';
	let Processed: boolean = getContext('processed-check');
	import { notifications } from '../notification/notification';
	import Toast from '../notification/toast.svelte';
	import { goto } from '$app/navigation';
	// let isfiledata: boolean = false;
	interface LooseObject {
		[key: string]: any;
	}

	let filesdata = [];
	let fileInput: unknown;
	let fileinMB: number;
	let isrefreshpage: boolean;
	// let filesize: number;

	function Tostnotification(message: string) {
		notifications.info(message, 4000);
	}

	function dragoverfun(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		console.log('dragover');
	}
	function filedrop(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		console.log(event);
	}
	function filedragleave(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		console.log('dragleave');
	}
	function dragendfun(event: Event) {
		event.stopPropagation();
		event.preventDefault();
		console.log('dragend');
	}

	function toggleDivcss() {
		let inpufilesdiv: HTMLDivElement = document.getElementById('inputfiles') as HTMLDivElement;
		let displayfilesdiv: HTMLDivElement = document.getElementById('displayfiles') as HTMLDivElement;
		displayfilesdiv.classList.toggle('hidden');
		inpufilesdiv.classList.toggle('mx-auto');
	}

	function getFiles() {
		filesdata = [];
		fileInput = fileInput;

		filesdata = fileInput.files;

		console.log(fileInput.files);
		console.log('get files');
		console.log(filesdata);
		let TotalFileSizeBytes: number = 0;
		for (let i: number = 0; i < filesdata?.length; i++) {
			TotalFileSizeBytes += filesdata[i].size;
		}
		let fileInKb: number = TotalFileSizeBytes / 1000;
		fileinMB = fileInKb / 1000;
		if (fileinMB > 4) {
			filesdata = [];
			fileInput.value = '';
			Tostnotification('File size must be less than 4MB');
			return false;
		}
		if (fileInput?.files.length > 0) {
			toggleDivcss();
		}
	}

	function submitdata() {
		Processed = true;
	}
	function getback(event: Event) {
		Processed = event.detail;
		console.log('hyyyy');
		// alert(event.detail)
	}

	function refreshpage(event: Event) {
		if (event.detail == true) {
			isrefreshpage = event.detail;
			console.log('refreshpahe');
			setTimeout(() => {
				toggleDivcss();

				filesdata = [];
				fileInput.value = '';
				Tostnotification('file uploaded');
			}, 3000);
		}
	}
</script>

<main class="  w-full transition-all duration-[2s]">
	<div class="w-[90%] mx-auto flex gap-7 transition-all duration-[2s] max-[640px]:flex-col">
		<!-- mx-auto was removed i have to put it back after styling -->
		<div
			class="w-[50%] relative flex items-center min-[550px] h-full mx-auto transition-all duration-[2s] max-[640px]:w-full"
			id="inputfiles"
		>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="h-[20rem] w-[100%] flex items-center justify-center flex-col border-dashed border-2 rounded-md hover:border-indigo-500/50"
				draggable="true"
				on:dragleave={filedragleave}
				on:dragover={dragoverfun}
				on:drop={filedrop}
				on:dragend={dragendfun}
			>
				<p>Drag and Drop Files</p>
				<form action="" id="form">
					<label for="files" class=" max-[500px]:bg-orange-300 bg-gray-600">
						click to select document
						<input
							class="hidden"
							on:change={getFiles}
							bind:this={fileInput}
							type="file"
							id="files"
							name="files"
							multiple
						/>
					</label>
				</form>
			</div>
		</div>
		<div
			class=" max-[640px]:w-full max-[640px]:max-h-[400px] overflow-y-auto hidden relative w-[50%] my-1 border-solid border-2 rounded-xl sm:h-[20rem] p-10 transition-all duration-[2s]"
			id="displayfiles"
		>
			<!-- svelte-ignore missing-declaration -->
			{#if filesdata.length > 0}
				{#if Processed == false}
					{#each filesdata as filesdata}
						<FileList filedata={filesdata} />
					{/each}
				{:else if Processed == true}
					<InputFields on:back={getback} on:refreshpage={refreshpage} filedata={filesdata} />
				{/if}
			{/if}
		</div>
		{#if Processed == false && filesdata?.length > 0}
			<button
				on:click={submitdata}
				class="   mb-2 max-[640px]:w-full bg-gradient-to-r from-[#005C97] to-[#363795] w-44 h-8 rounded-lg"
				>Processed</button
			>
		{/if}
	</div>
</main>
<Toast />
