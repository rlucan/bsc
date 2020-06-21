<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    <template v-if="!loadingNote">
                        <span v-if="editedNote.id === 0">{{ $t('noteDialog.newNote') }}</span>
                        <span v-if="editedNote.id !== 0 && dialogMode === 'edit'">{{ $t('noteDialog.editNote') }}</span>
                        <span v-if="editedNote.id !== 0 && dialogMode !== 'edit'">{{ $t('noteDialog.noteDetail') }}</span>
                    </template>
                    <span v-if="loadingNote">{{ $t('noteDialog.loadingNote') }}</span>
                    <v-icon @click="close()">mdi-close</v-icon>
                </v-card-title>

                <v-form ref="form">
                    <div class="spinner-container" v-if="loadingNote">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>

                    <template v-if="!loadingNote">
                        <v-card-text>
                            <v-text-field
                                    v-model="title"
                                    :rules="titleRules($t('noteDialog.requiredField'))"
                                    :label="$t('noteDialog.noteTitle')"
                                    :disabled="dialogMode === 'show'"
                                    required
                            ></v-text-field>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="edit()" v-if="dialogMode === 'show'">{{ $t('noteDialog.edit') }}</v-btn>
                            <v-btn color="primary" text @click="back()" v-if="dialogMode === 'edit' && editedNote.id !== 0">{{ $t('noteDialog.back') }}</v-btn>
                            <v-btn color="primary" text @click="save()" :loading="saving" v-if="dialogMode === 'edit'">{{ $t('noteDialog.save')}}</v-btn>
                        </v-card-actions>
                    </template>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import router from '@/router';
    import {Note, State} from '@/state';

    @Component
    export default class NoteDialog extends Vue {

        dialog = true;
        saving = false;
        loadingNote = false;
        editedNote!: Note;
        dialogMode: 'edit' | 'show' = 'show';
        titleRules = (trans: string) => [ (v: string) =>  !!v || trans ];
        title = '';

        created() {
            this.loadNote();
        }

        @Watch('dialog')
        onDialogClosing() {
            if (!this.dialog) {
                router.push('/');
            }
        }

        @Watch('$route.params')
        onRouteParamsChanged() {
            this.loadNote();
        }

        save() {
            // eslint-disable-next-line
            if((this.$refs.form as any).validate()) {
                this.saving = true;
                this.editedNote.title = this.title;
                if (this.editedNote.id === 0) {
                    Vue.axios.post('notes', this.editedNote).then(r => {
                        State.notes.push(r.data);
                        this.close();
                    }, () => this.saving = false)
                } else {
                    Vue.axios.put('notes/' + this.editedNote.id, this.editedNote).then(r => {
                        State.notes.map(n => n.id === r.data.id ? r.data : n);
                        this.close();
                    }, () => this.saving = false)
                }
            }
        }

        close() {
            this.dialog = false;
        }

        edit() {
            router.push(this.editedNote.id + '/edit');
        }

        back() {
            this.title = this.editedNote.title || '';
            router.push('../' + this.editedNote.id);
        }

        loadNote() {
            const p = this.$route.params;
            const m = p.mode === 'edit' ? 'edit' : 'show';
            if (this.dialogMode !== m) {
                this.dialogMode = m;
                return;
            }
            this.loadingNote = false;
            if (p.id === 'new') {
                this.dialogMode = 'edit';
                this.editedNote = { id: 0, title: ''};
                this.title = '';
            } else {
                this.loadingNote = true;
                Vue.axios.get('notes/' + p.id).then(n => {
                    this.editedNote = n.data;
                    this.title = this.editedNote.title || '';
                    this.loadingNote = false;
                }, () => this.close())
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .spinner-container {
        min-height: 155px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .v-card__title button  {
        position: absolute;
        right: 8px;
        top: 8px;
        cursor: pointer;
    }
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
