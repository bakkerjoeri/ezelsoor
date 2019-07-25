<template>
    <button
        class="button"
        @click="$emit('click', $event)"
        :type="type"
    >
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: () => 'button',
            },
        },
    }
</script>

<style lang="scss">
    @import './../styles/settings';
    
    .button {
        display: block;
        padding-right: 5px;
        padding-left: 5px;
        line-height: $base-line-height;
        
        background-color: transparent;
        white-space: nowrap;
        border: none;
        outline: none;
        
        cursor: pointer;
    }
</style>