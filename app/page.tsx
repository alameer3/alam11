import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to welcome page on first visit
  redirect('/welcome')
}