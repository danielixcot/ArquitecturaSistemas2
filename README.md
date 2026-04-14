## link de la API publica
https://arquitecturasistemas2-1.onrender.com

## Esquema de los modelos disponibles
### Estudiante
 
| Campo        | Tipo   | Descripción                        |
|--------------|--------|------------------------------------|
| id           | ID     | Identificador único                |
| nombre       | String | Nombre del estudiante              |
| apellido     | String | Apellido del estudiante            |
| email        | String | Correo electrónico                 |
| edad         | Int    | Edad del estudiante                |
| carrera      | String | Carrera que cursa                  |
| fechaIngreso | String | Fecha de ingreso a la institución  |
 
---
 
### Curso
 
| Campo        | Tipo    | Descripción                        |
|--------------|---------|------------------------------------|
| id           | ID      | Identificador único                |
| nombre       | String  | Nombre del curso                   |
| descripcion  | String  | Descripción del contenido          |
| duracionHoras| Int     | Duración total en horas            |
| nivel        | String  | Nivel del curso (Básico/Avanzado)  |
| instructor   | String  | Nombre del instructor              |
| activo       | Boolean | Si el curso está activo o no       |
 
---

## Queries Disponibles
### Obtener todos los estudiantes
```
query {
  estudiantes {
    id
    nombre
    apellido
    email
    edad
    carrera
    fechaIngreso
  }
}
```
 
### Obtener un estudiante por ID
```
query {
  estudiante(id: 1) {
    nombre
    apellido
    carrera
  }
}
```
 
### Obtener todos los cursos
```
query {
  cursos {
    id
    nombre
    descripcion
    duracionHoras
    nivel
    instructor
    activo
  }
}
```
 
### Obtener un curso por ID
```
query {
  curso(id: 1) {
    nombre
    nivel
    instructor
  }
}
```
