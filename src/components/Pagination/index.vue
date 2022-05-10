<template>
    <div class="pagination">
        <button disabled><span class="iconfont icon-arrow-left"></span>上一页</button>
        
        <button class="active">1</button>
        <button>···</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>···</button>
        <button>下一页<span class="iconfont icon-arrow-right"></span></button>
        
        <span class="info">
            <select v-model="curPageSize" class="pageSize">
                <option v-for="size in pageSizes"
                        :key="size"
                        :disabled="size > total"
                        :selected="curPageSize === size"
                        :value="size">
                    每页 {{ size }} 条
                </option>
            </select>
            
            <span class="total-wrap">
                共<span class="total"> {{ totalPages }} </span>页
            </span>
            
            <span class="jump">
                到第
                <input v-model="curPageNo" :placeholder="curPageNo" class="pageNoBox" type="text"
                       @keyup.enter="$emit('changePageNo', curPageNo)"/>
                页
            </span>
        </span>
        
        
        <button @click="$emit('changePageNo', curPageNo)">确定</button>
    </div>
</template>

<script>
    import './font/iconfont.css';
    
    export default {
        name: 'Pagination',
        props: [
            'pageNo',
            'pageSize',
            'total',
            'totalPages',
        ],
        data() {
            return {
                curPageNo: this.pageNo,
                curPageSize: this.pageSize,
                pageSizes: [5, 10, 15, 20],
            };
        },
        watch: {
            curPageSize(newPageSize) {
                this.$emit('changePageSize', newPageSize);
            },
        }
    };
</script>

<style lang="less" scoped>
    .pagination {
        display: flex;
        // 水平居中
        justify-content: center;
        // 垂直居中
        align-items: center;
        
        @WIDTH: 38px;
        @HEIGHT: 38px;
        
        & > * {
            min-width: @WIDTH;
            height: @HEIGHT;
        }
        
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            // min-width: @WIDTH;
            // height: @HEIGHT;
            line-height: @HEIGHT;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;
            color: #606266;
            
            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }
            
            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
        
        .info {
            display: flex;
            align-items: center;
            
            margin-left: 30px;
            
            font-size: 13px;
            color: #606266;
            
            & > * {
                margin-right: 15px;
            }
            
            .pageSize {
                height: @HEIGHT;
                
                text-align: center;
            }
            
            .total-wrap {
                .total {
                    font-weight: bold;
                }
            }
            
            .jump {
                .pageNoBox {
                    box-sizing: border-box;
                    height: @HEIGHT;
                    width: @WIDTH;
                    
                    text-align: center;
                    font-weight: bold;
                }
            }
        }
    }
</style>
