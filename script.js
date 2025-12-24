document.addEventListener('DOMContentLoaded', () => {
    const ramos = document.querySelectorAll('.ramo');
    const resetBtn = document.getElementById('reset-btn');

    // 1. Cargar estado guardado
    cargarProgreso();

    // 2. Evento clic para cada ramo
    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            const idRamo = ramo.id;
            const requisitoId = ramo.getAttribute('data-req');

            // Si ya está aprobado, lo desmarcamos
            if (ramo.classList.contains('aprobado')) {
                ramo.classList.remove('aprobado');
                guardarProgreso();
                return;
            }

            // Validar requisitos
            if (requisitoId) {
                const reqElemento = document.getElementById(requisitoId);
                if (!reqElemento.classList.contains('aprobado')) {
                    alert(`BLOQUEADO: Debes aprobar primero "${reqElemento.innerText}"`);
                    return;
                }
            }

            // Marcar como aprobado
            ramo.classList.add('aprobado');
            guardarProgreso();
        });
    });

    // 3. Función para guardar en LocalStorage
    function guardarProgreso() {
        const aprobados = [];
        document.querySelectorAll('.ramo.aprobado').forEach(r => {
            aprobados.push(r.id);
        });
        localStorage.setItem('mallaProgreso', JSON.stringify(aprobados));
    }

    // 4. Función para cargar desde LocalStorage
    function cargarProgreso() {
        const guardados = JSON.parse(localStorage.getItem('mallaProgreso'));
        if (guardados) {
            guardados.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add('aprobado');
            });
        }
    }

    // 5. Botón de Reinicio
    resetBtn.addEventListener('click', () => {
        if (confirm('¿Seguro que quieres borrar todo tu progreso?')) {
            localStorage.removeItem('mallaProgreso');
            location.reload();
        }
    });
});
