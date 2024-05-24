import React from 'react'
import {Navbar} from '@material-tailwind/react'

const Header = () => {
  return (
  <Navbar className='   p-6 backdrop-blur lg:px-8 bg-red-400 border-none  rounded-none' >
<p className='text-center items-center text-black-800 text-4xl font-serif font-bold'>    Dictionary
</p>  </Navbar>
  )
}

export default Header