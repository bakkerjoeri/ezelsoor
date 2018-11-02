<template>
    <ul class="tag-list" v-if="tags.length">
        <li class="tag-list__item" v-for="tag in tags" :key="tag.id">
            <tag-item :tag="tag"></tag-item>
        </li>
    </ul>
</template>

<script>
    import TagItem from './TagItem';
    
    export default {
        props: ['tags'],
        components: {
            TagItem,
        },
    };
</script>

<style lang="scss">
    .tag-list {
        display: flex;
        list-style: none;
    }
    
    .tag-list__item {
        &:not(:first-child) {
            margin-left: 5px;
        }
        
        &:not(:last-child) {
            margin-right: 5px;
        }
    }
</style>