<template>
    <div>
        <div>
            <v-btn @click="addNewNote" color="primary">+ Add</v-btn>
        </div>
        <v-simple-table>
            <thead>
                <tr>
                    <th width="70">Sr. No</th>
                    <th>Note Title</th>
                    <th>Description</th>
                    <th width="150" align="center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="note, index in todoList" :key="note.id">
                    <td width="70">{{ (index + 1) }}</td>
                    <td>{{ note.title }}</td>
                    <td>{{ note.description }}</td>
                    <td width="150" align="center">
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="editNote(index)" icon class="mr-2" v-bind="attrs" v-on="on"> <v-icon color="primary">mdi-pencil</v-icon> </v-btn>
                            </template>
                            <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="deleteNote(index)" icon class="mr-2" v-bind="attrs" v-on="on"> <v-icon color="error">mdi-trash-can-outline</v-icon> </v-btn>
                            </template>
                            <span>Delete</span>
                        </v-tooltip>
                    </td>
                </tr>
                <tr v-if="todoList.length === 0">
                    <td :colspan=4 class="align-center">Currently there is no data available.</td>
                </tr>
            </tbody>
        </v-simple-table>
        <v-dialog
            v-model="showDialog"
            persistent
            maxWidth="600px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ isAdd ? "Add Note" : "Edit Note" }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col :cols=12>
                                <v-text-field
                                    label="Title of the Note"
                                    v-model="noteTitle"
                                ></v-text-field>
                            </v-col>
                            <v-col :cols="12">
                                <v-textarea label="Note Description" v-model="noteDescription">
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="closeModal" color="secondary">Close</v-btn>
                        <v-btn text @click="saveData" color="blue">Save</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="deleteAlert"
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Delete Alert!
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete this note?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary darken-1"
                        text
                        @click="deleteAlert = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                        color="error darken-1"
                        text
                        @click="confirmDelete"
                    >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { TodoNote } from '~/utils/interfaces';
import { getCurrentTimeInMS, objectDeepClone } from '~/utils/helper'
export default {
    name: "TodoList",

    data() {
        return {
            todoList: [] as TodoNote[],
            showDialog: false,
            isAdd: true,
            noteTitle: "",
            noteDescription: "",
            selectedNoteIdx: 0,
            deleteAlert: false
        }
    },

    methods: {
        addNewNote() {
            this.isAdd = true
            this.showDialog = true
        },

        deleteNote(index: number) {
            this.selectedNoteIdx = index
            this.deleteAlert = true
        },

        confirmDelete() {
            this.todoList.splice(this.selectedNoteIdx, 1)
            this.deleteAlert = false
        },

        editNote(index: number) {
            this.selectedNoteIdx = index
            const obj = objectDeepClone(this.todoList[index])
            this.noteTitle = obj.title
            this.noteDescription = obj.description
            this.isAdd = false
            this.showDialog = true
        },
        
        closeModal() {
            this.showDialog = false
            this.resetFields()
        },
        
        saveData() {
            const payload: TodoNote = this.getFormData()
            if (this.isAdd) {
                this.todoList.push(payload)
            } else {
                this.todoList[this.selectedNoteIdx] = payload
            }
            this.closeModal()
        },

        resetFields() {
            this.noteTitle = ""
            this.noteDescription = ""
        },

        getFormData() {
            const payload: TodoNote = {
                id: getCurrentTimeInMS(),
                title: this.noteTitle,
                description: this.noteDescription
            }
            return payload
        }
    }
}
</script>

<style>

</style>