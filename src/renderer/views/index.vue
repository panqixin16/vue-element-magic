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
        <right-panel v-if="true">
            <settings />
            
        </right-panel>
    </div>
</template>

<script>
import sideMenu from '@/components/SideMenu'
import mainView from '@/components/Main'
import RightPanel from '@/components/RightPanel'
import settings from '@/components/settings'
export default {
    components: {
        sideMenu,
        mainView,
        RightPanel,
        settings
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