import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../contexts/authentication";

import logo from "../../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  
  const { signIn, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleNavigateRegister() {
    navigate("/register");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { status, message } = await signIn({ username, password });

    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-login bg-no-repeat bg-fixed bg-cover">
      <main className="w-[26rem] flex flex-col items-center">
        <img src={logo} className="xsm:w-96 w-80 mb-4" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="w-80 h-11 border-0 outline-0 rounded-lg p-4 leading-5 text-zinc-900 placeholder:text-zinc-400"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu username"
            required
          />

          <input
            className="w-80 h-11 border-0 outline-0 rounded-lg p-4 leading-5 text-zinc-900 placeholder:text-zinc-400"
            id="last"
            name="password"
            type="password"
            pattern="[0-9]*"
            inputMode="numeric"
            minLength={4}
            maxLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha secreta"
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
            {loading ? "LOGANDO" : "LOGIN"}
          </button>

          <a 
            className="mt-4 no-underline text-center text-zinc-200 cursor-pointer transition-all hover:text-zinc-100" 
            onClick={handleNavigateRegister}
          >
            Não tem inscrição? Inscreva-se
          </a>
        </form>
      </main>
    </div>
  );
}
