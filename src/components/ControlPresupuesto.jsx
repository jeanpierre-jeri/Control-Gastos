import { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
    presupuesto,
    gastos,
    setIsValidPresupuesto,
    setGastos,
    setPresupuesto,
}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce(
            (total, gasto) => gasto.cantidad + total,
            0
        )
        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = ((totalGastado / presupuesto) * 100).toFixed(2)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 500)

        setDisponible(totalDisponible)

        setGastado(totalGastado)

        // if (gastado > 0) {
        //     const porcentaje = (gastado / presupuesto) * 100
        //     setPercentage(porcentaje)
        // }
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-PE', {
            style: 'currency',
            currency: 'PEN',
        })
    }

    const handleResetApp = () => {
        const result = confirm('¿Deseas reiniciar presupuesto y gastos?')
        if (result) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    })}
                />
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : null}`}>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
