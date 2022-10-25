const APDevIcon = require('./APDevLogo.png');

// Styles on App.css for Media Query purposes

export const APDevFooter  = () => {
  return (
    <div className="footer">
      <p className="footer-text">Created by: </p>
      <a className="footer-links" href={"http://www.andyprattdev.com"} target="_blank" rel="noreferrer noopener" >
        <img src={APDevIcon} alt="Andy Pratt" className="footer-image"></img>
      </a>
  </div>
  );
}
 