<template>
  <div class="my-container">
    <van-cell-group v-if="user"
                    class="my-info">
      <!-- 用户资料 -->
      <van-cell class="base-info"
                :border="false"
                center>
        <van-image class="avatar"
                   width="50"
                   height="50"
                   slot="icon"
                   round
                   fit="cover"
                   :src="currentUser.photo" />
        <div slot="title"
             class="name">{{currentUser.name}}</div>
        <van-button class="update-btn"
                    size="small"
                    round>编辑资料</van-button>
      </van-cell>
      <!-- 账号数据 -->
      <van-grid :border="false"
                class="data-info">
        <van-grid-item text="文字"
                       class="data-info-item">
          <div slot="text"
               class="text-wrap">
            <div class="count">520</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字"
                       class="data-info-item">
          <div slot="text"
               class="text-wrap">
            <div class="count">520</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字"
                       class="data-info-item">
          <div slot="text"
               class="text-wrap">
            <div class="count">520</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字"
                       class="data-info-item">
          <div slot="text"
               class="text-wrap">
            <div class="count">520</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else
         class="not-login">
      <div class="not-login-icon"
           @click="$router.push('/login')">
        <img class="mobile"
             src="../../assets/images/shouji.jpg"
             alt="">
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid class="nav-grid md-4"
              :column-num="2"
              :border="false">
      <van-grid-item class="nav-grid-item"
                     icon-prefix="iconfont icon"
                     icon="shoucang"
                     text="收藏" />
      <van-grid-item class="nav-grid-item"
                     icon-prefix="iconfont icon"
                     icon="history"
                     text="历史" />
    </van-grid>
    <van-cell class="md-4"
              title="消息通知"
              is-link
              url="/" />
    <van-cell class="md-4"
              title="小智同学"
              is-link
              to="/" />
    <van-cell title="退出登录"
              class="logout-cell"
              v-if="user"
              @click="onLoginout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from 'api/user'

export default {
  name: 'Profile',
  data () {
    return {
      currentUser: {} // 当前登录用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 不建议直接把网络请求逻辑放在created中，最好封装一个方法来包装一下
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser () {
      // 网络请求
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    },
    onLoginout () {
      this.$dialog.confirm({
        title: '退出提示！！！',
        message: '请确认是否退出？',
      })
        .then(() => { // 确认执行这里
          // 清除登录状态,把Vuex中的状态设置为null
          this.$store.commit('setUser', null)
        })
        .catch(() => { // 取消执行这里
          // on cancel
        });
    }
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url("../../assets/images/login_bg.jpg") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
    .data-info {
      .data-info-item {
        height: 65px;
        font-size: 18px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
  }
  .not-login {
    height: 180px;
    background: url("../../assets/images/login_bg.jpg") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .not-login-icon {
      border-radius: 50%;
      .mobile {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .iconfont {
        font-size: 22px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-history {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .md-4 {
    margin-bottom: 4px;
  }
}
</style>
