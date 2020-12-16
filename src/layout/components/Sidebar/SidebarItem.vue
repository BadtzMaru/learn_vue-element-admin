<template>
	<div v-if="!item.hidden">
		<template
			v-if="
				hasOneShowingChild(item.children, item) &&
					(!onlyOneChild.children ||
						onlyOneChild.noShowingChildren) &&
					!item.alwaysShow
			"
		>
			<app-link
				v-if="onlyOneChild.meta"
				:to="resolvePath(onlyOneChild.path)"
			>
				<el-menu-item
					:index="resolvePath(onlyOneChild.path)"
					:class="{ 'submenu-title-noDropdown': !isNest }"
				>
					<item
						:icon="
							onlyOneChild.meta.icon ||
								(item.meta && item.meta.icon)
						"
						:title="onlyOneChild.meta.title"
					/>
				</el-menu-item>
			</app-link>
		</template>
		<el-submenu
			v-else
			ref="subMenu"
			:index="resolvePath(item.path)"
			popper-append-to-body
		>
			<template slot="title">
				<item
					v-if="item.meta"
					:icon="item.meta && item.meta.icon"
					:title="item.meta.title"
				/>
			</template>
			<sidebar-item
				v-for="child in item.children"
				:key="child.path"
				:item="child"
				:base-path="resolvePath(child.path)"
				class="nest-menu"
			/>
		</el-submenu>
	</div>
</template>

<script>
import AppLink from './Link';
import { isExternal } from '@/utils/validate';
import path from 'path';
import Item from './Item';
import FixiOSBug from './FixiOSBug';
export default {
	name: 'SidebarItem',
	mixins: [FixiOSBug],
	components: {
		AppLink,
		Item,
	},
	props: {
		item: {
			type: Object,
			required: true,
		},
		basePath: {
			type: String,
			default: '',
		},
		isNest: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		this.onlyOneChild = null;
		return {};
	},
	methods: {
		hasOneShowingChild(children = [], parent) {
			const showingChildren = children.filter((item) => {
				if (item.hidden) {
					return false;
				} else {
					this.onlyOneChild = item;
					return true;
				}
			});
			if (showingChildren.length === 1) {
				return true;
			}
			if (showingChildren.length === 0) {
				this.onlyOneChild = {
					...parent,
					path: '',
					noShowingChildren: true,
				};
				return true;
			}
			return false;
		},
		resolvePath(routePath) {
			if (isExternal(routePath)) {
				return routePath;
			}
			if (isExternal(this.basePath)) {
				return this.basePath;
			}
			return path.resolve(this.basePath, routePath);
		},
	},
	mounted() {
		/* 测试 */
	},
};
</script>

<style lang="scss" scoped></style>
