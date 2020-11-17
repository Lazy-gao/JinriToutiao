<template>
  <div class="login-container">
    <!-- 头部导航栏 -->
    <van-nav-bar title="登录"
                 class="app-nav-bar"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 登录表单 -->
    <!--
      1、 使用 van-form 组件包裹所有的表单项，van-field
      2、 给 van-form 绑定 submit 事件
            当表单提交的时候会触发 submit 事件
            提示：只有表单验证通过，它才会调用 submit
      3、 使用 Field 的 rules 属性定义校验规则
     -->
    <!--
    submit:提交表单且验证通过后触发,
    failed:提交表单且验证不通过后触发,
    validate-first：是否在某一项校验不通过时停止校验
    -->
    <van-form @submit="onLogin"
              :show-error="false"
              :show-error-message="false"
              @failed="onFailed"
              validate-first
              ref="login-form">
      <van-field v-model="user.mobile"
                 icon-prefix="iconfont icon"
                 left-icon="shouji"
                 placeholder="请输入手机号"
                 name="mobile"
                 center
                 :rules="formRules.mobile" />
      <van-field v-model="user.code"
                 clearable
                 icon-prefix="iconfont icon"
                 left-icon="yanzhengma"
                 placeholder="请输入验证码"
                 name="code"
                 center
                 :rules="formRules.code">
        <template #button>
          <!-- 倒计时 finish：倒计时结束后触发 -->
          <van-count-down v-if="isCountDownShow"
                          :time="1000 * 60"
                          format="ss s"
                          @finish="isCountDownShow=false" />
          <!-- 发送验证码按钮 -->
          <van-button v-else
                      size="small"
                      class="send-btn"
                      round
                      :loading="isSendSmsLoading"
                      @click.prevent="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button type="info"
                    class="login-btn"
                    block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from 'api/user';
import { Toast } from 'vant'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '17090086870', // 手机号
        code: '246810' // 验证码
      },
      // 表单验证规则
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: onblur },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误', }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: onblur },
          { pattern: /^\d{6}$/, message: '验证码格式错误', }
        ]
      },
      isCountDownShow: false, // 控制倒计时和发送按钮的显示状态
      isSendSmsLoading: false // 发送验证码按钮的 loading 状态
    };
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登录中...',// 提示文本
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      });
      // 1. 找到数据接口
      // 2. 封装请求方法
      // 3. 请求调用登录
      try {
        const { data = res.data } = await login(this.user);
        // 4.处理响应结果
        Toast.success('登录成功')
        // 将后端返回的用户登录状态（token等数据）放在Vuex容器中
        this.$store.commit('setUser', data)
        // 登录成功，跳转回原来页面
        this.$router.back()
      } catch (err) {
        console.log(err);
        Toast.fail('手机号或验证码错误')
      }
    },
    // 提交表单且验证不通过后触发
    onFailed (error) {
      if (error.errors[0]) {
        // 使用 Toast 提示
        Toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 防止手机键盘太高看不见提示消息，所以设置提示消息的位置
        })
      }
    },
    async onSendSms () {
      // 校验手机号码
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
        await sendSms(this.user.mobile)

        // 短信发出去了，隐藏发送按钮，显示倒计时
        this.isCountDownShow = true
        // 倒计时结束 -> 隐藏倒计时，显示发送按钮（监视倒计时的 finish 事件处理）
      } catch (err) {
        // try 里面任何代码的错误都会进入 catch
        // 不同的错误需要有不同的提示，那就需要判断了
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name = 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        Toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false

      // 验证通过 -> 请求发送验证码 -> 用户接收短信 -> 输入验证码 -> 请求登录
      // 请求发送验证码 -> 隐藏发送按钮，显示倒计时
      // 倒计时结束 -> 隐藏倒计时，显示发送按钮

    },
  }
};
// 17090086870
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .send-btn {
    width: 80px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
}
</style>
