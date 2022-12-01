import { useState, useCallback } from "react"

export default function useFetching(callback, deps = null) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const fetching = useCallback(async (...args) => {
        try {
            setError('')
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }, deps) // useCallback for use fetchFunc in deps of useEffect in components
    return [fetching, isLoading, error]
}

