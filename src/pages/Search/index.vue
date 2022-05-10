<template>
    <div>
        <TypeNav/>
        
        <div class="main">
            <div v-if="searchResults.total > 0" class="py-container">
                <!--已选搜索参数列表 开始-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="javascript:">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li v-if="$route.query.categoryName" class="with-x"
                            @click="removeCategoryName">
                            {{ $route.query.categoryName }}<i>×</i>
                        </li>
                        <li v-if="$route.query.trademark" class="with-x"
                            @click="searchByTrademark('')">
                            {{ $route.query.trademark.split(':')[1] }}<i>×</i>
                        </li>
                        
                        
                        <li v-for="attr in $route.query.props" :key="attr"
                            class="with-x" @click="removeAttr(attr)">
                            {{ attr.split(':')[1] }}<i>×</i>
                        </li>
                    </ul>
                </div>
                <!--已选搜索参数列表 结束-->
                
                
                <!--商品参数选项 开始-->
                <SearchSelector
                    @removeAttrProps="removeAttr"
                    @searchByAttr="searchByAttr"
                    @searchByTrademark="searchByTrademark"
                />
                <!--商品参数选项 结束-->
                
                
                <!--商品具体展示 开始-->
                <div class="details clearfix">
                    <!--排序导航 开始-->
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li class="active">
                                    <a href="javascript:" @click="sortByDefault">综合</a>
                                </li>
                                <li>
                                    <a href="javascript:">销量</a>
                                </li>
                                <li>
                                    <a href="javascript:">新品</a>
                                </li>
                                <li>
                                    <a href="javascript:">评价</a>
                                </li>
                                <li>
                                    <a href="javascript:" @click="sortByPrice(1)">价格⬆</a>
                                </li>
                                <li>
                                    <a href="javascript:" @click="sortByPrice(-1)">价格⬇</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--排序导航 结束-->
                    
                    <!--商品列表 开始-->
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li v-for="product in searchResults.goodsList" :key="product.id" class="yui3-u-1-5">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a href="item.html" target="_blank">
                                            <img :src="product.defaultImg" alt=""/>
                                        </a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{ product.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a :title="product.title" href="item.html"
                                           target="_blank">
                                            {{ product.title }}
                                        </a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a class="sui-btn btn-bordered btn-danger" href="success-cart.html"
                                           target="_blank">加入购物车</a>
                                        <a class="sui-btn btn-bordered" href="javascript:">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--商品列表 结束-->
                    
                    <!--分页器 开始-->
                    <div class="fr page">
                        <div class="sui-pagination clearfix">
                            <ul>
                                <li class="prev disabled">
                                    <a href="javascript:">«上一页</a>
                                </li>
                                <li class="active">
                                    <a href="javascript:">1</a>
                                </li>
                                <li>
                                    <a href="javascript:">2</a>
                                </li>
                                <li>
                                    <a href="javascript:">3</a>
                                </li>
                                <li>
                                    <a href="javascript:">4</a>
                                </li>
                                <li>
                                    <a href="javascript:">5</a>
                                </li>
                                <li class="dotted"><span>...</span></li>
                                <li class="next">
                                    <a href="javascript:">下一页»</a>
                                </li>
                            </ul>
                            <div><span>共 {{ searchResults.totalPages }} 页</span></div>
                        </div>
                    </div>
                    <!--分页器 结束-->
                </div>
                <!--商品具体展示 结束-->
            </div>
            
            <div v-else class="py-container">
                <!--搜索无结果-->
                <div class="search-no-results">
                    <h2>抱歉，没有找到相关产品！</h2>
                    <h3>其实只能搜索手机</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SearchSelector from '@/pages/Search/SearchSelector';
    import {mapState} from 'vuex';
    
    export default {
        name: 'Search',
        components: {
            SearchSelector
        },
        computed: {
            ...mapState({
                searchResults: state => state.search.searchResults,
            }),
        },
        methods: {
            generateSearchParams() {
                return {
                    // 商品属性的数组
                    // 商品属性的数组: ["属性 ID:属性值:属性名"]
                    // 示例: ["2:6.0~6.24 英寸:屏幕尺寸"]
                    props: this.$route.query.props,
                    
                    category1Id: this.$route.query.category1Id,
                    category2Id: this.$route.query.category2Id,
                    category3Id: this.$route.query.category3Id,
                    categoryName: this.$route.query.categoryName,
                    keyword: this.$route.query.keyword,
                    
                    // 品牌: ID:品牌名称
                    // 示例: 1:苹果
                    trademark: this.$route.query.trademark,
                    
                    
                    // 页码，表示搜索第几页的结果，默认为 1
                    pageNo: this.$route.query.pageNo || 1,
                    // 每页显示的商品数量，默认为 10
                    pageSize: this.$route.query.pageSize || 10,
                    
                    // 排序方式：
                    // 1: 综合, 2: 价格
                    // asc: 升序, desc: 降序
                    // Example: 1:desc
                    order: this.$route.query.order || '1:desc',
                };
            },
            getSearchResults() {
                this.$store.dispatch('getSearchResults', this.generateSearchParams());
                this.$bus.$emit('updateSearchBoxKeyword', this.$route.query.keyword);
            },
            
            searchByTrademark(trademark) {
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        trademark: trademark || undefined,
                    }
                });
            },
            searchByAttr(attr) {
                const props = this.$route.query.props || [];
                
                // First check whether the attr is already in the props array
                if (!props.includes(attr)) {
                    this.$router.replace({
                        path: this.$route.path,
                        query: {
                            ...this.$route.query,
                            props: [...props, attr],
                        }
                    });
                }
            },
            
            removeAttr(attr) {
                const props = this.$route.query.props || [];
                
                // 因为是对现成的 attr 进行删除，所以 index 一定是 >= 0 的
                const index = props.indexOf(attr);
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        props: [...props.slice(0, index), ...props.slice(index + 1)],
                    }
                });
            },
            removeCategoryName() {
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        categoryName: undefined,
                    }
                });
            },
            
            sortByPrice(ranking) {
                // ranking: 1 means asc, -1 means desc
                const order = ranking === 1 ? '2:asc' : '2:desc';
                if (order !== this.$route.query.order) {
                    this.$router.replace({
                        path: this.$route.path,
                        query: {
                            ...this.$route.query,
                            order
                        }
                    });
                }
            },
            sortByDefault() {
                // Toggle between asc and desc
                const cases = {
                    '1:asc': '1:desc',
                    '1:desc': '1:asc',
                    undefined: '1:asc',
                };
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        order: cases[this.$route.query.order],
                    }
                });
            }
        },
        watch: {
            $route: {
                immediate: true,
                handler() {
                    this.getSearchResults();
                }
            }
        },
    };
</script>

<style lang="less" scoped>
    .main {
        margin: 10px 0;
        
        .py-container {
            width: 1200px;
            margin: 0 auto;
            
            .bread {
                margin-bottom: 5px;
                overflow: hidden;
                
                .sui-breadcrumb {
                    padding: 3px 15px;
                    margin: 0;
                    font-weight: 400;
                    border-radius: 3px;
                    float: left;
                    
                    li {
                        display: inline-block;
                        line-height: 18px;
                        
                        a {
                            color: #666;
                            text-decoration: none;
                            
                            &:hover {
                                color: #4cb9fc;
                            }
                        }
                    }
                }
                
                .sui-tag {
                    margin-top: -5px;
                    list-style: none;
                    font-size: 0;
                    line-height: 0;
                    padding: 5px 0 0;
                    margin-bottom: 18px;
                    float: left;
                    
                    .with-x {
                        font-size: 12px;
                        margin: 0 5px 5px 0;
                        display: inline-block;
                        overflow: hidden;
                        color: #000;
                        background: #f7f7f7;
                        padding: 0 7px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #dedede;
                        white-space: nowrap;
                        transition: color 400ms;
                        cursor: pointer;
                        
                        i {
                            margin-left: 10px;
                            cursor: pointer;
                            font: 400 14px tahoma;
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }
                        
                        &:hover {
                            color: #28a3ef;
                        }
                    }
                }
            }
            
            .details {
                margin-bottom: 5px;
                
                .sui-navbar {
                    overflow: visible;
                    margin-bottom: 0;
                    
                    .filter {
                        min-height: 40px;
                        padding-right: 20px;
                        background: #fbfbfb;
                        border: 1px solid #e2e2e2;
                        padding-left: 0;
                        border-radius: 0;
                        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                        
                        .sui-nav {
                            position: relative;
                            left: 0;
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;
                            
                            li {
                                float: left;
                                line-height: 18px;
                                
                                a {
                                    display: block;
                                    cursor: pointer;
                                    padding: 11px 15px;
                                    color: #777;
                                    text-decoration: none;
                                }
                                
                                &.active {
                                    a {
                                        background: #e1251b;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                }
                
                .goods-list {
                    margin: 20px 0;
                    
                    ul {
                        display: flex;
                        flex-wrap: wrap;
                        
                        li {
                            box-sizing: border-box;
                            height: 100%;
                            width: 20%;
                            margin-top: 10px;
                            line-height: 28px;
                            
                            .list-wrap {
                                
                                .p-img {
                                    padding-left: 15px;
                                    width: 215px;
                                    height: 255px;
                                    
                                    a {
                                        color: #666;
                                        
                                        img {
                                            max-width: 100%;
                                            height: auto;
                                            vertical-align: middle;
                                        }
                                    }
                                }
                                
                                .price {
                                    padding-left: 15px;
                                    font-size: 18px;
                                    color: #c81623;
                                    
                                    strong {
                                        font-weight: 700;
                                        
                                        i {
                                            margin-left: -5px;
                                        }
                                    }
                                    
                                    em {
                                        margin-right: 8px;
                                    }
                                }
                                
                                .attr {
                                    padding-left: 15px;
                                    width: 85%;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    
                                    a {
                                        color: #333;
                                        text-decoration: none;
                                    }
                                }
                                
                                .commit {
                                    padding-left: 15px;
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                    
                                    span {
                                        font-weight: 700;
                                        color: #646fb0;
                                    }
                                }
                                
                                .operate {
                                    padding: 12px 15px;
                                    
                                    .sui-btn {
                                        display: inline-block;
                                        padding: 2px 14px;
                                        box-sizing: border-box;
                                        margin-bottom: 0;
                                        font-size: 12px;
                                        line-height: 18px;
                                        text-align: center;
                                        vertical-align: middle;
                                        cursor: pointer;
                                        border-radius: 0;
                                        background-color: transparent;
                                        margin-right: 15px;
                                    }
                                    
                                    .btn-bordered {
                                        min-width: 85px;
                                        background-color: transparent;
                                        border: 1px solid #8c8c8c;
                                        color: #8c8c8c;
                                        
                                        &:hover {
                                            border: 1px solid #666;
                                            color: #fff !important;
                                            background-color: #666;
                                            text-decoration: none;
                                        }
                                    }
                                    
                                    .btn-danger {
                                        border: 1px solid #e1251b;
                                        color: #e1251b;
                                        
                                        &:hover {
                                            border: 1px solid #e1251b;
                                            background-color: #e1251b;
                                            color: white !important;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                .page {
                    width: 733px;
                    height: 66px;
                    overflow: hidden;
                    float: right;
                    
                    .sui-pagination {
                        margin: 18px 0;
                        
                        display: flex;
                        align-items: center;
                        
                        ul {
                            margin-left: 0;
                            margin-bottom: 0;
                            vertical-align: middle;
                            width: 490px;
                            float: left;
                            
                            li {
                                line-height: 18px;
                                display: inline-block;
                                
                                a {
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    border: 1px solid #e0e9ee;
                                    margin-left: -1px;
                                    font-size: 14px;
                                    padding: 9px 18px;
                                    color: #333;
                                }
                                
                                &.active {
                                    a {
                                        background-color: #fff;
                                        color: #e1251b;
                                        border-color: #fff;
                                        cursor: default;
                                    }
                                }
                                
                                &.prev {
                                    a {
                                        background-color: #fafafa;
                                    }
                                }
                                
                                &.disabled {
                                    a {
                                        color: #999;
                                        cursor: default;
                                    }
                                }
                                
                                &.dotted {
                                    span {
                                        // margin-left: -1px;
                                        position: relative;
                                        float: left;
                                        line-height: 18px;
                                        text-decoration: none;
                                        background-color: #fff;
                                        font-size: 14px;
                                        border: 0;
                                        padding: 9px 18px;
                                        color: #333;
                                    }
                                }
                                
                                &.next {
                                    a {
                                        background-color: #fafafa;
                                    }
                                }
                            }
                        }
                        
                        div {
                            color: #333;
                            font-size: 14px;
                            float: right;
                            width: 241px;
                            
                            span {
                            
                            }
                        }
                    }
                }
            }
            
            .search-no-results {
                margin-top: 20px;
                text-align: center;
                font-size: 14px;
                color: #999;
            }
        }
    }
</style>
