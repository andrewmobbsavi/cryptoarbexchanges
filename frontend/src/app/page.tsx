'use client'
import { Link } from '@chakra-ui/next-js'

export default function Home() {
  return (
    <>
        <header>
            
        </header>

        <p>
        <Link href='/exchanges' color='blue.400' _hover={{ color: 'blue.500' }}>
            View exchanges and arbs
        </Link>
        </p>


    </>
  )
}
