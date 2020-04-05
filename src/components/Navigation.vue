<template>
	<nav class="Navigation">
		<NavigationSection title="Menu">
			<ul class="Navigation__list">
				<li
					v-if="$store.getters.isLoggedIn"
					class="Navigation__item"
				>
					<Button @click="handleClickLogout">Log out</Button>
				</li>

				<li
					v-if="!$store.getters.isLoggedIn"
					class="Navigation__item"
				>
					<router-link
						class="Navigation__link"
						to="/login"
						@click.native="$emit('close')"
					>
						Log in
					</router-link>
				</li>

				<li
					v-if="!$store.getters.isLoggedIn"
					class="Navigation__item"
				>
					<router-link
						class="Navigation__link"
						to="/signup"
						@click.native="$emit('close')"
					>
						Sign up
					</router-link>
				</li>
			</ul>
		</NavigationSection>

		<NavigationSection>
			<ul class="Navigation__list">
				<li
					v-for="(menuItem, index) in menuItems"
					class="Navigation__item"
					:key="index"
				>
					<router-link
						class="Navigation__link"
						:to="menuItem.route"
						@click.native="$emit('close')"
					>
						{{ menuItem.name }}
					</router-link>
				</li>
			</ul>
		</NavigationSection>

		<NavigationSection
			title="Lists"
			collapsible
		>
			<template v-slot:actions>
				<Button
					@click="handleClickCreateList"
					variant="text"
					size="small"
				>
					create
				</Button>
			</template>

			<ul class="Navigation__list" v-if="listMenuItems.length">
				<li
					class="Navigation__item Navigation__item--list"
					v-for="(listMenuItem, index) in listMenuItems"
					:key="index"
				>
					<router-link
						class="Navigation__link"
						:title="listMenuItem.name"
						:to="{
							name: 'list',
							params: { listId: listMenuItem.id }
						}"
						@click.native="$emit('close')"
					>
						{{ listMenuItem.name }}
					</router-link>

					<Row class="ListActions">
						<Button
							@click="handleClickEditList(listMenuItem.id)"
							size="small"
							variant="text"
						>
							edit
						</Button>
					</Row>
				</li>
			</ul>
		</NavigationSection>

		<NavigationSection
			v-if="Object.keys(orderedTagCount).length"
			title="Tags"
			collapsible
		>
			<ul class="Navigation__list">
				<li
					class="Navigation__item"
					v-for="([tag, amount], index) in Object.entries(orderedTagCount)"
					:key="index"
				>
					<router-link
						class="Navigation__link"
						:title="tag"
						:to="{
							name: 'tag',
							params: { tagName: tag }
						}"
						@click.native="$emit('close')"
					>
						{{ tag }}
					</router-link>

					<span class="TagCount">
						&middot; {{ amount }}
					</span>
				</li>
			</ul>
		</NavigationSection>

		<Modal v-if="isCreatingList">
			<ListForm
				@submit="handleSubmitNewList"
				@cancel="isCreatingList = false"
			/>
		</Modal>

		<Modal v-if="isEditingList && listToEdit">
			<ListForm
				:list="listToEdit"
				@submit="handleSubmitEditedList(listToEdit.id, $event)"
				@cancel="isEditingList = false"
				@delete="handleClickDeleteList(listToEdit.id)"
			/>
		</Modal>
	</nav>
</template>

<script>
	import Button from './Button.vue';
	import ListForm from './ListForm.vue';
	import Modal from './Modal.vue';
	import NavigationSection from './NavigationSection.vue';
	import Row from './Row.vue';
	import { auth } from './../utility/firebase.js';

	export default {
		components: {
			Button,
			ListForm,
			Modal,
			Row,
			NavigationSection,
		},
		data: function() {
			return {
				isCreatingList: false,
				isEditingList: false,
				listToEditId: null,
				menuItems: [
					{ name: 'Home', route: '/' },
					{ name: 'Read later', route: '/toread' },
					{ name: 'Favorites', route: '/favorites' },
					{ name: 'Archive', route: '/archive' },
				],
			};
		},
		computed: {
			listMenuItems() {
				return this.sortedLists.map(list => {
					return {
						id: list.id,
						name: list.title,
					};
				});
			},
			lists() {
				return this.$store.getters.allLists;
			},
			sortedLists() {
				return [...this.lists].sort((listA, listB) => {
					return listA.title - listB.title;
				})
			},
			listToEdit() {
				if (!this.listToEditId) {
					return null;
				}

				return this.$store.getters.listWithId(this.listToEditId);
			},
			tagCount() {
				return this.$store.getters.tagCount;
			},
			orderedTagCount() {
				const tagCount = this.tagCount;

				return Object.keys(tagCount).sort().reduce((orderedTagCount, tagName) => {
					return {
						...orderedTagCount,
						[tagName]: tagCount[tagName],
					}
				}, {});
			}
		},
		methods: {
			handleClickLogout() {
				auth.signOut();
			},
			handleClickCreateList() {
				this.$emit('close');
				this.isCreatingList = true;
			},
			handleClickEditList(listId) {
				this.listToEditId = listId;
				this.isEditingList = true;
			},
			handleSubmitNewList(list) {
				this.$store.dispatch('addList', list);
				this.isCreatingList = false;
			},
			handleSubmitEditedList(id, list) {
				this.$store.dispatch('updateList', { id, list });
				this.isEditingList = false;
			},
			handleClickDeleteList(listId) {
				this.$store.dispatch('deleteList', listId);
				this.isEditingList = false;
			},
		},
	};
</script>

<style lang="scss">
	.Navigation {
		overflow-y: scroll;
		height: 100%;
		padding-right: var(--gap);
		padding-left: var(--gap);
	}

	.Navigation__list {
		list-style: none;
		margin-bottom: var(--baseline);
	}

	.Navigation__item {
		display: flex;
		line-height: var(--baseline);
		white-space: nowrap;
	}

	.Navigation__item--list {
		justify-content: space-between;
	}

	.ListActions {
		margin-left: 6px;
	}

	.Navigation__link {
		display: inline;
		overflow: hidden;
		text-decoration: none;
		text-overflow: ellipsis;
		color: var(--color-text);

		&:hover,
		&:focus {
			text-decoration: underline;
		}

		&.router-link-exact-active {
			color: var(--color-highlight);
		}
	}

	.TagCount {
		margin-left: 6px;
		color: #aaa;
	}
</style>
