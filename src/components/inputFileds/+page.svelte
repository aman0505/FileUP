<script lang="ts">

	import {
		PUBLIC_apiKey,
		PUBLIC_appId,
		PUBLIC_authDomain,
		PUBLIC_firebaseEmail,
		PUBLIC_firebasePassword,
		PUBLIC_messagingSenderId,
		PUBLIC_projectId,
		PUBLIC_storageBucket
	} from '$env/static/public';
	import Axios from 'axios';
	// import { ToastContainer, toast } from 'react-toastify';
	// import 'react-toastify/dist/ReactToastify.css';
	import { notifications } from '../notification/notification';
	import Toast from '../notification/toast.svelte';
	import { initializeApp } from 'firebase/app';
	import { createEventDispatcher } from 'svelte';
	import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
	import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
	import { nanoid } from 'nanoid';

	export let filedata;
	import JSZip from 'jszip';
	const zip = new JSZip();

	let backenable = createEventDispatcher();
	let refresh = createEventDispatcher();
	let inputpassword: String;
	let uploadProgress: number = 0;
	let uploading = false;
	const uniqueid: string = nanoid(5);
	function goback() {
		backenable('back', false);
	}

	function ValiDateFileMb(fileLength: number, filesarray: unknown): number {
		let TotalFileSizeBytes = 0;
		for (let i = 0; i < fileLength; i++) {
			TotalFileSizeBytes += filesarray[i].size;
		}
		let fileInKb = TotalFileSizeBytes / 1000;
		return fileInKb / 1000;
	}

	async function uploadFile() {
		const totlaMb: number = ValiDateFileMb(filedata.length, filedata);

		console.log('uniqueid', uniqueid);
		if (
			inputpassword?.trim() == '' ||
			inputpassword?.trim() == ' ' ||
			inputpassword?.trim() == undefined ||
			inputpassword?.trim() == null
		) {
			notifications.warning('please enter password', 3000);

			return false;
		}
		try {
			var metadata = {
				customMetadata: {
					uniqueId: uniqueid,
					date: new Date(),
					size: totlaMb
				}
			};

			const firebaseConfig = {
				apiKey: PUBLIC_apiKey,
				authDomain: PUBLIC_authDomain,
				projectId: PUBLIC_projectId,
				storageBucket: PUBLIC_storageBucket,
				messagingSenderId: PUBLIC_messagingSenderId,
				appId: PUBLIC_appId
			};
			const app1 = initializeApp(firebaseConfig);
			const auth = getAuth(app1);
			const storage = getStorage();
			await signInWithEmailAndPassword(auth, PUBLIC_firebaseEmail, PUBLIC_firebasePassword);
			for (let i = 0; i < filedata.length; i++) {
				zip.file(filedata[i].name, filedata[i]);
			}
			const data = await zip.generateAsync({ type: 'blob' });

			const storageRef = ref(storage, `${uniqueid}.zip`);
			console.log('uniqueid', uniqueid);

			const uploadTask = uploadBytesResumable(storageRef, data, metadata);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					uploading = true;
					uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							notifications.warning('upload pause', 5000);
							break;
						case 'running':
							// notifications.warning("upload running",5000)
							console.log('upload running');
							break;
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case 'storage/unauthorized':
							// User doesn't have permission to access the object
							// res.status(error.code || 400).send({
							//     msg: "User doesn't have permission to access the object",
							//     error: error.message
							// })
							console.log(error);
							notifications.warning(error, 3000);

							break;
						case 'storage/canceled':
							// User canceled the upload
							// res.status(error.code || 400).send({
							//     msg: "User canceled the upload",
							//     error: error.message
							// })
							notifications.warning(error, 3000);

							console.log(error);
							return false;
							break;
						// ...
						case 'storage/unknown':
							// Unknown error occurred, inspect error.serverResponse
							// res.status(error.code || 400).send({
							//     msg: "Unknown error occurred, inspect error.serverResponse",
							//     error: error.message
							// })
							console.log(error);
							notifications.warning(error, 3000);

							return false;
							break;
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log('File available at', downloadURL);
						try {
							(async () => {
								const data = {
									uniqueid: uniqueid,
									downloadURL: downloadURL,
									fileSize: totlaMb,
									FilePassword: inputpassword
								};
								const url1 = 'https://fileupload.cyclic.app/userFile/upload/frontend';
								const url = '//localhost:8020/userFile/upload/frontend';
								const response = await Axios.post(url1, data);
								console.log(response);
								if (response.status == 200) {
									console.log('uploaded');
									backenable('back', false);
									refresh('refreshpage', true);
								}
							})();
						} catch (error) {
							notifications.info(error, 3000);
							// console.log(error);
						}
					});
				}
			);
		} catch (error) {
			console.log(error);
			notifications.info(error, 3000);
		}
	}
</script>

<main>
	<button title="Back to Files" on:click={goback}><i class="fa-solid fa-arrow-left"></i></button>

	<form action="" class="my-2">
		<label for="password">Password <sup>Enter Password for file and please remember </sup></label>
		<input
			bind:value={inputpassword}
			placeholder="Secure your file"
			type="text"
			id="password "
			class="my-3 block rounded-md focus:ring-blue-500 focus:border-blue-500 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		/>
	</form>
	<button
		on:click={uploadFile}
		class="w-44 my-4 rounded-md h-8 bg-transparent border-[1px] border-solid">Upload</button
	>
	<!-- <ToastContainer/> -->
	{#if uploading == true}
		{uploadProgress.toFixed(1) + '%'}
	{/if}

	<div>
		<p>
			<span class="text-red-600">{uniqueid} </span> This is your fileKey for searching Please note down
			this key help you out to search your file and remember your password
		</p>
	</div>
	<Toast />
</main>
