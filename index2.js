const guerreros=[]; //arreglo permite guardar muchas cosas como objetos
const razas=["Normal","fino", "calle","Popular", "d mariana", "D sara"];

const asesinar=async function(){ //async para decir q es una promesa
   const idGuerrero=this.idGuerrero;  // console.log(idGuerrero); //me muestra que id soyxd
     const resp= await Swal.fire({ //PROMESAA
         title: 'Deseas aSeSInAR?',
         text: "Eres dios?",
         icon: 'warning',
        showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'SI, asesinalos!'
       });
       //YA DECIDIO QUE HACER
     if(resp.isConfirmed){
         //la persona quiere eliminar apreto sii
         guerreros.splice(idGuerrero,1);
         cargarTabla();
         Swal.fire("Michi Eliminado exitosamente", "todo destruido","success");

     }
 };

//1.- Buscar el select 
const selectRaza=document.querySelector("#raza-select");
for(let i=0; i<razas.length; ++i){
    let option=document.createElement("option");
    option.value=i;
    option.innerText=razas[i];
    selectRaza.appendChild(option);
}
//Consulta
//2.-Generar las ocpiones dinamicamente
const cargarTabla= ()=>{
    //1.- Seleccionar el tbody para usarlo
 
    const tbody=document.querySelector("#tabla-tbody")
   tbody.innerHTML="";
    //2.- Recorrer el arreglo de michi ["humana"etc]
    for (let i=0; i<guerreros.length;++i){
        let g =guerreros[i];//el michi que se encuentre en la primera posicion 
        //3.- Por cada michi generar una fila de la tabla (tr)
        let fila=document.createElement("tr");
        //4.- Por cada atributo del vengador (nombre, url, raza) Generar una celda 
        let celdaNombre=document.createElement("td");
        //agrego nombre
        celdaNombre.innerText=g.nombre;

        let celdaUrl=document.createElement("td");
        let imgGuerrero=document.createElement("img"); //creo la imagen
        // imgGuerrero.src=g.url; //consigo la url
        celdaUrl.appendChild(imgGuerrero); //la heredo
        imgGuerrero.classList.add("img-guerrero"); //puedo agregar o quitar clases (remove) //me lleva a mi css
        celdaUrl.classList.add("text-center");

        let celdaRaza=document.createElement("td");
        celdaRaza.innerText=razas[g.raza]; //aqui para que se imprima el nombre no el indice

        let celdaAcciones=document.createElement("td");
        celdaAcciones.classList.add("text-center");
        let btnEliminar=document.createElement("button"); //cree un btn
        btnEliminar.classList.add("btn", "btn-danger"); //le di estilos
        btnEliminar.innerText="Eliminar";
        btnEliminar.idGuerrero=i; //al guerrero le puse un id
        btnEliminar.addEventListener("click", asesinar); //al hacer click mando a llamar a función
        celdaAcciones.appendChild(btnEliminar);

        //5.- Agregar cada celda a la fila nueva
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaUrl);
        fila.appendChild(celdaRaza);
        fila.appendChild(celdaAcciones);

         // 6.- Agregar la fila al cuerpo de la tabla       
        tbody.appendChild(fila);

    }
    
};



//agregar un listener para el evento Click
document.querySelector("#registrar-btn").addEventListener("click",()=>{
    //obtengo los valores por medio del id y mando a imprimir, no olvides el .value
  let nombre = document.querySelector("#nombre-txt").value;
  let url = document.querySelector("#url-txt").value;
  let raza = document.querySelector("#raza-select").value;

  let errores=[];
  if(nombre.trim()==""){
      errores.push("Debe ingresar nombre");
  }else if(guerreros.find(g=>g.nombre.toLowerCase()==nombre.toLowerCase() ) !=undefined){ //busca dentro de la lista y si hay un repetido devuele?
      errores.push("El Michi con ese nombre ya existe");
  }

  if(url.trim()==""){
      errores.push("debe ingresar una url");
  }
  //sino hubo ningun error
  if(errores.length==0){

      let guerrero={}; //creo un objeto, dentro puedo guardar muchas propiedades
      guerrero.nombre = nombre; //le doy a mi objeto las porpiedades para que almacene lo que este en input
      guerrero.url = url;
      guerrero.raza = raza;
      // console.log(guerrero); imprimo
      guerreros.push(guerrero);
      cargarTabla();
    }else{
       let mensaje= errores.join("<br />");
       
       Swal.fire("Error de validaciónes", mensaje, "warning"); //el ultimo es la claseee
    }
});
document.querySelector("#borrar-btn").addEventListener("click", ()=>{

    document.querySelector("#nombre-txt").value="";
    document.querySelector("#url-txt").value="";
    document.querySelector("#raza-select").value="0";
    
});
