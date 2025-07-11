import React from 'react'

const Login = () => {
  return (
    <>
        <div className="hero bg-gradient-to-b from-black via-[#AC2898] to-white min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                <h1 className="text-6xl font-bold text-white drop-shadow-lg">Welcome!</h1>
                <div className="text-4xl  py-6 ">
                    <span className="text-white">Task</span>
                    <span className="text-white">Trail</span>
                </div>

                <button className="w-[100px] h-[40px] text-white font-light text-lg cursor-pointer  rounded-lg bg-gradient-to-r from-[#421B41] to-[#AC2898] 
                    hover:bg-gradient-to-r hover:from-[#AC2898] hover:to-[#421B41] transition-all duration-300
                    shadow-lg hover:shadow-[#421B41] transform-scale-105">Login</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login