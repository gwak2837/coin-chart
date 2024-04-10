'use client'

import { Toaster } from 'react-hot-toast'

export default function ReactHotToast() {
  return <Toaster toastOptions={{ error: { duration: 6000 } }} />
}
