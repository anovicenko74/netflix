const useObjectParams = (urlSeatchParams) => {
  const params = {}
  for (let [key, value] of urlSeatchParams.entries()) {
    params[key] = value
  }
  return params
}

export default useObjectParams