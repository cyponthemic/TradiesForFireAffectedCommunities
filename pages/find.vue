<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold py-4">Find some help around you</h1>
    <div id="map-wrap" style="height: 50vh">
      <no-ssr>
        <l-map :zoom="3" :center="centerLatLon">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker
            v-for="hit in hits"
            :lat-lng="[hit._geoloc.lat, hit._geoloc.lon]"
          ></l-marker>
          <l-circle :lat-lng="centerLatLon" :radius="limit * 100"></l-circle>
        </l-map>
      </no-ssr>
    </div>
    <div class="px-3 my-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-limit"
      >
        Password
      </label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="password"
      />
    </div>
    <div class="px-3 my-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-limit"
      >
        Affected area
      </label>
      <input
        id="address-input"
        type="search"
        placeholder="Where do you need help?"
      />
    </div>
    <div class="md:flex mt-3">
      <div class="md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-limit"
        >
          Limit in km
        </label>
        <input
          id="grid-limit"
          v-model="limit"
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
          type="text"
          placeholder="(kms)"
        />
      </div>
      <div class="md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-trade"
        >
          Trade search
        </label>
        <input
          id="grid-trade"
          v-model="trade"
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
          type="text"
          placeholder="Enter keywords"
        />
      </div>
    </div>

    <div v-if="search.nbHits">
      {{ search.nbHits }} tradies ready to help around this area
    </div>
    <div class="flex flex-wrap">
      <div v-for="tradie in hits" class="w-full sm:w-1/3 p-3">
        <div
          class="bg-white px-6 py-8 rounded-lg text-center sm:h-48 flex flex-col items-center justify-center"
        >
          <h2 class="text-xl font-bold text-gray-700 capitalize">
            {{ tradie['Full Name'] }}
          </h2>
          <h2
            v-if="tradie['Company Name']"
            class="text-sm font-medium text-gray-700 capitalize"
          >
            {{ tradie['Company Name'] }}
          </h2>
          <h2 class="text-sm font-medium text-gray-700 capitalize">
            {{ tradie['Postcode'] }}
          </h2>
          <address>
            {{ tradie['Email Address'] }} <br />
            {{ tradie['Phone Number'] }}
          </address>
          <div
            v-if="tradie._highlightResult.Trade"
            v-html="tradie._highlightResult.Trade.value"
            class="text-blue-500 block"
          ></div>
          <span v-else class="text-blue-500 block">{{ tradie.Trade }} </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import throttle from 'lodash-es/throttle'

export default {
  data() {
    return {
      limit: 10000,
      trade: '',
      password: '',
      search: {
        hits: [],
        nbHits: 0
      },
      location: {
        suggestion: {
          hit: {
            _geoloc: {
              lat: '',
              lng: ''
            }
          }
        }
      },
      leaflet: {
        map: {},
        osmLayer: {},
        markers: []
      }
    }
  },
  computed: {
    hits() {
      return this.search.hits.filter((e) => e._geoloc.lat)
    },
    centerLatLon() {
      if (this.hits.length) {
        return [this.hits[0]._geoloc.lat, this.hits[0]._geoloc.lon]
      }
      return [47.41322, -1.219482]
    },
    lat() {
      return this.location.suggestion.hit._geoloc.lat
    },
    lng() {
      return this.location.suggestion.hit._geoloc.lng
    }
  },
  watch: {
    trade() {
      this.fetch()
    },
    limit() {
      this.fetch()
    }
  },
  mounted() {
    const places = require('places.js')
    // eslint-disable-next-line no-unused-vars
    const placesAutocomplete = places({
      appId: 'plRVQL7BEI76',
      apiKey: 'd9f817e0cb0a22c5357af136266c9c13',
      container: document.querySelector('#address-input'),
      type: 'city',
      countries: ['au'], // Search in the United States of America and in the Russian Federation
      aroundLatLngViaIP: true // disable the extra search/boost around the source IP
    })

    placesAutocomplete.on('change', this.handleOnChange)

    this.$axios
      .get(process.env.API_ENDPOINT + '/tradie/index')
      .then(({ data }) => {
        this.search = data
      })
  },
  methods: {
    handleOnChange(location) {
      this.location = location
      this.$nextTick(this.fetch)
    },
    fetch: throttle(function() {
      const params = {
        lat: this.lat,
        lon: this.lng,
        limit: this.limit * 100,
        searchQuery: this.trade,
        password: this.password
      }
      this.$axios
        .get(process.env.API_ENDPOINT + '/tradie/index', {
          params
        })
        .then(({ data }) => {
          this.search = data
        })
    }, 500)
  }
}
</script>
<style>
.text-blue-500 em {
  color: #3b8070;
}
</style>
