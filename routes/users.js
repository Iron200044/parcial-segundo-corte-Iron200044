const express=require('express')
const router = express.Router();

// Middleware para parsear el cuerpo de las solicitudes como JSON
router.use(express.json());

//Array con los nombres
const listaUsers=[
    {
      "nombre": "SAMUEL",
      "apellidos": "ACERO GARCIA"
    },
    {
      "nombre": "DAREK",
      "apellidos": "ALJURI MARTINEZ"
    },
    {
      "nombre": "JUAN FELIPE",
      "apellidos": "CEPEDA URIBE"
    },
    {
      "nombre": "ANA MARIA",
      "apellidos": "CHAVES PEREZ"
    },
    {
      "nombre": "CARLOS DAVID",
      "apellidos": "CRUZ PAVAS"
    },
    {
      "nombre": "DIEGO NORBERTO",
      "apellidos": "DIAZ ALGARIN"
    },
    {
      "nombre": "JORGE ESTEBAN",
      "apellidos": "DIAZ BERNAL"
    },
    {
      "nombre": "DAVID ESTEBAN",
      "apellidos": "DIAZ VARGAS"
    },
    {
      "nombre": "JUAN JOSE",
      "apellidos": "FORERO PEÑA"
    },
    {
      "nombre": "SANTIAGO",
      "apellidos": "GUTIERREZ DE PIÑERES BARBOSA"
    },
    {
      "nombre": "SAMUEL ESTEBAN",
      "apellidos": "LOPEZ HUERTAS"
    },
    {
      "nombre": "MICHAEL STEVEN",
      "apellidos": "MEDINA FERNANDEZ"
    },
    {
      "nombre": "KATHERIN JULIANA",
      "apellidos": "MORENO CARVAJAL"
    },
    {
      "nombre": "JUAN PABLO",
      "apellidos": "MORENO PATARROYO"
    },
    {
      "nombre": "NICOLAS ESTEBAN",
      "apellidos": "MUÑOZ SENDOYA"
    },
    {
      "nombre": "SANTIAGO",
      "apellidos": "NAVARRO CUY"
    },
    {
      "nombre": "JUAN PABLO",
      "apellidos": "PARRADO MORALES"
    },
    {
      "nombre": "DANIEL SANTIAGO",
      "apellidos": "RAMIREZ CHINCHILLA"
    },
    {
      "nombre": "JUAN PABLO",
      "apellidos": "RESTREPO COCA"
    },
    {
      "nombre": "GABRIELA",
      "apellidos": "REYES GONZALEZ"
    },
    {
      "nombre": "JUAN JOSE",
      "apellidos": "RODRIGUEZ FALLA"
    },
    {
      "nombre": "VALENTINA",
      "apellidos": "RUIZ TORRES"
    },
    {
      "nombre": "MARIANA",
      "apellidos": "SALAS GUTIERREZ"
    },
    {
      "nombre": "SEBASTIAN",
      "apellidos": "SANCHEZ SANDOVAL"
    },
    {
      "nombre": "JOSUE DAVID",
      "apellidos": "SARMIENTO GUARNIZO"
    },
    {
      "nombre": "SANTIAGO",
      "apellidos": "SOLER PRADO"
    },
    {
      "nombre": "MARIA FERNANDA",
      "apellidos": "TAMAYO LOPEZ"
    },
    {
      "nombre": "DEIVID NICOLAS",
      "apellidos": "URREA LARA"
    },
    {
      "nombre": "ANDRÉS",
      "apellidos": "AZCONA"
    }
]
//Solicitud get de mostrar los usuarios
router.get('/:count?',(req,res)=>{
    // Obtener el parámetro count de la URL
    const count = parseInt(req.params.count);
    const sort = req.query.sort || 'ASC';

    // Verificar si count es un número
    if (isNaN(count)||count<0) {
      return res.status(400).send("ERROR: El parámetro count debe ser un número entero positivo. Ejemplo= /users/5?sort=ASC");
    }
    // Verificar si sort es válido
    if (sort !== 'ASC' && sort !== 'DESC') {
      return res.status(400).send("ERROR: El parámetro sort debe ser ASC o DESC. Ejemplo= /users/5?sort=ASC");
  }

    // Ordenar la lista de usuarios según el apellido
    listaUsers.sort((a, b) => {
      const apellidoA = a.apellidos.toUpperCase();
      const apellidoB = b.apellidos.toUpperCase();
      if (sort === 'ASC') {
          return apellidoA.localeCompare(apellidoB);
      } else {
          return apellidoB.localeCompare(apellidoA);
      }
  });

  // Limitar la cantidad de usuarios según count
  const usuariosFiltrados = listaUsers.slice(0, count);

  // Responder con la lista de apellidos y nombres
  res.json(usuariosFiltrados);
})

//Solicitud post para crear usuarios
router.post('/',(req,res)=>{
  const name=req.body.name;
  const lastName=req.body.lastName;
  const email=req.body.email;
  const city=req.body.city;
  const country=req.body.country;

  // Verificar si el cuerpo de la solicitud está vacío
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("El cuerpo de la solicitud está vacío. Proporcione los datos válidos, Name, LastName, Email, City y Country.");
  }

  // Verificar que los campos sean del tipo correcto
  if (typeof name !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof city !== 'string' || typeof country !== 'string') {
    return res.status(400).send("ERROR, tipo de dato incorrecto, recuerde que solo se recive texto.");
  }

  //Verificacion de valores obligatorios
  if(!name || !lastName || !email){
    return res.status(404).send("Complete los campos necesarios, Name, Last name y Email")
  }

  // Verificar que el email tenga una estructura válida
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("El formato del correo electrónico no es válido.");
  }

  //Establecer los valores default en city y country
  const cityFinal=city||'Bogotá';
  const countryFinal=country||'Colombia';

  //Crear nuevo usuario
  const newUser={
    Name: name,
    LastName: lastName,
    Email: email,
    City: cityFinal,
    Country: countryFinal
  };
  // Devolver el objeto JSON del nuevo usuario como respuesta
  res.json(newUser);
})
  
module.exports=router;