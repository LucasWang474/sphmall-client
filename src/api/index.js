import ajax from '@/api/ajax';


export const getBaseCategoryList = () => ajax('/api/product/getBaseCategoryList');
