<template>
    <div class="clearfix selector">
        <!--trademarks START-->
        <div class="type-wrap logo">
            <div class="fl key brand">品牌</div>
            
            <div class="value logos">
                <ul ref="logoList" class="logo-list">
                    <li v-for="trademark in searchResults.trademarkList" :key="trademark.tmId"
                        :data-id="trademark.tmId" :data-name="trademark.tmName">
                        {{ trademark.tmName }}
                    </li>
                </ul>
            </div>
            
            <div class="ext">
                <a class="sui-btn" href="javascript:">多选</a>
                <a href="javascript:">更多</a>
            </div>
        </div>
        <!--trademarks END-->
        
        <!--attributes START-->
        <div v-for="attr in searchResults.attrsList" :key="attr.attrId" class="type-wrap">
            <div class="fl key">{{ attr.attrName }}</div>
            <div class="fl value">
                <ul class="type-list">
                    <li v-for="attrValue in attr.attrValueList" :key="attrValue">
                        <a @click.prevent="addAttr(`${attr.attrId}:${attrValue}:${attr.attrName}`)">
                            {{ attrValue }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="fl ext"></div>
        </div>
        <!--attributes END-->
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    
    export default {
        name: 'SearchSelector',
        computed: {
            ...mapState({
                searchResults: state => state.search.searchResults,
            }),
        },
        mounted() {
            this.$refs.logoList.addEventListener('click', ({target}) => {
                if (target.tagName === 'LI') {
                    const trademark = `${target.dataset.id}:${target.dataset.name}`;
                    this.$emit('updateTrademark', trademark);
                }
            });
        },
        methods: {
            addAttr(attr) {
                this.$emit('updateAttrProps', attr);
            },
        }
    };
</script>

<style lang="less" scoped>
    .selector {
        border: 1px solid #ddd;
        margin-bottom: 5px;
        overflow: hidden;
        
        .logo {
            border-top: 0;
            margin: 0;
            position: relative;
            overflow: hidden;
            
            .key {
                padding-bottom: 87px !important;
            }
        }
        
        .type-wrap {
            margin: 0;
            position: relative;
            border-top: 1px solid #ddd;
            overflow: hidden;
            
            .key {
                width: 100px;
                background: #f1f1f1;
                line-height: 26px;
                text-align: right;
                padding: 10px 10px 0 15px;
                float: left;
            }
            
            .value {
                overflow: hidden;
                color: #333;
                margin-left: 120px;
                padding: 10px 90px 0 15px;
                
                .logo-list {
                    li {
                        float: left;
                        border: 1px solid #e4e4e4;
                        margin: -1px -1px 0 0;
                        width: 105px;
                        height: 52px;
                        text-align: center;
                        line-height: 52px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 700;
                        color: #e1251b;
                        font-style: italic;
                        font-size: 14px;
                        
                        img {
                            max-width: 100%;
                            vertical-align: middle;
                        }
                    }
                }
                
                .type-list {
                    li {
                        float: left;
                        display: block;
                        margin-right: 30px;
                        line-height: 26px;
                        
                        a {
                            text-decoration: none;
                            color: #666;
                        }
                    }
                }
            }
            
            .ext {
                position: absolute;
                top: 10px;
                right: 10px;
                
                .sui-btn {
                    display: inline-block;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    padding: 0 10px;
                    background: #fff;
                    border: 1px solid #d5d5d5;
                }
                
                a {
                    color: #666;
                }
            }
        }
    }
</style>
