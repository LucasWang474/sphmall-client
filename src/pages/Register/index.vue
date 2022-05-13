<template>
    <div class="register">
        <h3>注册新用户
            <span class="go">
                我已有账号，去
                <router-link to="/login">登陆</router-link>
            </span>
        </h3>
        <div class="content">
            <label>手机号:</label>
            <input v-model.trim.number="phone"
                   autocomplete name="phone"
                   placeholder="请输入你的手机号"
                   type="tel">
            <span v-show="phone && !phoneReg.test(phone)"
                  class="error-msg">
                请输入中国大陆 11 位数字手机号
            </span>
        </div>
        <div class="content">
            <label>验证码:</label>
            <input v-model="captcha" placeholder="请点击右侧按钮自动获取验证码" type="text">
            <button class="getCaptcha" @click="getCaptcha">获取验证码</button>
        </div>
        <div class="content">
            <label>登录密码:</label>
            <input v-model="password"
                   autocomplete name="password"
                   placeholder="请输入你的登录密码"
                   type="password">
            <span v-show="password && !passwordReg.test(password)"
                  class="error-msg">
                请输入密码，长度至少为 9 位，必须包括且只能包括大小写字母和数字
            </span>
        </div>
        <div class="content">
            <label>确认密码:</label>
            <input v-model="passwordAgain" placeholder="请输入确认密码" type="password">
            <span v-show="password && passwordAgain && password !== passwordAgain"
                  class="error-msg">
                当前密码和上密码不一致
            </span>
        </div>
        <div class="controls">
            <input v-model="confirmation" name="m1" type="checkbox">
            <a href="javascript:">&nbsp;同意协议并注册《尚品汇用户协议》</a>
        </div>
        <div class="btn">
            <button :disabled="!readyToRegister"
                    @click="register">
                注册
            </button>
        </div>
    </div>
</template>

<script>
    import {passwordReg, phoneReg} from '@/utils/aboutUser';
    import {reqGetCaptcha, reqRegister} from '@/api';
    
    export default {
        name: 'Register',
        data() {
            return {
                phone: '',
                captcha: '',
                password: '',
                passwordAgain: '',
                confirmation: false,
                
                registeredPhones: JSON.parse(localStorage.getItem('registeredPhones')) || [],
                
                phoneReg,
                passwordReg
            };
        },
        computed: {
            readyToRegister() {
                return this.phoneReg.test(this.phone) &&
                    this.passwordReg.test(this.password) &&
                    this.password === this.passwordAgain &&
                    this.captcha &&
                    this.confirmation;
            },
        },
        methods: {
            register() {
                if (this.isRegistered()) {
                    alert('该手机号已注册，请直接登录');
                    return;
                }
                
                if (!this.readyToRegister) {
                    alert('请填写完整信息');
                    return;
                }
                
                const userInfo = {
                    phone: this.phone,
                    password: this.password,
                    code: this.captcha
                };
                
                reqRegister(userInfo)
                    .then(res => {
                        if (res.code === 200) {
                            this.savePhone();
                            if (confirm('注册成功，是否立即登录？')) {
                                this.$router.push('/login');
                            }
                        } else {
                            throw new Error(res.msg);
                        }
                    })
                    .catch(() => {
                        alert('注册失败，请稍后重试（可能是该手机已被注册）');
                    });
            },
            isRegistered() {
                return this.registeredPhones.includes(this.phone);
            },
            savePhone() {
                this.registeredPhones.push(this.phone);
                localStorage.setItem('registeredPhones', JSON.stringify(this.registeredPhones));
            },
            getCaptcha() {
                if (!this.phone) {
                    alert('请先输入手机号');
                    return;
                }
                if (!this.phoneReg.test(this.phone)) {
                    alert('请先输入正确的手机号');
                    return;
                }
                
                reqGetCaptcha(this.phone)
                    .then(({data}) => {
                        this.captcha = data;
                    })
                    .catch(() => {
                        alert('获取验证码失败');
                    });
            }
        }
    };
</script>

<style lang="less" scoped>
    .register {
        width: 1200px;
        height: 445px;
        border: 1px solid rgb(223, 223, 223);
        margin: 0 auto;
        
        h3 {
            background: #ececec;
            margin: 0;
            padding: 6px 15px;
            color: #333;
            border-bottom: 1px solid #dfdfdf;
            font-size: 20.04px;
            line-height: 30.06px;
            
            span {
                font-size: 14px;
                float: right;
                
                a {
                    color: #e1251b;
                }
            }
        }
        
        div:nth-of-type(1) {
            margin-top: 40px;
        }
        
        .content {
            padding-left: 390px;
            margin-bottom: 18px;
            position: relative;
            
            label {
                font-size: 14px;
                width: 96px;
                text-align: right;
                display: inline-block;
            }
            
            input {
                width: 270px;
                height: 38px;
                padding-left: 8px;
                box-sizing: border-box;
                margin-left: 5px;
                outline: none;
                border: 1px solid #999;
            }
            
            img {
                vertical-align: sub;
            }
            
            .error-msg {
                position: absolute;
                top: 100%;
                left: 495px;
                color: red;
            }
            
            .getCaptcha {
                height: 38px;
                width: 100px;
            }
        }
        
        .controls {
            text-align: center;
            position: relative;
            
            input {
                vertical-align: middle;
            }
        }
        
        .btn {
            text-align: center;
            line-height: 36px;
            margin: 17px 0 0 55px;
            
            button {
                outline: none;
                width: 270px;
                height: 36px;
                background: #e1251b;
                color: #fff !important;
                display: inline-block;
                font-size: 16px;
                cursor: pointer;
                
                &[disabled] {
                    background: #ccc;
                    color: #999;
                    cursor: not-allowed;
                }
            }
        }
    }
    
    .copyright {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;
        
        ul {
            li {
                display: inline-block;
                border-right: 1px solid #e4e4e4;
                padding: 0 20px;
                margin: 15px 0;
            }
        }
    }
</style>
