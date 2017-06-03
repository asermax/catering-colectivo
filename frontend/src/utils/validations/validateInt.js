const validateInt = (callback, defaultValue = null) => (
  (value) => {
    value = parseInt(value)

    if (!isNaN(value)) {
      callback(value)
    } else {
      callback(defaultValue)
    }
  }
)

export default validateInt
