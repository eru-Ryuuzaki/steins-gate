// 校验规则 还不够复杂 有空补充
export const rules = {
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度在 1 到 20', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, message: '密码至少设置 4 位', trigger: 'blur' }
  ]
}
