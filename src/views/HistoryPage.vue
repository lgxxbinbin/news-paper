<template>
  <div class="container history-wrapper">

    <div class="row">

      <div v-if="!articlesHistory" class="col-12">
        <p>You have not read any article!</p>
      </div>

      <div v-else v-for="article in articlesHistory" @click="loadArticleDetail(article, $event)" class="col-6">
        <div class="card-item card mb-3">
          <img :src="article.urlToImage"
               class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">{{ article.description }}</p>
            <p class="card-text news-source">
              <small class="text-muted">
                {{ article.source.name }}
              </small>
            </p>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>


  export default {
    name: 'history',
    components: {

    },
    data() {
      return {
        articlesHistory: [],

      }
    },
    created() {
      this.loadArticlesHistory();
    },
    mounted() {
    },
    methods: {
      loadArticlesHistory: function () {

        this.articlesHistory = JSON.parse(localStorage.getItem("articles"));
      },

      loadArticleDetail: function (article, e) {

        window.open(article.url,'_blank');
      }
    }
  }
</script>

<style scoped lang="less">
  .history-wrapper {
    .card-item {
      text-align: left;
      cursor: pointer;
    }
  }
</style>
