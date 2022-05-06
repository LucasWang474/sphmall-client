<template>
    <div>
        <!--通用头部-->
        <Header/>
        
        <!--路由显示区域-->
        <router-view/>
        
        <!--通用底部-->
        <Footer/>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    
    export default {
        name: 'App',
        components: {Footer, Header},
        mounted() {
            this.$store.dispatch('getCategoryList');
        }
    };
</script>
