export function serialize(obj: unknown) {
  return JSON.parse(JSON.stringify(obj))
}
