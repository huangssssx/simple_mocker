//主框架
<template>
<div class="main_container">
    <Layout>
        <Sider class="main_slider" :trigger="null" collapsible v-model="collapsed">
            <div class="main_logo" >Mock</div>
            <Menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" @click="menuItemClickHandler">
              <Item key="1">
                  <Icon type="file" />
                  <span>MOCK配置</span>
              </Item>
              <Item key="2">
                <Icon type="setting" />
                <span>系统配置</span>
              </Item>
            </Menu>
        </Sider>
        <Layout>
          <Header :style="{background:'#ffffff',padding:'0px 50px 0 0px'}">
            <Nav @siderEvent="siderSwitchHandler"/>
          </Header>
          <Content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '600px' }">
            <Body/>
          </Content>
        </Layout>
    </Layout>

    <!-- Tab panes -->

</div>
</template>

<script>
/* eslint-disable */
import Nav from "./Nav.vue";
import Body from "./Body.vue";
import {
    Layout,
    Menu,
    Icon
} from 'ant-design-vue';

export default {
    methods: {
      siderSwitchHandler:function(state){
        this.collapsed = state;
      },
      menuItemClickHandler:function(item){
        switch(item.key){
            case "1":
                this.$router.push("/");
                break;
            case "2":
                this.$router.push("/system");
                break;
            default:
                 this.$router.push("/");
                 break;
        }
      }
    },
    data: function () {
        return {
            msg: "主框架",
            collapsed:true
        };
    },
    components: {
        Nav,
        Body,
        Layout,
        Menu,
        Icon,
        Item:Menu.Item,
        Sider: Layout.Sider,
        Header: Layout.Header,
        Content: Layout.Content
    }
};
</script>

<style>
.main_logo{
    text-align:center;
    color:#ffffff!important;
    height: 32px;
    margin: 16px;
    font-size: 20px;
    font-weight: 900;
    margin-right: 60px;
}
.main_container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.main_slider{
    z-index:999;
}
</style>
