import {createReducer} from '@reduxjs/toolkit'
import {
    deleteClientProfile,
    setActiveProfile,
    setClientProfiles,
    setCurrentFocusPanel,
    setHasContainer,
    setHasUpdateAvailable,
    setIsDrawerOpen,
    setIsModalOpen,
    setIsTouchDevice,
    setLocale,
    setShowOverlay,
    setTheme,
    setWindowInnerSize,
    setWorkerServiceIsInitialized,
    updateClientProfile
} from './appStateActions'
import {Theme} from '../../theme/types'
import {Locale} from '../../localization/types'
import {getPreferredLocale} from '../../localization/localization'
import {detectWindowInnerSize} from "../../utilities/utilities";
import {WindowInnerSize} from './useAppState'

export type CurrentFocusPanel = 'left' | 'main' | 'right'

export type ModalNames = 'settings' | 'manageProfile' | null

export type ProfileData = {
    imageSrc?: string,
    keyid: string,
    nickname?: string,
    primary: boolean
}

type AppStateReducerState = {
    isTouchDevice: boolean,
    isUnlocked: boolean,
    isDrawerOpen: boolean,
    isModalOpen: ModalNames,
    hasContainer: boolean,
    showOverlay: boolean,
    currentFocusPanel: CurrentFocusPanel,
    windowInnerSize: WindowInnerSize,
    workerServiceIsInitialized: boolean,
    theme: Theme,
    locale: Locale,
    hasUpdateAvailable: boolean,
    clientProfiles: Array<ProfileData>,
    activeProfile: ProfileData | null

}

const initialState: AppStateReducerState = {
    isTouchDevice: false,
    isUnlocked: false,
    isDrawerOpen: false,
    isModalOpen: null,
    hasContainer: false,
    showOverlay: false,
    currentFocusPanel: 'left',
    windowInnerSize: detectWindowInnerSize(),
    workerServiceIsInitialized: false,
    theme: 'Auto',
    locale: getPreferredLocale(),
    hasUpdateAvailable: false,
    clientProfiles: [],
    activeProfile: null
}

const appStateReducer = createReducer(initialState, builder => {
    return builder
        .addCase(setWorkerServiceIsInitialized, (state, action) => {
            state.workerServiceIsInitialized = action.payload.workerServiceIsInitialized
        })

        .addCase(setHasContainer, (state, action) => {
            state.hasContainer = action.payload.hasContainer
        })

        .addCase(setTheme, (state, action) => {
            state.theme = action.payload.theme
        })

        .addCase(setLocale, (state, action) => {
            state.locale = action.payload.locale
        })

        .addCase(setIsTouchDevice, (state, action) => {
            state.isTouchDevice = action.payload.isTouchDevice
        })

        .addCase(setWindowInnerSize, (state, action) => {
            state.windowInnerSize = action.payload.windowInnerSize
        })

        .addCase(setShowOverlay, (state, action) => {
            state.showOverlay = action.payload.toggleOverlay
        })

        .addCase(setIsDrawerOpen, (state, action) => {
            state.isDrawerOpen = action.payload.isDrawerOpen
        })

        .addCase(setHasUpdateAvailable, (state, action) => {
            state.hasUpdateAvailable = action.payload.hasUpdateAvailable
        })

        .addCase(setCurrentFocusPanel, (state, action) => {
            state.currentFocusPanel = action.payload.panel
        })

        .addCase(setIsModalOpen, (state, action) => {
            state.isModalOpen = action.payload.isOpen
        })

        .addCase(setClientProfiles, (state, action) => {
            state.clientProfiles = action.payload.profiles
        })

        .addCase(updateClientProfile, (state, action) => {
            const updatedProfiles = state.clientProfiles.map(profile => {
                profile.primary = false
                return profile
            })
            updatedProfiles[action.payload.index] = action.payload.profile
            state.clientProfiles = updatedProfiles
        })

        .addCase(setActiveProfile, (state, action) => {
            state.activeProfile = action.payload.profile
        })

        .addCase(deleteClientProfile, (state, action) => {
            state.clientProfiles = state.clientProfiles.filter(profile => profile.keyid !== action.payload.keyId)
            if (state.activeProfile?.keyid === action.payload.keyId) {
                state.activeProfile = state.clientProfiles.filter(profile => profile.primary)[0]
            }
        })
})

export default appStateReducer
