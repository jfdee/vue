<template>
<div class="content">
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload"/>

        <div class="info"
        v-if="typeof fileFullName === 'string'"
        >
            <p>Full file name : [ {{fileFullName}} ]</p>
            <p>File name : [ {{fileName}} ]</p>
            <p>File type : [ {{fileExtencion}} ]</p>
            <p>SHA256 :<br> {{printHashSHA256()}}</p>
            <p>SHA1 :<br> {{printHashSHA1()}}</p>
        </div>

        <div class="loader">
        <Loader v-if="isLoading"/>
        </div>

        




        
</div>
</template>




<script>
import Loader from './Loader'
export default {
    data () {
        return {
            isLoading: true,
            fileFullName: null,
            fileName: '',
            fileExtencion: '', 

        }
    },

    methods: {
        handleFileUpload(){
            this.isLoading = false;

            this.fileFullName = this.$refs.file.files[0].name;
            
            let temp = this.fileFullName;
            this.fileExtencion = temp.replace(/.+(?=\.)/,'');
            this.fileName = this.fileFullName.replace(this.fileExtencion,'') ;
            
            this.sleep(2000);
            this.isLoading = true;
            
        },
        sleep(millis) {
            var t = (new Date()).getTime();
            var i = 0;
            while (((new Date()).getTime() - t) < millis) {
                i = i + 1;
            }
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
</style>