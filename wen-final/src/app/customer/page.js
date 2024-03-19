"use client"
import anime from 'animejs/lib/anime.es.js';
import { RevealWrapper } from 'next-reveal'
import Ban from "./Banner/ban";

let Home = ()=>{
    return(
        <>
        <RevealWrapper rotate={{ x: 22, y: 40, z: 0 }} className="load-hidden" reset={true} interval={5000} >
          <Ban />
        </RevealWrapper>
        </>
    )
}

export default Home;