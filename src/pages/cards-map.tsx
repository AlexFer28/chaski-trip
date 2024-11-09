
import { NodeIndexOutlined, StarFilled } from '@ant-design/icons';
import { Button, Card, Col, Empty, Modal, Row, Tabs, Tag, Tooltip } from 'antd';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { lugares, rutas } from '../core/datos';

//Jsx
const renderDescription = (description: string) => {
    // return description.replace(/\n/g, '<br/>')
    // return description.split('\n').map((item, index) => <div key={index}>{item}</div>)
    return <span dangerouslySetInnerHTML={{ __html: description }} />
}

const calcularDistanciaKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
}


const getColorTag = (n: number) => {
    const colors = ['magenta', 'blue', 'green', 'yellow', 'orange', 'red']
    return colors[n % colors.length]
}

const DestinosComponent = ({ setTabActive }: { setTabActive: Function }) => {

    const observer = useRef(false)
    const [markerId, setMarkerId] = useState<number | null>(null)
    const [lugaresData, setLugaresData] = useState(lugares)

    useEffect(() => {

        if (observer.current) return
        observer.current = true

        document.addEventListener('marker-hover', (event: any) => {
            const detail = event.detail
            setMarkerId(detail.item?.id || null)
        })

        // Calcular distancia
        navigator.geolocation.getCurrentPosition((position) => {
            const distance = lugares.map(x => calcularDistanciaKm(position.coords.latitude, position.coords.longitude, x.position[0], x.position[1])).map(x => Math.round(x))
            lugares.forEach((x, index) => x.distance = distance[index])
            setLugaresData(lugares.map(x => ({ ...x })))
        })

        return () => {
            document.removeEventListener('marker-hover', (event) => {
                console.log(event)
            })
        }
    }, [])

    const focusMarker = (id: number) => {
        if (id === markerId) return setMarkerId(null)
        setMarkerId(id)
        document.dispatchEvent(new CustomEvent('marker-focus', { detail: { id } }))
    }

    const focusRuta = (id: number) => {
        setTabActive('2')
        setMarkerId(id)
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('marker-click', { detail: { item: lugares.find(x => x.id === id) } }))
        }, 5)
    }

    return (<Row gutter={[16, 16]}>
        {lugaresData.map((item, index) => (
            <Col key={index} xs={32} sm={32} md={24} lg={12} xl={8} xxl={6}>
                <Card
                    hoverable
                    cover={<img alt={item.description} src={item.img} height={250} style={{ objectFit: 'cover' }} />}
                    style={{
                        transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
                        transform: markerId === item.id ? 'scale(1.05)' : 'scale(1)',
                        opacity: !markerId || item.id === markerId ? 1 : 0.5
                    }}
                    onClick={() => focusMarker(item.id)}
                >
                    <div className='flex flex-row justify-between align-center' style={{ margin: '-15px' }}>
                        <div className='flex flex-column gap-5' >
                            <div className='text-semibold'>
                                <StarFilled />
                                <span style={{ marginLeft: 4 }}>{item.stars}</span>
                                <span style={{ marginLeft: 4 }}>({item.visits})</span>
                            </div>
                            <div className='text-semibold'>
                                <span>{item.description}</span>
                                {item.distance && <span style={{ marginLeft: 4 }}>({item.distance} km)</span>}
                            </div>
                        </div>

                        {/* Botón para ir a rutas y filtrar */}
                        <Tooltip title='Ver rutas'>
                            <Button
                                type='primary'
                                size='small'
                                onClick={() => focusRuta(item.id)}
                                style={{ marginLeft: 10 }}
                                icon={<NodeIndexOutlined />}
                            />
                        </Tooltip>
                    </div>
                </Card>
            </Col>
        ))}
    </Row>)
}

const RutasComponent = () => {

    const observer = useRef(false)
    const [modalData, setModalData] = useState<typeof rutas[number] | null>(null);
    const [markerId, setMarkerId] = useState<number | null>(null)
    const [destinosSeleccionados, setDestinosSeleccionados] = useState<number[]>([])
    const destinosSetRef = useRef(new Set<number>())

    useEffect(() => {

        if (observer.current) return
        observer.current = true

        document.addEventListener('marker-hover', (event: any) => {
            const detail = event.detail
            setMarkerId(detail.item?.id || null)
        })

        document.addEventListener('marker-click', (event: any) => {
            const detail = event.detail
            setMarkerId(detail.item?.id || null)
            destinosSetRef.current.add(detail.item?.id)
            setDestinosSeleccionados([...destinosSetRef.current].filter(Number))
        })

        return () => {
            document.removeEventListener('marker-hover', (event) => {
                console.log(event)
            })
            document.removeEventListener('marker-click', (event) => {
                console.log(event)
            })
        }
    }, [])


    return (<>
        {/* Si hay destinos seleccionadas, se muestran en tags */}
        {destinosSeleccionados.length > 0 && (
            <div className='flex flex-row gap-5 mb-10'>
                {destinosSeleccionados.map((item) => (
                    <Tag key={item} color={getColorTag(item)}
                        closable
                        onClose={() => {
                            destinosSetRef.current.delete(item)
                            setDestinosSeleccionados([...destinosSetRef.current].filter(Number))
                        }}
                    >
                        {lugares.find(x => x.id === item)?.description}
                    </Tag>
                ))}
            </div>
        )}

        {rutas
            .filter(x => destinosSeleccionados.length == 0 || x.places.some(y => destinosSeleccionados.includes(y)))
            .length === 0 && <Empty description='No hay rutas para los lugares seleccionados' />}


        <Row gutter={[16, 16]}>
            {rutas
                .filter(x => destinosSeleccionados.length == 0 || x.places.some(y => destinosSeleccionados.includes(y)))
                .map((item) => (
                    <Col key={item.id} xs={32} sm={32} md={24} lg={12} xl={8} xxl={6}>
                        <Card
                            hoverable
                            cover={item.logo && <img alt={item.name} src={item.logo} height={250} style={{ objectFit: 'cover' }} />}
                            onClick={() => setModalData(item)}
                            style={{
                                transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
                                transform: item.places.includes(markerId || 0) ? 'scale(1.05)' : 'scale(1)',
                                opacity: !markerId || item.places.includes(markerId) ? 1 : 0.5
                            }}
                        >
                            <div className='flex flex-column gap-5' style={{ margin: '-15px' }}>
                                <div className='text-semibold'>
                                    <StarFilled />
                                    <span style={{ marginLeft: 4 }}>{item.stars}</span>
                                    <span style={{ marginLeft: 4 }}>({item.visits})</span>
                                </div>
                                <div className='text-semibold'>
                                    <span>{item.name}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                    {item.places.map((place, index) => (
                                        <Tag key={index} color={getColorTag(place)}>
                                            {lugares.find(x => x.id === place)?.description}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            <Modal title={
                <div className='text-semibold flex flex-row gap-5'>
                    Ruta
                    <StarFilled style={{ marginLeft: 4 }} />
                    <span style={{ marginLeft: 4 }}>{modalData?.stars}</span>
                    <span style={{ marginLeft: 4 }}>({modalData?.visits})</span>
                </div>
            }
                open={!!modalData}
                onCancel={() => setModalData(null)}
                footer={null}
                width={800}
            >
                {modalData?.logo && <img alt={modalData?.name} src={modalData?.logo || ''} height={250} style={{ objectFit: 'cover' }} />}
                <div className='flex flex-column gap-5'>

                    {modalData?.description && <div className='text-semibold'>
                        <span>{renderDescription(modalData.description)}</span>
                    </div>}

                </div>
            </Modal>
        </Row>
    </>)
}


export default function CardsMap() {

    const map = useRef(null as any as L.Map)

    const [tabActive, setTabActive] = useState('1')

    useEffect(() => {
        setTimeout(() => {
            if (map.current) return
            map.current = L.map('map')//.setView([51.505, -0.09], 13)

            L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(map.current)

            // Set the view to actually look at the map
            navigator.geolocation.getCurrentPosition((position) => {
                map.current.setView([position.coords.latitude, position.coords.longitude], 6)
            })

            const markers = lugares.map((item) => {
                return L.marker({ lat: item.position[0], lng: item.position[1] }, {
                    // icon: L.divIcon({
                    //     className: 'custom-marker',
                    //     html: `<div class="custom-marker-icon"><img src="${item.img}" /></div>`,
                    // }),
                    riseOnHover: true,
                })
                    // .bindPopup(`<b>${item.description}</b><br/>${item.price}`) 
                    .addTo(map.current)
            })

            markers.forEach((marker, index) => {
                marker.bindPopup(`<b>${lugares[index].description}</b><br/>${lugares[index].price}`, { autoPan: true })
                marker.on('mouseover', function (e) {
                    // Obtener el índice del marcador
                    const index = markers.indexOf(e.target)
                    const item = lugares[index]
                    // Manda un evento al documento con el índice del marcador
                    document.dispatchEvent(new CustomEvent('marker-hover', { detail: { item } }))
                    marker.openPopup()
                })
                marker.on('mouseout', function () {
                    document.dispatchEvent(new CustomEvent('marker-hover', { detail: { item: null } }))
                    marker.closePopup()
                })
                marker.on('click', function (e) {
                    const index = markers.indexOf(e.target)
                    const item = lugares[index]
                    document.dispatchEvent(new CustomEvent('marker-click', { detail: { item } }))
                })
            })

            document.addEventListener('marker-focus', (event: any) => {
                const detail = event.detail
                const lugarIndex = lugares.findIndex(x => x.id === detail.id)
                const marker = markers[lugarIndex]
                if (!marker) return
                map.current.setView([marker.getLatLng().lat, marker.getLatLng().lng], 7)
                marker.openPopup()
            })

        }, 1)


        return () => {
            document.removeEventListener('marker-focus', (event) => {
                console.log(event)
            })
        }

    }, [])

    return (
        <Row style={{ height: '100%' }}>
            <Col span={12}>
                <Tabs
                    style={{ height: '100%', minHeight: 'calc(100vh - 100px)' }}
                    // defaultActiveKey="1"
                    activeKey={tabActive}
                    onChange={(key) => setTabActive(key)}
                    centered
                    items={[
                        {
                            label: 'Destinos',
                            key: '1',
                            children: <DestinosComponent setTabActive={setTabActive} />,
                        },
                        {
                            label: 'Rutas',
                            key: '2',
                            children: <RutasComponent />,
                        },
                    ]}
                />
            </Col>
            <Col span={12}>
                <div id="map" />
            </Col>
        </Row>
    )
}