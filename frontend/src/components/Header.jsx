// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// const Header = ({ isAuthenticated, onLogout }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen)
//   }

//   return (
//     <div className="navbar bg-white shadow-lg">
//       {/* Mobile menu button */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div 
//             tabIndex={0} 
//             role="button" 
//             className="btn btn-ghost lg:hidden"
//             onClick={toggleMobileMenu}
//           >
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-5 w-5" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth="2" 
//                 d="M4 6h16M4 12h8m-8 6h16" 
//               />
//             </svg>
//           </div>
//           {mobileMenuOpen && (
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-gray-800 rounded-box w-52"
//             >
//               <li><Link to="/dashboard" onClick={toggleMobileMenu}>Dashboard</Link></li>
//               <li><Link to="/tasks" onClick={toggleMobileMenu}>My Tasks</Link></li>
//               {isAuthenticated ? (
//                 <>
//                   <li><Link to="/profile" onClick={toggleMobileMenu}>Profile</Link></li>
//                   <li><button onClick={() => { onLogout(); toggleMobileMenu(); }}>Logout</button></li>
//                 </>
//               ) : (
//                 <li><Link to="/login" onClick={toggleMobileMenu}>Login</Link></li>
//               )}
//             </ul>
//           )}
//         </div>
//         <Link to="/" className="text-xl font-bold">
//           <span className=" text-black">Task</span>
//           <span className="text-[#AC2898]">Trail</span>
//         </Link>
//       </div>

//       {/* Desktop navigation */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 gap-2">
//           <li>
//             <Link to="/dashboard" className="text-white hover:bg-white/20 rounded-lg">
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/tasks" className="text-white hover:bg-white/20 rounded-lg">
//               My Tasks
//             </Link>
//           </li>
//           {isAuthenticated && (
//             <li>
//               <Link to="/profile" className="text-white hover:bg-white/20 rounded-lg">
//                 Profile
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>

//       {/* Auth buttons */}
//       <div className="navbar-end gap-2">
//         {isAuthenticated ? (
//           <button 
//             onClick={onLogout}
//             className="btn bg-white text-[#AC2898] hover:bg-gray-100 border-none"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link to="/login" className="btn bg-[#FFEDED] text-[#AC2898] hover:bg-gray-100 border-none">
//               Login
//             </Link>
//             {/* <Link to="/login" className="btn bg-transparent text-white hover:bg-white/20 border-white">
//               Sign Up
//             </Link> */}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Header


import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ isAuthenticated, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="navbar bg-white shadow-sm px-4 sm:px-6 lg:px-8">
      {/* Mobile menu button and logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost lg:hidden"
            onClick={toggleMobileMenu}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h8m-8 6h16" 
              />
            </svg>
          </div>
          {mobileMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 border border-gray-100"
            >
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:bg-[#FFEDED]"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/tasks" 
                  className="text-gray-700 hover:bg-[#FFEDED]"
                  onClick={toggleMobileMenu}
                >
                  My Tasks
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to="/profile" 
                      className="text-gray-700 hover:bg-[#FFEDED]"
                      onClick={toggleMobileMenu}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => { onLogout(); toggleMobileMenu(); }} 
                      className="text-gray-700 hover:bg-[#FFEDED] text-left"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:bg-[#FFEDED]"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
        <Link to="/" className="text-2xl font-bold ml-2">
          <span className="text-black">Task</span>
          <span className="text-[#AC2898]">Trail</span>
        </Link>
      </div>

      {/* Desktop navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:bg-[#FFEDED] rounded-lg px-3 py-2"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/tasks" 
              className="text-gray-700 hover:bg-[#FFEDED] rounded-lg px-3 py-2"
            >
              My Tasks
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:bg-[#FFEDED] rounded-lg px-3 py-2"
              >
                Profile
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Auth buttons */}
      <div className="navbar-end gap-2">
        {isAuthenticated ? (
          <button 
            onClick={onLogout}
            className="btn bg-[#FFEDED] text-[#AC2898] hover:bg-[#f5e0e0] border-none"
          >
            Logout
          </button>
        ) : (
          <Link 
            to="/login" 
            className="btn bg-[#AC2898] text-white hover:bg-[#921f7a] border-none"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header