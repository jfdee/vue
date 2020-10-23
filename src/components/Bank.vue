<template>
<div class="app">
  
<div class="if-content-ready" v-if="readyFlag">
  <div class="header">
  <v-btn @click="onUpdateButtonClick">
        Обновить
      </v-btn>
  </div>

    
    <v-expansion-panels>
      <v-expansion-panel  v-for="(item,i) in paginationValutes"
      :key="i"
      >
        <v-expansion-panel-header @click="onPanelHeaderClick(item.Value._text)">
          {{item.Name._text}}
          
          
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          [ {{item.CharCode._text}} ]
          <input class = "valute" v-model.number="valuteFrom"> <br>
          [ RUB ] 
          <input class = "valute" v-model.number="valuteOut">
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> 

    <div class="pagination-table">
      <v-btn class = "prev-and-next-buttons" outlined @click="onChangePageButtonClick('dec')">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <div class="pages"
      v-for="page in pages"
      :key="page"
      :class="{'current-page' : page === pageNumber}" 
      @click="onPageClick(page)"
      >
      {{page}}
      </div>
      <v-btn class = "prev-and-next-buttons" outlined @click="onChangePageButtonClick('inc')"> 
        <v-icon > mdi-chevron-right </v-icon>
      </v-btn>
    </div>
  </div>


  <div class="if-content-not-ready" v-if="!readyFlag">

    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>

  </div>



</div>
</template>

<script>
import moment from '../plugins/moment'

export default {
  data() {
    return {
      valPerPage : 5,
      pageNumber: 1,
      readyFlag: false,
      maxPage: 7,
      valuteFrom: 1,
      valuteOut: 1,
      currentValute: 1,
    }
  },

  computed: {
    getValCursFromStore() {
            return this.$store.getters.GET_VALCURS.ValCurs.Valute;
      },

    getFullPathOfApi(){
        const DATE_FORMAT = 'DD/MM/YYYY'
        const CURRENT_DATE = String(moment.format(DATE_FORMAT))
        const PROXY = 'https://cors-anywhere.herokuapp.com/'
        const API_URL = 'http://www.cbr.ru/scripts/XML_daily.asp?date_req='
        const FULL_API_PATH = PROXY + API_URL + CURRENT_DATE
        return FULL_API_PATH;
      },

    pages(){
      return Math.ceil(this.getValCursFromStore.length / this.valPerPage);
    },
    
    paginationValutes(){
      let chunksArray = this.$_.chunk(this.getValCursFromStore, this.valPerPage);
      return chunksArray[this.pageNumber - 1];
    }
     
    },

    methods: {
    onPageClick(page){
      return this.pageNumber = page;
    },

    onUpdateButtonClick(){
      this.readyFlag = false;
      this.pageNumber = 1;
      return this.$ajax.get(this.getFullPathOfApi)
          .then ((valCursXML) => {
              var convert = require('xml-js');
              var result = convert.xml2json(valCursXML.data, {compact: true, spaces: 4});
              var valCursJSON = JSON.parse(result);
              this.$store.commit('Update_Val_Curs', (valCursJSON));
              
              this.readyFlag = true;
        })
    },

    onChangePageButtonClick(direction){
      if(direction == 'dec'){
        if(this.pageNumber != 1){
          this.pageNumber--;
        }
      }
      if(direction == 'inc'){
        if(this.pageNumber != this.maxPage){
          this.pageNumber++;
        }
      }
    },


    onPanelHeaderClick(count){
      count = count.replace(',','.');
      this.currentValute = parseFloat(count);
      this.valuteOut = this.currentValute;
    }
  },
    

async mounted(){
    await this.onUpdateButtonClick();
},



  watch:{
    valuteFrom: function(val){
      this.valuteFrom = val;
      this.valuteOut = val * this.currentValute;
    },
    valuteOut: function(val){
      this.valuteOut = val;
      this.valuteFrom = val / this.currentValute;
    }
    

  }
}
</script>

<style>
.header {
    display: flex;
    background-color: #e7e7e7;
    border-bottom: solid #e7e7e7;
    justify-content: center;
}

.pagination-table{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
}

.pages{
  padding: 8px;
  margin-right: 8px;
  border: solid 1px #e7e7e7;
}

.pages:hover{
  background-color: #beedde;
  cursor: pointer;
}

.current-page{
  background-color: #beedde;
}

.if-content-not-ready{
  text-align: center;
}

.prev-and-next-buttons{
  padding: 8px;
  margin-right: 8px;
  border: solid 1px #e7e7e7;
}

.valute{
  width: 300px;
  padding-left: 10px;
	font-size: 13px;
	padding: 6px 0 4px 10px;
	border: 1px solid #080808;
	background: #f2d8bd;
	border-radius: 8px;
}
</style>