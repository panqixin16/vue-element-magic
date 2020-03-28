<template>
    <div class="components-container">
        <split-pane split="horizontal" @resize="resize" :min-percent='20' :default-percent='40'>
          <template slot="paneL" >
            <div style="height:100%" ref="element">
                <!-- top
                {{ id }} -->
                
                <el-col :span="24">
                    <xsheet v-model="topHeight" :id="id" @update="xsupdate"></xsheet>
                </el-col>
               
            </div>
          </template>
          <template slot="paneR">
            <div style="height:100%;padding-top: 15px;">
                <bottomView :obj.sync="obj"></bottomView>
            </div>
          </template>
        </split-pane>
        
        
    </div>
</template>

<script>
import splitPane from 'vue-splitpane'

import xsheet from './components/xsheet/index'
import bottomView from './components/bottom/index'
export default {
    props: {
        id: '',
    },
    components: { splitPane, xsheet, bottomView },
    data(){
        return{
            topHeight: 400,
            obj: {
                data: null,
                // config: null
                config: {
                    props_json: 0,
                    props_db: 1,
                    label_zh: 2,
                    label_en: 3,
                    withIndex: true, //是否添加默认编号
                    withI18n: true,//是否需要多语言
                    i18nStart: 'test',//表示多语言的前缀
                    buttons: {
                        button_search: {
                            name: 'search',
                            text_zh: '搜索',
                            text_en: 'Search',
                            type: 'primary',
                            pcode: 'search',//权限代号
                            icon: 'el-icon-search'
                        },
                        button_add: {
                            name: 'add',
                            text_zh: '添加',
                            text_en: 'Search',
                            type: 'primary',
                            pcode: 'add',
                            icon: ''
                        },
                        button_edit: {
                            name: 'edit',
                            text_zh: '编辑',
                            text_en: 'Edit',
                            type: 'primary',
                            pcode: 'update',
                            icon: ''
                        },
                        button_delete:{
                            name: 'delete',
                            text_zh: '删除',
                            text_en: 'Delete',
                            type: 'danger',
                            pcode: 'delete',
                            icon: ''
                        },
                        button_cancel: {
                            name: 'cancel',
                            text_zh: '取消',
                            text_en: 'Cancel',
                            type: '',
                            pcode: '',
                            icon: ''
                        },
                        button_confirm: {
                            name: 'confirm',
                            text_zh: '确认',
                            text_en: 'Confirm',
                            type: 'primary',
                            pcode: '',
                            icon: ''
                        }
                    },
                    actions: {
                        name: 'actions',
                        text_zh: '操作',
                        text_en: 'Actions'
                    },
                    api: {
                        js: '@/api/test',
                        baseurl: '/test/'
                    },
                    
                }
            },
        }
    },
    mounted () {
        this.resize();
    },
    methods: {
        resize() {
            // console.log('resize');
            let height= this.$refs.element.offsetHeight; 
            if(height) this.topHeight = height;
            // console.log('top height: ' + height);
        },
        xsupdate(data){
            this.obj.data = data;
            // this.$nextTick(()=>{
            //     this.$set(this.obj, 'data', data)
            // });
            // console.log('xsupdate', JSON.stringify(data))
        }
    },
}
</script>
<style scoped>
.components-container {
    position: relative;
    height: 100%;
}
</style>