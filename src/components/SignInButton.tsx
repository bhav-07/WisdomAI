'use client'
//In Next.js, you can use the use client directive to declare a boundary between Server and Client Component modules. This means that by defining a use client in a file, all other modules imported into it, including child components, are considered part of the client bundle and will be rendered by React on the client
import React from 'react'
import { Button } from './ui/button'
import {signIn} from 'next-auth/react'

type Props = {}

const SignInButton = (props: Props) => {
    return (
        <Button variant='ghost' onClick={()=>{
            signIn('google')
        }}>Sign In</Button>
    )
}

export default SignInButton