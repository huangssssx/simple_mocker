//中部内容
<template>
<div class="layout_main_container">
    <transition :name="transitionName">
        <router-view class="transitionBody"/>
    </transition>
</div>
</template>

<script>
/* eslint-disable */
export default {
    data: function () {
        return {
            msg: "中部内容",
            transitionName: "slide-right",
        };
    },
    components: {},
    watch: {
        $route(to, from) {
            const toDepth = to.path.split("/").length;
            const fromDepth = from.path.split("/").length;
            if (to.path == "/") {
                this.transitionName = "transitionRight";
            } else if (from.path == "/") {
                this.transitionName = "transitionLeft";
            } else {
                this.transitionName = toDepth < fromDepth ? "transitionRight" : "transitionLeft";
            }
        }
    }
};
</script>

<style>
.icon_style {
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
}

.layout_alert {
    margin-bottom: 10px;
}

.layout_button_bar {
    height: 40px;
}

.layout_main_container {
    height: auto;
    transition: transform 0.3s ease-out;
}

.globel_textarea {
    font-size: 18px !important;
    font-weight: 500 !important;
}

.transitionBody{
 transition: all 0.1s ease; /*定义动画的时间和过渡效果*/
}
 
.transitionLeft-enter,
.transitionRight-leave-active {
  position:absolute;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0); 
   /*当左滑进入右滑进入过渡动画*/
}
 
.transitionLeft-leave-active,
.transitionRight-enter {
  position:absolute;
  -webkit-transform: translate(-100%, 0); 
  transform: translate(-100%, 0); 
}

.layout_stop_textarea_resize{
    resize:none;
}
</style>
