import { NavigationLink, NAVIGATION_ICON } from '../../types';
import { URL_PATHS } from '../../urlPaths';

export const HOME: NavigationLink = {
    icon: NAVIGATION_ICON.HOME,
    displayName: 'Home',
    path: URL_PATHS.MEMBERS.HOME,
} as const;

export const FAVORITES: NavigationLink = {
    icon: NAVIGATION_ICON.FAVORITES,
    displayName: 'Favorites',
    path: URL_PATHS.MEMBERS.FAVORITES,
} as const;

export const DIRECTORY: NavigationLink = {
    icon: NAVIGATION_ICON.CLIENTS,
    displayName: 'Directory',
    path: URL_PATHS.DIRECTORY.ROOT,
} as const;

export const CONTENT_LIBRARY: NavigationLink = {
    icon: NAVIGATION_ICON.LIBRARY,
    displayName: 'Library',
    path: URL_PATHS.CONTENT.LIBRARY,
} as const;
