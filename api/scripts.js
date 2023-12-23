function enviarFormulario(event) {
    event.preventDefault();
  
    var formulario = document.getElementById("miFormulario");
    var datos = new FormData(formulario);
  
    fetch('/guardarDatos', {
      method: 'POST',
      body: datos,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Ajusta según sea necesario
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
  