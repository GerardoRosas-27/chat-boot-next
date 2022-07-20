
import React from 'react'
import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/"><a>Inicio</a></Link> </li>
                <li><Link href="/qr"><a>Escanear QR</a></Link> </li>
                <li><Link href="/product"><a>Lista De Productos</a></Link> </li>
            </ul>
        </nav>
    )
}
