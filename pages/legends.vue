<template>
  <div class="container mx-auto text-center">
    <h1 class="font-bold text-5xl my-6">{{ legends.length }} Legends</h1>
    <div>
      <div>
        Filter by
      </div>
      <div v-show="zipcode !== '' || zipcodes.length > 1">
        Postcodes <br />
        <select id="zipcodes" v-model="zipcode" name="">
          <option value=""></option>
          <option :value="zipcode" v-for="zipcode in zipcodes">{{
            zipcode
          }}</option>
        </select>
      </div>
    </div>
    <div v-show="skill !== '' || skills.length > 1">
      Skills <br />
      <select id="skills" v-model="skill" name="">
        <option value=""></option>
        <option :value="skill" v-for="skill in skills">
          {{ skill }}
        </option>
      </select>
    </div>
    <div class="flex flex-wrap">
      <div v-for="individual in sorted" class="w-1/4 p-3 capitalize">
        {{ individual.name }}

        <br v-if="individual.company" />
        <span v-if="individual.company"> ({{ individual.company }}) </span>
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
  data() {
    return {
      legends: [],
      skill: '',
      zipcode: ''
    }
  },
  computed: {
    lastDate() {
      return (last(this.legends) || {}).date
    },
    sorted() {
      return sortBy(this.legends, 'name')
        .filter((l) => this.zipcode === '' || this.zipcode === l.zipcode)
        .filter((l) => this.skill === '' || this.skill === l.skills)
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
