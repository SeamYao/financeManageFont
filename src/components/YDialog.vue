<template>
<div>
    <div 
      v-show="visible"
      class="Y-dialog_wrapper"
      @click.self="handleWrapperClick"
    >
        <div :key="key" class="Y-dialog" ref="dialog" :style="style"> 
            <div class="Y-dialog_header">
                <slot name="title">
                    <span class="Y-dialog_title"></span>
                </slot>
            </div>
            <div class="Y-dialog_body" v-if="rendered"><slot></slot></div>
            <div class="el-dialog_footer" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>

        </div>
    </div>  
</div>
    
</template>
<script>
let idSeed = 1;
let modalDom = null;
//https://juejin.cn/post/7250670781633593404
export default {
    props:{
        title: {
            type: String,
            default: ''
        },
        modalAppendToBody: {
            type: Boolean,
            default: true
        },
        appendToBody: {
            type: Boolean,
            default: false
        },

        closeOnClickModal: {
            type: Boolean,
            default: true
        },

        width: string,

        visible: Boolean,
        top: {
            type: String,
            default: '15vh'
        },
    },
    data() {
        return {
            key: 0,
            opened: false,
            rendered: false,
            zIndex: 2000,
        }
    },
    computed: {
        style(){
            let style = {};
            style.marginTop = this.top;
            if(this.width){
                style.width = this.width;
            }
            return style;
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.rendered = true;
                this.open();
                if (this.appendToBody) {
                    document.body.appendChild(this.$el);
                }
            } else {
                this.close();
            }
        },
    },
    methods: {

        handleWrapperClick() {
            if (this.closeOnClickModal) {
                this.close();
            }
        },
        handleClose() {
            this.$emit('update:visible', false);
            this.$emit('close');
        },
        open() {
            if (this.opened) return;
            this._opening = true;
            const dom = this.$el;
            
            if (this._closing) {
                this.closeModal(this._popupId);
                this._closing = false;
            }

            //增加遮罩層
            this.openModal(
                this._popupId,
                ++this.zIndex,
                this.modalAppendToBody ? undefined : dom
            );

            // 彈框增加一個層級
            dom.style.zIndex = ++this.zIndex;
            this.opened = true;
            this._opening = false;
        },
        close(){
            this._closing = true;
            this.opened = false;
            this.closeModal(this._popupId);
            this._closing = false;
        },
        openModal(id, zIndex, dom) {
            // 創建div, 注冊滾動和點擊事件
            const modaIDom = this.getModal();
            modaIDom.className = "v-modal";
            modaIDom.style.zIndex = zIndex;
            modaIDom.tabIndex = 0;
            modaIDom.style.display = '';
            if (!modalDom) {
                modalDom = document.createElement('div');
                modalDom.className = 'Y-dialog_modal';
                document.body.appendChild(modalDom);
            }
        },
        closeModal(){
            if (!modalDom){
                return;
            }
            if (modalDom.parentNode) {
                modalDom.parentNode.removeChild(modalDom);
                modalDom.style.display = 'none';
                modalDom = undefined;
            }
        },
        getModal(){
            if(!modalDom){
                modalDom = document.createElement('div');
                modalDom.addEventListener("click", () => {
                    if (this.closeOnClickModal) {
                        this.close();
                    }
                });
            }
        }
    },
    mounted(){
        // 一開始渲染彈框
        if (this.visible) {
            this.rendered = true;
            this.open();
            if (this.appendToBody) {
                document.body.appendChild(this.$el);
            }
        }
    },
    beforeMount(){
        this._popupId = 'popup-' + idSeed++;
    },
    beforeDestroy(){
        this.closeModal(this._popupId);
        modalDom = null;
    }
}
</script>
