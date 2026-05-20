import { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapSection.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const cafeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const CAFETERIAS_DEMO = [
  { id: 1, nombre: 'Café Époque', ciudad: 'Cd Madero, Tamaulipas', descripcion: 'Un espacio acogedor dedicado a servir experiencias únicas.', rating: 4.8, horario: '9:00 – 19:00', lat: 22.2726, lng: -97.8359, foto: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120&q=80' },
  { id: 2, nombre: 'Zona Café', ciudad: 'Cd Madero, Tamaulipas', descripcion: 'Relajate con los mejores granos en un ambiente sin igual.', rating: 4.5, horario: '8:00 – 18:00', lat: 22.2698, lng: -97.8330, foto: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=120&q=80' },
  { id: 3, nombre: 'Cafe & Moka', ciudad: 'Cd Madero, Tamaulipas', descripcion: 'Robusta de altura cremada en la crema más fina.', rating: 4.1, horario: '7:00 – 17:00', lat: 22.2748, lng: -97.8380, foto: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&q=80' },
  { id: 4, nombre: 'Madero Cafe', ciudad: 'Cd Madero, Tamaulipas', descripcion: 'Algo ligero, limón al fondo, caramelo claro al tono.', rating: 4.6, horario: '8:30 – 20:00', lat: 22.2710, lng: -97.8345, foto: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=120&q=80' },
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
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState(CAFETERIAS_DEMO)
  const [seleccionado, setSeleccionado] = useState(null)
  const [center, setCenter] = useState([22.2726, -97.8359])
  const [localizando, setLocalizando] = useState(false)
  const [slideActivo, setSlideActivo] = useState(0)
  const markersRef = useRef({})

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
    navigator.geolocation.getCurrentPosition(
      (pos) => { setCenter([pos.coords.latitude, pos.coords.longitude]); setLocalizando(false) },
      () => setLocalizando(false)
    )
  }

  const irACafeteria = (cafe) => {
    setSeleccionado(cafe.id)
    setCenter([cafe.lat, cafe.lng])
    setTimeout(() => { const m = markersRef.current[cafe.id]; if (m) m.openPopup() }, 1300)
  }

  return (
    <section className="ms-section generalPad">
      <div className="ms-titulo Maxwidth">
        <h2>Tu camino al <span className="specialColor">buen cafe</span></h2>
        <div className="ms-underline" />
      </div>

      <div className="ms-body Maxwidth">
        <div className="ms-map-container">

          {/* Barra de búsqueda flotante píldora */}
          <form className="ms-search-bar" onSubmit={buscar}>
            <svg className="ms-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Busca tu cafetería en tu ciudad" className="ms-search-input" />
            <button type="submit" className="ms-search-btn">Buscar</button>
          </form>

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

          <div className="ms-map-btns">
            <button type="button" className="ms-btn-locate" onClick={localizarme} disabled={localizando}>
              {localizando ? 'Buscando…' : 'Localizarme'}
            </button>
            <button type="button" className="ms-btn-secondary">Usar el mapa</button>
          </div>
        </div>

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
                  <button className="ms-btn-mas" onClick={e => { e.stopPropagation(); irACafeteria(cafe) }}>Más</button>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      {/* Mejor Valorados */}
      <div className="ms-mejor Maxwidth">
        <p className="ms-mejor-title">Mejor <span className="specialColor">valorados</span></p>
        <div className="ms-underline" />
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
                    <button className="ms-mv-btn" onClick={e => { e.stopPropagation(); irACafeteria(cafe) }}>Más</button>
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
    </section>
  )
}