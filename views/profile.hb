<div id="barra-lateral">

                <div class="nav-text">
                    <div class="inicio">
                            <a class="text-decoration" href="/">Inicio</a> 
                    </div>
                
                    <div class="generos">
                            <a class="text-decoration" href="/generos">Generos</a> 
                    </div>
                
                    <div class="galeria">
                            <a class="text-decoration" href="/galeria">Galeria</a> 
                    </div>
            
                    <div class="ingresa">
                            <a class="text-decoration" href="/login">Ingresa</a> 
                    </div>
            
                    <div class="registro">
                            <a class="text-decoration" href="/signup">Registro</a> 
                    </div>
            
                    <div class="contacto">
                            <a class="text-decoration" href="/contacto">Contacto</a> 
                    </div>
            
                    <div class="nosotros">
                        <a class="text-decoration" href="/nosotros">Nosotros</a> 
                    </div>
            
                </div>
                <img src="https://i.imgur.com/ytDtupJ.png" alt=""> 
     </div>

<h2>Hola {{username}}!!</h2>
<img src="{{photoURL}}" alt="profile picture" id="photo">

<button> 
  <a href="/login">Logout</a>
</button>

<button>
  <a href="/edit/{{_id}}">Edit profile</a>
</button>



  <a href="/create_new">Crear nota ♪</a>



<div>
  <h2>Notas ♫</h2>
  <div class="noteCards">
    {{#each notas}}
    <h2>Nombre: {{nombreGrupal}}</h2>
    <img src="{{photo}}" alt="photo">
    <p>Descripcion:</p>
    <p>{{body}}</p>
    <span>Genero musical: {{generoMusical}}</span> <br>
     <span>Tipo de evento: {{TipoEvento}}</span>  <br>
     <span>Costo: {{CostoMXN}}</span> <br>
     <span>Telefono: {{Telefono}}</span>
    </p>
    {{/each}}
  </div>
</div>

<script>

  document.getElementById('photo').addEventListener('click', () => {
    window.location.href = "/edit_image"
  })


</script>