<template>
    <transition name="modal">
        <div class="modal__mask">
            <div class="modal">
                <div class="modal__header">
                    <slot name="header">
                        
                    </slot>
                </div>
                <div class="modal__body">
                    <slot name="body">
                        
                    </slot>
                </div>
                <div class="modal__footer">
                    <slot name="footer">
                        
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss">
    .modal__mask {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .2s;
    }
    
    .modal {
        width: 100%;
        max-width: 360px;
        background-color: #fff;
    }
    
    .modal__header,
    .modal__body,
    .modal__footer {
        padding: 20px;
    }
</style>