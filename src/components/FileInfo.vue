<template>
<div class="content">
        <input type="file" ref="file" v-on:change="handleFileUpload"/>
        <v-btn @click="deleteFile">Delete</v-btn>
        
        <div class="info"
        v-if="isStringName"
        >
            <p>Full file name : [ {{fileFullName}} ]</p>
            <p>File name : [ {{fileName}} ]</p>
            <p>File type : [ {{fileExtencion}} ]</p>
            <p>SHA256 :<br> {{ hashSHA256 }} </p>
            <p>SHA1 : <br> {{ hashSHA1 }}</p>
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
            fileObject: null,
            fileFullName: null,
            fileName: '',
            fileExtencion: '',
            hashSHA256: null,
            hashSHA1: null,
        }
    },

    methods: {
        
        handleFileUpload(){
            this.isLoadingInfoAboutFile = true;
            setTimeout(this.getFile, 2000);

            this.fileObject = this.$refs.file.files[0];
            this.getHash();
            
            this.isLoadingInfoAboutFile = false;
        },

        deleteFile(){
            this.fileFullName = null;
        },

        getFile(){
            this.fileFullName = this.fileObject.name;
            
            let temp = this.fileFullName;
            this.fileExtencion = temp.replace(/.+(?=\.)/,'');
            this.fileName = this.fileFullName.replace(this.fileExtencion,'');
        },

        async getHash(){
            try{
                const url = '/api/main/products';
                const data = this.fileObject;
                const headers = {
                    Accept: 'application/json',
                    'Content-type': 'multipart/form-data', }
                const response = await this.$ajax.post(url, data, headers,);
                this.hashSHA256 = response.data.sha256;
                this.hashSHA1 = response.data.sha1;
            } catch(err) {
                console.log(err);
            }
            
            
        }
    },

    computed:{
        isStringName(){
            return this.$_.isString(this.fileFullName)
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