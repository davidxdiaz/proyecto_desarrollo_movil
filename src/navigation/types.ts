import { NavigatorScreenParams } from '@react-navigation/native';

// 1. Tipos para las pestañas inferiores
export type RootTabParamList = {
  Home: undefined;
  Perfiles: undefined;
  Documentos: undefined;
  Ajustes: undefined;
};

// 2. Tipos para el Stack principal (La raíz de la app)
export type RootStackParamList = {
  Login: undefined;
  // MainTabs contiene dentro el RootTabParamList
  MainTabs: NavigatorScreenParams<RootTabParamList>; 
};