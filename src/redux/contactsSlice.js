import { createSlice } from "@reduxjs/toolkit";
import items from "../contactsData.json";
import { nanoid } from "nanoid";

const contactsSlice = createSlice({
  name: "items",
  initialState: { items },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            id: nanoid(),
            name: contact.name,
            number: contact.number,
          },
        };
      },
    },

    deleteContact(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;
export const selectContacts = (state) => state.contacts.items;
