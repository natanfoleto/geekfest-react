import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import InputMask from "react-input-mask";

import { createUser } from "../../services/user";

import logo from "../../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleNavigateLogin() {
    navigate("/");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { status, message } = await createUser({
      username,
      name,
      phone,
      birthDate,
      password,
      confirmPassword,
    });

    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);

    handleNavigateLogin();
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-login bg-no-repeat bg-fixed bg-cover">
      <main className="w-[26rem] flex flex-col items-center">
        <img src={logo} className="xsm:w-96 w-80 mb-4" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            name="username"
            type="text"
            value={username}
            className="w-80 h-11 border-0 outline-0 rounded-lg p-4 leading-5 text-zinc-900 placeholder:text-zinc-400"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu username"
            required
          />

          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-80 h-11 border-0 outline-0 rounded-lg p-4 leading-5 text-zinc-900 placeholder:text-zinc-400"
            placeholder="Digite seu nome completo"
            required
          />

          <InputMask
            mask="(99) 99999-9999"
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-80 h-11 border-0 outline-0 rounded-lg p-4 leading-5 text-zinc-900 placeholder:text-zinc-400"
            placeholder="(01) 12345-6789"
            required
          />

          <input
            name="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            min="1900-01-01"
            max="2022-12-31"
            required
            className="w-80 h-11 border-0 outline-0 rounded-lg p-4 leading-5 text-zinc-900 placeholder:text-zinc-400"
          />

          <input
            name="password"
            type="password"
            pattern="[0-9]*"
            inputMode="numeric"
            minLength={4}
            maxLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 h-11 border-0 outline-0 rounded-lg p-4 leading-5 text-zinc-900 placeholder:text-zinc-400"
            placeholder="Sua senha secreta"
            required
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^0-9]/g, '');
            }}
          />

          <input
            name="confirmPassword"
            type="password"
            pattern="[0-9]*"
            inputMode="numeric"
            minLength={4}
            maxLength={4}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-80 h-11 border-0 outline-0 rounded-lg p-4 leading-5 text-zinc-900 placeholder:text-zinc-400"
            placeholder="Confirme a senha"
            required
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^0-9]/g, '');
            }}
          />

          <button 
            type="submit" 
            className="p-3 mt-2 border-0 rounded-lg font-bold text-zinc-300 bg-zinc-800 transition-all hover:bg-zinc-900"
          >
            REGISTRAR
          </button>

          <a 
            className="mt-4 no-underline text-center text-zinc-200 cursor-pointer transition-all hover:text-zinc-100" 
            onClick={handleNavigateLogin}
          >
            Já tem inscrição? Logue-se
          </a>
        </form>
      </main>
    </div>
  );
}
