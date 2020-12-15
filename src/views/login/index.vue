<template>
	<div class="login-container">
		<el-form
			ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			autocomplete="on"
			label-position="left"
			class="login-form"
		>
			<div class="title-container">
				<h3 class="title">系统登陆</h3>
			</div>
			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input
					ref="username"
					v-model="loginForm.username"
					placeholder="请输入用户名"
					type="text"
					tabindex="1"
					autocomplete="on"
				/>
			</el-form-item>
			<el-tooltip
				v-model="capsTooltip"
				content="大写输入锁定"
				placement="right"
				manual
			>
				<el-form-item prop="password">
					<span class="svg-container">
						<svg-icon icon-class="password" />
					</span>
					<el-input
						ref="password"
						v-model="loginForm.password"
						:type="passwordType"
						placeholder="请输入密码"
						tabindex="2"
						autocomplete="on"
						@keyup.native="checkCapslock"
						@blur="capsTooltip = false"
						@keyup.enter.native="handleLogin"
					/>
					<span class="show-pwd" @click="showPwd">
						<svg-icon
							:icon-class="
								passwordType === 'password' ? 'eye' : 'eye-open'
							"
						/>
					</span>
				</el-form-item>
			</el-tooltip>
			<el-button
				:loading="loading"
				type="primary"
				style="width:100%;margin-bottom:30px"
				@click="handleLogin"
				>登陆</el-button
			>
		</el-form>
	</div>
</template>

<script>
import { validUsername } from '@/utils/validate';
export default {
	name: 'Login',
	data() {
		const validateUsername = (rule, value, callback) => {
			if (!validUsername(value)) {
				callback(new Error('请输入正确的用户名( admin 或者 editor )'));
			} else {
				callback();
			}
		};
		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('密码长度不能小于6位数'));
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				username: 'admin',
				password: '123456',
			},
			loginRules: {
				username: [
					{
						required: true,
						trigger: 'blur',
						validator: validateUsername,
					},
				],
				password: [
					{
						required: true,
						trigger: 'blur',
						validator: validatePassword,
					},
				],
			},
			capsTooltip: false,
			passwordType: 'password',
			loading: false,
			redirect: undefined, // 登陆成功后跳转的路径,默认: '/'
			otherQuery: {}, // 路由跳转携带的参数
		};
	},
	methods: {
		// 检测是否锁定大写
		checkCapslock(e) {
			const { key } = e;
			this.capsTooltip =
				key && key.length === 1 && key >= 'A' && key <= 'Z';
		},
		// 显示隐藏密码
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = 'text';
			} else {
				this.passwordType = 'password';
			}
			this.$nextTick(() => {
				this.$refs.password.focus();
			});
		},
		// 登陆事件
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loading = true;
					this.$store
						.dispatch('user/login', this.loginForm)
						.then(() => {
							this.$router.push({
								path: this.redirect || '/',
								query: this.otherQuery,
							});
							this.loading = false;
						})
						.catch(() => {
							this.loading = false;
						});
				} else {
					return false;
				}
			});
		},
	},
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* 重写 element-ui 样式 */
.login-container {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;
		input {
			background: transparent;
			border: 0;
			-webkit-appearance: none;
			border-radius: 0;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}
	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$light_gray: #eee;
$dark_gray: #889aa4;
.login-container {
	min-height: 100%;
	width: 100%;
	background-color: $bg;
	overflow: hidden;
	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}
	.title-container {
		position: relative;
		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0 auto 40px;
			text-align: center;
			font-weight: bold;
		}
	}
	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}
	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
