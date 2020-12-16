import Layout from '@/layout';

const componentsRouter = {
	path: '/components',
	component: Layout,
	redirect: 'noRedirect',
	name: 'ComponentDemo',
	meta: {
		title: '组件库',
		icon: 'component',
	},
	children: [
		{
			path: 'tinymice',
			component: () => import('@/views/components-demo/tinymce'),
			name: 'TinymceDemo',
			meta: {
				title: 'Tinymce组件',
			},
		},
		{
			path: 'markdown',
			component: () => import('@/views/components-demo/markdown'),
			name: 'MarkdownDemo',
			meta: { title: 'Markdown组件' },
		},
		{
			path: 'json-editor',
			component: () => import('@/views/components-demo/json-editor'),
			name: 'JsonEditorDemo',
			meta: { title: 'JSON编辑器' },
		},
		{
			path: 'split-pane',
			component: () => import('@/views/components-demo/split-pane'),
			name: 'SplitpaneDemo',
			meta: { title: '分隔窗口' },
		},
		{
			path: 'avatar-upload',
			component: () => import('@/views/components-demo/avatar-upload'),
			name: 'AvatarUploadDemo',
			meta: { title: '上传组件' },
		},
		{
			path: 'dropzone',
			component: () => import('@/views/components-demo/dropzone'),
			name: 'DropzoneDemo',
			meta: { title: '拖拽上传' },
		},
	],
};

export default componentsRouter;
