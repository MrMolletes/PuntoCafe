import { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapSection.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const cafeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:   [25, 41],
  iconAnchor: [12, 41],
  popupAnchor:[1, -34],
  shadowSize: [41, 41],
})

const CAFETERIAS_DEMO = [
  {
    id: 1, nombre: 'Café Époque', ciudad: 'Cd Madero, Tamaulipas',
    descripcion: 'Un espacio acogedor dedicado a servir experiencias únicas.',
    rating: 4.8, horario: '9:00 – 19:00', lat: 22.3980, lng: -97.9270,
    foto: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    direccion: 'Av. Hidalgo 120, Centro, Cd Madero',
    telefono: '833 2XX XX78',
    whatsapp: '833 2XX XX78',
    reservaciones: true,
    reservacionesUrl: null,
    menu: [
      { categoria: 'Bebidas Calientes', nombre: 'Cappuccino', descripcion: 'Espresso con leche vaporizada y espuma', precio: 55 },
      { categoria: 'Bebidas Calientes', nombre: 'Americano', descripcion: 'Espresso doble con agua caliente', precio: 45 },
      { categoria: 'Bebidas Frías',     nombre: 'Frappé de caramelo', descripcion: 'Café frío con caramelo y crema batida', precio: 70 },
      { categoria: 'Comida',            nombre: 'Croissant de mantequilla', descripcion: 'Recién horneado, crujiente por fuera', precio: 40 },
      { categoria: 'Postres',           nombre: 'Pay de queso', descripcion: 'Con base de galleta y mermelada de fresa', precio: 55 },
    ]
  },
  {
    id: 2, nombre: 'Zona Café', ciudad: 'Cd Madero, Tamaulipas',
    descripcion: 'Relajate con los mejores granos en un ambiente sin igual.',
    rating: 4.5, horario: '8:00 – 18:00', lat: 22.3050, lng: -97.8690,
    foto: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80',
    direccion: 'Calle Juárez 45, Col. Centro, Cd Madero',
    telefono: '833 2XX XX78',
    whatsapp: null,
    reservaciones: false,
    reservacionesUrl: null,
    menu: [
      { categoria: 'Bebidas Calientes', nombre: 'Latte', descripcion: 'Espresso suave con leche cremosa', precio: 58 },
      { categoria: 'Bebidas Frías',     nombre: 'Cold Brew', descripcion: 'Café extraído en frío por 12 horas', precio: 65 },
      { categoria: 'Comida',            nombre: 'Sandwich de pavo', descripcion: 'Pan artesanal, pavo, lechuga y mostaza', precio: 75 },
      { categoria: 'Postres',           nombre: 'Brownie', descripcion: 'Chocolate oscuro con nuez', precio: 45 },
    ]
  },
  {
    id: 3, nombre: 'Cafe & Moka', ciudad: 'Cd Madero, Tamaulipas',
    descripcion: 'Robusta de altura cremada en la crema más fina.',
    rating: 4.1, horario: '7:00 – 17:00', lat: 22.2550, lng: -97.8680,
    foto: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    direccion: 'Blvd. Morelos 890, Cd Madero',
    telefono: null,
    whatsapp: '833 2XX XX78',
    reservaciones: false,
    reservacionesUrl: null,
    menu: [
      { categoria: 'Bebidas Calientes', nombre: 'Moka', descripcion: 'Espresso con chocolate y leche', precio: 62 },
      { categoria: 'Bebidas Calientes', nombre: 'Macchiato', descripcion: 'Espresso con toque de leche espumada', precio: 50 },
      { categoria: 'Comida',            nombre: 'Bagel con cream cheese', descripcion: 'Tostado con queso crema y cebollín', precio: 55 },
    ]
  },
  {
    id: 4, nombre: 'Madero Cafe', ciudad: 'Cd Madero, Tamaulipas',
    descripcion: 'Algo ligero, limón al fondo, caramelo claro al tono.',
    rating: 4.6, horario: '8:30 – 20:00', lat: 22.2720, lng: -97.8340,
    foto: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=400&q=80',
    direccion: 'Av. Tamaulipas 234, Cd Madero',
    telefono: '833 2XX XX78',
    whatsapp: null,
    reservaciones: true,
    reservacionesUrl: 'https://maderocafe.com/reservar',
    menu: [
      { categoria: 'Bebidas Calientes', nombre: 'Café de olla', descripcion: 'Canela y piloncillo, receta tradicional', precio: 35 },
      { categoria: 'Bebidas Frías',     nombre: 'Limonada con café', descripcion: 'Café frío con limón fresco y menta', precio: 60 },
      { categoria: 'Comida',            nombre: 'Molletes', descripcion: 'Pan bolillo con frijoles y queso gratinado', precio: 65 },
      { categoria: 'Postres',           nombre: 'Pastel de zanahoria', descripcion: 'Con betún de queso crema', precio: 50 },
    ]
  },
]

function FlyTo({ center }) {
  const map = useMap()
  const prev = useRef(center)
  if (prev.current !== center) { prev.current = center; map.flyTo(center, 15, { duration: 1.2 }) }
  return null
}

function Stars({ rating }) {
  return <span className="ms-stars">{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
}

export default function MapSection() {
  const [query, setQuery]                   = useState('')
  const [resultados, setResultados]         = useState(CAFETERIAS_DEMO)
  const [seleccionado, setSeleccionado]     = useState(null)
  const [center, setCenter]                 = useState([22.3113, -97.8609])
  const [localizando, setLocalizando]       = useState(false)
  const [modalUbicacion, setModalUbicacion] = useState(true)
  const [permisoDenegado, setPermisoDenegado] = useState(false)
  const [slideActivo, setSlideActivo]       = useState(0)
  const [cafeModal, setCafeModal]           = useState(null)
  const [tabActivo, setTabActivo]           = useState('menu')
  const markersRef                          = useRef({})

  const MEJORES = [...CAFETERIAS_DEMO].sort((a, b) => b.rating - a.rating)

  const buscar = (e) => {
    e.preventDefault()
    const q = query.trim().toLowerCase()
    if (!q) { setResultados(CAFETERIAS_DEMO); return }
    setResultados(CAFETERIAS_DEMO.filter(c => c.nombre.toLowerCase().includes(q) || c.descripcion.toLowerCase().includes(q)))
  }

  const localizarme = () => {
    if (!navigator.geolocation) return
    setLocalizando(true)
    setModalUbicacion(false)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude])
        setLocalizando(false)
        setModalUbicacion(false)
      },
      (err) => {
        setLocalizando(false)
        if (err.code === 1) {
          setPermisoDenegado(true)
          setModalUbicacion(true)
        }
      },
      { timeout: 8000, enableHighAccuracy: true }
    )
  }

  const irACafeteria = (cafe) => {
    setSeleccionado(cafe.id)
    setCenter([cafe.lat, cafe.lng])
    setTimeout(() => { const m = markersRef.current[cafe.id]; if (m) m.openPopup() }, 1300)
  }

  const abrirModal = (cafe, e) => {
    e.stopPropagation()
    setCafeModal(cafe)
    setTabActivo('menu')
  }

  // Agrupar menú por categoría
  const agruparMenu = (menu) => {
    return menu.reduce((acc, item) => {
      if (!acc[item.categoria]) acc[item.categoria] = []
      acc[item.categoria].push(item)
      return acc
    }, {})
  }

  return (
    <section className="ms-section generalPad">

      {/* Título */}
      <div className="ms-titulo Maxwidth">
        <h2>Tu camino al <span className="specialColor">buen cafe</span></h2>
        <div className="ms-underline-brown" />
      </div>

      {/* Cuerpo: mapa + sidebar */}
      <div className="ms-body Maxwidth">

        {/* Mapa */}
        <div className="ms-map-container">

          {/* Barra de búsqueda flotante */}
          <form className="ms-search-bar" onSubmit={buscar}>
            <svg className="ms-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
            </svg>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Busca tu cafetería en tu ciudad" className="ms-search-input" />
            <button type="submit" className="ms-search-btn">Buscar</button>
          </form>

          {/* Leaflet */}
          <MapContainer center={center} zoom={15} className="ms-leaflet-map" zoomControl={true} scrollWheelZoom={true}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FlyTo center={center} />
            {resultados.map(cafe => (
              <Marker key={cafe.id} position={[cafe.lat, cafe.lng]} icon={cafeIcon} ref={el => { if (el) markersRef.current[cafe.id] = el }}>
                <Popup>
                  <div className="ms-popup">
                    <strong>{cafe.nombre}</strong>
                    <p>{cafe.descripcion}</p>
                    <span>⭐ {cafe.rating} · {cafe.horario}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Modal al rechazar ubicación */}
          {modalUbicacion && (
            <div className="ms-modal-overlay">
              <div className="ms-modal">
                <p className="ms-modal-titulo">¿Dónde estás tú?</p>
                <p className="ms-modal-texto">
                  {permisoDenegado
                    ? 'Bloqueaste el acceso a tu ubicación. Actívala desde los permisos del navegador e intenta de nuevo.'
                    : 'Activa tu ubicación para ver las cafeterías más cercanas al instante. Sin datos guardados, sin sorpresas.'
                  }
                </p>
                <div className="ms-modal-btns">
                  {!permisoDenegado && (
                    <button className="ms-modal-btn-primary" onClick={localizarme}>Localizame</button>
                  )}
                  <button className="ms-modal-btn-secondary" onClick={() => setModalUbicacion(false)}>Usar el mapa</button>
                </div>
              </div>
            </div>
          )}

        </div>{/* fin ms-map-container */}

        {/* Sidebar */}
        <aside className="ms-sidebar">
          <div className="ms-sidebar-header">
            <p className="ms-sidebar-title">Locales Cerca</p>
            <p className="ms-sidebar-count">{resultados.length} Resultados Obtenidos</p>
          </div>
          <div className="ms-lista">
            {resultados.length === 0 ? (
              <p className="ms-empty">No se encontraron cafeterías con ese nombre.</p>
            ) : (
              resultados.map(cafe => (
                <div key={cafe.id} className={`ms-card ${seleccionado === cafe.id ? 'ms-card--active' : ''}`} onClick={() => irACafeteria(cafe)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && irACafeteria(cafe)}>
                  <img src={cafe.foto} alt={cafe.nombre} className="ms-card-img" />
                  <div className="ms-card-info">
                    <p className="ms-card-nombre">{cafe.nombre}</p>
                    <p className="ms-card-desc">{cafe.descripcion}</p>
                    <div className="ms-card-meta">
                      <Stars rating={cafe.rating} />
                      <span className="ms-card-rating">{cafe.rating}</span>
                      <span className="ms-card-horario">{cafe.horario}</span>
                    </div>
                  </div>
                  <button className="ms-btn-mas" onClick={e => abrirModal(cafe, e)}>Más</button>
                </div>
              ))
            )}
          </div>
        </aside>

      </div>{/* fin ms-body */}

      {/* Mejor Valorados */}
      <div className="ms-mejor Maxwidth">
        <p className="ms-mejor-title">Mejor <span className="specialColor">valorados</span></p>
        <div className="ms-underline-brown" />
        <div className="ms-carrusel">
          <div className="ms-carrusel-track" style={{ transform: `translateX(calc(-${slideActivo} * (100% / 2 + 0.6rem)))` }}>
            {MEJORES.map(cafe => (
              <div key={cafe.id} className="ms-mv-card" onClick={() => irACafeteria(cafe)}>
                <img src={cafe.foto} alt={cafe.nombre} className="ms-mv-bg" />
                <div className="ms-mv-overlay" />
                <div className="ms-mv-content">
                  <p className="ms-mv-nombre">{cafe.nombre}</p>
                  <p className="ms-mv-ciudad">{cafe.ciudad}</p>
                  <p className="ms-mv-desc">{cafe.descripcion}</p>
                  <div className="ms-mv-footer">
                    <div className="ms-mv-rating"><Stars rating={cafe.rating} /><span>{cafe.rating}</span></div>
                    <button className="ms-mv-btn" onClick={e => abrirModal(cafe, e)}>Más</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ms-dots">
          {MEJORES.map((_, i) => (
            <button key={i} className={`ms-dot ${slideActivo === i ? 'ms-dot--active' : ''}`} onClick={() => setSlideActivo(i)} aria-label={`Ir a slide ${i + 1}`} />
          ))}
        </div>
      </div>

      {/* Modal detalle cafetería */}
      {cafeModal && (
        <div className="ms-detail-overlay" onClick={() => setCafeModal(null)}>
          <div className="ms-detail-modal" onClick={e => e.stopPropagation()}>

            {/* Foto header */}
            <div className="ms-detail-hero">
              <img src={cafeModal.foto} alt={cafeModal.nombre} />
              <div className="ms-detail-hero-overlay" />
              <button className="ms-detail-close" onClick={() => setCafeModal(null)}>✕</button>
              <div className="ms-detail-hero-info">
                <p className="ms-detail-nombre">{cafeModal.nombre}</p>
                <p className="ms-detail-ciudad">{cafeModal.ciudad}</p>
                <div className="ms-detail-rating">
                  <Stars rating={cafeModal.rating} />
                  <span>{cafeModal.rating}</span>
                  <span className="ms-detail-horario">· {cafeModal.horario}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="ms-detail-tabs">
              <button className={`ms-detail-tab ${tabActivo === 'menu' ? 'ms-detail-tab--active' : ''}`} onClick={() => setTabActivo('menu')}>Menú</button>
              <button className={`ms-detail-tab ${tabActivo === 'info' ? 'ms-detail-tab--active' : ''}`} onClick={() => setTabActivo('info')}>Info</button>
            </div>

            {/* Contenido */}
            <div className="ms-detail-body">

              {/* Tab Menú */}
              {tabActivo === 'menu' && (
                <div className="ms-detail-menu">
                  {Object.entries(agruparMenu(cafeModal.menu)).map(([cat, items]) => (
                    <div key={cat} className="ms-menu-categoria">
                      <p className="ms-menu-cat-titulo">{cat}</p>
                      {items.map((item, i) => (
                        <div key={i} className="ms-menu-item">
                          <div className="ms-menu-item-info">
                            <p className="ms-menu-item-nombre">{item.nombre}</p>
                            <p className="ms-menu-item-desc">{item.descripcion}</p>
                          </div>
                          <span className="ms-menu-item-precio">${item.precio}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab Info */}
              {tabActivo === 'info' && (
                <div className="ms-detail-info">
                  {cafeModal.direccion && (
                    <div className="ms-info-row">
                      <span className="ms-info-icon">📍</span>
                      <span>{cafeModal.direccion}</span>
                    </div>
                  )}
                  {cafeModal.horario && (
                    <div className="ms-info-row">
                      <span className="ms-info-icon">🕐</span>
                      <span>{cafeModal.horario}</span>
                    </div>
                  )}
                  {cafeModal.telefono && (
                    <div className="ms-info-row">
                      <span className="ms-info-icon">📞</span>
                      <a href={`tel:${cafeModal.telefono}`}>{cafeModal.telefono}</a>
                    </div>
                  )}
                  {cafeModal.whatsapp && (
                    <div className="ms-info-row">
                      <span className="ms-info-icon">💬</span>
                      <a href={`https://wa.me/52${cafeModal.whatsapp}`} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
                    </div>
                  )}
                  {cafeModal.reservaciones && (
                    <div className="ms-info-reserva">
                      <p className="ms-info-reserva-txt">Este lugar acepta reservaciones</p>
                      {cafeModal.reservacionesUrl ? (
                        <a href={cafeModal.reservacionesUrl} target="_blank" rel="noreferrer" className="ms-info-reserva-btn">Reservar en línea</a>
                      ) : (
                        <a href={`tel:${cafeModal.telefono || cafeModal.whatsapp}`} className="ms-info-reserva-btn">Llamar para reservar</a>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </section>
  )
}