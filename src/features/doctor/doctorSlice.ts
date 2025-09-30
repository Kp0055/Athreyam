// doctorSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { docState } from "../../types/doctor/doctorType";

// Initial state
const initialState: docState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: 0,
  bio: "",
  gender: "",
  experience: "",
  dob: "",
  city: "",
  state: "",
  country: "",
  languages: [],
  role: "doctor",
  loading: false,
  error: null,
  imageUrl: "",
};

// Thunk to fetch profile
export const fetchProfile = createAsyncThunk(
  "doctor/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/Doctor/profile", {
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json();
        return thunkAPI.rejectWithValue(errData.message || "Failed to fetch");
      }

      const data = await res.json();
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// Create the slice
const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        const {
          firstName,
          lastName,
          email,
          phoneNumber,
          bio,
          gender,
          experience,
          dob,
          city,
          languages,
          state: useState,
          country,
          imageUrl, // ✅ include this
        } = action.payload;

        state.firstName = firstName;
        state.lastName = lastName;
        state.email = email;
        state.bio = bio;
        state.gender = gender;
        state.experience = experience;
        state.dob = dob;
        state.city = city;
        state.state = useState;
        state.country = country;
        state.languages = languages;
        state.phoneNumber = phoneNumber;
        state.imageUrl = imageUrl; // ✅ assign to Redux state
        state.loading = false;
      })

      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// update doctor profile

export default doctorSlice.reducer;
