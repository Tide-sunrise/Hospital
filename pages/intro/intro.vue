<template>
	<view class="introductionLayout pageBg2">
		<myTitle :item="itemText"></myTitle>
		<view class="intoduction">
			<view class="text">
				<scroll-view :show-scrollbar="false" scroll-y="true" class="text-true">
					<view class="text2">
					瓦纳海姆医院，坐落于繁华都市的心脏地带，以其优雅的建筑和温馨的服务环境而闻名。医院的名字“瓦纳海姆”，在北欧神话中意指充满生机与活力的地方，象征着希望、复苏与生命的延续。我们以此为名，旨在表达对每一位患者最美好的祝愿：愿健康与活力永驻。
					</view>
					<view class="text2">
					作为一家现代化综合医疗机构，瓦纳海姆医院配备了最先进的诊疗设备和技术力量，致力于提供高标准的医疗服务。从日常保健到复杂病症的治疗，我们的专业团队始终以患者为中心，追求卓越的医疗质量和人性化的服务体验。
					</view>
					<view class="text2">
					医院秉持着“尊重生命，关爱健康”的核心理念，不仅关注疾病的治疗，更加重视患者的身心康复。在这里，每一个细节都经过精心设计，从舒适的就诊环境到亲切的医护人员，我们都力求让每一位来访者感受到家一般的温暖。
					</view>
				</scroll-view>
				<image src="../../static/zxj/v.png" mode="aspectFill"></image>
			</view>
		</view>
		<myEmpty height="100rpx"></myEmpty>
		<!-- <myBottom pic="../../static/background.png"></myBottom> -->
		<!-- <myTabBar :item="itemTab"></myTabBar> -->
	</view>
</template>

<script setup>
import { ref } from 'vue';
const itemTab=ref({myTabbar:1})
const itemText=ref({text:"知新馆介绍",src:"../../static/zxj/v-Photoroom.png"})
</script>

<style lang="scss" scoped>
.introductionLayout{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 30rpx;
	padding-top: 50rpx;
	.intoduction{
		width: 690rpx;
		height: 1300rpx;
		background-color: #fff;
		border-radius: 50rpx;
		margin-top: 20rpx;
		display: flex;
		box-shadow: 10px 10px 10px rgba(0,0,0,0.1);
		.text{
			padding: 20rpx;
			font-size: 30rpx;
			height: 100%;
			width: 100%;
			color: #333;
			display: flex;
			flex-direction: column;
			opacity: 1;
			.text-true {
				display: flex;
			    flex-direction: column; /* 垂直方向排列 */
			    max-width: 570rpx; /* 适应容器的宽度 */
			    max-height: 1260rpx; /* 设置最大高度 */
			    padding: 40rpx;
			    overflow-y: auto; /* 启用垂直滚动 */
			    scroll-behavior: smooth;
			    -webkit-overflow-scrolling: touch;
				z-index: 10;
				
				.text2{
					text-indent: 2em;
					display: 'block';
					font-size: 40rpx;
					line-height: 50rpx;
					color: #000;
					font-weight: bold;
					font-family: '仿宋';
				}
				.image2{
					display: flex;
					justify-content: center;
					margin: 20rpx 0;
					
					image{
						opacity: 1;
						width: 100%;
						height: 500rpx;
					}
				}
			}
			image{
				//在文字正下方，重叠
				position: absolute;
				margin: 275rpx 0;
				width: 650rpx;
				height: 650rpx;
				opacity: 0.32;
				
				
			}
		}
	}
}	       
</style>
