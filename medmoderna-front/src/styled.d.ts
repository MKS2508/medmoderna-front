import 'styled-components';
import {device} from "./components/SideBar/SideBar";

declare module 'styled-components' {
    export interface DefaultTheme {
        sidebarWidth: string;
        navItemPadding: string;
        sidebarHeight: string;
        breakpoints: typeof device; // Agrega la propiedad breakpoints
    }
}
