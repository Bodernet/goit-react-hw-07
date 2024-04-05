import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const contactsSlice = createSlice({
  name: "items",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(addContact.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      });
    // .addCase(addContact.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })
    // .addCase(deleteContact.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })

    // ДОДАТИ ДЕЛІТ
    // .addCase(deleteContact.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.items = state.items.filter(
    //     (contact) => contact.id !== action.payload
    //   );
    // });
    // .addCase(deleteContact.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});
export const selectContacts = (state) => state.contacts.items;

export const selectIsLoading = (state) => state.contacts.loading;

export const selectError = (state) => state.contacts.error;

export const contactReducer = contactsSlice.reducer;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (filter.length > 0) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.trim().toLowerCase())
      );
    } else {
      return contacts;
    }
  }
);
