"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { auth, googleProvider, db } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Salvar/atualizar dados do usuário no Firestore
        await saveUserToFirestore(user)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const saveUserToFirestore = async (user: User) => {
    try {
      const userRef = doc(db, "usuarios", user.uid)
      const userSnap = await getDoc(userRef)

      const userData = {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        provider: user.providerData[0]?.providerId || "unknown",
        lastLoginAt: new Date().toISOString(),
        status: "ativo",
        role: "usuario", // Role padrão para todos os novos usuários
      }

      if (userSnap.exists()) {
        // Usuário já existe, apenas atualizar último login (sem alterar o role)
        await updateDoc(userRef, {
          lastLoginAt: userData.lastLoginAt,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
        })
      } else {
        // Novo usuário, criar registro completo com role "usuario"
        await setDoc(userRef, {
          ...userData,
          createdAt: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Erro ao salvar usuário no Firestore:", error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error("Erro ao fazer login:", error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Erro ao fazer login com email:", error)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: name })
    } catch (error) {
      console.error("Erro ao criar conta:", error)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error("Erro ao enviar email de recuperação:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
