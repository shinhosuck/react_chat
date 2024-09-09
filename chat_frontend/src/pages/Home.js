import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="home-container">
            <div className="hero-text-container">
                <h1 className="hero-header">Welcome to DjangoChat</h1>
                <p className="hero-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum molestiae alias, vel beatae porro sapiente
                    veniam. Modi nam in, tenetur necessitatibus ex obcaecati rem
                    voluptatum ad pariatur placeat vitae neque?
                </p>
                <Link to="sign-up" className="home-sign-up-btn">Sign up for DjagnoChat</Link>
            </div>
       
        </div>
    );
}

export default Home;
