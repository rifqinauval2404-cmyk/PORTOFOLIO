const Starfield = () => {
  return (
    <div className="starfield" aria-hidden="true">
      {/* Twinkling star layers */}
      <div className="starfield__layer starfield__layer--1" />
      <div className="starfield__layer starfield__layer--2" />
      <div className="starfield__layer starfield__layer--3" />

      {/* Shooting stars */}
      <div className="shooting-star shooting-star--1" />
      <div className="shooting-star shooting-star--2" />
      <div className="shooting-star shooting-star--3" />
      <div className="shooting-star shooting-star--4" />
      <div className="shooting-star shooting-star--5" />

      {/* Nebula glow effects */}
      <div className="nebula nebula--1" />
      <div className="nebula nebula--2" />
      <div className="nebula nebula--3" />
    </div>
  )
}

export default Starfield
