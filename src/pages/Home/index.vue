<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <RecommendedToday/>
        <Ranking/>
        <GuessYouLike/>
        <GeneralFloor/>
        <GeneralFloor/>
        <Brands/>
    </div>
</template>

<script>
    import TypeNav from '@/pages/Home/TypeNav';
    import ListContainer from '@/pages/Home/ListContainer';
    import RecommendedToday from '@/pages/Home/RecommendedToday';
    import Ranking from '@/pages/Home/Ranking';
    import GuessYouLike from '@/pages/Home/GuessYouLike';
    import GeneralFloor from '@/pages/Home/GeneralFloor';
    import Brands from '@/pages/Home/Brands';
    
    export default {
        name: 'Home',
        components: {
            Brands, GeneralFloor, GuessYouLike, Ranking, RecommendedToday, ListContainer, TypeNav
        },
    };
</script>

<style lang="less" scoped>

</style>
