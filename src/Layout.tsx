import type React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics'

type LayoutProps = {
  children: React.ReactNode
  isAuthenticated: boolean
  isAdmin: boolean
  username: string
  userId: string
  onLogout: () => void
}

function Layout({
  children,
  isAuthenticated,
  isAdmin,
  username,
  userId,
  onLogout,
}: LayoutProps) {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  useGoogleAnalytics(userId)

  const isHomePage = location.pathname === '/'
  const isLoginPage = location.pathname.toLowerCase() === '/login'
  const isLLSLandingPage = location.pathname.toLowerCase() === '/lls'
  const isHomeLandingPage = isHomePage && !isAuthenticated
  const mainClassName =
    isHomeLandingPage || isLLSLandingPage
      ? ''
      : 'flex-1 lg:w-screen-lg mx-4 lg:mx-auto my-12'
  const isHomeMatchingPage = isHomePage && isAuthenticated

  return (
    <>
      {isLoginPage || (
        <Header {...{ isAuthenticated, isAdmin, username, onLogout }} />
      )}
      <main className={mainClassName}>{children}</main>
      {isHomeMatchingPage || <Footer isLLS={isLLSLandingPage} />}
    </>
  )
}

export default Layout
