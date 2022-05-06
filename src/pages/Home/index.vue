<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <RecommendedToday/>
        <Ranking/>
        <GuessYouLike/>
        <GeneralFloor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
        <Brands/>
    </div>
</template>

<script>
    import ListContainer from '@/pages/Home/ListContainer';
    import RecommendedToday from '@/pages/Home/RecommendedToday';
    import Ranking from '@/pages/Home/Ranking';
    import GuessYouLike from '@/pages/Home/GuessYouLike';
    import GeneralFloor from '@/pages/Home/GeneralFloor';
    import Brands from '@/pages/Home/Brands';
    import {mapState} from 'vuex';
    
    export default {
        name: 'Home',
        components: {
            Brands, GeneralFloor, GuessYouLike, Ranking, RecommendedToday, ListContainer
        },
        mounted() {
            this.$store.dispatch('getFloorList');
        },
        computed: {
            ...mapState({
                floorList: state => state.home.floorList
            })
        }
    };
</script>
