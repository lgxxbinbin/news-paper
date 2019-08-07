<template>
    <div class="container news-page-wrapper">

        <div class="row">
            <div class="col-12">
                <div class="search-wrapper input-group mb-3">
                    <input type="text" class="form-control" placeholder="keyword"
                           aria-label="keyword" v-model="keyword"
                           v-on:input="inputKeyword" autofocus>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                    </div>
                </div>
            </div>

        </div>

        <div class="row">
            <div v-if="!articles" class="col-12">
                <div class="row">
                    <div class="card-item card mb-3 col-6">
                        <facebook-loader :speed="2"
                                         :animate="true" class="mb-2"
                        ></facebook-loader>
                    </div>
                    <div class="card-item card mb-3 col-6">
                        <facebook-loader :speed="2"
                                         :animate="true" class="mb-2"
                        ></facebook-loader>
                    </div>
                    <div class="card-item card mb-3 col-6">
                        <facebook-loader :speed="2"
                                         :animate="true" class="mb-2"
                        ></facebook-loader>
                    </div>
                    <div class="card-item card mb-3 col-6">
                        <facebook-loader :speed="2"
                                         :animate="true" class="mb-2"
                        ></facebook-loader>
                    </div>
                </div>
            </div>

            <div v-else v-for="article in articles" @click="loadArticleDetail(article, $event)" class="col-6">
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

        <div class="row">
            <div class="col-5 col-centered">
                <nav class="d-flex justify-content-center" v-if="paginations">
                    <ul class="pagination">
                        <li class="page-item" v-for="page in paginations" :class="{ active: page.active }">
                            <a class="page-link" :class="{ 'page-number': page.isNumber }"
                               href="javascript:void(0)" :aria-label="page.text"
                               @click="onChangePage(page.page)">
                                <span aria-hidden="true">{{ page.text }}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    </div>
</template>

<script>

  import axios from 'axios';
  import {
    FacebookLoader,
    BulletListLoader
  } from 'vue-content-loader'

  export default {
    name: 'news-page',
    components: {
      FacebookLoader,
      BulletListLoader,
    },
    data() {
      return {
        articles: null,
        paginations: null,
        page: 1,
        pageSize: 4,
        timer: null,
        keyword: '',


      }
    },
    created() {
      this.loadArticle(1);
    },
    mounted() {
    },
    methods: {
      loadArticle: function (currentPage) {
        let thisObj = this;

        let url = `https://newsapi.org/v2/everything?domains=cnn.com,nytimes.com&q=${thisObj.keyword}&pageSize=${thisObj.pageSize}&page=${currentPage}&apiKey=eebd6c185fa64ba8a06160a907e41c95`;

        axios.get(url)
          .then(response => {
            if (response.status === 200) {

              thisObj.articles = response.data.articles;
              thisObj.calculatePaging(response.data.totalResults);
            } else {
              thisObj.articles = {}
            }

          })
          .catch(function (ex) {

            thisObj.articles = {}
          })
          .then(function () {

          });

      },

      calculatePaging: function (totalPage) {
        let selectedPage = this.page;

        // this.page = selectedPage;
        let paginations = [];

        if (totalPage < 5) {

          for (let index = 1; index <= totalPage; index++) {
            paginations.push({page: index, active: index == selectedPage, isNumber: true, text: index});
          }

        } else if (selectedPage == 1) {
          paginations.push({page: selectedPage, active: true, isNumber: true, text: selectedPage});
          paginations.push({page: selectedPage + 1, active: false, isNumber: true, text: selectedPage + 1});
          paginations.push({page: selectedPage + 2, active: false, isNumber: true, text: selectedPage + 2});
          paginations.push({page: selectedPage + 3, active: false, isNumber: true, text: selectedPage + 3});
          paginations.push({page: selectedPage + 4, active: false, isNumber: true, text: selectedPage + 4});

          paginations.push({page: selectedPage + 1, active: false, isNumber: false, text: '›'});
          paginations.push({page: totalPage, active: false, isNumber: false, text: '»'});

        } else if (selectedPage == totalPage) {

          paginations.push({page: 1, active: false, isNumber: false, text: '«'});
          paginations.push({page: selectedPage - 1, active: false, isNumber: false, text: '‹'});

          paginations.push({page: selectedPage - 4, active: false, isNumber: true, text: selectedPage - 4});
          paginations.push({page: selectedPage - 3, active: false, isNumber: true, text: selectedPage - 3});
          paginations.push({page: selectedPage - 2, active: false, isNumber: true, text: selectedPage - 2});
          paginations.push({page: selectedPage - 1, active: false, isNumber: true, text: selectedPage - 1});
          paginations.push({page: selectedPage, active: true, isNumber: true, text: selectedPage});

        } else {
          paginations.push({page: 1, active: false, isNumber: false, text: '«'});
          paginations.push({page: selectedPage - 1, active: false, isNumber: false, text: '‹'});

          paginations.push({page: selectedPage - 1, active: false, isNumber: true, text: selectedPage - 1});
          paginations.push({page: selectedPage, active: true, isNumber: true, text: selectedPage});
          paginations.push({page: selectedPage + 1, active: false, isNumber: true, text: selectedPage + 1});

          paginations.push({page: selectedPage + 1, active: false, isNumber: false, text: '›'});
          paginations.push({page: totalPage, active: false, isNumber: false, text: '»'});
        }

        this.paginations = paginations;
      },

      onChangePage: function (currentPage) {
        this.page = currentPage;
        this.loadArticle(currentPage);
      },

      loadArticleDetail: function (newArticle, e) {

        var articles = JSON.parse(localStorage.getItem("articles") || "[]");

        if (articles.length === 0) {
          articles.push(newArticle);
        }

        articles.forEach((article) => {

          if (article.url !== newArticle.url) {
            articles.push(newArticle);
          }
        });

        localStorage.setItem("articles", JSON.stringify(articles));

        window.open(newArticle.url, '_blank');
      },

      inputKeyword: function () {

        let thisObj = this;

        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          thisObj.loadArticle(1);
        }, 500);
      },

    }
  }
</script>

<style scoped lang="less">
    .news-page-wrapper {
        .card-item {
            text-align: left;
            cursor: pointer;

            img {
                height: 300px;
            }
        }
        .col-centered {
            float: none;
            margin: 0 auto;
        }
        .page-item.active {
            .page-link {
                color:#fff;
                background-color:#42b983;
                border-color:#42b983;
            }
        }
        .page-item {
            .page-link {
                color:#42b983;
            }
        }
    }
</style>
