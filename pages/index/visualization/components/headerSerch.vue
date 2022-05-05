<template>
	
		<view class="mp-header skeleton-rect" >
				<view class="serch-wrapper row-middle">
					<view class="logo">
						<view>{{dataConfig}}</view>
					</view>
					
				</view>
		</view>
</template>

<script>
	let app = getApp();
	
	import {
		goPage
	} from '@/libs/order.js'
	export default {
		name: 'headerSerch',
		props: {
			dataConfig: {
				type: String
			}
		},
		data() {
			return {
				
			};
		},
		
		// methods: {
		// 	goPage() {
		// 		goPage().then(res => {
		// 			uni.navigateTo({
		// 				url: '/pages/goods_search/index'
		// 			})
		// 		})
		// 	}
		// }
	}
</script>

<style lang="scss">
	

	.mp-header {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 150rpx;
		background: url("~@/static/images/header.png") no-repeat;
		background-size: 100% 100%;
		z-index: 999;

		.serch-wrapper {
			height: 100%;
			display: flex;
			align-items: flex-end;
			padding: 0 30rpx 30rpx;
			font-size: 32rpx;
			.logo {
				margin-right: 30rpx;
				display: flex;
				align-items: flex-end;

				image {
					width: 144rpx;
					height: 50rpx;
				}

				.swiger {
					color: #fff;
					font-size: 24rpx;
					margin-left: 20rpx;
					margin-bottom: -2rpx;
				}
			}

		}
	}

</style>
