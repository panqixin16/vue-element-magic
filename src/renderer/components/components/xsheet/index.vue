<template>
    <div>
        <el-button v-if='xs' @click="reset" size="mini" style="margin-bottom:5px;">reset</el-button>
        <!-- {{ id }} -->
        <div style="width:100%;overflow:scroll;"  id="x-spreadsheet-demo"></div>
    </div>
</template>

<script>
    import './xsheet/xspreadsheet.js'
    import './xsheet/locale/zh-cn.js'
    export default {
        props: {
            value: {
                type: Number,
                default: 400
            },
            id: {
                type: String,
                default: ''
            },
            prop_json: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                xs: null,
                options: {
                    showToolbar: this.$store.getters.xsheetMenuVisible, 
                    showGrid: true,
                    view: {
                         height: this.getHeight,
                        
                    },
                    row: {
                        len: 10,
                    }
                },
                data: null,
                data0: [{
                    name: 'sheet',
                    // freeze: 'B3',
                    styles: [
                        {
                        // bgcolor: '#000000',
                        textwrap: true,
                        // color: '#900b09',
                        // border: {
                        //     top: ['thin', '#0366d6'],
                        //     bottom: ['thin', '#0366d6'],
                        //     right: ['thin', '#0366d6'],
                        //     left: ['thin', '#0366d6'],
                        // },
                        },
                    ],
                  
                    rows: {
                        0: {
                            cells: {
                                0: { text: 'props-json', editable: false}
                            },
                        },
                        1: {
                            cells: {
                                0: { text: 'props-db', editable: false}
                            },
                        },
                        2: {
                            cells: {
                                0: { text: 'label-zh', editable: false}
                            },
                        },
                        3: {
                            cells: {
                                0: { text: 'label-en', editable: false}
                            },
                        },
                    },
                    }],
            }
        },
        created () {
            // this.data0 = JSON.parse(JSON.stringify(this.data));
            // this.getData();
        },
        methods: {
            getData(){
                var _this = this;
                //从db中获取数据
                if(this.id && this.id != ''){
                    this.$db.find({ _id: this.id }, function (err, docs) {
                        // docs is an array containing documents Mars, Earth, Jupiter
                        // If no document is found, docs is equal to []
                        if(docs && docs!=[]){
                            //找到了对象
                            // console.log('find by _id: '+JSON.stringify(docs[0]));
                            // 读取数据
                            var data = docs[0].data;
                            // console.log('data', data);
                            if(data){
                               _this.data = data; 
                            }else{
                                // console.log('set data by data0');
                                _this.data = JSON.parse(JSON.stringify(_this.data0));
                                // console.log('new data: ', _this.data);
                            }
                            _this.initSheet();
                        }else{
                            console.log('数据不存在');
                        }
                        
                    })
                }
                
            },

            initSheet() {
                var _this = this;
                // var h = document.documentElement.clientHeight
                // console.log('height:' + h);
                // console.log('type: ' + (typeof h));
                x.spreadsheet.locale('zh-cn');
                if(this.xs){
                    this.xs.loadData(this.data);
                }else{
                    this.xs = x.spreadsheet('#x-spreadsheet-demo', _this.options) //view: {height: '100%', width: '100%'}
                        .loadData(_this.data).change((cdata) => {
                            _this.data = _this.xs.getData();//获取最新的数据
                            _this.saveData();//更新数据
                        });
                }
                
            },
            getHeight(){
                return this.value - 30;
            },
            reset(){
                this.$confirm("It's going to reset the content.", 'Tips', {
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    if(this.xs){
                        this.xs.loadData(JSON.parse(JSON.stringify(this.data0)));
                         this.$message({
                            type: 'success',
                            message: 'Done.'
                        });  
                    } 
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel.'
                    });          
                });
            },
            saveData(){
                this.$db.update({ _id: this.id }, { $set: { data: this.data } }, function (err, numReplaced) {
                    // numReplaced = 3
                    // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
                    // console.log('更新了', numReplaced, '条数据');
                });
            }
        },
        mounted () {
            this.getData();;
        },
        watch: {
            value(newValue, oldValue) {
                if(newValue && this.xs && this.xs.options){
                    // this.xs.options.view.height = this.getHeight();
                    this.$set(this.xs.options.view.height, this.getHeight())
                    // this.$forceUpdate();
                } 
            },
            id(val){
                this.getData();
            },
            data(val){
                var newData = [];
                var num = 4;
                for(var i = 0; i < num;i ++)
                    newData.push([]);
                // console.log('data','数据更新了', JSON.stringify(val, null, '\t'));
                // console.log('data 更新了');
                if(val && val.length > 0){
                    var rows = val[0].rows;
                    if(rows[0] && rows[0].cells){
                        for(var key in rows[0].cells){
                            if(key==0) continue;
                            for(var j = 0; j < num;j ++){
                                console.log("prop_json", this.prop_json);
                                if(!rows[this.prop_json].cells || !rows[this.prop_json].cells[key] || !rows[this.prop_json].cells[key].text)
                                    continue;
                                if(rows[j].cells && rows[j].cells[key] && rows[j].cells[key].text)
                                    newData[j].push(rows[j].cells[key].text);
                                else
                                    newData[j].push('null');
                            }
                        }
                    }
                }
                this.$emit('update', newData)
            }
        },
    }
</script>

<style scoped>
@import "./xsheet/xspreadsheet.css";
</style>
<style>
.x-spreadsheet-bottombar{
    display: none;
}
.x-spreadsheet-scrollbar{
    display: none !important;
}
</style>
