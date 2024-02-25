<script>
	export let responsedata;
</script>

<main>
	<div class="flex gap-4 items-center border-1 border-solid border-gray-400">
		<div class="w-[50px] h-[50px] shrink-0">
			<!-- <img src="../../../static/file-zip-icon-6848.png" alt="" /> -->
			<i class="fa-solid fa-file-zipper text-4xl text-yellow-600"></i>
		</div>
		<p>{responsedata?.FileName ? responsedata.FileName : responsedata.FileUnqueId}</p>
		<a
			href={responsedata.FileUrl}
			target="_blank"
			class="w-24 h-6 bg-sky-600 text-center rounded-sm shrink-0">download</a
		>
	</div>
</main>
