<template>
  <div class="weather-main-page">
    <div class="search-page" v-if="showSearch">
      <div class="search-page-container">
        <div class="search-body">
          <div class="search-form">

            <input type="text" class="text-xl search-text" placeholder="Search for places">
            <div class="flex justify-center items-center">
              <button @click="showSearch = !showSearch"
                  class="bg-gray-50 text-gray-500 border-2 py-1 px-3 rounded-lg">esc</button>
            </div>
          </div>
          <hr class="mb-2">
          <div class="search-result">

          </div>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <div class="search-box">
        <input class="search-input" type="text" placeholder="Search Place"  @click="showSearch = !showSearch">
      </div>
      <div class="h-full w-full container mx-auto px5"></div>
    </div>
    <div class="page">
      <div class="topbar">
        <div class="settings">
          <div class="temp active-temp">C °</div>
          <div class="temp">
            <span>F °</span>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="section">
          <div class="section-title">Week</div>
          <div class="section-body">
            <div class="cards">
              <div class="card"
                   v-for="(day, index) in daily" :key="index">
                <div class="font-semibold relative">
                  <span class="text-date">{{day.date}}</span>
                  <div class="temp text-5xl relative">
                    <div class="text-center text-gray-600">
                      <span>{{day.temp}}</span>
                      <span class="text-gray-400 absolute -top-1">°</span>
                    </div>
                  </div>
                </div>
                <div class="icon flex items-center justify-center pb-2">
                  <img class="object-cover rounded-full w-28 h-28 bg-center bg-cover" :src="require('@/assets/images/icons/'+ day.weather)" alt="sky">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      showSearch: false,
      daily : {
        0 : {'date' : "Sun", 'weather' : "cloudy-night.gif", 'temp' : "22",},
        1 : {'date' : "Mon", 'weather' : "cloudy-night.gif", 'temp' : "25",},
        2 : {'date' : "The", 'weather' : "thunder.gif", 'temp' : "33",},
        3 : {'date' : "Wed", 'weather' : "cloudy-night.gif", 'temp' : "29",},
        4 : {'date' : "Thu", 'weather' : "partly-cloudy.gif", 'temp' : "30",},
        5 : {'date' : "Fri", 'weather' : "cloudy-night.gif", 'temp' : "30",},
        6 : {'date' : "Sat", 'weather' : "snow.gif", 'temp' : "21",},
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .weather-main-page {
    @apply flex w-full h-full overflow-hidden bg-gray-100;

    .search-page {
      @apply absolute p-5 md:p-10 pt-5 md:pt-28 w-full h-full z-10 backdrop-filter backdrop-blur-sm;
      background: #00000070;

      .search-page-container {
        @apply w-full h-full flex justify-center;


        .search-body {
          @apply bg-white w-full md:w-10/12 lg:w-6/12 h-full flex flex-col rounded-md;
          //max-width: 40rem;
          height: max-content;
          min-height: 200px;

          .search-form {
            @apply flex overflow-hidden rounded-md px-10 py-5;
            .search-text {
              @apply flex-grow p-3
              focus:outline-none
              ;
            }
          }

          .search-result {
            @apply w-full overflow-y-auto px-10;
            height: 80%;
          }
        }
      }

    }
    .sidebar {
      @apply bg-white  shadow-lg hidden lg:block w-80;
    }

    .search-box {
      @apply h-32 flex items-center justify-center;
    }

    .search-input {
      @apply  p-2 w-5/6 outline-none rounded-md ease-out duration-300 border-2 border-transparent cursor-pointer;
    }

    .page {
      @apply flex-grow;

      .topbar {
        @apply w-full h-32 container mx-auto flex items-center;

        .settings {
          @apply w-full flex justify-end gap-4 px-6;

          .temp {
            @apply rounded-full w-10 h-10 flex justify-center items-center cursor-pointer
            w-10 h-10 bg-white text-gray-900 flex justify-center items-center cursor-pointer
            shadow-md;
          }
          .active-temp {
            @apply bg-gray-800 text-white;
          }
        }
      }

      .page-body {
        @apply h-full w-full w-10/12 px-10;
      }

      .section {

        .section-title {
          @apply font-bold text-3xl text-gray-600 text-left pb-5;
        }
      }

      .cards {
        @apply pb-10 grid gap-5;
        grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));

        .card {
          @apply max-w-sm bg-white border-2 border-gray-50 shadow-sm rounded-md p-2;
          font-family: Outfit-ExtraLight, serif ;

          .text-date {
            @apply text-gray-600 text-2xl;

          }

        }
      }

    }

  }

</style>
