'use client'

import { ReactNode, useState } from 'react'

interface FormWrapperProps {
  title: string
  children: ReactNode
  onSubmit?: (data: FormData) => void
  className?: string
}

export default function FormWrapper({ 
  title, 
  children, 
  onSubmit,
  className = '' 
}: FormWrapperProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (onSubmit) {
      const formData = new FormData(e.currentTarget)
      await onSubmit(formData)
    }
    
    setIsLoading(false)
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {children}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Procesando...' : 'Continuar'}
        </button>
      </form>
    </div>
  )
}