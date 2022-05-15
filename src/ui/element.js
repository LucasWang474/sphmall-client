import Vue from 'vue';
import {Button, Message, MessageBox} from 'element-ui';

Vue.component(Button.name, Button);


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
