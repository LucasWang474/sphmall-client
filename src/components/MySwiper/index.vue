<template>
    <!--banner轮播 开始-->
    <div ref="swiperContainer" class="swiper-container">
        <div class="swiper-wrapper">
            <div v-for="banner in bannerList" :key="banner.id"
                 class="swiper-slide">
                <img :src="banner.imgUrl" alt=""/>
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
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
        name: 'MySwiper',
        props: {
            bannerList: {
                type: Array,
                default: () => []
            },
        },
        watch: {
            bannerList: {
                immediate: true,
                handler() {
                    // 必须只有当 bannerList 不为空时才执行
                    // 否则会出现莫名其妙的 bug
                    // 例如点击图片水平滑动时，图片会跳动，非常之恶心
                    if (this.bannerList.length > 0) {
                        this.initSwiper();
                    }
                }
            }
        },
        methods: {
            initSwiper() {
                this.$nextTick(() => {
                    new Swiper(this.$refs.swiperContainer, {
                        // slidesPerView: 1,
                        // spaceBetween: 30,
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });
                });
            }
        }
    };
</script>
