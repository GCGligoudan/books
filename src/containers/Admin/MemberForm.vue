<template>
	<div class = "container">
		<el-form ref="form" :model="_member" :rules="rules" label-width="80px">
			<el-form-item label="会员名" prop="memberName">
				<el-input placeholder="请输入会员名" v-model="_member.memberName">
				</el-input>
			</el-form-item>
			<el-form-item label="学号" prop = "memberNum">
				<el-input placeholder="请输入学号" v-model="_member.memberNum">
				</el-input>
			</el-form-item>
			<el-form-item label="联系方式" prop = "memberTel">
				<el-input placeholder="请输入联系方式" v-model="_member.memberTel">
				</el-input>
			</el-form-item>
			<el-form-item label="地址" prop = "memberAddress">
				<el-input placeholder="请输入地址" v-model="_member.memberAddress">
				</el-input>
			</el-form-item>
			<!-- <el-form-item label="活动时间">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item> -->
			<el-form-item label="会员类型">
				<el-radio-group v-model="_member.memberRank">
					<el-radio :label="'0'">周卡</el-radio>
					<el-radio :label="'1'">月卡</el-radio>
					<el-radio :label="'2'">期卡</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="confirm(_member)">确 定</el-button>
				<el-button @click="cancel('form')">取 消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { searchMemberByNum } from '@/store/admin/member'
	export default {
		name: 'MemberForm',
		props: ['member', 'confirm', 'cancel', 'update'],
		data () {
			// 自定义学号校验规则，学号必须是唯一值
			const checkNum = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('学号不能为空'))
				}
				if (value.length !== 10) {
					return callback(new Error('学号必须为 12 位'))
				}
				// 如果是更新会员信息，当学号一致时不做处理
				console.log(this.update, this.member.memberNum, value)
				if (this.update && this.member.memberNum === value) {
					callback()
					return
				}
				searchMemberByNum(value)
					.then(res => {
						if (res.data.length !== 0) {
							callback(new Error('该会员已存在'))
						} else {
							callback()
						}
					})
					.catch(() => {
						callback()
					})
			}
			return {
				// 保存填写新会员的信息
				// member: {
				// 	memberName: '',
				// 	memberNum: '',
				// 	memberTel: '',
				// 	memberAddress: '',
				// 	memberRank: 0
				// },
				rules: {
					memberName: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}, {
						max: 5,
						message: '长度在不能超过 5 个字符',
						trigger: 'blur'
					}],
					memberNum: [{
						validator: checkNum,
						trigger: 'blur'
					}],
					memberTel: [{
						required: true,
						message: '请输入联系方式',
						trigger: 'blur'
					}, {
						max: 11,
						message: '长度不能超过 11 个字符',
						trigger: 'blur'
					}],
					memberAddress: [{
						required: true,
						message: '请输入地址',
						trigger: 'blur'
					}],
					memberRank: [{
						required: true,
						message: '请选择会员类型',
						trigger: 'blur'
					}]
				}
			}
		},
		computed: {
			_member () {
				return Object.assign({}, this.member)
			}
		}
	}
</script>
<style>
	.demo-table-expand {
		font-size: 0;
	}
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
