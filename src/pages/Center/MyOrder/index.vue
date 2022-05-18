<template>
    <!-- 右侧内容 -->
    <div class="order-right">
        <!--我的所有订单-->
        <div class="order-content">
            <div class="title">
                <h3>我的订单</h3>
            </div>
            <div class="chose-type">
                <table>
                    <thead>
                        <tr>
                            <th>商品</th>
                            <th>订单详情</th>
                            <th>收货人</th>
                            <th>金额</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            
            <div class="orders">
                <table v-for="orderInfo in orderList" :key="orderInfo.id" class="order-item">
                    <thead>
                        <tr>
                            <th colspan="5">
                                <span class="order-title">
                                    {{ orderInfo.createTime }}
                                    订单编号：{{ orderInfo.outTradeNo }}
                                    <span class="pull-right delete">
                                        <img alt="" src="./images/delete.png">
                                    </span>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr>
                            <td>
                                <div class="typographic">
                                    <img :src="orderInfo.orderDetailList[0].imgUrl" alt="">
                                    <a class="block-text" href="javascript:">
                                        {{ orderInfo.orderDetailList[0].skuName }}
                                    </a>
                                    <span>x {{ orderInfo.orderDetailList[0].skuNum }}</span>
                                    <a class="service" href="javascript:">售后申请</a>
                                </div>
                            </td>
                            
                            <td :rowspan="orderInfo.orderDetailList.length" class="center">
                                {{ orderInfo.consignee }}
                            </td>
                            <td :rowspan="orderInfo.orderDetailList.length" class="center">
                                <ul class="unstyled">
                                    <li>总金额 ¥ {{ orderInfo.totalAmount }}</li>
                                    <li>在线支付</li>
                                </ul>
                            </td>
                            <td :rowspan="orderInfo.orderDetailList.length" class="center">
                                <a class="btn" href="javascript:">
                                    {{ orderInfo.orderStatusName }}
                                </a>
                            </td>
                            <td :rowspan="orderInfo.orderDetailList.length" class="center">
                                <ul class="unstyled">
                                    <li>
                                        <a href="javascript:">评价|晒单</a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        
                        <tr v-for="orderDetail in orderInfo.orderDetailList.slice(1)" :key="orderDetail.id">
                            <td>
                                <div class="typographic">
                                    <img :src="orderDetail.imgUrl" alt="">
                                    <a class="block-text" href="javascript:">
                                        {{ orderDetail.skuName }}
                                    </a>
                                    <span>x {{ orderDetail.skuNum }}</span>
                                    <a class="service" href="javascript:">售后申请</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="choose-order">
                <Pagination
                    :changePageNo="changePageNo"
                    :changePageSize="changePageSize"
                    :pageNo="pageNo"
                    :pageSize="pageSize"
                    :total="total"
                />
            </div>
        </div>
        
        <!--猜你喜欢-->
        <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
                <li class="likeItem">
                    <div class="p-img">
                        <img alt="" src="./images/itemlike01.png"/>
                    </div>
                    <div class="attr">
                        <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>3699.00</i>
                    </div>
                    <div class="commit">已有6人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img alt="" src="./images/itemlike02.png"/>
                    </div>
                    <div class="attr">
                        Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4388.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img alt="" src="./images/itemlike03.png"/>
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img alt="" src="./images/itemlike04.png"/>
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    
    export default {
        name: 'MyOrder',
        computed: {
            ...mapGetters(['pageNo', 'pageSize', 'total']),
            
            orderList() {
                return this.$store.state.center.orderList;
            },
        },
        methods: {
            changePageNo(newPageNo) {
                this.$store.dispatch('getAllOrdersInfo', {
                    pageNo: newPageNo,
                    pageSize: this.pageSize,
                });
            },
            
            changePageSize(newPageSize) {
                this.$store.dispatch('getAllOrdersInfo', {
                    pageNo: this.pageNo,
                    pageSize: newPageSize,
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    .order-right {
        float: right;
        width: 83.33%;
        
        .order-content {
            margin: 0 20px;
            color: #666;
            
            //标题
            .title {
                margin-bottom: 22px;
                border: 1px solid #ddd;
                
                h3 {
                    padding: 12px 10px;
                    font-size: 15px;
                    background-color: #f1f1f1;
                    
                }
            }
            
            //表头
            .chose-type {
                margin-bottom: 15px;
                color: #666;
                
                table {
                    border: 1px solid #e6e6e6;
                    border-collapse: separate;
                    border-radius: 2px;
                    width: 100%;
                    max-width: 100%;
                    border-spacing: 0;
                    
                    th {
                        padding: 6px 8px;
                        color: #666;
                        font-weight: 700;
                        vertical-align: bottom;
                        background-color: #f4f4f4;
                        line-height: 18px;
                        border-bottom: 1px solid #e6e6e6;
                        font-size: 12px;
                        text-align: left;
                    }
                }
            }
            
            // 表单内容
            .orders {
                font-size: 12px;
                
                a {
                    &:hover {
                        color: #4cb9fc;
                    }
                }
                
                table {
                    border: 1px solid #e6e6e6;
                    border-collapse: collapse;
                    border-radius: 2px;
                    width: 100%;
                    margin-bottom: 18px;
                    max-width: 100%;
                    
                    th {
                        padding: 6px 8px;
                        line-height: 18px;
                        text-align: left;
                        vertical-align: bottom;
                        background-color: #f4f4f4;
                        font-size: 12px;
                        color: #666;
                        
                        .pull-right {
                            float: right;
                            cursor: pointer;
                            
                            img {
                                margin-right: 10px;
                                vertical-align: middle;
                            }
                        }
                    }
                    
                    td {
                        font-size: 12px;
                        color: #666;
                        padding: 6px 8px;
                        line-height: 18px;
                        text-align: left;
                        vertical-align: middle;
                        border: 1px solid #e6e6e6;
                        
                        &.center {
                            text-align: center;
                        }
                        
                        .typographic {
                            display: flex;
                            align-items: center;
                            
                            img {
                                float: left;
                                margin-right: 10px;
                                
                                width: 82px;
                                height: 82px;
                            }
                            
                            a {
                                float: left;
                                min-width: 80px;
                                max-width: 250px;
                                color: #e1251b;
                                
                                &.service {
                                    color: #666;
                                }
                            }
                            
                            span {
                                float: left;
                                min-width: 80px;
                                max-width: 250px;
                                text-align: center;
                            }
                        }
                    }
                    
                }
            }
            
            // 分页
            .choose-order {
                .pagination {
                    margin: 38px 0;
                    
                    ul {
                        font-size: 0;
                        display: inline-block;
                        
                        li {
                            display: inline-block;
                            padding: 4px 9px;
                            font-size: 14px;
                            border: 1px solid #e0e9ee;
                            
                            &.prev,
                            &.next {
                                background-color: #fafafa;
                            }
                            
                            &.prev {
                                border-right-color: #28a3ef;
                            }
                        }
                    }
                    
                    div {
                        display: inline-block;
                        font-size: 14px;
                        color: #333;
                    }
                }
            }
        }
        
        // 猜你喜欢
        .like {
            border: 1px solid #ddd;
            margin: 15px 20px;
            
            .kt {
                border-bottom: 1px solid #ddd;
                background: #f1f1f1;
                color: #666;
                margin: 0;
                padding: 12px;
                font-size: 15px;
            }
            
            .like-list {
                padding: 15px 11px;
                overflow: hidden;
                
                .likeItem {
                    width: 25%;
                    float: left;
                    
                    .p-img {
                        text-align: left;
                        
                        img {
                            width: 167px;
                            height: 123px;
                        }
                    }
                    
                    .attr {
                        padding: 0 15px;
                    }
                    
                    .price {
                        padding: 0 15px;
                        font-size: 16px;
                        color: #c81623;
                        margin-bottom: 20px;
                    }
                    
                    .commit {
                        padding: 0 15px;
                    }
                }
            }
        }
    }
</style>
