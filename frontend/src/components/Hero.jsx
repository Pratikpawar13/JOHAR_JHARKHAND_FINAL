import { motion } from 'framer-motion'
import j2 from "../assets/j2.jpg";

export default function Hero() {
  return (
    <section className="relative h-[56vh] sm:h-[100vh] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${j2})` }}
      />
      <div className="container-p relative z-10 text-orange-500">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold max-w-3xl">
          Experience Jharkhand – Land of Forests & Waterfalls
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: 0.6 }}
          className="mt-3 max-w-2xl text-gray-100">
          Explore national parks, serene hills, ancient temples, and vibrant tribal heritage.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: 0.6 }}
          className="mt-6 flex gap-3">
          <a href="#featured" className="rounded-xl bg-green-500 px-5 py-3 text-white">Featured Spots</a>
          <a href="#plan" className="rounded-xl bg-green-500 px-5 py-3 text-white">Plan Your Trip</a>
        </motion.div>
      </div>
      <div className="relative w-full h-full"> {/* parent container */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}   // start 50px to the right
          animate={{ opacity: 1, x: 0 }}    // animate to original position
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute bottom-10 right-10 flex gap-3" // position at bottom-right
        >
          <div className="flex flex-col gap-1">
            <a href="#place" className="text-2xl font-bold text-white">
              Tagore Hill
            </a>
            <a href="#place" className="text-2xl text-white">
              Ranchi
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
