<template>
    <div class="wrap">
        <TypeNav/>
        <ul>
            <li>{{ $route.query.keyword }}</li>
            <li>{{ $route.query.keyword }}</li>
            <li>{{ $route.query.keyword }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Search',
    };
</script>

<style lang="less" scoped>
    .wrap {
        text-align: center;
        
        li {
            font-size: 16px;
        }
    }
</style>
