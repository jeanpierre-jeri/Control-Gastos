import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'

import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto,
    isValidPresupuesto,
    gastos,
    setGastos,
}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {isValidPresupuesto ? (
                <ControlPresupuesto
                    gastos={gastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setGastos={setGastos}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            ) : (
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            )}
        </header>
    )
}

export default Header
