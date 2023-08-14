import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import {
    apiGetUserHFM,
    apiSignIn,
    apiSignInWithGoogle,
    apiSignOut,
    // apiSignUp,
} from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import firebaseErrorHandler from 'utils/firebaseErrorHandler'

function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values)
            if (resp.user) {
                const tokens = resp.user.stsTokenManager
                // Call apiGetUserHFM with email address and access token to get user information
                const { accessToken } = tokens
                const data = {
                    email: resp.user.email,
                }
                const response = await apiGetUserHFM(data, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
                if (response.status !== 200) {
                    return {
                        status: 'failed',
                        message: 'Something went wrong!',
                    }
                }
                if (response.data?.user?.account_type !== 'standard') {
                    return {
                        status: 'failed',
                        message: 'User not authorized to access this system',
                    }
                }

                dispatch(onSignInSuccess(tokens))
                dispatch(setUser(response.data?.user))

                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )

                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return firebaseErrorHandler(errors)
        }
    }

    const signInWithGoogle = async () => {
        try {
            const resp = await apiSignInWithGoogle()
            if (resp.user) {
                const tokens = resp.user.stsTokenManager
                dispatch(onSignInSuccess(tokens))
                if (resp.user) {
                    dispatch(
                        setUser(
                            resp.user || {
                                avatar: resp.user.photoURL,
                                userName: resp.user.displayName,
                                authority: ['USER'],
                                email: resp.user.email,
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return firebaseErrorHandler(errors)
        }
    }

    // const signUp = async (values) => {
    //     try {
    //         const resp = await apiSignUp(values)
    //         if (resp.data) {
    //             const { token } = resp.data
    //             dispatch(onSignInSuccess(token))
    //             if (resp.data.user) {
    //                 dispatch(
    //                     setUser(
    //                         resp.data.user || {
    //                             avatar: '',
    //                             userName: 'Anonymous',
    //                             authority: ['USER'],
    //                             email: '',
    //                         }
    //                     )
    //                 )
    //             }
    //             const redirectUrl = query.get(REDIRECT_URL_KEY)
    //             navigate(
    //                 redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
    //             )
    //             return {
    //                 status: 'success',
    //                 message: '',
    //             }
    //         }
    //     } catch (errors) {
    //         return {
    //             status: 'failed',
    //             message: errors?.response?.data?.message || errors.toString(),
    //         }
    //     }
    // }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        // signUp,
        signInWithGoogle,
        signOut,
    }
}

export default useAuth
