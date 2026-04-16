import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { type Attendee } from "../../types";
import { type RootState } from "../../app/store";

const attendeesAdapter = createEntityAdapter<Attendee>({});

const initialState = attendeesAdapter.getInitialState();

export const attendeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendee: builder.query({
      query: () => ({
        url: "/api/attendees",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedAttendees = responseData.map((attendee: Attendee) => {
          attendee.id = attendee._id;
          return attendee;
        });
        return attendeesAdapter.setAll(initialState, loadedAttendees);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Attendee" as const, id: "LIST" },
            ...result.ids.map((id) => ({ type: "Attendee" as const, id })),
          ];
        } else return [{ type: "Attendee" as const, id: "LIST" }];
      },
    }),
    getAnalytics: builder.query({
      query: () => "/api/attendees/analytics",
      providesTags: [{ type: "Attendee", id: "LIST" }],
    }),
    createAttendee: builder.mutation({
      query: (initialAttendee) => ({
        url: "/api/attendees",
        method: "POST",
        body: {
          ...initialAttendee,
        },
      }),
      invalidatesTags: [{ type: "Attendee", id: "LIST" }],
    }),
    updateAttendee: builder.mutation({
      query: (initialAttendee) => ({
        url: `/api/attendees/${initialAttendee.id}`,
        method: "PATCH",
        body: {
          ...initialAttendee,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Attendee", id: arg.id },
      ],
    }),
    deleteAttendee: builder.mutation({
      query: ({ id }) => ({
        url: `/api/attendees/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Attendee", id: arg.id },
      ],
    }),
  }),
});

export const {
  useCreateAttendeeMutation,
  useGetAttendeeQuery,
  useDeleteAttendeeMutation,
  useUpdateAttendeeMutation,
  useGetAnalyticsQuery,
} = attendeesApiSlice;

// returns the query result object
export const selectAttendeesResult =
  attendeesApiSlice.endpoints.getAttendee.select(undefined);

// creates memoized selector
const selectAttendeesData = createSelector(
  selectAttendeesResult,
  (attendeesResult) => attendeesResult.data, // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAttendees,
  selectById: selectAttendeeById,
  selectIds: selectAttendeeIds,
  // Pass in a selector that returns the notes slice of state
} = attendeesAdapter.getSelectors(
  (state: RootState) => selectAttendeesData(state) ?? initialState,
);
