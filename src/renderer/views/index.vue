<template>
    <div>
        <el-container style="height:100vh;border: 1px solid #eee">
        <el-aside width="200px">
             <sideMenu @selectId="handleSelectId"></sideMenu>
        </el-aside>
        <el-main>
            <mainView :id="id"></mainView>
        </el-main>
        </el-container>
    </div>
</template>

<script>
import sideMenu from '@/components/SideMenu'
import mainView from '@/components/Main'
export default {
    components: {
        sideMenu,
        mainView
    },
    data(){
        return{
            id: '',
        }
    },
    methods: {
        handleSelectId(id){
            console.log('selectId',id);
            this.id = id;
            console.log('this.id', this.id);
        }
    }
}
</script>