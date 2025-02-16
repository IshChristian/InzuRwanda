import React, { useState, useEffect } from "react"
import { Globe } from "lucide-react"

// Extend the Window interface to avoid TypeScript errors
declare global {
  interface Window {
    googleTranslateElementInit: () => void
    google: any
  }
}

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState("en")

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "rw", label: "Kinyarwanda" },
  ]

  // Load Google Translate script when the component mounts
  useEffect(() => {
    const addScript = document.createElement("script")
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    addScript.async = true
    document.body.appendChild(addScript)

    // Define Google Translate initialization function
    window.googleTranslateElementInit = () => {
      if (window.google) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        )
      }
    }
  }, [])

  // Function to change language
  const changeLanguage = (langCode: string) => {
    setSelectedLang(langCode)
    const googleTranslateFrame = document.querySelector(".goog-te-combo") as HTMLSelectElement
    if (googleTranslateFrame) {
      googleTranslateFrame.value = langCode
      googleTranslateFrame.dispatchEvent(new Event("change"))
    }
  }

  return (
    <div className="relative">
      {/* Hidden Google Translate Widget */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 rounded-md hover:bg-zinc-100 transition-colors duration-200"
      >
        <Globe className="mr-2 h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-700">
          {languages.find((lang) => lang.code === selectedLang)?.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code)
                setIsOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
