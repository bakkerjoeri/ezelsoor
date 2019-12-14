<template>
	<div class="Login">
		<TopBar>
			<template v-slot:left>
				<h1 class="Login__title">
					Log in
				</h1>
			</template>
		</TopBar>

		<main>
			<form @submit.prevent="handleSubmitLogin">
				<FormError
					v-if="hasErrorForForm"
					class="Login__formError"
					:text="errorMessageForForm"
				/>

				<FormInput
					v-model="email"
					type="email"
					label="Email address"
					autocomplete="username"
					required
					:error="getErrorMessageForField('email')"
					@input="clearErrorForField('email')"
				/>

				<FormInput
					v-model="password"
					type="password"
					label="Password"
					autocomplete="new-password"
					required
					:error="getErrorMessageForField('password')"
					@input="clearErrorForField('password')"
				/>

				<FormItem>
					<Button
						:disabled="isSubmitPending"
						type="submit"
					>
						Log in
					</Button>
				</FormItem>
			</form>
		</main>
	</div>
</template>

<script>
	import Button from './Button.vue';
	import FormError from './FormError.vue';
	import FormInput from './FormInput.vue';
	import FormItem from './FormItem.vue';
	import TopBar from './TopBar.vue';
	import { auth } from './../utility/firebase.js';

	export default {
		components: {
			Button,
			FormError,
			FormInput,
			FormItem,
			TopBar,
		},
		data() {
			return {
				email: null,
				errors: [],
				password: null,
				isSubmitPending: false,
			};
		},
		computed: {
			hasErrorForForm() {
				return this.errors.some((error) => {
					return error.isForForm;
				});
			},
			errorMessageForForm() {
				const error = this.errors.find((error) => {
					return error.isForForm;
				});

				if (!error) {
					return null;
				}

				return error.message;
			}
		},
		methods: {
			clearErrors() {
				this.errors = [];
			},
			clearErrorForField(fieldName) {
				this.errors = this.errors.filter((error) => {
					error.field !== fieldName;
				});
			},
			hasErrorForField(fieldName) {
				return this.errors.some((error) => {
					return error.field === fieldName;
				});
			},
			getErrorMessageForField(fieldName) {
				const error = this.errors.find((error) => {
					return error.field === fieldName;
				});

				if (!error) {
					return null;
				}

				return error.message;
			},
			async handleSubmitLogin() {
				this.isSubmitPending = true;

				try {
					await auth.signInWithEmailAndPassword(this.email, this.password);
					this.$router.push('/');

					this.isSubmitPending = false;
				} catch(error) {
					if (error.code === 'auth/invalid-email') {
						this.errors.push({
							field: 'email',
							message: 'The email address you provided is not valid.'
						});
					} else if (error.code === 'auth/user-disabled') {
						this.errors.push({
							field: 'email',
							message: 'The user this email address belongs to has been disabled.',
						});
					} else if (error.code === 'auth/user-not-found') {
						this.errors.push({
							field: 'email',
							message: 'No user exists for the email address you provided.'
						});
					} else if (error.code === 'auth/wrong-password') {
						this.errors.push({
							field: 'password',
							message: 'The password is incorrect.'
						});
					} else {
						this.errors.push({
							isForForm: true,
							message: 'Something went wrong. Please try again.'
						});

						throw error;
					}

					this.isSubmitPending = false;
				}
			}
		}
	};
</script>

<style lang="scss">
	.Login__title {
		font-size: var(--font-size-body);
		line-height: calc(2 * var(--baseline));
	}

	.Login__formError {
		margin-bottom: 15px;
	}
</style>
