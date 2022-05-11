<template>
    <div ref="pagination" class="pagination">
        <button :disabled="curPageNo === 1" @click="curPageNo -= 1">
            <span class="iconfont icon-arrow-left"></span>上一页
        </button>
        
        <!--数字按钮 开始-->
        <button v-for="(val, index) in paginationNumbers"
                :key="`${val}:${index}`"
                :class="{
                    'active': +val === +curPageNo,
                    'dots': val === '...',
                    'page-number': Number.isInteger(+val)
                }">
            {{ val }}
        </button>
        <!--数字按钮 结束-->
        
        <button :disabled="curPageNo === totalPages" @click="curPageNo += 1">
            下一页<span class="iconfont icon-arrow-right"></span>
        </button>
        
        <span class="info">
            <select v-model="curPageSize" class="pageSize">
                <option v-for="size in allPageSizes"
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
                <input ref="pageNoBox" v-model.lazy.number="curPageNo" :placeholder="curPageNo"
                       class="pageNoBox" type="text"
                       @keyup.enter="changePageNo(curPageNo)"/>
                页
            </span>
        </span>
        <button @click="changePageNo(curPageNo)">确定</button>
    </div>
</template>

<script>
    import './font/iconfont.css';
    
    export default {
        name: 'Pagination',
        props: {
            pageNo: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            },
            total: {
                type: Number,
                default: 0
            },
            totalPages: {
                type: Number,
                default: 1
            },
            maxVisibleNumberButtons: {
                type: Number,
                default: 7,
            },
            changePageNo: {
                type: Function,
                required: true
            },
            changePageSize: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                curPageNo: +this.pageNo,
                curPageSize: +this.pageSize,
                allPageSizes: [5, 10, 15, 20],
            };
        },
        computed: {
            paginationNumbers() {
                // 左侧页码数组
                // 左侧数组长度取最大页码数的 1/3，取偶数
                const toEven = (num) => num % 2 === 0 ? num : num - 1;
                const LEFT_LENGTH = toEven(Math.trunc(this.maxVisibleNumberButtons / 3));
                
                // Special case
                if (this.curPageNo <= (this.maxVisibleNumberButtons - LEFT_LENGTH) ||
                    this.totalPages <= this.maxVisibleNumberButtons) {
                    const LENGTH = Math.min(this.totalPages, this.maxVisibleNumberButtons);
                    const res = [];
                    for (let i = 1; i <= LENGTH; i++) {
                        res.push(i);
                    }
                    return res;
                }
                
                const left = [];
                for (let i = 1; i <= LEFT_LENGTH; i++) {
                    left.push(i);
                }
                
                
                // 右侧页码数组
                const RIGHT_LENGTH = this.maxVisibleNumberButtons - LEFT_LENGTH;
                const STEP = Math.floor(RIGHT_LENGTH / 2);
                const right = [];
                for (let i = this.curPageNo - STEP; i <= this.curPageNo + STEP; i++) {
                    right.push(i);
                }
                
                // 去除不合法页码，过小数字
                while (right[0] <= left[LEFT_LENGTH - 1]) {
                    right.shift();
                    right.push(right[RIGHT_LENGTH - 1] + 1);
                }
                // 去除不合法页码，过大数字
                while (right[RIGHT_LENGTH - 1] > this.totalPages) {
                    right.pop();
                    right.unshift(right[0] - 1);
                }
                
                if ((left[LEFT_LENGTH - 1] + 1) < right[0]) {
                    left.push('...');
                }
                if (right[RIGHT_LENGTH - 1] < this.totalPages) {
                    right.push('...');
                }
                
                return [...left, ...right];
            },
        },
        watch: {
            pageNo(newPageNo) {
                this.curPageNo = +newPageNo;
            },
            curPageSize(newPageSize) {
                this.changePageSize(newPageSize);
            },
            curPageNo(newPageNo) {
                if (Number.isInteger(newPageNo)
                    && newPageNo <= this.totalPages
                    && newPageNo >= 1) {
                    this.changePageNo(newPageNo);
                } else {
                    this.curPageNo = +this.pageNo;
                }
            }
        },
        methods: {
            initButtonClickEvent() {
                this.$refs.pagination.addEventListener('click', (event) => {
                    const target = event.target;
                    if (target.classList.contains('page-number')) {
                        const newPageNo = +target.innerText;
                        if (newPageNo !== this.pageNo) {
                            this.curPageNo = newPageNo;
                        }
                    }
                });
            }
        },
        mounted() {
            this.initButtonClickEvent();
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
            line-height: @HEIGHT;
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
            // line-height: @HEIGHT;
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
                // cursor: not-allowed;
                cursor: default;
                background-color: #409eff;
                color: #fff;
            }
            
            &.dots {
                cursor: default;
                background: #fff;
            }
            
            &:not([disabled], .dots):hover {
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
