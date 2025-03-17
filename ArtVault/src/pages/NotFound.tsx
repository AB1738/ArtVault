import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="not-found-page-container">
            <DotLottieReact
                src="https://lottie.host/ec219bbe-7a56-455a-9320-6dd902acc705/Hv9GWT2L4s.lottie"
                loop
                autoplay
                className="landing-animation"
                speed={3}
            />  
            <h4>It appears the page you’re searching for hasn’t been painted yet. Click below to explore what’s inside our vault</h4>
            <Link to='/home' className="btn">View the Vault</Link>

    </div>
  )
}

export default NotFound