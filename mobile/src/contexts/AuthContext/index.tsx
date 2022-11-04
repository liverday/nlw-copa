import React, { createContext, useCallback, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { GOOGLE_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

type UserProps = {
  name: string;
  avatarUrl: string;
  email: string;
}

export type AuthContextData = {
  isUserLoading: boolean;
  user: UserProps,
  signIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  const signIn = async () => {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }

  const signInWithGoogle = useCallback(async (accessToken: string) => {
    console.log(`TOKEN DE AUTHENTICACAO ${accessToken}`)
  }, []);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response]);
  
  return (
    <AuthContext.Provider
      value={{
        isUserLoading,
        signIn,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}