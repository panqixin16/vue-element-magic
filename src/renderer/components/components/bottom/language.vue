<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12">
                <!-- zh-cn -->
                <CopyButton :content="textarea1" label="copy zh"></CopyButton>
                <el-input
                type="textarea"
                :rows="16"
                v-model="textarea1">
                </el-input>
            </el-col>
            <el-col :span="12">
                <!-- en -->
                <CopyButton :content="textarea1" label="copy en"></CopyButton>                
                <el-input
                type="textarea"
                :rows="16"
                v-model="textarea2">
                </el-input>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import tableContent from './templates/table'
    export default {
        props: {
            obj:{
                type: Object,
                default: null,
            },
        },
        data() {
            return {
                textarea1: '',
                textarea2: ''
            }
        },
        methods: {
            paraseObj(){
                //读取config
                const config = this.obj.config;
                const pji = config.props_json;
                const pdbi = config.props_db;
                const lzh = config.label_zh;
                const len = config.label_en;
                const withI18n = config.withI18n;
                const i18nStart = config.i18nStart;
                //读取数据
                const data = this.obj.data;
                const props_json = data[pji];
                //buttons
                const btn_search = config.buttons.button_search;
                const btn_add = config.buttons.button_add;
                const btn_edit = config.buttons.button_edit;
                const btn_delete = config.buttons.button_delete;
                const btn_cancel = config.buttons.button_cancel;
                const btn_confirm = config.buttons.button_confirm;
                const actions = config.actions;
    
                const labels_zh = data[lzh];
                const labels_en = data[len];

                var res1 = [];
                var res2 = [];
                //props
                for(var i = 0; i < props_json.length; i ++){
                    // console.log(props_json[i]);
                    var str1 = "\t{0}: '{1}'".replace('{0}', props_json[i]).replace('{1}', labels_zh[i]);
                    res1.push(str1);
                    var str2 = "\t{0}: '{1}'".replace('{0}', props_json[i]).replace('{1}', labels_en[i]);
                    res2.push(str2)
                }
                //buttons
                res1.push(this.getLang(btn_search));
                res1.push(this.getLang(btn_add));
                res1.push(this.getLang(btn_edit));
                res1.push(this.getLang(btn_delete));
                res1.push(this.getLang(btn_cancel));
                res1.push(this.getLang(btn_confirm));
                res1.push(this.getLang(actions));

                res2.push(this.getLang(btn_search, true));
                res2.push(this.getLang(btn_add, true));
                res2.push(this.getLang(btn_edit, true));
                res2.push(this.getLang(btn_delete, true));
                res2.push(this.getLang(btn_cancel, true));
                res2.push(this.getLang(btn_confirm, true));
                res2.push(this.getLang(actions, true));
                //done
                this.textarea1 = i18nStart + ': {\n' + res1.join(',\n') + '\n},'
                this.textarea2 = i18nStart + ': {\n' + res2.join(',\n') + '\n},'
            },
            getLang(obj, en){
                return "\t{0}: '{1}'".replace('{0}', obj.name).replace('{1}', en?obj.text_en:obj.text_zh);
            }
            
        },
        watch: {
            obj: {
                // immediate: true,
                deep: true,
                handler(newValue, oldValue) {
                    if(newValue){
                        this.paraseObj();
                    }
                }
            }
        },
        mounted () {
            this.paraseObj();
        },
    }
</script>

<style scoped>
.el-col p{
    margin: 5px;
    color: #504e4e;
}
</style>