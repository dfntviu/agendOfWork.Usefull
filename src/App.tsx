
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { LoginPageBest } from '@/routes/LoginPageBetter'
import { DashboardPage } from './routes/DashboardPage'
import { Layout } from './components/Layout'
import { ResourcesPage } from './routes/ResourcesPage'
import { CalendarPage } from './routes/CalendarPage'
import { StatsPage } from './routes/StatsPage'  // nueva [trabajo de] -> 2026/Sept/09
import { TeamPage } from '@/routes/TeamPage'  // Aniadir Equipos 
 import { LandingPage } from '@/LandingPage'

const queryClient = new QueryClient();

function App() {
    return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes> 
            {/* Sobre la Navegacion Publica */}
            <Route path='/' element={ <LandingPage/> } />
            <Route path="/login" element={<LoginPageBest />} />
            {/* Sobre el Menú */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout/>}>
                <Route path="/dash-page" element={<DashboardPage />} />
                <Route path='/calendar' element={<CalendarPage />} />
                <Route path="/resources" element={<ResourcesPage />} />{/*</Route> */}
                <Route path="/dashboard" element={<StatsPage/>}/>
                <Route path='/teams' element={<TeamPage/>} />  {/*</Route>  */}
              </Route> 
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
    </>
  )
}
export default App