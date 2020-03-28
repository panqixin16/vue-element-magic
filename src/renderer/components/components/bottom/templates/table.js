export default{
  content: `
  <template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.search" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        <!-- {{ $t('table.search') }} -->
        {{{btn_search}}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        <!-- {{ $t('table.add') }} -->
        {{{btn_add}}}
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- <el-table-column :label="$t('table.title')" prop="title" align="center"></el-table-column> -->

      {{{tb_cols}}}

      
      <el-table-column {{{actions}}} align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row, $index)">
            <!-- {{ $t('table.edit') }} -->
            {{{btn_edit}}}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            <!-- {{ $t('table.delete') }} -->
            {{{btn_delete}}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center>
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
        <!-- <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item> -->
       {{{formItems}}}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          <!-- {{ $t('table.cancel') }} -->
          {{{btn_cancel}}}
        </el-button>
        <el-button type="primary" :loading="confirmLoading" @click="dialogStatus==='create'?createData():updateData()">
          <!-- {{ $t('table.confirm') }} -->
          {{{btn_confirm}}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, create, update, del } from '{{{api}}}' //'@/api/test'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  // name: 'testTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        search: '',
      },
      curIndex: null,
      // temp: {
      //   id: undefined,
      //   importance: 1,
      //   remark: '',
      //   timestamp: new Date(),
      //   title: '',
      //   type: '',
      //   status: 'published'
      // },
      temp: {{{temp}}},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      confirmLoading: false,
      rules: {
        // name: [{ required: true, message: 'type is required', trigger: 'change' }],
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      // this.temp = {
      //   id: undefined,
      //   title: '',
      // }
      this.temp = {{{resetTemp}}}
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.confirmLoading = false;
          create(this.temp).then(() => {
            // this.list.unshift(this.temp)//列表开头添加新的元素，若是id由前端创建可以这样做
            this.dialogFormVisible = false
            this.$message({
              message: 'Create success',
              type: 'success'
            });
            this.getList();
          }).finally(() => {
            this.confirmLoading = false;
          })
        }
      })
    },
    handleUpdate(row, index) {
      this.curIndex = index
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.confirmLoading = false;
          update(tempData).then(() => {
            const index = this.curIndex
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$message({
              message: 'Update success',
              type: 'success'
            });
          }).finally(() => {
            this.confirmLoading = false;
          })
        }
      })
    },
    handleDelete(row, index) {
      console.log('handleDelete', index);
      this.$confirm('Confirm delete?', 'Tips', {
          // confirmButtonText: '确定',
          // cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteData(row, index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel delete.'
          });          
        });
    },
    deleteData(row, index){
      this.listLoading = true;
      del(row).then(() => {
        this.list.splice(index, 1)
        this.$message({
              message: 'Delete success',
              type: 'success'
        });
      }).finally(() => {
          this.listLoading = false
      })
    }
  }
}
</script>
  `,
  tb_col_index: '<el-table-column type="index" label="#"></el-table-column>',
  tb_col: '<el-table-column {{{label}}} {{{prop}}} align="center"></el-table-column>',
  form_item: '<el-form-item {{{label}}} prop="{{{prop}}}"><el-input v-model="temp.{{{prop}}}" /></el-form-item>',
  api: `
  import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '{{{baseurl}}}list',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '{{{baseurl}}}create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '{{{baseurl}}}update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '{{{baseurl}}}del',
    method: 'post',
    data
  })
}

  `
}



