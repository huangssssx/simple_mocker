<template>
<div class="projectpage_container">
    <div class="layout_alert">
      <Alert type="info">
        <div slot="description">您的所有项目皆在下表展示,点击<span style='color:red;'>超链接</span>将进入项目mock列表界面</div>
      </Alert>
    </div>
    <div class="layout_button_bar">
        <Button type="primary" icon="plus" @click="gotoAddProject">增加</Button>
    </div>
    <Table :columns="columns" :dataSource="projects" :rowKey="record=>record.project_name" :pagination="false">
        <template slot="project_name" slot-scope="text, record">
            <Icon class="icon_style" type="project" />
            <router-link :to="{path:'/projectMocks/',query:{projectName:record.project_name}}">{{record.project_name}}</router-link>
        </template>
        <template slot="project_options" slot-scope="text, record">
          <Popconfirm title="确定要删除这个项目吗?" @confirm="deleteConfirmHandler(record)" okText="Yes" cancelText="No">
            <Icon class="icon_style" type="delete" />
          </Popconfirm>
          <router-link :to="{path:'/projectMocks/',query:{projectName:record.project_name}}" tag="label">
            <Icon class="icon_style" type="ordered-list" @click/>
          </router-link>
        </template>
    </Table>
</div>
</template>

<script>
import {
  Table,
  Button,
  Icon,
  Popconfirm,
  Alert,
} from 'ant-design-vue';
import {
  find,
  remove,
  DB_PROJECTS,
} from '@/utils/DB.js';
const columns = [{
  title: '项目名称',
  dataIndex: 'project_name',
  width: '20%',
  scopedSlots: {
    customRender: 'project_name',
  },
}, {
  title: '描述',
  dataIndex: 'project_des',
  width: '50%',
},
{
  title: '操作',
  dataIndex: 'project_options',
  scopedSlots: {
    customRender: 'project_options',
  },
},
];
export default {
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      const that = this;
      find(DB_PROJECTS, {}, (error, docs) => {
        that.projects = docs;
      });
    },
    gotoAddProject() {
      this.$router.push('/addProject');
    },
    deleteConfirmHandler(record) {
      const that = this;
      remove(DB_PROJECTS, { project_name: record.project_name }, () => {
        that.fetchProjects();
      });
    },
  },
  data() {
    return {
      projects: [],
      columns,
    };
  },
  components: {
    Table,
    Button,
    Icon,
    Popconfirm,
    Alert,
  },
};
</script>

<style>
.projectpage_container {
    padding: 10px;
}
</style>
