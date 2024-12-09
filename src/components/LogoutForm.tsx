

import { logout } from '@/actions'
import { Button, buttonVariants } from './ui/button'

const logoutForm = () => {
  return (
    <form action={logout}>
             <Button className={buttonVariants()}>Logout</Button>
    </form>
   )
}

export default logoutForm
