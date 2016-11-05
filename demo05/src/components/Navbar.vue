<template>
   <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-9" aria-expanded="false">
                        <span class="sr-only">导航菜单</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">OCGUI</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
                    <ul class="nav navbar-nav">
                        <li v-bind:class="{active: activeName==='附加服务' }"><a href="s7Query.html">附加服务</a></li>
                        <li v-bind:class="{active: activeName==='基础数据' }" role="presentation" class="dropdown">
                            <a id="drop4" href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                基础数据<span class="caret"></span>
                            </a>
                            <ul id="menu1" class="dropdown-menu" aria-labelledby="drop4">
                                <li><a href="datasourceQuery.html">数据源</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="mileageExchangeQuery.html">里程积分兑换</a></li>
                            </ul>
                        </li>
                        <li v-bind:class="{active: activeName==='运价校验' }"><a href="validate.html">运价校验</a></li>
                    </ul>
                </div>
            </div>
        </nav> 
</template>

<script>
    export default {
        name: 'navbar',
        props: ['activeName']
    }
</script>
<style>
    
</style>