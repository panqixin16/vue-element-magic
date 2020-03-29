<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Setting</h3>

      <div class="drawer-item">
        <span>copy button</span>
        <el-switch v-model="visible" class="drawer-switch" />
      </div>
      
      <div class="drawer-item">
        <span>data tab</span>
        <el-switch v-model="dvisible" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Sheet Menu</span>
        <el-switch v-model="xvisible" class="drawer-switch" />
      </div>
      <a href="https://www.vetop.top" target="_blank" class="logo-link" v-if="false">
        <el-alert
          title="Vetop"
          type="success"
          :closable="false"
        />
      </a>
      <div class="logo-link">
        <el-avatar :size="80" fit="cover" :src="src"></el-avatar>
        <div>
            <!-- <el-link href="https://www.vetop.top" target="_blank">https://www.vetop.top</el-link> -->
            <el-button type="text" @click="handleClick">https://www.vetop.top</el-button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      src: 'static/logo.png'
    }
  },
  computed: {
    visible: {
      get() {
        return this.$store.getters.copyButtonVisible
      },
      set(val) {
        this.$store.dispatch('UPDATE_COPY_BUTTON_VISIBLE', val);
      }
    },
    dvisible: {
      get() {
        return this.$store.getters.dataTabPaneVisible
      },
      set(val) {
        this.$store.dispatch('UPDATE_DATA_TAB_PANE', val);
      }
    },
    xvisible: {
      get() {
        return this.$store.getters.xsheetMenuVisible
      },
      set(val) {
        this.$store.dispatch('UPDATE_XSHEET_MENU_VISIBLE', val);
      }
    },
  },
  methods: {
    handleClick() {
      require('electron').shell.openExternal('https://www.vetop.top');
    }
  },
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }

  .logo-link{
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    text-align: center;
    margin-bottom: 5px;
  }
}
</style>
