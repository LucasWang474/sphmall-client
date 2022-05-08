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

export const reqBanners = () => mockAjax('/mock/banners');
export const reqFloors = () => mockAjax('/mock/floors');
// export const reqBaseCategoryListMock = () => mockAjax('/api/product/getBaseCategoryList');
