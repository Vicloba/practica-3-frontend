// URL de la API local en Express (Práctica 2.3)
const API_URL = 'http://localhost:3000/api/productos';

document.addEventListener('DOMContentLoaded', () => {
  cargarYRenderizarDatos();
});

// Función principal para obtener datos y dibujarlos
async function cargarYRenderizarDatos() {
  try {
    // 1. Petición GET a la API REST
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.statusText}`);
    }

    const productos = await respuesta.json();

    // 2. Renderizar tabla en el DOM
    renderizarTabla(productos);

    // 3. Generar la gráfica gráfica con los datos de la API
    renderizarGrafico(productos);

  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}

// Función para inyectar filas dinámicamente en el HTML
function renderizarTabla(productos) {
  const tbody = document.getElementById('filas-productos');
  tbody.innerHTML = ''; // Limpiar filas previas

  if (productos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">No hay productos registrados.</td></tr>';
    return;
  }

  productos.forEach(prod => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${prod.id}</td>
      <td>${prod.nombre}</td>
      <td>$${Number(prod.precio).toFixed(2)}</td>
      <td>${prod.descripcion || 'Sin descripción'}</td>
    `;
    tbody.appendChild(fila);
  });
}

// Función para configurar e instanciar Chart.js
function renderizarGrafico(productos) {
  // Extraer nombres (labels) y precios (data) en arreglos independientes
  const nombres = productos.map(prod => prod.nombre);
  const precios = productos.map(prod => Number(prod.precio));

  const ctx = document.getElementById('miGrafica').getContext('2d');

  new Chart(ctx, {
    type: 'bar', // Tipo de gráfico: 'bar' (barras) o 'pie' (circular)
    data: {
      labels: nombres,
      datasets: [{
        label: 'Precio ($)',
        data: precios,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}