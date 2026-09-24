import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

// 1. Interfaz de Redux (Mantienes la que ya tenías)
export interface Profile {
  id: string;
  name: string;
  type: 'tutor' | 'pediatric';
  age: number;
  details: string;
  avatarUrl?: string;
  isUpToDate?: boolean;
  nextRevision?: string;
}

interface ProfilesState {
  profiles: Profile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Mejoramos el control de carga
  error: string | null;
}

const initialState: ProfilesState = {
  profiles: [],
  status: 'idle',
  error: null,
};

// 1. El Async Thunk para LEER desde Supabase
export const fetchProfilesFromSupabase = createAsyncThunk(
  'profiles/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      // Pedimos todos los registros de la tabla 'profiles'
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false }); // Los más recientes primero

      if (error) throw new Error(error.message);

      // 2. Mapeamos de snake_case (PostgreSQL) a camelCase (TypeScript/Redux)
      return data.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        age: item.age,
        details: item.details,
        avatarUrl: item.avatar_url,
        isUpToDate: item.is_up_to_date,
        nextRevision: item.next_revision,
      })) as Profile[];
      
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. El Async Thunk para guardar en Supabase
export const saveProfileToSupabase = createAsyncThunk(
  'profiles/saveProfile',
  // Omitimos el 'id' porque Supabase lo generará automáticamente
  async (newProfile: Omit<Profile, 'id'>, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            name: newProfile.name,
            type: newProfile.type,
            age: newProfile.age,
            details: newProfile.details,
            avatar_url: newProfile.avatarUrl, // Mapeo de camelCase a snake_case
            is_up_to_date: newProfile.isUpToDate,
            next_revision: newProfile.nextRevision,
          }
        ])
        .select() // Pide que devuelva la fila recién creada (con el UUID generado)
        .single();

      if (error) throw new Error(error.message);

      // Mapeamos de vuelta a camelCase para nuestro estado de Redux
      return {
        id: data.id,
        name: data.name,
        type: data.type,
        age: data.age,
        details: data.details,
        avatarUrl: data.avatar_url,
        isUpToDate: data.is_up_to_date,
        nextRevision: data.next_revision,
      } as Profile;
      
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. El Slice con extraReducers
const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {}, // Los reducers síncronos se quedan aquí (si los necesitas)
  extraReducers: (builder) => {
    builder
      // Cuando la petición inicia
      .addCase(saveProfileToSupabase.pending, (state) => {
        state.status = 'loading';
      })
      // Cuando la petición es exitosa
      .addCase(saveProfileToSupabase.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.status = 'succeeded';
        state.profiles.push(action.payload); // Agregamos el perfil devuelto por Supabase
        console.log('Perfil guardado en Supabase y añadido a Redux:', action.payload);
      })
      // Cuando la petición falla
      .addCase(saveProfileToSupabase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      //Leer
      .addCase(fetchProfilesFromSupabase.pending, (state) => {
        state.status = 'loading'; // Activamos la pantalla de carga
      })
      .addCase(fetchProfilesFromSupabase.fulfilled, (state, action: PayloadAction<Profile[]>) => {
        state.status = 'succeeded';
        state.profiles = action.payload; // Reemplazamos la memoria vacía con los datos de la nube
      })
      .addCase(fetchProfilesFromSupabase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default profilesSlice.reducer;