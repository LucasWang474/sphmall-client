<template>
    <div class="spec-preview">
        <img :src="curImgSrc" alt=""/>
        <div ref="stage" class="stage" @mousemove="handleMouseMove"></div>
        <div class="big">
            <img ref="bigImg" :src="curImgSrc" alt=""/>
        </div>
        <div ref="mask" class="mask"></div>
    </div>
</template>

<script>
    import throttle from 'lodash/throttle';
    
    export default {
        name: 'Zoom',
        props: {
            productImageList: {
                type: Array,
                default: () => []
            },
            curImgIndex: {
                type: Number,
                default: 0
            }
        },
        computed: {
            curImgSrc() {
                if (this.productImageList.length > 0) {
                    return this.productImageList[this.curImgIndex].imgUrl;
                }
                return '';
            },
            
            stageWidth() {
                return this.$refs.stage.offsetWidth;
            },
            stageHeight() {
                return this.$refs.stage.offsetHeight;
            },
        },
        methods: {
            calcMaskNewLeft(mouseX) {
                const maskWidth = this.$refs.mask.offsetWidth;
                const maskMinLeft = 0;
                const maskMaxLeft = this.stageWidth - maskWidth;
                
                let newLeft = mouseX - maskWidth / 2;
                newLeft = Math.max(newLeft, maskMinLeft);
                newLeft = Math.min(newLeft, maskMaxLeft);
                return newLeft;
            },
            calcMaskNewTop(mouseY) {
                const maskHeight = this.$refs.mask.offsetHeight;
                const maskMinTop = 0;
                const maskMaxTop = this.stageHeight - maskHeight;
                
                let newTop = mouseY - maskHeight / 2;
                newTop = Math.max(newTop, maskMinTop);
                newTop = Math.min(newTop, maskMaxTop);
                return newTop;
            },
            
            handleMouseMove: throttle(function (event) {
                const {mask, bigImg} = this.$refs;
                const bigImgScaleFactor = bigImg.offsetWidth / this.stageWidth;
                
                // When mouse move, also move the mask
                const {offsetX: mouseX, offsetY: mouseY} = event;
                const newLeft = this.calcMaskNewLeft(mouseX);
                const newTop = this.calcMaskNewTop(mouseY);
                mask.style.left = `${newLeft}px`;
                mask.style.top = `${newTop}px`;
                
                // When mouse move, also move the big image
                bigImg.style.left = newLeft * -bigImgScaleFactor + 'px';
                bigImg.style.top = newTop * -bigImgScaleFactor + 'px';
            }, 10),
        }
    };
</script>

<style lang="less">
    .spec-preview {
        position: relative;
        width: 400px;
        height: 400px;
        border: 1px solid #ccc;
        
        img {
            width: 100%;
            height: 100%;
        }
        
        .stage {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 998;
            
            &:hover {
                cursor: move;
            }
        }
        
        .mask {
            width: 50%;
            height: 50%;
            background-color: rgba(0, 255, 0, 0.3);
            position: absolute;
            left: 0;
            top: 0;
            display: none;
        }
        
        .big {
            width: 100%;
            height: 100%;
            position: absolute;
            top: -1px;
            left: 100%;
            border: 1px solid #aaa;
            overflow: hidden;
            z-index: 998;
            display: none;
            background: white;
            
            img {
                width: 200%;
                height: 200%;
                max-width: 200%;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        
        .stage:hover ~ .mask,
        .stage:hover ~ .big {
            display: block;
        }
    }
</style>
