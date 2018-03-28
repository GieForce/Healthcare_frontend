<template>
  <div class="container">
    <div v-for="item in items" class="row">
      <div class="col blogShort">
        <div class="row">
          <div class="col-md-10"><h2 style="margin-top: 10px;">{{item.Title}}</h2></div>
          <div class="col pull-right"><p style="margin-top: 10px;">{{item.date}}</p></div>
        </div>
        <b-img left rounded :src="item.Photo" alt="left image" class="pull-left img-responsive margin10 img-rounded" width="175px"/>
        <article><p>
          {{item.Message}}
        </p>
        </article>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "news",
      data () {
        return {
          items: [
            {Title: "Griep epidemie breekt uit", Photo: "http://allwebco-templates.com/support/picts/pinned-rss.jpg", Message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text\n" +
              "          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only\n" +
              "          five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release\n" +
              "          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of\n" +
              "          Lorem Ipsum. ik ga altijd koffie drinken bij devin.", date: new Date(2018,4,3).toLocaleDateString()},
            {Title: "Nieuwe huidbehandeling", Photo: "https://thumbs.dreamstime.com/z/medische-toons-het-stellen-van-de-arts-met-hoofdspiegel-17912399.jpg", Message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text\n" +
              "          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only\n" +
              "          five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release\n" +
              "          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of\n" +
              "          Lorem Ipsum.", date: new Date(2018,4,4).toLocaleDateString()},
            {Title: "Griepprikken", Photo: "http://allwebco-templates.com/support/picts/pinned-rss.jpg", Message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text\n" +
              "          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only\n" +
              "          five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release\n" +
              "          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of\n" +
              "          Lorem Ipsum.", date: new Date(2017,1,6).toLocaleDateString()},
            {Title: "Griepprikken", Photo: "https://thumbs.dreamstime.com/z/medische-toons-het-stellen-van-de-arts-met-hoofdspiegel-17912399.jpg", Message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text\n" +
              "          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only\n" +
              "          five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release\n" +
              "          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of\n" +
              "          Lorem Ipsum.", date: new Date(2018,4,7).toLocaleDateString()},
          ]
        }
      },
      methods: {
        changeCompontent (component) {
          this.$parent.changeComponent(component)
        }
      },
    }
</script>

<style scoped>
  .blogShort{
    border-bottom: 3px solid transparent;
    -webkit-border-image: linear-gradient(to right, #56CCF2 , #11998E) 3;
    -moz-border-image: linear-gradient(to right, #56CCF2 , #11998E) 3;
    -o-border-image: linear-gradient(to right, #56CCF2 , #11998E) 3;
    border-image: linear-gradient(to right, #56CCF2 , #11998E) 3;
    margin-top: 20px;
    background: white ;
    -webkit-border-radius: 15px 15px 0px 0px;
    -moz-border-radius: 15px 15px 0px 0px;
    border-radius: 15px 15px 0px 0px;
  }

  article h2{color:#333333;}
  .margin10{margin-bottom:10px; margin-right:10px;}
</style>
