// Providers.js
'use client';
import { Provider } from "react-redux";
import { store } from "./store";

interface ProvidersProps{
    children: React.ReactNode
}
export function Providers(props:ProvidersProps) {
  return <Provider store={store}>{props.children}</Provider>;
}