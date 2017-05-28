const coalesce = (first, ...rest) =>
  first != null && rest.length > 0 ? first : coalesce(...rest, null)

export default coalesce
