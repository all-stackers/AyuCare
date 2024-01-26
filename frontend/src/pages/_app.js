import Layout from '@/components/layout'
import '@/styles/globals.css'
import AppContextProvider from '@/context/appContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer 
        autoClose={1500}
      />
    </AppContextProvider>
  )
}
