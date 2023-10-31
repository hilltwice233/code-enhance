export function removeJsonComments(raw: string): string {
  return raw.replaceAll("", "")
}

if (import.meta.vitest) {
  const {it, expect} = import.meta.vitest
  it("remove json comments", () => {
    expect(removeJsonComments("")).toBe("")
  })
}
