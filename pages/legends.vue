<template>
  <div class="container mx-auto text-center">
    <h1 class="font-bold text-5xl my-6">{{ legends.length }} Legends</h1>
    <div class="text-left">
      <div class="px-3">
        Filter by
      </div>
      <div class="flex flex-wrap">
        <div
          v-show="zipcode || zipcodes.length > 1"
          class="w-full sm:w-1/2 p-3"
        >
          <SelectFilter
            :items="zipcodes"
            v-model="zipcode"
            label="Postcode"
          ></SelectFilter>
        </div>
        <div v-show="skill || skills.length > 1" class="w-full sm:w-1/2 p-3">
          <SelectFilter
            :items="skills"
            v-model="skill"
            label="Skills"
          ></SelectFilter>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div v-for="individual in sorted" class="w-1/2 sm:w-1/3 p-2">
        <div
          class="bg-white px-6 py-8 rounded-lg text-center sm:h-48 flex flex-col items-center justify-center"
        >
          <h2 class="text-xl font-bold text-gray-700 capitalize">
            {{ individual.name }}
          </h2>
          <h2
            v-if="individual.company"
            class="text-sm font-medium text-gray-700 capitalize"
          >
            {{ individual.company }}
          </h2>
          <span class="text-blue-500 block">{{ individual.skills }} </span>
        </div>
      </div>
    </div>
    <div>
      <small> Last updated {{ lastDate }} </small>
    </div>
  </div>
</template>
<script>
import { last, sortBy } from 'lodash-es'
import sortedUniq from 'lodash-es/sortedUniq'
import uniq from 'lodash-es/uniq'

export default {
  components: { SelectFilter: () => import('~/components/legends/filter.vue') },
  data() {
    return {
      legends: [],
      skill: null,
      zipcode: null
    }
  },
  computed: {
    lastDate() {
      return (last(this.legends) || {}).date
    },
    sorted() {
      return sortBy(this.legends, 'name')
        .filter((l) => !this.zipcode || this.zipcode === l.zipcode)
        .filter((l) => !this.skill || this.skill === l.skills)
    },
    skills() {
      const source = this.zipcode ? this.sorted : this.legends
      const skills = source.map((l) => l.skills)
      return uniq(skills)
        .sort()
        .filter((e) => e)
    },
    zipcodes() {
      const source = this.skill ? this.sorted : this.legends

      return sortedUniq(source.map((l) => l.zipcode))
    },
    companies() {
      return this.legends.filter((l) => l.type === 'Company')
    },

    individuals() {
      return this.legends.filter((l) => l.type === 'Individual')
    }
  },
  mounted() {
    this.$axios
      .get(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpI6XAENFlyUChsOBH-29E-Hr1lbx1GrIoAjaFiH0C15ncq5P1nS-cRLFxNkJZ9W8WlyrKe4-WIQMt/pub?gid=226450965&single=true&output=csv'
      )
      .then(({ data }) => {
        this.legends = this.processData(data)
      })
  },
  methods: {
    processData(allText) {
      const allTextLines = allText.split(/\r\n|\n/)
      const headers = allTextLines[0].split(',')
      const lines = []

      for (let i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(',')
        if (data.length === headers.length) {
          const tarr = {}
          for (let j = 0; j < headers.length; j++) {
            tarr[headers[j]] = data[j]
          }
          lines.push(tarr)
        }
      }
      return lines
    }
  }
}
</script>
