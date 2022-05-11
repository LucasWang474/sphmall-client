<template>
    <!--banner轮播 开始-->
    <div ref="swiperContainer" class="swiper-container">
        <div ref="swiperWrapper" class="swiper-wrapper">
            <div v-for="(image, index) in productImageList" :key="image.spuImgId" class="swiper-slide">
                <img :class="{'active': index === curImgIndex}"
                     :data-index="index" :src="image.imgUrl" alt=""/>
            </div>
        </div>
        
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
    <!--banner轮播 结束-->
</template>

<script>
    import 'swiper/css/swiper.min.css';
    import Swiper from 'swiper';
    
    export default {
        name: 'ImageList',
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
        watch: {
            productImageList: {
                immediate: true,
                handler() {
                    if (this.productImageList.length > 0) {
                        this.initSwiper();
                    }
                }
            },
            curImgIndex(newIndex) {
                // 利用下面能实现图片自动滚动
                this.swiper.slideTo(newIndex - 1);
            }
        },
        methods: {
            initSwiper() {
                this.$nextTick(() => {
                    this.swiper = new Swiper(this.$refs.swiperContainer, {
                        slidesPerView: 5,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });
                });
            },
            initSwiperImageClickEvent() {
                this.$refs.swiperWrapper.addEventListener('click', ({target}) => {
                    if (target.tagName === 'IMG') {
                        const index = +target.dataset.index;
                        if (index !== this.curImgIndex) {
                            this.$emit('changeCurImgIndex', index);
                        }
                    }
                });
            }
        },
        mounted() {
            this.initSwiperImageClickEvent();
        }
    };
</script>

<style lang="less" scoped>
    .swiper-container {
        position: relative;
        
        box-sizing: border-box;
        width: 402px;
        height: 56px;
        
        padding: 0 12px;
        
        
        .swiper-wrapper {
            .swiper-slide {
                img {
                    display: block;
                    
                    width: 50px;
                    height: 50px;
                    padding: 2px;
                    
                    border: 1px solid #ccc;
                    
                    &.active {
                        border: 2px solid #f60;
                        padding: 1px;
                    }
                    
                    &:hover {
                        border: 2px solid #f60;
                        padding: 1px;
                    }
                }
            }
        }
        
        
        .swiper-button-next,
        .swiper-button-prev {
            position: absolute;
            top: 0;
            
            box-sizing: border-box;
            width: 12px;
            height: 56px;
            
            background: rgb(235, 235, 235);
            margin-top: 0;
            border: 1px solid rgb(204, 204, 204);
            
            &::after {
                font-size: 12px;
                font-weight: bold;
            }
        }
        
        .swiper-button-prev {
            left: 0;
        }
        
        .swiper-button-next {
            right: 0;
        }
    }
</style>
