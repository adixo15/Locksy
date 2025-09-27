import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white text-center py-4 px-6 fixed bottom-0 left-0 w-full shadow-lg">
      <p className="text-sm sm:text-base">
        &copy; {new Date().getFullYear()} LOCKSY. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
