import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Crypto Exchange Arb Opportunitues',
  description: 'Arb opportunities across exchanges worldwide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-slate-100 p-10`}>
         <Providers>
            {children}
        </Providers>
        </body>
    </html>
  )
}
