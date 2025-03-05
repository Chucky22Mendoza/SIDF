import { useState } from "react";
import { Title } from "./Title";

export function Contact() {
  const [formData, setFormData] = useState<{
    message: string;
    name: string;
    mail: string;
  }>({
    message: '',
    name: '',
    mail: '',
  });

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const res = await response.json();
    console.log(res);
  };

  return (
    <>
      <Title title="CONTÁCTANOS" bgType="muted" />
      <div className="flex flex-col flex-1 justify-center w-full max-w-4xl self-center gap-6">
        <p className="text-center text-gray-500 text-xl">
          Si estás buscando información o deseas consultar en físico alguno de nuestros
          materiales, mándanos a nuestro correo un mensaje para que recibas nuestras indicaciones al asistir
          personalmente a las instalaciones.
        </p>

        <div className="flex justify-center">
          <form className="flex flex-col gap-5 max-w-lg" onSubmit={onSubmitHandler}>
            <input
              className="w-full border-2 border-transparent bg-transparent text-lg transition-all"
              style={{ borderBottomColor: 'tomato' }}
              type="text"
              value={formData.name}
              placeholder="Nombre"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              className="w-full border-2 border-transparent bg-transparent text-lg transition-all"
              style={{ borderBottomColor: 'tomato' }}
              type="email"
              value={formData.mail}
              placeholder="example@ahec.com"
              onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
              required
            />
            <textarea
              className="w-full border-2 border-transparent bg-transparent text-lg transition-all mt-5"
              style={{
                borderBottomColor: 'tomato',
              }}
              value={formData.message}
              rows={1}
              cols={80}
              placeholder="Mensaje..."
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            <button type="submit" className="transition-all bg-red-950 text-white hover:bg-white hover:text-red-950 py-2 px-8 rounded-3xl font-bold text-lg">Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
}
