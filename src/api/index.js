import ajax from '@/api/ajax';
import mockAjax from '@/api/mockAjax';


export const getBaseCategoryList = () => ajax('/api/product/getBaseCategoryList');

export const getBanners = () => mockAjax('/mock/banners');
export const getFloors = () => mockAjax('/mock/floors');
