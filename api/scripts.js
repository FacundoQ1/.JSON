document.addEventListener("DOMContentLoaded", () => {

  function enviarFormulario() {
    var formulario = document.getElementById("miFormulario");
  
    // Obtener los valores de los campos
    var nombre = document.getElementById("nombrecito").value;
    var edad = document.getElementById("edadcita").value;
    var correo = document.getElementById("correito").value;
  
    // Crear un objeto con los datos del formulario
    var datos = {
        nombre: nombre,
        edad: edad,
        correo: correo
    };
    console.log(datos);

    // Enviar los datos al servidor
    fetch('http://localhost:3000/guardarDatos', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos guardados:', data);
        // Puedes realizar acciones adicionales después de guardar los datos
    })
    .catch(error => {
        console.error('Error al guardar los datos:', error);
    });
  }

  const enviarDatos = document.getElementById("enviarDatos");

  enviarDatos.addEventListener("click", (event) => {
    event.preventDefault();
    enviarFormulario();
  });

  /////////////////////////////////////////////////////////////////////////////

  const buscarita = document.getElementById("buscarita");

  buscarita.addEventListener("click", (event) => {
    event.preventDefault();
    const correo = document.getElementById('inputCorreo').value;

    // Verifica si el campo de correo no está vacío antes de hacer la solicitud
    if (correo.trim() !== '') {
      // Realiza la solicitud al servidor para buscar usuarios por correo
      fetch(`http://localhost:3000/buscarUsuarios?correo=${correo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        const usuarioEncontrado = data.usuarios[0]; // Suponemos que solo se encuentra un usuario

        // Muestra la información en el HTML
        if (usuarioEncontrado) {
          document.getElementById('nombre').textContent = usuarioEncontrado.nombre;
          document.getElementById('edad').textContent = usuarioEncontrado.edad;
          document.getElementById('correo').textContent = usuarioEncontrado.correo;
        } else {
          console.log('Usuario no encontrado');
          // Puedes mostrar un mensaje o realizar otras acciones si el usuario no es encontrado
        }
      })
      .catch(error => {
        console.error('Error al buscar usuarios:', error);
      });
    } else {
      console.log('Por favor, ingrese un correo válido.');
    }
  });

});
