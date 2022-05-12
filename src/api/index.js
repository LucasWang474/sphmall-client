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
export const reqUpdateCart = (productId, buyNum) => ajax({
    method: 'POST',
    url: `/api/cart/addToCart/${productId}/${buyNum}`
});


export const reqBanners = () => mockAjax('/mock/banners');
export const reqFloors = () => mockAjax('/mock/floors');

// export const reqBaseCategoryListMock = () => mockAjax('/api/product/getBaseCategoryList');
