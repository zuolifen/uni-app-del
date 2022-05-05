<template>
	<view class="lvClock-exchange">
		<view class="lvyouclock-header" @click="back" :style="{height:headH}">
			<image class="header-goback" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAABACAYAAABsrOVnAAAF8ElEQVRoQ82aeWwUVRzH3V7a2iK0WkRUbPHgD0zU3rXVGiJV2Yqk3VjQWAlSQ6Qab/EIlWggRjzAAH9ANAgKllCVSkONsdqEbi/jEWOCpiVGVJR40MqWXuvn18wkS9l5s8fM7E4ymW3fm3mf+b7f+/1+771xnRNHh8fjSezv71/jcrmqwUriur27u3sTV78rXjgrKirOGxoa2uv3+++cwrSmr69vQ1yAFhUVTRsfH/8YyJuDCPcjoFfHHBTImUC2Anm9Qe/+AejMmIIWFxdfMTo62gbgVUYmiH1u6+3tXRUz0Pz8/PmoeAjASxTj5HPK3Ch6KiaghYWFJRMTEy2AZiogm7Ozs5e2traeljqOgxYUFNwG5D7aPl/R3TtycnIebGpqGtfrOApKdy9FxXdoPEUB+UpPT88z4jsD6zgGCuRDQG6i8QQDSH9CQsJTQL4arNwRUCDXAtmoUHEcBVcC+bZhHTsjE3AubPJNrg0KyGHKanFBH6lYbFM0Ly8vmYbFHpcpIE9SthjIdjPBbAEFMo2ubELJOxSQx6UcH/mVGaQt7qmsrGzG8PCw+MhSBcDRxMTESjKjI6FAWg6KkrN4qESbaxVKfp+cnFzZ2dl5LFRIS0FLSkqulLiNkjkKAG9KSsoiIP8KB9IyUEb2dQBKBnSxAuBQVlZWdVtb23/hQloCCuRNhERxLdMV3b2HkFhHSByJBDJqUCCrUFGy8lQFwJaqqqqGxsbGiUghowIl2tzHA3YAmaQAWIf7WRsNoH5vRH4UyEcB3MhDjO6XhOIRIDdbARm2olpIfInrswqAUcruB/I9qyDDApWp7MDAwBYg6xUAp4hIHkLiQSshQwYFMgXI3UDWKAD+Jk1zkwEdthoyJFDm2+nMtz8EcoEC4DfKKunu7+yANAVlbpOFjxRHXqAA+Im4vZC4PWAXpBIUH3kZkDKVnadw5F9jk7fT3b/bCWkISnIhcJJcXK6A/DI9PX1xe3v7P3ZDBgVFyQKUlFF7oQLyABnQ3SQXPicgzwKFcQH22MyZoYDciZIrUHLMKcgzQIk21QDu5p/nKiBfxx4fnzqVdQJ4MgSi5Eogt3ImKiCfx5G/7ARUsDZcJLypIyMjMrrLVBCouDczM3NFpPlktC84qagWeTabhEep+g2D6C6v13s02obDvf+M7AcTqGfES8ZjuORC2QlCZS22+lm4jUVT/6w0jUF1Iw/cp5pWYAYy4p/EZt+IpvFw7g2aT2K3s5mo7Qe20MRu38VV1eOqZLXD1sMwcZbF/8HBwW20XmcC20usX9LV1fWLnaSmGT7htIGufk015aD8OHbrITHpsAvWFFQaBvYWLh9wGoZVyiSzf5hUT3rB8iMkUGm1tLR0Dv5WwqvR7oUOt50l7dX6krZVxCGDasrK4pfMPGtN7PawzAZQVxJqS46wQKVFbYL3BD/Xq0Iu5ceSkpJqGGReK0jDBtUbJfuvZCPrff6eoQA5zSBbpVpJDvUlIgbVTGEupiDzqfkmpvAWdR7DFGTARXREBSotyuQPf7uTn0tMYL9ITU31dHR0/BkJadSgut0Sep/j94ucRrseUvVneaFQV5kDX8gSUP2B2qLZLrp5mpFqmIqP8gfCXUmxFFSz23ma3V5j0sUbc3Nznw7cnVOaTiT2YnYPkewC6si0ZpGJ3X5Kflsbygq05YrqYKyHJrS0tKzTFtQM20H9fi2p+dZxRQMbZJDVACs7cukKkCGAl5PfymZu0MM2RQNbwxRkl6SZc64C1g/serfb/UKw1WlHQAWOZDyTZHwP6t5qYuOfUH4PXuFf29yT2SDTPhfaQD3JFQwPlD1CniCTyB/0So4pOsUUlsk3TapNCspPct5LnnBA7o0JqDSM3d7AZT/nHIW4EyQ1dcDuihmowJWXl1/k8/lkczfY9046/4mMjIxZMQXVlE3W5mSrjZRNS0vLjjmoDkeesJzFj638PXWR7lc8wOy4AdXULUJdWfy4dHIAkcBwqSYQtMYVqMDJd3pjY2OVDKLpuKiD+nZ53IEa2en/uVtn70YWrxAAAAAASUVORK5CYII=" mode=""></image>
			<text>{{headerText}}</text>
		</view>
		<view class="">
			打卡成功
		</view>
		<view class="">
			查看我的打卡
			
		</view>
		<view class="" >
			返回首页
		</view>
	</view>
</template>

<script>
	export default {
		name:"lvClockExchange",
		props:{
			headerText:String
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	
.lvClock-exchange{
	width: 100%;
	
}
</style>
