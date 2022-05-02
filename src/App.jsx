import { useEffect, useState } from 'react'

import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'

import { generarId } from './helpers'

import IconoNuevoGasto from '../img/nuevo-gasto.svg'
import Filtros from './components/Filtros'

function App() {
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? ''
    )
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
    const [modal, setModal] = useState(false)
    const [animarModal, setAnimarModal] = useState(false)

    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos')
            ? JSON.parse(localStorage.getItem('gastos'))
            : []
    )

    const [gastoEditar, setGastoEditar] = useState({})

    const [filtro, setFiltro] = useState('')
    const [gastosFiltrados, setGastosFiltrados] = useState([])

    useEffect(() => {
        if (Object.keys(gastoEditar).length) {
            setModal(true)
            setTimeout(() => {
                setAnimarModal(true)
            }, 500)
        }
    }, [gastoEditar])

    useEffect(() => {
        localStorage.setItem('presupuesto', Number(presupuesto) ?? '')
    }, [presupuesto])

    useEffect(() => {
        if (filtro) {
            const gastosFilter = gastos.filter(
                (gastoState) => gastoState.categoria === filtro
            )
            setGastosFiltrados(gastosFilter)
        }
    }, [filtro])

    useEffect(() => {
        if (Number(localStorage.getItem('presupuesto')) > 0) {
            setIsValidPresupuesto(true)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    }, [gastos])

    const handleNuevoGasto = () => {
        setModal(true)
        setGastoEditar({})

        setTimeout(() => {
            setAnimarModal(true)
        }, 500)
    }

    const guardarGasto = (gasto) => {
        if (gasto.id) {
            const gastosActualizados = gastos.map((gastoState) =>
                gastoState.id === gasto.id ? gasto : gastoState
            )
            setGastos(gastosActualizados)
            setGastoEditar({})
        } else {
            gasto.id = generarId()
            gasto.fecha = Date.now()
            setGastos([...gastos, gasto])
        }

        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const eliminarGasto = (id) => {
        const gastosFiltrados = gastos.filter((gasto) => gasto.id !== id)
        setGastos(gastosFiltrados)
    }

    return (
        <div className={modal ? 'fijar' : undefined}>
            <Header
                gastos={gastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                setGastos={setGastos}
            />

            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="icono nuevo gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}
            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    )
}

export default App
