import React from 'react'
import { useConfig } from '@/context/ConfigProviderClient'

const Header = () => {


    return (
        <header>
            <nav className='flex justify-between p-4 items-center bg-amber-300'>
                <a class="logo" href="#"><img src="logo.png" alt="Logo"/></a>
                <ul className='flex space-x-14'>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li>
                        <details>
                            <summary>More</summary>
                            <ul>
                                <li><a href="#about">About</a></li>
                                <li><a href="#team">Team</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
                <form>
                    <input type="search" placeholder="Search..."/>
                        <button>Go</button>
                </form>
            </nav>
        </header>
    )
}

export default Header