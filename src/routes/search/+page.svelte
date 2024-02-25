<script lang="ts">
	import Axios from 'axios';
	let searchdata: string;
	type responsearray = [
		{
			FileCreatedDate: string;
			FileName?: string;
			FilePassword: string;
			FileUnqueId: string;
			FileUrl: string;
			UserID: string;
			_id: string;
		}
	];
	let responsedata: responsearray;
import Searchfile from '../../components/searchfile/searchfile.svelte';
	async function searchfile() {
		console.log(searchdata);
		try {
			if (searchdata == '' || searchdata == undefined || searchdata == ' ') {
				alert('Enter fileKey');
				return false;
			}
			let url2='https://fileupload.cyclic.app/searchSingleFile'
			let url: string = '//localhost:8020/searchSingleFile';
			const response = await Axios.post(url2, {
				FileID: searchdata?.trim()
			});
			if (response.status == 200) {
				console.log(response);
				responsedata = response.data;
			}
		} catch (error) {
			console.log(error);
			alert(error.response?.data.error);
			// console.log();
		}
	}
</script>
<!-- b_4Fn -->
<main class="my-5">
	<div class="w-[50%] h-10 mx-auto flex gap-1">
		<input
			bind:value={searchdata}
			placeholder="Enter your FileUnique key"
			class="w-[90%] block rounded-md focus:ring-blue-500 focus:border-blue-500 bg-transparent dark:border-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			type="text"
			name="search"
			id="search"
		/>
		<button on:click={searchfile} class="w-[70px] shrink-0 bg-cyan-800">Search</button>
	</div>

	<div class="w-[50%] mx-auto my-5 flex flex-col gap-3">
		{#if responsedata?.length > 0}
			{#each responsedata as responsedata}
				<Searchfile responsedata={responsedata}/>
			{/each}
		{/if}
	</div>
</main>
