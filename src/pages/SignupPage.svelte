<script lang="ts">
	import { auth } from "../utils/firebase";
	import { navigate } from "svelte-routing";
	import FormItem from "../components/form/FormItem.svelte";
	import InputPassword from "../components/form/InputPassword.svelte";
	import InputText from "../components/form/InputText.svelte";
	import Button from "../components/Button.svelte";
	import Page from "./Page.svelte";
	import { createUserWithEmailAndPassword } from "@firebase/auth";

	let emailAddress: string = "";
	let password: string = "";
	let isSubmitPending: boolean = false;
	let errors = [];

	$: errorForPasswordField = (() => {
		const error = errors.find((error) => error.field === "password");

		if (!error) {
			return "";
		}

		return error.message;
	})();

	$: errorForEmailField = (() => {
		const error = errors.find((error) => error.field === "email");

		if (!error) {
			return "";
		}

		return error.message;
	})();

	async function handleSubmit() {
		isSubmitPending = true;
		errors = [];

		try {
			await createUserWithEmailAndPassword(auth, emailAddress, password);
			navigate("/");
		} catch (error) {
			isSubmitPending = false;

			if (error.code === "auth/email-already-in-use") {
				errors.push({
					field: "email",
					message:
						"The email address you provided is already in use.",
				});
			} else if (error.code === "auth/invalid-email") {
				errors.push({
					field: "email",
					message: "The email address you provided is not valid.",
				});
			} else if (error.code === "auth/weak-password") {
				errors.push({
					field: "password",
					message: "The password you provided is not strong enough.",
				});
			} else {
				errors.push({
					isForForm: true,
					message: "Something went wrong. Please try again.",
				});

				throw error;
			}
		}
	}
</script>

<Page>
	<h1>Create an account</h1>

	<form on:submit|preventDefault={handleSubmit}>
		<FormItem
			error={errorForEmailField}
			label="Email address"
			labelFor="loginEmailAddress"
		>
			<InputText
				type="email"
				bind:value={emailAddress}
				id="loginEmailAddress"
				autocomplete="username"
				required
				disabled={isSubmitPending}
			/>
		</FormItem>

		<FormItem
			error={errorForPasswordField}
			label="Password"
			labelFor="loginPassword"
		>
			<InputPassword
				bind:value={password}
				id="loginPassword"
				autocomplete="new-password"
				required
				disabled={isSubmitPending}
			/>
		</FormItem>

		<FormItem>
			<Button type="submit" disabled={isSubmitPending}>Sign up</Button>
		</FormItem>
	</form>
</Page>
