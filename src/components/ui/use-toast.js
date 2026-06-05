export function toast({ title, description }) {
  console.info([title, description].filter(Boolean).join(': '));
}
