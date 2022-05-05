<template>
	<view class="integral-mall copy-data" :style="{height:pageHeight}">
		<view class="top" :style="colorStyle">
			<view class="head-bg">
				<image class="header-bg-img" src="/static/images/header-all.png" mode=""></image>
			</view>
			<view class="sys-head">
				<view class="sys-bar" :style="{height:sysHeight}"></view>
				<view class="sys-title" :style="member_style==3?'color:#333':''" @tap="back">
					<image class="goback-img" src="/static/images/goBack.png" mode=""></image>
					积分商城</view>
			</view>
			<view class="head">
				<view class="user-card" :class="member_style==3?'unBg':''">
					<view class="user-info">
						<view class="user-img">
							<!-- 注释这个是加的bnt -->
							<!-- #ifdef H5 -->
							<button class="bntImg" v-if="userInfo.is_complete == 0 && isWeixin"
								@click="getWechatuserinfo">
								<image class="avatar" src='/static/images/f.png'></image>
								<view class="avatarName">获取头像</view>
							</button>
							<!-- #endif -->
							<!-- #ifdef MP -->
							<button class="bntImg" v-if="userInfo.is_complete == 0" @tap="getUserProfile">
								<image class="avatar" src='/static/images/f.png'></image>
								<view class="avatarName">获取头像</view>
							</button>
							<!-- #endif -->
							<!-- #ifndef APP-PLUS -->
							<view v-else class="avatar-box" :class="{on:userInfo.is_money_level}">
								<image class="avatar" :src='userInfo.avatar' v-if="userInfo.avatar"
									@click="goEdit()">
								</image>
								<image v-else class="avatar" src="/static/images/f.png" mode="" @click="goEdit()">
								</image>
								<view class="headwear" v-if="userInfo.is_money_level && userInfo.svip_open">
									<image src="/static/images/headwear.png"></image>
								</view>
							</view>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<view class="avatar-box" :class="{on:userInfo.is_money_level}">
								<image class="avatar" :src='userInfo.avatar' v-if="userInfo.avatar"
									@click="goEdit()">
								</image>
								<image v-else class="avatar" src="/static/images/f.png" mode="" @click="goEdit()">
								</image>
								<view class="headwear" v-if="userInfo.is_money_level && userInfo.svip_open">
									<image src="/static/images/headwear.png"></image>
								</view>
							</view>
							<!-- #endif -->
						</view>
						<view class="info">
							<!-- #ifdef MP -->
							<view class="name" v-if="!userInfo.uid" @click="openAuto"
								style="height: 100%; display: flex; align-items: center;">
								请点击授权
							</view>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<view class="name" v-if="!userInfo.uid && isWeixin" @click="openAuto"
								style="height: 100%; display: flex; align-items: center;">
								请点击授权
							</view>
							<!-- #endif -->
							<view class="name" v-if="userInfo.uid">
								可用积分：<text class="lvyou-integral">{{userInfo.lvyou_integral}}</text>
								<!-- <image class="live" :src="userInfo.vip_icon" v-if="userInfo.vip_icon"></image>
								<view class="vip" v-if="userInfo.is_money_level> 0 && userInfo.svip_open">
									<image src="/static/images/svip.png"></image>
								</view> -->
							</view>
							<!-- <view class="num" v-if="userInfo.phone" @click="goEdit()">
								<view class="num-txt">ID：{{userInfo.uid}}</view>
							</view> -->
							<!-- <view class="phone" v-if="!userInfo.phone && isLogin" @tap="bindPhone">绑定手机号</view> -->
						</view>
						
						

					</view>
				</view>
				
				
			</view>
		</view>
		<!-- 积分商城列表部分 -->
		<view class="integral-mall-content">
			<view class="integral-item" v-for="(item,index) in exchangeGoodsList" :key="index">
				<view class="integral-info-content">
					<view class='pictrue'  >
						<image :src='item.image'></image>
					</view>
					<view class="right-info">
						<view class='text'>
							<view class='name line2'>{{item.goods_name}}</view>
							<view class='describe line1'>{{item.goods_info}} </view>
						</view>
						<view class="clock-in">
							<view class="clock-color">
								<text>积分:</text>
								<text ><text class="clock-number">{{item.goods_integral}}</text></text>
							</view>
							<view class="clock-state" @click="toExchange({integral:item.goods_integral,id:item.id})">
								去兑换
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>
	let sysHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	import {
		getMenuList,
		getUserInfo,
		setVisit,
		updateUserInfo
	} from '@/api/user.js';
	import {
		wechatAuthV2,
		getNavigation,
		silenceAuth
	} from '@/api/public.js'
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapState,
		mapGetters
	} from "vuex";
	// #ifdef H5
	import Auth from '@/libs/wechat';
	// #endif
	const app = getApp();
	import dayjs from '@/plugin/dayjs/dayjs.min.js';
	import Routine from '@/libs/routine';
	import colors from '@/mixins/color';
	import tabBar from "@/pages/index/visualization/components/tabBar.vue";
	import {
		getCustomer
	} from '@/utils/index.js'
	import { getExchangeGoodsList,exchangeGoods } from "@/api/traveApi.js";
	export default {
		components: {
			tabBar,
		},
		// computed: mapGetters(['isLogin','cartNum']),
		computed: {
			...mapGetters({
				cartNum: 'cartNum',
				isLogin: 'isLogin'
			})
		},
		filters: {
			coundTime(val) {
				var setTime = val * 1000
				var nowTime = new Date()
				var rest = setTime - nowTime.getTime()
				var day = parseInt(rest / (60 * 60 * 24 * 1000))
				// var hour = parseInt(rest/(60*60*1000)%24) //小时
				return day + '天'
			},
			dateFormat: function(value) {
				return dayjs(value * 1000).format('YYYY-MM-DD');
			}
		},
		mixins: [colors],
		data() {
			return {
				storeMenu: [], // 商家管理
			
				
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				userInfo: {},
				MyMenus: [],
				sysHeight: sysHeight,
				mpHeight: 0,
				showStatus: 1,
				newData: {},
				activeRouter: '',
				// #ifdef H5 || MP
				pageHeight: '100%',
				routineContact: 0,
				// #endif
				// #ifdef APP-PLUS
				pageHeight: app.globalData.windowHeight,
				// #endif
				// #ifdef H5
				isWeixin: Auth.isWeixin(),
				//#endif
				footerSee: false,
				member_style: 1,
				my_banner_status: 1,
				is_diy: uni.getStorageSync('is_diy'),
				exchangeGoodsList:[],
				page:1,
				limit:10,
			}
		},
		onLoad(option) {
			// uni.hideTabBar()
			let that = this;
			if (this.is_diy) {
				if (uni.getStorageSync('FOOTER_BAR')) {
					uni.hideTabBar()
				}
				getNavigation().then(res => {
					this.newData = res.data
					if (this.newData.status && this.newData.status.status) {
						uni.hideTabBar()
					} else {
						uni.showTabBar()
					}
				})
			}

			// #ifdef MP
			// 小程序静默授权
			if (!this.$store.getters.isLogin) {
				Routine.getCode()
					.then(code => {
						Routine.silenceAuth(code).then(res => {
							this.onLoadFun();
						})
					})
					.catch(res => {
						uni.hideLoading();
					});
			}
			// #endif

			// #ifdef H5 || APP-PLUS
			if (that.isLogin == false) {
				toLogin()
			}
			//获取用户信息回来后授权
			let cacheCode = this.$Cache.get('snsapi_userinfo_code');
			let res1 = cacheCode ? option.code != cacheCode : true;
			if (this.isWeixin && option.code && res1 && option.scope === 'snsapi_userinfo') {
				this.$Cache.set('snsapi_userinfo_code', option.code);
				Auth.auth(option.code).then(res => {
					this.getUserInfo();
				}).catch(err => {})
			}
			// #endif
			// #ifdef APP-PLUS
			that.$set(that, 'pageHeight', app.globalData.windowHeight);
			// #endif

			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			this.activeRouter = '/' + curRoute

		},
		onReady() {
			let self = this
			// #ifdef MP
			let info = uni.createSelectorQuery().select(".sys-head");
			info.boundingClientRect(function(data) { //data - 各种参数
				self.mpHeight = data.height
			}).exec()
			// #endif
		},
		onShow: function() {
			let that = this;
			// #ifdef APP-PLUS
			uni.getSystemInfo({
				success: function(res) {
					that.pageHeight = res.windowHeight + 'px'
				}
			});
			// #endif
			if (that.isLogin) {
				this.getUserInfo();
				this.getMyMenus();
				this.setVisit();
			};
		},
		onPullDownRefresh() {
			this.onLoadFun();
		},
		onReachBottom() {
			this.page++;
			let data={
				page:this.page,
				limit:this.limit
			}
			this.getExchangeGoodsLists(data)
		},
		created() {
			let data={
				page:this.page,
				limit:this.limit
			}
			this.getExchangeGoodsLists(data)
		},
		methods: {
			getWechatuserinfo() {
				//#ifdef H5
				Auth.isWeixin() && Auth.toAuth('snsapi_userinfo', '/pages/user/index');
				//#endif
			},
			getRoutineUserInfo(e) {
				updateUserInfo({
					userInfo: e.detail.userInfo
				}).then(res => {
					this.getUserInfo();
					return this.$util.Tips('更新用户信息成功');
				}).catch(res => {

				})
			},
			// 记录会员访问
			setVisit() {
				setVisit({
					url: '/pages/user/index'
				}).then(res => {})
			},
			// 打开授权
			openAuto() {
				toLogin();
			},
			// 授权回调
			onLoadFun() {
				this.getUserInfo();
				this.getMyMenus();
				this.setVisit();
			},
			Setting: function() {
				uni.openSetting({
					success: function(res) {}
				});
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			// 绑定手机
			bindPhone() {
				uni.navigateTo({
					url: '/pages/users/user_phone/index'
				})
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data
					that.$store.commit("SETUID", res.data.uid);
					uni.stopPullDownRefresh();
				});
			},
			//小程序授权api替换 getUserInfo
			getUserProfile() {
				uni.showLoading({
					title: '获取中'
				});
				let self = this;
				Routine.getUserProfile()
					.then(res => {
						Routine.getCode()
							.then(code => {
								let userInfo = res.userInfo;
								userInfo.code = code;
								userInfo.spread_spid = app.globalData.spid; //获取推广人ID
								userInfo.spread_code = app.globalData.code; //获取推广人分享二维码ID
								Routine.authUserInfo(userInfo)
									.then(res => {
										if (res.data.key !== undefined && res.data.key) {
											uni.hideLoading();
											self.authKey = res.data.key;
											self.isPhoneBox = true;
										} else {
											uni.hideLoading();
											let time = res.data.expires_time - self.$Cache.time();
											self.$store.commit('LOGIN', {
												token: res.data.token,
												time: time
											});
											this.getUserInfo()
										}
									})
									.catch(res => {
										uni.hideLoading();
										uni.showToast({
											title: res.msg,
											icon: 'none',
											duration: 2000
										});
									});
							})
							.catch(res => {
								uni.hideLoading();
							});
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
		
			getMyMenus: function() {
				
			},
			// 编辑页面
			goEdit() {
				if (this.isLogin == false) {
					toLogin();
				} else {
					uni.navigateTo({
						url: '/pages/users/user_info/index'
					})
				}

			},
			
			
			back(){
				uni.navigateBack()
			},
			// 获取积分商城列表信息
			getExchangeGoodsLists(data){
				let that =this;
				getExchangeGoodsList(data).then((res)=>{
					that.exchangeGoodsList = [...this.exchangeGoodsList,...res.data[0]];
				})
			},
			//去兑换
			toExchange({integral,id}){
				
				if(integral<this.userInfo.lvyou_integral){
					exchangeGoods(id).then(res=>{
						if(res.status===200){
							uni.navigateTo({
								url: `/pages/lvyouexchange/index`
							})
						}
					})
					
					
				}else{
					uni.showToast({
						title: '积分不足',
						icon: 'error',
						duration: 2000
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page,
	body {
		height: 100%;
		background-color: #fff;
	}
		.user-info {
			height: 100%;
			padding: 0 30rpx;
			.info {
				.name {
					color: #333333 !important;
					font-weight: 600;
				}

				.num {
					color: #333 !important;

					.num-txt {
						height: 38rpx;
						background-color: rgba(51, 51, 51, 0.13);
						padding: 0 12rpx;
						border-radius: 16rpx;
					}
				}
			}
		}

		

	


	.integral-mall {
		display: flex;
		flex-direction: column;
		height: 100%;
			
		.top{
			height: 305rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: fixed;	
			left: 0;
			top: 0;
			.head-bg{
				height: 305rpx;
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
					
				.header-bg-img{
					height: 100%;
				}
			}
			.sys-head {
				position: relative;
				width: 100%;

				

				.sys-title {
						z-index: 10;
						position: relative;
						height: 43px;
						line-height: 43px;
						font-size: 36rpx;
						color: #333333;
						padding-left: 30rpx;
						.goback-img{
							width: 18rpx;
							height: 32rpx;
						}
					}
		}
			}
		.head {
			
			
			.user-card {
				position: relative;
				width: 90%;
				height: 166rpx;
				margin: 0 auto;
				background-color:#ffffff;
				border-radius: 10rpx;
				box-shadow: 0 0 8px 0 rgba(0, 0, 0, .1);
				.user-info {
					z-index: 20;
					position: relative;
					display: flex;
					margin-top: 26rpx;
					.headwear {
						position: absolute;
						right: -4rpx;
						top: -14rpx;
						width: 44rpx;
						height: 44rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.live {
						width: 28rpx;
						height: 28rpx;
						margin-left: 20rpx;
					}

					.bntImg {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						text-align: center;
						line-height: 120rpx;
						background-color: unset;
						position: relative;

						.avatarName {
							font-size: 16rpx;
							color: #fff;
							text-align: center;
							background-color: rgba(0, 0, 0, 0.6);
							height: 37rpx;
							line-height: 37rpx;
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
						}
					}
					.user-img{
						display: flex;
						align-items: center;
						.avatar-box {
							position: relative;
							display: flex;
							align-items: center;
							justify-content: center;
							width: 110rpx;
							height: 110rpx;
							border-radius: 50%;
							border:2rpx solid #518566;
							&.on {
								.avatar {
									border: 2px solid #FFAC65;
									border-radius: 50%;
								}
							}
						}
					}	
					.avatar {
						position: relative;
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;

					}

					.info {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						margin-left: 20rpx;
						padding: 15rpx 0;

						.name {
							display: flex;
							align-items: center;
							color: #fff;
							font-size: 31rpx;

								
							.lvyou-integral{
								font-size:40rpx ;
								color: #146C50;
							}
						}

						.num {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);

							image {
								width: 22rpx;
								height: 23rpx;
								margin-left: 20rpx;
							}
						}
					}
				}

				
			}

			
		}



		.phone {
			color: #fff;
			background-color: #CCC;
			border-radius: 15px;
			width: max-content;
			padding: 0 10px;
		}

		// 个人中心列表
		.integral-mall-content{
			margin-top: 360rpx;
			padding: 10rpx 20rpx;
			.integral-item{
				margin-bottom: 30rpx;
				.integral-info-content{
					width: 100%;
					border-radius: 10rpx;
					display: flex;	
					.pictrue {
						position: relative;
						width: 230rpx;
						height: 235rpx;
						background-image: url('~@/static/images/img-bg.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
						border: 4rpx solid #388363;
						border-radius:10rpx ;
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
					.right-info{
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 0 17rpx;
						color: #999999;
						.clock-in{
							display: flex;
							padding: 0rpx 17rpx 0rpx 17rpx;
							justify-content: space-between;
							.clock-color{
								color: #146C50 ;
								.clock-number{
									font-size: 40rpx;
								}
							}
							.clock-state{
								width: 140rpx;
								height: 70rpx;
								background-image: url('~@/static/images/clock.png');
								background-size: 100% 100%;
								background-repeat: no-repeat;
								color: #fff;
								display: flex;
								justify-content: center;
								align-items: center;
							}
						
							
						}
						.text {
							width: 460rpx;
							padding: 0rpx 17rpx 0rpx 17rpx;
							font-size: 30rpx;
							
							display: flex;
							flex-direction: column;
							justify-content: space-between;
						
							.name {
								font-size: 32rpx;
								font-weight: 600;
								color: #333;
								margin-bottom: 20rpx;
							}
						
							
						}
					}
				}
			}
		}
		

		
	}

	

	
	.integral-mall {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
