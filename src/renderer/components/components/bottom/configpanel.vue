<template>
    <div>
        <el-form ref="form" :inline="true" size="mini" :model="value" label-width="80px">
            <el-form-item label="api">
                <el-input v-model="value.api.js">
                    <template slot="prepend">js:</template>
                </el-input>
                <el-input v-model="value.api.baseurl" style="margin-top:5px;">
                    <template slot="prepend">baseurl:</template>
                </el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="props_json:">
                <el-input v-model="value.props_json"></el-input>
            </el-form-item>
            <el-form-item label="props_db:">
                <el-input v-model="value.props_db"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="withIndex:">
                <el-switch v-model="value.withIndex"></el-switch>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="withI18n:">
                <el-switch v-model="value.withI18n"></el-switch>
            </el-form-item>
            <el-form-item label="i18nStart:" v-show="value.withI18n">
                <el-input v-model="value.i18nStart"></el-input>
            </el-form-item>
               <el-form-item label="label_zh:" v-show="value.withI18n">
                <el-input v-model="value.label_zh"></el-input>
            </el-form-item>
            <el-form-item label="label_en:" v-show="value.withI18n">
                <el-input v-model="value.label_en"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Object,
            }
        }
    }
</script>

<style scoped>

</style>