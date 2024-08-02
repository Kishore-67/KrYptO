import React from 'react'
import '../Styles/Home.css'
import Navbar from '../Navbar'
import crypto from '../Resources/crypto.jpg'
import lap from '../Resources/laptop.png'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';

function Home() {
  return (
    <div className='Main1'>
      <Navbar/>

            <div className='ho1'>
            <TypeAnimation
               sequence={[
                'KRYPTO',
                  1000,
                  ':)',1000
                    ]}
                  wrapper="span"
                 speed={10}
                 style={{ fontSize: '24ePX' }}

                  repeat={Infinity}
              />                  </div>
            <div className='ho2'>
                  Key to Test Your Crypto Knowledge !
            </div>
            <div className='quote'>The market is a device for transferring money from the impatient to the patient.</div>
            <div className='Auth'> -Warren Buffett</div>
            <div className='i1'>
                      <img src={lap} className='crypto' alt='crypto'height={450} width={600} />
                  </div>

            <div className='Ca-con'>
        
                 <h1>Welcome to krYpto ultimate Crypto Companion !</h1>   
                  <div className='T1'>
                      $  Dive into the dynamic world of cryptocurrencies with krYpto, your all-in-one platform for market insights, trading simulations, and portfolio management.
                   <div/>   
                      <div className='T1'> 
                      $  Whether you just beginning your crypto journey, krYpto equips you with the tools and knowledge to navigate the digital financial frontier.</div>
                 </div>

                   <Link to={'/Dashboard'} ><div className='but'>
                        Dashboard 
                    </div></Link>

            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
                  <div className='pap-tra'>
                      <div className='pap-1'>Test Your Crypto knowledge here !</div>
                      <div className='pap-2'>Test your trading skills without the risk through our advanced paper trading feature </div>
                      <div className='pap-2'>Simulate real market conditions, execute trades, and test strategies using virtual </div>
                      <div className='pap-2'>Providing detailed order management and trade history.</div>

                  </div>

                  <div style={{marginTop:'60px'}}>
                      {/* <img src={crypto} className='crypto' alt='crypto'height={400} width={600} /> */}
                      <Link to={'/Crypto'} ><div className='but1'>Trade now</div></Link>
                  </div>
            </div>
    
    </div>
  )
}

export default Home