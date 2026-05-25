import { useQuery } from '@tanstack/react-query'

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ping'],
    queryFn: () => fetch('/api/ping').then(res => res.text())
  })

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">🍝 Recipe App</h1>
      <p className="mt-4 text-gray-600">
        Backend says:{' '}
        <span className="font-mono">
          {isLoading && 'loading...'}
          {error && `Error: ${error.message}`}
          {data}
        </span>
      </p>
    </div>
  )
}

export default App