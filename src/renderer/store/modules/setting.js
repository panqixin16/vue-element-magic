const state = {
    copyButtonVisible: true,
    dataTabPaneVisible: false,
    xsheetMenuVisible: false,
  }
  
  const mutations = {
    UPDATE_COPY_BUTTON_VISIBLE(state, visible){
      state.copyButtonVisible = visible
    },
    UPDATE_DATA_TAB_PANE(state, visible){
      state.dataTabPaneVisible = visible
    },
    UPDATE_XSHEET_MENU_VISIBLE(state, visible){
      state.xsheetMenuVisible = visible
    }
  }

  const actions = {
    UPDATE_COPY_BUTTON_VISIBLE (context, visible) {
      context.commit('UPDATE_COPY_BUTTON_VISIBLE', visible)
    },
    UPDATE_DATA_TAB_PANE (context, visible){
      context.commit('UPDATE_DATA_TAB_PANE', visible)
    },
    UPDATE_XSHEET_MENU_VISIBLE(context, visible){
      context.commit('UPDATE_XSHEET_MENU_VISIBLE', visible)
    }
  }
  
  
  export default {
    state,
    mutations,
    actions
  }
  