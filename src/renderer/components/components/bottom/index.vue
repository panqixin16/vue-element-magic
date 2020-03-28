<template>
    <div>
        <el-tabs type="border-card" style="height:100%">
            <el-tab-pane label=“json”>
                {{ json }}
            </el-tab-pane>
            <el-tab-pane >
                <span slot="label"><i class="el-icon-s-tools"></i> config</span>
                <div style="min-heigth:400px;">
                    <configpanel v-model="obj.config"></configpanel>
                </div>
            </el-tab-pane>
            <el-tab-pane label="vue">
                <vueContent :obj="obj"></vueContent>
            </el-tab-pane>
            <el-tab-pane label="api">
                <apiContent :obj='obj'></apiContent>
            </el-tab-pane>
            <el-tab-pane label="lang-zh" v-if="obj&&obj.config&&obj.config.withI18n">
                <lang :obj="obj" type="zh"></lang>
            </el-tab-pane>
            <el-tab-pane label="lang-en" v-if="obj&&obj.config&&obj.config.withI18n">
                <lang :obj="obj" type="en"></lang>
            </el-tab-pane>
            <!-- <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
        </el-tabs>  
    </div>
</template>

<script>
import tableContent from './templates/table'
import configpanel from './configpanel';
import vueContent from './vue'
import apiContent from './api'
import lang from './lang'
    export default {
        props: {
            obj:{
                type: Object,
                default: {}
            }
        },
        components: {
            configpanel,
            vueContent,
            apiContent,
            lang
        },
        data(){
            return{
                json: ''
            }
        },
        methods: {
        },
        created () {
            // console.log('table template content\n', tableContent.content);
        },
        watch: {
            obj: {
                handler: function(newValue, oldValue){
                    // console.log('obj.data watcher...', newValue);
                    if(newValue) {
                        this.json = JSON.stringify(newValue, null, '\t');
                        // console.log('bottom', this.json);
                    }
                },
                deep: true
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>