const validateInt = (callback) => (
  (value, defaultValue = null, min = null) => {
    value = parseInt(value)

    if (!isNaN(value) && (min == null || value >= min)) {
      callback(value)
    } else {
      callback(defaultValue)
    }
  }
)

export default validateInt
