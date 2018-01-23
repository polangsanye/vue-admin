<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col class="logo" :class=" collapsed?'logo-collapse-width':'logo-width' ">
                {{collapsed?'':sayName}}
            </el-col>
            <el-col class="tools">
                <el-col class="myicon">
                    <div @click.prevent="collapse">
                        <i class="fa fa-align-justify"></i>
                    </div>
                </el-col>
            </el-col>
            <el-col class="userInfo">
                <el-dropdown>
                    <span class="el-dropdown-link userinfo-inner">
                        <span>{{sysUserName}}</span>
                        <img src="../assets/img/user.png" width="" alt="">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <!--左侧导航-->
            <aside :class="{'menu-collapsed':collapsed}">
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                         @close="handleClose" @select="handleselect" v-show="!collapsed" unique-opened router
                         theme="dark">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title"><i :class="item.iconCls" style="margin-right: 10px"></i>{{item.name}}
                            </template>
                            <el-menu-item v-for="child in item.children"
                                          :index="child.path"
                                          :key="child.path"
                                          v-if="!child.hidden"
                            >{{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
                            <i :class="item.iconCls" style="margin-right: 10px"></i>{{item.children[0].name}}
                        </el-menu-item>
                    </template>
                </el-menu>

                <!--导航菜单折叠后-->
                <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
                    <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
                        <template v-if="!item.leaf">
                            <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)"
                                 @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)"
                                @mouseout="showMenu(index,false)">
                                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path"
                                    class="el-menu-item" style="padding-left: 40px;"
                                    :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">
                                    {{child.name}}
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                            <ul>
                                <li class="el-submenu">
                                    <div class="el-submenu__title el-menu-item"
                                         style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                                         :class="$route.path==item.children[0].path?'is-active':''"
                                         @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </li>
                </ul>

            </aside>
            <!--右侧内容区-->
            <section class="content-container">
                <el-col :span="24" class="breadcrumb-container">
                    <strong class="title">{{$route.name}}</strong>
                    <el-breadcrumb separator="/" class="breadcrumb-inner">
                        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                            {{item.name}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-col :span="24" class="content-wrapper">
                    <transition name="fade">
                       <keep-alive>
                           <router-view></router-view>
                       </keep-alive>
                    </transition>
                </el-col>

            </section>

        </el-col>
    </el-row>
</template>

<script>
  export default{
    data(){
      return {
        sayName: "中钢城发科技有限公司",
        collapsed: false,
        sysUserName:'',
        sysUserAvatar:''
      }
    },
    mounted(){
      let user=sessionStorage.getItem('user');
      if(user){
        user=JSON.parse(user);
        console.log(user);
        this.sysUserName=user.name||'';
        this.sysUserAvatar=user.avatar||''
      }
    },
    methods: {
      collapse(){
        this.collapsed = !this.collapsed;
        console.log(this.$route)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleselect(a, b) {
        console.log(a, b)
      },
      logout(){
        let _this=this;
        this.$confirm('确认退出吗?','提示',{}).then(()=>{
          sessionStorage.removeItem('user');
          _this.$router.push('/login')
        }).catch(()=>{

        })
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
    .container {
        .header {
            height: 60px;
            line-height: 60px;
            background: #20a0ff;
            color: #fff;
            display: flex;
            .logo {
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                text-align: center;
                border-right: 1px solid rgba(238, 241, 146, 0.3);
                &.logo-width {
                    flex: 0 0 230px;
                    width: 230px;
                }
                &.logo-collapse-width {
                    flex: 0 0 60px;
                    width: 60px;
                }
            }
            .tools {
                flex: 1;
                .myicon {
                    width: 66px;
                    padding: 0 23px;
                    text-align: center;
                    height: 60px;
                    line-height: 60px;
                    cursor: pointer;
                }

            }
            .userInfo {
                text-align: right;
                color: #fff;
                padding-right: 35px;
                flex: 0 0 150px;
                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;
                    span {
                        display: inline-block;
                    }
                    img {
                        display: inline-block;
                        vertical-align: top;
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0 10px 10px;
                    }
                }
            }
        }
        .main {
            display: flex;
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            aside {
                flex: 0 0 230px;
                width: 230px;
                font-size: 20px;
                &.menu-collapsed {
                    flex: 0 0 60px;
                    width: 60px;
                    .item {
                        position: relative;
                    }
                    .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

                }
                .el-menu {
                    height: 100%;
                }
            }
            section {
                flex: 1;
                padding: 20px;
                overflow:scroll;
                .breadcrumb-container {
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                    .fade-enter, .fade-leave-to{
                        opacity: 0;
                    };
                    .fade-enter-active, .fade-leave-active {
                        transition: all 0.4s linear;
                    }
                }
            }
        }
    }


</style>