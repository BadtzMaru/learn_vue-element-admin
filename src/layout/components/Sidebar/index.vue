<template>
	<div :class="{ 'has-logo': showLogo }">
		<logo v-if="showLogo" :collapse="isCollapse" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
export default {
	components: {
		Logo,
	},
	computed: {
		...mapGetters(['sidebar']),
		isCollapse() {
			return !this.sidebar.opened;
		},
		showLogo() {
			return this.$store.state.settings.sidebarLogo;
		},
	},
};
</script>
