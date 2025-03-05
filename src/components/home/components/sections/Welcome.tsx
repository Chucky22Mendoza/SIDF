export function Welcome() {
  return (
    <div className="flex flex-1 justify-center items-center max-w-lg flex-col">
      <h1 className="text-red-900 text-center text-3xl font-bold">¡Bienvenidos!</h1>
      <hr className="bg-slate-400 my-4 h-1 w-full rounded-s-2xl border-none" />
      <p className="text-white mb-4 text-center">
        El Fondo Filmoteca resguarda material gráfico de cine internacional que abarca desde 1936 a 1985.
        El cartel de cine sintetiza
        el filme en un concepto que queda sugerido en una sola imagen, un cartel representaba el primer contacto del espectador
        con el filme, su  impacto visual  definía gran parte del éxito en taquilla. Los carteles, <span style={{ fontStyle: 'italic' }}>stills </span>
        y fotomontajes del Fondo Filmoteca, narran parte de la memoria fílmica de nuestro Estado y revelan,  a través del trabajo
        de diseñadores y fotógrafos, las tendencias creativas de una época.
      </p>
      <a className="transition-all bg-white text-red-950 hover:bg-red-950 hover:text-white py-2 px-8 rounded-3xl font-bold text-lg" href="#filmoteca">¡Conoce la Filmoteca!</a>
    </div>
  );
}
