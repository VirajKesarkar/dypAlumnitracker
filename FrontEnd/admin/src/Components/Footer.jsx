import React from "react";

function Footer() {
  return (
<div className='flex flex-col gap-12 md:flex-row md:justify-between'>
      <ul className='flex gap-6 font-lato text-blue-400'>

        <li>
          <a href="https://in.linkedin.com/school/d.-y.-patil-college-of-engineering-&-technology-kasaba-bawada/">Linked in</a>
        </li>
        <li>
          <a href="https://www.instagram.com/dypcet_official/">Instagram</a>
        </li>
        <li>
          <a href="https://x.com/dypcet_kolhapur?mx=2">Twitter</a>
        </li>
      </ul>
        <div className='flex gap-2'>

           <div >
            
            <a href="#" className='font-lato font-medium'></a>
           </div>
        </div>
      </div>
    
  )
}

export default Footer