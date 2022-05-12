<template>
    <div class="cart">
        <h4>全部商品</h4>
        
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            
            <div ref="cartBody" class="cart-body">
                <ul v-for="productInfo in cartList" :key="productInfo.id"
                    :data-product-id="productInfo.skuId" class="cart-list">
                    <li class="cart-list-con1">
                        <input :checked="+productInfo.isChecked" name="chk_list"
                               type="checkbox"
                               @change="toggleIsChecked(productInfo.skuId)"/>
                    </li>
                    <li class="cart-list-con2">
                        <img :src="productInfo.imgUrl" alt="">
                        <div class="item-msg">{{ productInfo.skuName }}</div>
                    </li>
                    <li class="cart-list-con3">
                        <span class="price">{{ productInfo.skuPrice }}</span>
                    </li>
                    <li class="cart-list-con4">
                        <a :class="{disabled: productInfo.skuNum <= 1}" class="minus"
                           href="javascript:"
                           @click="addToCart(productInfo.skuId, productInfo.skuNum, -1)">
                            -
                        </a>
                        <input :value="productInfo.skuNum" autocomplete="off" class="i-txt" type="text"
                               @change="handleBuyNumChange($event, productInfo.skuId, productInfo.skuNum)">
                        <a class="plus" href="javascript:"
                           @click="addToCart(productInfo.skuId, productInfo.skuNum, 1)">
                            +
                        </a>
                    </li>
                    <li class="cart-list-con5">
                        <span class="sum">
                            {{ productInfo.skuPrice * productInfo.skuNum }}
                        </span>
                    </li>
                    <li class="cart-list-con6">
                        <a class="delete" href="javascript:">删除</a>
                        <br>
                        <a href="javascript:">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="cart-tool">
            <div class="wrap">
                <div class="select-all">
                    <span>全选&nbsp;</span>
                    <input v-model="allChecked" class="chooseAll" type="checkbox">
                </div>
                <div class="option">
                    <a href="javascript:">删除选中的商品</a>
                    <a href="javascript:">移到我的关注</a>
                    <a href="javascript:">清除下柜商品</a>
                </div>
            </div>
            <div class="money-box">
                <div class="chosen">
                    已选择 <span>{{ checkedNum }}</span> 件商品
                </div>
                <div class="sum-price">
                    <em>总价（不含运费）：</em>
                    <i class="sum-money">{{ totalPrice }}</i>
                </div>
                <div class="sum-btn">
                    <a class="sum-btn" href="javascript:">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {throttle} from 'lodash';
    
    export default {
        name: 'ShopCart',
        computed: {
            cartList() {
                return this.$store.state.cart.cartList;
            },
            allChecked: {
                get() {
                    return this.cartList.every(item => item.isChecked);
                },
                set(value) {
                    this.cartList.forEach(item => {
                        if (+item.isChecked !== +value) {
                            this.toggleIsChecked(item.skuId);
                        }
                    });
                }
            },
            checkedNum() {
                return this.cartList
                    .filter(item => item.isChecked)
                    .reduce((total, item) => total + item.skuNum, 0);
            },
            totalPrice() {
                return this.cartList.reduce((total, item) => {
                    return total + item.skuPrice * item.skuNum;
                }, 0);
            },
        },
        methods: {
            handleBuyNumChange({target}, productId, oldBuyNum) {
                const newBuyNum = Number(target.value);
                if (Number.isInteger(newBuyNum) && newBuyNum > 0 && newBuyNum !== oldBuyNum) {
                    const diff = newBuyNum - oldBuyNum;
                    this.addToCart(productId, oldBuyNum, diff);
                    target.value = newBuyNum;
                } else {
                    target.value = oldBuyNum;
                }
            },
            
            addToCart: throttle(function (productId, oldBuyNum, buyNum) {
                if (this.lock) {
                    return;
                }
                
                this.lock = true;
                if (buyNum === -1 && oldBuyNum <= 1) {
                    this.lock = false;
                    return;
                }
                this.$store.dispatch('addToCart', {
                    productId,
                    buyNum,
                }).finally(() => {
                    this.lock = false;
                });
            }, 500),
            
            toggleIsChecked: function (productId) {
                this.$store.dispatch('toggleIsChecked', productId);
            },
        },
        mounted() {
            this.$store.dispatch('updateCartList');
        }
    };
</script>

<style lang="less" scoped>
    .cart {
        width: 1200px;
        margin: 0 auto 50px;
        
        h4 {
            margin: 9px 0;
            font-size: 14px;
            line-height: 21px;
        }
        
        .cart-main {
            .cart-th {
                background: #f5f5f5;
                border: 1px solid #ddd;
                padding: 10px;
                overflow: hidden;
                
                & > div {
                    float: left;
                    text-align: center;
                }
                
                .cart-th1 {
                    width: 5%;
                    
                    input {
                        vertical-align: middle;
                    }
                    
                    span {
                        vertical-align: middle;
                    }
                }
                
                .cart-th2 {
                    width: 35%;
                }
                
                .cart-th3,
                .cart-th4,
                .cart-th5,
                .cart-th6 {
                    width: 15%;
                }
            }
            
            .cart-body {
                margin: 15px 0;
                border: 1px solid #ddd;
                
                .cart-list {
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    overflow: hidden;
                    
                    display: flex;
                    align-items: center;
                    
                    > * {
                        text-align: center;
                    }
                    
                    
                    & > li {
                        float: left;
                    }
                    
                    .cart-list-con1 {
                        width: 5%;
                        
                        input {
                            width: 16px;
                            height: 16px;
                        }
                    }
                    
                    .cart-list-con2 {
                        width: 35%;
                        
                        display: flex;
                        align-items: center;
                        
                        img {
                            width: 82px;
                            height: 82px;
                            float: left;
                        }
                        
                        .item-msg {
                            float: left;
                            // width: 150px;
                            width: calc(100% - 82px);
                            margin: 0 10px;
                            line-height: 18px;
                            
                            text-align: left;
                        }
                    }
                    
                    .cart-list-con3,
                    .cart-list-con4,
                    .cart-list-con5,
                    .cart-list-con6 {
                        width: 15%;
                    }
                    
                    
                    .cart-list-con4 {
                        display: flex;
                        justify-content: center;
                        
                        a {
                            text-decoration: none;
                        }
                        
                        .minus {
                            border: 1px solid #ddd;
                            border-right: 0;
                            float: left;
                            color: #666;
                            width: 6px;
                            text-align: center;
                            padding: 8px;
                        }
                        
                        input {
                            border: 1px solid #ddd;
                            width: 40px;
                            height: 31.5px;
                            float: left;
                            text-align: center;
                            font-size: 14px;
                        }
                        
                        .plus {
                            border: 1px solid #ddd;
                            border-left: 0;
                            float: left;
                            color: #666;
                            width: 6px;
                            text-align: center;
                            padding: 8px;
                        }
                        
                        .disabled {
                            cursor: not-allowed;
                        }
                        
                    }
                    
                    .cart-list-con5 {
                        .sum {
                            font-size: 16px;
                        }
                    }
                    
                    .cart-list-con6 {
                        a {
                            color: #666;
                        }
                    }
                }
            }
        }
        
        .cart-tool {
            overflow: hidden;
            border: 1px solid #ddd;
            
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            .wrap {
                display: flex;
                align-items: center;
                
                .select-all {
                    width: 60px;
                    overflow: hidden;
                    
                    display: flex;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                    
                    input {
                        vertical-align: middle;
                        margin-right: 5px;
                        
                        width: 16px;
                        height: 16px;
                    }
                    
                    span {
                        vertical-align: middle;
                    }
                }
                
                .option {
                    padding: 10px;
                    overflow: hidden;
                    
                    a {
                        float: left;
                        padding: 0 10px;
                        color: #666;
                    }
                }
            }
            
            .money-box {
                display: flex;
                align-items: center;
                
                .chosen {
                    line-height: 26px;
                    float: left;
                    padding: 0 10px;
                }
                
                .sum-price {
                    width: 200px;
                    line-height: 22px;
                    float: left;
                    padding: 0 10px;
                    
                    display: flex;
                    align-items: center;
                    
                    .sum-money {
                        color: #c81623;
                        font-size: 16px;
                    }
                }
                
                .sum-btn {
                    float: right;
                    
                    a {
                        display: block;
                        position: relative;
                        width: 96px;
                        height: 52px;
                        line-height: 52px;
                        color: #fff;
                        text-align: center;
                        font-size: 18px;
                        font-family: 'Microsoft YaHei', sans-serif;
                        background: #e1251b;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>
