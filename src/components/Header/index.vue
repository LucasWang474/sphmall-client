<template>
    <header>
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div v-if="!isLoggedIn" class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p>
                        <span>请 </span>
                        <router-link class="implemented" to="/login">登录</router-link>
                        <router-link class="register implemented" to="/register">免费注册</router-link>
                    </p>
                </div>
                
                <div v-else class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p>
                        <span>{{ userInfo.name }}</span>
                        <span> | </span>
                        <a class="implemented" href="javascript:" @click="logout">退出</a>
                    </p>
                </div>
                
                <div class="typeList">
                    <router-link class="implemented" to="/center">我的订单</router-link>
                    <router-link class="implemented" to="/shopCart">我的购物车</router-link>
                    <a href="javascript:">我的尚品汇</a>
                    <a href="javascript:">尚品汇会员</a>
                    <a href="javascript:">企业采购</a>
                    <a href="javascript:">关注尚品汇</a>
                    <a href="javascript:">合作招商</a>
                    <a href="javascript:">商家后台</a>
                </div>
            </div>
        </div>
        
        <!-- 头部第二行 搜索区域 -->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="尚品汇" to="/">
                    <img alt="" src="./images/logo.png">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="javascript:" class="searchForm">
                    <input id="autocomplete" ref="searchBox" v-model.lazy.trim="keyword"
                           class="input-error input-xxlarge"
                           type="text" @keyup.enter="searchByKeyword"/>
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="searchByKeyword">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                keyword: '',
            };
        },
        computed: {
            userInfo() {
                return this.$store.state.user.userInfo;
            },
            isLoggedIn() {
                return this.userInfo;
            },
        },
        methods: {
            searchByKeyword() {
                if (this.keyword) {
                    this.$router.push({
                        path: '/search',
                        query: {
                            keyword: this.keyword,
                        },
                    });
                    this.$refs.searchBox.blur();
                } else {
                    this.$router.push('/search');
                }
            },
            
            logout() {
                this.$store.dispatch('logout').then(
                    () => {
                        this.$router.push('/');
                    },
                    () => {
                        this.$message.error('退出失败，请重试');
                    },
                );
            }
        },
        mounted() {
            this.$bus.$on('updateSearchBoxKeyword', (newKeyword) => {
                this.keyword = newKeyword;
            });
        }
    };
</script>

<style lang="less" scoped>
    .implemented {
        color: #ea4a36;
    }
    
    
    header {
        & > .top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;
            
            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;
                
                .loginList {
                    float: left;
                    
                    p {
                        float: left;
                        margin-right: 10px;
                        
                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }
                
                .typeList {
                    float: right;
                    
                    a {
                        padding: 0 10px;
                        
                        & + a {
                            border-left: 1px solid #b3aeae;
                        }
                    }
                    
                }
                
            }
        }
        
        & > .bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            
            .logoArea {
                float: left;
                
                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }
            
            .searchArea {
                float: right;
                margin-top: 35px;
                
                .searchForm {
                    overflow: hidden;
                    
                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0 4px;
                        border: 2px solid #ea4a36;
                        float: left;
                        
                        &:focus {
                            outline: none;
                        }
                    }
                    
                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;
                        
                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>
