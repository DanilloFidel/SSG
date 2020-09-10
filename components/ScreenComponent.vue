<template>
  <div>
    <no-ssr>
      <HotTable
        :id="`hotTableID${component.id}`"
        :ref="`tableRef${component.id}`"
        :style="style"
        :render-all-rows="false"
        :data="data"
        stretch-h="all"
        :columns="columns"
        row-heights="25"
        :nested-headers="nestedHeaders"
        :hidden-columns="{
        columns: [0],
        indicators: false,
      }"
        class="base-table-sheet-component__container"
        license-key="64795-73e60-d5534-f4a12-30c00"
      ></HotTable>
    </no-ssr>
  </div>
</template>

<script>
import HotTable from "~/plugins/vue-handsontable";

export default {
  components: {
    HotTable
  },
  props: {
    component: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  fetch() {
    console.log("fetch");
    return this.$axios
      .get(
        `/sourceContent/${this.component.id}?format=array&sourceTempId=0&userId=1&typeIdFront=5&stepId=0&screenId=17&preview=false`
      )
      .then(res => {
        console.log("pegou dados da tabela");
        this.data = res.data.dataSourceOld;
        this.stringColumns = res.data.columns;
        this.nestedHeaders = res.data.nestedHeaders;
        console.log("tamnho do array", this.data.length);
      })
      .catch(e => console.log("err: ", e));
  },
  data: () => ({
    data: [],
    columns: [],
    stringColumns: [],
    nestedHeaders: [],
    show: false
  }),
  computed: {
    style() {
      return `width: ${this.component.w}px; height: ${this.component.h}px; overflow: auto`;
    }
  },
  created() {
    process.client
      ? console.log("tabela no client")
      : console.log("tabela no server");
  },
  mounted() {
    // eslint-disable-next-line no-eval
    this.columns = eval(this.stringColumns);
    console.log("pending?", this.$fetchState.pending);
  },
  methods: {}
};
</script>

<style src="../node_modules/handsontable/dist/handsontable.full.css"></style>
<style>
.base-table-sheet-component {
  height: inherit;
  &__container {
    overflow: hidden;
  }
  &__loading {
    position: absolute;
    bottom: 80px;
  }
}
.handsontable thead th {
  border-bottom: none !important;
}
.handsontable thead tr:first-child th {
  padding-top: 5px;
}
.handsontable thead tr:last-child th {
  padding-bottom: 5px;
}
.handsontable th.firstVisibleColumn,
.handsontable td.firstVisibleColumn {
  border-left: none;
}
.handsontable th:first-child,
.handsontable th:nth-child(1),
.handsontable td:first-of-type,
.handsontable .htNoFrame + th,
.handsontable .htNoFrame + td {
  background: white;
  border-color: white !important;
}
/* Bottom line in header */
.handsontable tr:first-child th,
.handsontable tr:first-child td {
  border-top: none !important;
}
/* Intercalação de cores */
.htCore > tbody > tr:nth-child(odd) > td {
  background-color: #fcfcfca9;
}
/* Row headers */
.ht_clone_left th {
  background-color: transparent !important;
  border-left: none !important;
  border-color: #e7e7e7 !important;
}
.ht__highlight {
  --background: #f4f4f4;
  background-color: var(--background) !important;
}
/* Corner headers */
.ht_clone_top_left_corner th {
  --background: #f4f4f4;
  background-color: var(--background);
  vertical-align: middle;
  border-color: #e7e7e7 !important;
  color: #555555;
  font-weight: bold;
}
/* Column headers */
.ht_clone_top th {
  --background: #f4f4f4;
  background-color: var(--background);
  vertical-align: middle;
  color: #555555;
  font-weight: bold;
  border-color: #e7e7e7 !important;
}
/* Cells */
.ht_master tr > td {
  border-bottom-color: #f5f5f5;
  border-right: none;
  vertical-align: middle !important;
  padding: 0 5px;
}
.ht_clone_left tr > td {
  border-bottom-color: #f5f5f5;
  border-right: none;
  vertical-align: middle !important;
  padding: 0 5px;
}
.ht_nestingLevels.ht_nestingParent .relative {
  align-self: center;
  margin-bottom: 47%;
}
/* Selection */
.handsontable .wtBorder.area,
.handsontable .wtBorder.current {
  background-color: #abbad0 !important;
}
.handsontable .ht_nestingExpand {
  border: solid #cecece 0.6px !important;
  color: #cecece !important;
  font-size: 15px;
  border-radius: 50%;
  margin-right: 8px;
  height: 13px;
  width: 14px;
  font-weight: 300 !important;
  padding: 0.1px;
  display: flex !important;
  align-items: center;
  justify-content: center;
}
.handsontable .ht_nestingCollapse {
  border: solid #cecece 0.6px !important;
  color: #cecece !important;
  border-radius: 50%;
  margin-right: 8px;
  height: 13px;
  width: 13px;
  font-weight: 500 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
}
.handsontable td,
.handsontable tr,
.handsontable th {
  @include responsive-style(font-size, 13, 28);
  max-width: 80px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.handsontable td {
  color: #878787;
}
.htContextMenu {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  z-index: 99999999 !important;
  td {
    background-color: white !important;
  }
  td:hover {
    background-color: whitesmoke !important;
  }
}
.colToEdit {
  background: #f7f2fd !important;
}
.htDropdownMenu {
  z-index: 9999999 !important;
  font-family: "Roboto", sans-serif;
}
.htFiltersConditionsMenu {
  z-index: 99999999 !important;
}
.handsontable .changeType {
  position: absolute !important;
  right: 2px !important;
}
.empty-wrapper {
  height: 36vh !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader-container-table-default {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rowHeader {
  display: table-column;
}
.ht_nestingExpand,
.ht_nestingCollapse {
  font-size: 19px;
  padding-right: 1px;
  color: #050505ad;
  font-weight: 100 !important;
}
.ht_nestingLevels,
.ht_nestingParent {
  display: flex;
  justify-content: flex-end;
}

/* Botão de adição popover */
.cell-add-child {
  height: 100%;
}
.add-child {
  height: 100%;
  display: flex;
  align-items: center;
}

/* Bloco botão */
.btn-block {
  height: 90%;
  width: 96%;
  color: #999999 !important;
  background-color: #f6f6f6;
  @include responsive-style(font-size, 14, 40);
  box-shadow: 0px 0.5px 0px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-block:hover {
  box-shadow: 0px 1px 0px 0 rgba(0, 0, 0, 0.2);
  color: #808080 !important;
  background-color: #f1f1f1;
}

/* BLoco checkbox */
.checker {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeSpeed;
  width: 16px;
  height: 16px;
  margin: 0;
  margin-right: 1px;
  position: relative;
  border-radius: 10px;
  cursor: pointer;
}
.checker:after {
  border-radius: 2px;
  content: "";
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
  line-height: 16px;
  position: absolute;
  height: 16px;
  width: 16px;
  left: 0;
  top: 0;
  font-size: 16px;
  border: solid 0.7px #a0a0a0;
  background: #fff;
}
.checker:checked:after {
  background: #fff;
  content: "\2714";
  color: #888d9c;
}
.noChecker:after {
  border: solid 0.7px #dadada !important;
}
.noChecker:checked:after {
  color: #dadada !important;
}

.noImage {
  color: #a7a7a7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
