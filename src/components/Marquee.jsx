const marqueeItems = [
  'Available for New Projects',
  'UI/UX & Frontend Developer',
  'To Infinity and Beyond',
]

// Satu "half" diisi item 2x supaya lebarnya melebihi layar lebar (>=1920px),
// lalu half-nya digandakan lagi supaya animasi translateX(-50%) mulus tanpa jeda.
const half = [...marqueeItems, ...marqueeItems]

const Marquee = () => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee__content">
      {[0, 1].map((copy) => (
        <div className="marquee__half" key={copy}>
          {half.map((item, index) => (
            <span className="marquee__item" key={`${copy}-${index}`}>
              {item}
              <span className="marquee__dot">•</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
)

export default Marquee
