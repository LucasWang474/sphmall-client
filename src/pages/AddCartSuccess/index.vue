<template>
    <div v-if="productName" class="cart-complete-wrap">
        <div class="cart-complete">
            <h3>
                <span class="iconfont icon-check-circle"></span>
                商品已成功加入购物车！
            </h3>
            
            <div class="goods">
                <div class="left-good">
                    <div class="left-pic">
                        <img :src="productDefaultImg" alt="">
                    </div>
                    <div class="right-info">
                        <p class="title">{{ productName }}</p>
                        <p class="attr">{{ productChosenAttrs }}</p>
                    </div>
                </div>
                <div class="right-go-cart">
                    <a class="sui-btn btn-xlarge" href="javascript:" @click="$router.back()">查看商品详情</a>
                    <a class="btn-danger" href="javascript:">去购物车结算 > </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './font/iconfont.css';
    
    export default {
        name: 'AddCartSuccess',
        computed: {
            productName() {
                return sessionStorage.getItem('productName');
            },
            productChosenAttrs() {
                return sessionStorage.getItem('productChosenAttrs');
            },
            productDefaultImg() {
                return sessionStorage.getItem('productDefaultImg');
            },
        },
        beforeRouteEnter(to, from, next) {
            if (sessionStorage.getItem('productName')) {
                next();
            } else {
                // Redirect to home
                next('/');
            }
        },
        
    };
</script>

<style lang="less" scoped>
    .cart-complete-wrap {
        background-color: #f4f4f4;
        
        .cart-complete {
            width: 1200px;
            margin: 0 auto;
            padding-bottom: 60px;
            
            h3 {
                font-weight: 400;
                font-size: 16px;
                color: #6aaf04;
                padding-top: 15px;
                padding-bottom: 15px;
                margin: 0;
                
                display: flex;
                align-items: center;
                
                .icon-check-circle {
                    padding-right: 10px;
                }
            }
            
            .goods {
                overflow: hidden;
                padding: 10px 0;
                
                display: flex;
                align-items: center;
                justify-content: space-between;
                
                .left-good {
                    float: left;
                    
                    display: flex;
                    align-items: center;
                    
                    .left-pic {
                        border: 1px solid #dfdfdf;
                        width: 60px;
                        float: left;
                        
                        img {
                            width: 60px;
                            height: 60px;
                        }
                    }
                    
                    .right-info {
                        color: #444;
                        float: left;
                        margin-left: 10px;
                        max-width: 750px;
                        
                        .title {
                            width: 100%;
                            line-height: 28px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 14px;
                        }
                        
                        .attr {
                            color: #aaa;
                        }
                    }
                }
                
                .right-go-cart {
                    float: right;
                    
                    a {
                        padding: 7px 36px;
                        font-size: 15px;
                        line-height: 22px;
                        color: #333;
                        background-color: #eee;
                        text-decoration: none;
                        box-sizing: border-box;
                        border: 1px solid #e1e1e1;
                    }
                    
                    a:hover {
                        background-color: #f7f7f7;
                        border: 1px solid #eaeaea;
                    }
                    
                    a:active {
                        background-color: #e1e1e1;
                        border: 1px solid #d5d5d5;
                    }
                    
                    .btn-danger {
                        background-color: #e1251b;
                        color: #fff;
                    }
                    
                    .btn-danger:hover {
                        background-color: #e1251b;
                    }
                }
                
            }
        }
    }
</style>
