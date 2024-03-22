import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark text-center text-white mt-auto">
            <div className="container p-2">
                <section className="mb-1">
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/AvatarAarav/" role="button"
                    ><i className="fab fa-facebook-f"></i
                    ></a>

                    <a className="btn btn-outline-light btn-floating m-1" href="https://twitter.com/Avatar_Aarav/" role="button"
                    ><i className="fab fa-twitter"></i
                    ></a>

                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/aarav-nigam-09982b222/" role="button"
                    ><i className="fab fa-instagram"></i
                    ></a>


                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/avatar_aarav/" role="button"
                    ><i className="fab fa-linkedin-in"></i
                    ></a>


                    <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/Aarav-Nigam" role="button"
                    ><i className="fab fa-github"></i
                    ></a>
                </section>
                
            </div>

            <div className="bg-secondary text-white text-center py-3">
                © 2023 Copyright:
                <a className="text-white" href="https://portfolio-aarav.netlify.app/">Aarav Nigam</a>
            </div>
        </footer>
    );
}

export default Footer;
