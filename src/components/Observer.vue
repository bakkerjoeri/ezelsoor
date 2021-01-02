<template>
	<div class="Observer"></div>
</template>

<script>
	export default {
		emits: ['intersect'],
		props: {
			rootMargin: {
				type: String,
				default: '0px 0px 0px 0px',
			},
		},
		data() {
			return {
				observer: null,
			};
		},
		mounted() {
			this.observer = new IntersectionObserver(([entry]) => {
				if (entry && entry.isIntersecting) {
					this.$emit('intersect');
				}
			});

			this.observer.observe(this.$el);
		},
		unmounted() {
			this.observer.disconnect();
		},
	}
</script>
