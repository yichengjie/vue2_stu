<template>
     <ElForm ref="form" :model="form" label-width="80px">
        <ELFormItem label="活动名称">
            <input v-model="form.name" />
        </ELFormItem>
     </ElForm>
</template>
<script>
    import ElForm from "./form.vue" ;
    import ELFormItem from './form-item.vue' ;
    export default {
         data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        },
        components:{
            ElForm,
            ELFormItem
        }
    }
</script>