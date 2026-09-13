
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  function handleAnchorClick(event, sectionId) {
    event.preventDefault();

    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
    }
  }

  return (
    <header>
      <Link to="/">Ali Armani</Link>

      <nav>
        <a href="#about" onClick={(e) => handleAnchorClick(e, 'about')}>About</a>
        <a href="#projects" onClick={(e) => handleAnchorClick(e, 'projects')}>Projects</a>
        <a href="#certificates" onClick={(e) => handleAnchorClick(e, 'certificates')}>Skills</a>
        <Link to="/blog">Blog</Link>
        <a href="#resume" onClick={(e) => handleAnchorClick(e, 'resume')}>Resume</a>
        <a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>Contact</a>
      </nav>
    </header>
  );
}

export default Header;