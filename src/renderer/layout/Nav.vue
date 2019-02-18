//导航
<template>
    <div>
    <Icon :style="{marginLeft:'10px',float:'left',lineHeight: '64.5px'}" :type="this.isSpread?'menu-unfold':'menu-fold'" @click="switchSiderHander"/>
    <Breadcrumb class="nav_container" :style="{float:'left'}">
        <Item v-for="(item,index) in breads">
            <router-link v-if="index<(breads.length-1)" :to="item.path" exact>{{item.name}}</router-link>
            <span v-if="index>=(breads.length-1)">{{item.name}}</span>
        </Item>
    </Breadcrumb>
    </div>
</template>

<script>
import { Breadcrumb } from 'ant-design-vue';
import { Icon } from 'ant-design-vue';
/* eslint-disable */
export default {
    mounted: function () {
        this.breads = this.$router.history.current.meta.breadcrumb;
        this.$router.afterEach((to, from) => {
            // console.log(to.meta.breadcrumb);
            this.breads = to.meta.breadcrumb;
        });
    },
    methods: {
        switchSiderHander:function(){
            this.isSpread = !this.isSpread;
            this.$emit('siderEvent',this.isSpread)
        }
    },
    data: function () {
        return {
            msg: "上部导航",
            breads: [{
                name: "首页",
                path: "/"
            }],
            isSpread:true,
        };
    },
    components: {
        Breadcrumb,
        Item: Breadcrumb.Item,
        Icon
    }
};
</script>

<style>
.nav_container {
    height: 64px;
    padding: 10px;
    line-height: 40px;
}
</style>
