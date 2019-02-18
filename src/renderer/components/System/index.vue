//系统设置
<template>
<div class="system_container">
    <div class="system_title">基本设置</div>
    <div class="system_row">
        <label class="system_label">端口：</label>
        <Input class="system_item" placeholder="请输入数字" v-model="system_port"/>
    </div>

        <div class="system_row">
            <Button type="primary" @click="changeConfig">提交</Button>
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
import {
    update,
    find,
    DB_SYSTEM
} from '@/utils/DB.js'
export default {
    data: function () {
        return {
            system_port: 5000,
        };
    },
    mounted: function () {
        const that = this;
        find(DB_SYSTEM, {}, function (err, docs) {
            that.system_port = (docs && docs[0]) ? docs[0].port : 5000;
        });
    },
    methods: {
        changeConfig: function () {
            update(DB_SYSTEM, {},{$set:{port: this.system_port}}, (error) => {
                Message.success("设置成功,重启后生效");
            });
        }
    },
    components: {
        Input,
        TextArea: Input.TextArea,
        Icon,
        Button
    }
};
</script>

<style>
.system_container {
    padding: 10px;
    width: 100%;
    height: 100%;
}

.system_title {
    font-size: 18px;
    padding: 20px;
}

.system_row {
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    font-size: 16px;
}

.system_label {
    width: 50px;
    line-height: 30px;
}

.system_item {
    width: 200px;
}
</style>
