<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h3 class="mr-1" @click="setLang('ru')">{{ $t('app.title') }}</h3>
      </div>

      <v-spacer></v-spacer>

      <img v-for="locale in Locales" class="language" v-bind:class="{ active: $i18n.locale === locale }" :key="locale" :src="require(`@/assets/images/${locale}.png`)" @click="setLang(locale)" />

    </v-app-bar>

    <v-main>
      <v-container v-if="State.loadingNotes">
        <v-skeleton-loader max-width="300" type="card"></v-skeleton-loader>
        <v-skeleton-loader max-width="300" type="card"></v-skeleton-loader>
      </v-container>

      <v-container v-if="!State.loadingNotes">
        <v-card v-for="note in State.notes" :key="note.id" max-width="300">
          <v-card-text>
            <div class="text--primary">{{ note.title }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text :to="'/note/' + note.id">{{ $t('app.openButton') }}</v-btn>
            <v-btn text @click="deleteNote(note)">{{ $t('app.deleteButton') }}</v-btn>
          </v-card-actions>
        </v-card>

      </v-container>

      <v-btn v-if="!State.loadingNotes" fixed color="primary" dark fab bottom right to="/note/new">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <router-view />

    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import { Locales } from "@/i18n/locales";
import {Note, State} from '@/state';

export default Vue.extend({
  name: 'App',

  data: () => ({
    Locales,
    State
  }),

  methods: {
    setLang(lang: string) {
      this.$i18n.locale = lang;
    },

    deleteNote(note: Note) {
      const text: string = this.$i18n.tc('app.realyDelete');
      if (confirm(text)) {
        Vue.axios.delete('notes/' + note.id).then(() => {
          State.notes = State.notes.filter(n => n.id !== note.id);
        }, () => undefined)
      }
    }
  },

  created() {
    State.loadingNotes = true;
    Vue.axios.get('notes').then(notes => {
      State.loadingNotes = false;
      State.notes = notes.data;
    });
  }

});
</script>

<style scoped lang="scss">
  main {
    max-width: 800px;
    margin: auto;
    width: 100%;

    .container {
      display: flex;
      padding: 0;
      flex-wrap: wrap;
      align-items: flex-start;
      align-content: baseline;

      .v-skeleton-loader, .v-card {
        flex: 1 1 auto;
        margin: 6px;
      }
    }
  }

  img.language {
    margin: 0 6px;
    cursor: pointer;
    &:not(.active) {
      filter: grayscale(100%);
      opacity: 0.6;
    }
  }
</style>
