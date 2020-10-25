<template>
<div class="content">
        <input type="file" ref="file" v-on:change="handleFileUpload"/>
        <v-btn @click="deleteFile">Delete</v-btn>


        <div class="info"
        v-if="typeof fileFullName === 'string'"
        >
            <p>Full file name : [ {{fileFullName}} ]</p>
            <p>File name : [ {{fileName}} ]</p>
            <p>File type : [ {{fileExtencion}} ]</p>
            <p>SHA256 :<br> {{printHashSHA256()}}</p>
            <p>SHA1 :<br> {{printHashSHA1()}}</p>
        </div>

        <div class="loader" v-if="isLoadingInfoAboutFile">
        <Loader />
        </div>

        




        
</div>
</template>




<script>
import Loader from './Loader'
export default {
    data () {
        return {
            isLoadingInfoAboutFile: false,
            fileFullName: null,
            fileName: '',
            fileExtencion: '', 

        }
    },

    methods: {
        handleFileUpload(){
            this.isLoadingInfoAboutFile = true;
            setTimeout(this.getFile, 2000);

            this.isLoadingInfoAboutFile = false;
            
        },

        deleteFile(){
            this.fileFullName = null;
        },

        getFile(){
            this.fileFullName = this.$refs.file.files[0].name;
            let temp = this.fileFullName;
            this.fileExtencion = temp.replace(/.+(?=\.)/,'');
            this.fileName = this.fileFullName.replace(this.fileExtencion,'') ;
        },

        
        printHashSHA256(){
            var sha256 = require('tiny-sha256');
            var hash = sha256(this.fileFullName);
            return hash;
        },

        printHashSHA1()
        {
            var sha1 = require('js-sha1');
            var hash = sha1(this.fileFullName);
            return hash;
        }

    },
    components:{
        Loader,
    }
}
</script>


<style scoped>
.content{
    width: 600px;
    height: 500px;
    text-align: center;
    position: relative;
    margin: 0 auto;
    margin-top: 5%;
    border: solid 2px black;
    background-color: #f0f0f0;
}

.info{
    width: 500px;
    height: 400px;
    position: relative;
    margin: 0 auto;
    margin-top: 3%;
    text-align: left;
    border: solid 2px blue;
    background-color: #f5f5f5;
}

.loader{
    margin-top: 30%;
}
.small-loader{
    width: 30px;
    height: 30px;
}
</style>