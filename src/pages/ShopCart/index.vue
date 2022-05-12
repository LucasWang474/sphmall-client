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
            <div class="cart-body">
                <ul class="cart-list">
                    <li class="cart-list-con1">
                        <input name="chk_list" type="checkbox">
                    </li>
                    <li class="cart-list-con2">
                        <img alt="" src="./images/goods1.png">
                        <div class="item-msg">米家 小米小白智能摄像机增强版 1080p高清360度全景拍摄AI增强</div>
                    </li>
                    <li class="cart-list-con3">
                        <div class="item-txt">语音升级款</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">399.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a class="minus" href="javascript:">-</a>
                        <input autocomplete="off" class="i-txt" type="text" value="1">
                        <a class="plus" href="javascript:">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">399</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="delete" href="javascript:">删除</a>
                        <br>
                        <a href="javascript:">移到收藏</a>
                    </li>
                </ul>
                
                <ul class="cart-list">
                    <li class="cart-list-con1">
                        <input name="chk_list" type="checkbox" value="">
                    </li>
                    <li class="cart-list-con2">
                        <img alt="" src="./images/goods2.png">
                        <div class="item-msg">华为 华为metaPRO 30 浴霸4摄像 超清晰</div>
                    </li>
                    <li class="cart-list-con3">
                        <div class="item-txt">黑色版本</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">5622.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a class="minus" href="javascript:">-</a>
                        <input autocomplete="off" class="i-txt" type="text" value="1">
                        <a class="plus" href="javascript:">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">5622</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="delete" href="javascript:">删除</a>
                        <br>
                        <a href="javascript:">移到收藏</a>
                    </li>
                </ul>
                
                <ul class="cart-list">
                    <li class="cart-list-con1">
                        <input id="" name="chk_list" type="checkbox" value="">
                    </li>
                    <li class="cart-list-con2">
                        <img alt="" src="./images/goods3.png">
                        <div class="item-msg">iphone 11 max PRO 苹果四摄 超清晰 超费电 超及好用</div>
                    </li>
                    <li class="cart-list-con3">
                        <div class="item-txt">墨绿色</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">11399.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a class="minus" href="javascript:">-</a>
                        <input autocomplete="off" class="i-txt" type="text" value="1">
                        <a class="plus" href="javascript:">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">11399</span>
                    </li>
                    <li class="cart-list-con7">
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
                    <input class="chooseAll" type="checkbox">
                </div>
                <div class="option">
                    <a href="javascript:">删除选中的商品</a>
                    <a href="javascript:">移到我的关注</a>
                    <a href="javascript:">清除下柜商品</a>
                </div>
            </div>
            <div class="money-box">
                <div class="chosen">
                    已选择 <span>0</span> 件商品
                </div>
                <div class="sum-price">
                    <em>总价（不含运费）：</em>
                    <i class="sum-money">0</i>
                </div>
                <div class="sum-btn">
                    <a class="sum-btn" href="javascript:">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ShopCart',
    };
</script>

<style lang="less" scoped>
    .cart {
        width: 1200px;
        margin: 0 auto;
        
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
                }
                
                .cart-th1 {
                    width: 4%;
                    text-align: center;
                    
                    input {
                        vertical-align: middle;
                    }
                    
                    span {
                        vertical-align: middle;
                    }
                }
                
                .cart-th2 {
                    width: 46%;
                    text-align: center;
                }
                
                .cart-th3,
                .cart-th4,
                .cart-th5,
                .cart-th6 {
                    width: 12.5%;
                    text-align: center;
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
                        width: 4.1667%;
                    }
                    
                    .cart-list-con2 {
                        width: 25%;
                        
                        display: flex;
                        align-items: center;
                        
                        img {
                            width: 82px;
                            height: 82px;
                            float: left;
                        }
                        
                        .item-msg {
                            float: left;
                            width: 150px;
                            margin: 0 10px;
                            line-height: 18px;
                            
                            text-align: left;
                        }
                    }
                    
                    .cart-list-con3 {
                        width: 20.8333%;
                        
                        .item-txt {
                            text-align: center;
                        }
                    }
                    
                    .cart-list-con4 {
                        width: 12.5%;
                        
                        text-align: center;
                        
                    }
                    
                    .cart-list-con5 {
                        width: 12.5%;
                        display: flex;
                        justify-content: center;
                        
                        a {
                            text-decoration: none;
                        }
                        
                        a:hover {
                            color: #e1251b !important;
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
                        
                    }
                    
                    .cart-list-con6 {
                        width: 12.5%;
                        
                        .sum {
                            font-size: 16px;
                        }
                    }
                    
                    .cart-list-con7 {
                        width: 12.5%;
                        
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
                    padding: 5px 3px;
                    overflow: hidden;
                    
                    display: flex;
                    text-align: center;
                    align-items: center;
                    
                    input {
                        vertical-align: middle;
                        margin-right: 5px;
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
