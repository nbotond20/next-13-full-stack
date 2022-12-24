import React from 'react'

import GoogleLoginButton from 'app/components/auth/GoogleSignInButton'
import TextField from 'app/components/form/TextField'
import Button from 'app/components/ui/button'

const SignInPage = () => {
  return (
    <>
      <form>
        <div>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Sign in with your email"
            placeholder="hello@me.com"
            autoComplete="email"
            required
          />
        </div>
        <Button type="submit" variant="outline" color="gray">
          Continue with email
        </Button>
      </form>
      <div>or</div>
      <GoogleLoginButton />
    </>
  )
}

export default SignInPage
