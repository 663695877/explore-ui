<template>
  <div class="cascaderItem">
    <div>
      <!-- selected: {{selected && selected[level] && selected[level].name }}
      level: {{level}} -->
    </div>
    <div class="left">
      <div 
        class="label" 
        v-for="(item, index) in items" 
        :key="index"
        @click="onClickLabel(item)"
      >
        <span class="name">{{item.name}}</span>
        <icon class="icon" v-if="item.children && item.children.length > 0" name="right"></icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <cook-cascader-items 
        :items="rightItems" 
        :level="level+1" 
        :selected="selected"
        @update:selected="onUpdateSelected">
      </cook-cascader-items>
    </div>
    <!-- {{sourceItem.name}}
    <cook-cascader-items
      v-for="item in sourceItem.children"
      v-if="sourceItem.children"
      :sourceItem="item"
    >
    </cook-cascader-items> -->
  </div>
</template>

<script>
  import Icon from './icon'
  export default {
    name: "CookCascaderItems",
    components: {
      Icon
    },
    props: {
      items: {
        type: Array
      },
      sourceItem: {
        type: Object
      },
      selected: {
        type: Array,
        default: () => {
          return []
        }
      },
      level: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        leftSelected: null,
        // selected: []
      }
    },
    computed: {
      rightItems () {
        if (this.selected[this.level]) {
          let selected = this.items.filter((item) => item.name === this.selected[this.level].name)
          if (selected && selected[0].children && selected[0].children.length > 0) {
            return selected[0].children
          }
        }
        // let currentSelected = this.selected[this.level]
        // if (currentSelected && currentSelected.children) {
        //   return currentSelected.children
        // } else {
        //   return null
        // }
      }
    },
    methods: {
      onClickLabel (item) {
        console.log(item, '选中item');
          let copy = JSON.parse(JSON.stringify(this.selected))
          copy[this.level] = item
          copy.splice(this.level + 1)
          this.$emit('update:selected', copy)
      },
      onUpdateSelected (item) {
        this.$emit('update:selected', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "var";
  .cascaderItem{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    .left {
      // padding: .3em .3em;
      align-items: flex-end;
      height: 150px;
      overflow: auto;
    }
    .right {
      border-left: 1px solid $border-color-light;
      margin-top: -1px;
      height: 150px;
      overflow: auto;
    }
    .label {
      padding: .5em .6em;
      display: flex;
      align-items: center;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background: $grey;
      }
      .name {
        margin-right: 0.5em;
      }
      .icon {
        margin-left: auto;
        transform: scale(0.8);
      }
    }
  }
</style>