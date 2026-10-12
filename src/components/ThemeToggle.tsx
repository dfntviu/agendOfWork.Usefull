import { useEffect, useState} from "react";

type Theme = 'light' | 'dark';

function initialTheme(): Theme {
    const saving = localStorage.getItem('theme')
        if (saving === 'dark' || saving === 'light') return saving
             return 'light'
}

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme> (initialTheme)

    useEffect(() =>{
        document.documentElement.setAttribute('data-theme',theme);
        localStorage.setItem('theme', theme)
    }, [theme]);

    function alternate() {
            setTheme( prev => (prev  === 'light' ? "dark" : "light"))
    }

    return (
        <button     
            type="button"
            onClick={alternate}
            className="theme-toggle"
            aria-label={theme === 'light' ? 'Activar el MODO obscuro' : 'Activar el MODO claro' }
            title={theme === 'light' ?  'Modo Obscuro' : 'Modo Claro' }
        >
            {theme === 'light' ?  '🌙' :  '☀️'}
        </button>
    )
}