import Logo from '@/components/ui/Logo'
import { GUILD_CITIES } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-beige text-navy-deep py-14 px-[8vw]">
      <div className="flex justify-between flex-wrap gap-[30px] max-w-[1100px] mx-auto mb-[30px]">
        <div>
          <Logo variant="primary" />
        </div>
        
        <div className="max-w-[400px]">
          <strong>The Guild cities</strong>
          <p className="opacity-75 leading-[1.9] text-[13.5px] mt-2">
            {GUILD_CITIES.map((city, i) => (
              <span key={city}>
                {city}
                {i < GUILD_CITIES.length - 1 && (
                  <>
                    {' · '}
                    {(i + 1) % 3 === 0 && <br />}
                  </>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="text-center opacity-60 border-t border-navy-deep/15 pt-5 max-w-[1100px] mx-auto text-[13.5px]">
        THEUNOiA — Independence starts here. · @theunoia
      </div>
    </footer>
  )
}
