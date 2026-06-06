import { Toaster as HotToaster } from 'react-hot-toast'

const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{}}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#161B26',
          color: '#F8FAFC',
          border: '1px solid #2A3242',
          borderRadius: '0.75rem',
          padding: '1rem',
          fontSize: '0.875rem',
        },
        success: {
          iconTheme: {
            primary: '#00FF9D',
            secondary: '#0B0F17',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#0B0F17',
          },
        },
      }}
    />
  )
}

export default Toaster
