import { useState, useEffect } from 'react'
import MapSection from './components/MapSection'
import logo from './assets/logo1.svg'
import exampleClient from "./assets/lady.svg"
import logo2 from "./assets/puntocafe.svg"
import logo3 from "./assets/Frame.svg"
import ctaHolder from "./assets/mockupe.svg"
import "./components/app.css"
import exampleCell from "./assets/cellphone.svg"

function App() {

  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorsHover, setIndicatorsHover] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0..100 for progress bar
  const AUTOPLAY_MS = 10000; // 10 seconds

  const goTo = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };
  const onIndicatorKey = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
      setProgress(0);
    }
  };

  // helper used by indicator buttons
  const setIndicatorHover = (val) => setIndicatorsHover(val);

  // Autoplay is driven by the CSS animation on the progress fill.
  // We advance on animationend. No interval/timeout needed here.

  useEffect(() => {
    // Respect user's reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const selectors = ['.ListBenefit', '.Cards', '.ctaHolder', '.otrasformas', '.contact-Us', ".SectionsTitle", ".Us"];
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // one-time reveal
        }
      });
    }, { threshold: 0.12 });

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => observer.observe(el));
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="Head">
        <div className="overlay"></div>
        <section className="Header">
          <section className='InerHead Maxwidth'>
            <img id='Logo1' src={logo} alt="Logo puntocafe" />
            <nav>
              <a href="#">Inicio</a>
              <a href="#">Servicios</a>
              <a href="#">Nosotros</a>
              <a href="#">Contacto</a>
            </nav>
          </section>
        </section>

        <div className="carousel-progress" aria-hidden="true">
          <div
            key={activeIndex}
            className={`carousel-progress__fill ${isPaused ? 'paused' : ''}`}
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
            onAnimationEnd={() => { if (!isPaused) setActiveIndex(curr => (curr + 1) % 3); }}
          />
        </div>

        <div
          className="hero-carousel"
          onPointerDown={() => setIsPaused(true)}
          onPointerUp={() => setIsPaused(false)}
          onPointerLeave={() => setIsPaused(false)}
          onPointerCancel={() => setIsPaused(false)}
        >
          <div className="slides">
            <div id='slide1' className={`slide ${activeIndex === 0 ? 'active' : ''}`} data-index="0" role="group" aria-roledescription="slide" aria-hidden={activeIndex !== 0} style={{ display: activeIndex === 0 ? 'flex' : 'none' }}>
              <section className='BodyHead Maxwidth'>
                <div className='BodyHeadText'>
                  <p className='heroWord'>Un <span className='specialColor'>mapa</span> al <span className='specialColor'>cafe</span> perfecto,
                    a un <span className='specialColor'>click</span> de <span className='specialColor'>distancia</span></p>
                  <div className='Buttons'>
                    <button>Buscar Cafeterias</button>
                    <button className='NoBG'>Tengo una cafeteria</button>
                  </div>
                </div>
                <img src={exampleClient} alt="Graphic example" className='exampleClient' />
              </section>
            </div>

            <div id='slide2' className={`slide ${activeIndex === 1 ? 'active' : ''}`} data-index="1" aria-hidden={activeIndex !== 1} style={{ display: activeIndex === 1 ? 'flex' : 'none' }}>
              <section className='BodyHeadCol Maxwidth'>
                <p className='heroWord'>El <span className='specialColor'>cafe</span> es mucho mas que una <span className='specialColor'>bebida</span></p>
                <div className='Squares'>
                  <div className='aspect-square'>
                    <div className='icon-holder'>
                      <p>2,500M</p>
                      <svg className='icon-quriositi' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>earth</title><path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
                    </div>
                    <p>Tazas de café se consumen cada día en todo el mundo. </p>
                    <p className='textfooter'>Consumo Global</p>
                  </div>
                  <div className='aspect-square'>
                    <div className='icon-holder'>
                      <p>20 min</p>
                      <svg className='icon-quriositi' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lightning-bolt</title><path d="M11 15H6L13 1V9H18L11 23V15Z" /></svg>
                    </div>
                    <p>Es el tiempo que tarda la cafeína en hacer efecto y activarte.</p>
                    <p className='textfooter'>Ciencia del cafe</p>
                  </div>
                  <div className='aspect-square'>
                    <div className='icon-holder'>
                      <p>+800</p>
                      <svg className='icon-quriositi' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>scent</title><path d="M17.5 5.1C18.5 6.4 19 7.6 19 9C19 10.7 18.3 12.3 16.6 14.1C14.7 16.1 13 18.3 13 20.5C13 20.9 13.1 21.3 13.2 21.8C13.2 21.9 13.2 22 13.1 22.1C13 22.2 12.9 22.1 12.9 22C11.9 20.7 11.4 19.5 11.4 18.1C11.4 16.4 12.1 14.8 13.8 13C15.7 11 17.4 8.8 17.4 6.6C17.4 6.2 17.3 5.8 17.2 5.3C17.2 5.2 17.2 5.1 17.3 5C17.4 5 17.4 5 17.5 5.1M9.7 2.1C10.4 3 10.7 4 10.7 4.9C10.7 6.2 10.1 7.4 8.9 8.7C7.5 10.2 6.2 11.9 6.2 13.5C6.2 13.8 6.3 14.2 6.4 14.4C6.4 14.5 6.4 14.5 6.3 14.6C6.2 14.7 6.1 14.6 6.1 14.6C5.3 13.6 5 12.6 5 11.7C5 10.4 5.6 9.2 6.8 7.9C8.2 6.4 9.5 4.7 9.5 3.1C9.5 2.8 9.4 2.4 9.3 2.2V2C9.5 2 9.6 2 9.7 2.1M10.1 9.9C12 7.9 13.7 5.7 13.7 3.5C13.7 3.1 13.6 2.7 13.5 2.2C13.5 2.1 13.5 2 13.6 1.9C13.7 1.8 13.8 1.9 13.8 2C14.8 3.3 15.3 4.5 15.3 5.9C15.3 7.6 14.6 9.2 12.9 11C11 13 9.3 15.2 9.3 17.4C9.3 17.8 9.4 18.2 9.5 18.7C9.5 18.8 9.5 18.9 9.4 19C9.3 19.1 9.2 19 9.2 18.9C8.2 17.6 7.7 16.4 7.7 15C7.7 13.3 8.4 11.7 10.1 9.9Z" /></svg>
                    </div>
                    <p>El café tiene más compuestos aromáticos que el vino.</p>
                    <p className='textfooter'>Sabores únicos</p>
                  </div>
                  <div className='aspect-square'>
                    <div className='icon-holder'>
                      <p>#5</p>
                      <svg className='icon-quriositi' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>sprout</title><path d="M2,22V20C2,20 7,18 12,18C17,18 22,20 22,20V22H2M11.3,9.1C10.1,5.2 4,6.1 4,6.1C4,6.1 4.2,13.9 9.9,12.7C9.5,9.8 8,9 8,9C10.8,9 11,12.4 11,12.4V17C11.3,17 11.7,17 12,17C12.3,17 12.7,17 13,17V12.8C13,12.8 13,8.9 16,7.9C16,7.9 14,10.9 14,12.9C21,13.6 21,4 21,4C21,4 12.1,3 11.3,9.1Z" /></svg>
                    </div>
                    <p>México es top 5 en café de alta calidad.</p>
                    <p className='textfooter'>Orgullo Nacional</p>
                  </div>
                </div>
              </section>
            </div>
            <div id='slide3' className={`slide ${activeIndex === 2 ? 'active' : ''}`} data-index="2" aria-hidden={activeIndex !== 2} style={{ display: activeIndex === 2 ? 'flex' : 'none' }}>
              <div className='BodyHead Maxwidth'>
                <div className='BodyHeadText'>
                  <p className='heroWord'>LLeva punto<span className='specialColor'>cafe</span> en tu <span className='specialColor'>bolsillo</span></p>
                  <img src={ctaHolder} alt="Buton mockup" id='button-mockup' />
                </div>
                <div>
                  <img src={exampleCell} className='exampleClient' alt="Celular Mock up" />
                </div>
              </div>
            </div>
          </div>
          <div className={`carousel-indicators ${indicatorsHover ? 'indicators-hover' : ''}`}>
            <button
              type="button"
              data-index="0"
              aria-label="Slide 1"
              className={activeIndex === 0 ? 'active' : ''}
              onClick={() => goTo(0)}
              onKeyDown={(e) => onIndicatorKey(e, 0)}
              onMouseEnter={() => setIndicatorHover(true)}
              onMouseLeave={() => setIndicatorHover(false)}
            />
            <button
              type="button"
              data-index="1"
              aria-label="Slide 2"
              className={activeIndex === 1 ? 'active' : ''}
              onClick={() => goTo(1)}
              onKeyDown={(e) => onIndicatorKey(e, 1)}
              onMouseEnter={() => setIndicatorHover(true)}
              onMouseLeave={() => setIndicatorHover(false)}
            />
            <button
              type="button"
              data-index="2"
              aria-label="Slide 3"
              className={activeIndex === 2 ? 'active' : ''}
              onClick={() => goTo(2)}
              onKeyDown={(e) => onIndicatorKey(e, 2)}
              onMouseEnter={() => setIndicatorHover(true)}
              onMouseLeave={() => setIndicatorHover(false)}
            />
          </div>
        </div>
      </header>
      <section className='Benefits reveal'>
        <div className='ListBenefit Maxwidth'>
          <div className='Benefit'>
            <p className='Tittle-benefit'>Encuentra fácil</p>
            <svg className="icon-benefit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>magnify</title><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
            <p className='Text-benefit'>Encuentra tu cafetería ideal en segundos</p>
          </div>
          <div className='Benefit'>
            <p className='Tittle-benefit'>Apoyo Local</p>
            <svg className="icon-benefit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>handshake</title><path d="M11 6H14L17.29 2.7A1 1 0 0 1 18.71 2.7L21.29 5.29A1 1 0 0 1 21.29 6.7L19 9H11V11A1 1 0 0 1 10 12A1 1 0 0 1 9 11V8A2 2 0 0 1 11 6M5 11V15L2.71 17.29A1 1 0 0 0 2.71 18.7L5.29 21.29A1 1 0 0 0 6.71 21.29L11 17H15A1 1 0 0 0 16 16V15H17A1 1 0 0 0 18 14V13H19A1 1 0 0 0 20 12V11H13V12A2 2 0 0 1 11 14H9A2 2 0 0 1 7 12V9Z" /></svg>
            <p className='Text-benefit'>Apoya negocios locales y conecta con tu comunidad</p>
          </div>
          <div className='Benefit'>
            <p className='Tittle-benefit'>El café ideal</p>
            <svg className="icon-benefit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>coffee</title><path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" /></svg>
            <p className='Text-benefit'>Vive la experiencia cafetera a tu alcance</p>
          </div>
        </div>
      </section>
      <MapSection />
      <section className='About-Us generalPad reveal'>
        <div className='Us Maxwidth'>
          <img id='Logo2' src={logo2} alt="Logo" />
          <p id='textSlogan'>Somos un grupo impulsado para ayudar a las personas a encontrar su cafeteria ideal
            para la situacion.</p>
        </div>
        <div className='Cards Maxwidth'>
          <div className='LargeCard'>
            <p id='nosotrosTitle'>Nuestra Historia: <span className='specialColor'>El origen de puntocafe</span></p>
            <p id='nosotrosText'>Puntocafe nacio con el firme proposito de ayudarte a encontrar el
              lugar ideal para cada momento especial, impulsando la cultura del cafe de especialidad en cada rincon.
              Nuestra pasion por conectar personas con experiencias autenticas es lo que nos mueve cada dia</p>
            <img id='Logo3' src={logo3} alt="Logo3" />
          </div>
          <div className='Card'>
            <div className='Title'>
              <p>Nuestra <span className='specialColor'>Misión</span></p>
            </div>
            <div className='Text'>
              <p className='textSize'>Ayudar a cada persona a encontrar la cafetería ideal para cada momento, conectando con negocios locales.</p>
            </div>
          </div>
          <div className='Card'>
            <div className='Title'>
              <p>Nuestra <span className='specialColor'>Visión</span></p>
            </div>
            <div className='Text'>
              <p className='textSize'>Ser la guía digital de referencia para descubrir cafeterías y apoyar al comercio local.</p>
            </div>
          </div>
        </div>
        <div className='ctaHolder Maxwidth'>
          <p id='ctaTitle'>Unete a nuestra pagina</p>
          <p id='ctaText'>¿Conoces una cafetería increíble que no está en el mapa? Buscamos colaboradores que compartan nuestra pasión por el
            buen café y quieran ayudarnos a crecer.</p>
          <button>Contactanos</button>
        </div>
      </section>
      <section className='contactanos generalPad reveal'>
        <div className='contact-Us Maxwidth'>
          <div className='SectionsTitle'>
            <div className='ms-titulo'>
              <h2>¿Tienes alguna pregunta? <span className='specialColor'>¡Contactanos!</span></h2>
              <div className='ms-underline' />
            </div>
          </div>
          <div className='forms-contact'>
            <form className='contactanosContent'>
              <legend className='factoria'>Envíanos un mensaje</legend>
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo:</label>
                <input type="text" id="nombre" name="nombre" placeholder="Ej: Juan Pérez" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">e-mail:</label>
                <input type="email" id="email" name="email" placeholder="correo@ejemplo.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="mensaje">Mensaje:</label>
                <textarea id="mensaje" name="mensaje" placeholder="Escribe tu mensaje aquí..." required></textarea>
              </div>
              <div className="form-select">
                <p>¿Tienes una cafeteria?</p>
                <div className="radio-options">
                  <input type="radio" id="si" name="mayor_edad" value="si" required />
                  <label htmlFor="si">Sí</label>
                  <input type="radio" id="no" name="mayor_edad" value="no" />
                  <label htmlFor="no">No</label>
                </div>
              </div>
              <button>Enviar</button>
            </form>

            <div className='otrasformas'>
              <p className='otras-title'>Otras formas de contactarnos:</p>
              <div className='otras-content'>
                <div className='contact-row'>
                  <div className='icon-circle'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>gmail</title><path d="M20,18H18V9.25L12,13L6,9.25V18H4V6H5.2L12,10.25L18.8,6H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>
                  </div>
                  <div className='contact-sub contact-email'><a href='mailto:puntocafe@gmail.com'>puntocafe@gmail.com</a></div>
                </div>

                <div className='contact-row'>
                  <div className='icon-circle'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>whatsapp</title><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" /></svg>
                  </div>
                  <div className='contact-sub'>833 2XX XX78</div>
                </div>

                <div className='contact-row'>
                  <div className='icon-circle'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>facebook</title><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>
                  </div>
                  <div className='contact-sub'><a href='https://facebook.com/puntocafe' target='_blank' rel='noreferrer'>puntocafe</a></div>
                </div>

                <div className='contact-row'>
                  <div className='icon-circle'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>instagram</title><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>
                  </div>
                  <div className='contact-sub'><a href='https://instagram.com/puntocafe' target='_blank' rel='noreferrer'>@puntocafe</a></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className='footerCont Maxwidth'>
          <div className='logo-container'>
            <img id='Logo4' src={logo} alt="logo" />
            <img id='mockup' src={ctaHolder} alt="" />
          </div>
          <div className='Navegar'>
            <p className='Navegar-title'>Navegar</p>
            <p className='textfooter'>Inicio</p>
            <p className='textfooter'>Servicios</p>
            <p className='textfooter'>Contacto</p>
          </div>
          <div className='Navegar'>
            <p className='Navegar-title'>Aviso Legal</p>
            <p className='textfooter'>Politica de Privacidad</p>
            <p className='textfooter'>Termino y condiciones</p>
            <p className='textfooter'>FAQ</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
