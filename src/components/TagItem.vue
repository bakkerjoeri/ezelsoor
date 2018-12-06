<template>
    <router-link
        class="tag"
        :to="{ name: 'tag', params: { tagName: tag.name } }"
    >
        {{ tag.name }}</router-link>
</template>

<script>
    export default {
        props: ['tag'],
    }
</script>

<style lang="scss">
    @import './../styles/settings';
    .tag {
        line-height: $base-line-height;
        font-size: 13px;
        color: #000;
    }
</style>