<template>
    <div>
        <el-tabs type="border-card" value="vue" style="height:100%">
            <el-tab-pane label="data" v-if="$store.getters.dataTabPaneVisible">
                {{ json }}
            </el-tab-pane>
            <el-tab-pane name="config">
                <span slot="label"><i class="el-icon-s-tools"></i> config</span>
                <div style="min-heigth:400px;">
                    <configpanel :id="id" @update="updateConfig"></configpanel>
                </div>
            </el-tab-pane>
            <el-tab-pane label="vue" name="vue">
                <vueContent :obj="obj"></vueContent>
            </el-tab-pane>
            <el-tab-pane label="api" name="api">
                <apiContent :obj='obj'></apiContent>
            </el-tab-pane>
            <el-tab-pane label="language" name="language" v-if="obj&&obj.config&&obj.config.withI18n">
                <language :obj="obj"></language>
            </el-tab-pane>
            <el-tab-pane label="Mock" name="Mock">
                <mock :obj="obj"></mock>
            </el-tab-pane>
        </el-tabs>  
    </div>
</template>

<script>
import tableContent from './templates/table'
import configpanel from './configpanel';
import vueContent from './vue'
import apiContent from './api'
import language from './language'
import mock from './mock'
    export default {
        props: {
            id: {
                type: String,
            },
            data:{
                type: Array,
                default: []
            }
        },
        components: {
            configpanel,
            vueContent,
            apiContent,
            // lang,
            language,
            mock
        },
        data(){
            return{
                json: '',
                obj: {
                    data: this.data,
                    config: null,
                }
            }
        },
        methods: {
            updateConfig(config){
                this.obj.config = config;
            }
        },
        created () {
            // console.log('table template content\n', tableContent.content);
        },
        watch: {
            data: {
                handler: function(newValue, oldValue){
                    // console.log('obj.data watcher...', newValue);
                    if(newValue) {
                        this.json = JSON.stringify(newValue, null, '\t');
                        // console.log('bottom', this.json);
                    }
                    this.obj.data = this.data;
                },
                deep: true
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>