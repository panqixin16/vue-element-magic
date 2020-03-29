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
            },
        },
        data() {
            return {
                textarea: ''
            }
        },
        methods: {
            paraseObj(){
                this.textarea = tableContent.mock + '';
                //读取config
                const config = this.obj.config;
                const pji = config.props_json;
                // const pdbi = config.props_db;
                const baseurl = config.api.baseurl;

                
                //读取数据
                const data = this.obj.data;
                const props_json = data[pji];
    
          

                var res1 = [];
                //props
                for(var i = 0; i < props_json.length; i ++){
                    var str1 = "\t{0}: 'xxx'".replace('{0}', props_json[i]);
                    res1.push(str1);
                }                
                //done
                var item = '{\n' + res1.join(',\n') + '\n}';
                this.textarea = this.textarea.replace('{{{item}}}', item);
                //replace baseurl
                for(var i = 0; i < 4; i ++){
                    this.textarea = this.textarea.replace('{{{baseurl}}}', baseurl);
                }
            },
        },
        watch: {
            obj: {
                // immediate: true,
                deep: true,
                handler(newValue, oldValue) {
                    if(this.obj && this.obj.data && this.obj.config){
                        this.paraseObj();
                    }
                }
            }
        },
        mounted () {
            if(this.obj && this.obj.data && this.obj.config){
                this.paraseObj();
            }
        },
    }
</script>

<style scoped>

</style>