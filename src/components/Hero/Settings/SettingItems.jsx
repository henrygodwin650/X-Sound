import { motion, AnimatePresence } from "framer-motion";
import { FaCaretDown } from "react-icons/fa";

const SettingItems = ({
  title,
  icon,
  section,
  activeSection,
  toggleSection,
  children,
  titleClass = "text-white",
}) => {
  const isOpen = activeSection === section;

  return (
    <li className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md sm:p-4">
      <button
        type="button"
        onClick={() => toggleSection(section)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="shrink-0 text-lg sm:text-xl">
            {icon}
          </span>

          <span
            className={`truncate text-base font-bold sm:text-xl md:text-2xl ${titleClass}`}
          >
            {title}
          </span>
        </div>

        <FaCaretDown
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="mt-4 overflow-hidden"
          >
            <div className="border-t border-white/10 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default SettingItems;