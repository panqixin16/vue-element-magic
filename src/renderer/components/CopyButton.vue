<template>
    <div style="margin-bottom: 5px" v-if="$store.getters.copyButtonVisible">
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleCopy(content,$event)">
          {{ label }}
        </el-button>
    </div>
</template>

<script>
import clip from '@/utils/clipboard' // use clipboard directly
export default {
    name: "CopyButton",
    props: {
        content: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: 'copy'
        }
    },
    methods: {
        handleCopy(text, event) {
            clip(text, event);
        },
    },
}
</script>

<style scoped>

</style>