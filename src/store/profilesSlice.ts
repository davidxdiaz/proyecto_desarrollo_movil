import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  id: string;
  name: string;
  type: 'TUTOR LEGAL' | 'PEDIÁTRICO';
  age: number;
}

interface ProfilesState {
  profiles: Profile[];
  loading: boolean;
}

const initialState: ProfilesState = {
  profiles: [],
  loading: false,
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles.push(action.payload);
      console.log('Flujo de datos Redux - Perfil agregado:', action.payload);
    },
    removeProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(profile => profile.id !== action.payload);
    }
  }
});

export const { addProfile, removeProfile } = profilesSlice.actions;
export default profilesSlice.reducer;