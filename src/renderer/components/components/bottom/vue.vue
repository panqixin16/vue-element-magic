<template>
    <div>
        <CopyButton :content="textarea"></CopyButton>
        <el-input
        type="textarea"
        :rows="16"
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
            }
        },
        data() {
            return {
                textarea: ''
            }
        },
        mounted () {
            // this.textarea = tableContent.content + '';
        },
        methods: {
            paraseObj(){
                this.textarea = tableContent.content + '';
                //读取config
                const config = this.obj.config;
                const pji = config.props_json;
                const pdbi = config.props_db;
                const lzh = config.label_zh;
                const len = config.label_en;
                const withIndex = config.withIndex;
                const withI18n = config.withI18n;
                const i18nStart = config.i18nStart;
                const btn_search = config.buttons.button_search;
                const btn_add = config.buttons.button_add;
                const btn_edit = config.buttons.button_edit;
                const btn_delete = config.buttons.button_delete;
                const btn_cancel = config.buttons.button_cancel;
                const btn_confirm = config.buttons.button_confirm;
                const actions = config.actions;
                const api = config.api.js;
                //读取数据
                const data = this.obj.data;
                const props_json = data[pji];
                const props_db = data[pdbi];
                const label_zh = data[lzh];
                const label_en = data[len];
                //button >>> 
                // btn_search
                //{{ $t('table.search') }}
                // var str_btn_search = withI18n?"{ $t('0') }}".replace('0', i18nStart+'.'+btn_search.name):btn_search.text_zh;
                // this.textarea = this.textarea.replace('{{{btn_search}}}', this.getBtnText(withI18n, i18nStart, btn_search));
                this.doReplace('{{{btn_search}}}', this.getBtnText(withI18n, i18nStart, btn_search));
                this.doReplace('{{{btn_add}}}', this.getBtnText(withI18n, i18nStart, btn_add));
                this.doReplace('{{{btn_edit}}}', this.getBtnText(withI18n, i18nStart, btn_edit));
                this.doReplace('{{{btn_delete}}}', this.getBtnText(withI18n, i18nStart, btn_delete));
                this.doReplace('{{{btn_cancel}}}', this.getBtnText(withI18n, i18nStart, btn_cancel));
                this.doReplace('{{{btn_confirm}}}', this.getBtnText(withI18n, i18nStart, btn_confirm));

                //actions
                var labelActions = this.getLabel2(withI18n, i18nStart, actions.name, actions.zh);
                this.doReplace('{{{actions}}}', labelActions);

                //api
                this.doReplace('{{{api}}}', api)

                //table-colunm >>>
                // console.log(props_json);
                //<el-table-column :label="$t('table.title')" prop="title" align="center"></el-table-column>
                var tcols = []
                //index
                if(withIndex) tcols.push(tableContent.tb_col_index);
                for(var i = 0; i< props_json.length; i ++){
                    // console.log(props_json[i]);
                    var tcol = tableContent.tb_col + '';//复制字符串
                    tcol = tcol.replace('{{{label}}}', this.getLabel(withI18n, i18nStart, props_json[i]));
                    tcol = tcol.replace('{{{prop}}}', 'prop="0"'.replace('0', props_json[i]));
                    tcols.push(tcol);
                }
                this.doReplace('{{{tb_cols}}}', tcols.join('\n'));

                //form-item >>>
                //<el-form-item :label="$t('table.title')" prop="title"><el-input v-model="temp.title" /></el-form-item>
                //{{{formItems}}}
                //form_item: '<el-form-item {{{label}}} prop="{{{prop}}}"><el-input v-model="temp.{{{prop}}}" /></el-form-item>',
                var items = []
                for(var i = 0; i< props_json.length; i ++){
                    var item = tableContent.form_item + '';//复制字符串
                    item = item.replace('{{{label}}}', this.getLabel(withI18n, i18nStart, props_json[i]));
                    item = item.replace('{{{prop}}}', props_json[i]);
                    item = item.replace('{{{prop}}}', props_json[i]);
                    items.push(item);
                }
                this.doReplace('{{{formItems}}}', items.join('\n'));
                
                //temp restTemp >>>
                //{{{temp}}}  {{{resetTemp}}}
                var temps = [];
                temps.push('{');
                for(var i = 0; i< props_json.length; i ++){
                    var temp = "\t\tkey: '',".replace('key', props_json[i]);
                    temps.push(temp);
                }
                temps.push('\t\t}');
                this.doReplace('{{{temp}}}', temps.join('\n'));
                this.doReplace('{{{resetTemp}}}', temps.join('\n'));
            },
            getBtnText(withI18n, i18nStart, btn){
                return withI18n?"{{ $t('0') }}".replace('0', i18nStart+'.'+btn.name):btn.text_zh;
            },
            getLabel(withI18n, i18nStart, prop){
                return withI18n?':label="$t(\'0\')"'.replace('0', i18nStart+'.'+prop):'label="0"'.replace('0',prop);
            },
            getLabel2(withI18n, i18nStart, prop, zh){
                return withI18n?':label="$t(\'0\')"'.replace('0', i18nStart+'.'+prop):'label="0"'.replace('0',zh);
            },
            doReplace(oldContent, newContent){
                this.textarea = this.textarea.replace(oldContent, newContent);
            },
        },
        watch: {
            obj: {
                // immediate: true,
                deep: true,
                handler(newValue, oldValue) {
                    if(newValue){
                        // console.log('vue.vue',JSON.stringify(newValue))
                        // this.textarea = JSON.stringify(newValue);
                        if(this.obj && this.obj.config)
                            this.paraseObj();
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>