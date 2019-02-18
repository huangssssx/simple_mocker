//增加项目
<template>
<div class="addProject_container">
    <div class="addProject_main_container">
        <div class="addProject_row">
            <div class="addProject_require">
                <Label :style="{color:'red'}">*</Label>
            </div>
            <div class="addProject_item">
                <Input  placeholder="项目名称" v-model="project_name"/>
            </div>
        </div>
        <div class="addProject_row">
            <div class="addProject_require">
                <Label></Label>
            </div>
            <div class="addProject_item">
                <TextArea placeholder="描述" v-model="project_des"/>
            </div>
        </div>
        <Button type="primary" :style="{width:'100%'}" @click="addProject">提交</Button>
    </div>
</div>
</template>

<script>
/* eslint-disable */
import {
    Input,
    Button,
    Icon,
    Message
} from 'ant-design-vue';
import {insert,DB_PROJECTS} from '@/utils/DB.js'

export default {
    data: function () {
        return {
            project_name:"",
            project_des:""
        };
    },
    methods: {
        addProject:function(){
            if (!this.project_name) {
                Message.error('请填写项目名', 4);
                return false;
            }

            insert(DB_PROJECTS,{project_name:this.project_name,project_des:this.project_des},(error)=>{
                // console.log(arguments);
                if(error){
                    Message.error('项目创建失败请重试,如果仍然失败请重启', 4);
                    return;
                }
                Message.success('项目创建成功', 4);
                this.$router.push("/");
            });
        }
    },
    components: {
        Input,
        TextArea: Input.TextArea,
        Icon,
        Button,
        Message
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

.addProject_container {
    padding:10px;
    width: 100%;
    height: 100%;
}

.addProject_main_container {
    margin: 100px auto 0px auto;
    width: 500px;
}

.addProject_row {
    margin-left:-10px;
    margin-bottom: 10px;
    display: flex;
}
</style>
