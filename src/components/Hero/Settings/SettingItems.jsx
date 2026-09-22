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
    <li className="w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 mb-4">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <span className="text-xl">{icon}</span>

          <span className={`text-xl md:text-2xl font-bold ${titleClass}`}>
            {title}
          </span>
        </div>

        <FaCaretDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default SettingItems;