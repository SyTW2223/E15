import { Exercise } from '../../Schema/exerciseSchema';
import { User } from '../../Schema/userSchema';

// Crear la clase ExerciceFactory
export class ExerciseFactory {
  public static random() {
    const exercise = new Exercise();
    exercise.id = Math.floor(Math.random() * 1000000);
    exercise.name = "Ejercicio random";
    //exercise.user = "Autor random";
    exercise.short_description = "Descripcion corta random";
    exercise.long_description = "Descripcion larga random";
    exercise.initial_position = "Posicion inicial random";
    exercise.category = "Categoria random";
    exercise.equipment_needed = false;
    exercise.picture = "Imagen random";
    exercise.likes = 0;
    exercise.comments = [];
    //return exercise;
  }
}