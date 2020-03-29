<template>
    <div class="components-container">
        <split-pane split="horizontal" @resize="resize" :min-percent='20' :default-percent='40'>
          <template slot="paneL" >
            <div style="height:100%" ref="element">
                <!-- top
                {{ id }} -->
                
                <el-col :span="24">
                    <xsheet :key="timestamp" v-model="topHeight" :id="id" :prop_json="(obj && obj.config && obj.config.prop_json)?obj.config.prop_json:0" @update="xsupdate"></xsheet>
                </el-col>
               
            </div>
          </template>
          <template slot="paneR">
            <div style="height:100%;padding-top: 15px;">
                <bottomView :data.sync="data" :id="id"></bottomView>
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
            data: null,
            timestamp: (new Date()).getTime(),
            obj: {
                data: null,
                config: null
            },
        }
    },
    mounted () {
        this.resize();
    },
    computed: {
        xsheetMenuVisible() {
            return this.$store.getters.xsheetMenuVisible
        }
    },
    methods: {
        resize() {
            // console.log('resize');
            let height= this.$refs.element.offsetHeight; 
            if(height) this.topHeight = height;
            // console.log('top height: ' + height);
        },
        xsupdate(data){
            this.data = data;
            // this.$nextTick(()=>{
            //     this.$set(this.obj, 'data', data)
            // });
            console.log('xsupdate', JSON.stringify(data))
        }
    },
    watch: {
        xsheetMenuVisible(newValue, oldValue) {
            this.timestamp = (new Date()).getTime();
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