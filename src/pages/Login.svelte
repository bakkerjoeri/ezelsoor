
<script lang="ts">
	import { auth } from "../utils/firebase";
	import { navigate } from "svelte-routing";
	import FormItem from "../components/form/FormItem.svelte";
	import InputPassword from "../components/form/InputPassword.svelte";
	import InputText from "../components/form/InputText.svelte";
	import Button from "../components/Button.svelte";

	let emailAddress: string = '';
	let password: string = '';
	let isSubmitPending: boolean = false;
	let errors = [];

	async function handleSubmit() {
		isSubmitPending = true;
		errors = [];

		try {
			await auth.signInWithEmailAndPassword(emailAddress, password);
			isSubmitPending = false;
			console.log('success!');
			navigate("/");
		} catch(error) {
			if (error.code === 'auth/invalid-email') {
				errors.push({
					field: 'email',
					message: 'The email address you provided is not valid.'
				});
			} else if (error.code === 'auth/user-disabled') {
				errors.push({
					field: 'email',
					message: 'The user this email address belongs to has been disabled.',
				});
			} else if (error.code === 'auth/user-not-found') {
				errors.push({
					field: 'email',
					message: 'No user exists for the email address you provided.'
				});
			} else if (error.code === 'auth/wrong-password') {
				errors.push({
					field: 'password',
					message: 'The password is incorrect.'
				});
			} else {
				errors.push({
					isForForm: true,
					message: 'Something went wrong. Please try again.'
				});
			}

			isSubmitPending = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<FormItem label="Email address" labelFor="loginEmailAddress">
		<InputText
			type="email"
			bind:value={emailAddress}
			id="loginEmailAddress"
			autocomplete="username"
			required
			disabled={isSubmitPending}
		/>
	</FormItem>

	<FormItem label="Password" labelFor="loginPassword">
		<InputPassword
			bind:value={password}
			id="loginPassword"
			autocomplete="current-password"
			required
			disabled={isSubmitPending}
		/>
	</FormItem>

	<FormItem>
		<Button type="submit" disabled={isSubmitPending}>Log in</Button>
	</FormItem>
</form>
