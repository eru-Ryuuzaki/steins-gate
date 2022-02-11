<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
          exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
          max - 数字。最多可以缓存多少组件实例。 -->
      <keep-alive :include="cachedViews">
        <!-- 这里的 key 作用： 保证路由切换时都会重新渲染触发钩子了。这样简单的多了 -->
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
