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
            }
        },
        data() {
            return {
                textarea: ''
            }
        },
        methods: {
            parseobj() {
                this.textarea = tableContent.api + '';
                //config
                const baseurl = this.obj.config.api.baseurl;
                //replace
                for(var i = 0; i < 4; i ++){
                    this.textarea = this.textarea.replace('{{{baseurl}}}', baseurl);
                }
            }
        },
        watch: {
            obj: {
                deep: true,
                handler(newValue, oldValue) {
                    if(newValue) this.parseobj();
                }
            }
        },
    }
</script>

<style scoped>

</style>