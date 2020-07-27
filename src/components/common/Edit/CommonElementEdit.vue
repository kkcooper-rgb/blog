<template>
    <div class="CommonEdit">
        <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
        name: "CommonElementEdit",
        data () {
            return {
                content: '',
                editorOption: {}
            }
        },
        methods: {
            submit () {
                console.log(this.$refs.text.value)
            }
        },
        components: {
            quillEditor
        }
    }
</script>

<style scoped lang="less">
</style>
