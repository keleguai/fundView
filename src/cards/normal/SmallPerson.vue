<template>
  <div class="cute_move md-small-hide" href="javascript:;">
    <img class="cute_image">
    <div class="md-elevation-5 " id="message" style="color: #555;
    top: -100px;
    right: 0px;
    width: 170px;
    height:110px;
    margin: 10px 20px;
    padding: 5px 10px;
    border-radius: 12px;
    border: 1px solid rgba(10,10,0,0.4);
    background-color: white;
    box-shadow: 0 3px 15px 2px rgba(10,10,0,0.5);
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    animation-delay: 5s;
    animation-duration: 50s;
    animation-iteration-count: infinite;
    animation-name: shake;
    animation-timing-function: ease-in-out;
    text-align: left;
    line-height: 180%; " v-html="word" v-if="duration"></div>
  </div>
</template>

<script>
  export default {
    name: "SmallPerson",
    props: ['duration'],
    data() {
      return {
        word: null
      }
    },
    methods: {
      //每次刷新都改变小人物的情况
      changeImage() {
        let oCuteImage = document.getElementsByClassName('cute_image')[0]
        let myUrls = new Array('../../static/kankore-bath-akagi.png', '../../static/kankore-bath-ryujo.png', '../../static/kankore-bath-shimakaze.png');
        let index = Math.floor((Math.random() * myUrls.length));
        oCuteImage.src = myUrls[index];
      },
      // 改变小人说的话
      changeWords() {
        let index = this.$myapi.array_random(this.$store.state.words)
        this.word = this.$store.state.words[index]
        this.timeout = true
      },

      // 给lyy说过的话设置一个定时器
      setTimeoutForWord() {
        setInterval(this.changeWords, parseInt(this.duration))
      },
    },
    mounted() {
      this.changeImage()
      if (this.$store.state.words.length != 0) {
        this.changeWords()
        this.setTimeoutForWord()
      }
    }

  }
</script>

<style scoped>
  .cute_move {
    position: fixed;
    bottom: 20px;
    right: 20px;
    animation-direction: alternate;
    animation: kan-swing 40s linear normal;
    -webkit-animation: kan-swing 40s linear normal;
    z-index: 100;
    animation-iteration-count: infinite;

  }

  .cute_image {
    position: relative;
  }

  @keyframes kan-swing {
    0% {
      transform: rotate(6deg);
    }
    10% {
      transform: rotate(-6deg);
    }
    20% {
      transform: rotate(6deg);
    }
    30% {
      transform: rotate(-6deg);
    }
    40% {
      transform: rotate(6deg);
    }
    50% {
      transform: rotate(-6deg);
    }
    60% {
      transform: rotate(6deg);
    }
    70% {
      transform: rotate(-6deg);
    }
    80% {
      transform: rotate(6deg);
    }
    90% {
      transform: rotate(-6deg);
    }

    100% {
      transform: rotate(6deg);
    }
  }
</style>
