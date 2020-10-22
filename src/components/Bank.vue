<template>
<div class="app">
  <div class="header">
  <v-btn @click="Update_Data()">
        Обновить
      </v-btn>
  </div>

  <div class="ifContentReady" v-if="ReadyFlag">
    
    <v-expansion-panels >
      <v-expansion-panel  v-for="(item,i) in Pagination_Valutes"
      :key="i"
      >
        <v-expansion-panel-header>
          {{item.CharCode._text}} : {{item.Name._text}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Российский рубль :  {{item.Value._text}}

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> 

    <div class="pagination_table">
      <v-btn class = "PrevAndNextButtons" outlined @click="Change_Page('dec')">
        <v-icon > mdi-chevron-left </v-icon>
      </v-btn>
      <div class="pages"
      v-for="page in Pages"
      :key="page"
      :class="{'current_page' : page === PageNumber}" 
      @click="Page_Click(page)"
      >
      {{page}}
      </div>
      <v-btn class = "PrevAndNextButtons" outlined @click="Change_Page('inc')"> 
        <v-icon > mdi-chevron-right </v-icon>
      </v-btn>
    </div>
  </div>


  <div class="ifContentNotReady" v-if="!ReadyFlag">

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
      ValPerPage : 5,
      PageNumber: 1,
      LoadingFlag: false,
      ReadyFlag: false,
      MaxPage: 7,
    }
  },

  computed: {
    Get_ValCurs_From_Store() {
            return this.$store.getters.GET_VALCURS.ValCurs.Valute;
      },

    Get_Full_Path_Of_Api(){
        const DATE_FORMAT = 'DD/MM/YYYY'
        const CURRENT_DATE = String(moment.format(DATE_FORMAT))
        const PROXY = 'https://cors-anywhere.herokuapp.com/'
        const API_URL = 'http://www.cbr.ru/scripts/XML_daily.asp?date_req='
        const FULL_API_PATH = PROXY + API_URL + CURRENT_DATE
        return FULL_API_PATH;
      },

    Pages(){
      return Math.ceil(this.Get_ValCurs_From_Store.length / this.ValPerPage);
    },
    
    Pagination_Valutes(){
      //let from = (this.PageNumber - 1) * this.ValPerPage;
      //let to = from + this.ValPerPage;
      
      //return this.Get_ValCurs_From_Store.slice(from, to);
      let chunksArray = this.$_.chunk(this.Get_ValCurs_From_Store, this.ValPerPage);
      return chunksArray[this.PageNumber - 1];
    }
     
    },

    methods: {
    Page_Click(page){
      return this.PageNumber = page;
    },

    Update_Data(){
      this.ReadyFlag = false;
      this.PageNumber = 1;
      return this.$ajax.get(this.Get_Full_Path_Of_Api)
          .then ((ValCursXML) => {
              var convert = require('xml-js');
              var result = convert.xml2json(ValCursXML.data, {compact: true, spaces: 4});
              var ValCursJSON = JSON.parse(result);
              this.$store.commit('Update_Val_Curs', (ValCursJSON));
              
              this.ReadyFlag = true;
        })

    },

    Change_Page(direction){
      if(direction == 'dec'){
        if(this.PageNumber != 1){
          this.PageNumber--;
        }
      }
      if(direction == 'inc'){
        if(this.PageNumber != this.MaxPage){
          this.PageNumber++;
        }
      }
    }

  },
    

async mounted(){
    this.Update_Data();
},

}
</script>

<style>
.header {
    display: flex;
    background-color: #e7e7e7;
    border-bottom: solid #e7e7e7;
    justify-content: center;
}

.pagination_table{
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

.current_page{
  background-color: #beedde;
}

.ifContentNotReady{
  text-align: center;
}

.PrevAndNextButtons{
  padding: 8px;
  margin-right: 8px;
  border: solid 1px #e7e7e7;
}

</style>