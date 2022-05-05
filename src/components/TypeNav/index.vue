<template>
    <div class="type-nav">
        <div class="container">
            <!--左侧标题 + 下方绝对定位的三级导航-->
            <div class="left-wrap">
                <h2 class="all"
                    @mouseenter="h2IsHovered = true" @mouseleave="h2IsHovered = false">
                    全部商品分类
                </h2>
                
                <!--下方三级导航，具体内容取决于实际数据-->
                <div :class="{'search': $route.name === 'search'}" class="sort">
                    <div class="all-sort-list2">
                        <!--一级导航 开始-->
                        <div v-for="cate1 in categories"
                             :key="cate1['categoryId']" class="item">
                            <h3>
                                <a href="">{{ cate1['categoryName'] }}</a>
                            </h3>
                            
                            <!--二级导航 开始-->
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl v-for="cate2 in cate1['categoryChild']"
                                        :key="cate2['categoryId']" class="fore">
                                        <dt>
                                            <a href="">{{ cate2['categoryName'] }}</a>
                                        </dt>
                                        
                                        <!--三级导航 开始-->
                                        <dd>
                                            <em v-for="cate3 in cate2['categoryChild']"
                                                :key="cate3['categoryId']">
                                                <a href="">{{ cate3['categoryName'] }}</a>
                                            </em>
                                        </dd>
                                        <!--三级导航 结束-->
                                    </dl>
                                </div>
                            </div>
                            <!--二级导航 结束-->
                        </div>
                        <!--一级导航 结束-->
                    </div>
                </div>
            </div>
            
            <!--右侧导航-->
            <nav class="nav">
                <a href="javascript:">服装城</a>
                <a href="javascript:">美妆馆</a>
                <a href="javascript:">尚品汇超市</a>
                <a href="javascript:">全球购</a>
                <a href="javascript:">闪购</a>
                <a href="javascript:">团购</a>
                <a href="javascript:">有趣</a>
                <a href="javascript:">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
    import {getBaseCategoryList} from '@/api';
    
    export default {
        name: 'TypeNav',
        data() {
            return {
                // 共三级导航，即这是一个三维数组
                categories: [],
            };
        },
        methods: {
            setBaseCategoryList() {
                const TOTAL_HEIGHT = 461; // HEIGHT OF '.sort'
                const ROW_HEIGHT = 30; // HEIGHT OF '.item'
                const ROW_COUNT = Math.floor(TOTAL_HEIGHT / ROW_HEIGHT); // ROW COUNT to SHOW
                
                getBaseCategoryList().then(response => {
                    this.categories = response.data.slice(0, ROW_COUNT);
                });
            },
        },
        mounted() {
            this.setBaseCategoryList();
        }
    };
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;
        
        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;
            
            .left-wrap {
                .all {
                    width: 210px;
                    height: 45px;
                    background-color: #e1251b;
                    line-height: 45px;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    font-weight: bold;
                }
                
                .sort {
                    position: absolute;
                    left: 0;
                    top: 45px;
                    width: 210px;
                    height: 461px;
                    background: #fafafa;
                    z-index: 999;
                    
                    .all-sort-list2 {
                        .item {
                            h3 {
                                line-height: 30px;
                                font-size: 14px;
                                font-weight: 400;
                                overflow: hidden;
                                padding: 0 20px;
                                margin: 0;
                                
                                a {
                                    color: #333;
                                }
                            }
                            
                            .item-list {
                                display: none;
                                position: absolute;
                                width: 734px;
                                min-height: 460px;
                                background: #f7f7f7;
                                left: 210px;
                                border: 1px solid #ddd;
                                top: 0;
                                z-index: 9999 !important;
                                
                                .subitem {
                                    float: left;
                                    width: 650px;
                                    padding: 0 4px 0 8px;
                                    
                                    dl {
                                        border-top: 1px solid #eee;
                                        padding: 6px 0;
                                        overflow: hidden;
                                        zoom: 1;
                                        
                                        &.fore {
                                            border-top: 0;
                                        }
                                        
                                        dt {
                                            float: left;
                                            width: 54px;
                                            line-height: 22px;
                                            text-align: right;
                                            padding: 3px 6px 0 0;
                                            font-weight: 700;
                                        }
                                        
                                        dd {
                                            float: left;
                                            width: 415px;
                                            padding: 3px 0 0;
                                            overflow: hidden;
                                            
                                            em {
                                                float: left;
                                                height: 14px;
                                                line-height: 14px;
                                                padding: 0 8px;
                                                margin-top: 5px;
                                                border-left: 1px solid #ccc;
                                            }
                                        }
                                    }
                                }
                            }
                            
                            &:hover {
                                .item-list {
                                    display: block;
                                }
                            }
                        }
                    }
                }
                
                .sort.search {
                    display: none;
                }
                
                &:hover {
                    .sort.search {
                        display: block;
                        text-align: left;
                    }
                }
            }
            
            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }
        }
    }
</style>
