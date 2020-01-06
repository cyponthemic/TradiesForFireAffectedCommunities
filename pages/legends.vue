<template>
  <div class="bg-red-500 pt-12 text-center min-h-screen">
    <h1 class="font-bold text-5xl my-6 text-white">
      {{ legends.length }} Legends
    </h1>

    <div class="container mx-auto">
      <div class="bg-white rounded-lg  px-6 py-8 mx-3 text-left">
        <div class="px-3">
          Filter by
        </div>
        <div class="flex flex-wrap">
          <div class="w-full sm:w-1/2 p-3">
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
        <div v-for="individual in sorted" class="w-full sm:w-1/3 p-3">
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
        <small> Last updated {{ lastDate }}</small>
      </div>
    </div>
  </div>
</template>
<script>
import { last, sortBy } from 'lodash-es'
import uniq from 'lodash-es/uniq'
import Papa from 'papaparse'
import flatten from 'lodash-es/flatten'
import trim from 'lodash-es/trim'

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
      return sortBy(this.legends, (tradie) => tradie.name + tradie.company)
        .filter((l) => !this.zipcode || this.zipcode === l.zipcode)
        .filter((l) => !this.skill || l.skills.includes(this.skill))
    },
    skills() {
      const source = this.zipcode ? this.sorted : this.legends
      const skills = flatten(
        source.map((l) => l.skills.split(',').map((e) => trim(e)))
      )
      return uniq(skills)
        .sort()
        .filter((e) => e)
    },
    zipcodes() {
      const source = (this.skill ? this.sorted : this.legends).map(
        (l) => l.zipcode
      )
      return uniq(source)
        .sort()
        .filter((e) => e)
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
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpI6XAENFlyUChsOBH-29E-Hr1lbx1GrIoAjaFiH0C15ncq5P1nS-cRLFxNkJZ9W8WlyrKe4-WIQMt/pub?output=csv'
      )
      .then(({ data }) => {
        this.legends = Papa.parse(data, {
          header: true
        }).data

        console.log(Papa.parse(data))
      })
  },
  methods: {
    processData(allText) {
      const allTextLines = allText.split(/\r\n|\n/)
      const headers = allTextLines[0].split(',')
      const lines = []

      for (let i = 1; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(',')
        const tarr = {}
        for (let j = 0; j < headers.length; j++) {
          tarr[headers[j]] = data[j]
        }
        lines.push(tarr)
      }
      return lines
    }
  }
}
</script>
