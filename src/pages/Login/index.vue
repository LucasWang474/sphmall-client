<template>
    <div class="login-wrap">
        <div class="login">
            <div class="loginform">
                <ul class="tab clearFix">
                    <li>
                        <a href="javascript:" style="border-right: 0;">扫描登录</a>
                    </li>
                    <li>
                        <a class="current" href="javascript:">账户登录</a>
                    </li>
                </ul>
                
                <div class="content">
                    <form action="javascript:">
                        
                        <div class="input-text clearFix">
                            <i></i>
                            <input v-model.trim.number="phone"
                                   autocomplete name="phone"
                                   placeholder="请输入你的手机号"
                                   type="tel">
                            <span v-show="phone && !phoneReg.test(phone)"
                                  class="error-msg">
                                请输入中国大陆 11 位数字手机号
                            </span>
                        </div>
                        
                        <div class="input-text clearFix">
                            <i class="pwd"></i>
                            <input v-model="password"
                                   autocomplete name="password"
                                   placeholder="请输入你的登录密码"
                                   type="password">
                        </div>
                        
                        <div class="setting clearFix">
                            <label class="checkbox inline">
                                <input checked="" name="m1" type="checkbox" value="2">
                                自动登录
                            </label>
                            <a class="forget" href="javascript:">忘记密码？</a>
                        </div>
                        <button :disabled="!phone || !phoneReg.test(phone) || !password"
                                class="btn" @click="login">
                            登&nbsp;&nbsp;录
                        </button>
                    
                    </form>
                    <div class="call clearFix">
                        <ul>
                            <li><img alt="" src="./images/qq.png"></li>
                            <li><img alt="" src="./images/sina.png"></li>
                            <li><img alt="" src="./images/ali.png"></li>
                            <li><img alt="" src="./images/weixin.png"></li>
                        </ul>
                        <router-link class="register" to="/register">立即注册</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {passwordReg, phoneReg} from '@/utils/aboutUser';
    import {reqLogin} from '@/api';
    
    export default {
        name: 'Login',
        data() {
            return {
                phone: '',
                password: '',
                
                phoneReg,
                passwordReg
            };
        },
        methods: {
            login() {
                reqLogin(this.phone, this.password)
                    .then(response => {
                        if (response.code === 200) {
                            console.log(response);
                            localStorage.setItem('token', response.data.token);
                            alert('登录成功！');
                            this.$router.push('/');
                        } else {
                            throw new Error('登录失败，状态码：' + response.code);
                        }
                    })
                    .catch(() => {
                        alert('登录失败');
                    });
            }
        }
    };
</script>

<style lang="less" scoped>
    .login-wrap {
        height: 487px;
        background-color: #e93854;
        
        .login {
            width: 1200px;
            height: 487px;
            margin: 0 auto;
            background: url(./images/loginbg.png) no-repeat;
            
            .loginform {
                width: 420px;
                height: 406px;
                box-sizing: border-box;
                background: #fff;
                float: right;
                top: 45px;
                position: relative;
                padding: 20px;
                
                .tab {
                    
                    li {
                        width: 50%;
                        float: left;
                        text-align: center;
                        
                        a {
                            width: 100%;
                            display: block;
                            height: 50px;
                            line-height: 50px;
                            font-size: 20px;
                            font-weight: 700;
                            color: #333;
                            border: 1px solid #ddd;
                            box-sizing: border-box;
                            text-decoration: none;
                            
                        }
                        
                        .current {
                            border-bottom: none;
                            border-top-color: #28a3ef;
                            color: #e1251b;
                        }
                    }
                }
                
                .content {
                    width: 380px;
                    height: 316px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    border-top: none;
                    padding: 18px;
                    
                    form {
                        margin: 15px 0 18px 0;
                        font-size: 12px;
                        line-height: 18px;
                        
                        .input-text {
                            margin-bottom: 22px;
                            position: relative;
                            
                            i {
                                float: left;
                                width: 37px;
                                height: 32px;
                                border: 1px solid #ccc;
                                background: url(/images/icons.png) no-repeat -10px -201px;
                                box-sizing: border-box;
                                border-radius: 2px 0 0 2px;
                            }
                            
                            .pwd {
                                background-position: -72px -201px;
                            }
                            
                            input {
                                width: 302px;
                                height: 32px;
                                box-sizing: border-box;
                                border: 1px solid #ccc;
                                border-left: none;
                                float: left;
                                font-size: 14px;
                                line-height: 22px;
                                padding: 6px 8px;
                                
                                border-radius: 0 2px 2px 0;
                                outline: none;
                            }
                            
                            .error-msg {
                                position: absolute;
                                top: 100%;
                                left: 40px;
                                color: red;
                            }
                        }
                        
                        .setting {
                            margin-top: 25px;
                            
                            label {
                                float: left;
                            }
                            
                            .forget {
                                float: right;
                            }
                        }
                        
                        .btn {
                            background-color: #e1251b;
                            padding: 6px;
                            border-radius: 0;
                            font-size: 16px;
                            font-family: 'Microsoft YaHei', serif;
                            word-spacing: 4px;
                            border: 1px solid #e1251b;
                            color: #fff;
                            width: 100%;
                            height: 36px;
                            margin-top: 25px;
                            outline: none;
                        }
                        
                        button {
                            cursor: pointer;
                            
                            &[disabled] {
                                cursor: not-allowed;
                                border: none;
                            }
                        }
                    }
                    
                    .call {
                        margin-top: 30px;
                        
                        ul {
                            float: left;
                            
                            li {
                                float: left;
                                margin-right: 5px;
                            }
                        }
                        
                        .register {
                            float: right;
                            font-size: 15px;
                            line-height: 38px;
                        }
                        
                        .register:hover {
                            color: #4cb9fc;
                            text-decoration: underline;
                        }
                    }
                    
                }
            }
        }
    }
</style>
