import { useState } from "react";
import bcrypt from "bcryptjs";

const Login = () => {
  const [nombre, setNombre] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nombreError, setNombreError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleLogin = async () => {
    try {
      let valid = true;

      // Resetear errores
      setNombreError("");
      setPasswordError("");

      if (!nombre) {
        setNombreError("El nombre es requerido.");
        valid = false;
      }

      if (!password) {
        setPasswordError("La contraseña es requerida.");
        valid = false;
      }

      if (!valid) return;

      // Simulando la recuperación de la contraseña encriptada desde la BD
      const hashedPasswordFromDB = "contraseña_guardada_en_bd";

      const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);

      if (isMatch) {
        alert(`Bienvenido, ${nombre}`);
      } else {
        alert("Contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  const handleHashPassword = async () => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("Contraseña hasheada:", hashedPassword);
    } catch (error) {
      console.error("Error al hashear la contraseña:", error);
      alert("No se pudo generar el hash de la contraseña.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <span>{nombreError}</span>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span>{passwordError}</span>
      <button onClick={handleLogin}>Iniciar Sesión</button>

      <button onClick={handleHashPassword}>Hashear Contraseña</button>
    </div>
  );
};

export default Login;
