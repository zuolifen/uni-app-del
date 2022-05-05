// 旅游网首页接口
import request from "@/utils/request.js";


//获取轮播图数据
export function getBannerList() {
	return request.get("/combination/ly_banner_list", {}, {
		noAuth: true
	});
}
//获取旅游网首页列表信息
export function getLvproducts(data) {
	return request.get("lvproducts", data, {
		noAuth: true
	});
}

// 打卡操作
export function getLvyouclock(id) {
	return request.get("lvyou_clock?id="+id,{}, {
		noAuth: true
	});
}
// 列表详情
export function getLvyouDetail(id) {
	return request.get("lvyou_detail?id="+id, {}, {
		noAuth: true
	});
}

// 我的打卡记录

export function getMyrecord(data) {
	return request.get("myrecord", data, {
		noAuth: true
	});
}
//积分商城列表
export function getExchangeGoodsList(data) {
	return request.get("exchange_goods_list", data, {
		noAuth: true
	});
}

// 商品兑换操作
export function exchangeGoods(id) {
	return request.get("exchange_goods?goods_id="+id, {}, {
		noAuth: true
	});
}
// 兑换列表数据
export function getGoodsRecordList(data) {
	return request.get("goods_record_list", data, {
		noAuth: true
	});
}