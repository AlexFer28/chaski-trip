
export type TypePlace = 'park' | 'beach' | 'mountain' | 'city' | 'country' | 'other';

export const lugares = [
    {
        id: 1,
        description: 'Arequipa',
        img: '/places/1.webp',
        stars: 5,
        visits: 76,
        type: 'park' as TypePlace,
        price: 'S/1,200',
        position: [-16.4090, -71.5375],
        distance: 0,
    },
    {
        id: 2,
        description: 'Puno',
        img: '/places/2.webp',
        stars: 12,
        visits: 76,
        type: 'park' as TypePlace,
        price: 'S/1,200',
        position: [-15.8402, -70.0219],
        distance: 0,
    },
    {
        id: 3,
        description: 'Cajamarca',
        img: '/places/3.webp',
        stars: 12,
        visits: 76,
        type: 'park' as TypePlace,
        price: 'S/1,200',
        position: [-7.1630, -78.5003],
        distance: 0,
    },
    {
        id: 4,
        description: 'Amazonas',
        img: '/places/4.webp',
        stars: 0,
        visits: 76,
        type: 'park' as TypePlace,
        price: 'S/1,200',
        position: [-5.1197, -78.3525],
        distance: 0,
    },
    {
        id: 5,
        description: 'San Martin',
        img: '/places/5.webp',
        stars: 4.5,
        visits: 76,
        type: 'mountain' as TypePlace,
        price: 'S/1,200',
        position: [-6.4874, -76.4406],
        distance: 0,
    },
    {
        id: 6,
        description: 'Lambayeque',
        img: '/places/6.webp',
        stars: 4.5,
        visits: 76,
        type: 'beach' as TypePlace,
        price: 'S/1,200',
        position: [-6.7011, -79.9076],
        distance: 0,
    },
];

export const rutas = [
    {
        id: 1,
        name: 'Asociación de Turismo Vivencial Grupo Pumachiri',
        logo: null,
        stars: 4.5,
        visits: 76,
        places: [1],
        description: `<div>
  <h2>Asociación de Turismo Vivencial Grupo Pumachiri</h2>
  <p>
    La Asociación de Turismo Vivencial Grupo Pumachiri es una organización dedicada a ofrecer experiencias de turismo vivencial en el pintoresco pueblo de Coporaque, ubicado en el Valle del Colca, provincia de Caylloma, región Arequipa. Fundada el 1 de septiembre de 2009, la asociación ha trabajado desde 2008 en brindar a los visitantes una estadía auténtica y enriquecedora, gracias al apoyo de las ONGs "Cooperation Saint Erblon/Villages des Andes" y "Pachamama Chukinkuna".
  </p>
  <p><strong>Desde:</strong> S/ 331.65 por adulto</p>
  
  <h3>Detalles</h3>
  <ul>
    <li><strong>Edades:</strong> de 15 a 60, máx. de 15 por grupo</li>
    <li><strong>Horario de inicio:</strong> consultar disponibilidad</li>
    <li><strong>Entrada para dispositivos móviles</strong></li>
    <li><strong>Guía en vivo:</strong> Español, Inglés, Quechua</li>
  </ul>

  <h3>Servicios Ofrecidos</h3>
  
  <h4>Alojamiento en Casas Vivenciales</h4>
  <p>
    Los visitantes pueden hospedarse en hogares locales, compartiendo la vida cotidiana de las familias y participando en actividades tradicionales. Algunas de las casas disponibles son:
  </p>
  <ul>
    <li>Colca Casa Las Flores</li>
    <li>Cháta Kero</li>
    <li>Mamatankara Wasi</li>
    <li>Camila Wasi</li>
  </ul>

  <h4>Actividades Turísticas</h4>
  <ul>
    <li>Participación en faenas agrícolas y ganaderas.</li>
    <li>Trekking a las ruinas arqueológicas de San Antonio.</li>
    <li>Visita a las tumbas preincas de Yura Ccaca.</li>
    <li>Exposiciones participativas de tejidos ancestrales.</li>
    <li>Relajación en las aguas termomedicinales de Sallihua.</li>
  </ul>

  <h4>Programas Turísticos</h4>
  <ul>
    <li><strong>Tour de 2 días / 1 noche:</strong> Incluye visitas a la Cruz del Cóndor y actividades en Coporaque.</li>
    <li><strong>Tour de 3 días / 2 noches:</strong> Ofrece una exploración más profunda de la cultura y naturaleza locales.</li>
  </ul>

  <h3>Contacto</h3>
  <ul>
    <li><strong>Teléfono:</strong> +51 963 690 249</li>
    <li><strong>Correo Electrónico:</strong> pumachiricoporaque2011@hotmail.com</li>
    <li><strong>Presidente:</strong> Dionicio Juan Mamani Cutipa</li>
  </ul>

  <p>
    La Asociación de Turismo Vivencial Grupo Pumachiri invita a los viajeros a descubrir Coporaque, un lugar que combina historia, naturaleza y tradiciones vivas, ofreciendo una experiencia única en el corazón del Valle del Colca.
  </p>
</div>`
    },
    {
        id: 2,
        name: 'Tarapoto Tropical',
        logo: null,
        stars: 4.5,
        visits: 76,
        places: [5],
        description: `<div>
  <h2>Tarapoto Tropical</h2>
  <p>
    Disfruta de una experiencia inolvidable en Tarapoto Tropical, donde la selva, cascadas y el sol te esperan. Conecta con la naturaleza en su máximo esplendor y vive aventuras mágicas en la región de San Martín.
  </p>
  <p><strong>Desde:</strong> S/ 399.0 por adulto</p>
  
  <h3>Detalles</h3>
  <ul>
    <li><strong>Edades:</strong> Niños hasta 3 años no pagan (comparten servicios con padres), a partir de 4 años tarifa completa.</li>
    <li><strong>Máx. de personas por grupo:</strong> 2 adultos + 1 niño por habitación</li>
    <li><strong>Horario de inicio:</strong> Consultar disponibilidad</li>
    <li><strong>Entrada para dispositivos móviles:</strong> Sí</li>
    <li><strong>Guía en vivo:</strong> Español, Inglés</li>
  </ul>

  <h3>Servicios Ofrecidos</h3>
  <ul>
    <li><strong>Alojamiento:</strong> 03 noches en Hospedaje Real con piscina.</li>
    <li><strong>Alimentación:</strong>
      <ul>
        <li>03 desayunos y 02 almuerzos.</li>
        <li>No incluye cenas.</li>
      </ul>
    </li>
    <li><strong>Traslados:</strong> Aeropuerto - Hotel - Aeropuerto.</li>
    <li><strong>Tours:</strong>
      <ul>
        <li>Visita a Lamas (Castillo y Barrio Wayku).</li>
        <li>Laguna Azul con paseo en bote.</li>
        <li>Cascadas Salto de la Bruja.</li>
        <li>Cataratas de Ahuashiyacu.</li>
      </ul>
    </li>
  </ul>

  <h3>Itinerario</h3>
  <ul>
    <li><strong>Día 01:</strong> Llegada a Tarapoto
      <ul>
        <li>Recojo en el aeropuerto según el horario de vuelo.</li>
        <li>Por la tarde: Tour a Lamas (Castillo y Barrio Wayku).</li>
      </ul>
    </li>
    <li><strong>Día 02:</strong> Laguna Azul
      <ul>
        <li>Excursión a la Laguna Azul en Sauce. Paseo en bote y refrescante baño.</li>
      </ul>
    </li>
    <li><strong>Día 03:</strong> Cascadas Salto de la Bruja
      <ul>
        <li>Caminata y visita a las cascadas Salto de la Bruja para disfrutar de sus frescas aguas.</li>
      </ul>
    </li>
    <li><strong>Día 04:</strong> Cataratas de Ahuashiyacu
      <ul>
        <li>Visita a las Cataratas de Ahuashiyacu con baño a los pies de la cascada.</li>
        <li>Traslado al aeropuerto.</li>
      </ul>
    </li>
  </ul>

  <h3>Contacto</h3>
  <ul>
    <li><strong>WhatsApp:</strong> Contacto directo disponible.</li>
    <li><strong>Correo Electrónico:</strong> Proporcionado al reservar.</li>
    <li><strong>Reservas en línea:</strong> A través de la web de Millonarios Travel.</li>
  </ul>

  <h3>Sobre la empresa</h3>
  <p><strong>Millonarios Travel:</strong> Agencia especializada en ofrecer experiencias únicas en Tarapoto y la selva peruana.</p>
  <h4>Términos y Condiciones</h4>
  <ul>
    <li>Tarifa no incluye IGV (exonerado por Ley de Amazonia).</li>
    <li>Aplica para feriados y días festivos (sujeto a disponibilidad).</li>
    <li>Niños hasta 3 años no pagan; desde 4 años, tarifa completa.</li>
  </ul>
</div>`,
    },
]