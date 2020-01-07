<template>
  <div class="p-4">
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
        </l-map>
      </no-ssr>
    </div>
    <input id="address-input" type="search" placeholder="Where are we going?" />
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
          <span class="text-blue-500 block">{{ tradie.Trade }} </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    fetch() {
      if (!this.lat || !this.lng) return false

      this.$axios
        .get(process.env.API_ENDPOINT + '/tradie/index', {
          params: {
            lat: this.lat,
            lon: this.lng,
            limit: 100000
          }
        })
        .then(({ data }) => {
          this.search = data
        })
    }
  }
}
</script>
