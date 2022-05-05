<template>
	<view>
		<view class="productList" :style="colorStyle">
			<view class='index-wrapper acea-row row-between-wrapper' >
				<view class='title acea-row row-between-wrapper'>
					<view class='text'>
						<view class='name line1'>
							<image class="jingpingluxian" src="~@/static/images/home-icon.png" mode=""></image>
							精品路线推荐
						</view>
						<view class='line1 txt-btn'>全新路线,限时折扣</view>
					</view>
					<view class='more' @click="goMore">
						查看更多
						<text class='iconfont icon-jiantou'></text>
					</view>
				</view>
				<view class="item-box">
					<view class='item' v-for="(item,index) in bastList" :key="index">
						<view class='pictrue'  @click="goDetail(item.id)">
							<image :src='item.image'></image>
						</view>
						<view class="right-info">
							<view class='text'  @click="goDetail(item.id)">
								<view class='name line1'>{{item.lvyou_name}}</view>
								<view class='describe line1'>{{item.lvyou_info}} </view>
							</view>
							<view class="clock-in">
								<view class="clock-color">
									<text>打卡人数:</text>
									<text ><text class="clock-number">{{item.clock_people}}</text>人</text>
								</view>
								<view class="clock-state" v-if="item.is_clock">
									已打卡
								</view>
								<view class="clock-state" v-else @click="handleLvyouclock(item.id)">
									立即打卡
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
			<!-- <block v-if="isIframe && !bastList.length">
				<view class='index-wrapper' v-if="isIframe && !fastList.length">
					<view class='title acea-row row-between-wrapper'>
						<view class='text'>
							<view class='name line1'>
								<text class="iconfont icon-jingpintuijian1"></text>
								{{titleInfo[0].val}}
							</view>
							<view class='line1 txt-btn'>{{titleInfo[1].val}}</view>
						</view>
						<navigator class='more' open-type="switchTab" :url="titleInfo[2].val">更多<text
								class='iconfont icon-jiantou'></text></navigator>
					</view>
					<view class='scroll-product'>
						<view class="empty-img">精品推荐，暂无数据</view>
					</view>
				</view>
			</block> -->
		</view>
	</view>
</template>

<script>
	
	let app = getApp()
	import {
		mapState
	} from 'vuex'
	
	import {
		getLvyouclock,getLvyouDetail
	} from "@/api/traveApi.js";
	export default {
		name: 'goodList',
		props: {
			dataConfig: {
				type: Array,
			}
		},
		
		created() {

		},
		mounted() {
		},
		watch: {
			dataConfig: {
				immediate: true,
				handler(nVal, oVal) {
					if (nVal) {
						this.bastList = nVal;
					}
				}
			}
		},
		data() {
			return {
				bastList: [],
			}
		},
		methods: {
			
			goMore() {
				uni.navigateTo({
					url: '/pages/live_list/index'
				})
			},
			handleLvyouclock(id){
				getLvyouclock(id).then(res=>{
					
					if(res.status === 200){
						uni.navigateTo({
							url: `/pages/lvyouclock/index`
						})
					}
					
				})
			},
			goDetail(id) {
				// getLvyouDetail(id).then(res=>{
					uni.navigateTo({
						url: `/pages/goods_details/index?id=${id}`
					})
				// })
				
				
			}
		}
	}
</script>

<style lang="scss">
	.productList {
		background-color: #fff;
		// margin: 20rpx 30rpx;
		border-radius: $uni-border-radius-index;
	}

	.title {
		display: flex;
		margin: 0;
		width: 100%;
		margin: 0 20rpx;

		.text {
			display: flex;

			.name {
				font-size: $uni-index-title-font-size;
				font-weight: bold;
					
				.jingpingluxian{
					height: 38rpx;
					width: 38rpx;
					margin-right: 8rpx;
				}
			}

			.txt-btn {
				display: flex;
				align-items: flex-end;
				margin-bottom: 8rpx;
				margin-left: 12rpx;
			}

		}
	}

	.productList .item {
		width: 100%;
		padding: 25rpx 0;
		background-color: #fff;
		border-radius: 10rpx;
		display: flex;
		// border:1rpx solid #eee;
		.right-info{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.clock-in{
				display: flex;
				padding: 0rpx 17rpx 0rpx 17rpx;
				justify-content: space-between;
				.clock-color{
					color: #EC1515 ;
					.clock-number{
						font-size: 40rpx;
					}
				}
				.clock-state{
					width: 140rpx;
					height: 70rpx;
					background-image: url(../static/images/clock.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				
			}
		}
		
	}

	.productList .item .pictrue {
		position: relative;
		width: 230rpx;
		height: 235rpx;
		background-image: url('~@/static/images/img-bg.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.productList .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.productList .item:nth-child(even) {
		border-top: 1rpx solid #EEEEEE;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.productList .item .text {
		width: 460rpx;
		padding: 0rpx 17rpx 0rpx 17rpx;
		font-size: 30rpx;
		color: #999999;
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



	

	.empty-img {
		width: 690rpx;
		height: 300rpx;
		border-radius: 10rpx;
		margin: 26rpx auto 0 auto;
		background-color: #ccc;
		text-align: center;
		line-height: 300rpx;

		.iconfont {
			font-size: 50rpx;
		}
	}

	.font-color {
		color: var(--view-priceColor);
	}

	.item-box {
		padding: 20rpx 30rpx;
	}
</style>
