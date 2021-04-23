<template>
  <div class="html-wrapper">
    <div class="header-wrapper">
      <div class="header-tag-wrapper">
        <div class="nav-wrapper" @click="jump">
          <img class="img-wrapper" alt="" src="http://api.meirixindong.com/Static/Image/Image/xdzd_logo_big.jpeg"/>
        </div>
        <div :class="{headerTagClass:true,headerTagBottom:currentHeaderTag === index}"
             v-for="(item,index) of headerTagList" @click="headerTagClick(index)">{{ item }}
        </div>
      </div>
    </div>
    <div class="body-wrapper">
      <div class="body-tag-content" ref="bodyTag" v-for="(item,index) of headerTagList">
        <div class="body-tag-content-header">{{ item }}</div>
        <div class="body-tag-content-body">
          <tag-card :tagList="headerTagList" :tagIndex="index" :tagName="item">
            <template></template>
          </tag-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagCard from "../components/TagCard"

export default {
  name: '',
  components: {
    TagCard
  },
  // filters: {},
  props: {},
  // provide() {
  //   return {}
  // },
  data() {
    return {
      headerTagList: [
        '基本信息', '财务表现', '融资历史', '公司团队', '招聘信息', '知识产权'
      ],
      currentHeaderTag: 0,
      tData: {}
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    if (localStorage.getItem('auth') === null || localStorage.getItem('auth') === '') {
      this.$router.push('/')
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeCreate() {
    localStorage.setItem('ent', this.$route.query.str)
  },
  // created() {
  // },
  // beforeMount() {
  // },
  // beforeUpdate() {
  // },
  // updated() {
  // },
  // beforeDestroy() {
  // },
  // destroyed() {
  // },
  // activated() {
  // },
  // deactivated() {
  // },
  methods: {
    headerTagClick(index) {
      this.currentHeaderTag = index
      let distance = 0
      //算滚动的距离
      for (let i = 0; i < index; i++) {
        //元素高度
        let eHeight = this.$refs['bodyTag'][i].offsetHeight
        distance = distance + eHeight
      }
      window.scrollTo(0, distance + index * 10)
    },
    handleScroll() {
      let max = this.$refs['bodyTag'].length
      let headerWrapperHeight = 60
      for (let i = 0; i < max; i++) {
        //元素高度
        let eHeight = this.$refs['bodyTag'][i].offsetHeight
        //距离顶部高度
        let tHeight = this.$refs['bodyTag'][i].getBoundingClientRect().top
        //滚过负的元素高度就可以改变class
        if (tHeight < 0 && eHeight < Math.abs(tHeight) + headerWrapperHeight) {
          this.currentHeaderTag = i + 1
        }
        if (this.$refs['bodyTag'][0].getBoundingClientRect().top > headerWrapperHeight) {
          this.currentHeaderTag = 0
        }
      }
    },
    jump() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.headerTagBottom {
  border-bottom 2px solid #4c84ff
}

.html-wrapper {
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  font-size 14px

  .header-wrapper {
    background-color white
    position fixed
    width 100%
    height 60px
    box-shadow: 3px 3px 5px #EBEEF5
    z-index 999

    .header-tag-wrapper {
      width 1300px
      margin 0 auto
      display flex
      justify-content space-between

      .img-wrapper {
        cursor pointer
        width 160px
        height 60px
      }

      .headerTagClass {
        cursor pointer
        margin-top 17px
        height 30px
        font-size 20px
      }
    }
  }

  .body-wrapper {
    margin 80px auto
    width 1300px

    .body-tag-content {
      margin-bottom 10px
      width 100%

      .body-tag-content-header {
        font-size 20px
        font-weight 800
      }

      .body-tag-content-body {
        .content-card {

        }
      }
    }
  }
}
</style>
