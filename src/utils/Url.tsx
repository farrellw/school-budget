export function toQueryString(ids: string[]): string {
  return Array.from(ids.values())
    .map(id => `id=${id}`)
    .join("&");
}

export function addId(ids: string[], id: string): string[] {
  if (ids.find(id_ => id_ === id)) {
    return ids;
  } else {
    return [id].concat(ids);
  }
}

export function removeId(ids: string[], id: string): string[] {
  return ids.filter(id_ => id_ !== id);
}
