<template>
  <div style="height:100%">
    <div>
      <el-button style="width:100%" type="primary" @click="handleAdd">Add</el-button>
      <el-button style="width:100%" type="primary" @click="handleInit" v-if="false">Init</el-button>
    </div>
    <el-menu style="height:100%;" :default-active="defaultIndex" @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse">
      <el-menu-item v-for="item in list" :index="item._id" :key="item._id">
        <i class="el-icon-menu"></i>
        <span slot="title">
          {{ item.name }}
          <el-button type="text" size="mini" icon="el-icon-edit" style="margin-left: 2rem;" @click="handleEdit(item)"></el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" style="margin-left: 0rem;" @click="handleDelete(item)"></el-button>

        </span>
        
      </el-menu-item>
    </el-menu>
    <!-- 添加及编辑弹窗 -->
    <el-dialog
      :title="isCreate?'Add':'Edit'"
      :visible.sync="dialogVisible"
      center>
       <el-input placeholder="name" v-model="temp.name">
        <template slot="prepend">Name: </template>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="isCreate?add():update()">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      list: [],
      dialogVisible: false,
      temp: {
        id: '',
        name: '',
        time: null
      },
      isCreate: true,
      activeIndex: '',
      defaultIndex: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var _this = this;
      // var list = new Array();
      // for (var i = 0; i < 10; i++) {
      //   var item = new Object();
      //   item.id = i + 1 + "";
      //   item.name = "item - " + (i + 1);
      //   list.push(item);
      // }
      this.$db.find({}).sort({ time: 1 }).exec(function (err, docs) {
        // console.log('docs: ' + JSON.stringify(docs));
        _this.list = docs;
        if(docs.length>0) {
          _this.defaultIndex = docs[0]._id;
          _this.activeIndex = docs[0]._id;
        }
      });
      // this.$db.find({},function (err, docs) {
      //   console.log('docs: ' + JSON.stringify(docs));
      //   _this.list = docs;
      // });
      // console.log('db: ' + this.$db);
      // Removing all documents with the 'match-all' query
// this.$db.remove({}, { multi: true }, function (err, numRemoved) {
// });
      // this.list = list;
      // console.log(JSON.stringify(this.list));
    },
    handleAdd(){
      this.isCreate = true;
      this.dialogVisible = true;
      var temp = {
        id: (new Date()).getTime() + '',
        name: '',
        time: (new Date()).getTime()
      }
      this.temp = temp;
    },
    add(){
      var _this = this;
      if(this.temp && this.temp.name != ''){
        //to-do
        this.$db.insert(_this.temp, function (err, newDoc) {   // Callback is optional
          // console.log('newDoc: ' + JSON.stringify(newDoc));
          _this.getList();
          _this.$message({
            message: 'Add success.',
            type: 'success'
          });
          _this.dialogVisible = false;
        });
        
      }else{
        this.$message.error('name is empty.');
      }
    },
    handleEdit(item){
      var temp = Object.assign({}, item);
      this.temp = temp;
      this.isCreate = false;
      this.dialogVisible = true;
    },
    update(){
      var _this = this;
      if(this.temp && this.temp.name != ''){
        //to-do
        this.$db.update({ _id: _this.temp._id }, { $set: { name: _this.temp.name } }, { multi: true }, function (err, numReplaced) {
          _this.getList();
          _this.$message({
            message: 'Update success.',
            type: 'success'
          });
          _this.dialogVisible = false;
        });
        
      }else{
        this.$message.error('name is empty.');
      }
    },
    handleDelete(item){
      var _this = this;
      this.$confirm('Delete {'+ item.name +'}, continue?', 'Tips', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          //to-do 
          console.log('item._id: '+item._id);
          this.$db.remove({_id: item._id}, { multi: true }, function (err, numRemoved) {
            _this.getList();
            if(_this.activeIndex == _this.temp.id){
              _this.activeIndex = '';
              // _this.$emit('selectId', _this.activeIndex);
            }
            _this.$message({
              type: 'success',
              message: 'Delete success!'
            });
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Canceled'
          });          
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index, indexpath){
      console.log(index, indexpath)
      this.activeIndex = index;
      // this.$emit('selectId', index);
      // this.$db.find({ id: index }, function (err, docs) {
      //   // docs is an array containing documents Mars, Earth, Jupiter
      //   // If no document is found, docs is equal to []
      //   console.log('find by index: '+JSON.stringify(docs));
      // })
    },
    handleInit(){
      console.log('init');
      this.$db.remove({}, { multi: true }, function (err, numRemoved) {
        console.log('numRemoved: ' + numRemoved)
      });

      var list = new Array();
      for (var i = 0; i < 10; i++) {
        var item = new Object();
        item.id = i + 1 + "";
        item.name = "item - " + (i + 1);
        item.time = (new Date()).getTime() + i;
        list.push(item);
      }
      this.$db.insert(list, function (err, newDoc) {   // Callback is optional
          console.log('newDoc: ' + JSON.stringify(newDoc));
      });
    }
  },
  watch: {
    activeIndex(newValue, oldValue) {
      this.$emit('selectId', newValue);
    }
  },
};
</script>

<style scoped>
.el-menu-item:hover .el-button{
 display: inline-block;
}
.el-menu-item .el-button{
 display: none;
}
</style>