<template>
    <div class="pay-success">
        
        <div class="success">
            <h3>
                <img alt="" src="./images/right.png">
                恭喜您，支付成功啦！
            </h3>
            <div class="pay-detail">
                <p class="button">
                    <router-link class="btn-look" to="/center">查看订单</router-link>
                    <router-link class="btn-go-shop" to="/">继续购物</router-link>
                </p>
            </div>
        </div>
    
    </div>
</template>

<script>
    export default {
        name: 'PaySuccess',
    };
</script>

<style lang="less" scoped>
    .pay-success {
        margin: 20px auto;
        padding: 25px;
        border: 1px solid rgb(211, 211, 211);
        width: 1148px;
        
        .success {
            width: 500px;
            margin: 0 auto;
            
            h3 {
                margin: 20px 0;
                font-weight: 700;
                font-size: 20px;
                line-height: 30px;
                
                display: flex;
                align-items: center;
                justify-content: center;
                
                img {
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                    margin-right: 14px;
                }
            }
            
            .pay-detail {
                font-size: 15px;
                
                display: flex;
                align-items: center;
                justify-content: center;
                
                .button {
                    margin: 30px 0;
                    line-height: 26px;
                    
                    a {
                        display: inline-block;
                        box-sizing: border-box;
                        text-align: center;
                        vertical-align: middle;
                        cursor: pointer;
                        border-radius: 2px;
                        user-select: none;
                        font-size: 18px;
                        padding: 4px 20px;
                        line-height: 22px;
                        text-decoration: none;
                        
                        &.btn-look {
                            margin-right: 13px;
                            color: #fff;
                            background-color: #e1251b;
                            border: 1px solid #e1251b;
                        }
                        
                        &.btn-go-shop {
                            color: #666;
                            background-color: #eee;
                            border: 1px solid #e1e1e1;
                        }
                    }
                }
            }
        }
    }
</style>
