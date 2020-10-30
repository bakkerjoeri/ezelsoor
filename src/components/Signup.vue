<template>
	<div class="Signup">
		<TopBar>
			<template v-slot:left>
				<h1 class="Signup__title">
					Create an account
				</h1>
			</template>
		</TopBar>

		<main>
			<form @submit.prevent="handleSubmitSignup">
				<FormError
					v-if="hasErrorForForm"
					class="Signup__formError"
					:text="errorMessageForForm"
				/>

				<FormInput
					v-model:value="email"
					type="email"
					label="Email address"
					autocomplete="username"
					required
					:error="getErrorMessageForField('email')"
					@input="clearErrorForField('email')"
				/>

				<FormInput
					v-model:value="password"
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
						Sign up
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
			async handleSubmitSignup() {
				this.isSubmitPending = true;

				try {
					await auth.createUserWithEmailAndPassword(this.email, this.password);
					this.isSubmitPending = false;
					this.$router.push('/');
				} catch(error) {
					if (error.code === 'auth/email-already-in-use') {
						this.errors.push({
							field: 'email',
							message: 'The email address you provided is already in use.',
						})
					} else if (error.code === 'auth/invalid-email') {
						this.errors.push({
							field: 'email',
							message: 'The email address you provided is not valid.'
						});
					} else if (error.code === 'auth/weak-password') {
						this.errors.push({
							field: 'password',
							message: 'The password you provided is not strong enough.'
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
	.Signup__title {
		font-size: var(--font-size-body);
		line-height: calc(2 * var(--baseline));
	}

	.Signup__formError {
		margin-bottom: 15px;
	}
</style>
