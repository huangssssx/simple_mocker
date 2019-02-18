//mock 列表
<template>
<div class="projectmocks_container">
    <div class="layout_alert">
        <Alert type="info">
            <div slot="description">此处为项目:<span style="color:red;">{{projectName}}</span>的mock列表,点击【增加】按钮添加新的mock数据</div>
        </Alert>
    </div>
    <div class="layout_button_bar">
        <Button type="primary" icon="plus" @click="gotoAddMock">增加</Button>
    </div>
    <Table :columns="columns" :dataSource="data" :rowKey="record=>`${record.path}_id`" :pagination="false">
        <template slot="path" slot-scope="text, record">
            <a  href="javascript:;" @click="()=>gotoEditMock(record)">{{text}}</a>
        </template>
        <template slot="project_mocks_options" slot-scope="text, record">
            <Popconfirm title="确定要删除这个mock吗?" @confirm="deleteConfirmHandler(record)" okText="Yes" cancelText="No">
                <Icon class="icon_style" type="delete" />
            </Popconfirm>
            <label @click="()=>gotoEditMock(record)">
                <Icon class="icon_style" type="edit" />
            </label>
        </template>
        <template slot="project_mocks_content" slot-scope="text, record">
            <div class="addProject_more" @click="showDrawer(record)">{{record.content}}</div>
        </template>
    </Table>

    <Drawer title="Mock内容"  width=585 placement="right" :closable="false" @close="onClose" :visible="visible">
        <div :style="{height:'600px',overflow:'hidden'}">
            <TextArea class="globel_textarea projectmocks_textarea" :disabled="true" v-model="content"/>
        </div>
    </Drawer>
</div>
</template>

<script>
/* eslint-disable */
import {
    dynamicFind,
    dynamicRemove,
    deleteTable
} from '@/utils/DB.js'
import {
    Table,
    Button,
    Popconfirm,
    Icon,
    Alert,
    Drawer,
    Input
} from 'ant-design-vue';
import {
    insert,
    DB_PROJECTS
} from '@/utils/DB.js';
import formatJson from 'json-beautifully';
const columns = [{
        title: '路径名',
        dataIndex: 'path',
        width: '20%',
        scopedSlots: {
            customRender: 'path'
        },
    },
    {
        title: '消息内容',
        dataIndex: 'content',
        width: '30%',
        scopedSlots: {
            customRender: 'project_mocks_content'
        },
    },
    {
        title: '描述',
        dataIndex: 'describe',
        width: '30%',
    },
    {
        title: "操作",
        dataIndex: "project_mocks_options",
        scopedSlots: {
            customRender: 'project_mocks_options'
        },
    }

];
export default {
    mounted() {
        this.projectName = this.$route.query.projectName;
        this.fetchProjectMocks();
    },
    data: function () {
        return {
            projectName: "",
            columns,
            data: [],
            visible:false,
            content:""
        };
    },
    methods: {
        fetchProjectMocks: function () {
            const that = this;
            dynamicFind(`mocks/${this.projectName}/mockList`, {}, function (err, docs) {
                that.data = docs;
            });
        },
        gotoAddMock: function () {
            this.$router.push({
                path: "/addProjectMocks",
                query: {
                    projectName: this.projectName
                }
            });
        },
        gotoEditMock: function (record) {
            this.$router.push({
                path: "/editProjectMocks/",
                query: {
                    projectName: this.projectName,
                    projectMockPath: record.path
                }
            });
        },
        addProject: function () {
            insert(DB_PROJECTS, {
                project_name: this.project_name,
                project_des: this.project_des
            }, (error) => {});
        },
        deleteConfirmHandler(record) {
            const that = this;

            //unregister mock文件
            dynamicRemove(`mocks/${this.projectName}/mockList`, {
                path: record.path
            }, function () {
                that.fetchProjectMocks();
            });

            //删除mock文件
            deleteTable(`mocks/${this.projectName}/${record.path}`);
        },
        showDrawer(record) {
            this.visible = true;
            this.content = formatJson(record.content);
        },
        onClose() {
            this.visible = false
        },
    },
    components: {
        Table,
        Button,
        Popconfirm,
        Icon,
        Alert,
        Drawer,
        TextArea: Input.TextArea,
    }
};
</script>

<style>
.addProject_require {
    display: inline-block;
    width: 10px;
}

.addProject_item {
    display: inline-block;
    flex: 1;
}

.projectmocks_container {
    padding: 10px;
    width: 100%;
    height: 100%;
}

.addProject_main_container {
    margin: 100px auto 0px auto;
    width: 500px;
}

.addProject_row {
    margin-left: -10px;
    margin-bottom: 10px;
    display: flex;
}

.addProject_more {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
    color:#1890ff;
    cursor:pointer;
}

.projectmocks_textarea{
    height:100%!important;
    border:none;
    background-color: #ffffff;
    color:rgba(0, 0, 0, 0.65);
}
</style>
