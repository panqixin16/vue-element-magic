<template>
    <div>
        <el-input
        type="textarea"
        :rows="18"
        v-model="textarea">
        </el-input>
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
            type: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                textarea: ''
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
    
                const labels = this.type === 'zh' ? data[lzh]:data[len];

                var res = []
                //props
                for(var i = 0; i< props_json.length; i ++){
                    // console.log(props_json[i]);
                    var str = "{0}: '{1}'".replace('{0}', props_json[i]).replace('{1}', labels[i]);
                    res.push(str);
                }
                //buttons
                res.push(this.getLang(btn_search));
                res.push(this.getLang(btn_add));
                res.push(this.getLang(btn_edit));
                res.push(this.getLang(btn_delete));
                res.push(this.getLang(btn_cancel));
                res.push(this.getLang(btn_confirm));
                res.push(this.getLang(actions));
                //done
                this.textarea = i18nStart + ': {\n' + res.join(',\n') + '\n},'
               
            },
            getLang(obj){
                return "{0}: '{1}'".replace('{0}', obj.name).replace('{1}', this.type === 'zh'?obj.text_zh:obj.text_en);
            }
            
        },
        watch: {
            obj: {
                immediate: true,
                deep: true,
                handler(newValue, oldValue) {
                    if(newValue){
                        this.paraseObj();
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>