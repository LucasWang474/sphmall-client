import ajax from '@/api/ajax';
import mockAjax from '@/api/mockAjax';


export const reqBaseCategoryList = () => ajax('/api/product/getBaseCategoryList');

// 搜索商品
// data: 请求体对象
export const reqSearchResults = (searchParams) => ajax({
    url: '/api/list',
    method: 'POST',
    data: searchParams
});

// 获取商品详情
export const reqProductDetail = (productId) => ajax(`/api/item/${productId}`);

// 更新购物车
// 虽然 url 中的是 addToCart，但其实即可以添加也可以删除
export const reqUpdateCart = (productId, count) => ajax({
    method: 'POST',
    url: `/api/cart/addToCart/${productId}/${count}`,
});

// 获取购物车列表
export const reqCartList = () => ajax('/api/cart/cartList');

// 切换商品选中状态
// isChecked: 商品选中状态，0 代表取消选中，1 代表选中
export const reqChangeChecked = (productId, isChecked) => ajax({
    url: `/api/cart/checkCart/${productId}/${isChecked}`
});

// 删除购物车中的商品
export const reqDeleteCart = (productId) => ajax({
    method: 'DELETE',
    url: `/api/cart/deleteCart/${productId}`
});

// 获取注册验证码
export const reqGetCaptcha = (phone) => ajax(`/api/user/passport/sendCode/${phone}`);

// 注册用户
export const reqRegister = (phone, password, code) => ajax({
    method: 'POST',
    url: '/api/user/passport/register',
    data: {
        phone,
        password,
        code
    }
});

// 用户登录
export const reqLogin = (phone, password) => ajax({
    method: 'POST',
    url: '/api/user/passport/login',
    data: {
        phone,
        password
    }
});


// -------------------------------------------------------------
// Mock 数据请求函数
export const reqBanners = () => mockAjax('/mock/banners');
export const reqFloors = () => mockAjax('/mock/floors');
// export const reqBaseCategoryListMock = () => mockAjax('/api/product/getBaseCategoryList');
