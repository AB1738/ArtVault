import { Link } from "react-router-dom"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaVault } from "react-icons/fa6";


const Landing = () => {
  return (
    <div className="landing-page-container">
        <h1>Curated Art, Just for You. Where Every Piece is Masterpiece Ready.</h1>
            <div className="landing-page-main-content-wrapper">
         <h3>From timeless classics to modern pieces, Art Vault offers a diverse collection of art that invites you to see the world through different perspectives. Start your journey today and explore the creativity waiting for you.</h3>
            <DotLottieReact
                src="https://lottie.host/54d5af73-68e8-43f1-9238-54a2907cf5df/vJdZW38gT4.lottie"
                loop
                autoplay
                className="landing-animation"
                speed={3}
            />  
            </div>
            <div className="home-link-container">
                <Link to='/home' className="btn">
                    <div className="link-content">
                        <p>Open the Vault </p>
                        <FaVault className="vault-icon" />
                    </div>
                </Link>
            </div>

    </div>
  )
}

export default Landing