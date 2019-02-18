//修改项目mock
<template>
<div class="editProjectMock_container">
    <div class="layout_alert">
        <Alert type="info">
            <div slot="description"><a>http://127.0.0.1:{{system_port}}/mocks/{{project_name}}/{{project_mock_path}}</a>的mock修改页面</div>
        </Alert>
    </div>
    <div class="layout_button_bar">
        <Button type="primary" icon="edit" @click="updateMockInfo" >修改</Button>
        <Button @click="formateJsonHandler">Format</Button>
    </div>
    <Input placeholder="路径名" v-model="project_mock_path" :disabled="true"/>
    <TextArea placeholder="描述" v-model="describe" :rows="2" class="layout_stop_textarea_resize"/>
    <TextArea class="editProjectMock_textarea layout_stop_textarea_resize" placeholder="内容" :rows="50" v-model="content"/>
    </div>
</template>

<script>
import {
  Input,
  Button,
  Message,
  Alert,
} from 'ant-design-vue';
import {
  dynamicInsert,
  dynamicRemove,
  dynamicUpdate,
  dynamicFind,
  find,
  DB_SYSTEM
} from '@/utils/DB.js';
import {
  autoLancher,
  thunkify,
} from '@/utils/Base.js';
import formatJson from 'json-beautifully';
export default {
  mounted() {
    const that = this;
    find(DB_SYSTEM, {}, function (err, docs) {
        that.system_port = (docs && docs[0]) ? docs[0].port : 5000;
    });
    this.project_name = this.$route.query.projectName;
    this.project_mock_path = this.$route.query.projectMockPath;
    dynamicFind(`mocks/${this.project_name}/${this.project_mock_path}`, {}, (err, docs) => {
      if (err) {
        Message.error(err);
        return;
      }

      if (!docs || docs.length == 0) {
        Message.error('找不到数据');
        return;
      }

      that.content = formatJson(JSON.stringify(docs[0]));
    });

    dynamicFind(`mocks/${this.project_name}/mockList`, {
      path: this.project_mock_path,
    }, (err, docs) => {
      if (err) {
        Message.error(err);
        return;
      }

      if (!docs || docs.length == 0) {
        Message.error('找不到数据');
        return;
      }
      that.describe = docs[0].describe || '';
      console.log(docs[0]);
    });
  },
  data() {
    return {
      system_port:"",
      project_name: '',
      project_mock_path: '',
      content: '{}',
      describe: '',
    };
  },
  methods: {
    validateJson() {
      const tempContent = formatJson(this.content);
      if (Object.is(tempContent, null)) {
        Message.error('格式不正确', 4);
        return false;
      }
      return tempContent;
    },
    formateJsonHandler() {
      let tempContent = null;
      if (!(tempContent = this.validateJson())) {
        return;
      }
      this.content = tempContent;
    },
    updateMockInfo() {
      if (!this.validateJson()) {
        return;
      }
      const that = this;

      function insert(next) {
        dynamicInsert(`mocks/${this.project_name}/${this.project_mock_path}`, JSON.parse(formatJson(this.content)), (error) => {
          if (error) {
            Message.error('更新失败');
          } else {
            next();
          }
        });
      }

      function remove(next) {
        dynamicRemove(`mocks/${this.project_name}/${this.project_mock_path}`, {}, (error) => {
          if (error) {
            Message.error('更新失败');
          } else {
            next();
          }
        });
      }

      function updateProjectMockTable(next) {
        dynamicUpdate(`mocks/${this.project_name}/mockList`, {
          path: this.project_mock_path,
        }, {
          $set: {
            describe: this.describe,
            content: this.content,
          },
        }, (error) => {
          if (error) {
            Message.error('更新失败');
          } else {
            Message.success('修改成功', 2);
            that.$router.push('/projectMocks');
            next();
          }
        });
      }

      const lancher = autoLancher.bind(this);
      lancher(remove, insert, updateProjectMockTable);
    },
  },
  components: {
    Input,
    Button,
    TextArea: Input.TextArea,
    Alert,
  },
  beforeRouteLeave(to, from, next) {
    next();
    if (to.name === 'projectMocks-page') {
      next({
        path: '/projectMocks',
        query: {
          projectName: this.project_name,
        },
      });
    }
  },
};
</script>

<style>
.editProjectMock_container {
    padding: 10px;
}

.editProjectMock_textarea {
    font-size: 18px;
    font-weight: 500;
    height:350px!important;
    overflow:auto;
}

</style>
