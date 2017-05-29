const validateInt = (callback, defaultValue = 1) => (
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
