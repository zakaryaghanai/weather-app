<template>

    <div class="weather-main-page">

        <div class="search-page" v-show="showSearchBox">
            <div class="search-page-container">
                <div class="search-body">
                    <div class="search-form border-b">
                        <svg width="24" height="24" fill="none" aria-hidden="true" class="mr-3 flex-none text-gray-400">
                            <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                        </svg>
                        <input type="text" class="text-xl search-text" placeholder="Search place" v-model="searchQuery" ref="query">
                        <div class="flex justify-center items-center">
                            <button @click="hideSearchModal()" class="text-gray-500 text-sm font-semibold border hover:border-gray-300 duration-75 shadow-sm py-1 px-3 rounded-lg">ESC</button>
                        </div>
                    </div>
                    <div class="search-result relative overflow-hidden">
                        <div class="h-10 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"></div>
                        <div class="no-result flex justify-center py-20" v-if="!suggestions.length || loading">
                            <span class="text-lg text-gray-400" v-if="!loading">No recent searches</span>
                            <svg class="inline-block w-8 h-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="loading">
                                <circle class="opacity-25 stroke-current text-gray-600" cx="12" cy="12" r="10" stroke-width="4"></circle>
                                <path class="opacity-75 fill-current text-gray-600" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <div class="suggestions overflow-auto" ref="suggestions" v-else>
                            <div class="suggestion" :class="{'activeSuggestion' : index === selectedIndex}" v-for="(suggestion, index) in suggestions" :key="index" @click="searchWeather(index)" :data-index="index" :ref="'suggestion_' + index">
                                <div class="text-gray-800 flex-grow" v-html="boldSelectedText(suggestion.properties.formatted)"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar">

            <div class="search-box">
                <svg width="24" height="24" fill="none" aria-hidden="true" class="mr-3 flex-none text-gray-400">
                    <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                    <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"></circle>
                </svg>
                <input class="search-input" type="text" placeholder="Search Place..." @click="showSearchModal()">
                <span class="pl-3 flex-none text-xs font-semibold absolute right-3 top-4 text-gray-400 pointer-events-none">Ctrl K</span>
            </div>

            <div class="icon flex items-center justify-center py-10">
                <img class="object-cover rounded-full w-60 h-60 bg-center bg-cover"
                     :src="require('@/assets/images/icons/cloudy-night.gif')" alt="sky">
            </div>

            <div class="text-gray-800 py-5 ">
                <span class="text-4xl text-gray-400">Now</span>
                <span class="text-8xl text-gray-700">
                    <div v-if="currentTemp">
                        <span>{{currentTemp}}</span>
                        <sup>°C</sup>
                    </div>
                    <div v-else class="flex items-center">
                        <ContentLoader width="60%" height="100"></ContentLoader>
                        <sup><ContentLoader class="relative -top-5 -right-2" width="50" height="50"></ContentLoader></sup>
                    </div>
                </span>
            </div>

            <div class="spacer"></div>
            <div class="text-3xl text-gray-700 py-5">
                {{placeDateTime}} {{placeName}}
            </div>
        </div>

        <div class="page">

            <div class="topbar gap-0 flex-col lg:flex-row-reverse lg:gap-10 justify-between mt-5 lg:my-0">

                <p class="placeDateTime hidden min-w-max lg:block">{{placeDateTime}}</p>
                <div class="flex lg:hidden w-full">
                    <div class="search-box w-full">
                        <svg width="24" height="24" fill="none" aria-hidden="true" class="mr-3 flex-none text-gray-400">
                            <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round"></path>
                            <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"></circle>
                        </svg>
                        <input class="search-input w-full" type="text" placeholder="Search Place..." @click="showSearchModal()">
                        <span class="pl-3 flex-none text-xs font-semibold absolute right-3 top-4 text-gray-400 pointer-events-none">Ctrl K</span>
                    </div>
                    <div class="sm:block lg:hidden pl-2 ml-0 md:ml-2">
                        <button type="button" aria-expanded="false"
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white
                             hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400">
                            <span class="sr-only">Open main menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                 class="block h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="text-3xl text-gray-600 font-bold flex flex-grow w-full items-center pt-8 lg:p-0">
                    <span class="pr-2">{{currentLocation}}</span>

                    <svg width="24" height="24" aria-hidden="true" class="mr-3 flex-none text-gray-400">
                        <path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>

                    </svg>
                </div>
            </div>

            <div class="page-body">
                <div class="section">
                    <div class="section-title">Week</div>
                    <div class="section-body">

                        <!-- Days Cards Loader -->
                        <div class="daysCards" v-if="contentLoading">

                            <div class="card" v-for="index in 7" :key="index" >
                                <ContentLoader class="mb-3" width="30%" height="20"></ContentLoader>
                                <div class="flex justify-center mb-6">
                                    <ContentLoader width="30%" height="34"></ContentLoader>
                                </div>
                                <div class="flex justify-center">
                                    <ContentLoader width="60%" height="100"></ContentLoader>
                                </div>
                            </div>
                        </div>

                        <!-- Days Cards -->
                        <div class="daysCards" v-else>
                            <div class="card"
                                 v-for="(day, index) in daily" :key="index">
                                <div class="font-semibold relative">
                                    <div class="date flex flex-col">
                                        <span class="text-date">{{ day.dayName }}</span>
                                        <span class="text-date text-sm text-gray-400">{{ day.fullDate }}</span>
                                    </div>
                                    <div class="temp text-5xl relative">
                                        <div class="text-center text-gray-600">
                                            <span class="relative">
                                                <span class="text-gray-400 absolute -top-2 -right-5">°</span>
                                                <span>{{ day.temp.day }}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="icon flex items-center justify-center pb-2">
                                    <img class="object-cover rounded-full w-28 h-28 bg-center bg-cover"
                                         :src="require('@/assets/images/icons/partly-cloudy.gif')" alt="sky">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="section-title">Today's Highlights</div>
                    <div class="section-body">

                        <!-- Today Highlights Loader-->
                        <div class="highlightsCards" v-if="contentLoading">
                            <div class="card" v-for="index in 7" :key="index" >
                                <ContentLoader class="mb-3" width="30%" height="40"></ContentLoader>
                                <ContentLoader class="mb-3" width="80%" height="90"></ContentLoader>
                                <ContentLoader width="50%" height="40"></ContentLoader>
                            </div>
                        </div>

                        <!-- Today Highlights Data-->
                        <div class="highlightsCards" v-else>
                            <div class="card">
                                <div class="header">
                                    <div class="title">Wind Status</div>
                                    <span class="info"></span>
                                </div>
                                <div class="content wind flex items-center">
                                    <span class="text">{{ currentWeather.wind_speed }}</span>
                                    <span class="text-4xl px-2 text-gray-400">km/h</span>
                                </div>
                                <div class="text-gray-500 text-3xl">Normal</div>
                            </div>
                            <div class="card">
                                <div class="header">
                                    <div class="title">Sunrise & Sunset</div>
                                </div>
                                <div class="content flex flex-col gap-4">
                                    <div class="flex gap-2 items-center">
                                        <img class="object-cover rounded-full w-14 h-14 bg-center bg-cover"
                                             :src="require('@/assets/images/icons/sunny.gif')" alt="sky">
                                        <div class="flex flex-col items-center">
                                            <span class="text-xl text-gray-600">{{currentWeather.sunrise}}</span>
                                            <span class="text-gray-300">Sunrise</span>
                                        </div>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <img class="object-cover rounded-full w-14 h-14 bg-center bg-cover"
                                             :src="require('@/assets/images/icons/sunny.gif')" alt="sky">
                                        <div class="flex flex-col items-center">
                                            <span class="text-xl text-gray-600">{{ currentWeather.sunset }}</span>
                                            <span class="text-gray-300">Sunset</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="card">
                                <div class="header">
                                    <div class="title">Humidity</div>
                                </div>
                                <div class="content wind flex items-center">
                                    <span class="text">{{currentWeather.humidity}}</span>
                                    <span class="text-4xl px-2 text-gray-400">%</span>
                                </div>
                                <div class="text-gray-500 text-3xl">Normal</div>
                            </div>
                            <div class="card">
                                <div class="header">
                                    <div class="title">Visibility</div>
                                </div>
                                <div class="content wind flex items-center">
                                    <span class="text">{{currentWeather.visibility}}</span>
                                    <span class="text-4xl px-2 text-gray-400">km</span>
                                </div>
                                <div class="text-gray-500 text-3xl">Average</div>
                            </div>
                            <div class="card">
                                <div class="header">
                                    <div class="title">Clouds</div>
                                </div>
                                <div class="content wind flex items-center">
                                    <span class="text">{{ currentWeather.clouds }}</span>
                                    <span class="text-4xl px-2 text-gray-400">%</span>
                                </div>
                                <div class="text-gray-500 text-3xl">Average</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
/* eslint-disable */
import moment from 'moment'
import { ContentLoader } from 'vue-content-loader'
const dateTimeHelper =  require('@/helper/DateTimeHelper')
export default {
    name: 'Home',
    components: {
        ContentLoader
    },
    data() {
        return {
            contentLoading: true,
            showSearchBox: false,
            loading: false,
            searchQuery : '',
            placeDateTime: '',
            currentLocation: 'Your Current Location',
            currentWeather: {},
            currentTemp: 0,
            placeName: '',
            suggestions: {},
            selectedIndex: -1,
            weatherSearchResult: Proxy,
            coordinates: {
              lat : 0,
              lon : 0,
            },
            daily: [],

        }
    },
    watch: {
        searchQuery(query) {
            if (query.trim().length >= 3) {
                this.search(query)
            }

            if (!query.trim().length) {
               this.suggestions = {}
            }
        },
        selectedIndex(val, oldVal){
            if(val !== oldVal){
                this.triggerSearchBoxResultScroll()
            }
        }
    },
    methods: {
        showSearchModal() {
            this.searchQuery = ""
            this.showSearchBox = true
            setTimeout(() => {
                this.$refs.query.focus()
            }, 50)
        },
        hideSearchModal() {
            this.showSearchBox = false
        },
        hideContentLoader(){
            this.contentLoading = false
        },
        showContentLoader(){
            this.contentLoading = true
        },
        async search(query) {
            let result =  await this.$geoapify.get('', {
                params: {
                    'text': query,
                    limit: 20
                }
            })
            this.suggestions = result.data.features
        },
        boldSelectedText(selectedText) {
            let searchMask = this.searchQuery;
            let regEx = new RegExp(searchMask, "ig");
            let replaceMask = this.searchQuery.charAt(0).toUpperCase() + this.searchQuery.slice(1);

           return selectedText.replace(regEx, '<b>' + replaceMask + '</b>');
        },
        async getPlaceWeatherInfo(lat, lon){
            return await this.$openWeatherMap.get('', {
                params: {
                    lat: lat,
                    lon: lon,
                }
            })
        },
        async searchWeather(index) {

            this.contentLoading = true
            this.hideSearchModal()

            let lat = this.suggestions[index].properties.lat
            let lon = this.suggestions[index].properties.lon

            this.currentLocation = this.suggestions[index].properties.formatted

            let searchResult = await this.getPlaceWeatherInfo(lat, lon)

            this.bindViewData(searchResult)
        },
        convertToDateTime(unix, format) {
            return moment.unix(unix - 3600).format(format)
        },
        triggerSearchBoxResultScroll(){
            let element = this.$refs['suggestion_' + this.selectedIndex];
            if(element[0]){
                let top = element[0].offsetTop;
                this.$refs['suggestions'].scrollTo(0, top - 50);
            }
        },
        bindViewData(searchResult){
            if(searchResult.status === 200){
                // hide Content Loader
                this.contentLoading = false
                this.setCurrentWeather(searchResult.data.current)
                this.setWeatherSearchResult(searchResult)

                this.daily = this.getMappedDailyWeather()

                let timestamp = this.getCurrentWeather().dt + this.getTimezoneOffset()

                this.placeDateTime = this.convertToDateTime(timestamp, 'dddd, HH:mm')
            }
        },
        getCurrentWeather(){
            return this.weatherSearchResult.data.current;
        },
        setCurrentWeather(current){
            current.sunrise = dateTimeHelper.getTime(current.sunrise)
            current.sunset = dateTimeHelper.getTime(current.sunset)
            current.visibility = current.visibility / 1000
            this.currentTemp = Math.floor(current.temp)
            this.currentWeather = current
        },
        setWeatherSearchResult(result){
            this.weatherSearchResult = result
        },
        getWeatherSearchResult(){
            return this.weatherSearchResult
        },
        getMappedDailyWeather(){;
            this.getWeatherSearchResult().data.daily.map(day => {
                day.dayName = dateTimeHelper.getDayName(day.dt)
                day.fullDate = dateTimeHelper.getFullDate(day.dt)
                day.temp.day = Math.floor(day.temp.day)
            });

            return this.weatherSearchResult.data.daily;
        },
        getTimezoneOffset(){
            return this.getWeatherSearchResult().data.timezone_offset;
        },
        initFirstSearch() {
            this.contentLoading = true

            navigator.geolocation.getCurrentPosition(async (pos) => {
                let lat = pos.coords.latitude;
                let lon = pos.coords.longitude;

                let searchResult = await this.getPlaceWeatherInfo(lat, lon);
                this.bindViewData(searchResult)

                this.contentLoading = false

            }, (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`)
            });
        }
    },
    async mounted() {
        this.initFirstSearch();

        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                this.showSearchModal()
            } else if (event.key === 'Escape' || event.key === 'Esc') {
                this.hideSearchModal()
            } else if(event.key === 'ArrowDown') {
                if(this.selectedIndex < this.suggestions.length - 1) {
                    this.selectedIndex++;
                }

            } else if(event.key === 'ArrowUp') {
                if(this.selectedIndex > 0) {
                    this.selectedIndex--;
                }

            }

        });
    }
}
</script>

<style lang="scss">
.spacer {
    @apply flex-grow;
}
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
                    @apply flex items-center overflow-hidden px-6 py-2;
                    .search-text {
                        @apply flex-grow p-3 focus:outline-none;
                    }
                }

                .search-result {
                    @apply w-full overflow-y-auto;
                    height: 80%;

                    .suggestions {
                        @apply flex flex-col p-6 gap-2;
                        max-height: 30em !important;
                        .suggestion {
                            @apply flex justify-between text-gray-500 text-lg py-4 px-6
                            hover:bg-gray-100 cursor-pointer rounded;
                        }
                        .activeSuggestion {
                            @apply bg-gray-100 cursor-pointer rounded;
                        }
                    }
                }
            }
        }

    }

    .sidebar {
        @apply bg-white shadow-md hidden lg:flex flex-col w-80 p-8;
    }

    .search-box {
        @apply flex items-center justify-center border hover:border-gray-300 rounded relative shadow-sm duration-75;

        svg {
            @apply absolute left-3 pointer-events-none;
        }

        .search-input {
            @apply p-2 w-5/6 outline-none rounded-md ease-out duration-300 border-2 border-transparent cursor-pointer w-full pl-10;
        }
    }

    .page {
        @apply flex-grow flex flex-col;

        .topbar {
            @apply w-full h-32 flex items-center px-10 ;

            .placeDateTime {
                @apply text-2xl font-extrabold text-gray-600;
            }

            .settings {
                @apply flex justify-end gap-4;

                .temps {
                    @apply flex gap-2;

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
        }

        .page-body {
            @apply flex-grow h-full w-full w-10/12 p-10 overflow-y-auto;
        }

        .section {
            @apply pb-16;
            .section-title {
                @apply font-bold text-3xl text-gray-600 text-left pb-7;
            }
        }

        .daysCards {
            @apply grid gap-5;
            grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));

            .card {
                @apply max-w-sm bg-white border-2 border-gray-50 shadow-sm rounded-lg p-4;
                font-family: Outfit-ExtraLight, serif;

                .text-date {
                    @apply text-gray-600 text-2xl;

                }

            }
        }

        .highlightsCards {
            @apply grid gap-5;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

            .card {
                @apply max-w-sm flex flex-col bg-white border-2
                border-gray-50 shadow-sm rounded-lg p-4
                h-52;
                font-family: Outfit-ExtraLight, serif;

                .header {
                    @apply flex;
                    .title {
                        @apply flex-grow text-gray-400 text-xl pb-3;
                    }
                }
                .content {
                    @apply flex-grow;
                }
                .wind {
                    @apply text-gray-600 text-5xl;

                }

            }
        }

    }

    /* width */
    ::-webkit-scrollbar {
        width: 14px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 33em;
        background: #edf2f7;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #cbd5e0;
        border-radius: 33em;
        border: solid 2px #edf2f7;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #a0aec0;
    }

}

</style>
