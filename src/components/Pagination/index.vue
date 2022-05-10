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
                       @keyup.enter="changePageNo"/>
                页
            </span>
        </span>
        <button @click="changePageNo">确定</button>
    </div>
</template>

<script>
    import './font/iconfont.css';
    
    export default {
        name: 'Pagination',
        props: ['pageNo', 'pageSize', 'total', 'totalPages'],
        data() {
            return {
                allPageSizes: [5, 10, 15, 20],
                
                curPageNo: +this.pageNo,
                curPageSize: +this.pageSize,
                
                // 最大可见页码数，强烈建议为奇数
                maxVisibleNumberButtons: 7,
            };
        },
        computed: {
            paginationNumbers() {
                return this.getPaginationNumbers(
                    this.curPageNo,
                    this.totalPages,
                    this.maxVisibleNumberButtons,
                );
            }
        },
        watch: {
            curPageSize(newPageSize) {
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        pageSize: newPageSize,
                    }
                });
            },
            curPageNo(newPageNo) {
                if (Number.isInteger(newPageNo)
                    && newPageNo <= this.totalPages
                    && newPageNo >= 1) {
                    this.changePageNo();
                } else {
                    this.curPageNo = this.pageNo;
                }
            }
        },
        methods: {
            changePageNo() {
                if (this.curPageNo !== this.pageNo) {
                    this.$router.replace({
                        path: this.$route.path,
                        query: {
                            ...this.$route.query,
                            pageNo: this.curPageNo,
                        }
                    });
                }
            },
            getPaginationNumbers(curPageNo, totalPages, maxVisibleNumberButtons) {
                // 写这个函数用了我一个小时
                
                // 左侧页码数组
                // 左侧数组长度取最大页码数的 1/3，取偶数
                const toEven = (num) => num % 2 === 0 ? num : num - 1;
                const LEFT_LENGTH = toEven(Math.trunc(maxVisibleNumberButtons / 3));
                
                // Special case
                if (curPageNo <= (maxVisibleNumberButtons - LEFT_LENGTH) ||
                    totalPages <= maxVisibleNumberButtons) {
                    const LENGTH = Math.min(totalPages, maxVisibleNumberButtons);
                    if (LENGTH >= 8) {
                        alert('警告：页码数量过多，请调整页码数量');
                    }
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
                const RIGHT_LENGTH = maxVisibleNumberButtons - LEFT_LENGTH;
                const STEP = Math.floor(RIGHT_LENGTH / 2);
                const right = [];
                for (let i = curPageNo - STEP; i <= curPageNo + STEP; i++) {
                    right.push(i);
                }
                
                // 去除不合法页码，过小数字
                while (right[0] <= left[LEFT_LENGTH - 1]) {
                    right.shift();
                    right.push(right[RIGHT_LENGTH - 1] + 1);
                }
                // 去除不合法页码，过大数字
                while (right[RIGHT_LENGTH - 1] > totalPages) {
                    right.pop();
                    right.unshift(right[0] - 1);
                }
                
                if ((left[LEFT_LENGTH - 1] + 1) < right[0]) {
                    left.push('...');
                }
                if (right[RIGHT_LENGTH - 1] < totalPages) {
                    right.push('...');
                }
                
                return [...left, ...right];
            },
            
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
