const validateStr = (callback, defaultValue = null) => (
  (value) => {
    value = value.trim()

    if (value !== '') {
      callback(value)
    } else {
      callback(defaultValue)
    }
  }
)

export default validateStr
