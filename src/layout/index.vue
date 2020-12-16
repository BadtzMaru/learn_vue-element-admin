<template>
	<div :class="classObj" class="app-wrapper">
		<!-- 移动端打开侧边栏阴影背景 -->
		<div
			v-if="device === 'mobile' && sidebar.opend"
			class="drawer-bg"
			@click="handleClickOutside"
		/>
		<!-- 侧边栏菜单栏 -->
		<sidebar class="sidebar-container"/>
	</div>
</template>

<script>
import { Sidebar } from './components';
import { mapState } from 'vuex';
export default {
	components: { Sidebar },
	computed: {
		...mapState({
			sidebar: (state) => state.app.sidebar,
			device: (state) => state.app.device,
		}),
		classObj() {
			return {
				hideSidebar: !this.sidebar.opened,
				openSidebar: this.sidebar.opened,
				mobile: this.device === 'mobile',
			};
		},
	},
	methods: {
		handleClickOutside() {
			this.$store.dispatch('app/closeSideBar', {
				withoutAnimation: false,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}
.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}
</style>
