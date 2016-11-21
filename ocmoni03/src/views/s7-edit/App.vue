<template>
    <div class ="s7editpage">
        <div class="header-container ">
            <div class="navbar-fixed-top">
                 <Navbar/>
                <QuerySection />
            </div>
        </div>
        
        <div class="container-fluid main_content" >
           <oc-form :model ="formData" :rules="formRule">
               <oc-form-item1 label="用户名" :required="true">
                   <oc-input v-model ="formData.name" />
               </oc-form-item1>
           </oc-form>
        </div>

    </div>
</template>
<script>
    import Navbar from '../common/Navbar.vue' ;
    import QuerySection from './QuerySection.vue' ;
    export default {
        components:{
            Navbar,
            QuerySection
        },
        data(){
            return {
                formData:{
                    name:''
                },
                formRule:{

                }
            } ;
        }
    }
</script>
