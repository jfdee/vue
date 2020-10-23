<template>
    <div class="content">
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload"/>

        <div class="info"
        v-if="isUploadFile"
        >
            <p>Full file name : [ {{fileFullName}} ]</p>
            <p>File name : [ {{fileName}} ]</p>
            <p>File type : [ {{fileExtencion}} ]</p>
        </div>



        <div 
        v-if="isLoadingFile"
        >

        <v-progress-circular class="loader"
        :size="70"
        :width="7"
        color="purple"
        indeterminate
        ></v-progress-circular>

        </div>




    </div>
</template>




<script>
export default {
    data () {
        return {
            isUploadFile: false,
            isLoadingFile: false,
            fileFullName: '',
            fileName: '',
            fileExtencion: '', 

        }
    },

    methods: {
        handleFileUpload(){
            this.isLoadingFile = true;

            this.fileFullName = this.$refs.file.files[0].name;
            
            let temp = this.fileFullName;
            this.fileExtencion = temp.replace(/.+(?=\.)/,'');
            this.fileName = this.fileFullName.replace(this.fileExtencion,'') ;
            
            this.sleep(2000);
            this.isUploadFile = true;
            this.isLoadingFile = false;
            
        },
        sleep(millis) {
            var t = (new Date()).getTime();
            var i = 0;
            while (((new Date()).getTime() - t) < millis) {
                i = i + 1;
            }
        },

    },
}
</script>


<style scoped>
.content{
    width: 400px;
    height: 400px;
    position: relative;
    margin: 0 auto;
    margin-top: 5%;
    border: solid 2px black;
}

.info{
    width: 300px;
    height: 300px;
    position: relative;
    margin: 0 auto;
    margin-top: 3%;
    text-align: left;
    padding-left: 30px;
    border: solid 2px blue;
}

.buttontest{
    text-align: right;
    margin-top: 1%;
    margin-left: 60%;
}
.loader{
    margin-top: 30%;
    margin-left: 40%;
}
</style>