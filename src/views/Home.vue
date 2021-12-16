<template>
  <div id="weather-page"
       class="w-full h-full bg-indigo-50 overflow-hidden bg-">
    <div class="weather-page-content absolute top-0 w-full h-full
      grid grid-cols-5 backdrop-blur-md">
      <div class="sidebar bg-white z-10 shadow-md shadow-zinc-200 hidden lg:block">
        <div class="search h-32 flex items-center justify-center">
          <input type="text" placeholder="Search Place"
                 class="p-2 w-5/6 outline-none rounded-md bg-zinc-50 ease-out duration-300 border-2 border-transparent
                  hover:border-indigo-300 hover:bg-indigo-50
                  active:border-indigo-300 active:bg-indigo-50
                  focus:border-indigo-300 focus:bg-indigo-50"
          >
        </div>
        <div class="h-full w-full container mx-auto px5">qsd</div>
      </div>
      <div class="place-info col-span-4 bg-zinc-50 overflow-hidden">
        <div class="topbar w-full h-32 container mx-auto px-5 flex items-center">
          <div class="settings w-full flex justify-end gap-4">
            <div class="rounded-full w-10 h-10 bg-gray-800 text-white flex justify-center items-center cursor-pointer">C °</div>
            <div class="rounded-full w-10 h-10 bg-white text-gray-900 flex justify-center items-center cursor-pointer
              shadow-md shadow-zinc-200">
              <span>F °</span>
            </div>
          </div>
        </div>
        <div class="page-body h-full w-full container mx-auto px-5">
          <p class="font-bold text-3xl text-gray-600 text-left pb-5">Week</p>
          <div class="cards pb-10 grid gap-4 xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            <div class="card bg-white border-2 border-zinc-50 shadow-md shadow-zinc-100 rounded-md p-2"
                 v-for="(day, index) in daily" :key="index">
              <span class="font-semibold" >{{day.date}}</span>
              <div class="icon flex items-center justify-center py-2">
                <img class="object-cover rounded-full w-28 h-28 bg-center bg-cover" :src="require('@/assets/images/icons/'+ day.weather)" alt="sky">
              </div>
              <div>
                <span class="text-gray-600 pr-1">{{day.temp}}</span>
                <span class="text-gray-400">C°</span>
              </div>
            </div>
          </div>
          <p class="font-bold text-3xl text-gray-600 text-left pb-5 ">Week</p>
          <div class="cards pb-10 grid gap-4 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1">
            <div class="card bg-white border-2 border-zinc-50 shadow-md shadow-zinc-100 rounded-md p-2"
                 v-for="(day, index) in daily" :key="index">
              <span class="font-semibold" >{{day.date}}</span>
              <div class="icon flex items-center justify-center py-2">
                <img class="object-cover rounded-full w-28 h-28 bg-center bg-cover" :src="require('@/assets/images/icons/'+ day.weather)" alt="sky">
              </div>
              <div>
                <span class="text-gray-600 pr-1">{{day.temp}}</span>
                <span class="text-gray-400">C°</span>
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
      daily : {
        0 : {'date' : "Sun", 'weather' : "cloudy-night.gif", 'temp' : "12",},
        1 : {'date' : "Mon", 'weather' : "cloudy-night.gif", 'temp' : "12",},
        2 : {'date' : "The", 'weather' : "thunder.gif", 'temp' : "12",},
        3 : {'date' : "Wed", 'weather' : "cloudy-night.gif", 'temp' : "12",},
        4 : {'date' : "Thu", 'weather' : "partly-cloudy.gif", 'temp' : "12",},
        5 : {'date' : "Fri", 'weather' : "cloudy-night.gif", 'temp' : "12",},
        6 : {'date' : "Sat", 'weather' : "snow.gif", 'temp' : "12",},
      }
    }
  }
}
</script>
