<template>
    <!--banner轮播 开始-->
    <div ref="swiperContainer" class="swiper-container">
        <div ref="swiperWrapper" class="swiper-wrapper">
            <div v-for="(image, index) in productImageList" :key="image.spuImgId" class="swiper-slide">
                <img :class="{'active': index === currentIndex}"
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
            }
        },
        data() {
            return {
                currentIndex: 0
            };
        },
        watch: {
            productImageList: {
                immediate: true,
                handler() {
                    if (this.productImageList.length > 0) {
                        this.initSwiper();
                        this.currentIndex = this.getDefaultIndex();
                    }
                }
            }
        },
        methods: {
            getDefaultIndex() {
                for (let i = 0; i < this.productImageList.length; i++) {
                    if (+this.productImageList[i].isDefault) {
                        return i;
                    }
                }
                return 0;
            },
            initSwiper() {
                this.$nextTick(() => {
                    new Swiper(this.$refs.swiperContainer, {
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
                        this.currentIndex = +target.dataset.index;
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
