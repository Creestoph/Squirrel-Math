import 'katex/dist/katex.min.css';

export const MATH_FONT_CSS_VAR = '--math-font-name';
export const DEFAULT_MATH_FONT = 'KaTeX_Main';

// Set CSS variable
document.documentElement.style.setProperty(MATH_FONT_CSS_VAR, DEFAULT_MATH_FONT);
window.mathFontName = DEFAULT_MATH_FONT;
