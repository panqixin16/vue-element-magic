<template>
    <div>
        <el-form v-if="config" ref="form" :inline="true" size="mini" :model="config" label-width="80px">
            <el-form-item label="api">
                <el-input v-model="config.api.js">
                    <template slot="prepend">js:</template>
                </el-input>
                <el-input v-model="config.api.baseurl" style="margin-top:5px;">
                    <template slot="prepend">baseurl:</template>
                </el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="props_json:">
                <el-input-number v-model="config.props_json" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="props_db:">
                <!-- <el-input v-model="config.props_db"></el-input> -->
                <el-input-number v-model="config.props_db" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="withIndex:">
                <el-switch v-model="config.withIndex"></el-switch>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="withI18n:">
                <el-switch v-model="config.withI18n"></el-switch>
            </el-form-item>
            <el-form-item label="i18nStart:" v-show="config.withI18n">
                <el-input v-model="config.i18nStart"></el-input>
            </el-form-item>
               <el-form-item label="label_zh:" v-show="config.withI18n">
                <el-input-number v-model="config.label_zh" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="label_en:" v-show="config.withI18n">
                <el-input-number v-model="config.label_en" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String
            }
        },
        data() {
            return {
                config: null,
                config0: {
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
            }
        },
        methods: {
            getData() {
                var _this = this;
                //从db分钟获取数据
                if(this.id && this.id != ''){
                    this.$db.find({_id: this.id }, function(err, docs){
                        // docs is an array containing documents Mars, Earth, Jupiter
                        // If no document is found, docs is equal to []
                        if(docs && docs!=[]){
                            //找到了对象
                            // console.log('find by _id: '+JSON.stringify(docs[0]));
                            // 读取数据
                            var config = docs[0].config;
                            // console.log('data', data);
                            if(config){
                               _this.config = config; 
                            }else{
                                // console.log('set data by data0');
                                _this.config = JSON.parse(JSON.stringify(_this.config0));
                                // console.log('new data: ', _this.data);
                            }
                        }
                        else{
                            console.log('数据不存在');
                        }
                    });
                }
            },
            saveData(){
                this.$db.update({ _id: this.id }, { $set: { config: this.config } }, function (err, numReplaced) {
                    // numReplaced = 3
                    // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
                    // console.log('更新了', numReplaced, '条数据');
                });
            },
            reset(){
                this.config = JSON.parse(JSON.stringify(this.config0));
           }
        },
        mounted () {
            this.getData();
            this.$emit("update", this.config);
        },
        watch: {
            id(val){
                this.getData();
            },
            config: {
                // immediate: true,
                deep: true,
                handler(newValue, oldValue) {
                    this.saveData();
                    this.$emit("update", this.config);
                }
            },

        },
    }
</script>

<style scoped>

</style>