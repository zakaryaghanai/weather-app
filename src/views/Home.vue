<template>

    <div class="weather-main-page">

        <div class="search-page" v-show="showSearch">
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
                        <div class="suggestions overflow-auto" v-else>
                            <div class="suggestion" v-for="(suggestion, index) in suggestions" :key="index" @click="searchWeather(suggestion)">
                                <span class="text-gray-800" v-html="boldSelectedText(suggestion.properties.formatted)"></span>
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

            <div class="text-gray-800 py-5">
                <span class="text-8xl text-gray-700">
                    23<sup>°C</sup>
                </span>
            </div>

            <div class="text-3xl text-gray-700 py-5">
                {{placeDateTime}}
            </div>
        </div>

        <div class="page">

            <div class="topbar gap-0 lg:gap-10 justify-between my-5 lg:my-0">
                <div class="placeDateTime hidden lg:block">
                    {{placeDateTime}}
                </div>
                <div class="search-box w-full lg:hidden ">
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

            <div class="page-body">
                <div class="section">
                    <div class="section-title">Week</div>
                    <div class="section-body">
                        <div class="cards">
                            <div class="card"
                                 v-for="(day, index) in daily" :key="index">
                                <div class="font-semibold relative">
                                    <span class="text-date">{{ day.date }}</span>
                                    <div class="temp text-5xl relative">
                                        <div class="text-center text-gray-600">
                                            <span class="relative">
                                                <span class="text-gray-400 absolute -top-2 -right-5">°</span>
                                                <span>{{ day.temp }}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="icon flex items-center justify-center pb-2">
                                    <img class="object-cover rounded-full w-28 h-28 bg-center bg-cover"
                                         :src="require('@/assets/images/icons/'+ day.weather)" alt="sky">
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
import moment from 'moment'

export default {
    name: 'Home',
    data() {
        return {
            showSearch: false,
            loading: false,
            searchQuery : '',
            placeDateTime: '',
            suggestions: {},
            coordinates: {
              lat : 0,
              lon : 0,
            },
            daily: {
                0: {'date': "Sun", 'weather': "cloudy-night.gif", 'temp': "22",},
                1: {'date': "Mon", 'weather': "cloudy-night.gif", 'temp': "25",},
                2: {'date': "The", 'weather': "thunder.gif", 'temp': "33",},
                3: {'date': "Wed", 'weather': "cloudy-night.gif", 'temp': "29",},
                4: {'date': "Thu", 'weather': "partly-cloudy.gif", 'temp': "30",},
                5: {'date': "Fri", 'weather': "cloudy-night.gif", 'temp': "30",},
                6: {'date': "Sat", 'weather': "snow.gif", 'temp': "21",},
            }
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
        }
    },
    methods: {
        showSearchModal() {
            this.searchQuery = ""
            this.showSearch = true
            setTimeout(() => {
                this.$refs.query.focus()
            }, 50)
        },
        hideSearchModal() {
            this.showSearch = false
        },
        async search(query) {
            this.loading = true
            let result =  await this.$geoapify.get('', {
                params: {
                    'text': query,
                    limit: 20
                }
            })
            this.loading = false
            this.suggestions = result.data.features
        },
        boldSelectedText(selectedText) {
            let searchMask = this.searchQuery;
            let regEx = new RegExp(searchMask, "ig");
            let replaceMask = this.searchQuery.charAt(0).toUpperCase() + this.searchQuery.slice(1);

           return selectedText.replace(regEx, '<b>' + replaceMask + '</b>');
        },
        async searchWeather(suggestion) {
            this.coordinates.lat = suggestion.properties.lat
            this.coordinates.lon = suggestion.properties.lon

            let result = await this.$openWeatherMap.get('', {
                params: {
                    lat: this.coordinates.lat,
                    lon: this.coordinates.lon,
                }
            })

            this.placeDateTime = this.convertToDateTime(result.data.current.dt, result.data.timezone_offset);
            this.hideSearchModal();
        },
        convertToDateTime(unix, timeZoneOffset) {
            return moment.unix(unix + timeZoneOffset - 3600).format('dddd, HH:mm')
        },

    },
    mounted() {
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                this.showSearchModal()
            } else if (event.key === 'Escape' || event.key === 'Esc') {
                this.hideSearchModal()
            }
        });
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
                    }
                }
            }
        }

    }

    .sidebar {
        @apply bg-white shadow-md hidden lg:block w-80 p-8;
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
            @apply flex-grow h-full w-full w-10/12 px-10;
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
                font-family: Outfit-ExtraLight, serif;

                .text-date {
                    @apply text-gray-600 text-2xl;

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
