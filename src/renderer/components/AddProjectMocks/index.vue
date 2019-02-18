//增加项目mock
<template>
<div class="addProjectMock_container">
    <div class="layout_alert">
        <Alert type="info">
            <div slot="description">此处为项目<span style="color:red;">{{project_name}}</span>的mock增加页面,添加成功后即可通过<a>http://127.0.0.1:{{system_port}}/mocks/{{project_name}}/{{project_mock_path}}</a>访问该mock.(由于是使用静态文件进行模拟所以会出现下载框,使用ajax访问该地址即可得到正常数据。)</div>
        </Alert>
    </div>
    <div class="layout_button_bar">
        <Button type="primary" icon="plus" @click="updateMockInfo">增加</Button>
        <Button @click="formateJsonHandler">Format</Button>
    </div>
    <Input placeholder="路径名" v-model="project_mock_path"/>
    <TextArea placeholder="描述" v-model="describe" :rows="2" class="layout_stop_textarea_resize"/>
    <TextArea class="addProjectMock_textarea layout_stop_textarea_resize" placeholder="内容" :rows="50" v-model="content"/>
</div>
</template>

<script>
/* eslint-disable */
import {
    Input,
    Button,
    Message,
    Alert
} from 'ant-design-vue';
import {
    dynamicInsert,
    dynamicRemove,
    dynamicFind,
    update,
    find,
    DB_SYSTEM
} from '@/utils/DB.js';
import {
    autoLancher,
    thunkify
} from '@/utils/Base.js';
import formatJson from 'json-beautifully';
export default {
    mounted() {
        const that = this;
        find(DB_SYSTEM, {}, function (err, docs) {
            that.system_port = (docs && docs[0]) ? docs[0].port : 5000;
        });
        this.project_name = this.$route.query.projectName;
    },
    data: function () {
        return {
            system_port:"",
            project_name: "",
            project_mock_path: "default",
            describe:"",
            content: `{

}`
        };
    },
    methods: {
        validateJson: function () {
            let tempContent = formatJson(this.content);
            if (Object.is(tempContent, null)) {
                Message.error('格式不正确', 4);
                return false;
            }

            if(this.project_mock_path === ""){
                Message.error('路径名不能为空', 4);
                return false;
            }
            return tempContent;
        },
        formateJsonHandler: function () {
            let tempContent = null;
            if (!(tempContent = this.validateJson())) {
                return;
            };
            this.content = tempContent;
        },
        updateMockInfo: function () {
            if (!this.validateJson()) {
                return;
            };
            const that = this;
            function checkExist(next){
                dynamicFind(`mocks/${this.project_name}/mockList`, {path:that.project_mock_path}, (error,docs) => {
                    if (error) {
                        Message.error("更新失败");
                    }
                    else if(docs && docs.length>0){
                        Message.error("已经存在同名mock");
                    }
                    else{
                        next();
                    }
                });
            }

            //生成mock json文件方便在静态服务器上直接使用
            function insert(next) {
                dynamicInsert(`mocks/${this.project_name}/${this.project_mock_path}`, JSON.parse(this.content), (error) => {
                    if (error) {
                        Message.error("更新失败");
                    } else {
                        next();
                    }
                });
            }

            function remove(next) {
                dynamicRemove(`mocks/${this.project_name}/${this.project_mock_path}`, {}, function (error) {
                    if (error) {
                        Message.error("更新失败");
                    } else {
                        next();
                    }
                });
            }

            function updateProjectMockTable(next) {
                dynamicInsert(`mocks/${this.project_name}/mockList`, {
                    path: this.project_mock_path,
                    describe:this.describe,
                    content:this.content
                }, function (error) {
                    if (error) {
                        Message.error("更新失败");
                    } else {
                        Message.success('保存成功', 2);
                        that.$router.push("/projectMocks");
                        next();
                    }
                });
            }

            const lancher = autoLancher.bind(this);
            lancher(checkExist,remove, insert, updateProjectMockTable);
        }
    },
    components: {
        Input,
        Button,
        TextArea: Input.TextArea,
        Alert
    },
    beforeRouteLeave: function (to, from, next) {
        next();
        if (to.name === "projectMocks-page") {
            next({
                path: `/projectMocks`,
                query:{
                    projectName:this.project_name
                }
            });
            return;
        }
    }
};
</script>

<style>
.addProjectMock_container {
    padding: 10px;
}

.addProjectMock_textarea {
    font-size: 18px;
    font-weight: 500;
    height:350px!important;
    overflow:auto;
}


</style>
