<template>
  <span>
        <el-dialog title="用户注册" :visible="true" :before-close="() => onCancel()" width="500px">
            <el-form ref="form" status-icon :model="form" :rules="rules" label-width="80px">
                <el-form-item label="头像">
                    <el-upload class="avatar-uploader" action="/api/file/doctor/head_image" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="headImageUrl" :src="headImageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <!-- <el-form-item label="确认密码" prop="checkPassword">
                    <el-input v-model="form.checkPassword" type="password"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button @click="onCancelDialog">取消</el-button>
                    <el-button type="primary" @click="onSubmit('form')">注册</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </span>
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex'
    import { api } from '@/api'
    import * as types from '@/store/mutation-types'
    import { Message } from 'element-ui'
    export default {
        name: 'register',
        props: ['onCancel'],
        computed: mapGetters({
            currentMember: 'getCurrentMember'
        }),
        methods: {
            ...mapActions(['register']),
            ...mapMutations({
                setCurrentMember: types.SET_CURRENT_MEMBER
            }),
            handleAvatarSuccess(res) {
                this.form.headImage = res
                this.headImageUrl = res.fileUrl
            },
            onSubmit() {
                this.register({
                    ...this.form
                })
                Message({
                    message: '您已注册成功！',
                    type: 'success'
                })
                if (this.onCancel) {
                    this.onCancel(this.form)
                }
            },
            onCancelDialog() {
                if (this.onCancel) {
                    this.onCancel(this.form)
                }
            }
        },
        mounted() {
            console.log('In Login mounted')
        },
        data() {
            var checkMobile = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('手机号不能为空！'))
                }
                if (!/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(value)) {
                    return callback(new Error('手机号格式不正确！'))
                }
            }
            var checkUsername = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('用户名不能为空！'))
                }
            }
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码！'))
                } else {
                    if (this.form.checkPassword !== '') {
                        this.$refs.form.validateField('checkPass')
                    }
                    callback()
                }
            }
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码！'))
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                headImageUrl: null,
                form: {
                    headImage: null,
                    mobile: '',
                    username: '',
                    password: '',
                    checkPassword: ''
                },
                rules: {
                    mobile: [{ validator: checkMobile, trigger: 'blur' }],
                    username: [{ validator: checkUsername, trigger: 'blur' }],
                    // password: [{ validator: validatePass, trigger: 'blur' }, { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }],
                    checkPassword: [{ validator: validatePass2, trigger: 'blur' }, { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }]
                }
            }
        }
    }
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>


