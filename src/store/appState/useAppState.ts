import {useTypedSelector} from '../store'
import {useDispatch} from 'react-redux'
import {
    setCurrentFocusPanel as setCurrentFocusPanelActionCreator,
    setHasUpdateAvailable as setHasUpdateAvailableActionCreator,
    setIsDrawerOpen as setIsDrawerOpenActionCreator,
    setIsTouchDevice as setIsTouchDeviceActionCreator,
    setIsModalOpen as setIsModalOpenActionCreator,
    setLocale as setLocaleActionCreator,
    setShowOverlay as setShowOverlayActionCreator,
    setTheme as setThemeActionCreator,
    setWindowInnerSize as setWindowInnerSizeActionCreator,
    setClientProfiles as setClientProfilesActionCreator,
    updateClientProfile as updateClientProfileActionCreator,
    deleteClientProfile as deleteClientProfileActionCreator,
    setActiveProfile as setActiveProfileActionCreator,
    createClientProfile as createClientProfileActionCreator,
    setWorkerServiceIsInitialized
} from './appStateActions'
import {initializeWorkerService} from '../../services/workerService/workerService'
import {Theme} from '../../theme/types'
import {Locale} from '../../localization/types'
import {CurrentFocusPanel, ModalNames, ProfileData} from "./appStateReducer";

export type WindowInnerSize = {
    width: number,
    height: number
}

const useAppState = () => {
    const dispatch = useDispatch()

    const initialize = async () => {
        await initializeWorkerService()
    }

    const isInitialized = useTypedSelector(state => state.appState.workerServiceIsInitialized)
    const isInitializing = !isInitialized

    const isUnlocked = useTypedSelector(state => state.appState.isUnlocked)
    const isLocked = !isUnlocked

    const hasContainer = useTypedSelector(state => state.appState.hasContainer)
    const noContainer = !hasContainer

    const theme = useTypedSelector(state => state.appState.theme)

    // TESTING PURPOSES ONLY
    const setInitialized = (initialized: boolean) => {
        dispatch(setWorkerServiceIsInitialized(initialized))
    }

    // TESTING PURPOSES ONLY

    const setTheme = (theme: Theme) => {
        dispatch(setThemeActionCreator(theme))
    }

    const createClientProfile = (profile: ProfileData) => {
        dispatch(createClientProfileActionCreator(profile))
    }

    const updateClientProfiles = (index: number, profile: ProfileData) => {
        dispatch(updateClientProfileActionCreator(index, profile))
    }

    const deleteClientProfile = (keyId: string) => {
        dispatch(deleteClientProfileActionCreator(keyId))
    }

    const activeProfile = useTypedSelector(state => state.appState.activeProfile)
    const setActiveProfile = (profile: ProfileData) => {
        dispatch(setActiveProfileActionCreator(profile))
    }

    const clientProfiles = useTypedSelector(state => state.appState.clientProfiles)
    const setClientProfiles = (profiles: Array<ProfileData>) => {
        const primaryProfile = profiles.filter(profile => profile.primary)
        if (primaryProfile.length) {
            setActiveProfile(primaryProfile[0])
        }
        dispatch(setClientProfilesActionCreator(profiles))
    }

    const locale = useTypedSelector(state => state.appState.locale)
    const setLocale = (locale: Locale) => {
        dispatch(setLocaleActionCreator(locale))
    }

    const isTouchDevice = useTypedSelector(state => state.appState.isTouchDevice)
    const setIsTouchDevice = (isTouchDevice: boolean) => {
        dispatch(setIsTouchDeviceActionCreator(isTouchDevice))
    }

    const isModalOpen = useTypedSelector(state => state.appState.isModalOpen)
    const setIsModalOpen = (modal: ModalNames) => {
        setIsShowOverlay(!!modal || false)
        setIsDrawerOpen(false)
        dispatch(setIsModalOpenActionCreator(modal))
    }

    const windowInnerSize = useTypedSelector(state => state.appState.windowInnerSize)
    const setWindowInnerSize = (windowInnerSize: WindowInnerSize) => {
        dispatch(setWindowInnerSizeActionCreator(windowInnerSize))
    }

    const showOverlay = useTypedSelector(state => state.appState.showOverlay)
    const setIsShowOverlay = (showOverlay: boolean) => {
        dispatch(setShowOverlayActionCreator(showOverlay))
    }

    const isDrawerOpen = useTypedSelector(state => state.appState.isDrawerOpen)
    const setIsDrawerOpen = (openDrawer: boolean) => {
        dispatch(setIsDrawerOpenActionCreator(openDrawer))
    }

    const currentFocusPanel = useTypedSelector(state => state.appState.currentFocusPanel)
    const setCurrentFocusPanel = (panel: CurrentFocusPanel) => {
        dispatch(setCurrentFocusPanelActionCreator(panel))
    }

    const hasUpdateAvailable = useTypedSelector(state => state.appState.hasUpdateAvailable)
    const setHasUpdateAvailable = (hasUpdateAvailable: boolean) => {
        dispatch(setHasUpdateAvailableActionCreator(hasUpdateAvailable))
    }

    return {
        initialize,
        isInitialized,
        isInitializing,
        hasContainer,
        noContainer,
        setInitialized,
        isUnlocked,
        isLocked,
        theme,
        setTheme,
        locale,
        setLocale,
        isTouchDevice,
        setIsTouchDevice,
        windowInnerSize,
        setWindowInnerSize,
        showOverlay,
        setIsShowOverlay,
        isDrawerOpen,
        setIsDrawerOpen,
        hasUpdateAvailable,
        setHasUpdateAvailable,
        currentFocusPanel,
        setCurrentFocusPanel,
        isModalOpen,
        setIsModalOpen,
        clientProfiles,
        setClientProfiles,
        activeProfile,
        setActiveProfile,
        updateClientProfiles,
        deleteClientProfile,
        createClientProfile
    }
}

export default useAppState
